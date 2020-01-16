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
    var fightBossBuffIR = /** @class */ (function (_super) {
        __extends(fightBossBuffIR, _super);
        function fightBossBuffIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(fightBossBuffIR.prototype, "dataSource", {
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
        fightBossBuffIR.prototype.refreshData = function () {
            if (this.dataSource) {
                var vo = this.dataSource;
                this.img_buff.skin = SkinUtil.getBuffIcon(vo.tb_buff.icon);
                this.lab_round.text = String(vo.round);
            }
        };
        return fightBossBuffIR;
    }(ui.fight.box.BossBuffBoxUI));
    game.fightBossBuffIR = fightBossBuffIR;
})(game || (game = {}));
