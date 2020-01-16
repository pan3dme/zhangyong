/**
* name 
*/
module game {
	export class ChongzhiProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "ChongzhiProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL),
				new TopUpEvent(TopUpEvent.SHOW_SHOUCHONG_PANEL),
				new TopUpEvent(TopUpEvent.SHOW_CHONGZHISUCC_PANEL),
				new TopUpEvent(TopUpEvent.GET_FIRSTRECHARGE_REWARD),
				new ResEvent(ResEvent.RESOURCE_CHANGE),
				new ResEvent(ResEvent.VIP_LEVEL_CHANGE),
				new HuodongEvent(TopUpEvent.XIANGOU_LIBAO_CHANGE),
			];
		}

		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof TopUpEvent) {
				switch ($event.type) {
					case TopUpEvent.SHOW_CHONGZHI_PANEL:
						this.show_ChongzhiView($event.data);
						break;
					case TopUpEvent.SHOW_CHONGZHISUCC_PANEL:
						this.show_ChongzhiSuccView($event.data);
						break;
					case TopUpEvent.SHOW_SHOUCHONG_PANEL:
						this.showShouchongPanel();
						break;
					case TopUpEvent.GET_FIRSTRECHARGE_REWARD:
						this.getRewardById($event.data);
						break;
					case TopUpEvent.XIANGOU_LIBAO_CHANGE:
						this.onLibaoUpdate();
						break;
				}
			} else if ($event instanceof ResEvent) {
				switch ($event.type) {
					case ResEvent.RESOURCE_CHANGE:
					case ResEvent.VIP_LEVEL_CHANGE:
						if (this.chongzhiview)
							this.chongzhiview.refreshData();
						if (this.hudView) {
							this.hudView.setVip();
						}
						break;
				}
			}
		}

		private onLibaoUpdate():void{
			if (UIMgr.hasStage(UIConst.PayActivityView)) {
				let ui: payActivityView = UIMgr.getUIByName(UIConst.PayActivityView);
				ui.updateXiangouLibao();
			}
		}

		private show_ChongzhiView(eventdata?: boolean) {
			UIMgr.showUI(UIConst.ChongzhiView, eventdata);
		}

		private show_ChongzhiSuccView(data: any) {
			let ids : number[] = data.rechargeGoodsIds || [];
			for (let i in ids) {
				if (tb.TB_recharge.get_TB_rechargeById(ids[i]).recharge_type != 3) {
					ChongzhiModel.getInstance().arrPushBack(ids[i]);
				}else{
					//购买礼包弹提示
					UIMgr.showUI(UIConst.Topup_GiftSuccView, ids[i]);
				}
			}
			if(ids.indexOf(tb.TB_activity_set.getTabSet().level_recharge) != -1) {
				if (UIMgr.hasStage(UIConst.PayActivityView)) {
					let ui: payActivityView = UIMgr.getUIByName(UIConst.PayActivityView);
					ui.setBtnLabel();
				}
			}
			if (UIMgr.hasStage(UIConst.TupUp_FirstView)) {
				let ui: ShouchongView = UIMgr.getUIByName(UIConst.TupUp_FirstView);
				ui.updateView();
			}
			if (UIMgr.hasStage(UIConst.Shop_BuyView)) {
				let ui: BuyView = UIMgr.getUIByName(UIConst.Shop_BuyView);
				ui.init();
			}
			dispatchEvt(new TopUpEvent(TopUpEvent.SHOUCHONG_RED_EVEN));
		}

		private updateShouchongPanel(): void {
			if (UIMgr.hasStage(UIConst.TupUp_FirstView)) {
				let uiPanel: ShouchongView = UIMgr.getUIByName(UIConst.TupUp_FirstView);
				uiPanel.setViewData(uiPanel._selectTabNum);
			}
		}

		/**领取首充礼包 */
		private getRewardById(data: any): void {
			var args = {};
			args[Protocol.game_welfare_firstRecharge.args.id] = data.id;
			args[Protocol.game_welfare_firstRecharge.args.day] = data.day;
			PLC.request(Protocol.game_welfare_firstRecharge, args, ($data: any, msg: any) => {
				if (!$data) return;
				this.firstview.updateView();
				UIUtil.showRewardView($data.commonData);
				// this.setButtonVisible(this.list_btn.selectedIndex + 1);
				dispatchEvt(new TopUpEvent(TopUpEvent.SHOUCHONG_RED_EVEN));
				// if (UIMgr.hasStage(UIConst.GuajiView)) {
				// 	let view: GuajiView = UIMgr.getUIByName(UIConst.GuajiView);
				// 	view.updateShouchongTishi();
				// }
			});
		}

		private showShouchongPanel(): void {
			UIMgr.showUI(UIConst.TupUp_FirstView);
		}

		public get firstview(): ShouchongView {
			return UIMgr.getUIByName(UIConst.TupUp_FirstView);
		}

		public get chongzhiview(): ChongzhiView {
			return UIMgr.getUIByName(UIConst.ChongzhiView);
		}

		public get hudView(): HudView {
			return UIMgr.getUIByName(UIConst.HudView);
		}
	}
}