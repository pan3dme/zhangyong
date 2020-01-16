var scene2d;
(function (scene2d) {
    var Scene_data = tl3d.Scene_data;
    var CanvasPostionModel = /** @class */ (function () {
        function CanvasPostionModel() {
            this.lastPostionV2d = new tl3d.Vector2D;
            this._lastMousePos = new tl3d.Vector2D();
            this.tureMoveV2d = new tl3d.Vector2D(0, 0);
            this.initSceneFocueEvent();
        }
        CanvasPostionModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new CanvasPostionModel();
            }
            return this._instance;
        };
        CanvasPostionModel.prototype.initSceneFocueEvent = function () {
            Scene_data.uiBlankStage.addEventListener(tl3d.InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiBlankStage.addEventListener(tl3d.InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(tl3d.InteractiveEvent.Move, this.onMouseMove, this);
        };
        CanvasPostionModel.prototype.onMouseMove = function ($evt) {
            if (this._isMouseDown) {
                this.tureMoveV2d.x = this.lastPostionV2d.x + $evt.x - this._lastMousePos.x;
                this.tureMoveV2d.y = this.lastPostionV2d.y + $evt.y - this._lastMousePos.y;
                this.resetSize();
            }
        };
        CanvasPostionModel.prototype.onMouseDown = function ($evt) {
            this._lastMousePos.x = $evt.x;
            this._lastMousePos.y = $evt.y;
            this.lastPostionV2d = new tl3d.Vector2D(this.tureMoveV2d.x, this.tureMoveV2d.y);
            this._isMouseDown = true;
        };
        CanvasPostionModel.prototype.onMouseUp = function ($evt) {
            this._isMouseDown = false;
        };
        CanvasPostionModel.prototype.resetSize = function () {
            var $nScale = (0.25 / scene2d.Override2dEngine.htmlScale);
            Scene_data.focus3D.x = 0 + Scene_data.stageWidth / 2 * $nScale;
            Scene_data.focus3D.z = 0 - Scene_data.stageHeight / 2 * $nScale / (Math.sin(CanvasPostionModel.scene2dRotation45 * Math.PI / 180));
            Scene_data.focus3D.x -= this.tureMoveV2d.x * $nScale;
            Scene_data.focus3D.z += this.tureMoveV2d.y * $nScale / (Math.sin(CanvasPostionModel.scene2dRotation45 * Math.PI / 180));
            scene2d.Ground2dBaseSprite.perentpos = this.tureMoveV2d;
        };
        CanvasPostionModel.scene2dRotation45 = 45;
        return CanvasPostionModel;
    }());
    scene2d.CanvasPostionModel = CanvasPostionModel;
})(scene2d || (scene2d = {}));
