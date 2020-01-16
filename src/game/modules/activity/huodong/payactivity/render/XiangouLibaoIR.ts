/**
* name 
*/
module game {
	export class XiangouLibaoIR extends ui.activity.huodong.welfare.render.LibaoIRUI {
		constructor() {
			super();			
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refreshData() {
			let tbData = this.dataSource;
			if(tbData) {
				this.renderView(tbData);
				this.btnBuy.on(Laya.Event.CLICK,this,this.onBuy);
			}else{
				this.listItem.array = null;
				this.btnBuy.off(Laya.Event.CLICK,this,this.onBuy);
			}
		}

		private renderView(tbData:tb.TB_daily_recharge|tb.TB_week_recharge|tb.TB_month_recharge):void {
			this.btnBuy.label = `￥${tbData.recharge_num}`;
			this.listItem.array = tbData.getRewardList();
			this.imgDiscount.visible = this.lbDiscount.visible = tbData.discount > 0;
			this.lbDiscount.text = tbData.discount + "折";
			let count = 0;
			if(tbData instanceof tb.TB_daily_recharge) {
				count = App.hero.welfare.dayRechargeLimit ? (App.hero.welfare.dayRechargeLimit[tbData.ID] || 0) : 0;
			}else if(tbData instanceof tb.TB_week_recharge) {
				count = App.hero.welfare.weekRechargeLimit ? (App.hero.welfare.weekRechargeLimit[tbData.ID] || 0) : 0;
			}else if(tbData instanceof tb.TB_month_recharge) {
				count = App.hero.welfare.monthRechargeLimit ? (App.hero.welfare.monthRechargeLimit[tbData.ID] || 0) : 0;
			}
			count = Math.max(0,tbData.limit_num-count);
			this.lbNum.text = `剩余次数：${count}/${tbData.limit_num}`;
			this.btnBuy.visible = count > 0;
			this.imgYigoumai.visible = count <= 0;
		}

		private onBuy(): void {
			let tbData : tb.TB_daily_recharge|tb.TB_week_recharge|tb.TB_month_recharge = this.dataSource;
			if(!tbData) return;
			let pid = Number(window.platform.pid);
			if (ChongzhiModel.isRealPay(pid)) {
				let item = tb.TB_recharge.get_TB_rechargeById(tbData.recharge_id);
				ChongzhiModel.pay(item);
			} else {
				UIUtil.payDebug(tbData.recharge_id,{ text: "付款成功，等待奖励中..." });
			}
		}
	}
}