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
    var ItemSelectBox = /** @class */ (function (_super) {
        __extends(ItemSelectBox, _super);
        function ItemSelectBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemSelectBox.prototype, "dataSource", {
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
        ItemSelectBox.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.ui_item.dataSource = info;
                this.anim_select.play();
            }
            else {
                this.ui_item.dataSource = null;
                this.anim_select.gotoAndStop(0);
            }
        };
        return ItemSelectBox;
    }(ui.activity.limitebuy.render.ItemSelectBoxUI));
    game.ItemSelectBox = ItemSelectBox;
})(game || (game = {}));
