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
    var Camera3D = /** @class */ (function (_super) {
        __extends(Camera3D, _super);
        function Camera3D() {
            var _this = _super.call(this) || this;
            _this._distance = 500;
            _this.offset = new tl3d.Vector3D();
            _this.lastFoucs3D = new tl3d.Vector3D;
            _this.needChange = true;
            _this.cameraMatrix = new tl3d.Matrix3D;
            return _this;
        }
        Object.defineProperty(Camera3D.prototype, "distance", {
            get: function () {
                return this._distance;
            },
            set: function (value) {
                this._distance = value;
            },
            enumerable: true,
            configurable: true
        });
        Camera3D.prototype.lookAt = function ($target) {
            this.lookAtTarget = $target;
        };
        Object.defineProperty(Camera3D.prototype, "astarRect", {
            set: function (value) {
                this._astarRect = new tl3d.Rectangle();
                this._astarRect.x = value.x;
                this._astarRect.y = value.y;
                this._astarRect.width = value.width;
                this._astarRect.height = value.height;
                this._midPos = new tl3d.Vector3D();
                this._midPos.x = this._astarRect.x + this._astarRect.width / 2;
                this._midPos.z = this._astarRect.y + this._astarRect.height / 2;
                this._scaleVec = new tl3d.Vector3D();
                this._scaleVec.x = (this._astarRect.width - 100) / this._astarRect.width;
                this._scaleVec.z = (this._astarRect.height - 100) / this._astarRect.height;
            },
            enumerable: true,
            configurable: true
        });
        Camera3D.prototype.update = function () {
            if (this.lookAtTarget) {
                var ty = 28;
                if (this._astarRect && this._astarRect.width < 600) {
                    var $toPos = new tl3d.Vector3D;
                    $toPos.x = ((this.lookAtTarget.px - this._midPos.x) * this._scaleVec.x) + this._midPos.x;
                    $toPos.z = ((this.lookAtTarget.pz - this._midPos.z) * this._scaleVec.z) + this._midPos.z;
                    $toPos.y = this.lookAtTarget.py;
                    tl3d.Scene_data.focus3D.x = $toPos.x;
                    tl3d.Scene_data.focus3D.y = $toPos.y + ty;
                    tl3d.Scene_data.focus3D.z = $toPos.z;
                }
                else {
                    tl3d.Scene_data.focus3D.x = this.lookAtTarget.px;
                    tl3d.Scene_data.focus3D.y = this.lookAtTarget.py + ty;
                    tl3d.Scene_data.focus3D.z = this.lookAtTarget.pz;
                }
                if (this.lastFoucs3D.x != tl3d.Scene_data.focus3D.x || this.lastFoucs3D.y != tl3d.Scene_data.focus3D.y || this.lastFoucs3D.z != tl3d.Scene_data.focus3D.z) {
                    this.lastFoucs3D.x = tl3d.Scene_data.focus3D.x;
                    this.lastFoucs3D.y = tl3d.Scene_data.focus3D.y;
                    this.lastFoucs3D.z = tl3d.Scene_data.focus3D.z;
                    this.needChange = true;
                }
                else {
                    this.needChange = false;
                }
                // Scene_data.focus3D.rotationY = Scene_data.gameAngle;
            }
        };
        Object.defineProperty(Camera3D.prototype, "postion", {
            get: function () {
                return new tl3d.Vector3D(this.x, this.y, this.z);
            },
            enumerable: true,
            configurable: true
        });
        return Camera3D;
    }(tl3d.Object3D));
    tl3d.Camera3D = Camera3D;
})(tl3d || (tl3d = {}));
