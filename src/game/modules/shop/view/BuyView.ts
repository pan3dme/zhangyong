/**
* name 
*/
module game {
	export class BuyView extends ui.shop.BuyUI {
		
		/**当前商品 */
		private _good: tb.TB_goods;
		/**购买数量 */
		private _buyNum: number = 1;
		/**最大可购买数量 */
		private _buymaxnum: number = 0;
		/**当前购买总价 */
		private _buysumMoney: number = 0;

		private _counterBar : common.CounterBar;
		constructor() {
			super();			
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.Shop_BuyView, closeOnSide: this.isModelClose ,title:LanMgr.getLan("",12175)};
			this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btn_add,this.btn_addTen,this.btn_red,this.btn_redTen,this.are_putin);
			this.btn_buy.on(Laya.Event.CLICK,this,this.buy);
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
		}

		
		public init(): void {
			//初始化数据
			//限购最大数量
			let limitMaxNum = 0;
			//最多堆叠数量
			let lapMaxNum = 0;
			//可购买最大数量
			let resMaxNum = 0;
			//dataSource
			let data = this.dataSource;
			//商品表
			this._good = <tb.TB_goods>data.item;
			//物品表
			let item = tb.TB_item.get_TB_itemById(this._good.item_id[0]);
			
			//货币图标
			this.img_type1.skin = "";
			this.img_type2.skin = SkinUtil.getCostSkin(this._good.money_type);
			//商品box
			this.itembox.dataSource = new ItemVo(this._good.item_id[0], this._good.item_id[1]);
			
			//最多堆叠数量------------------------------------------------------- 
			lapMaxNum = item.max_overlap == 0 ? 9999 : item.max_overlap;
			//是否限购---------------------------------------------------------- 
			let isLimit = this._good.num != 0;
			limitMaxNum = isLimit ? data.arrlimit : lapMaxNum;
			//货币类型枚举
			let resTypeKey = this._good.money_type;
			//拥有购买货币数量
			let hasRes = App.getResNum(resTypeKey);
			//可以购买最大数量--------------------------------------------------- 
			resMaxNum = Math.floor(hasRes / this._good.price);

			//购买最大数量根据 （1限购数量，2可购买最大数量，3最大堆叠数量） 的最小值来获取
			this._buymaxnum = Math.min(limitMaxNum, resMaxNum, lapMaxNum);	
			//购买数量
			this._buyNum = 1;
			this._counterBar.setInitData(this._buyNum,this._buymaxnum,this.setBuySumMoney.bind(this));
			//商品名
			this.lab_name.text = item.name;
			//单个商品价格
			this.lab_rouyu.text = LanMgr.getLan("",12177) + App.hero.getBagItemNum(this._good.item_id[0]);
			this.lab_overplus.visible = isLimit;
			this.lab_overplus.text = LanMgr.getLan("",12176,this._buymaxnum);
			this.setBuySumMoney();
		}

		/** 购买总价 */
		private setBuySumMoney(): void {
			this._buyNum = this._counterBar.getCurNum();
			//购买数量文本
			this.are_putin.text = this._buyNum.toString();
			//购买总价
			this._buysumMoney = this._buyNum * this._good.price;
			//购买总价文本
			this.lab_sum.text = "X" + Snums(this._buysumMoney);
		}

		/** 购买 */
		private buy(): void {
			//判断货币是否足够
			if(UIUtil.checkNotEnough(this._good.money_type, this._buysumMoney)) {
				return;
			}
			if (this._good.num != 0 && (this._buymaxnum < this._buyNum || this._buyNum < 1)) {
				showToast(LanMgr.getLan("", 10450));
				return;
			}
			let data = { id: this._good.ID, num: this._buyNum, type: this._good.type };
			dispatchEvt(new ShopEvent(ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL), data);
			this.close();
		}
	}
}