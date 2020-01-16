module battle {
    export class SkillData {

        public skillId;
        private type;
        // public cdMax;
        // public priority;
        // public cd;
        public subSkills;
        // public useConditions;

        constructor(skillId) {
            let tb_skill = tb.TB_skill.get_TB_skillById(skillId);
            if (!tb_skill) {
                logfight("tb_skill %d is null", skillId);
                return;
            }
            this.skillId = skillId;
            this.type = tb_skill.type;
            // this.cdMax = tb_skill.cd;
            // this.priority = tb_skill.priority || iface.tb_prop.skillPriorityTypeKey.normal;
            // this.cd = 0;
            // this.useConditions = tb_skill.use_conditions;
            this.subSkills = {};
            this.initSubSkills(tb_skill.sub_skills);
            // logfight("SkillData %j", this);
        }

        private initSubSkills(subSkillArr) {
            if (!subSkillArr || subSkillArr.length <= 0) {
                return null;
            }
            for (var i = 0; i < subSkillArr.length; i++) {
                var subSkillId = subSkillArr[i];
                var subData = new SubSkillData(this.skillId, subSkillId);
                this.subSkills[subSkillId] = subData;
            }
        }

        public isPassive() {
            return this.type === iface.tb_prop.skillTypeKey.passive;
        }

        public isAnger() {
            return this.type === iface.tb_prop.skillTypeKey.anger;
        }

        // public enterCd() {
        //     this.cd = this.cdMax;
        // }

        // public addCd(num: number) {
        //     this.cd = Math.min(this.cd + num, this.cdMax);
        // }

        // public decCd(num: number) {
        //     this.cd = Math.max(this.cd - num, 0);
        // }

        // public checkInCd() {
        //     return this.cd > 0;
        // }

        public getMainTargetType() {
            for (var subId in this.subSkills) {
                var subSkill: SubSkillData = this.subSkills[subId];
                if (subSkill.mainSkill) {
                    return subSkill.targetType;
                }
            }
            return 0;
        }

        public hasEnemyTarget() {
            for (var subId in this.subSkills) {
                var subSkill: SubSkillData = this.subSkills[subId];
                if (subSkill.targetType === iface.tb_prop.targetTypeKey.enemyMinHp || subSkill.targetType === iface.tb_prop.targetTypeKey.enemyRandom) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 子技能中是否存在复活效果的技能
         */
        public hasRebornInSubSkill(): boolean {
            let subId, subSkill: SubSkillData;
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (subSkill.hasRebornEffect()) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 获得主技能的目标对象
         * 一定要先走伤害帧才会有值，否则是空数组
         */
        public getMainTargetIds() {
            let subId, subSkill: SubSkillData;
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (subSkill.mainSkill == 1) {
                    return subSkill.getTargetIds();
                }
            }
            return [];
        }

        public getMainTargets() {
            let subId, subSkill: SubSkillData;
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (subSkill.mainSkill == 1) {
                    return subSkill.targets;
                }
            }
            return [];
        }

        private cheakPassiveNoTrigger(subSkill, triggerType) {
            return this.isPassive() && !subSkill.canTriggerSkillEff(triggerType);
        }

        public doSkill(triggerType, atker: BattleObj, extTarget, bAddAnger, prtSkillId, skillInfo, extParam?) {
            var subId, subSkill: SubSkillData, targetIds: Array<number>;//目标集
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (this.cheakPassiveNoTrigger(subSkill, triggerType)) {
                    //如果是被动技能，且不符合触发条件，则不触发
                    continue;
                }
                if (subSkill.genSkillTargets(this, atker, extTarget)) {
                    if (subSkill.mainSkill == 1 && !targetIds) {
                        targetIds = subSkill.getTargetIds();
                    }
                }
            }

            //计算技能是否命中
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (this.cheakPassiveNoTrigger(subSkill, triggerType)) {
                    //如果是被动技能，且不符合触发条件，则不触发
                    continue;
                }
                subSkill.calEffectHits(atker, this.type == iface.tb_prop.skillTypeKey.passive);
            }

            if (this.type == iface.tb_prop.skillTypeKey.initiative || this.type == iface.tb_prop.skillTypeKey.anger) {
                this.doSkillLogic(triggerType, atker, extTarget, bAddAnger, prtSkillId, skillInfo, targetIds, extParam);
            } else {
                this.doPavSkillLogic(triggerType, atker, extTarget, bAddAnger, prtSkillId, skillInfo, targetIds, extParam);
            }

        }

        public doPavSkillLogic(triggerType, atker: BattleObj, extTarget, bAddAnger, prtSkillId, skillInfo, mainTagers, extParam?) {
            var subId, subSkill: SubSkillData;//目标集
            //计算技能效果
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (this.cheakPassiveNoTrigger(subSkill, triggerType)) {
                    //如果是被动技能，且不符合触发条件，则不触发
                    continue;
                }
                subSkill.doEffects(skillInfo, triggerType, atker, prtSkillId, extParam);
            }

            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (!skillInfo.eftObj) {
                    logerror("eftObj undefined");
                    continue;
                }
                if (skillInfo.eftObj.hasOwnProperty(subSkill.subSkillId)) {
                    subSkill.addUseNum();
                }
            }

            //固定伤害
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                if (this.cheakPassiveNoTrigger(subSkill, triggerType)) {
                    //如果是被动技能，且不符合触发条件，则不触发
                    continue;
                }
                subSkill.targetDamageOpt(atker, skillInfo, this.skillId);
            }

            //通知触发被动技能，必须是被动技能里有其他的表现才通知，所以要放在技能逻辑运算完成后
            if (skillInfo.eftAnyObj || skillInfo.hasFixedVal) {
                atker.recordTrigPasvSkill(this.skillId, prtSkillId, mainTagers);
            }
        }

        public doSkillLogic(triggerType, atker: BattleObj, extTarget, bAddAnger, prtSkillId, skillInfo, mainTagers, extParam?) {

            var subId, subSkill: SubSkillData;//目标集
            // for (subId in this.subSkills) {
            //     subSkill = this.subSkills[subId];
            //     if (subSkill.genSkillTargets(this, atker, extTarget)) {
            //         if (subSkill.mainSkill == 1 && !targetIds) {
            //             targetIds = subSkill.getTargetIds();
            //         }
            //     }
            // }
            logfight("----------------------释放技能", this.skillId, "目标集：", mainTagers, "-----------");
            // var bInitiative = triggerType === iface.tb_prop.triggerTypeKey.useSkill;
            // if (bInitiative) {
            atker.recordUseSkill(this.skillId, mainTagers, prtSkillId);
            // }
            if (bAddAnger) {
                atker.addSelfAnger(this.skillId);
                if (this.hasEnemyTarget()) {
                    atker.addEnemyAnger(this.skillId);
                }
            }

            //计算技能是否命中
            // for (subId in this.subSkills) {
            //     subSkill = this.subSkills[subId];
            //     subSkill.calEffectHits(atker);
            // }
            //计算技能效果
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                subSkill.doEffects(skillInfo, triggerType, atker, prtSkillId, extParam);
            }
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                subSkill.doDamage(skillInfo, atker, this.skillId);
            }

            // atker.addAtkBar(skillInfo.robAtkBar, this.skillId);
            atker.suckHp(skillInfo.totalDmg, this.skillId);

            // if (bInitiative) {
            for (subId in this.subSkills) {
                subSkill = this.subSkills[subId];
                subSkill.clearTmpAmend();
            }
            //攻击者也要清除临时属性
            atker.clearTmpAmend(this.skillId);

            if (skillInfo.critAnyEnemy) {
                atker.onCritAnyEnemy(skillInfo, this.skillId, prtSkillId);
            }
            if (skillInfo.eftAnyObj) {
                atker.onEftAnyObj(skillInfo, this.skillId, prtSkillId);
            }
            // } else {
            //     //通知触发被动技能，必须是被动技能里有其他的表现才通知，所以要放在技能逻辑运算完成后
            //     atker.recordTrigPasvSkill(this.skillId, prtSkillId);
            // }
        }

        public useSkillFast(atker: BattleObj, skillInfo, prtSkillId?) {
            if (this.type == iface.tb_prop.skillTypeKey.initiative || this.type == iface.tb_prop.skillTypeKey.anger) {
                this.doSkill(iface.tb_prop.triggerTypeKey.useSkill, atker, null, false, prtSkillId, skillInfo);
            } else {
                this.doSkill(0, atker, atker, false, prtSkillId, skillInfo);
            }
        }

        public useSkill(atker: BattleObj, bAddAnger, skillInfo, prtSkillId?) {
            if (this.type == iface.tb_prop.skillTypeKey.initiative || this.type == iface.tb_prop.skillTypeKey.anger) {
                this.doSkill(iface.tb_prop.triggerTypeKey.useSkill, atker, null, bAddAnger, prtSkillId, skillInfo);
            }
            // this.enterCd();
        }

        public doPasvSkill(triggerType, atker: BattleObj, extTarget: BattleObj, prtSkillId?, extParam?) {
            if (this.type !== iface.tb_prop.skillTypeKey.passive) {
                return;
            }

            var skillInfo = {
                totalDmg: 0,    // 总伤害
                robAtkBar: 0,   // 吸收的行动条总值
                tagDmg: {},
                critAnyEnemy: false,    //对任一敌方造成暴击
                eftAnyObj: false,    //效果对任一目标生效
                eftObj: {},//哪个子技能触发了
                hasFixedVal: false,    //是否有固定伤害
            };
            this.doSkill(triggerType, atker, extTarget, false, prtSkillId, skillInfo, extParam);
        }



        // checkUseConditions(obj): boolean {
        //     if (!this.useConditions || this.useConditions.length <= 0 || !obj) {
        //         return true;
        //     }
        //     var checkType = this.useConditions[0];
        //     var percent = this.useConditions[1] / 100;
        //     var compType = this.useConditions[2];
        //     var lValue, rValue;
        //     switch (checkType) {
        //         case BatteConsts.SKILL_COND_TYPE_HP_RATIO:
        //             lValue = obj.hp;
        //             rValue = obj.hpMax * percent;
        //             break;
        //         default:
        //             break;
        //     }
        //     return this.valueCompare(lValue, rValue, compType);
        // }

        private valueCompare(lValue, rValue, compType): boolean {
            switch (compType) {
                case -1:
                    return lValue < rValue;
                case 1:
                    return lValue >= rValue;
                default:
                    break;
            }
            return false;
        }
    }
}