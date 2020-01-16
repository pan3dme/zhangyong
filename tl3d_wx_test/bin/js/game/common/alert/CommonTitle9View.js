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
/*
* name;
*/
var common;
(function (common) {
    var CommonTitle9View = /** @class */ (function (_super) {
        __extends(CommonTitle9View, _super);
        function CommonTitle9View() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CommonTitle9View.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        CommonTitle9View.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.eff_guang.play();
                this.img_title.skin = data.title;
            }
            else {
                this.eff_guang.stop();
            }
        };
        return CommonTitle9View;
    }(ui.component.CommonTitle9UI));
    common.CommonTitle9View = CommonTitle9View;
})(common || (common = {}));
