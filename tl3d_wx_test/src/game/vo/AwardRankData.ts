
/** 奖励排行数据vo */
class AwardRankData implements inface.IAwardRankData {

    public rank : number;
    public rankStr : string;
    public rewardList : inface.IItemData[];
    constructor(rank:number,rankStr:string,rewardList:inface.IItemData[]){
        this.rank = rank;
        this.rankStr = rankStr;
        this.rewardList = rewardList;
    }
    /** 获取排名 */
    getRank():number {
        return this.rank;
    }
    /** 获取排名范围 */
    getRankStr():string {
        return this.rankStr;
    }
    /** 获取排名图标 */
    getRankSkin():string {
        return this.rank <= 3 ? SkinUtil.getRankingSkin(this.rank-1) : "";
    }
    /** 获取排名奖励 */
    getRewardList():inface.IItemData[]{
        return this.rewardList;
    }
}