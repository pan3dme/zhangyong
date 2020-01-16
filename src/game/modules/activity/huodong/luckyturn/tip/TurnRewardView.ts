/**
* name 
*/
module game {
	export class TurnRewardView extends ui.activity.huodong.luckyturn.Tip.TurnRewardUI {
		// private _luckyView: LuckyTurnView;
		constructor() {
			super();
			this.isModelClose = true;
			// this._luckyView = UIMgr.getUIByName(UIConst.LuckyTurnView);
		}

		public popup(): void {
			this.btnBuy.offAll();
			this.initView();
			super.popup();
		}

		private _curTimeTemp: any;
		private _curType: number;
		private _count: number;
		private _costdiamong: number;
		public initView(): void {
			this.bgPanel.dataSource = { title: "comp/title/huodejiangli.png" };
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.setCostText, this);
			this.btnBuy.on(Laya.Event.CLICK, this, this.onClickBuy);

			this._curType = this.dataSource.type;
			this._count = this.dataSource.items.length;
			this._costdiamong = 0;
			let id: number;
			switch (this._curType) {
				case TURNTABLE.GOD://神灵
					id = App.hero.welfare.luckGodId;
					this._curTimeTemp = tb.TB_luck_god_time.get_TB_luck_god_timeById(id);
					this._costdiamong = this._count == 1 ? this._curTimeTemp.buy_cost[0] : this._curTimeTemp.buy_cost[1];
					break;
				case TURNTABLE.EQUIP://装备
					id = App.hero.welfare.luckEquipId;
					this._curTimeTemp = tb.TB_luck_equip_time.get_TB_luck_equip_timeById(id);
					this._costdiamong = this._count == 1 ? this._curTimeTemp.buy_cost[0] : this._curTimeTemp.buy_cost[1];
					break;
				case TURNTABLE.TREASURE://圣物
					id = App.hero.welfare.luckTreasureId;
					this._curTimeTemp = tb.TB_luck_treasure_time.getTempById(id);
					this._costdiamong = this._count == 1 ? this._curTimeTemp.buy_cost[0] : this._curTimeTemp.buy_cost[1];
					break;
				case TURNTABLE.WISH://许愿
					this._curTimeTemp = tb.TB_wish_set.get_TB_wish_set();
					if (this._count > 1) {
						//纠正次数
						this._count = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum)
						this._count = Math.min(this._count, 10);
					}
					this._costdiamong = this._count * this._curTimeTemp.cost_diamond;
					break;
			}

			this.setCostText();
			this.itemList.array = this.dataSource.items;
		}

		public setCostText(): void {
			// if (!this._curTimeTemp) return;
			this.btn_close.x = this._count != 0 ? 144 : 280;
			this.btnBuy.visible = this.box_cost.visible = this._count != 0;
			let freeCount: number = HuodongModel.getLuckFreeCount(this._curType);
			let diamond: number = App.hero.diamond;
			this._isFree = false;
			this._isCanOne = false;
			this._isCanTen = false;
			if (this._count == 1) {
				//一次
				if (freeCount > 0) {
					this.btnBuy.label = `免费`;
					this.lbCost.text = 0 + "";
					this.lbCost.color = ColorConst.normalFont;
					this._isFree = true;
				} else {
					this.btnBuy.label = `购买1次`;
					this.lbCost.text = String(this._costdiamong);
					if (diamond < this._costdiamong) {
						this.lbCost.color = ColorConst.RED;
					} else {
						this.lbCost.color = ColorConst.normalFont;
						this._isCanOne = true;
					}
				}
			} else {
				this.btnBuy.label = `购买${this._count}次`;
				this.lbCost.text = String(this._costdiamong);
				if (diamond < this._costdiamong) {
					this.lbCost.color = ColorConst.RED;
				} else {
					this.lbCost.color = ColorConst.normalFont;
					this._isCanTen = true;
				}
			}
		}

		private _isFree: boolean = false;
		private _isCanOne: boolean = false;
		private _isCanTen: boolean = false;
		private onClickBuy(): void {
			if (this._count == 1) {
				//一次
				if (!this._isFree && !this._isCanOne) {
					showToast(LanMgr.getLan(``, 10005));
					return;
				}
			} else {
				if (!this._isCanTen) {
					showToast(LanMgr.getLan(``, 10005));
					return;
				}
			}

			if (this._curType == TURNTABLE.WISH) {
				dispatchEvt(new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS), { count: this._count });
				return;
			}

			let args = {
				"_0": this._curTimeTemp.ID,
				"_1": this._count
			}
			let protocol;
			switch (this._curType) {
				case TURNTABLE.GOD:
					protocol = Protocol.game_luck_buyluckGod;
					break;
				case TURNTABLE.EQUIP:
					protocol = Protocol.game_luck_buyluckEquip;
					break;
				case TURNTABLE.TREASURE:
					protocol = Protocol.game_luck_buyluckTreasure;
					break;
			}
			PLC.request(protocol, args, ($data: Object, $msg) => {
				if (!$data) return;
				if ($msg && $msg.length > 0) {
					showToast($msg);
				} else {
					let pageview = UIMgr.getUIByName(UIConst.LuckyTurnView) as LuckyTurnView;
					pageview.startAction($data, $msg);
					// this.close();
				}
			})
		}

		public onClosed(): void {
			super.onClosed();
			this.itemList.array = null;
			this.bgPanel.dataSource = null;
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.setCostText, this);
			this.btnBuy.off(Laya.Event.CLICK, this, this.onClickBuy);
		}
	}
}