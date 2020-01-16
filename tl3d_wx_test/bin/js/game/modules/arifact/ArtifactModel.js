/**
* name
*/
var game;
(function (game) {
    var ArtifactModel = /** @class */ (function () {
        function ArtifactModel() {
        }
        ArtifactModel.getInstance = function () {
            if (!ArtifactModel._instance) {
                ArtifactModel._instance = new ArtifactModel();
            }
            return ArtifactModel._instance;
        };
        /** 是否系统开启 */
        ArtifactModel.prototype.isSysOpen = function () {
            return App.hero.tasks.advanceLevel >= 1;
        };
        //神器解锁数量
        ArtifactModel.prototype.getUnlockArtifactNum = function () {
            var num = 0;
            if (App.hero.artifactInfo) {
                for (var key in App.hero.artifactInfo) {
                    num++;
                }
            }
            return num;
        };
        /** 是否可解锁某个神器 */
        ArtifactModel.prototype.isCanUnlock = function (id) {
            var tbAri = tb.TB_artifact.get_TB_artifactById(id);
            return App.hero.getBagItemNum(tbAri.cost[0][0]) >= tbAri.cost[0][1] && !this.isUnlock(tbAri.ID);
        };
        /** 是否已解锁 */
        ArtifactModel.prototype.isUnlock = function (id) {
            return App.hero.artifactInfo[id];
        };
        /** 是否可激活 */
        ArtifactModel.prototype.isCanActivit = function (id) {
            return !this.isUnlock(id) && this.isCanUnlock(id);
        };
        /**玩家神器收集tb */
        ArtifactModel.getArtObtain = function () {
            var num = ArtifactModel.getInstance().getUnlockArtifactNum();
            return tb.TB_artifact_obtain.get_TB_artifact_obtainById(num);
        };
        /**玩家当前神器收集属性
         * @param type 值类型：0固定值 1百分比
         */
        ArtifactModel.getArtAttr = function () {
            var tb = this.getArtObtain();
            if (tb) {
                var tempResult = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
                for (var _i = 0, _a = tb.attr; _i < _a.length; _i++) {
                    var ary = _a[_i];
                    var key = ary[0]; // 属性
                    tempResult[ary[1]][key - 1] += ary[2];
                }
                return tempResult;
            }
            return null;
        };
        /**
        * 获得附魔的基础和特殊属性（[1,8]区间的属性）
        * @param basic 只获得基础属性
        */
        ArtifactModel.prototype.getEnchantAtttri = function (tbenchant, enchantNum, basic, needWear) {
            if (needWear === void 0) { needWear = false; }
            if (needWear && App.hero.getArtifactIDByLineType() <= 0)
                return null;
            if (!tbenchant)
                tbenchant = tb.TB_artifact_enchant.get_TB_artifact_enchantById(App.hero.artifactStarLv);
            if (enchantNum == 0) {
                var starExp = App.hero.artifactStarExp;
                var artifactsetT = tb.TB_artifact_set.get_TB_artifact_setById();
                enchantNum = starExp / artifactsetT.enchant_plan;
            }
            var tempResult = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]; //0固定值 1百分比
            for (var i in tbenchant.enchant_basic) {
                if (tbenchant.enchant_basic[i][0] <= 8)
                    tempResult[0][tbenchant.enchant_basic[i][0] - 1] += Number(tbenchant.enchant_basic[i][1]);
            }
            if (!basic) {
                for (var i in tbenchant.enchant_special) {
                    if (tbenchant.enchant_special[i][0] <= 8)
                        tempResult[tbenchant.enchant_special[i][1]][tbenchant.enchant_special[i][0] - 1] += Number(tbenchant.enchant_special[i][2]);
                }
            }
            for (var i in tbenchant.temporary_attr) {
                if (tbenchant.temporary_attr[i][0] <= 8)
                    tempResult[0][tbenchant.temporary_attr[i][0] - 1] += (Number(tbenchant.temporary_attr[i][1]) * enchantNum);
            }
            return tempResult;
        };
        /**洗练属性 type:0固定值 1百分比 2全部*/
        ArtifactModel.prototype.getBapAttri = function (race, type) {
            var tempResult = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]; // index=0存属性固定值，1存属性百分比
            if (App.hero.getArtifactIDByLineType() <= 0)
                return tempResult;
            var baptizeAttrs = App.hero.artifactBaptizeAttrs;
            for (var i in baptizeAttrs) {
                if (baptizeAttrs[i][3] == race || baptizeAttrs[i][3] == 0) {
                    if (baptizeAttrs[i][1] == type || type == 2) {
                        tempResult[baptizeAttrs[i][1]][baptizeAttrs[i][0] - 1] += Number(baptizeAttrs[i][2]);
                    }
                }
            }
            return tempResult;
        };
        /** 强化属性 */
        ArtifactModel.prototype.getStrengthAttr = function () {
            if (App.hero.getArtifactIDByLineType() <= 0)
                return null;
            var strengthtb = tb.TB_artifact_strength.get_TB_artifact_strengthById(App.hero.artifactStrengthLv);
            var strengthAttrs = strengthtb ? strengthtb.getAttr() : null;
            return strengthAttrs;
        };
        /**(强化、技能、附魔)属性 */
        ArtifactModel.prototype.getArtifactAllAttr = function () {
            var obj = { attr: {}, buff: {} };
            if (App.hero.getArtifactIDByLineType() <= 0)
                return obj;
            var strengthtb = tb.TB_artifact_strength.get_TB_artifact_strengthById(App.hero.artifactStrengthLv);
            var strengthAttrs = strengthtb.strength_attr;
            for (var _i = 0, strengthAttrs_1 = strengthAttrs; _i < strengthAttrs_1.length; _i++) {
                var attri = strengthAttrs_1[_i];
                if (obj.attr.hasOwnProperty(attri[0])) {
                    obj.attr[attri[0]] += Number(attri[1]);
                }
                else {
                    obj.attr[attri[0]] = Number(attri[1]);
                }
            }
            var starLv = App.hero.artifactStarLv;
            var starExp = App.hero.artifactStarExp;
            var artifactsetT = tb.TB_artifact_set.get_TB_artifact_setById();
            var artifactEnchantT = tb.TB_artifact_enchant.get_TB_artifact_enchantById(starLv);
            var enchantNum = starExp / artifactsetT.enchant_plan;
            /**附魔特殊属性[9,+∞)区间的属性 */
            for (var _a = 0, _b = artifactEnchantT.enchant_special; _a < _b.length; _a++) {
                var special = _b[_a];
                if (special[0] >= 9) {
                    if (obj.attr.hasOwnProperty(special[0])) {
                        obj.attr[special[0]] += Number(special[2]);
                    }
                    else {
                        obj.attr[special[0]] = Number(special[2]);
                    }
                }
            }
            for (var _c = 0, _d = artifactEnchantT.temporary_attr; _c < _d.length; _c++) {
                var temporary = _d[_c];
                if (temporary[0] >= 9) {
                    if (obj.attr.hasOwnProperty(temporary[0])) {
                        obj.attr[temporary[0]] += (Number(temporary[1]) * enchantNum);
                    }
                    else {
                        obj.attr[temporary[0]] = (Number(temporary[1]) * enchantNum);
                    }
                }
            }
            return obj;
        };
        /**神器红点 */
        ArtifactModel.prototype.getArtifactRedPoint = function (id, type) {
            if (!App.IsSysOpen(ModuleConst.ARTIFACT))
                return false;
            // let isWear:boolean = App.hero.isWearArtifact(id);
            // if (!isWear) return false;
            if (!App.hero.isActiveArtifact(id)) {
                if (type == Artifact.ACTIVATE) {
                    var tbArtifactT = tb.TB_artifact.get_TB_artifactById(id);
                    var itemid = tbArtifactT.cost[0][0];
                    var itemnum = tbArtifactT.cost[0][1];
                    return App.hero.getBagItemNum(itemid) >= itemnum;
                }
                return false;
            }
            var unlockNum = this.getUnlockArtifactNum();
            var tbArtifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
            if (type == Artifact.SKILLUPGRADE) {
                if (unlockNum < tbArtifactSet.artifact_unlock[1])
                    return false;
                var skillLv = App.hero.artifactSkillLv;
                if (skillLv >= tbArtifactSet.max_skill_level)
                    return false;
                var skillcost = tb.TB_artifact_skillcost.get_TB_artifact_skillcostById(skillLv);
                var needCost = skillcost.cost;
                return App.hero.artifactStrengthLv >= skillcost.need_level && App.hero.getBagItemNum(skillcost.cost[0][0]) >= skillcost.cost[0][1];
            }
            else if (type == Artifact.STRENGTH) {
                if (unlockNum < tbArtifactSet.artifact_unlock[0])
                    return false;
                var strengthLv = App.hero.artifactStrengthLv;
                if (strengthLv >= tbArtifactSet.max_strength_level)
                    return false;
                var strengthT = tb.TB_artifact_strength.get_TB_artifact_strengthById(strengthLv);
                return App.hero.getBagItemNum(strengthT.cost[0][0]) >= strengthT.cost[0][1];
            }
            else if (type == Artifact.GBAPTIZE) {
                if (unlockNum < tbArtifactSet.artifact_unlock[2])
                    return false;
                if (App.hero.welfare.loginCount > 1)
                    return false;
                return App.hero.getBagItemNum(tbArtifactSet.rare_baptize[0][0]) >= tbArtifactSet.rare_baptize[0][1];
            }
            else if (type == Artifact.ENCHANT) {
                if (unlockNum < tbArtifactSet.artifact_unlock[3])
                    return false;
                var enchantT = tb.TB_artifact_enchant.get_TB_artifact_enchantById(App.hero.artifactStarLv);
                return App.hero.getBagItemNum(enchantT.cost[0]) >= enchantT.cost[1];
            }
            else if (type == Artifact.PBAPTIZE) {
                if (unlockNum < tbArtifactSet.artifact_unlock[2])
                    return false;
                if (App.hero.welfare.loginCount > 1)
                    return false;
                return App.hero.getBagItemNum(tbArtifactSet.general_baptize[0][0]) >= tbArtifactSet.general_baptize[0][1];
            }
        };
        return ArtifactModel;
    }());
    game.ArtifactModel = ArtifactModel;
})(game || (game = {}));
