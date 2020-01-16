/**
* name 
*/
module game{
	export class FightWaitView extends ui.guild.fight.GuildFightWaitUI{
		constructor(){
			super();
            this.group = UIConst.hud_group;
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GONGHUI_FIGHT);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();		
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();		
		}

        public onClosed():void{
			super.onClosed();
			this._rankVo = null;
			Laya.timer.clear(this,this.updateTime);
			this.btnJoin.off(Laya.Event.CLICK,this,this.onClick);
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		public initView():void{
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,redpointName:"guild_war_award",callback:this.onBaoxiang.bind(this)},
					{btnSkin:SkinUtil.btn_saiji,callback:this.onSaiji.bind(this)},
					{btnSkin:SkinUtil.btn_huiyuan,callback:this.onHuiyuan.bind(this)},
					{btnSkin:SkinUtil.btn_glory_hall,callback:this.onHall.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.guildDonate];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onReturn.bind(this)});
			this.lbDesc.text = "";
			this.lbNote.text = "";
			// this.imgCaidai.visible =
			this.imgWangzhe.visible = this.lbWangzhe.visible = false;
			this.menuView.updateView();
			let model = GuildFightModel.getInstance();
			Laya.timer.clear(this,this.updateTime);
			if(model.isJoin()){
				// 周一到周六22点-6点（不包括周一0点到6点）
				if(model.isRestTime()){
					this.btnJoin.label = "查看上轮排名";
					this.requestRank();
				}else{
					this.btnJoin.label = "已报名";
					if(model.matchType == 1){
						let tbSet = tb.TB_guild_war_set.getSet();
						this.lbNote.text = LanMgr.getLan("由于{0}级人数小于{1}人，不能参与本轮比赛",-1,tbSet.role_level,tbSet.guild_player_num);
					}else if(model.matchType == 2){
						this.lbNote.text = LanMgr.getLan("由于本轮轮空，直接获得积分，请静候下轮比赛",-1);
					}
				}
				let date = new Date(App.serverTime);
				let week = date.getDay();
				let hour = date.getHours();
				// 如果是最后一轮（周六22:00-24:00）,下轮开启倒计时隐藏
				if(week == WeekNum.Sat && hour >= tb.TB_guild_war_set.getSet().end_time){
					this.lbDesc.text = "";
					Laya.timer.loop(1000,this,this.updateTime);
				}else{
					this._endTime = model.getNextStartTime();
					Laya.timer.loop(1000,this,this.updateTime);
					this.updateTime();
				}
            }else{
				this.btnJoin.label = "报名";
				this.lbDesc.text = "等待会长报名中";
            }
			this.btnJoin.on(Laya.Event.CLICK,this,this.onClick);
		}

		private _rankVo : IWarGroupRankVo;
		/** 请求排行 */
		requestRank():void {
			PLC.request(Protocol.guild_guildWar_getGroupList,null,($data:any)=>{
				if(!$data) return;
				// 更新maxGuildGrade
				GuildFightModel.getInstance().updateSeason($data);
				let myRank = $data.myRank ? $data.myRank : 0;
				// 不需要设置数据,打开就会重新请求
				this._rankVo = {groupList:[],upGradeType:0,guildGrade:0,myRank};
				// 显示王者标识 this.imgCaidai.visible
				this.imgWangzhe.visible = this.lbWangzhe.visible = myRank > 0;
				this.lbWangzhe.text = `王者${myRank}名`;
			});
		}

		private _endTime : number;
		/** 更新倒计时 */
		private updateTime():void {
			let time = this._endTime - App.serverTimeSecond;
			if(time > 0){
				this.lbDesc.text = "下轮比赛倒计时：" + GameUtil.toCountdown(time,"hh:mm:ss",1);
			}else{
				Laya.timer.clear(this,this.updateTime);
				dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_BATTLE_VIEW));
			}
		}

		private onClick():void {
			let model = GuildFightModel.getInstance();
			if(model.isJoin()){
				if(model.isRestTime()){
					if(!this._rankVo){
						showToast(LanMgr.getLan('',10398));
					}else{
						dispatchEvt(new GuildEvent(GuildEvent.SHOW_GROUP_RANK_VIEW));
					}
				}
			}else{
				dispatchEvt(new GuildEvent(GuildEvent.JOIN_FIGHT));
			}
		}

		private onReturn():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));
		}

		private onBaoxiang():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_GRADE_CHEST_VIEW));
		}
		private onHall():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_HONOR_HALL_VIEW));
		}
		private onSaiji():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_SEASON_AWARD_VIEW));
		}
		private onRule():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_FIGHT_RULE_VIEW));
		}
		private onHuiyuan():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_PERSON_RANK_VIEW));
		}
	}

	
}