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
var common;
(function (common) {
    var XianshiBaoxiangView = /** @class */ (function (_super) {
        __extends(XianshiBaoxiangView, _super);
        function XianshiBaoxiangView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            return _this;
        }
        XianshiBaoxiangView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.zOrder = this.dataSource;
        };
        XianshiBaoxiangView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.btnConfirm.on(Laya.Event.CLICK, this, this.close);
        };
        XianshiBaoxiangView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this, type);
        };
        return XianshiBaoxiangView;
    }(ui.component.XianshiBaoxiangUI));
    common.XianshiBaoxiangView = XianshiBaoxiangView;
})(common || (common = {}));
