function doEffects(skillInfo, atker, target, effects, skillId, isHit, after, extParam) {
    if (after === void 0) { after = false; }
    for (var i = 0; i < effects.length; i++) {
        var effectId = effects[i];
        doOneEffect(skillInfo, atker, target, effectId, skillId, isHit, after, extParam);
    }
}
function doOneEffect(skillInfo, atker, target, effectId, skillId, isHit, after, extParam) {
    if (after === void 0) { after = false; }
    logfight("atker %d target %d skillId %d, effectId %d", atker.getObjId(), target.getObjId(), skillId, effectId);
    var tbConfig = tb.TB_effect.get_TB_effectById(effectId);
    if (!tbConfig) {
        logfight("tb_effect[%s] is null", effectId);
        return;
    }
    var type = tbConfig.type;
    var params = tbConfig.type_param;
    var param1 = params[0] || 0;
    var param2 = params[1] || 0;
    var value = tbConfig.effect_value;
    var valPer = value / 100;
    var atkIsAtft = atker.isArtifact();
    if (!atkIsAtft) {
        switch (type) {
            case iface.tb_prop.effectTypeKey.buffTransfer:
                if (param1 === 1) {
                    atker.transPositiveBuff(target, value, skillId);
                }
                else if (param1 === -1) {
                    atker.transNegativeBuff(target, value, skillId);
                }
                break;
            case iface.tb_prop.effectTypeKey.balanceAttr:
                //废弃
                // if (param1 === 1) {
                //     var addBar = target.atkBar - atker.atkBar;
                //     if (addBar > 0) {
                //         atker.addAtkBar(addBar, skillId);
                //     }
                //     var atkHpPer = atker.hp / atker.hpMax;
                //     var targetHpPer = target.hp / target.hpMax;
                //     if (atkHpPer > targetHpPer) {
                //         target.setHpPer(atker, atkHpPer, skillId);
                //     }
                //     if (targetHpPer > atkHpPer) {
                //         atker.setHpPer(atker, targetHpPer, skillId);
                //     }
                // }
                break;
            case iface.tb_prop.effectTypeKey.useSkillAgain:
                atker.getRoundFlag = true;
                break;
            case iface.tb_prop.effectTypeKey.immuDmg:
                if (!target.isArtifact()) {
                    target.immuneDmg = true;
                }
                break;
            case iface.tb_prop.effectTypeKey.reboundDmg:
                if (!target.isArtifact() && extParam && extParam.tagDmg && extParam.tagDmg[atker.getObjId()]) {
                    //伤害反弹
                    atker.recordFlyText(iface.tb_prop.flyTextTypeKey.reboundDmg, false, skillId);
                    target.chgHpPer(atker, -extParam.tagDmg[atker.getObjId()] * valPer, after, skillId, false);
                }
                break;
            case iface.tb_prop.effectTypeKey.beAtked:
                if (!atker.scene.isBackAtk && atker.isAlive() && !target.isArtifact()) {
                    atker.stBackTarget = target;
                }
                break;
            case iface.tb_prop.effectTypeKey.casterAttr:
                atker.modifyTmpAmend(param1, param2, valPer, skillId);
                break;
            case iface.tb_prop.effectTypeKey.casterAttrByTemp:
                atker.modifyTagTmpAmend(target.getObjId(), param1, param2, valPer);
                break;
            default:
                break;
        }
    }
    switch (type) {
        case iface.tb_prop.effectTypeKey.attr:
            if (!target.isArtifact()) {
                target.modifyTmpAmend(param1, param2, valPer, skillId);
            }
            break;
        case iface.tb_prop.effectTypeKey.addBuff:
            if (isHit && !target.isArtifact()) {
                //命中才会上buff
                target.addBuff(value, atker, skillId);
            }
            break;
        // case iface.tb_prop.effectTypeKey.changeCD:
        //     if (param1 === 1) {
        //         target.decSkillCd(param2, value);
        //     }
        //     else if (param1 === 2) {
        //         target.addSkillCd(param2, value);
        //     }
        //     break;
        case iface.tb_prop.effectTypeKey.reborn:
            if (!target.isArtifact()) {
                target.reborn(atker, valPer, skillId);
            }
            break;
        case iface.tb_prop.effectTypeKey.clearNegative:
            if (!target.isArtifact()) {
                target.rmBuffByStatType(iface.tb_prop.buffStatTypeKey.negative, value, skillId);
            }
            break;
        case iface.tb_prop.effectTypeKey.chgHp:
            if (!target.isArtifact()) {
                var bNotDead = false;
                var base = target.hpMax;
                if (param1 == 1) {
                    base = atker.getAttr(iface.tb_prop.attrTypeKey.atk, target.getObjId());
                }
                else if (param1 == 2) {
                    base = atker.hpMax;
                }
                else if (param1 == 3) {
                    base = target.getAttr(iface.tb_prop.attrTypeKey.atk, target.getObjId());
                }
                var curskill = tb.TB_skill.get_TB_skillById(skillId);
                target.chgHpPer(atker, base * valPer, after, skillId, bNotDead, curskill.type != iface.tb_prop.skillTypeKey.passive);
            }
            break;
        case iface.tb_prop.effectTypeKey.dmgFixByBuff:
            if (!target.isArtifact()) {
                var staType = param1 === 1 ? iface.tb_prop.buffStatTypeKey.positive : iface.tb_prop.buffStatTypeKey.negative;
                var buffCnt = target.getBuffNumByStatType(staType);
                target.modifyTmpAmend(iface.tb_prop.attrTypeKey.dmgRate, iface.tb_prop.addAttrTypeKey.percentVal, valPer * buffCnt, skillId);
            }
            break;
        case iface.tb_prop.effectTypeKey.clearPositive:
            if (!target.isArtifact()) {
                target.rmBuffByStatType(iface.tb_prop.buffStatTypeKey.positive, value, skillId);
            }
            break;
        case iface.tb_prop.effectTypeKey.changeAtkBar:
            //怒气变化
            if (!target.isArtifact()) {
                target.chgAnger(param1, value, skillId);
            }
            break;
        case iface.tb_prop.effectTypeKey.beCrit:
            if (!target.isArtifact()) {
                target.setBeCrit();
            }
            break;
        case iface.tb_prop.effectTypeKey.clearBuff:
            //自然移除
            if (!target.isArtifact()) {
                target.rmBuffById(value, skillId);
            }
            break;
        default:
            break;
    }
}
function doHitObj(atker, target, dmgInfo, skillInfo, skillId, bCrit, isShare, triggerDeadly) {
    if (target.modifyDmg(dmgInfo, skillId)) {
        if (isShare) {
            target.shareBuffTrigger(dmgInfo, atker, target, skillId, bCrit, triggerDeadly);
        }
        else {
            updateObjHp(atker, target, -dmgInfo.value, skillId, bCrit, triggerDeadly);
        }
        skillInfo.tagDmg[target.getObjId()] = dmgInfo.value;
        skillInfo.totalDmg += dmgInfo.value;
    }
}
function updateObjHp(atker, target, value, skillId, bCrit, triggerDeadly) {
    target.updateHp(atker, value, skillId, false, bCrit, triggerDeadly);
}
function pushRandomTarget(targets, objs, num, filterArr) {
    pushTarget(targets, objs, num, aliveFilter, godRandomSort, filterArr);
}
function pushOrderTarget(targets, objs, num, filterArr) {
    pushTarget(targets, objs, num, aliveFilter, null, filterArr);
}
function pushMinHpTarget(targets, objs, num, filterArr) {
    pushTarget(targets, objs, num, aliveFilter, godMinHpSort, filterArr);
}
function pushAtkMaxTarget(targets, objs, num, filterArr) {
    pushTarget(targets, objs, num, aliveFilter, godMaxAtkSort, filterArr);
}
function pushDeadTarget(targets, objs, num, filterArr) {
    pushTarget(targets, objs, num, deadFilter, godRandomSort, filterArr);
}
function pushRecoverTarget(targets, objs, num, filterArr) {
    pushTarget(targets, objs, num, recoverFilter, godMinHpSort, filterArr);
}
function pushDominantTarget(atker, targets, objs) {
    var dominantSort = function (a, b) {
        var raceGradeA = atker.getRaceGrade(a);
        var raceGradeB = atker.getRaceGrade(b);
        if (raceGradeA !== raceGradeB) {
            return raceGradeB - raceGradeA;
        }
        return a.hp - b.hp;
    };
    pushTarget(targets, objs, 1, aliveFilter, dominantSort);
}
function pushTarget(targets, objs, num, filterFunc, sortFunc, filterArr) {
    if (num <= 0) {
        return;
    }
    var objArr = convertMapValueToArr(objs, filterFunc);
    if (objArr.length > 0) {
        if (sortFunc) {
            objArr.sort(sortFunc);
        }
        for (var i = 0; i < objArr.length && num > 0; i++) {
            if (isInFilter(filterArr, objArr[i])) {
                continue;
            }
            targets.push(objArr[i]);
            num--;
        }
    }
}
;
function isInFilter(filterArr, obj) {
    if (!filterArr || filterArr.length <= 0 || !obj) {
        return false;
    }
    for (var i = 0; i < filterArr.length; i++) {
        var filterObj = filterArr[i];
        if (filterObj && filterObj.getObjId() === obj.getObjId()) {
            return true;
        }
    }
    return false;
}
;
function aliveFilter(obj) {
    return obj.isAlive();
}
;
function deadFilter(obj) {
    return !obj.isAlive();
}
;
function recoverFilter(obj) {
    if (!obj.isAlive()) {
        return false;
    }
    return obj.hp / obj.hpMax < battle.BatteConsts.RECOVER_HP_PERCENT; // 血量百分比高于70%不放回血类技能
}
;
function godMinHpSort(a, b) {
    return a.hp / a.hpMax - b.hp / b.hpMax;
}
;
function godMaxAtkSort(a, b) {
    return b.getAttr(iface.tb_prop.attrTypeKey.atk) - a.getAttr(iface.tb_prop.attrTypeKey.atk);
}
;
function godRandomSort(a, b) {
    return Math.random() < 0.5 ? -1 : 1;
}
;
function getArtifactSkillId(id, lv) {
    return id * battle.BatteConsts.MAX_ARTIFACT_LEVEL + lv;
}
function getOppoCamp(camp) {
    if (camp === battle.BatteConsts.BATTLE_CAMPDEF) {
        return battle.BatteConsts.BATTLE_CAMPATK;
    }
    return battle.BatteConsts.BATTLE_CAMPDEF;
}
;
function addPropertyMapValue(property, key, value) {
    if (!property) {
        property = {};
    }
    property[key] = (property[key] ? property[key] : 0) + value;
    return property;
}
;
function getRaceGrade(raceA, raceB) {
    var raceGrades = [[0, 1, -1, 0, 0], [-1, 0, 1, 0, 0], [1, -1, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0]];
    if (raceA < 1 || raceA > 5 || raceB < 1 || raceB > 5) {
        return 0;
    }
    return raceGrades[raceA - 1][raceB - 1];
}
;
function getRaceDmgRate(raceA, raceB) {
    var grade = getRaceGrade(raceA, raceB);
    if (grade === 1) {
        return 1 + tb.TB_god_set.get_TB_god_set().restrain_bonus[0] / 100;
    }
    if (grade === -1) {
        return 1 + tb.TB_god_set.get_TB_god_set().restrain_bonus[1] / 100;
    }
    return 1;
}
function getEvolutionIndex(degree, starLevel) {
    return starLevel >= tb.TB_god_set.get_TB_god_set().star_evolution ? starLevel : degree;
}
//根据当前星级修正真实技能id
function getSkillList(oldskill, degree, starLevel) {
    var skilllist = [];
    if (!oldskill) {
        return skilllist;
    }
    var evoIdx = getEvolutionIndex(degree, starLevel);
    var evoTemp = tb.TB_god_evolution.get_TB_god_evolutionById(evoIdx);
    for (var i = 0; i < oldskill.length; i++) {
        var element = oldskill[i];
        skilllist.push([element[0] + evoTemp.evolution_effect[i] - 1, element[1]]);
    }
    return skilllist;
}
function modifyPasvAttr(tempskills) {
    var tempskill;
    var tempskilltb;
    var tempsubskilltb;
    var tempeffect;
    var valtype;
    var attrkey;
    var valpre;
    var fixed = {};
    var precent = {};
    for (var i = 0; i < tempskills.length; i++) {
        tempskill = tempskills[i];
        tempskilltb = tb.TB_skill.get_TB_skillById(tempskill);
        if (!tempskilltb) {
            continue;
        }
        for (var x = 0; x < tempskilltb.sub_skills.length; x++) {
            var subskillid = tempskilltb.sub_skills[x];
            tempsubskilltb = tb.TB_sub_skill.get_TB_sub_skillById(subskillid);
            if (!tempsubskilltb) {
                continue;
            }
            for (var w = 0; w < tempsubskilltb.trigger_type.length; w++) {
                if (tempsubskilltb.trigger_type[w] == iface.tb_prop.triggerTypeKey.addAtt) {
                    //添加属性
                    for (var e = 0; e < tempsubskilltb.effects[w].length; e++) {
                        var effectid = tempsubskilltb.effects[w][e];
                        tempeffect = tb.TB_effect.get_TB_effectById(effectid);
                        attrkey = tempeffect.type_param[0];
                        valtype = tempeffect.type_param[1] || iface.tb_prop.addAttrTypeKey.fixedVal;
                        valpre = tempeffect.effect_value / 100;
                        if (valtype == iface.tb_prop.addAttrTypeKey.fixedVal) {
                            if (!fixed.hasOwnProperty(attrkey)) {
                                fixed[attrkey] = 0;
                            }
                            fixed[attrkey] += valpre;
                        }
                        else if (valtype == iface.tb_prop.addAttrTypeKey.percentVal) {
                            if (!precent.hasOwnProperty(attrkey)) {
                                precent[attrkey] = 0;
                            }
                            precent[attrkey] += valpre;
                        }
                    }
                }
            }
        }
    }
    return [fixed, precent];
}
function calAddAttr(type, fixed, precent, value) {
    if (isNaN(value)) {
        value = 0;
    }
    switch (Number(type)) {
        case iface.tb_prop.attrTypeKey.hpMax:
        case iface.tb_prop.attrTypeKey.atk:
        case iface.tb_prop.attrTypeKey.def:
        case iface.tb_prop.attrTypeKey.atkSpd:
            return value * Math.max(1 + precent, 0) + fixed;
        case iface.tb_prop.attrTypeKey.crit:
        case iface.tb_prop.attrTypeKey.effectHit:
        case iface.tb_prop.attrTypeKey.effectResist:
        case iface.tb_prop.attrTypeKey.suckBlood:
        case iface.tb_prop.attrTypeKey.strikeBack:
        case iface.tb_prop.attrTypeKey.rampage:
        case iface.tb_prop.attrTypeKey.dizzy:
        case iface.tb_prop.attrTypeKey.immuDizzy:
        case iface.tb_prop.attrTypeKey.addDmg:
        case iface.tb_prop.attrTypeKey.subDmg:
            return Math.max(value + precent + fixed, 0);
        case iface.tb_prop.attrTypeKey.critDmg:
        case iface.tb_prop.attrTypeKey.dmgRate:
        case iface.tb_prop.attrTypeKey.healRate:
            return Math.max(1 + value + precent + fixed, 0);
        default:
            return value;
    }
}
function replaceSkill(skills) {
    //技能替换
    var replaceNum = 0;
    while (tb.TB_skill_replace.replaceSkill(skills)) {
        replaceNum++;
        if (replaceNum > 5) {
            break;
        }
    }
}
