var game;
(function (game) {
    /** 试炼任务 */
    var TrialTaskVo = /** @class */ (function () {
        function TrialTaskVo() {
            this.sortNum = 0;
        }
        TrialTaskVo.prototype.setTbData = function (tbData, isWeek) {
            this.tbData = tbData;
            this.isWeek = isWeek;
        };
        /** 清理 */
        TrialTaskVo.prototype.clear = function () {
            this.tbData = null;
        };
        /** 获取标题 */
        TrialTaskVo.prototype.getTitle = function () {
            return this.isWeek ? "" + LanMgr.getLan("", 12140) + this.tbData.title : "" + LanMgr.getLan("", 12141) + this.tbData.title;
        };
        /** 获取完成数量 */
        TrialTaskVo.prototype.getNum = function () {
            return game.TrialTaskModel.getInstance().getFinishNum(this.tbData.ID, this.isWeek);
        };
        /** 是否完成 */
        TrialTaskVo.prototype.isFinish = function () {
            return this.getNum() >= this.tbData.num;
        };
        /** 是否已领取奖励 */
        TrialTaskVo.prototype.isReward = function () {
            return game.TrialTaskModel.getInstance().isReward(this.tbData.ID, this.isWeek);
        };
        /** 是否可领取奖励 */
        TrialTaskVo.prototype.isCanReward = function () {
            return this.isFinish() && !this.isReward();
        };
        return TrialTaskVo;
    }());
    game.TrialTaskVo = TrialTaskVo;
})(game || (game = {}));
