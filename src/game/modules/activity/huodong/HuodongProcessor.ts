/**
* name 
*/
module game {
	export class HuodongProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "HuodongProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS),
				new HuodongEvent(HuodongEvent.UPDATE_QIANDAO_PANEL),
				new HuodongEvent(HuodongEvent.GET_LEVELFUND_REWARD),
				new HuodongEvent(HuodongEvent.GET_LUCKEQUIP_REWARD),
				new HuodongEvent(HuodongEvent.REFRESH_YUEKA_PANEL),
				new HuodongEvent(HuodongEvent.RECHARGE_LAVEL_FUND),
				new HuodongEvent(HuodongEvent.LUCK_DRWA_OPERATION),
				new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL),
				new HuodongEvent(HuodongEvent.GET_LUCKY_RECORD),
				new HuodongEvent(HuodongEvent.AWARD_EVENT),
			];
		}

		//处理事件
		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof HuodongEvent) {
				switch ($event.type) {
					case HuodongEvent.SHOW_HUODONG_PANEL:
						this.showHuodongPanel($event.data);
						break;
					case HuodongEvent.MAKE_PROMISE_SUCCESS:
						this.seconedSure($event.data);
						break;
					case HuodongEvent.UPDATE_QIANDAO_PANEL:
						this.updateQianDaoPanel();
						break;
					case HuodongEvent.RECHARGE_LAVEL_FUND:
						this.onProtocolRecharge();
						break;
					case HuodongEvent.GET_LEVELFUND_REWARD:
						this.onProtocolGift($event.data);
						break;
					case HuodongEvent.LUCK_DRWA_OPERATION:
						this.onProtocolLuckdraw($event.data);
						break;
					case HuodongEvent.GET_LUCKY_RECORD:
						this.onProtocolLuckRecord($event.data);
						break;
					case HuodongEvent.GET_LUCKEQUIP_REWARD:
						this.onProtocolLuckEquipReward($event.data);
						break;
					case HuodongEvent.REFRESH_YUEKA_PANEL:
					case HuodongEvent.AWARD_EVENT:
						this.refreshYueka();
						break;
				}
			}
		}

		/**福利/幸运转盘 */
		private showHuodongPanel(dataAry: any[]): void {
			let uiName = dataAry[0];
			let index = dataAry[1] || 0;
			if (uiName == UIConst.WelfareView) {
				UIMgr.showUI(UIConst.WelfareView, index);
			} else if (uiName == UIConst.PayActivityView) {
				UIMgr.showUI(UIConst.PayActivityView, index);
			} else if (uiName == UIConst.LuckyTurnView) {
				if (!HuodongModel.isOnActivatyTime()) {
					showToast(LanMgr.getLan(``, 10218));
					return;
				}
				UIMgr.showUI(UIConst.LuckyTurnView);
			} else if (uiName == UIConst.RealNameView) {
				UIMgr.showUI(UIConst.RealNameView);
			}
		}

		/**更新签到界面 */
		private updateQianDaoPanel(): void {
			this.HuodongView.initSignViewData();
		}

		/**购买等级基金 */
		private onProtocolRecharge(): void {
			let payid = tb.TB_activity_set.getTabSet().level_recharge;
			let pid = Number(window.platform.pid);
			if (ChongzhiModel.isRealPay(pid)) {
				let item = tb.TB_recharge.get_TB_rechargeById(payid);
				ChongzhiModel.pay(item);
			} else {
				UIUtil.payDebug(payid);
			}
		}

		/**等级基金礼包 */
		private onProtocolGift(id: number): void {
			let args = {};
			args[Protocol.game_activity_getLevelFundReward.args.id] = id;
			PLC.request(Protocol.game_activity_getLevelFundReward, args, ($data: any, $msg) => {
				if (!$data) return;
				if (this.hasPayActivity()) {
					this.payActivityView.initJijinlist();
				}
				UIUtil.showRewardView($data.commonData);
			})
		}

		/**寻宝额外奖励 */
		private onProtocolLuckEquipReward(id: number): void {
			let args = {};
			args[Protocol.game_activity_getLevelFundReward.args.id] = id;
			PLC.request(Protocol.game_luck_getluckEquipAward, args, ($data: any, $msg) => {
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
			})
		}

		/**幸运转盘 */
		private onProtocolLuckdraw(args: any): void {
			let protocol = HuodongModel.getInstance().getProtocol(this.LuckyTurnView.tabIdx);
			PLC.request(protocol, args, ($data: Object, $msg) => {
				if ($data && !$data.hasOwnProperty('luckGodIds') && !$data.hasOwnProperty('luckEquipIds')
					&& !$data.hasOwnProperty('luckArtIds')) {
					showToast($msg);
					return;
				}
				if (!$data) return;

				if (this.LuckyTurnView) {
					Laya.timer.once(600, this, () => {
						this.LuckyTurnView.startAction($data, $msg)
					})
				}
			})
		}

		/**转盘记录 */
		private onProtocolLuckRecord(type: number): void {
			let proto;
			switch (type) {
				case TURNTABLE.EQUIP:
					proto = Protocol.center_luck_getLuckEquipRecord;
					break;
				case TURNTABLE.TREASURE:
					proto = Protocol.center_luck_getLuckTreasureRecord;
					break;
				default:
					proto = Protocol.center_luck_getLuckGodRecord;
					break;
			}
			PLC.request(proto, null, ($data: Object, $msg) => {
				if (!$data) {
					return;
				}
				let model = HuodongModel.getInstance();
				if ($data.hasOwnProperty('luckEquipRecord')) {
					model.equipRecord = $data['luckEquipRecord'];
					// this.LuckyTurnView.turnView.setRecordList($data['luckEquipRecord']);
				} else if ($data.hasOwnProperty('luckGodRecord')) {
					model.godRecord = $data['luckGodRecord'];
					// this.LuckyTurnView.turnView.setRecordList($data['luckGodRecord']);
				} else if ($data.hasOwnProperty('luckTreasureRecord')) {
					model.treasureRecord = $data['luckTreasureRecord'];
					// this.LuckyTurnView.turnView.setRecordList($data['luckGodRecord']);
				}
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LUCK_RECORD_CHANGE));
			})
		}

		/**许愿 */
		private seconedSure($Eventdata: any) {
			let args = {};
			args[Protocol.game_common_wish.args.count] = Number($Eventdata.count);
			// logyhj("许愿-----------------",$Eventdata.count);
			PLC.request(Protocol.game_common_wish, args, ($data: any, msg: any) => {
				logdebug("许愿", $data);
				if (!$data) return;
				this.HuodongView.setwishNums();
				this.HuodongView.startLucik($data, msg);
			});
		}

		private refreshYueka() {
			if (this.hasPayActivity())
				this.payActivityView.initYuekaView();
		}

		public get HuodongView(): WelfareView {
			return UIMgr.getUIByName(UIConst.WelfareView);
		}

		public hasWelfareView(): boolean {
			return UIMgr.hasStage(UIConst.WelfareView);
		}

		public hasPayActivity(): boolean {
			return UIMgr.hasStage(UIConst.PayActivityView);
		}

		public get payActivityView(): payActivityView {
			return UIMgr.getUIByName(UIConst.PayActivityView);
		}

		public get LuckyTurnView(): LuckyTurnView {
			return UIMgr.getUIByName(UIConst.LuckyTurnView);
		}
	}
}