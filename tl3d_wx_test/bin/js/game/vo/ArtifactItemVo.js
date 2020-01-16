/*
* name;
*/
var ArtifactItemVo = /** @class */ (function () {
    /**神器信息 */
    function ArtifactItemVo(id) {
        /**附魔进度 */
        this.exp = 0;
        /**星级 */
        this.starLv = 0;
        /**技能等级 */
        this.skillLv = 1;
        /*洗练等级 */
        this.baptizeLv = 1;
        /*洗练经验 */
        this.baptizeExp = 0;
        /**强化等级 */
        this.strengthLv = 0;
        /**洗练属性 [属性id,类型(百分比或者数值),值,种族] */
        this.baptizeAttrs = {};
        /*洗练临时属性 */
        this.tmpBaptizeAttrs = {};
        this.ID = id;
    }
    ArtifactItemVo.prototype.getExtParm = function () {
        return null;
    };
    ArtifactItemVo.prototype.getNum = function () {
        return 0;
    };
    ArtifactItemVo.prototype.getStar = function () {
        return 0;
    };
    ArtifactItemVo.prototype.getShow = function () {
        return false;
    };
    ArtifactItemVo.prototype.showRace = function () {
        return 0;
    };
    ArtifactItemVo.prototype.firstFlag = function () {
        return false;
    };
    ArtifactItemVo.prototype.isChip = function () {
        return false;
    };
    ArtifactItemVo.prototype.getConstNum = function () {
        return 0;
    };
    ArtifactItemVo.prototype.isStartAction = function () {
        return false;
    };
    ArtifactItemVo.prototype.isMoreThanSix = function () {
        return false;
    };
    ArtifactItemVo.prototype.getQulity = function () {
        return SkinUtil.getBoxQulityIcon(5);
    };
    ArtifactItemVo.prototype.getIconUrl = function () {
        if (!this.tbArtifact) {
            return "";
        }
        return SkinUtil.getEquipIcon(this.tbArtifact.icon);
    };
    Object.defineProperty(ArtifactItemVo.prototype, "enchantNum", {
        /**附魔次数 */
        get: function () { return this.exp / this.tbSet.enchant_plan; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "skillId", {
        get: function () { return this.ID * 1000 + this.skillLv; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "tbSet", {
        get: function () { return tb.TB_artifact_set.get_TB_artifact_setById(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "tbSkill", {
        get: function () { return tb.TB_skill.get_TB_skillById(this.tbArtifactSkill.skill); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "tbArtifactSkill", {
        get: function () { return tb.TB_artifact_skill.get_TB_artifact_skillById(this.skillId); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "enchantId", {
        get: function () { return this.ID * 100 + this.starLv; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "tbArtifact", {
        get: function () { return tb.TB_artifact.get_TB_artifactById(this.ID); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "tbArtifactEnchant", {
        get: function () { return tb.TB_artifact_enchant.get_TB_artifact_enchantById(this.enchantId); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "strengthId", {
        get: function () { return this.ID * 1000 + this.strengthLv; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ArtifactItemVo.prototype, "tbArtifactStrength", {
        get: function () { return tb.TB_artifact_strength.get_TB_artifact_strengthById(this.strengthId); },
        enumerable: true,
        configurable: true
    });
    ;
    /**是否已解锁 */
    ArtifactItemVo.prototype.isYiJieSuo = function () {
        return App.hero.artifactInfo.hasOwnProperty(this.ID);
    };
    /**在某个阵容是否已穿戴 */
    ArtifactItemVo.prototype.isWearByType = function (type) {
        return App.hero.lineupArtifactInfo.hasOwnProperty(type) && App.hero.lineupArtifactInfo[type] == this.ID;
    };
    /**是否已穿戴 */
    ArtifactItemVo.prototype.isWear = function () {
        for (var i = 1; i < 4; i++) {
            if (this.isWearByType(i))
                return true;
        }
        return false;
    };
    /**是否可解锁 */
    ArtifactItemVo.prototype.isCanJieSuo = function () {
        var needCost = this.tbArtifact.cost;
        return needCost && App.hero.getBagItemNum(needCost[0][0]) >= needCost[0][1] && !this.isYiJieSuo();
    };
    /**是否可附魔 */
    ArtifactItemVo.prototype.isCanEnchant = function () {
        return App.hero.getBagItemNum(this.tbArtifactEnchant.cost[0]) >= this.tbArtifactEnchant.cost[1];
    };
    /**是够可强化 */
    ArtifactItemVo.prototype.isCanStrengh = function () {
        var tbArtifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
        if (this.strengthLv >= tbArtifactSet.max_strength_level)
            return false;
        var needCost = this.tbArtifactStrength.cost;
        return App.hero.getBagItemNum(needCost[0][0]) >= needCost[0][1] && this.isYiJieSuo() && this.strengthLv < tbArtifactSet.max_strength_level;
    };
    /**是否可升级技能 */
    ArtifactItemVo.prototype.isCanSkillUp = function () {
        var tbArtifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
        if (this.skillLv >= tbArtifactSet.max_skill_level)
            return false;
        // let needCost = this.tbArtifactSkill.cost;
        // return App.hero.getBagItemNum(needCost[0][0]) >= needCost[0][1] &&
        //     this.isYiJieSuo() && this.skillLv < tbArtifactSet.max_skill_level && this.strengthLv >= this.tbArtifactSkill.need_level;
        return false;
    };
    /**是否可洗练 */
    ArtifactItemVo.prototype.isCanBaptize = function (type) {
        if (App.hero.welfare.loginCount > 1)
            return false;
        if (type == Artifact.PBAPTIZE)
            return App.hero.getBagItemNum(this.tbSet.general_baptize[0][0]) >= this.tbSet.general_baptize[0][1];
        else
            return App.hero.getBagItemNum(this.tbSet.rare_baptize[0][0]) >= this.tbSet.rare_baptize[0][1];
    };
    /**排序 */
    ArtifactItemVo.prototype.getSortNum = function (wearType) {
        if (wearType && this.isWearByType(wearType)) {
            return 0;
        }
        else if (!wearType && this.isWear()) {
            return 0;
        }
        else if (this.isYiJieSuo()) {
            return wearType ? 1 : 3;
        }
        else {
            var needCost = this.tbArtifact.cost;
            var hasNum = App.hero.getBagItemNum(needCost[0][0]);
            if (!wearType && hasNum >= needCost[0][1]) {
                return 2;
            }
            else {
                return 4;
            }
        }
    };
    return ArtifactItemVo;
}());
