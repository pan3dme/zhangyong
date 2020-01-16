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
var common;
(function (common) {
    var scaleButton = /** @class */ (function (_super) {
        __extends(scaleButton, _super);
        function scaleButton(skin, label) {
            if (skin === void 0) { skin = null; }
            if (label === void 0) { label = ""; }
            var _this = _super.call(this, skin) || this;
            _this.scaleTime = 100;
            _this.initScaleX = 1;
            _this.initScaleY = 1;
            //添加鼠标按下事件侦听。按时时缩小按钮。
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleSmall);
            //添加鼠标抬起事件侦听。抬起时还原按钮。
            _this.on(Laya.Event.MOUSE_UP, _this, _this.scaleBig);
            //添加鼠标离开事件侦听。离开时还原按钮。
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.scaleBig);
            _this.frameOnce(2, _this, _this.onDelay);
            return _this;
        }
        scaleButton.prototype.onDelay = function () {
            this.initScaleX = this.scaleX || 1;
            this.initScaleY = this.scaleY || 1;
        };
        scaleButton.prototype.scaleSmall = function () {
            //缩小至0.8的缓动效果
            Laya.Tween.to(this, { scaleX: 0.9, scaleY: 0.9 }, this.scaleTime);
        };
        scaleButton.prototype.scaleBig = function () {
            //变大还原的缓动效果
            Laya.Tween.to(this, { scaleX: this.initScaleX, scaleY: this.initScaleY }, this.scaleTime);
        };
        return scaleButton;
    }(Laya.Image));
    common.scaleButton = scaleButton;
})(common || (common = {}));
