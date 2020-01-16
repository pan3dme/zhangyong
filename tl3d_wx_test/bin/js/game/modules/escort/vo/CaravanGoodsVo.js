var game;
(function (game) {
    /** 商队货物信息 */
    var CaravanGoodsVo = /** @class */ (function () {
        function CaravanGoodsVo(tb) {
            this.tbEscort = tb;
        }
        /** 是否最高品质 */
        CaravanGoodsVo.prototype.isMaxQuality = function () {
            return game.EscortModel.getInstance().isMaxQuality(this.tbEscort.ID);
        };
        /** 是否当前选择的货物 */
        CaravanGoodsVo.prototype.isSelected = function () {
            return this.tbEscort.ID == game.EscortModel.getInstance().escortId;
        };
        return CaravanGoodsVo;
    }());
    game.CaravanGoodsVo = CaravanGoodsVo;
})(game || (game = {}));
