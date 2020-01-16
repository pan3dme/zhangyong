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
    /** 音效脚本 */
    var SoundEffectProp = /** @class */ (function (_super) {
        __extends(SoundEffectProp, _super);
        function SoundEffectProp() {
            var _this = _super.call(this) || this;
            _this.frameOnce(2, _this, _this.onDelay);
            return _this;
        }
        SoundEffectProp.prototype.onDelay = function () {
            if (!this.soundUrl) {
                this.soundUrl = "sound/button.mp3";
            }
            if (this.parent) {
                this.parent.on(Laya.Event.CLICK, this, this.onClick);
            }
        };
        SoundEffectProp.prototype.setSoundUrl = function (url) {
            this.soundUrl = url;
        };
        SoundEffectProp.prototype.onClick = function () {
            if (this.soundUrl) {
                AudioMgr.playSound(this.soundUrl);
            }
        };
        SoundEffectProp.prototype.onDispose = function () {
            this.soundUrl = "";
            this.soundtName = "";
            this.soundType = 0;
            this.off(Laya.Event.CLICK, this, this.onClick);
        };
        return SoundEffectProp;
    }(ui.component.SoundEffectUI));
    common.SoundEffectProp = SoundEffectProp;
})(common || (common = {}));
