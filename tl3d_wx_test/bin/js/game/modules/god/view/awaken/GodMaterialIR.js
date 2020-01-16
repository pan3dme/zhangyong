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
var game;
(function (game) {
    var GodMaterialIR = /** @class */ (function (_super) {
        __extends(GodMaterialIR, _super);
        function GodMaterialIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodMaterialIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            /** 设置当前数据源 ：  当前神灵阵营类型,所需材料数据 */
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        GodMaterialIR.prototype.initView = function () {
            var data = this.dataSource;
            if (data) {
                var info = data.tbVo;
                if (info.type == game.ConfigType.god) {
                    var itemtab = tb.TB_item.get_TB_itemById(info.godId);
                    var itemVo = new ItemVo(itemtab.ID, 0);
                    itemVo.star = info.starLv;
                    itemVo.show = false;
                    itemVo.clientUrl = info.starLv >= 6 ? SkinUtil.getItemIcon(tb.TB_item.get_TB_itemById(CostTypeKey.suipian_wuxing)) : null;
                    this.view_icon.dataSource = itemVo;
                    var godtab = tb.TB_god.get_TB_godById(info.godId);
                    this.img_type.skin = SkinUtil.getGodRaceSkin(godtab.race_type);
                }
                else {
                    var tempID = game.GodModel.getInstance().getItemID(info.starLv);
                    var vo = App.hero.createItemVo(0, tempID);
                    vo.show = false;
                    vo.hideSuipian = true;
                    vo.showStar = true;
                    vo.clientUrl = info.starLv >= 6 ? SkinUtil.getItemIcon(tb.TB_item.get_TB_itemById(CostTypeKey.suipian_wuxing)) : null;
                    var type = info.race == 1 ? data.getRaceType() : 0;
                    this.view_icon.dataSource = vo;
                    this.img_type.skin = SkinUtil.getGodRaceSkin(type);
                }
            }
        };
        /** 刷新数据 */
        GodMaterialIR.prototype.refreshData = function (chooseList) {
            var data = this.dataSource;
            if (data) {
                var ary = [];
                for (var _i = 0, chooseList_1 = chooseList; _i < chooseList_1.length; _i++) {
                    var vo = chooseList_1[_i];
                    if (vo != data) {
                        ary.push.apply(ary, vo.choose);
                    }
                }
                var listdata = game.GodUtils.filterGods(data.tbVo, data.curGod, ary); //符合条件的英雄
                var info = data.tbVo;
                var isEnough = data.choose.length >= info.count;
                this.view_icon.itemBox.gray = !isEnough;
                this.img_add.visible = listdata.length > 0 && !isEnough;
                this.lab_num.visible = true;
                this.lab_num.text = data.choose.length + "/" + info.count;
                this.lab_num.color = data.choose.length == info.count ? "#0bff00" : "#ff0501";
            }
        };
        return GodMaterialIR;
    }(ui.god.render.GodMaterialIRUI));
    game.GodMaterialIR = GodMaterialIR;
})(game || (game = {}));
