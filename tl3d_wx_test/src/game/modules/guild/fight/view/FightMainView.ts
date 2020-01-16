/**
* name 
*/
module game{
	export class FightMainView extends ui.guild.fight.GuildFightUI{

		private _model : GuildFightModel;
		constructor(){
			super();
            this.group = UIConst.hud_group;
			this._model = GuildFightModel.getInstance();
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
			this.teamList.array = null;
			this.atkList.array = null;
			Laya.timer.clear(this,this.updateTime);
			this.myGuildBox.off(Laya.Event.CLICK,this,this.onSelect);
			this.enemyGuildBox.off(Laya.Event.CLICK,this,this.onSelect);
			this.btnRank.off(Laya.Event.CLICK,this,this.onRank);
			this._model.fightThreadVo.stopMatchLoop();
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		private initView():void{
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,redpointName:"guild_war_award",callback:this.onBaoxiang.bind(this)},
					{btnSkin:SkinUtil.btn_saiji,callback:this.onSaiji.bind(this)},
					{btnSkin:SkinUtil.btn_huiyuan,callback:this.onHuiyuan.bind(this)},
					{btnSkin:SkinUtil.btn_glory_hall,callback:this.onHall.bind(this)}
				];
			let model = this._model;
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.guildDonate];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onReturn.bind(this)});
			let myTeamVo = model.myTeamVo;
			this.lbName1.text = myTeamVo.teamSvo.guildName;
			this.lbJifen1.text = '积分：' + myTeamVo.teamSvo.dailyScore;
			this.lbForce1.text = '总战斗力：' + myTeamVo.teamSvo.totalForce;
			this.myGuildBox.dataSource = myTeamVo.headVo;

			let self = myTeamVo.getMember(App.hero.playerId);
			let atkCount = (self ? self.svo.atkCount : 0);
			let ary = [];
			for(let i = 1 ; i <= tb.TB_guild_war_set.getSet().atk_num ; i++){
				let url = atkCount >= i ? SkinUtil.jian_liang : SkinUtil.jian_an;
				ary.push(url);
			}
			this.atkList.array = ary;

			this.lbGrade.text = GuildFightModel.GRADE_NAME[myTeamVo.teamSvo.guildGrade];
			let emenyTeamVo = model.enemyTeamVo;
			this.lbName2.text = emenyTeamVo.teamSvo.guildName;
			this.lbJifen2.text = '积分：' + emenyTeamVo.teamSvo.dailyScore;
			this.lbForce2.text = '总战斗力：' + emenyTeamVo.teamSvo.totalForce;
			this.enemyGuildBox.dataSource = emenyTeamVo.headVo;

			this.onSelect(false);
			this.myGuildBox.on(Laya.Event.CLICK,this,this.onSelect,[true]);
			this.enemyGuildBox.on(Laya.Event.CLICK,this,this.onSelect,[false]);
			this.btnRank.on(Laya.Event.CLICK,this,this.onRank);
			model.fightThreadVo.loopRequestMatchInfo();
			let date = new Date();
			date.setTime(App.serverTime);
			date.setHours(22,0,0,0,);
			this._endTime = Math.ceil(date.getTime()/1000);
			Laya.timer.loop(1000,this,this.updateTime);
			this.updateTime();
		}
		private _endTime : number;
		private updateTime():void {
			let time = this._endTime - App.serverTimeSecond;
			if(time > 0){
				this.lbTime.text = GameUtil.toCountdown(time,"hh:mm:ss");
			}else{
				Laya.timer.clear(this,this.updateTime);
				dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_BATTLE_VIEW));
			}
		}

		/** 更新界面 */
		public updateView():void {
			let model = this._model;
			let self : boolean = this.imgArrow1.visible;
			if(self){
				this.teamList.array = model.myTeamVo.getTeamList();
			}else{
				this.teamList.array = model.enemyTeamVo.getTeamList();
			}
		}
		/** 选择公会 */
		private onSelect(self:boolean):void {
			this.imgArrow1.visible = self;
			let exist = this._model.myTeamVo.getMember(App.hero.playerId);
			this.atkList.visible = exist && !self;
			this.imgArrow2.visible = !self;
			this.updateView();
		}

		private onReturn():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));
		}

		private onRank():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_GROUP_RANK_VIEW));
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