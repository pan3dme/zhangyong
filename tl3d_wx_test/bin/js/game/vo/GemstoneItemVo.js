/** 宝石vo */
var GemstoneItemVo = /** @class */ (function () {
    function GemstoneItemVo() {
        this.show = false; // 显示tips
        this.isFirst = false;
        this.startAction = false;
        // 默认值
        this.show = false;
        this.isFirst = false;
        this.startAction = false;
        this.clientUrl = null;
    }
    GemstoneItemVo.prototype.getExtParm = function () {
        return null;
    };
    /** 设置数据 */
    GemstoneItemVo.prototype.setData = function (data) {
        this.templateId = data.templateId ? data.templateId : null;
        this.tbItem = tb.TB_item.get_TB_itemById(this.templateId) || data;
        if (!this.tbItem) {
            logerror("道具表不存在该宝石：", this.templateId);
        }
        this.tbItem.show = false;
        this.tbItem.showNum = false;
        this.tbGem = tb.TB_gemstone_new.getTBOneById(this.tbItem.defined[0]);
        if (!this.tbGem) {
            logerror("宝石等级属性表不存在该宝石：", this.tbItem.defined[0]);
        }
        this.gemType = this.tbGem.getType();
        this.quality = data.quality || this.tbItem.quality || 1;
        this.gemLv = this.tbGem.getLevel();
        this.num = data.num || 0;
        this.godId = data.godId || null;
    };
    GemstoneItemVo.prototype.getNum = function () {
        return this.num;
    };
    GemstoneItemVo.prototype.getStar = function () {
        return 0;
    };
    GemstoneItemVo.prototype.getShow = function () {
        return this.show;
    };
    GemstoneItemVo.prototype.firstFlag = function () {
        return this.isFirst;
    };
    GemstoneItemVo.prototype.isMoreThanSix = function () {
        return false;
    };
    GemstoneItemVo.prototype.getConstNum = function () {
        return 0;
    };
    GemstoneItemVo.prototype.getStrengthLv = function () {
        return this.gemLv;
    };
    GemstoneItemVo.prototype.getRefineLevel = function () {
        return 0;
    };
    GemstoneItemVo.prototype.isStartAction = function () {
        return this.startAction;
    };
    GemstoneItemVo.prototype.getQulity = function () {
        return SkinUtil.getBoxQulityIcon(this.quality);
    };
    GemstoneItemVo.prototype.getIconUrl = function () {
        if (this.clientUrl)
            return this.clientUrl;
        return this.tbItem ? SkinUtil.getItemIcon(this.tbItem) : "";
    };
    GemstoneItemVo.prototype.showRace = function () {
        return 0;
    };
    /** 是否镶嵌在装备身上 */
    GemstoneItemVo.prototype.isExsitGod = function () {
        return this.godId && this.godId != "";
    };
    //是否碎片
    GemstoneItemVo.prototype.isChip = function () {
        return this.tbItem ? this.tbItem.isChip() : false;
    };
    GemstoneItemVo.prototype.getChipSkin = function () {
        return SkinUtil.chip_normal;
    };
    return GemstoneItemVo;
}());
