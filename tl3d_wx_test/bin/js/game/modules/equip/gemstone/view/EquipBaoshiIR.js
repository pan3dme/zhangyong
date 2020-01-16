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
    var EquipBaoshiIR = /** @class */ (function (_super) {
        __extends(EquipBaoshiIR, _super);
        function EquipBaoshiIR() {
            var _this = _super.call(this) || this;
            _this.equipBox.img_suo.visible = false;
            _this.equipBox.lab_isopen.visible = false;
            _this.equipBox.redpoint.onDispose();
            return _this;
        }
        Object.defineProperty(EquipBaoshiIR.prototype, "dataSource", {
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
        EquipBaoshiIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var equipVo = info.equipVo;
                var position = info.position;
                var godVo = info.godVo;
                var equipBox = this.equipBox;
                var isExist = equipVo ? true : false;
                equipBox.dataSource = equipVo;
                equipBox.itemBox.visible = isExist;
                equipBox.itemBox.dataSource = equipVo;
                equipBox.btn_add.visible = false;
                this.imgGem1.visible = godVo.isExistGem((position - 1) * 3 + game.GemstoneType.shengming);
                this.imgGem2.visible = godVo.isExistGem((position - 1) * 3 + game.GemstoneType.gongji);
                this.imgGem3.visible = godVo.isExistGem((position - 1) * 3 + game.GemstoneType.fangyu);
                this.redpoint.onDispose();
                this.redpoint.setRedPointName("equip_baoshi_group_" + godVo.uuid + "_" + position);
                equipBox.ani_select.play();
            }
            else {
                this.equipBox.ani_select.gotoAndStop(0);
            }
        };
        return EquipBaoshiIR;
    }(ui.equip.gemstone.EquipBaoshiIRUI));
    game.EquipBaoshiIR = EquipBaoshiIR;
})(game || (game = {}));
