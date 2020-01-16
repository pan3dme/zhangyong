module battle {
    export class AtftSubData {

        public skillId;
        public subSkillId;
        public tplt;
        public targetType;
        public targetNum;
        public damageFixed;
        public targetExtraDmg;
        public triggerTypes;
        public triggerSubTypes;
        public triggerParams;
        public mainSkill;
        public effects;
        public triggerProbs;
        public targets:Array<BattleObj>;

        constructor(skillId, subSkillId) {
            let tb_sub_skill = tb.TB_sub_skill.get_TB_sub_skillById(subSkillId);
            if (!tb_sub_skill) {
                logfight("tb_sub_skill %d is null", subSkillId);
                return;
            }
            this.skillId = skillId;
            this.subSkillId = subSkillId;
            this.tplt = tb_sub_skill;
            this.mainSkill = tb_sub_skill.main_skill;
            this.targetType = tb_sub_skill.casting_target;
            this.targetNum = tb_sub_skill.target_limit;
            this.damageFixed = tb_sub_skill.damage_fixed || 0;
            this.targetExtraDmg = tb_sub_skill.target_damage || [];
            this.triggerTypes = tb_sub_skill.trigger_type || [];
            this.triggerSubTypes = tb_sub_skill.trigger_subtype || [];
            this.triggerParams = tb_sub_skill.trigger_param || [];
            this.triggerProbs = tb_sub_skill.trigger_prob || [];
            this.effects = tb_sub_skill.effects || [];
            this.targets = [];
        }

        public getTargetIds() {
            var ids = [];
            for (var i = 0; i < this.targets.length; i++) {
                ids.push(this.targets[i].getObjId());
            }
            return ids;
        }

        public genSkillTargets(atker:BattleArtifact) {
            var targets = this.targets = [];
            var targetNum = this.targetNum;
            switch (this.targetType) {
                case iface.tb_prop.targetTypeKey.enemyMinHp:
                    pushMinHpTarget(targets, atker.getEnemyObjs(), targetNum);
                    break;
                case iface.tb_prop.targetTypeKey.enemyRandom:
                    pushRandomTarget(targets, atker.getEnemyObjs(), targetNum);
                    break;
                case iface.tb_prop.targetTypeKey.ownMinHp:
                    pushMinHpTarget(targets, atker.getOwnObjs(), targetNum);
                    break;
                case iface.tb_prop.targetTypeKey.ownRandom:
                    pushRandomTarget(targets, atker.getOwnObjs(), targetNum);
                    break;
                default:
                    break;
            }
            if (targets.length <= 0) {
                logfight("no target! targetType %d skillId %d", this.targetType, this.skillId);
                return false;
            }
            return true;
        }

        public clearTmpAmend() {
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                target.clearTmpAmend(this.skillId);
            }
        }

        public doEffects(atker:BattleArtifact) {
            for (var i = 0; i < this.triggerTypes.length; i++) {
                var checkType = this.triggerTypes[i] || 0;
                var checkSubType = this.triggerSubTypes[i] || 0;
                var checkParam = this.triggerParams[i] || 0;
                var checkProb = this.triggerProbs[i] || 0;
                var effects = this.effects[i] || [];
                if (effects.length <= 0 || checkType !== iface.tb_prop.triggerTypeKey.useSkill) {
                    continue;
                }
                this.doEffectsOnTargets(atker, checkSubType, checkParam, checkProb, effects);
            }
        }

        public doEffectsOnTargets(atker:BattleArtifact, checkSubType, checkParam, checkProb, effects) {
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                if (!this.checkTrigger(target, checkSubType, checkParam)) {
                    continue;
                }
                if (utils.random(1, 100) > checkProb) {
                    continue;
                }
                var skillInfo = {};
                doEffects(skillInfo, atker, target, effects, this.skillId,true);
            }
        }

        public checkTrigger(target, checkSubType, checkParam) {
            switch (checkSubType) {
                case iface.tb_prop.trigSubTypeKey.selfHpLess:
                case iface.tb_prop.trigSubTypeKey.selfAndEnemyHp:
                    return false;
                case iface.tb_prop.trigSubTypeKey.existBuffId:
                    return target.hasBuffById(checkParam);
                case iface.tb_prop.trigSubTypeKey.existBuffType:
                    return target.hasBuff(checkParam);
                case iface.tb_prop.trigSubTypeKey.existBuffStatType:
                    return target.hasBuffByStatType(checkParam);
                default:
                    break;
            }
            return true;
        }

        public doDamage(atker:BattleArtifact) {
            if (this.damageFixed <= 0) {
                return;
            }
            for (var i = 0; i < this.targets.length; i++) {
                var target:BattleObj = this.targets[i];
                this.doDamageOnTarget(atker, target);
            }
        }

        public doDamageOnTarget(atker:BattleArtifact, target:BattleObj) {
            logfight("artifact dmg target %d,%d skillId %d, damageFixed %d", target.camp, target.idx, this.skillId, this.damageFixed);
            var extraDmg = 0;
            if (this.targetExtraDmg.length > 0) {
                extraDmg = this.getExtDamage(atker,target);
            }
            var dmgValue = this.damageFixed + extraDmg;
            var dmgInfo = {
                value: dmgValue
            };
            var skillInfo = {
                totalDmg: 0,    // 总伤害
                robAtkBar: 0,   // 吸收的行动条总值
                tagDmg: {},
                critAnyEnemy: false,    //对任一敌方造成暴击
                eftAnyObj: false,    //效果对任一目标生效
                eftObj:{},//哪个子技能触发了
                hasFixedVal: false,    //是否有固定伤害
            };

            doHitObj(atker, target, dmgInfo, skillInfo, this.skillId,false,false,true);
        }

        private getExtDamage(atker:BattleArtifact, target:BattleObj): number {
            var extraDmg = 0;
            if (this.targetExtraDmg.length > 0) {
                if (this.targetExtraDmg[0]) {
                    extraDmg = this.doExtDamage(this.targetExtraDmg[0], atker, target);
                    if (this.targetExtraDmg[1]) {
                        var limitdmg = this.doExtDamage(this.targetExtraDmg[1], atker, target);
                        extraDmg = Math.min(limitdmg, extraDmg);
                    }
                }
            }
            return extraDmg;
        }

        private doExtDamage(extdmg, atker:BattleArtifact, target:BattleObj): number {
            if (!extdmg || extdmg.length < 4) {
                logerror("subskill target_damage error:", this.subSkillId);
                return 0;
            }
            var extraDmg = 0;
            //神器一定是目标的属性
            var tag = target;
            var type = extdmg[1];
            var percent = extdmg[3] / 100;
            if (extdmg[2] == 2) {
                extraDmg = tag.getAttr(type,target.getObjId()) * percent;
            } else {
                if (type == 1) {
                    extraDmg = tag.hpMax * percent;
                }
            }
            return extraDmg;
        }
    }
}