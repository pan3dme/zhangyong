var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 基础列表格子
*/
var common;
(function (common) {
    var ItemBox = /** @class */ (function (_super) {
        __extends(ItemBox, _super);
        function ItemBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemBox.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.lbLevel.visible = false;
                if (data) {
                    this.img_icon.skin = data.getIconUrl();
                    this.img_qulity.skin = data.getQulity();
                    var isChip = data.isChip();
                    this.img_suipian.visible = isChip;
                    if (isChip && GameUtil.isFunction(data.getChipSkin)) {
                        this.img_suipian.skin = data.getChipSkin();
                    }
                    var moreSix = data.isMoreThanSix();
                    if (moreSix) {
                        this.list_awake.repeatX = data.getStar() - 5;
                        this.list_awake.visible = true;
                        this.list_star.visible = false;
                    }
                    else {
                        this.list_star.visible = data.getStar() == 0 ? false : true;
                        this.list_star.repeatX = data.getStar();
                        this.list_awake.visible = false;
                    }
                    this.img_race.visible = data.showRace() == 0 ? false : true;
                    if (this.img_race.visible) {
                        this.img_race.skin = SkinUtil.getGodRaceSkin(Number(data.showRace()));
                    }
                    if (GameUtil.isFunction(data.getLvStr)) {
                        var str = data.getLvStr();
                        this.lbLevel.visible = str && str != "";
                        this.lbLevel.text = str;
                    }
                    if (data instanceof ItemVo || data instanceof tb.TB_item || data instanceof TreasureItemVo || data instanceof GemstoneItemVo) {
                        var num = data.getNum();
                        var constnum = data.getConstNum();
                        if (data.getShow()) {
                            this.on(Laya.Event.CLICK, this, this.showTip);
                        }
                        if (num > 0 || constnum > 0) {
                            this.label_number.visible = true;
                            if (constnum > 0) {
                                this.label_number.text = Snums(num) + "/" + Snums(constnum);
                                this.label_number.color = num >= constnum ? ColorConst.WHITE : ColorConst.redFont;
                            }
                            else {
                                this.label_number.text = "x" + Snums(num);
                            }
                        }
                        else {
                            this.label_number.text = "";
                        }
                        if (data instanceof TreasureItemVo) {
                            this.label_number.text = num > 0 && !data.isExsitGod() ? "x" + Snums(num) : "";
                            this.lbLevel.visible = data.strengthLv > 0;
                            this.lbLevel.text = "+" + data.strengthLv;
                        }
                        else if (data instanceof GemstoneItemVo) {
                            this.label_number.text = num > 0 && !data.isExsitGod() ? "x" + Snums(num) : "";
                            this.lbLevel.visible = data.gemLv > 0;
                            this.lbLevel.text = "Lv." + data.gemLv;
                        }
                    }
                    else if (data instanceof EquipItemVo) {
                        if (data.getShow()) {
                            this.on(Laya.Event.CLICK, this, this.showTip);
                        }
                        if (data.type == 1) {
                            var slv = data.getRefineLevel(); //精炼
                            this.label_number.visible = slv != 0;
                            this.label_number.text = "+" + slv;
                            this.label_number.y = 7;
                        }
                        else if (data.type == 0) {
                            var slv = data.getStrengthLv(); //强化
                            this.label_number.visible = slv != 0;
                            this.label_number.text = "+" + slv;
                            this.label_number.y = 62;
                        }
                        else {
                            this.label_number.text = "";
                        }
                    }
                    else {
                        this.label_number.text = "";
                    }
                    if (data.isStartAction()) {
                        this.scale(1.4, 1.4);
                        this.visible = false;
                    }
                }
                else //清理格子
                 {
                    this.list_star.visible = false;
                    this.off(Laya.Event.CLICK, this, this.showTip);
                    this.img_qulity.skin = SkinUtil.getBoxQulityIcon(1);
                    this.img_icon.skin = null;
                    this.label_number.text = "";
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 手动添加tips打开事件 */
        ItemBox.prototype.addTipsListener = function () {
            this.on(Laya.Event.CLICK, this, this.showTip);
        };
        /**
         * 显示tip
         */
        ItemBox.prototype.showTip = function () {
            if (this._dataSource instanceof ItemVo || this._dataSource instanceof tb.TB_item) {
                var itemtemp = void 0;
                if (this._dataSource instanceof ItemVo) {
                    itemtemp = tb.TB_item.get_TB_itemById(this._dataSource.id);
                }
                else {
                    itemtemp = this._dataSource;
                }
                if (itemtemp && itemtemp.type == iface.tb_prop.itemTypeKey.treasure) {
                    var treasureVo = new TreasureItemVo(itemtemp);
                    UIUtil.showTip(treasureVo);
                }
                else {
                    UIUtil.showTip(this._dataSource);
                }
            }
            else {
                UIUtil.showTip(this._dataSource);
            }
        };
        return ItemBox;
    }(ui.box.ItemBoxUI));
    common.ItemBox = ItemBox;
})(common || (common = {}));
