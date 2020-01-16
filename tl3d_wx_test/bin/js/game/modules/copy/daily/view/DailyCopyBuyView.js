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
var game;
(function (game) {
    var DailyCopyBuyView = /** @class */ (function (_super) {
        __extends(DailyCopyBuyView, _super);
        function DailyCopyBuyView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        DailyCopyBuyView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        DailyCopyBuyView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        DailyCopyBuyView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        DailyCopyBuyView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.btnBuy.off(Laya.Event.CLICK, this, this.onBuy);
            this.btnCancel.off(Laya.Event.CLICK, this, this.onCancel);
        };
        DailyCopyBuyView.prototype.initView = function () {
            var model = game.DailyCopyModel.getInstance();
            var type = this.dataSource;
            this.bgPanel.dataSource = { uiName: UIConst.Copy_DailyBuyView, closeOnSide: this.isModelClose };
            var limitType = model.getLimitType(type);
            this.btnBuy.on(Laya.Event.CLICK, this, this.onBuy);
            this.btnCancel.on(Laya.Event.CLICK, this, this.onCancel);
            this.lbCost.text = model.getBuyCost(limitType).toString();
            var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum);
            var count = total - App.hero.getlimitValue(limitType);
            this.lbCount.text = LanMgr.getLan('', 10106, count);
        };
        DailyCopyBuyView.prototype.onBuy = function () {
            dispatchEvt(new game.DailyEvent(game.DailyEvent.BUY_DAILY_COPY_COUNT, this.dataSource));
        };
        DailyCopyBuyView.prototype.onCancel = function () {
            UIMgr.hideUIByName(UIConst.Copy_DailyBuyView);
        };
        return DailyCopyBuyView;
    }(ui.dailycopy.DailyCopyBuyUI));
    game.DailyCopyBuyView = DailyCopyBuyView;
})(game || (game = {}));
