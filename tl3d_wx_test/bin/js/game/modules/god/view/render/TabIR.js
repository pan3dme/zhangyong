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
    var godTabIR = /** @class */ (function (_super) {
        __extends(godTabIR, _super);
        function godTabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(godTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        godTabIR.prototype.refreshData = function (item) {
            if (item)
                this.btn_name.label = !isArrayFn(item) ? item : item[0];
        };
        return godTabIR;
    }(ui.god.render.TabItemRenderUI));
    game.godTabIR = godTabIR;
})(game || (game = {}));
