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
    var godFuseUseIR = /** @class */ (function (_super) {
        __extends(godFuseUseIR, _super);
        function godFuseUseIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(godFuseUseIR.prototype, "dataSource", {
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
        godFuseUseIR.prototype.refreshData = function (id) {
            this.img_icon.skin = SkinUtil.getRonghunHave(id);
            this.lab_have.text = String(App.hero.getBagItemNum(id));
        };
        return godFuseUseIR;
    }(ui.god.render.HaveItemBoxUI));
    game.godFuseUseIR = godFuseUseIR;
})(game || (game = {}));
