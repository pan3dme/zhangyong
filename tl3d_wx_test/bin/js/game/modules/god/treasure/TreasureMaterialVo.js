var game;
(function (game) {
    /** 材料数据 */
    var TreasureMaterialVo = /** @class */ (function () {
        function TreasureMaterialVo(tbVo, curTreasure) {
            this.tbVo = tbVo;
            this.curTreasure = curTreasure;
            this.choose = [];
        }
        /** 是否足够 */
        TreasureMaterialVo.prototype.isEnough = function () {
            return this.choose.length >= this.tbVo.count;
        };
        /** 获取格式化数据 -- 给后端的数据格式 */
        TreasureMaterialVo.prototype.getFormatData = function () {
            var ary = [];
            for (var _i = 0, _a = this.choose; _i < _a.length; _i++) {
                var vo = _a[_i];
                ary.push(vo.id);
            }
            return ary;
        };
        /** 获取不足警告 */
        TreasureMaterialVo.prototype.getWarn = function () {
            if (this.tbVo.type == TreasureConfigType.item) {
                var tbItem = tb.TB_item.get_TB_itemById(this.tbVo.itemId);
                return tbItem ? LanMgr.getLan("", 10369, this.tbVo.starLv, tbItem.name) : LanMgr.getLan("", 10368);
            }
            return LanMgr.getLan("", 10370, this.tbVo.starLv, LanMgr.qualityColor[this.tbVo.quality]);
        };
        return TreasureMaterialVo;
    }());
    game.TreasureMaterialVo = TreasureMaterialVo;
    /** 指定的类型 */
    var TreasureConfigType;
    (function (TreasureConfigType) {
        TreasureConfigType[TreasureConfigType["item"] = 1] = "item";
        TreasureConfigType[TreasureConfigType["quality"] = 2] = "quality";
    })(TreasureConfigType = game.TreasureConfigType || (game.TreasureConfigType = {}));
})(game || (game = {}));
