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
* 添加一个已领取标签
*/
var common;
(function (common) {
    var ItemBox21 = /** @class */ (function (_super) {
        __extends(ItemBox21, _super);
        function ItemBox21() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemBox21.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.ui_item.dataSource = data;
                if (!data)
                    return;
                this.img_receive.visible = data.getExtParm();
            },
            enumerable: true,
            configurable: true
        });
        return ItemBox21;
    }(ui.box.ItemBox21UI));
    common.ItemBox21 = ItemBox21;
})(common || (common = {}));
