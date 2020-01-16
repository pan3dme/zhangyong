/**
* name 
*/
module game {
	export class GuildHelpProcessor extends tl3d.Processor {

		private _model : GuildHelpModel;
		constructor() {
			super();
			this._model = GuildHelpModel.getInstance();
		}

		public getName(): string {
			return "GuildHelpProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.SHOW_ASK_HELP_VIEW),
				new GuildEvent(GuildEvent.REWARD_HELPED_ITEM),
				new GuildEvent(GuildEvent.HELP_CLICK_BAOXIANG),
				new GuildEvent(GuildEvent.SEND_CHAT_HELP),
				new GuildEvent(GuildEvent.SEND_ASK_HELP),
				new GuildEvent(GuildEvent.HELP_OTHERS),
			];
		}

		//处理事件
		protected receivedModuleEvent(event: tl3d.BaseEvent): void {
			if (event instanceof GuildEvent) {
				switch (event.type) {
					case GuildEvent.SHOW_ASK_HELP_VIEW:
						this.showAskHelpView(event.data);
						break;
					case GuildEvent.REWARD_HELPED_ITEM:
						this.rewardHelpedItem(event.data);
						break;
					case GuildEvent.HELP_CLICK_BAOXIANG:
						this.onClickBX();
						break;
					case GuildEvent.SEND_CHAT_HELP:
						this.sendChatHelp();
						break;
					case GuildEvent.SEND_ASK_HELP:
						this.sendAskHelp(event.data);
						break;
					case GuildEvent.HELP_OTHERS:
						this.helpOthers(event.data);
						break;
				}
			}
		}

		/** 打开求援界面 */
		private showAskHelpView(info:GuildHelpVo):void {
			UIMgr.showUI(UIConst.GuildAskHelpView,info);
		}

		/** 领取被帮助物品 */
		private rewardHelpedItem(info:GuildHelpVo):void {
			if(!info.isCanReward()) {
				showToast(LanMgr.getLan('',10413));
				return;
			}
			let args = {};
			args[Protocol.guild_guildHelp_getGuildHelpNum.args.id] = info.svo.helpId;
			PLC.request(Protocol.guild_guildHelp_getGuildHelpNum,args,(data)=>{
				if(!data){
					return;
				}
				this._model.updateHelpAwardNum(info,data['guildHelpInfo']);
				let view = UIMgr.getUIByName(UIConst.GuildHelpView) as GuildHelpView;
				view.updateMyListSimple();
				view.updateBaoxiangState();
				UIUtil.showRewardView(data['commonData']);
				dispatchEvt(new GuildEvent(GuildEvent.REWARD_HELPED_ITEM_SUCC));
			});
		}
		/** 点击宝箱 */
		private onClickBX():void {
			let model = this._model;
			if(model.isCanRewardBX()) {
				PLC.request(Protocol.guild_guildHelp_getGuildHelpAward,null,(data)=>{
					if(!data){
						return;
					}
					let view = UIMgr.getUIByName(UIConst.GuildHelpView) as GuildHelpView;
					view.updateBaoxiangState();
					UIUtil.showRewardView(data['commonData']);
				});
			}else{
				let reward = tb.TB_guild_set.getSet().help_box;
				let list = reward.map((ary)=>{
					return new ItemVo(ary[0],ary[1]);
				});
				UIMgr.showUI(UIConst.ManyItemsTip, {data:list});
			}
		}

		/** 聊天公会频道发送求助 */
		private sendChatHelp():void {
			if(this._model.getAskHelpNum() <= 0 || this._model.isAllFinish()) {
				showToast(LanMgr.getLan('',10414));
				return;
			}
			if(App.serverTimeSecond < App.hero.guildHelpEndTime){
				showToast(LanMgr.getLan('',10415));
				return;
			}
			PLC.request(Protocol.game_guild_sendGuildHelpNotice,null,(data)=>{
				if(!data){
					return;
				}
				showToast(LanMgr.getLan('',10416));
				App.hero.guildHelpEndTime = data["guildHelpEndTime"] || 0;
			});
		}

		/** 求援 */
		private sendAskHelp(ary:any[]):void {
			let pos = ary[0];
			let info:tb.TB_guild_help = ary[1];
			let selectIdx = ary[2] ? 1 : 0;
			if(this._model.isExistHelp(info.ID)){
				showToast(LanMgr.getLan('',10417));
				return;
			}
			let args = {};
			args[Protocol.guild_guildHelp_createGuildHelp.args.type] = info.ID;
			args[Protocol.guild_guildHelp_createGuildHelp.args.notice] = selectIdx;
			args[Protocol.guild_guildHelp_createGuildHelp.args.pos] = pos;
			PLC.request(Protocol.guild_guildHelp_createGuildHelp,args,(data)=>{
				if(!data){
					return;
				}
				this._model.addHelp(data['addGuildHelp']);
				UIMgr.hideUIByName(UIConst.GuildAskHelpView);
				let view = UIMgr.getUIByName(UIConst.GuildHelpView) as GuildHelpView;
				view.updateMyListSimple();
				view.updateInterval();
				dispatchEvt(new GuildEvent(GuildEvent.SEND_ASK_HELP_SUCC));
			});
		}

		/** 援助其他人 */
		private helpOthers(info:GuildHelpVo):void {
			let model = this._model;
			if(info.isFinish()) {
				showToast(LanMgr.getLan('',10418));
				return;
			}
			if(!model.isFreeHelp()) {
				if(model.isCostMax()) {
					showToast(LanMgr.getLan('',10419));
					return;
				}else{
					let cost = tb.TB_guild_set.getSet().help_cost;
					for(let ary of cost) {
						if (UIUtil.checkNotEnough(ary[0], ary[1])) {
							return;
						}
					}
				}
			}
			let args = {};
			args[Protocol.game_guild_addGuildHelpNum.args.id] = info.svo.helpId;
			PLC.request(Protocol.game_guild_addGuildHelpNum,args,(data)=>{
				if(!data) return;
				UIUtil.showRewardView(data['commonData']);
				model.updateOthersNum(data['guildHelpInfo']);
				let view = UIMgr.getUIByName(UIConst.GuildHelpView) as GuildHelpView;
				view.updateOtherHelpUI();
				dispatchEvt(new GuildEvent(GuildEvent.HELP_OTHERS_SUCC));
			});
		}
	}
}