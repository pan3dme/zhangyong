var game;
(function (game) {
    var GuildGuanqiaVo = /** @class */ (function () {
        function GuildGuanqiaVo(tbCopy, index) {
            this.tbCopy = tbCopy;
            this.index = index;
            tbCopy.index = index;
            var monsterId = this.tbCopy.getMonterId();
            this.monster = tb.TB_monster.get_TB_monsterById(monsterId);
        }
        GuildGuanqiaVo.prototype.getRewardList = function () {
            if (!this._rewardList) {
                this._rewardList = [];
                for (var i = 0; i < this.tbCopy.attack_reward.length; i++) {
                    this._rewardList.push(new ItemVo(this.tbCopy.attack_reward[i][0], this.tbCopy.attack_reward[i][1]));
                }
            }
            return this._rewardList;
        };
        GuildGuanqiaVo.prototype.getRankList = function () {
            if (!this._rankList) {
                this._rankList = [];
                this._rankList.push(this.getRankVo(1, this.tbCopy.rank_1));
                this._rankList.push(this.getRankVo(2, this.tbCopy.rank_2));
                this._rankList.push(this.getRankVo(3, this.tbCopy.rank_3));
                this._rankList.push(this.getRankVo(4, this.tbCopy.rank_4));
            }
            return this._rankList;
        };
        GuildGuanqiaVo.prototype.getRankVo = function (rank, reward) {
            var rewardList = [];
            for (var i = 0; i < reward.length; i++) {
                rewardList.push(new ItemVo(reward[i][0], reward[i][1]));
            }
            return { rank: rank, rewardList: rewardList, rankStr: (rank <= 3 ? rank : "4-10") };
        };
        /** 获取关卡名称 */
        GuildGuanqiaVo.prototype.getName = function () {
            return this.tbCopy.getName();
        };
        /** 是否通关 */
        GuildGuanqiaVo.prototype.isPass = function () {
            return game.GuildCopyModel.getInstance().isPass(this.tbCopy.ID);
        };
        /** 是否当前挑战 */
        GuildGuanqiaVo.prototype.isCurrent = function () {
            var guildInfo = game.GuildModel.getInstance().guildInfo;
            var copyId = guildInfo ? guildInfo.copyId : 0;
            var ids = game.GuildCopyModel.getInstance().getGuanqiaIds();
            var index = ids.indexOf(copyId);
            return ids[index + 1] == this.tbCopy.ID;
        };
        /** 是否第一关 */
        GuildGuanqiaVo.prototype.isFirst = function () {
            var ids = game.GuildCopyModel.getInstance().getGuanqiaIds();
            return ids[0] == this.tbCopy.ID;
        };
        /** 是否最后一关 */
        GuildGuanqiaVo.prototype.isLast = function () {
            var ids = game.GuildCopyModel.getInstance().getGuanqiaIds();
            return ids[ids.length - 1] == this.tbCopy.ID;
        };
        return GuildGuanqiaVo;
    }());
    game.GuildGuanqiaVo = GuildGuanqiaVo;
})(game || (game = {}));
