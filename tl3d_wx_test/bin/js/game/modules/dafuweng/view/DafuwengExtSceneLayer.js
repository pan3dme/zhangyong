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
var game;
(function (game) {
    var DafuwengExtSceneLayer = /** @class */ (function (_super) {
        __extends(DafuwengExtSceneLayer, _super);
        function DafuwengExtSceneLayer() {
            return _super.call(this) || this;
        }
        /**基于偏移量设置位置 */
        DafuwengExtSceneLayer.prototype.setPosition = function (x, y) {
            this.x = x + Launch.offsetX;
            this.y = y + Launch.offsetY;
        };
        /**
          * 充值镜头
          */
        DafuwengExtSceneLayer.prototype.upFrame = function () {
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            tl3d.TimeUtil.update();
            //设置为2D的镜头角度
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -60;
            Scene_data.cam3D.distance = 250;
            //这是是移动2D的基础坐标
            scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y);
            scene2d.CanvasPostionModel.getInstance().resetSize();
            Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT); //重置深度
            tl3d.MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Scene_data.context3D._contextSetTest.clear();
            this.scene.upFrame();
        };
        /**
         * 添加ui角色
         * @param mid
         * @param postionx
         * @param postiony
         * @param rotate
         * @param scale
         */
        DafuwengExtSceneLayer.prototype.addModelChar = function (mid, postionx, postiony, rotate, scale, rotationz) {
            if (rotate === void 0) { rotate = 180; }
            if (scale === void 0) { scale = 2.7; }
            if (rotationz === void 0) { rotationz = 0; }
            var sceneChar = new game.DafuwengChar();
            this.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl(mid));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.rotationZ = rotationz;
            sceneChar.set2dPos(postionx, postiony); //坐标
            sceneChar.scale = scale;
            return sceneChar;
        };
        return DafuwengExtSceneLayer;
    }(Base2dSceneLayer));
    game.DafuwengExtSceneLayer = DafuwengExtSceneLayer;
})(game || (game = {}));
