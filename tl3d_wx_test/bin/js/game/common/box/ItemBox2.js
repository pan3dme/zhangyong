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
* 基础列表格子
* 有底框，如果在基础ItemBoxUI去添加一个底，整体扩大的话 给个ui都要去调，而且精细的居中问题会很麻烦
*/
var common;
(function (common) {
    var ItemBox2 = /** @class */ (function (_super) {
        __extends(ItemBox2, _super);
        function ItemBox2() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemBox2.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.itemBox.dataSource = data;
            },
            enumerable: true,
            configurable: true
        });
        return ItemBox2;
    }(ui.box.ItemBox2UI));
    common.ItemBox2 = ItemBox2;
})(common || (common = {}));
