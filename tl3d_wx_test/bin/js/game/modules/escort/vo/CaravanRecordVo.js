var game;
(function (game) {
    /** 商队记录信息 */
    var CaravanRecordVo = /** @class */ (function () {
        function CaravanRecordVo(svo) {
            this.svo = svo;
            this.tbEscort = tb.TB_escort.getItemById(svo.tradeId);
        }
        /** 是否被掠夺 */
        CaravanRecordVo.prototype.isBeRod = function () {
            return this.svo.recordType == iface.tb_prop.escortRecordTypeKey.fail;
        };
        CaravanRecordVo.prototype.getLossList = function () {
            return this.isBeRod() ? this.tbEscort.getLossList() : [];
        };
        CaravanRecordVo.prototype.getContent = function () {
            var lastTime = App.serverTimeSecond - this.svo.recordTime;
            var str = "";
            if (lastTime < 3600) {
                str = Math.ceil(lastTime / 60) + LanMgr.getLan("", 12097) + ',';
            }
            else if (lastTime < 86800) {
                str = Math.ceil(lastTime / 3600) + LanMgr.getLan("", 12098) + ',';
            }
            else {
                str = Math.ceil(lastTime / 86800) + LanMgr.getLan("", 12099) + ',';
            }
            if (this.isBeRod()) {
                var ary = this.tbEscort.getLossList();
                return str + (ary.length > 0 ? LanMgr.getLan("", 12428, this.svo.name) : LanMgr.getLan("", 12429, this.svo.name));
            }
            return str + LanMgr.getLan("", 12204, this.svo.name);
        };
        return CaravanRecordVo;
    }());
    game.CaravanRecordVo = CaravanRecordVo;
})(game || (game = {}));
