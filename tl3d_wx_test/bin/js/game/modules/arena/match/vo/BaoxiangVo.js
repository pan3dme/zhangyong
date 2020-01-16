var game;
(function (game) {
    var BaoxiangVo = /** @class */ (function () {
        function BaoxiangVo(tbBox) {
            this.tbBox = tbBox;
        }
        BaoxiangVo.prototype.getRewardSkin = function () {
            return '';
        };
        /** 获取数量 */
        BaoxiangVo.prototype.getCount = function () {
            return this.tbBox.need_num;
        };
        /** 获取宝箱皮肤 */
        BaoxiangVo.prototype.getSkin = function () {
            return SkinUtil.getTaskBaoxiang(this.tbBox.box_model, this.isReward());
        };
        /** 是否可领取 */
        BaoxiangVo.prototype.isCanReward = function () {
            return this.isFinish() && !this.isReward();
        };
        /** 是否已领取 */
        BaoxiangVo.prototype.isReward = function () {
            return game.MatchModel.getInstance().doneMatchChests.indexOf(this.tbBox.ID) != -1;
        };
        /** 完成 */
        BaoxiangVo.prototype.isFinish = function () {
            return game.MatchModel.getInstance().challengeCount >= this.getCount();
        };
        /** 获取奖励列表 */
        BaoxiangVo.prototype.getRewardList = function () {
            return this.tbBox.getRewardList();
        };
        /** 领取触发事件 */
        BaoxiangVo.prototype.getEvent = function () {
            return new game.ArenaEvent(game.ArenaEvent.MATCH_REWARD_BOX);
        };
        return BaoxiangVo;
    }());
    game.BaoxiangVo = BaoxiangVo;
})(game || (game = {}));
