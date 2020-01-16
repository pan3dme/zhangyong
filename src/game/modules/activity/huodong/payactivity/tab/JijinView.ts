/**
* name 
*/
module game {
	export class JijinView extends ui.activity.huodong.welfare.tab.JijinUI {
		constructor() {
			super();
			this.initView();
			this.btn_recharge.on(Laya.Event.CLICK, this, this.recharge);
		}

		public onAdd() {
			this.listRender();
			Laya.timer.callLater(this, () => {
				UIUtil.playListEff(this.list_itemJijin.cells);
			});

			this.ani1.play(0,true);
		}

		public onExit() {
			this.close();
			this.ani1.stop();
			UIUtil.clearListEff(this.list_itemJijin.cells);
		}

		public initView(): void {
			this.setBtnLabel();
			this.listRender();
			let buyCondition: number[] = tb.TB_activity_set.getTabSet().level_fund_buy;
			this.lab_vip.text = LanMgr.getLan("VIP{0}可购买", -1, buyCondition[0]);
		}

		public setBtnLabel(): void {
			this.list_itemJijin.refresh();
			this.btn_recharge.disabled = App.hero.welfare.buyLevelFund == 1;
			if (this.btn_recharge.disabled) {
				//绿色灰
				this.btn_recharge.skin = "comp/button/btn_qianwang.png";
				this.btn_recharge.labelStrokeColor = "#538901";
				this.btn_recharge.label = LanMgr.getLan("已购买", -1)
			} else {
				this.btn_recharge.skin = "comp/button/button.png";
				this.btn_recharge.labelStrokeColor = "#ca7005";
				this.btn_recharge.label = LanMgr.getLan("购买", -1)
			}
			let buyCondition: number[] = tb.TB_activity_set.getTabSet().level_fund_buy;
			this.redpoint.visible = App.hero.welfare.buyLevelFund == 0 && App.hero.vip >= buyCondition[0] && App.hero.diamond >= buyCondition[1];
		}

		//排序 可领取 > 未到达 > 已领取
		public listRender(): void {
			let arr = tb.TB_level_fund.get_TB_level_fund();
			arr.sort((a, b) => {
				let aSortNum = App.hero.level >= a.level ? App.hero.welfare.levelFundAward[a.ID] ? a.ID + 1000 : a.ID + 10 : a.ID + 100;
				let bSortNum = App.hero.level >= b.level ? App.hero.welfare.levelFundAward[b.ID] ? b.ID + 1000 : b.ID + 10 : b.ID + 100;
				if (aSortNum > bSortNum) {
					return 1;
				} else if (aSortNum < bSortNum) {
					return -1;
				} else {
					return 0;
				}
			});
			this.list_itemJijin.dataSource = arr;
		}

		private recharge(): void {
			// sendDispatchEvent(new HuodongEvent(HuodongEvent.RECHARGE_LAVEL_FUND));
			/**购买等级基金 */
			let buyCondition: number[] = tb.TB_activity_set.getTabSet().level_fund_buy;
			if (App.hero.vip < buyCondition[0]) {
				showToast(LanMgr.getLan("", 10214, buyCondition[0]));
				return;
			}
			if (App.hero.diamond < buyCondition[1]) {
				showToast(LanMgr.getLan(``, 10005));
				return;
			}

			PLC.request(Protocol.game_activity_buyLevelFund, null, ($data) => {
				if (!$data) return;
				App.hero.welfare.buyLevelFund = $data.buyLevelFund;
				this.setBtnLabel();
			});
		}
	}
}