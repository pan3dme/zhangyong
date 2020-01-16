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
    var Display3DUISprite = /** @class */ (function (_super) {
        __extends(Display3DUISprite, _super);
        function Display3DUISprite() {
            var _this = _super.call(this) || this;
            _this.uiMatrix = new tl3d.Matrix3D;
            _this.uiMatrix.prependTranslation(0, 0, 600);
            _this.uiMatrix.prependRotation(-15, tl3d.Vector3D.X_AXIS);
            _this.uiMatrix.prependRotation(0, tl3d.Vector3D.Y_AXIS);
            _this.uiViewMatrix = new tl3d.Matrix3D;
            return _this;
        }
        Display3DUISprite.prototype.loadRes = function ($name) {
            var _this = this;
            if (!this.modelRes) {
                this.modelRes = new tl3d.ModelRes();
            }
            this.modelRes.load(tl3d.Scene_data.fileRoot + getModelUrl($name), function () { _this.loadResComFinish(); });
        };
        Display3DUISprite.prototype.loadResComFinish = function () {
            this.setObjUrl(this.modelRes.objUrl);
            this.setMaterialUrl(this.modelRes.materialUrl);
        };
        Display3DUISprite.prototype.loadGroup = function ($name) {
            var _this = this;
            var groupRes = new tl3d.GroupRes;
            groupRes.load(tl3d.Scene_data.fileRoot + "model/" + $name + ".txt", function () { _this.loadPartRes(groupRes); });
        };
        Display3DUISprite.prototype.loadPartRes = function (groupRes) {
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                if (item.types == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
                }
                else if (item.types == tl3d.BaseRes.PREFAB_TYPE) {
                    this.setObjUrl(item.objUrl);
                    this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                }
            }
        };
        Display3DUISprite.prototype.resize = function () {
            this.uiViewMatrix.identity();
            this.uiViewMatrix.perspectiveFieldOfViewLH(1, 1, 500, 5000);
            this.uiViewMatrix.appendScale(1000 / tl3d.Scene_data.stageWidth, 1000 / tl3d.Scene_data.stageHeight, 1);
        };
        Display3DUISprite.prototype.setCam = function () {
            //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "posMatrix3D", this.posMatrix.m);
            tl3d.Scene_data.context3D.setVcMatrix4fv(this.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
            tl3d.Scene_data.context3D.setVcMatrix4fv(this.material.shader, "camMatrix3D", this.uiMatrix.m);
        };
        Display3DUISprite.prototype.update = function () {
            tl3d.Scene_data.context3D.setWriteDepth(true);
            tl3d.Scene_data.context3D.setDepthTest(true);
            _super.prototype.update.call(this);
            tl3d.Scene_data.context3D.setWriteDepth(false);
            tl3d.Scene_data.context3D.setDepthTest(false);
            ////console.log(this.posMatrix.m)
        };
        return Display3DUISprite;
    }(tl3d.Display3DSprite));
    tl3d.Display3DUISprite = Display3DUISprite;
})(tl3d || (tl3d = {}));
