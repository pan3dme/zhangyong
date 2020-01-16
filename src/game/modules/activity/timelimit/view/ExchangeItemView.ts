/**
* name 
*/
module game {
	export class ExchangeItemView extends ui.activity.timelimitactivity.ExchangeItemUI {

		/**购买数量 */
		private _buyNum: number = 1;
		/**最大可购买数量 */
		private _buymaxnum: number = 0;
		/**当前购买总价 */
		private _buysumMoney: number = 0;
		/**价格 */
		// private _consumeNum: number = 0;
		/**价格 */
		// private _consumeItemId: number = 0;


		private _counterBar: common.CounterBar;
		private _exchangeData: OperateActivityVo;
		constructor() {
			super();
		}

		createChildren(): void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.ExchangeItemView, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12559) };
			this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btn_add, this.btn_addTen, this.btn_red, this.btn_redTen, this.are_putin);
			this.btn_buy.on(Laya.Event.CLICK, this, this.buy);
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.init();
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.init();
		}

		public onClosed(type?: string): void {
			super.onClosed(type);
		}

		public close(type?: string, showEffect?: boolean, sound = true): void {
			super.close();
			Laya.timer.clearAll(this);
			this._exchangeData = null;
			tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateView, this);
		}


		public init(): void {
			//初始化数据
			this._exchangeData = this.dataSource;


			// this._consumeNum = this._exchangeData.getOtherInfo()[0][1];//消耗数量

			this.img_type2.visible = this.lab_sum.visible = this.img_bg.visible = this._exchangeData.getOtherInfoLen() == 1;


			let rinfos = this._exchangeData.getRewardInfo();//兑换物品

			if (this._exchangeData.getOtherInfoLen() == 1) {
				//一兑一
				let iteminfo = this._exchangeData.getOtherInfo()[0];//消耗
				//货币图标
				this.img_type2.skin = SkinUtil.getExchangeConsume(iteminfo[0]);
			}
			this.lab_rouyu.text = LanMgr.getLan("",12177) + App.hero.getBagItemNum(rinfos[0][0]);

			let item: ItemVo = new ItemVo(rinfos[0][0], rinfos[0][1]);
			//商品box
			this.itembox.dataSource = item
			//商品名
			this.lab_name.text = item.getName();

			tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateView, this);
			this.updateView();
		}

		private updateView(): void {
			//购买最大数量根据 （1限购数量，2可购买最大数量，3最大堆叠数量） 的最小值来获取
			this._buymaxnum = this._exchangeData.getChangeNum();
			let hasNum = this._exchangeData.condValue - this._exchangeData.rewardCount;
			//购买数量
			this._buyNum = 1;
			this._counterBar.setInitData(this._buyNum, Math.min(this._buymaxnum,hasNum), this.setBuySumMoney.bind(this));
			//商品名

			this.lab_overplus.text = LanMgr.getLan("",12602,hasNum);
			this.setBuySumMoney();
		}


		/** 购买总价 */
		private setBuySumMoney(): void {
			this._buyNum = this._counterBar.getCurNum();
			//购买数量文本
			this.are_putin.text = this._buyNum.toString();
			if (this._exchangeData.getOtherInfoLen() == 1) {
				//购买总价
				let iteminfo = this._exchangeData.getOtherInfo()[0];//消耗
				this._buysumMoney = this._buyNum * iteminfo[1];
				//购买总价文本
				let hasItemNum: number = App.hero.getBagItemNum(iteminfo[0]);
				this.lab_sum.text = Snums(hasItemNum) + "/" + Snums(this._buysumMoney);
			}
		}

		/** 购买 */
		private buy(): void {
			//判断货币是否足够
			if (this._exchangeData.getChangeNum() == 0) {
				showToast(LanMgr.getLan("", 10234));
				return;
			}
			if (this._exchangeData.endtime <= App.getServerTime()) {
				showToast(LanMgr.getLan("",10224));
				return;
			} else if (this._exchangeData.condValue <= this._exchangeData.rewardCount) {
				showToast(LanMgr.getLan("", 10097));
				return;
			}

			let args = {};
			args[Protocol.game_activity_getActivityReward.args.id] = this._exchangeData.id;
			args[Protocol.game_activity_getActivityReward.args.num] = this._buyNum;
			PLC.request(Protocol.game_activity_getActivityReward, args, ($data: any, msg: any) => {
				if ($data) {
					this._exchangeData.modifyData($data);
					this._exchangeData.sort();
					UIUtil.showRewardView($data.commonData);
					let tab: tb.TB_operate_activity = tb.TB_operate_activity.get_TB_operate_activityById(this._exchangeData.id);
					dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), tab.time_index);
				}

				if (UIMgr.hasStage(UIConst.TimeLimitView)) {
					let timeLimView = UIMgr.getUIByName(UIConst.TimeLimitView) as TimeLimitView;
					timeLimView.updateList();
				}
				this.close();
			})

		}
	}
}