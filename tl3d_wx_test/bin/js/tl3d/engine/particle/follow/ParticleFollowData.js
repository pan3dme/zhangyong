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
    var ParticleFollowData = /** @class */ (function (_super) {
        __extends(ParticleFollowData, _super);
        function ParticleFollowData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleFollowData.prototype.getParticle = function () {
            return new tl3d.Display3DFollowPartilce;
        };
        ParticleFollowData.prototype.setAllByteInfo = function ($byte) {
            _super.prototype.setAllByteInfo.call(this, $byte);
            //this.initBingMatrixAry();
            this.uploadGpu();
        };
        ParticleFollowData.prototype.regShader = function () {
            if (!this.materialParam) {
                return;
            }
            var shaderParameAry = this.getShaderParam();
            //var shader: Display3DFollowShader = new Display3DFollowShader()
            this.materialParam.shader = tl3d.ProgrmaManager.getInstance().getMaterialProgram(tl3d.Display3DFollowShader.Display3D_Follow_Shader, tl3d.Display3DFollowShader, this.materialParam.material, shaderParameAry);
            this.materialParam.program = this.materialParam.shader.program;
        };
        return ParticleFollowData;
    }(tl3d.ParticleBallData));
    tl3d.ParticleFollowData = ParticleFollowData;
})(tl3d || (tl3d = {}));
