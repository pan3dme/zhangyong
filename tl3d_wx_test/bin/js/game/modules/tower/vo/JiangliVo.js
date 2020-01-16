var game;
(function (game) {
    var JiangliVo = /** @class */ (function () {
        function JiangliVo(tb) {
            this.tbTrial = tb;
            this.itemVo = new ItemVo(parseInt(tb.reward[0][0]), parseInt(tb.reward[0][1]));
        }
        JiangliVo.prototype.getName = function () {
            return this.tbTrial.ID == 2 ? "" + LanMgr.getLan('', 10023) : this.itemVo.getName() + "x" + this.itemVo.getNum();
        };
        /** 是否已领取 */
        JiangliVo.prototype.isReward = function () {
            return game.TowerModel.getInstance().isRewardById(this.tbTrial.ID, this.tbTrial.type);
        };
        /** 获取难度 */
        JiangliVo.prototype.getNandu = function () {
            return this.tbTrial.type == game.ShiliantaType.jiandan ? LanMgr.getLan("", 12122) : LanMgr.getLan("", 12123);
        };
        return JiangliVo;
    }());
    game.JiangliVo = JiangliVo;
})(game || (game = {}));
