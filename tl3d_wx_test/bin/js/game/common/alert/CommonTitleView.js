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
    var CommonTitleView = /** @class */ (function (_super) {
        __extends(CommonTitleView, _super);
        function CommonTitleView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CommonTitleView.prototype, "dataSource", {
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
        CommonTitleView.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.eff_guang.play();
                this.img_title.skin = data.title;
                this.closeByBlank.visible = data.hasOwnProperty('closeOnSide') ? data.closeOnSide : true;
            }
            else {
                this.eff_guang.stop();
            }
        };
        return CommonTitleView;
    }(ui.component.CommonTitleUI));
    common.CommonTitleView = CommonTitleView;
})(common || (common = {}));
