var game;
(function (game) {
    var GuildRewardVo = /** @class */ (function () {
        function GuildRewardVo(tbC) {
            /** 剩余次数 */
            this.awardCount = 0;
            this.tbReward = tbC;
            this.tbGuanqia = tb.TB_guild_copy.getItemnById(tbC.ID * 10 + 3);
            if (!this.tbGuanqia) {
                logerror("不存在该关卡");
            }
        }
        GuildRewardVo.prototype.getRewardList = function () {
            if (!this._rewardList) {
                this._rewardList = [];
                for (var i = 0; i < this.tbReward.reward.length; i++) {
                    this._rewardList.push(new ItemVo(this.tbReward.reward[i][0], this.tbReward.reward[i][1]));
                }
            }
            return this._rewardList;
        };
        GuildRewardVo.prototype.getName = function () {
            return "\u901A\u5173\u7B2C" + this.tbReward.ID * 3 + "\u5173";
        };
        GuildRewardVo.prototype.getSortNum = function () {
            var num = this.tbReward.ID;
            if (this.isCanReward()) {
                return num;
            }
            else if (this.isReceive()) {
                return 10000 + num;
            }
            else {
                return 1000 + num;
            }
        };
        GuildRewardVo.prototype.getResetNumStr = function () {
            return LanMgr.getLan('', 10089, this.awardCount);
        };
        /** 是否领取 */
        GuildRewardVo.prototype.isReceive = function () {
            var guildCopyAwardInfo = App.hero.guildCopyAwardInfo;
            return guildCopyAwardInfo[this.tbReward.ID] > 0;
        };
        /** 是否通关 */
        GuildRewardVo.prototype.isPass = function () {
            return game.GuildCopyModel.getInstance().isPass(this.tbGuanqia.ID);
        };
        /** 是否可领取 */
        GuildRewardVo.prototype.isCanReward = function () {
            return this.isPass() && !this.isReceive() && this.awardCount > 0;
        };
        return GuildRewardVo;
    }());
    game.GuildRewardVo = GuildRewardVo;
})(game || (game = {}));
