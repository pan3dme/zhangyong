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
    var EquipLvupView = /** @class */ (function (_super) {
        __extends(EquipLvupView, _super);
        function EquipLvupView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.mouseEnabled = false;
            return _this;
        }
        EquipLvupView.prototype.popup = function () {
            this.initView();
            _super.prototype.popup.call(this);
        };
        EquipLvupView.prototype.show = function () {
            this.initView();
            _super.prototype.show.call(this);
        };
        EquipLvupView.prototype.initView = function () {
            var type = this.dataSource[0];
            var level = this.dataSource[1];
            if (level > 9) {
                this.clip_ten.visible = true;
                this.clip_one.x = 237;
                this.clip_ten.index = level % 10;
                this.clip_one.index = Math.floor(level / 10);
            }
            else {
                this.clip_ten.visible = false;
                this.clip_one.x = 255;
                this.clip_one.index = level;
            }
            this.imgBg.skin = type == 0 ? SkinUtil.equip_sth_lvup : SkinUtil.equip_ref_lvup;
            this.visible = false;
        };
        EquipLvupView.prototype.onOpened = function () {
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
        EquipLvupView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
        };
        return EquipLvupView;
    }(ui.equip.EquipLvupUI));
    game.EquipLvupView = EquipLvupView;
})(game || (game = {}));
