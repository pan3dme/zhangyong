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
    var TreasureMaterialIR = /** @class */ (function (_super) {
        __extends(TreasureMaterialIR, _super);
        function TreasureMaterialIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TreasureMaterialIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        TreasureMaterialIR.prototype.initView = function () {
            var data = this.dataSource;
            if (data) {
                var info = data.tbVo;
                var obj = { templateId: info.itemId, quality: info.quality, starLv: info.starLv, num: 0 };
                var treasureVo = game.TreasureUtil.createTreasureVo("", obj);
                treasureVo.show = false;
                if (info.type == game.TreasureConfigType.item) {
                    var tbItem = tb.TB_item.get_TB_itemById(info.itemId);
                    treasureVo.quality = tbItem ? tbItem.quality : 1;
                }
                else if (info.type == game.TreasureConfigType.quality) {
                    treasureVo.clientUrl = SkinUtil.getTreasureQualitySkin(info.quality);
                }
                this.itemBox.dataSource = treasureVo;
            }
        };
        /** 刷新数据 */
        TreasureMaterialIR.prototype.refreshData = function (chooseList) {
            var data = this.dataSource;
            if (data) {
                var ary = [];
                for (var _i = 0, chooseList_1 = chooseList; _i < chooseList_1.length; _i++) {
                    var vo = chooseList_1[_i];
                    if (vo != data) {
                        ary.push.apply(ary, vo.choose);
                    }
                }
                var listdata = game.TreasureUtil.filterTreasures(data.tbVo, data.curTreasure, ary); //符合条件的英雄
                var info = data.tbVo;
                var isEnough = data.choose.length >= info.count;
                // this.itemBox.itemBox.gray = !isEnough;
                this.btnAdd.visible = listdata.length > 0 && !isEnough;
                this.lbNum.visible = true;
                this.lbNum.text = data.choose.length + "/" + info.count;
                this.lbNum.color = data.choose.length == info.count ? "#0bff00" : "#ff0501";
            }
        };
        return TreasureMaterialIR;
    }(ui.god.treasure.render.TreasureMaterialIRUI));
    game.TreasureMaterialIR = TreasureMaterialIR;
})(game || (game = {}));
