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
    var SkillBugBind = /** @class */ (function () {
        function SkillBugBind() {
        }
        SkillBugBind.prototype.getSocket = function (socketName, resultMatrix) {
            this.bindMatrix.clone(resultMatrix);
        };
        SkillBugBind.prototype.getSunType = function () {
            return 1;
        };
        return SkillBugBind;
    }());
    tl3d.SkillBugBind = SkillBugBind;
    var SkillFixEffect = /** @class */ (function (_super) {
        __extends(SkillFixEffect, _super);
        function SkillFixEffect(skill) {
            var _this = _super.call(this, skill.skillMgr) || this;
            _this.skill = skill;
            return _this;
        }
        SkillFixEffect.prototype.setInfo = function (obj) {
            _super.prototype.setInfo.call(this, obj);
            var data = obj;
            this.pos = data.pos;
            this.rotation = data.rotation;
            this.hasSocket = data.hasSocket;
            this.socket = data.socket;
        };
        SkillFixEffect.prototype.onPlayCom = function (event) {
            if (event === void 0) { event = null; }
            this.particle.removeEventListener(tl3d.BaseEvent.COMPLETE, this.onPlayCom, this);
            this.skill.skillMgr.scene.removeParticle(this.particle);
            this.removeCallFun(this);
        };
        SkillFixEffect.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true;
            this.skill.skillMgr.scene.addParticle(this.particle);
            this.particle.addEventListener(tl3d.BaseEvent.COMPLETE, this.onPlayCom, this);
            if (this.hasSocket) {
                var targetActive = this.active;
                this.particle.bindTarget = (targetActive);
                this.particle.bindSocket = this.socket;
            }
            else {
                var ma = new tl3d.Matrix3D;
                ma.appendRotation(this.active.rotationY, tl3d.Vector3D.Y_AXIS);
                var v3d = ma.transformVector(this.pos);
                v3d.x += this.outPos == null ? this.active.x : this.outPos.x;
                v3d.y += this.outPos == null ? this.active.y : this.outPos.y;
                v3d.z += this.outPos == null ? this.active.z : this.outPos.z;
                var $SkillBugBind = new tl3d.SkillBugBind();
                $SkillBugBind.bindMatrix = new tl3d.Matrix3D;
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.x, tl3d.Vector3D.X_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.y, tl3d.Vector3D.Y_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.z, tl3d.Vector3D.Z_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.active.rotationY, tl3d.Vector3D.Y_AXIS);
                $SkillBugBind.bindMatrix.appendTranslation(v3d.x, v3d.y, v3d.z);
                this.particle.bindTarget = $SkillBugBind;
            }
        };
        return SkillFixEffect;
    }(tl3d.SkillEffect));
    tl3d.SkillFixEffect = SkillFixEffect;
})(tl3d || (tl3d = {}));
