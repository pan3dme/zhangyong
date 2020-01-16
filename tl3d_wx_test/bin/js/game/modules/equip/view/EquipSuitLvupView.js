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
    var EquipSuitLvupView = /** @class */ (function (_super) {
        __extends(EquipSuitLvupView, _super);
        function EquipSuitLvupView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.mouseEnabled = false;
            return _this;
        }
        EquipSuitLvupView.prototype.popup = function () {
            this.initView();
            _super.prototype.popup.call(this);
        };
        EquipSuitLvupView.prototype.show = function () {
            this.initView();
            _super.prototype.show.call(this);
        };
        EquipSuitLvupView.prototype.initView = function () {
            var type = this.dataSource[0];
            var num = this.dataSource[1];
            this.clip_num.index = num % 2 != 0 ? (num - num % 2) : num;
            this.clip_num.skin = type == QualityConst.PURPLE ? SkinUtil.equip_purple_suit_num : (type == QualityConst.ORANGE ? SkinUtil.equip_orange_suit_num : SkinUtil.equip_red_suit_num);
            this.imgBg.skin = type == QualityConst.PURPLE ? SkinUtil.equip_purple_suit : (type == QualityConst.ORANGE ? SkinUtil.equip_orange_suit : SkinUtil.equip_red_suit);
            this.visible = false;
        };
        EquipSuitLvupView.prototype.onOpened = function () {
            var _this = this;
            _super.prototype.onOpened.call(this);
            this.y -= 20;
            this.alpha = 0;
            this.visible = true;
            Laya.Tween.to(this, { y: this.y - 150, alpha: 1 }, 600, Laya.Ease.linearIn, new Handler(this, function () {
                Laya.timer.once(1000, _this, function () {
                    _this.close();
                });
            }));
        };
        EquipSuitLvupView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
        };
        return EquipSuitLvupView;
    }(ui.equip.EquipSuitLvupUI));
    game.EquipSuitLvupView = EquipSuitLvupView;
})(game || (game = {}));
