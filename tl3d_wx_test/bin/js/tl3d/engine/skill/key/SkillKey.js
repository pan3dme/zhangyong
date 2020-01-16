var tl3d;
(function (tl3d) {
    var SkillKey = /** @class */ (function () {
        function SkillKey(skillMgr) {
            this.time = 0;
            this.skillMgr = skillMgr;
        }
        SkillKey.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true;
            this.skillMgr.scene.addParticle(this.particle);
        };
        SkillKey.prototype.setInfo = function (obj) {
            this.time = obj.frame * tl3d.Scene_data.frameTime;
            this.particle = tl3d.ParticleManager.getInstance().getParticleByte(tl3d.Scene_data.fileRoot + obj.url);
        };
        SkillKey.prototype.reset = function () {
            //this.time = 0;
            this.skillMgr.scene.removeParticle(this.particle);
        };
        SkillKey.prototype.destory = function () {
            if (this.particle) {
                this.particle.destory();
                this.particle = null;
            }
            this.removeCallFun = null;
        };
        return SkillKey;
    }());
    tl3d.SkillKey = SkillKey;
})(tl3d || (tl3d = {}));
