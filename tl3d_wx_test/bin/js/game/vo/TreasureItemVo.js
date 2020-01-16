/** 圣物vo */
var TreasureItemVo = /** @class */ (function () {
    function TreasureItemVo(data) {
        this.show = false;
        this.isFirst = false;
        this.startAction = false;
        this.type = 0;
        this.templateId = data.templateId ? data.templateId : null;
        this.tbItem = tb.TB_item.get_TB_itemById(this.templateId) || data;
        if (!this.tbItem) {
            logerror("不存在该圣物：", this.templateId);
        }
        this.slot = data.slot || this.tbItem.defined[0];
        this.godId = data.godId || null;
        this.quality = data.quality || this.tbItem.quality || 1;
        this.starLv = data.starLv || 0;
        this.strengthLv = data.strengthLv || 0;
        this.num = data.num || 0;
        // 默认值
        this.show = false;
        this.isFirst = false;
        this.startAction = false;
        this.clientUrl = null;
        this.type = 0;
    }
    TreasureItemVo.prototype.getExtParm = function () {
        return null;
    };
    /** 获取当前升星配置 */
    TreasureItemVo.prototype.getTbStarup = function () {
        if (this.quality <= tb.TB_treasure_set.getSet().star_quality)
            return null;
        return tb.TB_treasure_star.getTbItem(this.quality, this.slot, this.starLv);
        ;
    };
    /** 获取当前强化配置 */
    TreasureItemVo.prototype.getTbStrength = function () {
        return tb.TB_treasure.getTbItem(this.quality, this.slot, this.strengthLv);
    };
    /** 获取强化属性配置 格式二维数组：[0:[{属性id:值}...],1:[{属性id:值}...]] 索引0表示固定值的加成,1表示百分比的加成 */
    TreasureItemVo.prototype.getStrengthAttr = function () {
        return game.TreasureUtil.getTbStrengthAttr(this.quality, this.slot, this.strengthLv);
    };
    /** 获取升星属性配置 格式二维数组：[0:[{属性id:值}...],1:[{属性id:值}...]] 索引0表示固定值的加成,1表示百分比的加成 */
    TreasureItemVo.prototype.getStarAttr = function () {
        return game.TreasureUtil.getTbStarAttr(this.quality, this.slot, this.starLv);
    };
    /**是否星级满级 */
    TreasureItemVo.prototype.isTopStarLv = function () {
        var nextTb = tb.TB_treasure_star.getTbItem(this.quality, this.slot, this.starLv + 1);
        return nextTb ? false : true;
    };
    /**是否强化满级 */
    TreasureItemVo.prototype.isTopStrengthLv = function () {
        var nextTb = tb.TB_treasure.getTbItem(this.quality, this.slot, this.strengthLv + 1);
        return nextTb ? false : true;
    };
    /** 是否可重生:养成过的紫色品质以上且没被穿戴的圣物 */
    TreasureItemVo.prototype.isCanRebirth = function () {
        return !this.isExsitGod() && this.quality > QualityConst.PURPLE && (this.strengthLv > 0 || this.starLv > 0);
    };
    /** 是否禁止升星：紫色以下不能升星 */
    TreasureItemVo.prototype.isForbitStarup = function () {
        return this.quality <= tb.TB_treasure_set.getSet().star_quality;
    };
    TreasureItemVo.prototype.getNum = function () {
        return this.num;
    };
    TreasureItemVo.prototype.getStar = function () {
        return this.starLv;
    };
    TreasureItemVo.prototype.getShow = function () {
        return this.show;
    };
    TreasureItemVo.prototype.firstFlag = function () {
        return this.isFirst;
    };
    TreasureItemVo.prototype.isMoreThanSix = function () {
        return this.starLv > 5;
    };
    TreasureItemVo.prototype.getConstNum = function () {
        return 0;
    };
    TreasureItemVo.prototype.getStrengthLv = function () {
        return this.strengthLv;
    };
    TreasureItemVo.prototype.getRefineLevel = function () {
        return this.starLv;
    };
    TreasureItemVo.prototype.isStartAction = function () {
        return this.startAction;
    };
    TreasureItemVo.prototype.getQulity = function () {
        return SkinUtil.getBoxQulityIcon(this.quality);
    };
    TreasureItemVo.prototype.getIconUrl = function () {
        if (this.clientUrl)
            return this.clientUrl;
        return this.tbItem ? SkinUtil.getItemIcon(this.tbItem) : "";
    };
    TreasureItemVo.prototype.showRace = function () {
        return 0;
    };
    /** 是否穿戴在英雄身上 */
    TreasureItemVo.prototype.isExsitGod = function () {
        return this.godId && this.godId != "";
    };
    //是否碎片
    TreasureItemVo.prototype.isChip = function () {
        return this.tbItem && this.tbItem.icon && this.tbItem.icon[1] == 1 ? true : false;
    };
    TreasureItemVo.prototype.getChipSkin = function () {
        return SkinUtil.chip_normal;
    };
    return TreasureItemVo;
}());
