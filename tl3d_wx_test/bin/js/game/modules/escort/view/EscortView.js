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
    /** 商队护送列表界面 */
    var EscortView = /** @class */ (function (_super) {
        __extends(EscortView, _super);
        function EscortView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.box_Content.addChild(_this.img_bg);
            return _this;
        }
        EscortView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        EscortView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        EscortView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.itemList.array = null;
        };
        EscortView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
        };
        EscortView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.EscortView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12398) };
            this.itemList.array = game.EscortModel.getInstance().getGoodsList();
        };
        return EscortView;
    }(ui.escort.EscortUI));
    game.EscortView = EscortView;
})(game || (game = {}));
