var battle;
(function (battle) {
    var AtftSubData = /** @class */ (function () {
        function AtftSubData(skillId, subSkillId) {
            var tb_sub_skill = tb.TB_sub_skill.get_TB_sub_skillById(subSkillId);
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
        AtftSubData.prototype.getTargetIds = function () {
            var ids = [];
            for (var i = 0; i < this.targets.length; i++) {
                ids.push(this.targets[i].getObjId());
            }
            return ids;
        };
        AtftSubData.prototype.genSkillTargets = function (atker) {
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
        };
        AtftSubData.prototype.clearTmpAmend = function () {
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                target.clearTmpAmend(this.skillId);
            }
        };
        AtftSubData.prototype.doEffects = function (atker) {
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
        };
        AtftSubData.prototype.doEffectsOnTargets = function (atker, checkSubType, checkParam, checkProb, effects) {
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                if (!this.checkTrigger(target, checkSubType, checkParam)) {
                    continue;
                }
                if (utils.random(1, 100) > checkProb) {
                    continue;
                }
                var skillInfo = {};
                doEffects(skillInfo, atker, target, effects, this.skillId, true);
            }
        };
        AtftSubData.prototype.checkTrigger = function (target, checkSubType, checkParam) {
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
        };
        AtftSubData.prototype.doDamage = function (atker) {
            if (this.damageFixed <= 0) {
                return;
            }
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                this.doDamageOnTarget(atker, target);
            }
        };
        AtftSubData.prototype.doDamageOnTarget = function (atker, target) {
            logfight("artifact dmg target %d,%d skillId %d, damageFixed %d", target.camp, target.idx, this.skillId, this.damageFixed);
            var extraDmg = 0;
            if (this.targetExtraDmg.length > 0) {
                extraDmg = this.getExtDamage(atker, target);
            }
            var dmgValue = this.damageFixed + extraDmg;
            var dmgInfo = {
                value: dmgValue
            };
            var skillInfo = {
                totalDmg: 0,
                robAtkBar: 0,
                tagDmg: {},
                critAnyEnemy: false,
                eftAnyObj: false,
                eftObj: {},
                hasFixedVal: false,
            };
            doHitObj(atker, target, dmgInfo, skillInfo, this.skillId, false, false, true);
        };
        AtftSubData.prototype.getExtDamage = function (atker, target) {
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
        };
        AtftSubData.prototype.doExtDamage = function (extdmg, atker, target) {
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
                extraDmg = tag.getAttr(type, target.getObjId()) * percent;
            }
            else {
                if (type == 1) {
                    extraDmg = tag.hpMax * percent;
                }
            }
            return extraDmg;
        };
        return AtftSubData;
    }());
    battle.AtftSubData = AtftSubData;
})(battle || (battle = {}));
