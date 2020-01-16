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
var scene2d;
(function (scene2d) {
    var Scene_data = tl3d.Scene_data;
    var Override2dEngine = /** @class */ (function (_super) {
        __extends(Override2dEngine, _super);
        function Override2dEngine() {
            return _super.call(this) || this;
        }
        Override2dEngine.initConfig = function () {
            var _this = this;
            tl3d.Engine.init = function ($caves) { _this.init($caves); }; //更换引擎初始化
            tl3d.Engine.resetSize = function (width, height) { _this.resetSize(width, height); }; //更尺寸变化
            tl3d.Engine.resetViewMatrx3D = function () { _this.resetViewMatrx3D(); };
        };
        Override2dEngine.resetSize = function (width, height) {
            if (isNaN(width)) {
                width = document.body.clientWidth;
            }
            if (isNaN(height)) {
                height = document.body.clientHeight;
            }
            tl3d.Scene_data.stageWidth = width;
            Scene_data.stageHeight = height;
            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);
            tl3d.UIManager.getInstance().resize();
            tl3d.Engine.resetViewMatrx3D();
            scene2d.CanvasPostionModel.getInstance().resetSize();
        };
        Override2dEngine.init = function ($caves) {
            scene3d.OverrideEngine.init($caves);
            tl3d.Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            tl3d.Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -45;
            tl3d.Scene_data.cam3D.distance = 250;
        };
        Override2dEngine.resetViewMatrx3D = function () {
            if (Scene_data.viewMatrx3D) {
                Scene_data.viewMatrx3D.identity();
            }
            else {
                Scene_data.viewMatrx3D = new tl3d.Matrix3D;
            }
            var fovw = tl3d.Scene_data.stageWidth;
            var fovh = tl3d.Scene_data.stageHeight;
            tl3d.Scene_data.sceneViewHW = Math.max(fovw, fovh);
            Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            tl3d.Scene_data.viewMatrx3D.appendScale(2 * this.htmlScale, 2 * this.htmlScale, 1);
        };
        Override2dEngine.htmlScale = 0.5;
        return Override2dEngine;
    }(scene3d.OverrideEngine));
    scene2d.Override2dEngine = Override2dEngine;
})(scene2d || (scene2d = {}));
