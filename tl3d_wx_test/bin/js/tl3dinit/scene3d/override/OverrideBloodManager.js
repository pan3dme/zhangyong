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
var scene3d;
(function (scene3d) {
    var ExpTextJumpUiDrawAndRefreash256 = /** @class */ (function (_super) {
        __extends(ExpTextJumpUiDrawAndRefreash256, _super);
        function ExpTextJumpUiDrawAndRefreash256() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpTextJumpUiDrawAndRefreash256.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor;
            if ($vo.type == tl3d.TextJumpType.EXPERIENCE) {
                txtcolor = tl3d.ArtFont.num54;
            }
            var distion = tl3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            tl3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new tl3d.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), tl3d.UIData.publicUi);
            tl3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);
            tl3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        };
        return ExpTextJumpUiDrawAndRefreash256;
    }(tl3d.ExpTextJumpUiDrawAndRefreash));
    scene3d.ExpTextJumpUiDrawAndRefreash256 = ExpTextJumpUiDrawAndRefreash256;
})(scene3d || (scene3d = {}));
(function (scene3d) {
    var OverrideBloodManager = /** @class */ (function (_super) {
        __extends(OverrideBloodManager, _super);
        function OverrideBloodManager() {
            var _this = _super.call(this) || this;
            _this._jumpText256_256 = new tl3d.AlphaUiContianer(scene3d.ExpTextJumpUiDrawAndRefreash256, new tl3d.Rectangle(0, 0, 256, 256), 2);
            _this.uiContianerItem.push(_this._jumpText256_256);
            return _this;
        }
        OverrideBloodManager.prototype.setExpJump256_256Num = function ($textJumpUiVo) {
            this._jumpText256_256.showTemp($textJumpUiVo);
            // console.log($textJumpUiVo)
        };
        return OverrideBloodManager;
    }(tl3d.BloodManager));
    scene3d.OverrideBloodManager = OverrideBloodManager;
})(scene3d || (scene3d = {}));
