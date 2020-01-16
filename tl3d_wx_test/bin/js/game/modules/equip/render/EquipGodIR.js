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
    var EquipGodIR = /** @class */ (function (_super) {
        __extends(EquipGodIR, _super);
        function EquipGodIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EquipGodIR.prototype, "dataSource", {
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
        EquipGodIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = this.dataSource;
                this.headBox.visible = true;
                this.anim_select.play();
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.visible = false;
                this.anim_select.gotoAndStop(0);
            }
        };
        return EquipGodIR;
    }(ui.equip.render.EquipGodIRUI));
    game.EquipGodIR = EquipGodIR;
})(game || (game = {}));
