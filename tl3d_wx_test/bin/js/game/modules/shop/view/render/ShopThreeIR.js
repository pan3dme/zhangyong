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
var game;
(function (game) {
    var ShopThreeIR = /** @class */ (function (_super) {
        __extends(ShopThreeIR, _super);
        function ShopThreeIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ShopThreeIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.list_item.array = $value;
            },
            enumerable: true,
            configurable: true
        });
        return ShopThreeIR;
    }(ui.shop.ShopThreeIRUI));
    game.ShopThreeIR = ShopThreeIR;
})(game || (game = {}));
