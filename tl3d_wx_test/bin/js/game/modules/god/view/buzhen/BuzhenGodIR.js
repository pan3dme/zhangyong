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
    var BuzhenGodIR = /** @class */ (function (_super) {
        __extends(BuzhenGodIR, _super);
        function BuzhenGodIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BuzhenGodIR.prototype, "dataSource", {
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
        BuzhenGodIR.prototype.refreshData = function () {
            var itemVo = this.dataSource;
            if (itemVo) {
                var godVo = itemVo.godVo;
                this.ui_head.dataSource = godVo;
                this.lbBlood.visible = this.bloodProg.visible = false;
                this.gray = false;
                this.img_yuanzhu.visible = itemVo.godVo.isAid;
                if (itemVo.linuepType == iface.tb_prop.lineupTypeKey.expedition) {
                    if (itemVo.showBlood) {
                        this.lbBlood.visible = this.bloodProg.visible = true;
                        var percent = Math.ceil(itemVo.hp / itemVo.totalHp * 100);
                        this.lbBlood.text = percent + "%";
                        this.bloodProg.value = itemVo.hp / itemVo.totalHp;
                    }
                    else {
                        this.lbBlood.visible = this.bloodProg.visible = false;
                    }
                    if (itemVo.canGray) {
                        this.gray = itemVo.hp <= 0 || godVo.level < game.YuanzhengModel.SHANGZHEN_LEVEL;
                    }
                }
            }
            else {
                this.chk_select.visible = false;
            }
        };
        return BuzhenGodIR;
    }(ui.box.BuzhenItemBoxUI));
    game.BuzhenGodIR = BuzhenGodIR;
})(game || (game = {}));
