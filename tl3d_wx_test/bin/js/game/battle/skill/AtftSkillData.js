var battle;
(function (battle) {
    var AtftSkillData = /** @class */ (function () {
        function AtftSkillData(skillId) {
            var tb_skill = tb.TB_skill.get_TB_skillById(skillId);
            if (!tb_skill) {
                logfight("tb_skill %d is null", skillId);
                return;
            }
            this.skillId = skillId;
            this.type = tb_skill.type;
            this.subSkills = {};
            this.initSubSkills(tb_skill.sub_skills);
        }
        AtftSkillData.prototype.initSubSkills = function (subSkillArr) {
            if (!subSkillArr || subSkillArr.length <= 0) {
                return null;
            }
            for (var i = 0; i < subSkillArr.length; i++) {
                var subSkillId = subSkillArr[i];
                var subData = new battle.AtftSubData(this.skillId, subSkillId);
                this.subSkills[subSkillId] = subData;
            }
        };
        AtftSkillData.prototype.doSkillLogic = function (artifact) {
            var subId, subSkill, targetIds;
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (subSkill.genSkillTargets(artifact)) {
                    if (!targetIds) {
                        targetIds = subSkill.getTargetIds();
                    }
                }
            }
            artifact.recordUseSkill(this.skillId, targetIds);
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                subSkill.doEffects(artifact);
            }
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                subSkill.doDamage(artifact);
            }
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                subSkill.clearTmpAmend();
            }
        };
        /**
         * 获得技能的目标对象
         * 一定要先走伤害帧才会有值，否则是空数组
         */
        AtftSkillData.prototype.getMainTargetIds = function () {
            var subId, subSkill;
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (subSkill.mainSkill == 1) {
                    return subSkill.getTargetIds();
                }
            }
            return [];
        };
        AtftSkillData.prototype.useSkill = function (atker) {
            if (this.type !== iface.tb_prop.skillTypeKey.artifact) {
                return;
            }
            this.doSkillLogic(atker);
        };
        return AtftSkillData;
    }());
    battle.AtftSkillData = AtftSkillData;
})(battle || (battle = {}));
