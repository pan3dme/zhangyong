var battle;
(function (battle) {
    var BuffObj = /** @class */ (function () {
        function BuffObj(obj, caster, tplt, buffInstId, skillId, round, stackCnt) {
            this.obj = obj;
            this.caster = caster;
            this.tplt = tplt;
            this.buffInstId = buffInstId;
            this.skillId = skillId;
            this.round = round || tplt.round;
            this.stackCnt = stackCnt || 1;
            this.triggerCnt = 0;
            this.isNew = true;
            this.shield = 0;
            this.createRound = this.obj.scene.round;
            this.onInit();
        }
        BuffObj.prototype.getType = function () {
            return this.tplt.type;
        };
        BuffObj.prototype.getTpltId = function () {
            return this.tplt.ID;
        };
        BuffObj.prototype.getStatType = function () {
            return this.tplt.status_type;
        };
        BuffObj.prototype.getStackType = function () {
            return this.tplt.stack_type;
        };
        BuffObj.prototype.getStackMax = function () {
            return this.tplt.stack_max || 1;
        };
        BuffObj.prototype.isDeadExist = function () {
            return this.tplt.dead_exist;
        };
        BuffObj.prototype.isShow = function () {
            return this.tplt.is_show;
        };
        BuffObj.prototype.onInit = function () {
            this.doAttrEffect(true, this.stackCnt);
            var type = this.getType();
            var param = this.tplt.type_param;
            var value = this.tplt.effect_percent;
            var valPer = value / 100;
            switch (type) {
                case iface.tb_prop.buffTypeKey.shield:
                    if (param === 0) {
                        this.shield = Math.max(this.obj.hpMax * valPer, 0);
                    }
                    else if (param === 1) {
                        if (!this.caster.isArtifact()) {
                            this.shield = Math.max(this.caster.getAttr(iface.tb_prop.attrTypeKey.atk) * valPer, 0);
                        }
                    }
                    else if (param === 2) {
                        if (!this.obj.isArtifact()) {
                            this.shield = Math.max(this.obj.getAttr(iface.tb_prop.attrTypeKey.atk) * valPer, 0);
                        }
                    }
                    break;
                default:
                    break;
            }
            if (this.getStackType() === iface.tb_prop.buffStackTypeKey.stack && this.getStackMax() > 1) {
                this.obj.recordFlyText(iface.tb_prop.flyTextTypeKey.passive, false, this.skillId, this.stackCnt);
            }
            this.buffCreateAfter(this.skillId);
        };
        BuffObj.prototype.doAttrEffect = function (bAdd, stackCnt, notNotify) {
            if (stackCnt === 0) {
                return;
            }
            if (this.getType() === iface.tb_prop.buffTypeKey.attr) {
                logfight("doAttrEffect %s %s obj %d", this.getTpltId(), bAdd, this.obj.getObjId());
                var type = this.tplt.type_param;
                var percent = (bAdd ? 1 : -1) * this.tplt.effect_percent / 100 * stackCnt;
                var skillId = bAdd ? this.skillId : 0;
                this.obj.modifyBuffAmend(type, percent, skillId, notNotify);
            }
        };
        BuffObj.prototype.onRemove = function (notNotify) {
            this.doAttrEffect(false, this.stackCnt, notNotify);
        };
        BuffObj.prototype.modifyDmg = function (dmgInfo, skillId) {
            var type = this.getType();
            var value = this.tplt.effect_percent;
            var isRemove = false;
            switch (type) {
                case iface.tb_prop.buffTypeKey.god:
                    dmgInfo.value = 0;
                    this.obj.recordFlyText(iface.tb_prop.flyTextTypeKey.god, false, skillId);
                    break;
                case iface.tb_prop.buffTypeKey.shield:
                    if (this.shield >= dmgInfo.value) {
                        this.shield -= dmgInfo.value;
                        dmgInfo.value = 0;
                    }
                    else {
                        dmgInfo.value -= this.shield;
                        this.shield = 0;
                        isRemove = true;
                    }
                    this.obj.recordFlyText(iface.tb_prop.flyTextTypeKey.shield, false, skillId);
                    break;
                default:
                    break;
            }
            return isRemove;
        };
        BuffObj.prototype.decRound = function (isBefore) {
            if (this.round === 9999) {
                return;
            }
            this.round--;
            if (this.round > 0) {
                this.onBuffChange(isBefore ? 0 : -1);
            }
            else {
                //自然移除的时候触发
                if (iface.tb_prop.buffTrigTypeKey.roundEnd == this.tplt.trigger_type) {
                    logfight("自然移除的时候触发", this);
                    this.trigger(true);
                    if (!this.checkAlive()) {
                        this.obj.rmBuff(this);
                    }
                }
            }
        };
        BuffObj.prototype.onStack = function (skillId, stackCnt) {
            var oldStackCnt = this.stackCnt || 1;
            var nstackCnt = stackCnt || 1;
            this.stackCnt = Math.min(this.stackCnt + nstackCnt, this.getStackMax());
            this.createRound = this.obj.scene.round;
            this.onBuffChange(skillId, true, true);
            if (this.getStackType() === iface.tb_prop.buffStackTypeKey.stack && this.getStackMax() > 1) {
                this.obj.recordFlyText(iface.tb_prop.flyTextTypeKey.passive, false, skillId, this.stackCnt);
            }
            this.doAttrEffect(true, this.stackCnt - oldStackCnt);
            this.buffCreateAfter(skillId);
        };
        BuffObj.prototype.onCover = function (caster, skillId, round, stackCnt) {
            var oldStackCnt = this.stackCnt || 1;
            this.stackCnt = stackCnt || 1;
            this.round = round || this.tplt.round;
            this.caster = caster;
            this.createRound = this.obj.scene.round;
            this.isNew = true;
            this.onBuffChange(skillId, true, this.isNew);
            this.doAttrEffect(true, this.stackCnt - oldStackCnt);
            this.buffCreateAfter(skillId);
        };
        BuffObj.prototype.buffCreateAfter = function (skillId) {
            if (this.tplt.trigger_type === iface.tb_prop.buffTrigTypeKey.buffAllCasterTriggerEff) {
                this.trigger(false, skillId);
            }
        };
        BuffObj.prototype.onBuffChange = function (skillId, bAdd, isNew) {
            if (bAdd === void 0) { bAdd = false; }
            this.obj.recordBuffChange(this, skillId, bAdd, isNew);
        };
        BuffObj.prototype.checkAlive = function () {
            return this.round > 0 && (this.tplt.trigger_count <= 0 || this.triggerCnt < this.tplt.trigger_count);
        };
        BuffObj.prototype.isSelfCaster = function () {
            return this.obj.getObjId() === this.caster.getObjId();
        };
        BuffObj.prototype.canDoEffect = function (isBefore) {
            var type = this.getType();
            switch (type) {
                case iface.tb_prop.buffTypeKey.silence:
                case iface.tb_prop.buffTypeKey.sneer:
                    if (isBefore) {
                        return false;
                    }
                    if (this.isNew) {
                        this.isNew = false;
                        return false;
                    }
                    return true;
                case iface.tb_prop.buffTypeKey.attr:
                case iface.tb_prop.buffTypeKey.immune:
                case iface.tb_prop.buffTypeKey.god:
                case iface.tb_prop.buffTypeKey.banRecover:
                case iface.tb_prop.buffTypeKey.shield:
                case iface.tb_prop.buffTypeKey.tag:
                case iface.tb_prop.buffTypeKey.immuDizzy:
                case iface.tb_prop.buffTypeKey.immuSleep:
                case iface.tb_prop.buffTypeKey.immuBleed:
                case iface.tb_prop.buffTypeKey.shareDmg:
                    if (isBefore) {
                        return false;
                    }
                    if (this.isNew && this.isSelfCaster()) {
                        this.isNew = false;
                        return false;
                    }
                    return true;
                case iface.tb_prop.buffTypeKey.bleed:
                case iface.tb_prop.buffTypeKey.dizzy:
                case iface.tb_prop.buffTypeKey.recover:
                case iface.tb_prop.buffTypeKey.sleep:
                    if (!isBefore) {
                        return false;
                    }
                    return true;
                default:
                    break;
            }
            return false;
        };
        BuffObj.prototype.doEffect = function (isBefore) {
            var type = this.getType();
            var value = this.tplt.effect_percent;
            var valPer = value / 100;
            var val = 0;
            switch (type) {
                case iface.tb_prop.buffTypeKey.bleed:
                case iface.tb_prop.buffTypeKey.recover:
                    var tempType = this.tplt.type_param;
                    if (iface.tb_prop.buffTypeKey.bleed == type) {
                        tempType = Math.floor(this.tplt.type_param / 10);
                    }
                    if (tempType == 0) {
                        val = this.obj.hpMax * valPer;
                    }
                    else if (tempType == 1) {
                        val = this.caster.getAttr(iface.tb_prop.attrTypeKey.atk) * valPer;
                    }
                    else if (tempType == 2) {
                        val = this.obj.getAttr(iface.tb_prop.attrTypeKey.atk) * valPer;
                    }
                    if (iface.tb_prop.buffTypeKey.bleed == type) {
                        val = -val;
                    }
                    this.obj.chgHpPer(this.caster, val, false, undefined, false, iface.tb_prop.buffTypeKey.recover == type);
                    break;
                case iface.tb_prop.buffTypeKey.dizzy:
                case iface.tb_prop.buffTypeKey.sleep:
                    this.obj.skipRound = true;
                    break;
                default:
                    break;
            }
            this.decRound(isBefore);
        };
        BuffObj.prototype.canTrigger = function (buffTrigType, extParam) {
            if (this.tplt.trigger_type !== buffTrigType) {
                return false;
            }
            if (buffTrigType == iface.tb_prop.buffTrigTypeKey.atkEqualBuffCaster) {
                if (extParam && extParam.tag && this.caster) {
                    return extParam.tag.getObjId() == this.caster.getObjId();
                }
                return false;
            }
            return this.tplt.trigger_count <= 0 || this.triggerCnt < this.tplt.trigger_count;
        };
        BuffObj.prototype.hasRebornEffect = function () {
            for (var i = 0; i < this.tplt.effects.length; i++) {
                var efftb = tb.TB_effect.get_TB_effectById(this.tplt.effects[i]);
                if (efftb && efftb.type == iface.tb_prop.effectTypeKey.reborn) {
                    return true;
                }
            }
            return false;
        };
        BuffObj.prototype.trigger = function (after, skillId) {
            var effects = this.tplt.effects;
            var trigger_skill = this.tplt.trigger_skill;
            var skillInfo = {};
            if (effects && effects.length > 0) {
                if (this.tplt.trigger_type == iface.tb_prop.buffTrigTypeKey.buffAllCasterTriggerEff) {
                    doEffects(skillInfo, this.caster, this.caster, effects, skillId, true, after);
                }
                else {
                    doEffects(skillInfo, this.caster, this.obj, effects, skillId, true, after);
                }
            }
            if (trigger_skill && trigger_skill > 0) {
                if (this.tplt.trigger_type == iface.tb_prop.buffTrigTypeKey.buffDefAndCasterTriggerSkill) {
                    this.caster.useSkillFast(trigger_skill, skillId);
                }
                else {
                    this.obj.useSkillFast(trigger_skill, skillId);
                }
            }
            this.triggerCnt++;
        };
        BuffObj.prototype.checkRemove = function (curRound) {
            var type = this.getType();
            switch (type) {
                case iface.tb_prop.buffTypeKey.sleep:
                    if (this.createRound === curRound) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            return true;
        };
        return BuffObj;
    }());
    battle.BuffObj = BuffObj;
})(battle || (battle = {}));
