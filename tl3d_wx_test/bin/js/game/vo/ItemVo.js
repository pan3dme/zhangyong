/** 道具 */
var ItemVo = /** @class */ (function () {
    function ItemVo(id, count, type, star, extral, first) {
        this.show = true;
        this.bag = false;
        this.isFirst = false;
        this.selected = false;
        this.startAction = false;
        this.using = new Array;
        this.door = false;
        this.eat = false;
        this.hideSuipian = false;
        this.showStar = true;
        this.quality = 0;
        this.isDisabled = {};
        // 消耗
        this.constNum = 0;
        /** 数量是否取自背包 */
        this.countFromBag = false;
        /**展示光效 */
        this.isShowEff = false;
        if (id == 0) {
            return;
        }
        this.id = id;
        this.count = count;
        this.extral = extral;
        this.isFirst = first;
        var item = tb.TB_item.get_TB_itemById(this.id);
        if (!item) {
            logerror('道具不存在：' + this.id);
            return;
        }
        this.using = item ? item.using_effect : [];
        this.type = type || item.type;
    }
    ItemVo.prototype.getShow = function () {
        return this.show;
    };
    ItemVo.prototype.getExtParm = function () {
        return this.extPram;
    };
    ItemVo.prototype.firstFlag = function () {
        return this.isFirst;
    };
    ItemVo.prototype.getNum = function () {
        return this.countFromBag ? App.hero.getBagItemNum(this.id) : this.count;
    };
    ItemVo.prototype.isInLinuep = function () {
        return false;
    };
    ItemVo.prototype.isStartAction = function () {
        return this.startAction;
    };
    ItemVo.prototype.isMoreThanSix = function () {
        return this.getStar() >= 6;
    };
    ItemVo.prototype.getQulity = function () {
        var qulity = 1;
        if (this.type == iface.tb_prop.itemTypeKey.god) {
            qulity = this.star;
            if (qulity > 6) {
                qulity = 6;
            }
            else {
                qulity = this.quality != 0 ? this.quality : GameUtil.getItemQulityByID(this.id);
            }
        }
        else {
            qulity = this.quality != 0 ? this.quality : GameUtil.getItemQulityByID(this.id);
        }
        return SkinUtil.getBoxQulityIcon(qulity);
    };
    ItemVo.prototype.getIconUrl = function () {
        if (this.clientUrl)
            return this.clientUrl;
        var item = tb.TB_item.get_TB_itemById(this.id);
        return item ? SkinUtil.getItemIcon(item) : "";
    };
    ItemVo.prototype.getName = function () {
        var item = tb.TB_item.get_TB_itemById(this.id);
        return item ? item.name : "";
    };
    //消耗数量
    ItemVo.prototype.getConstNum = function () {
        return this.constNum;
    };
    //是否碎片
    ItemVo.prototype.isChip = function () {
        var item = tb.TB_item.get_TB_itemById(this.id);
        if (this.hideSuipian)
            return false;
        else
            return item && item.isChip();
    };
    ItemVo.prototype.getChipSkin = function () {
        var item = tb.TB_item.get_TB_itemById(this.id);
        return item ? item.getChipSkin() : "";
    };
    ItemVo.prototype.showRace = function () {
        var item = tb.TB_item.get_TB_itemById(this.id);
        return item && item.icon[2] ? item.icon[2] : 0;
    };
    ItemVo.prototype.getStar = function () {
        if (this.star > 0)
            return this.star;
        var item = tb.TB_item.get_TB_itemById(this.id);
        return item && item.icon[3] && this.showStar ? item.icon[3] : 0;
    };
    ItemVo.prototype.getLvStr = function () {
        return this.lvStr;
    };
    ItemVo.NULL = new ItemVo(0, 0);
    //颜色
    ItemVo.ITEM_QUALITY_COLORS = [
        "",
        "#ffffff", "#319c28", "#0000ff", "#ca1fe2", "#de8a0b", "#ff0000"
    ];
    return ItemVo;
}());
