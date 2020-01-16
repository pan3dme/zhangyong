module battle {
    export class SubSkillData {
        public skillId;
        public subSkillId;
        private tplt;
        public mainSkill;
        public targetType;
        private targetNum;
        private damage;
        private damageFixed;
        private targetExtraDmg;
        private damageSputter: Array<number>;
        private triggerTypes: Array<number>;
        private triggerSubTypes: Array<number>;
        private triggerParams: Array<number>;
        private triggerProbs: Array<number>;
        private effects: Array<Array<number>>;
        private useNumMax;
        private useNum;
        public targets: Array<BattleObj>;
        private effectHits;
        // private mainTarget: BattleObj;

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
            this.damage = tb_sub_skill.damage || 0;
            this.damageFixed = tb_sub_skill.damage_fixed || 0;
            this.targetExtraDmg = tb_sub_skill.target_damage || [];
            this.damageSputter = tb_sub_skill.damage_sputter || [];
            this.triggerTypes = tb_sub_skill.trigger_type || [];
            this.triggerSubTypes = tb_sub_skill.trigger_subtype || [];
            this.triggerParams = tb_sub_skill.trigger_param || [];
            this.triggerProbs = tb_sub_skill.trigger_prob || [];
            this.effects = tb_sub_skill.effects || [];
            this.useNumMax = tb_sub_skill.trigger_count;
            this.useNum = 0;
            this.targets = [];
            this.effectHits = {};
            // this.mainTarget = null;
        }

        public addUseNum() {
            let tb_skill = tb.TB_skill.get_TB_skillById(this.skillId);
            var type = tb_skill ? tb_skill.type : null;
            if (type !== iface.tb_prop.skillTypeKey.passive) {
                return;
            }
            return this.useNum++;
        }

        public checkUseNum() {
            return this.useNum < this.useNumMax;
        }

        public getTargetIds(): Array<number> {
            var ids = [];
            for (var i = 0; i < this.targets.length; i++) {
                ids.push(this.targets[i].getObjId());
            }
            return ids;
        }

        //选择友方的类型字段
        private _selectKeys = [iface.tb_prop.targetTypeKey.ownMinHp,
        iface.tb_prop.targetTypeKey.ownRandom,
        iface.tb_prop.targetTypeKey.self,
        iface.tb_prop.targetTypeKey.ownDead,
        iface.tb_prop.targetTypeKey.ownDeadOrSelf,
        iface.tb_prop.targetTypeKey.ownRanNotSelf,
        iface.tb_prop.targetTypeKey.ownAtkMax,
        iface.tb_prop.targetTypeKey.ownDeadOrHpLow];

        public genSkillTargets(skillobj: SkillData, atker: BattleObj, extTarget): boolean {
            if (!this.checkUseNum()) {
                logfight("checkUseNum fail %s", this.skillId);
                return false;
            }

            var targets = this.targets = [];

            //同主目标相同的类型选择优先级最高
            if (this.targetType == iface.tb_prop.targetTypeKey.sameMainTag) {
                this.targets = skillobj.getMainTargets();
                return this.targets && this.targets.length > 0;
            }

            var speTag;
            if (!skillobj.isPassive() && this._selectKeys.indexOf(this.targetType) == -1) {
                //如果不是被动技能，需要考虑是否有反击对象或者嘲讽对象
                var stBackTarget: BattleObj = atker.getStBackTarget();
                if (stBackTarget) {
                    //有反击对象
                    this.targets.push(stBackTarget);
                    speTag = stBackTarget;
                } else {
                    var sneerTarget: BattleObj = atker.getSneerTarget();
                    if (sneerTarget) {
                        //有嘲讽对象
                        this.targets.push(sneerTarget);
                        speTag = sneerTarget;
                    }
                }
            }

            var targetNum = this.targetNum;
            if (speTag) {
                targetNum--;
            }
            switch (this.targetType) {
                case iface.tb_prop.targetTypeKey.enemyMinHp:
                    pushMinHpTarget(targets, atker.getEnemyObjs(), targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.enemyRandom:
                    pushRandomTarget(targets, atker.getEnemyObjs(), targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.ownMinHp:
                    pushMinHpTarget(targets, atker.getOwnObjs(), targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.ownRandom:
                    pushRandomTarget(targets, atker.getOwnObjs(), targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.ownRanNotSelf:
                    pushRandomTarget(targets, atker.getOwnObjs(), targetNum, [speTag, atker]);
                    break;
                case iface.tb_prop.targetTypeKey.self:
                    if (targetNum > 0) {
                        if (targets.indexOf(atker) == -1) {
                            targets.push(atker);
                        }
                    }
                    break;
                case iface.tb_prop.targetTypeKey.ownDead:
                    pushDeadTarget(targets, atker.getOwnObjs(), targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.ownDeadOrSelf:
                    pushDeadTarget(targets, atker.getOwnObjs(), targetNum, [speTag]);
                    if (targets.length <= 0) {
                        targets.push(atker);
                    }
                    break;
                case iface.tb_prop.targetTypeKey.external:
                    if (extTarget) {
                        if (targets.indexOf(extTarget) == -1) {
                            targets.push(extTarget);
                        }
                    }
                    break;
                case iface.tb_prop.targetTypeKey.tagOne:
                    pushOrderTarget(targets, atker.getEnemyObjs(), targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.frontRow:
                case iface.tb_prop.targetTypeKey.backRow:
                    var objs = atker.getEnemyRowObjsByAlive(this.targetType == iface.tb_prop.targetTypeKey.frontRow ? 1 : 2);
                    if (isEmptyObject(objs)) {
                        objs = atker.getEnemyRowObjsByAlive(this.targetType == iface.tb_prop.targetTypeKey.frontRow ? 2 : 1);
                    }
                    pushRandomTarget(targets, objs, targetNum, [speTag]);
                    break;
                case iface.tb_prop.targetTypeKey.ownAtkMax:
                    pushAtkMaxTarget(targets, atker.getOwnObjs(), targetNum, [speTag, atker]);
                    break;
                case iface.tb_prop.targetTypeKey.ownDeadOrHpLow:
                    pushDeadTarget(targets, atker.getOwnObjs(), targetNum, [speTag]);
                    if (targets.length <= 0) {
                        pushMinHpTarget(targets, atker.getOwnObjs(), targetNum, [speTag]);
                    }
                    break;
                case iface.tb_prop.targetTypeKey.allTag:
                    targets = convertMapValueToArr(atker.getOwnObjs());
                    break;
                case iface.tb_prop.targetTypeKey.frontAndRandomBack:
                    let rowObjs = atker.getEnemyRowObjs(1);
                    pushOrderTarget(targets, rowObjs, targetNum, [speTag]);
                    if (targetNum - targets.length > 0) {
                        rowObjs = atker.getEnemyRowObjs(2);
                        pushRandomTarget(targets, rowObjs, targetNum - targets.length, [speTag]);
                    }
                    break;
                default:
                    break;
            }
            if (targets.length <= 0) {
                logfight("no target! targetType %d skillId %d", this.targetType, this.skillId);
                return false;
            }
            this.targets = targets;
            return true;
        }

        /**
         * 替换主目标
         * @param mtag 
         */
        // private replaceMainTarget(mtag) {
        //     // if (this.mainTarget) {
        //     let idx = this.targets.indexOf(mtag);
        //     if (idx == -1) {
        //         this.targets.push(mtag);
        //     }
        //     // }
        //     // this.mainTarget = mtag;
        // }

        // public genMainTarget(atker: BattleObj) {
        //     if (!this.mainSkill || this.targetNum >= 6 || this.targetNum <= 0) {
        //         return;
        //     }
        //     var targets = [];
        //     let tb_skill = tb.TB_skill.get_TB_skillById(this.skillId);
        //     var priority = tb_skill.priority || iface.tb_prop.skillPriorityTypeKey.normal;
        //     switch (priority) {
        //         case iface.tb_prop.skillPriorityTypeKey.reborn:
        //         case iface.tb_prop.skillPriorityTypeKey.shield:
        //             break;
        //         case iface.tb_prop.skillPriorityTypeKey.rebornAndGuard:
        //             pushDeadTarget(targets, atker.getOwnObjs(), 1);
        //             this.mainTarget = targets.length > 0 ? targets[0] : atker;
        //             break;
        //         case iface.tb_prop.skillPriorityTypeKey.recover:
        //             if (this.targetType === iface.tb_prop.targetTypeKey.self) {
        //                 break;
        //             }
        //             if (this.targetType === iface.tb_prop.targetTypeKey.ownMinHp || this.targetType === iface.tb_prop.targetTypeKey.ownRandom || this.targetType === iface.tb_prop.targetTypeKey.ownRanNotSelf) {
        //                 pushMinHpTarget(targets, atker.getOwnObjs(), 1, this.targetType === iface.tb_prop.targetTypeKey.ownRanNotSelf ? [atker] : null);
        //                 this.mainTarget = targets.length > 0 ? targets[0] : null;
        //             }
        //             break;
        //         case iface.tb_prop.skillPriorityTypeKey.normal:
        //             if (this.targetType === iface.tb_prop.targetTypeKey.enemyRandom) {
        //                 pushDominantTarget(atker, targets, atker.getEnemyObjs());
        //                 this.mainTarget = targets.length > 0 ? targets[0] : null;
        //             }
        //             break;
        //         default:
        //             break;
        //     }
        //     if (this.mainTarget) {
        //         this.targets.push(this.mainTarget);
        //     }
        // }

        public clearTmpAmend() {
            if (!this.checkUseNum()) {
                return;
            }
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                target.clearTmpAmend(this.skillId);
            }
        }

        /**
         * 计算是否命中
         * @param atker 
         */
        public calEffectHits(atker: BattleObj, isPassive: boolean) {
            this.effectHits = {};
            for (var i = 0; i < this.targets.length; i++) {
                var target: BattleObj = this.targets[i];
                var bHit = true;
                if (!isPassive && !atker.isSameCamp(target)) {
                    logfight("%d 命中率 %s ,%d 抵抗率 %s", atker.getObjId(), atker.getAttr(iface.tb_prop.attrTypeKey.effectHit, target.getObjId()), target.getObjId(), target.getAttr(iface.tb_prop.attrTypeKey.effectResist, atker.getObjId()));
                    var hitRate = Math.max(Math.max((1 + atker.getAttr(iface.tb_prop.attrTypeKey.effectHit, target.getObjId())) / (1 + target.getAttr(iface.tb_prop.attrTypeKey.effectResist, atker.getObjId())), 1), 1);
                    bHit = Math.random() < hitRate;
                }
                this.effectHits[i] = bHit;
            }
        }

        public doEffects(skillInfo, triggerType, atker: BattleObj, prtSkillId?, extParam?) {
            if (!this.checkUseNum()) {
                return;
            }
            for (var i = 0; i < this.triggerTypes.length; i++) {
                var checkType = this.triggerTypes[i] || 0;
                var checkSubType = this.triggerSubTypes[i] || 0;
                var checkParam = this.triggerParams[i] || 0;
                var checkProb = this.triggerProbs[i] || 0;
                var effects = this.effects[i] || [];
                if (effects.length <= 0 || checkType !== triggerType) {
                    continue;
                }
                // if(triggerType === iface.tb_prop.triggerTypeKey.critAnyEnemy){
                //     logfight("critAnyEnemy");
                // }
                this.doEffectsOnTargets(skillInfo, atker, checkType, checkSubType, checkParam, checkProb, effects, prtSkillId, extParam);
            }
        }

        public canTriggerSkillEff(triggerType): boolean {
            let result: boolean = false;
            for (var i = 0; i < this.triggerTypes.length; i++) {
                var checkType = this.triggerTypes[i] || 0;
                if (checkType === triggerType) {
                    result = true;
                    break;
                }
            }
            return result;
        }

        public doEffectsOnTargets(skillInfo, atker: BattleObj, checkType: number, checkSubType: number, checkParam: number, checkProb: number, effects: Array<number>, prtSkillId, extParam?) {
            let tempProb = 0;
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                if (!this.checkTrigger(atker, target, checkSubType, checkParam, extParam)) {
                    continue;
                }
                // if (!this.effectHits[i]) {
                //     continue;
                // }

                //概率修正
                tempProb = checkProb * this.modifyProb(atker, target, effects);
                logfight("效果触发实际概率：%s", tempProb);
                if (utils.random(1, 100) > tempProb) {
                    continue;
                }
                skillInfo.eftAnyObj = true;
                skillInfo.eftObj[this.subSkillId] = 1;
                var speEftId = this.getSpeEftId(atker, target, checkType, checkParam, effects, i);
                if (speEftId > 0) {
                    logfight("speEftId %s %s", speEftId, this.skillId);
                    doOneEffect(skillInfo, atker, target, speEftId, this.skillId, this.effectHits[i], false, extParam);
                }
                else {
                    doEffects(skillInfo, atker, target, effects, this.skillId, this.effectHits[i], false, extParam);
                }
            }
            // //如果效果生效了，才计算该被动技能使用过一次
            // if (skillInfo.eftAnyObj) {
            //     atker.addPasvUseNum(this.skillId, this.subSkillId);
            // }
        }

        private modifyProb(atker: BattleObj, tag: BattleObj, effects: Array<number>): number {
            if (!effects || effects.length <= 0) {
                return 1;
            }
            var addprob = 1;
            var effid = effects[0];
            var tabeff = tb.TB_effect.get_TB_effectById(effid);
            if (tabeff && tabeff.type == iface.tb_prop.effectTypeKey.addBuff) {
                var tabbuff = tb.TB_buff.get_TB_buffById(tabeff.effect_value);
                if (tabbuff && tabbuff.type == iface.tb_prop.buffTypeKey.dizzy) {
                    let atkdizzy = atker.isArtifact()?0:atker.getAttr(iface.tb_prop.attrTypeKey.dizzy, tag.getObjId())
                    let tagimmuDizzy = tag.isArtifact()?0:tag.getAttr(iface.tb_prop.attrTypeKey.immuDizzy, atker.getObjId())
                    let temp = 1 + atkdizzy - tagimmuDizzy;
                    addprob *= Math.max(temp, 0.1);
                    logfight("晕眩概率系数修正为：%s", addprob);
                }
            }
            return addprob;
        }

        public checkTrigger(atker: BattleObj, target: BattleObj, checkSubType: number, checkParam: number, extParam?) {
            if(atker.isArtifact())return true;
            if(target.isArtifact())return false;
            switch (checkSubType) {
                case iface.tb_prop.trigSubTypeKey.selfHpLess:
                    var hpPer = atker.hp / atker.hpMax;
                    return hpPer < (checkParam / 100);
                case iface.tb_prop.trigSubTypeKey.selfAndEnemyHp:
                    var atkHpPer = atker.hp / atker.hpMax;
                    var targetHpPer = target.hp / target.hpMax;
                    if (checkParam === -1) {
                        return targetHpPer < atkHpPer;
                    }
                    if (checkParam === 1) {
                        return targetHpPer > atkHpPer;
                    }
                    return targetHpPer === atkHpPer;
                case iface.tb_prop.trigSubTypeKey.existBuffId:
                    return target.hasBuffById(checkParam);
                case iface.tb_prop.trigSubTypeKey.existBuffType:
                    return target.hasBuff(checkParam);
                case iface.tb_prop.trigSubTypeKey.existBuffStatType:
                    return target.hasBuffByStatType(checkParam);
                case iface.tb_prop.trigSubTypeKey.enemyHpUp:
                    //敌方血量高于多少百分比触发
                    var targetHpPer = target.hp / target.hpMax;
                    return targetHpPer > (checkParam / 100);
                case iface.tb_prop.trigSubTypeKey.filterProfession:
                    //对某个职业有效
                    return target.profession == checkParam;
                case iface.tb_prop.trigSubTypeKey.filterBuff:
                    //buff过滤
                    if (extParam && extParam.tempBuff) {
                        return extParam.tempBuff == checkParam && target.hasBuffById(checkParam);
                    }
                    return false;
                default:
                    break;
            }
            return true;
        }

        private getSpeEftId(atker: BattleObj, target: BattleObj, checkType: number, checkParam: number, effects: Array<number>, idx) {
            var effectId = 0;
            if (this.targetType === iface.tb_prop.targetTypeKey.ownDeadOrSelf) {
                if (atker.getObjId() === target.getObjId()) {
                    effectId = effects[1] || 0;
                }
                else {
                    effectId = effects[0] || 0;
                }
                logfight("ownDeadOrSelf %s %s", effectId, idx);
            }
            if (this.targetType === iface.tb_prop.targetTypeKey.ownDeadOrHpLow) {
                if (target.isAlive()) {
                    effectId = effects[1] || 0;
                }
                else {
                    effectId = effects[0] || 0;
                }
                logfight("ownDeadOrHpLow %s %s", effectId, idx);
            }
            if ((checkType === iface.tb_prop.triggerTypeKey.useSkill || checkType === iface.tb_prop.triggerTypeKey.crit) && checkParam === 999) {
                effectId = effects[idx] || 0;
                logfight("eft dispersive %s %s", effectId, idx);
            }
            if (checkType === iface.tb_prop.triggerTypeKey.inScene) {
                if (atker.isAlive()) {
                    effectId = effects[0] || 0;
                } else {
                    effectId = effects[1] || 0;
                }
                logfight("inScene 在场时触发 ,目标状态 %s ,buffid %s %s", atker.isAlive(), effectId, idx);
            }
            return effectId;
        }

        public targetDamageOpt(atker, skillInfo, prtSkillId) {
            if (this.targetExtraDmg.length <= 0) {
                return;
            }

            logfight("此技能只有固定伤害");
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                var extraDmg = this.getExtDamage(atker, target);
                if (extraDmg > 0) {
                    var dmgInfo = {
                        // value: dmgValue * 0.1
                        value: extraDmg
                    };
                    doHitObj(atker, target, dmgInfo, skillInfo, prtSkillId, false, true);
                    skillInfo.hasFixedVal = true;
                }
            }
        }

        public doDamage(skillInfo, atker: BattleObj, prtSkillId?) {
            if (!this.checkUseNum()) {
                return;
            }

            for (var z = 0; z < this.targets.length; z++) {
                //自身施法时触发被动
                atker.doPasvSkill(iface.tb_prop.triggerTypeKey.useSkill, this.targets[z], prtSkillId);
            }

            if (this.damage <= 0 && this.damageFixed <= 0) {
                //如果这个技能是非伤害技能，则不进行伤害计算
                this.targetDamageOpt(atker, skillInfo, prtSkillId);
                return;
            }

            let isHit: boolean = false;

            //攻击者攻击时触发的buff
            atker.onAtkObj(this.skillId, this.targets);

            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                atker.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.atkEqualBuffCaster, { tag: target }, this.skillId);
                this.doDamageOnTarget(skillInfo, atker, target, this.effectHits[i]);
                isHit = this.effectHits[i] || isHit;
            }

            //加怒气
            if (this.mainSkill == 1) {
                //默认攻击加愤怒
                var anger_effect = tb.TB_skill_set.getSkillSet().anger_effect[0];
                if (skillInfo.critAnyEnemy) {
                    logfight("暴击了");
                    anger_effect = tb.TB_skill_set.getSkillSet().anger_effect[1];
                }

                if (!isHit) {
                    logfight("闪避了");
                    anger_effect = tb.TB_skill_set.getSkillSet().anger_effect[2];
                }

                if (!atker.scene.isBackAtk) {
                    //不是反击，才加怒气
                    atker.setAnger(atker.anger + anger_effect[0], prtSkillId);
                    for (let j = 0; j < this.targets.length; j++) {
                        let tag = this.targets[j];
                        tag.setAnger(tag.anger + anger_effect[1], prtSkillId);
                    }
                }
            }
        }

        private getExtDamage(atker, target): number {
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

        private doExtDamage(extdmg, atker, target): number {
            if (!extdmg || extdmg.length < 4) {
                logerror("subskill target_damage error:", this.subSkillId);
                return 0;
            }
            var extraDmg = 0;
            var tag = extdmg[0] == 1 ? atker : target;
            var type = extdmg[1];
            var percent = extdmg[3] / 100;
            if (extdmg[2] == 2) {
                extraDmg = tag.getAttr(type, target.getObjId()) * percent;
            } else {
                if (type == 1) {
                    extraDmg = tag.hpMax * percent;
                }
            }
            return extraDmg;
        }

        public doDamageOnTarget(skillInfo, atker: BattleObj, target: BattleObj, bHit: boolean) {
            logfight("atker %f%f target %f%f skillId %f, damage %f damageFixed %f", atker.camp, atker.idx, target.camp, target.idx, this.skillId, this.damage, this.damageFixed);
            // atker.onAtkObj(this.skillId,target);
            target.onBeAtk(atker, this.skillId);
            var hitFactor = bHit ? 1 : 0.7;

            let atker_atk = atker.getAttr(iface.tb_prop.attrTypeKey.atk, target.getObjId());
            let atker_crit = atker.getAttr(iface.tb_prop.attrTypeKey.crit, target.getObjId());
            let atker_critDmg = atker.getAttr(iface.tb_prop.attrTypeKey.critDmg, target.getObjId());
            let target_def = target.getAttr(iface.tb_prop.attrTypeKey.def, atker.getObjId());
            let target_dmgRate = target.getAttr(iface.tb_prop.attrTypeKey.dmgRate, atker.getObjId());
            let target_delDmg = target.getAttr(iface.tb_prop.attrTypeKey.subDmg, atker.getObjId());
            let atker_addDmg = atker.getAttr(iface.tb_prop.attrTypeKey.addDmg, target.getObjId());


            var bCrit = target.isBeCrit() || (bHit && Math.random() < atker_crit);
            if (bCrit) {
                atker.onCritObj(skillInfo, this.skillId, this.subSkillId);
                target.onBeCrit(atker, this.skillId);
                skillInfo.critAnyEnemy = true;
            }


            var critFactor = bCrit ? atker_critDmg : 1;
            var floatFactor = utils.random(90, 110) / 100;
            var raceFactor = getRaceDmgRate(atker.race, target.race);
            //战斗公式
            var dmg = (atker_atk * this.damage / 100 - target_def);
            logfight("基础伤害 = (atker.atk(%f) * this.damage(%f) / 100 - target.def(%f))", atker_atk, this.damage, target_def);
            var extraDmg = this.getExtDamage(atker, target);

            var dmgValue = Math.max(dmg, 0.1 * atker_atk) * target_dmgRate * hitFactor * critFactor * floatFactor * raceFactor * Math.max(1 + atker_addDmg - target_delDmg, 0.1);
            logfight("Math.max(dmg(%f), 0.1 * atker.atk(%f)) * target.dmgRate(%f)  * hitFactor(%f) * critFactor(%f) * floatFactor(%f) * raceFactor(%f) * Math.max(1 + atker.addDmg(%f) - target.delDmg(%f), 0.1)", dmg, atker_atk, target_dmgRate, hitFactor, critFactor, floatFactor, raceFactor, atker_addDmg, target_delDmg);
            if (atker.scene.defType === iface.tb_prop.battleObjTypeKey.god) {
                let pvppara = tb.TB_game_set.get_TB_game_setById(1).pvp_para;
                dmgValue *= pvppara
                logfight("pvp战斗系数 %s", pvppara);
            }

            dmgValue = dmgValue + this.damageFixed + extraDmg;
            logfight("固定值加成  dmgValue(%f) += this.damageFixed(%f) + extraDmg(%f) ", dmgValue, this.damageFixed, extraDmg);
            // logfight("target.dmgRate %s", target.dmgRate);
            // logfight("dmgValue %s", dmgValue);
            var dmgInfo = {
                // value: dmgValue * 0.1
                value: dmgValue
            };
            doHitObj(atker, target, dmgInfo, skillInfo, this.skillId, bCrit, true, true);
            //伤害溅射
            this.doDmgSputter(atker, target, dmgValue, skillInfo);
        }

        public doDmgSputter(atker: BattleObj, target: BattleObj, dmgValue, skillInfo) {
            if (this.damageSputter.length <= 0) {
                return;
            }
            var num = this.damageSputter[0];
            var percent = this.damageSputter[1] / 100;
            var sputterDmg = dmgValue * percent;
            var sputterTargets = [];
            pushRandomTarget(sputterTargets, target.getOwnObjs(), num, [target]);
            for (var i = 0; i < sputterTargets.length; i++) {
                var sputterObj = sputterTargets[i];
                var dmgInfo = {
                    value: sputterDmg
                };
                doHitObj(atker, sputterObj, dmgInfo, skillInfo, this.skillId);
            }
        }

        hasRebornEffect(): boolean {
            for (let i = 0; i < this.effects.length; i++) {
                let effs = this.effects[i];
                for (let j = 0; j < effs.length; j++) {
                    let efftb = tb.TB_effect.get_TB_effectById(effs[j]);
                    if (efftb && efftb.type == iface.tb_prop.effectTypeKey.reborn) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}