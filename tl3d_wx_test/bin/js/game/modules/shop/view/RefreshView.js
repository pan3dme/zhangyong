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
    var RefreshView = /** @class */ (function (_super) {
        __extends(RefreshView, _super);
        function RefreshView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Shop_RefreshView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12173) };
            return _this;
        }
        /** 界面移除 */
        RefreshView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btn_sure.off(Laya.Event.CLICK, this, this.onRefresh);
            this.btn_cancel.off(Laya.Event.CLICK, this, this.close);
            this.chk_tips.off(Laya.Event.CHANGE, this, this.onChkChange);
            this._marketSetTemp = null;
        };
        RefreshView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        RefreshView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        RefreshView.prototype.initView = function () {
            this._marketSetTemp = this.dataSource;
            //监听
            this.btn_sure.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btn_cancel.on(Laya.Event.CLICK, this, this.close);
            this.chk_tips.on(Laya.Event.CHANGE, this, this.onChkChange);
            this.chk_tips.selected = !RefreshView.IS_TIPS_TODAY;
            this.lab_content.text = LanMgr.getLan("", 12174, this._marketSetTemp.cost_diamond);
            this.img_Gem.x = this.lab_content.x + 124;
        };
        RefreshView.prototype.onChkChange = function () {
            RefreshView.IS_TIPS_TODAY = !this.chk_tips.selected;
        };
        /** 刷新 */
        RefreshView.prototype.onRefresh = function () {
            if (!this._marketSetTemp)
                return;
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, this._marketSetTemp.cost_diamond)) {
                return;
            }
            dispatchEvt(new game.ShopEvent(game.ShopEvent.REFRESH_JISHI_VIEW));
        };
        RefreshView.IS_TIPS_TODAY = true;
        return RefreshView;
    }(ui.shop.ShopRefreshUI));
    game.RefreshView = RefreshView;
})(game || (game = {}));
