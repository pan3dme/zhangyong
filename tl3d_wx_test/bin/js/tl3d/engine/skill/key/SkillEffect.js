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
    var SkillEffect = /** @class */ (function (_super) {
        __extends(SkillEffect, _super);
        // public active: Object3D;
        function SkillEffect(skillMgr) {
            return _super.call(this, skillMgr) || this;
        }
        Object.defineProperty(SkillEffect.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function ($val) {
                this._active = $val;
            },
            enumerable: true,
            configurable: true
        });
        SkillEffect.prototype.addToRender = function () {
            _super.prototype.addToRender.call(this);
            this.particle.addEventListener(tl3d.BaseEvent.COMPLETE, this.onPlayCom, this);
        };
        SkillEffect.prototype.onPlayCom = function (event) {
            if (event === void 0) { event = null; }
            this.particle.removeEventListener(tl3d.BaseEvent.COMPLETE, this.onPlayCom, this);
            this.skillMgr.scene.removeParticle(this.particle);
            this.removeCallFun(this);
        };
        return SkillEffect;
    }(tl3d.SkillKey));
    tl3d.SkillEffect = SkillEffect;
})(tl3d || (tl3d = {}));
