/**
* name 
*/
module game {
	export class GuildProcessor extends tl3d.Processor {

		private _model : GuildModel;
		constructor() {
			super();
			this._model = GuildModel.getInstance();
		}

		public getName(): string {
			return "GuildProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.SHOW_GUILD_PANEL),
				new GuildEvent(GuildEvent.SHOW_GUILD_HALL_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_BATTLE_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_COPY_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_SKILL_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_DONATION_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_SHOP_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_INIT_VIEW),
				new GuildEvent(GuildEvent.SHOW_GUILD_HELP_VIEW),
			];
		}

		//处理事件
		protected receivedModuleEvent(event: tl3d.BaseEvent): void {
			if (event instanceof GuildEvent) {
				switch (event.type) {
					case GuildEvent.SHOW_GUILD_PANEL:
						this.showGuildPanel();
						break;
					case GuildEvent.SHOW_GUILD_HALL_VIEW:
						this.showHallView();
						break;
					case GuildEvent.SHOW_GUILD_SKILL_VIEW:
						this.showSkillView();
						break;
					case GuildEvent.SHOW_GUILD_COPY_VIEW:
						this.showCopyView();
						break;
					case GuildEvent.SHOW_GUILD_DONATION_VIEW:
						this.showDonationView();
						break;
					case GuildEvent.SHOW_GUILD_BATTLE_VIEW:
						this.showBattleView();
						break;
					case GuildEvent.SHOW_GUILD_SHOP_VIEW:
						this.showShopView();
						break;
					case GuildEvent.SHOW_GUILD_INIT_VIEW:
						this.showInitView();
						break;
					case GuildEvent.SHOW_GUILD_HELP_VIEW:
						this.showHelpView(event.data);
						break;
				}
			}
		}

		/**公会界面 */
		private showGuildPanel(callback?:Function): void {
			let model = this._model;
			model.checkGuildExist(true)
			.then(()=>{
				if (model.guildInfo) {
					UIMgr.showUI(UIConst.GuildMainView);
				}else{
					this.showInitView();
				}
				if(callback){
					callback(model.guildInfo?true:false);
				}
			});
		}

		/** 大厅 */
		private showHallView():void {
			UIMgr.showUI(UIConst.GuildInfoView);
		}

		/** 技能 */
		private showSkillView():void {
			UIMgr.showUI(UIConst.GuildSkillView);
			GuildSkillModel.getInstance().check = false;
			dispatchEvt(new GuildEvent(GuildEvent.GUILD_SKILL_SUCCESS));
		}
		/** 副本 */
		private showCopyView():void {
			let model = this._model;
			model.checkGuildExist(true)
			.then(()=>{
				if (model.guildInfo) {
					UIMgr.showUI(UIConst.GuildCopyView);
				}else{
					UIMgr.showUI(UIConst.GuildinitView);
				}
			});
		}
		/** 打开捐献界面 */
		private showDonationView():void {
			UIMgr.showUI(UIConst.GuildDonationView);
		}
		/** 打开求援界面 */
		private showHelpView(index:number):void {
			if(UIMgr.hasStage(UIConst.GuildMainView)) {
				UIMgr.showUI(UIConst.GuildHelpView,index);
			}else{
				this.showGuildPanel((hasGuild)=>{
					if(hasGuild){
						UIMgr.showUI(UIConst.GuildHelpView,index);
					}
				});
			}
		}
		/** 公会战 */
		private showBattleView():void {
			let model = GuildFightModel.getInstance();
			if(model.openTime > App.serverTimeSecond){
				let time = model.openTime - App.serverTimeSecond;
				let str : string;
				if(time > 86400){
					str = Math.ceil(time/86400) + "天";
				}else if(time > 3600){
					str = Math.ceil(time/3600) + "小时";
				}else {
					str = Math.ceil(time/86400) + "分钟";
				}
				showToast(LanMgr.getLan('',10404,str));
				return;
			}
			// 请求赛季信息
			model.fightThreadVo.requestSeason().then(()=>{
				if(model.isStart()){
					// 请求匹配信息
					model.fightThreadVo.requestMatchInfo().then(()=>{
						if(model.matchType == 0){
							UIMgr.showUI(UIConst.FightMainView);
						}else{
							UIMgr.showUI(UIConst.FightWaitView);
						}
					});
				}else{
					UIMgr.showUI(UIConst.FightWaitView);
				}
			})
		}
		/** 商店 */
		private showShopView():void {
			dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.guild);
		}

		/** 展示初始化界面 */
        private showInitView():void {
			UIMgr.showUI(UIConst.GuildinitView);
			UIMgr.hideUIByName(UIConst.GuildMainView);
			UIMgr.hideUIByName(UIConst.GuildInfoView);
			UIMgr.hideUIByName(UIConst.GuildCopyView);
			UIMgr.hideUIByName(UIConst.GuildDonationView);
			UIMgr.hideUIByName(UIConst.FightMainView);
			UIMgr.hideUIByName(UIConst.GuildSkillView);
        }

	}
}