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
var Base2dSceneLayerExt = /** @class */ (function (_super) {
    __extends(Base2dSceneLayerExt, _super);
    function Base2dSceneLayerExt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
 * 添加ui角色
 * @param mid
 * @param postionx
 * @param postiony
 * @param rotate
 * @param scale
 */
    Base2dSceneLayerExt.prototype.addModelChar = function (mid, postionx, postiony, rotate, scale, rotationz) {
        if (rotate === void 0) { rotate = 180; }
        if (scale === void 0) { scale = 2.7; }
        if (rotationz === void 0) { rotationz = 0; }
        var sceneChar = new GameUIChar();
        this.scene.addMovieDisplay(sceneChar);
        sceneChar.setRoleUrl(getRoleUrl(mid));
        sceneChar.play(tl3d.CharAction.STANAD);
        sceneChar.forceRotationY = rotate;
        sceneChar.rotationZ = rotationz;
        sceneChar.set2dPos(postionx, postiony); //坐标
        sceneChar.scale = scale;
        return sceneChar;
    };
    /**关闭 */
    Base2dSceneLayerExt.prototype.onExit = function () {
        this.scene.clearAllParticle();
        this.scene.removeAllMovieDisplay();
    };
    return Base2dSceneLayerExt;
}(Base2dSceneLayer));
