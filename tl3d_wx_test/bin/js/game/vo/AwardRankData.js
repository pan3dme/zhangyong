/** 奖励排行数据vo */
var AwardRankData = /** @class */ (function () {
    function AwardRankData(rank, rankStr, rewardList) {
        this.rank = rank;
        this.rankStr = rankStr;
        this.rewardList = rewardList;
    }
    /** 获取排名 */
    AwardRankData.prototype.getRank = function () {
        return this.rank;
    };
    /** 获取排名范围 */
    AwardRankData.prototype.getRankStr = function () {
        return this.rankStr;
    };
    /** 获取排名图标 */
    AwardRankData.prototype.getRankSkin = function () {
        return this.rank <= 3 ? SkinUtil.getRankingSkin(this.rank - 1) : "";
    };
    /** 获取排名奖励 */
    AwardRankData.prototype.getRewardList = function () {
        return this.rewardList;
    };
    return AwardRankData;
}());
