/**
* name 
*/
module game {
	export class SignView extends ui.activity.huodong.welfare.tab.SignUI {
		constructor() {
			super();
			this.initView();
			this.btn_sign.on(Laya.Event.CLICK, this, this.sign);
			this.list_totalsign.renderHandler = new Handler(this, this.onTotalsign);
		}

		public onAdd() {
			this.initView();
		}

		public onExit() {
			this.close();
		}

		public initView(): void {
			HuodongModel.getInstance().initCanBuQianDate();
			let signData = tb.TB_day_sign.get_TB_day_sign();
			let monthDays = getMonthDays(App.serverTimeSecond);
			signData.length = monthDays
			let num = HuodongModel.getBuqianNum();
			this.list_item.dataSource = signData;
			let totalSign: number = HuodongModel.getTotalSignNum();
			/**设置进度条 */
			let plan = totalSign / monthDays;
			this.progress.value = plan;
			/**补签次数 */
			let value = tb.TB_game_set.get_TB_game_setById(1).add_sign - num;
			this.lab_buqian.text = value + LanMgr.getLan("次", -1);
			/**累计签到 */
			this.lab_totalSign.text = totalSign + "/" + monthDays;
			let today = new Date(App.serverTimeSecond * 1000).getDate();
			/**是否签到 */
			let isSignBool = today == App.hero.welfare.todaySignIn;
			/**是否还有补签次数 */
			let isHaveBuqian = value > 0;
			this.btn_sign.disabled = isSignBool && !isHaveBuqian;
			this.btn_sign.label = isSignBool ? isHaveBuqian ? `补签` : "已签到" : "签到";
			this.lab_resetDays.text = (monthDays - today) + LanMgr.getLan("天后重置", -1);
			this.imgcost.visible = this.lbcost.visible = isSignBool && isHaveBuqian;
			this.list_totalsign.dataSource = tb.TB_total_sign.get_TB_total_sign();
			if (this.imgcost.visible) {
				let cost = HuodongModel.getSignCost();
				this.imgcost.skin = SkinUtil.getCostSkin(cost[0]);
				this.lbcost.text = `X${cost[1]}`;
			}
		}

		/**设置一下位置 */
		private onTotalsign(cell: ui.activity.huodong.welfare.render.toSignIRUI, index: number) {
			let data: tb.TB_total_sign = cell.dataSource;
			cell.x = this.list_totalsign.width * (data.total_day / 30) - (cell.width / 2);
		}

		//签到请求
		private sign(): void {
			if (HuodongModel.isTodaySign()) {
				this.Replacement();
				return;
			}
			PLC.request(Protocol.game_welfare_dailySignIn, null, ($data: any, msg: any) => {
				logdebug($data);
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
				this.initView();
			});
		}

		/**补签 */
		private Replacement(): void {
			common.AlertBox.showAlert({
				text: LanMgr.getLan("", 10494, HuodongModel.getSignCost()[1]), confirmCb: () => {
					PLC.request(Protocol.game_welfare_dailySignInSupply, null, ($data: any, msg: any) => {
						if (!$data) return;
						this.initView();
						UIUtil.showRewardView($data.commonData);
					});
				}, parm: null
			});
		}
	}
}