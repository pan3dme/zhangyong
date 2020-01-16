var GodSkillVo = /** @class */ (function () {
    function GodSkillVo() {
        this.skillfile = "0";
        this.selectFlag = false;
        //已死亡队友数
        this.deathNum = 0;
    }
    GodSkillVo.prototype.getLevel = function () {
        return this.tabskill1.getLevel();
    };
    GodSkillVo.prototype.getQulity = function () {
        return this.tabskill1.getQulity();
    };
    GodSkillVo.prototype.getIconUrl = function () {
        return this.tabskill1.getIconUrl();
    };
    GodSkillVo.prototype.triggerSkill = function () {
        logfight("触发技能：", this.tabskill1.ID, this.tabskill1.type == 0 ? "被动" : "主动");
        this.trigger_count++;
        this.cd = 0;
    };
    GodSkillVo.prototype.settlementSkill = function () {
        this.cd = this.cd > 0 ? (this.cd - 1) : 0;
    };
    return GodSkillVo;
}());
