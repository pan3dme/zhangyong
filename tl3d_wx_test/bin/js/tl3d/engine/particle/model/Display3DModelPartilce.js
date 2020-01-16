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
    var Display3DModelPartilce = /** @class */ (function (_super) {
        __extends(Display3DModelPartilce, _super);
        function Display3DModelPartilce() {
            var _this = _super.call(this) || this;
            //this.objData = new ParticleGpuData();
            _this._resultUvVec = new Array(2);
            return _this;
        }
        Object.defineProperty(Display3DModelPartilce.prototype, "modeldata", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Display3DModelPartilce.prototype.creatData = function () {
            this.data = new tl3d.ParticleModelData;
        };
        Display3DModelPartilce.prototype.setVc = function () {
            this.updateWatchCaramMatrix();
            this.updateUV();
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            // Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "rotationMatrix3D", this._rotationMatrix.m);
            // Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvMove", this._resultUvVec);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);//0
            this.data.vcmatData.set(tl3d.Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);//16
            this.data.vcmatData.set(tl3d.Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);//48
            this.data.vcmatData.set(this.modelMatrix.m, 48);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "rotationMatrix3D", this._rotationMatrix.m);
            //this.data.setFloat32Mat("rotationMatrix3D", this._rotationMatrix.m);//32
            this.data.vcmatData.set(this._rotationMatrix.m, 32);
            //Scene_data.context3D.setVc2fv(this.data.materialParam.shader, "uvMove", this._resultUvVec);
            //this.data.setFloat32Vec("uvMove",this._resultUvVec);//64
            this.data.vcmatData.set(this._resultUvVec, 64);
            tl3d.Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);
            this.setMaterialVc();
        };
        Display3DModelPartilce.prototype.setVa = function () {
            //Scene_data.context3D.setVa(0, 3, this.data.objData.vertexBuffer);
            //Scene_data.context3D.setVa(1, 2, this.data.objData.uvBuffer);
            tl3d.Scene_data.context3D.setWriteDepth(this.data._depthMode == 1);
            var tf = tl3d.Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                tl3d.Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
                tl3d.Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            this.setMaterialTexture();
            tl3d.Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
            tl3d.Scene_data.context3D.setWriteDepth(false);
        };
        Display3DModelPartilce.prototype.updateWatchCaramMatrix = function () {
            this._rotationMatrix.identity();
            if (this.data._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this._rotationMatrix.prependRotation(-tl3d.Scene_data.cam3D.rotationY, tl3d.Vector3D.Y_AXIS);
                this._rotationMatrix.prependRotation(-tl3d.Scene_data.cam3D.rotationX, tl3d.Vector3D.X_AXIS);
            }
            if (this.data._isZiZhuan) {
                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
            }
            //if (_axisRotaion) {
            //    _rotationMatrix.prependRotation(-_axisRotaion.num, _axisRotaion.axis);
            //}
        };
        Display3DModelPartilce.prototype.updateUV = function () {
            var currentFrame = Math.floor((this._time / tl3d.Scene_data.frameTime) / this.data._animInterval);
            var _maxAnimTime = this.data._animLine * this.data._animRow;
            this._resultUvVec[0] = Math.floor(currentFrame % this.data._animLine) / this.data._animLine;
            this._resultUvVec[1] = Math.floor(currentFrame / this.data._animLine) / this.data._animRow;
            this._resultUvVec[0] += this._time / tl3d.Scene_data.frameTime * this.data._uSpeed;
            this._resultUvVec[1] += this._time / tl3d.Scene_data.frameTime * this.data._vSpeed;
            this._resultUvVec[0] = this._resultUvVec[0] % 1;
            this._resultUvVec[1] = this._resultUvVec[1] % 1;
        };
        return Display3DModelPartilce;
    }(tl3d.Display3DParticle));
    tl3d.Display3DModelPartilce = Display3DModelPartilce;
})(tl3d || (tl3d = {}));
