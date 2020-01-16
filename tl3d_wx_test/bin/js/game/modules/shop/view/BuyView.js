var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var BuyView = /** @class */ (function (_super) {
        __extends(BuyView, _super);
        function BuyView() {
            var _this = _super.call(this) || this;
            /**购买数量 */
            _this._buyNum = 1;
            /**最大可购买数量 */
            _this._buymaxnum = 0;
            /**当前购买总价 */
            _this._buysumMoney = 0;
            return _this;
        }
        BuyView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.Shop_BuyView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12175) };
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btn_add, this.btn_addTen, this.btn_red, this.btn_redTen, this.are_putin);
            this.btn_buy.on(Laya.Event.CLICK, this, this.buy);
        };
        BuyView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        BuyView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        BuyView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this, type);
        };
        BuyView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            Laya.timer.clearAll(this);
        };
        BuyView.prototype.init = function () {
            //初始化数据
            //限购最大数量
            var limitMaxNum = 0;
            //最多堆叠数量
            var lapMaxNum = 0;
            //可购买最大数量
            var resMaxNum = 0;
            //dataSource
            var data = this.dataSource;
            //商品表
            this._good = data.item;
            //物品表
            var item = tb.TB_item.get_TB_itemById(this._good.item_id[0]);
            //货币图标
            this.img_type1.skin = "";
            this.img_type2.skin = SkinUtil.getCostSkin(this._good.money_type);
            //商品box
            this.itembox.dataSource = new ItemVo(this._good.item_id[0], this._good.item_id[1]);
            //最多堆叠数量------------------------------------------------------- 
            lapMaxNum = item.max_overlap == 0 ? 9999 : item.max_overlap;
            //是否限购---------------------------------------------------------- 
            var isLimit = this._good.num != 0;
            limitMaxNum = isLimit ? data.arrlimit : lapMaxNum;
            //货币类型枚举
            var resTypeKey = this._good.money_type;
            //拥有购买货币数量
            var hasRes = App.getResNum(resTypeKey);
            //可以购买最大数量--------------------------------------------------- 
            resMaxNum = Math.floor(hasRes / this._good.price);
            //购买最大数量根据 （1限购数量，2可购买最大数量，3最大堆叠数量） 的最小值来获取
            this._buymaxnum = Math.min(limitMaxNum, resMaxNum, lapMaxNum);
            //购买数量
            this._buyNum = 1;
            this._counterBar.setInitData(this._buyNum, this._buymaxnum, this.setBuySumMoney.bind(this));
            //商品名
            this.lab_name.text = item.name;
            //单个商品价格
            this.lab_rouyu.text = LanMgr.getLan("", 12177) + App.hero.getBagItemNum(this._good.item_id[0]);
            this.lab_overplus.visible = isLimit;
            this.lab_overplus.text = LanMgr.getLan("", 12176, this._buymaxnum);
            this.setBuySumMoney();
        };
        /** 购买总价 */
        BuyView.prototype.setBuySumMoney = function () {
            this._buyNum = this._counterBar.getCurNum();
            //购买数量文本
            this.are_putin.text = this._buyNum.toString();
            //购买总价
            this._buysumMoney = this._buyNum * this._good.price;
            //购买总价文本
            this.lab_sum.text = "X" + Snums(this._buysumMoney);
        };
        /** 购买 */
        BuyView.prototype.buy = function () {
            //判断货币是否足够
            if (UIUtil.checkNotEnough(this._good.money_type, this._buysumMoney)) {
                return;
            }
            if (this._good.num != 0 && (this._buymaxnum < this._buyNum || this._buyNum < 1)) {
                showToast(LanMgr.getLan("", 10450));
                return;
            }
            var data = { id: this._good.ID, num: this._buyNum, type: this._good.type };
            dispatchEvt(new game.ShopEvent(game.ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL), data);
            this.close();
        };
        return BuyView;
    }(ui.shop.BuyUI));
    game.BuyView = BuyView;
})(game || (game = {}));
