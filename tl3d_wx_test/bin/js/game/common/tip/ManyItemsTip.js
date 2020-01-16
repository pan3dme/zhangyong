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
    var ManyItemsTip = /** @class */ (function (_super) {
        __extends(ManyItemsTip, _super);
        function ManyItemsTip() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        ManyItemsTip.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView(this.dataSource.data);
            if (this.dataSource.info) {
                this.lab_info.text = this.dataSource.info;
            }
        };
        ManyItemsTip.prototype.initView = function (data) {
            this.list_item.x = 301 - ((45 + (this.list_item.spaceX / 2)) * this.dataSource.length);
            this.list_item.array = data;
            this.list_item.width = data.length * 90 + (data.length - 1) * this.list_item.spaceX;
        };
        ManyItemsTip.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list_item.array = null;
        };
        return ManyItemsTip;
    }(ui.component.ManyItemsTipUI));
    common.ManyItemsTip = ManyItemsTip;
})(common || (common = {}));
