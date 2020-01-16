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
    var ModelRes = /** @class */ (function (_super) {
        __extends(ModelRes, _super);
        function ModelRes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelRes.prototype.load = function (url, $fun) {
            var _this = this;
            this._fun = $fun;
            tl3d.LoadManager.getInstance().load(url, tl3d.LoadManager.BYTE_TYPE, function ($byte) {
                _this.loadComplete($byte);
            });
        };
        ModelRes.prototype.loadComplete = function ($byte) {
            var _this = this;
            this._byte = new tl3d.TLByteArray($byte);
            this._byte.position = 0;
            this.read(function () { _this.readNexte(); }); //img
        };
        ModelRes.prototype.readNexte = function () {
            this.read(); //obj
            this.read(); //material
            this.objUrl = this._byte.readUTF();
            this.materialUrl = this._byte.readUTF();
            if (this._byte.readBoolean()) {
                this.light = new tl3d.LightVo();
                this.light.ambientColor[0] = this._byte.readFloat();
                this.light.ambientColor[1] = this._byte.readFloat();
                this.light.ambientColor[2] = this._byte.readFloat();
                this.light.sunColor[0] = this._byte.readFloat();
                this.light.sunColor[1] = this._byte.readFloat();
                this.light.sunColor[2] = this._byte.readFloat();
                this.light.sunDirect[0] = this._byte.readFloat();
                this.light.sunDirect[1] = this._byte.readFloat();
                this.light.sunDirect[2] = this._byte.readFloat();
            }
            this._fun();
        };
        return ModelRes;
    }(tl3d.BaseRes));
    tl3d.ModelRes = ModelRes;
})(tl3d || (tl3d = {}));
