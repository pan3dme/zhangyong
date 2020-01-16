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
    var DynamicTexItem = /** @class */ (function (_super) {
        __extends(DynamicTexItem, _super);
        function DynamicTexItem() {
            return _super.call(this) || this;
        }
        DynamicTexItem.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this._textureDynamic) {
                tl3d.Scene_data.context3D.deleteTexture(this._textureDynamic);
            }
            //if (this.textureRes){
            //    this.textureRes.useNum--;
            //}
            this.target = null;
            //this.curve = null;
        };
        DynamicTexItem.prototype.initCurve = function ($type) {
            this.curve = new tl3d.Curve;
            this.curve.type = $type;
        };
        Object.defineProperty(DynamicTexItem.prototype, "texture", {
            get: function () {
                if (this._textureDynamic) {
                    return this._textureDynamic;
                }
                else {
                    if (this.textureRes) {
                        return this.textureRes.texture;
                    }
                    else {
                        return null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        DynamicTexItem.prototype.creatTextureByCurve = function () {
            var i = 0;
            var endVecIndex = this.curve.valueVec.length - 1;
            var imgNumVec = new Array;
            for (var i = 0; i < this.life; i++) {
                if (i < this.curve.begintFrame) {
                    imgNumVec.push(this.curve.valueVec[0][0] * 0xff, this.curve.valueVec[0][1] * 0xff, this.curve.valueVec[0][2] * 0xff, this.curve.valueVec[0][3] * 0xff);
                }
                else if (i > this.curve.maxFrame) {
                    if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    }
                    else {
                        imgNumVec.push(this.curve.valueVec[endVecIndex][0] * 0xff, this.curve.valueVec[endVecIndex][1] * 0xff, this.curve.valueVec[endVecIndex][2] * 0xff, this.curve.valueVec[endVecIndex][3] * 0xff);
                    }
                }
                else {
                    if (this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    }
                    else {
                        var index = i - this.curve.begintFrame;
                        imgNumVec.push(this.curve.valueVec[index][0] * 0xff, this.curve.valueVec[index][1] * 0xff, this.curve.valueVec[index][2] * 0xff, this.curve.valueVec[index][3] * 0xff);
                    }
                }
            }
            var $ctx = tl3d.UIManager.getInstance().getContext2D(64, 2, false);
            var baseindex;
            for (var i = 0; i < 64; i++) {
                baseindex = Math.floor(i / 64 * this.life) * 4;
                $ctx.fillStyle = "rgba(" + Math.floor(imgNumVec[baseindex + 0]) + "," + Math.floor(imgNumVec[baseindex + 1]) + "," + Math.floor(imgNumVec[baseindex + 2]) + "," + Math.floor(imgNumVec[baseindex + 3]) / 0xff + ")";
                $ctx.fillRect(i, 0, 1, 2);
            }
            this._textureDynamic = tl3d.TextureManager.getInstance().getCanvasTexture($ctx).texture;
        };
        Object.defineProperty(DynamicTexItem.prototype, "life", {
            //public argbToHex(r: Number, g: Number, b: Number, a: Number): uint {
            //    var expColor: uint = uint(a * 0xff) << 24 | uint(r * 0xff) << 16 | uint(g * 0xff) << 8 | uint(b * 0xff);
            //    return expColor;
            //}
            get: function () {
                return this._life;
            },
            set: function (value) {
                this._life = value;
            },
            enumerable: true,
            configurable: true
        });
        return DynamicTexItem;
    }(tl3d.DynamicBaseTexItem));
    tl3d.DynamicTexItem = DynamicTexItem;
})(tl3d || (tl3d = {}));
