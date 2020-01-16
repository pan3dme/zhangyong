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
    var godFuseIR = /** @class */ (function (_super) {
        __extends(godFuseIR, _super);
        function godFuseIR() {
            var _this = _super.call(this) || this;
            _this._oldAttrVal = -1;
            return _this;
        }
        Object.defineProperty(godFuseIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        godFuseIR.prototype.initView = function () {
            if (this.dataSource) {
                this.img_jindu.skin = SkinUtil.getJinduBox(this._dataSource.attrNo);
                this.icon.skin = SkinUtil.getAwakenIcon(this._dataSource.attrNo);
                this.updateView();
                this.ballRP.onDispose();
                this.ballRP.setRedPointName("god_ball_" + this._dataSource.curVo.uuid + "_" + this._dataSource.attrNo);
            }
            else {
                this.ballRP.onDispose();
                this.img_jindu.mask = null;
                this._oldAttrVal = -1;
            }
        };
        godFuseIR.prototype.setSelect = function (val) {
            if (val) {
                this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                    this.ani_select.play();
                    this.ani_select.visible = true;
                }), ResConst.atlas_circle_select);
            }
            else {
                this.ani_select.visible = false;
                this.ani_select.gotoAndStop(0);
            }
        };
        godFuseIR.prototype.updateView = function () {
            var godVo = this._dataSource.curVo;
            var type = this._dataSource.attrNo;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            var attr = godVo.countRonghunAttr();
            var jindu = attr[type] > fusiontab.getMaxAttr(type) ? 1 : attr[type] / fusiontab.getMaxAttr(type);
            /**上升效果 */
            var mask = this.img_jindu.mask;
            if (!this.img_jindu.mask) {
                mask = new Laya.Sprite();
                mask.graphics.drawRect(0, 0, 107, 107, "");
                this.img_jindu.mask = mask;
            }
            if (this._oldAttrVal == -1) {
                mask.pos(0, 107 * (1 - jindu));
                this._oldAttrVal = attr[type];
            }
            else {
                Laya.Tween.to(mask, { y: 107 * (1 - jindu) }, 500);
            }
            this.lbMax.visible = attr[type] >= fusiontab.getMaxAttr(type);
            this.lab_attr.text = LanMgr.attrName[type] + "：" + attr[type];
        };
        return godFuseIR;
    }(ui.god.render.RonghunBoxUI));
    game.godFuseIR = godFuseIR;
})(game || (game = {}));
