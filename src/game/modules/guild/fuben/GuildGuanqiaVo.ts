

module game {

    export class GuildGuanqiaVo {

        public tbCopy : tb.TB_guild_copy;
        public monster : tb.TB_monster; /** 副本怪物 */

        /** 第几关 */
        public index : number;
        constructor(tbCopy:tb.TB_guild_copy,index:number){
            this.tbCopy = tbCopy;
            this.index = index;
            tbCopy.index = index;
            let monsterId = this.tbCopy.getMonterId();
            this.monster = tb.TB_monster.get_TB_monsterById(monsterId);
        }

        private _rewardList : ItemVo[];
        getRewardList():ItemVo[]{
            if(!this._rewardList){
                this._rewardList = [];
                for(let i = 0 ; i < this.tbCopy.attack_reward.length ; i++){
                    this._rewardList.push(new ItemVo(this.tbCopy.attack_reward[i][0],this.tbCopy.attack_reward[i][1]))
                }
            }
            return this._rewardList;
        }

        private _rankList : IGuanqiaRankRewardVo[];
        getRankList():IGuanqiaRankRewardVo[]{
            if(!this._rankList){
                this._rankList = [];
                this._rankList.push(this.getRankVo(1,this.tbCopy.rank_1));
                this._rankList.push(this.getRankVo(2,this.tbCopy.rank_2));
                this._rankList.push(this.getRankVo(3,this.tbCopy.rank_3));
                this._rankList.push(this.getRankVo(4,this.tbCopy.rank_4));
            }
            return this._rankList;
        }
        getRankVo(rank,reward:any[]):IGuanqiaRankRewardVo{
            let rewardList = [];
            for(let i = 0 ; i < reward.length ; i++){
                rewardList.push(new ItemVo(reward[i][0],reward[i][1]))
            }
            return { rank, rewardList, rankStr : (rank <= 3 ? rank : "4-10") };
        }

        /** 获取关卡名称 */
        getName():string {
            return this.tbCopy.getName();
        }

        /** 是否通关 */
        isPass():boolean {
            return GuildCopyModel.getInstance().isPass(this.tbCopy.ID);
        }
        /** 是否当前挑战 */
        isCurrent():boolean {
            let guildInfo = GuildModel.getInstance().guildInfo;
            let copyId = guildInfo ? guildInfo.copyId : 0;
            let ids = GuildCopyModel.getInstance().getGuanqiaIds();
            let index = ids.indexOf(copyId);
            return ids[index + 1] == this.tbCopy.ID;
        }
        
        /** 是否第一关 */
        isFirst():boolean {
            let ids = GuildCopyModel.getInstance().getGuanqiaIds();
            return ids[0] == this.tbCopy.ID;
        }
        /** 是否最后一关 */
        isLast():boolean {
            let ids = GuildCopyModel.getInstance().getGuanqiaIds();
            return ids[ids.length - 1] == this.tbCopy.ID;
        }
    }

    export interface IGuanqiaRankRewardVo {
        rank : number;
        rankStr : string;
        rewardList : ItemVo[];
    } 
}