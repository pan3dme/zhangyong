var game;
(function (game) {
    var YZGuanqiaVo = /** @class */ (function () {
        function YZGuanqiaVo(tb, index) {
            this.tbCopy = tb;
            this.index = index;
        }
        /** 是否通过 */
        YZGuanqiaVo.prototype.isPass = function () {
            var finishId = App.hero.copyInfo.expeditionId;
            return this.tbCopy.ID <= finishId;
        };
        /** 是否当前挑战关卡 */
        YZGuanqiaVo.prototype.isCurrent = function () {
            var curGuanqia = game.YuanzhengModel.getInstance().curGuanqia;
            return curGuanqia && curGuanqia.tbCopy.ID == this.tbCopy.ID;
        };
        /** 是否已领取奖励 每逢3关有个关卡奖励 */
        YZGuanqiaVo.prototype.isReward = function () {
            var info = App.hero.copyInfo.expeditionRewardInfo;
            return info[this.tbCopy.ID] && info[this.tbCopy.ID] > 0;
        };
        /** 是否可领取 */
        YZGuanqiaVo.prototype.isCanReward = function () {
            return this.isHasBaoxiang() && this.isPass() && !this.isReward();
        };
        /** 是否有宝箱奖励 */
        YZGuanqiaVo.prototype.isHasBaoxiang = function () {
            return this.tbCopy.getBoxRewardList().length > 0;
        };
        return YZGuanqiaVo;
    }());
    game.YZGuanqiaVo = YZGuanqiaVo;
})(game || (game = {}));
