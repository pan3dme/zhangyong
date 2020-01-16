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
var tl3d;
(function (tl3d) {
    var TextureRes = /** @class */ (function (_super) {
        __extends(TextureRes, _super);
        function TextureRes(url) {
            var _this = _super.call(this) || this;
            _this.url = url;
            return _this;
        }
        TextureRes.prototype.destory = function () {
            tl3d.Scene_data.context3D.deleteTexture(this.texture);
            //console.log("销毁纹理",this.url);
        };
        return TextureRes;
    }(tl3d.ResCount));
    tl3d.TextureRes = TextureRes;
})(tl3d || (tl3d = {}));
