/**
* name 
*/
module game{
	export class MemberInfoRender extends ui.guild.hall.MemberInfoRenderUI{
		constructor(){
			super();
			
		}

		public set dataSource($value: IGuildMemberData) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IGuildMemberData {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
				let jobKey = iface.tb_prop.guildJobTypeKey;
				this.lbName.text = data.name;
				this.lbTime.text = data.online == 1 ? "在线" : GameUtil.getTimePrev(data.logoutTime);
				this.lbTime.color = data.online == 1 ? ColorConst.TASK_GREEN : ColorConst.GRAY;
				this.headBox.dataSource = new UserHeadVo(data.head,data.level,data.headFrame);
				this.lbJob.text = data.job == jobKey.president ? `会长` : (data.job == jobKey.vicePresident ? " 副会长" : "成员");		
				this.lbJob.color = data.job == jobKey.president ? ColorConst.LIGHT_STH : (data.job == jobKey.vicePresident ? ColorConst.PURPLE : ColorConst.normalFont);		
				this.lbForce.text = `神力:${data.force}`;
				let isSelf = data.playerId == App.hero.playerId;
				this.btnSetup.visible = !isSelf;
				if(!isSelf){
					let guildInfo = GuildModel.getInstance().guildInfo;
					let isCaptain = guildInfo.job == jobKey.president;
					let isViceCaptain = guildInfo.job == jobKey.vicePresident;
					// 会长和副会长显示, 
					if(isCaptain || isViceCaptain){
						this.btnSetup.visible = isCaptain || data.job != jobKey.vicePresident;
					}else{
						// 会员显示条件：会长离线大于3天，并且只显示在会长后面,按钮提前显示
						let isOutTime = data.online != 1 && (App.serverTimeSecond - data.logoutTime) >= TimeConst.ONE_DAY_SEC * tb.TB_guild_set.getSet().usurper_time[0];
						this.btnSetup.visible = data.job == jobKey.president && isOutTime;
					}
				}
				this.headBox.on(Laya.Event.CLICK,this,this.showMemberInfo);
				this.btnSetup.on(Laya.Event.CLICK,this,this.onSetup);
			} else{
				this.headBox.dataSource = null;
				this.headBox.off(Laya.Event.CLICK,this,this.showMemberInfo);
				this.btnSetup.off(Laya.Event.CLICK,this,this.onSetup);
			}
		}

		private showMemberInfo():void{
			let info = this.dataSource;
			if(!info || info.playerId == App.hero.playerId) return;
			let event = new GuildEvent(GuildEvent.SHOW_GUILD_PANEL);
			dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_INFO_VIEW),{playerId:info.playerId,event});
		}

		private onSetup():void {
			let info = this.dataSource;
			if(info){
				UIMgr.showUI(UIConst.GuildMemberSetView, info);
			}
		}

	}
}