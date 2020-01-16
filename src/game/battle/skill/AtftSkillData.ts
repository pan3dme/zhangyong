module battle {
    export class AtftSkillData {

        public skillId;
        public type;
        public subSkills;

        constructor(skillId) {
            let tb_skill = tb.TB_skill.get_TB_skillById(skillId);
            if (!tb_skill) {
                logfight("tb_skill %d is null", skillId);
                return;
            }
            this.skillId = skillId;
            this.type = tb_skill.type;
            this.subSkills = {};
            this.initSubSkills(tb_skill.sub_skills);
        }

        private initSubSkills(subSkillArr) {
            if (!subSkillArr || subSkillArr.length <= 0) {
                return null;
            }
            for (var i = 0; i < subSkillArr.length; i++) {
                var subSkillId = subSkillArr[i];
                var subData = new AtftSubData(this.skillId, subSkillId);
                this.subSkills[subSkillId] = subData;
            }
        }

        public doSkillLogic(artifact:BattleArtifact) {
            var subId, subSkill:AtftSubData, targetIds;
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
        }

        /**
         * 获得技能的目标对象
         * 一定要先走伤害帧才会有值，否则是空数组
         */
        public getMainTargetIds() {
            let subId, subSkill: AtftSubData;
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (subSkill.mainSkill == 1) {
                    return subSkill.getTargetIds();
                }
            }
            return [];
        }

        public useSkill(atker) {
            if (this.type !== iface.tb_prop.skillTypeKey.artifact) {
                return;
            }
            this.doSkillLogic(atker);
        }
    }
}