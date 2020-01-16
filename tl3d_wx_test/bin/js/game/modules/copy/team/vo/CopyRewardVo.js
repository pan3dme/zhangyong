var game;
(function (game) {
    var CopyRewardVo = /** @class */ (function () {
        function CopyRewardVo(tbData) {
            this.tbData = tbData;
            this.sortNum = 0;
        }
        /** 是否完成 */
        CopyRewardVo.prototype.isFinish = function () {
            return game.CopyTeamModel.getInstance().myFloor >= this.tbData.need_copy;
        };
        /** 是否已领取 */
        CopyRewardVo.prototype.isReward = function () {
            return game.CopyTeamModel.getInstance().groupCopyChapterAward.indexOf(this.tbData.ID) != -1;
        };
        /** 是否可领取 */
        CopyRewardVo.prototype.isCanReward = function () {
            return this.isFinish() && !this.isReward();
        };
        return CopyRewardVo;
    }());
    game.CopyRewardVo = CopyRewardVo;
})(game || (game = {}));
