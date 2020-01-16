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
    var TujianIR = /** @class */ (function (_super) {
        __extends(TujianIR, _super);
        function TujianIR() {
            var _this = _super.call(this) || this;
            _this._starLv = 0;
            return _this;
        }
        Object.defineProperty(TujianIR.prototype, "dataSource", {
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
        TujianIR.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                tl3d.ModuleEventManager.addEvent(game.GodEvent.GOD_MAX_STAR_LV_CHANGE, this.onMaxStarLvChange, this);
                this._starLv = data instanceof GodItemVo ? data.starLevel : data.starLv;
                this._godTemp = data instanceof GodItemVo ? data.tab_god : data.godTemp;
                this.lbl_name.text = this._godTemp.name;
                this.lbl_name.color = ColorConst.getTujianNameColor(this._starLv);
                this.heroSkin = SkinUtil.getBigIconById(this._godTemp.icon);
                this.img_icon.skin = this.heroSkin;
                if (!ResUseMgr.isExistRes(this.heroSkin)) {
                    ResUseMgr.useRes([this.heroSkin]);
                }
                this.img_kuang.skin = SkinUtil.getTujianKuang(this._starLv > 5 ? 5 : this._starLv);
                this.img_race.skin = SkinUtil.getTujianRace(this._godTemp.race_type);
                this.box_star.starLevel = this._starLv;
                this.onMaxStarLvChange();
            }
            else {
                if (this.heroSkin) {
                    if (ResUseMgr.isExistRes(this.heroSkin)) {
                        ResUseMgr.releaseRes([this.heroSkin]);
                    }
                }
                this.img_icon.skin = "";
                this._godTemp = null;
                this._starLv = 0;
                tl3d.ModuleEventManager.removeEvent(game.GodEvent.GOD_MAX_STAR_LV_CHANGE, this.onMaxStarLvChange, this);
                this.heroSkin = null;
            }
        };
        TujianIR.prototype.onMaxStarLvChange = function () {
            if (!this._godTemp || this._starLv < 1) {
                this.gray = true;
            }
            else {
                this.gray = this.dataSource instanceof game.TuJianGodTemp && !game.GodUtils.isActiveGodStarLv(this._godTemp.ID, this._starLv);
            }
        };
        return TujianIR;
    }(ui.tujian.render.TujianIRUI));
    game.TujianIR = TujianIR;
})(game || (game = {}));
