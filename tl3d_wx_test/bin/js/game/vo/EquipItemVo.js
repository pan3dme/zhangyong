/**装备英雄id */
var EquipItemVo = /** @class */ (function () {
    function EquipItemVo(data) {
        this.bag = false;
        this.show = false;
        this.isFirst = false;
        this.isAni = false;
        this.startAction = false;
        this.updateData(data);
    }
    EquipItemVo.prototype.getExtParm = function () {
        return null;
    };
    EquipItemVo.prototype.updateData = function (data) {
        this.type = 0;
        this.slot = data.slot ? data.slot : 0;
        this.godId = data.godId ? data.godId : null;
        this.quality = data.quality ? data.quality : 1;
        this.refineLv = data.refineLv ? data.refineLv : 0;
        this.refineExp = data.refineExp ? data.refineExp : 0;
        this.strengthLv = data.strengthLv ? data.strengthLv : 0;
        this.templateId = data.templateId ? data.templateId : null;
        this.tab_item = tb.TB_item.get_TB_itemById(this.templateId) ? tb.TB_item.get_TB_itemById(this.templateId) : data;
        this.refineId = this.quality * 10000 + this.tab_item.defined[0] * 1000 + this.refineLv;
        this.strengthId = this.quality * 10000 + this.tab_item.defined[0] * 1000 + this.strengthLv;
    };
    EquipItemVo.prototype.getNum = function () {
        return this.strengthLv;
    };
    EquipItemVo.prototype.getStar = function () {
        return 0;
    };
    EquipItemVo.prototype.getShow = function () {
        return this.show;
    };
    EquipItemVo.prototype.firstFlag = function () {
        return this.isFirst;
    };
    EquipItemVo.prototype.isMoreThanSix = function () {
        return false;
    };
    EquipItemVo.prototype.getcurRefineExp = function () {
        return this.refineExp;
    };
    EquipItemVo.prototype.getConstNum = function () {
        return 0;
    };
    EquipItemVo.prototype.getStrengthLv = function () {
        return this.strengthLv;
    };
    EquipItemVo.prototype.getRefineLevel = function () {
        return this.refineLv;
    };
    EquipItemVo.prototype.isStartAction = function () {
        return this.startAction;
    };
    EquipItemVo.prototype.getQulity = function () {
        return SkinUtil.getBoxQulityIcon(this.tab_item.quality);
    };
    EquipItemVo.prototype.getIconUrl = function () {
        if (!this.tab_item) {
            return "";
        }
        return SkinUtil.getEquipIcon(this.tab_item.icon[0]);
    };
    EquipItemVo.prototype.showRace = function () {
        return this.tab_item.icon[2] ? this.tab_item.icon[2] : 0;
    };
    /** 是否穿戴在英雄身上 */
    EquipItemVo.prototype.isExsitGod = function () {
        return this.godId && this.godId != "";
    };
    EquipItemVo.prototype.getGodName = function () {
        if (this.godId) {
            var godName = App.hero.getGodVoById(this.godId).getName();
            return godName ? godName : null;
        }
        return null;
    };
    /** 排序数值 品质>强化等级>精炼等级 数值越大表示越靠前 */
    EquipItemVo.prototype.getSortNum = function () {
        return 1000000 * this.quality + 100 * this.strengthLv + this.refineLv;
    };
    /**xxx装备中 */
    EquipItemVo.prototype.getWearGodName = function () {
        if (this.getGodName())
            return LanMgr.getLan("", 12085, this.getGodName());
        else
            return "";
    };
    /**是否精炼满级 */
    EquipItemVo.prototype.isTopRefineLv = function () {
        var maxLv = tb.TB_equip_set.get_TB_equip_setById(1).refine_maxlevel;
        return this.refineLv >= maxLv;
    };
    /**是否强化满级 */
    EquipItemVo.prototype.isTopStrengthLv = function () {
        var maxLv = tb.TB_equip_set.get_TB_equip_setById(1).strength_maxlevel;
        return this.strengthLv >= maxLv;
    };
    /**获得强化等级属性：固定值 */
    EquipItemVo.prototype.getStrengthAttr = function (strength) {
        if (strength === void 0) { strength = 0; }
        var arrStrength = tb.TB_equip_strength.get_TB_equip_strengthById(this.strengthId + strength);
        return arrStrength ? arrStrength.getAttr() : {};
    };
    /** 获得精炼等级属性: 百分比 */
    EquipItemVo.prototype.getRefineAttr = function (lv) {
        if (lv === void 0) { lv = 0; }
        var arrRefine = tb.TB_equip_refine.get_TB_equip_refineById(this.refineId + lv);
        return arrRefine ? arrRefine.getAttr() : {};
    };
    /**
     * 属性字符串
     * @param type 0:精炼属性 1:强化属性
     * @param Lv 当前+n级属性
     */
    EquipItemVo.prototype.getAttributeByValue = function (type, Lv) {
        if (Lv === void 0) { Lv = 0; }
        var arrAttstr = LanMgr.attrName;
        var obj = type == 0 ? this.getRefineAttr(Lv) : this.getStrengthAttr(Lv);
        var arrAttr = [];
        for (var i in obj) {
            var peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
            var str = type == 0 ? peoprety + "+" + Math.round(obj[i] * 10000) / 100 + "%" : peoprety + "+" + obj[i];
            arrAttr.push(str);
            ;
        }
        return arrAttr;
    };
    /**n件套tb */
    EquipItemVo.prototype.getEquipAllSuitArray = function () {
        var tbSuitArray = [];
        if (this.quality >= QualityConst.PURPLE) {
            for (var i = EquipSuit.two; i <= EquipSuit.four; i += 1) {
                var suit = tb.TB_equip_suit.get_TB_equip_suitById(Number(this.quality.toString() + i.toString()));
                tbSuitArray.push(suit);
            }
        }
        return tbSuitArray;
    };
    /**装备强化n次所需材料 */
    EquipItemVo.prototype.strengthCost = function (num) {
        if (num === void 0) { num = 1; }
        var maxlv = game.EquipModel.getInstance().tbEquipSet.strength_maxlevel;
        num = this.strengthLv + num > maxlv ? maxlv - this.strengthLv : num;
        var numCost = tb.TB_equip_strength.get_TB_equip_strengthById(this.strengthId + num).total_cost;
        var curCost = tb.TB_equip_strength.get_TB_equip_strengthById(this.strengthId).total_cost;
        var numObj = ary2map(numCost);
        var curObj = ary2map(curCost);
        for (var key in numObj) {
            if (!!curObj && !!curObj[key]) {
                numObj[key] -= curObj[key];
            }
        }
        return numObj;
    };
    /**装备精炼n级所需材料 */
    EquipItemVo.prototype.getRefineCost = function (num) {
        if (num === void 0) { num = 1; }
        var maxlv = game.EquipModel.getInstance().tbEquipSet.refine_maxlevel;
        num = this.refineLv + num > maxlv ? maxlv - this.refineLv : num;
        var numCost = tb.TB_equip_refine.get_TB_equip_refineById(this.refineId + num).total_cost;
        var curCost = tb.TB_equip_refine.get_TB_equip_refineById(this.refineId).total_cost;
        var numObj = ary2map(numCost);
        var curObj = ary2map(curCost);
        for (var key in numObj) {
            if (!!curObj && !!curObj[key]) {
                numObj[key] -= curObj[key];
            }
        }
        return numObj;
    };
    /**现有材料能精炼几级 */
    EquipItemVo.prototype.getCanRefineNum = function () {
        var maxlv = game.EquipModel.getInstance().tbEquipSet.refine_maxlevel;
        for (var i = 1; i <= maxlv; i++) {
            var cost = this.getRefineCost(i);
            for (var v in cost) {
                if (cost[v] > App.hero.getBagItemNum(v))
                    return i - 1;
            }
        }
        return maxlv;
    };
    //是否碎片
    EquipItemVo.prototype.isChip = function () {
        return this.tab_item.icon[1] && this.tab_item.icon[1] == 1 ? true : false;
    };
    EquipItemVo.prototype.getChipSkin = function () {
        return SkinUtil.chip_normal;
    };
    return EquipItemVo;
}());
