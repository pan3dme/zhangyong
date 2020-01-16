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
    var Scene_data = tl3d.Scene_data;
    var OverrideEngine = /** @class */ (function (_super) {
        __extends(OverrideEngine, _super);
        function OverrideEngine() {
            return _super.call(this) || this;
        }
        OverrideEngine.initConfig = function () {
            var _this = this;
            tl3d.Engine.init = function ($caves) { _this.init($caves); }; //更换引擎初始化
            tl3d.Engine.resetSize = function (width, height) { _this.resetSize(width, height); }; //更尺寸变化
        };
        OverrideEngine.resetSize = function (width, height) {
            Scene_data.stageWidth = width;
            tl3d.Scene_data.stageHeight = height;
            Scene_data.canvas3D.width = Scene_data.stageWidth;
            Scene_data.canvas3D.height = Scene_data.stageHeight;
            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);
            tl3d.UIManager.getInstance().resize();
            tl3d.Engine.resetViewMatrx3D();
        };
        OverrideEngine.init = function ($caves) {
            Scene_data.vpMatrix = new tl3d.Matrix3D;
            Scene_data.canvas3D = $caves;
            Scene_data.context3D = new tl3d.Context3D();
            Scene_data.context3D.init($caves);
            tl3d.UIManager.getInstance().init();
            Scene_data.cam3D = new tl3d.Camera3D;
            Scene_data.focus3D = new tl3d.Object3D;
            Scene_data.focus3D.rotationY = 135;
            Scene_data.focus3D.rotationX = -45;
            Scene_data.light = new tl3d.LightVo();
            tl3d.TimeUtil.init();
            //todo packageapp
            Scene_data.supportBlob = false;
        };
        return OverrideEngine;
    }(tl3d.Engine));
    scene3d.OverrideEngine = OverrideEngine;
})(scene3d || (scene3d = {}));
