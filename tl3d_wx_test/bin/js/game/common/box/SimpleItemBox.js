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
* 简单基础列表格子
*/
var common;
(function (common) {
    var SimpleItemBox = /** @class */ (function (_super) {
        __extends(SimpleItemBox, _super);
        function SimpleItemBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SimpleItemBox.prototype, "dataSource", {
            set: function ($data) {
                this._dataSource = $data;
                if ($data) {
                    this.imgIcon.skin = $data.getIconUrl();
                    this.lbCount.text = "x" + Snums($data.getNum());
                }
            },
            enumerable: true,
            configurable: true
        });
        return SimpleItemBox;
    }(ui.box.SimpleItemBoxUI));
    common.SimpleItemBox = SimpleItemBox;
})(common || (common = {}));
