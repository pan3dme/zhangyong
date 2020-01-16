
module game {

    export class GuildRewardVo {

        public tbReward : tb.TB_copy_reward;
        public tbGuanqia : tb.TB_guild_copy;
        /** 剩余次数 */
        public awardCount : number = 0;
        constructor(tbC:tb.TB_copy_reward){
            this.tbReward = tbC;
            this.tbGuanqia = tb.TB_guild_copy.getItemnById(tbC.ID*10+3);
            if(!this.tbGuanqia){
                logerror("不存在该关卡");
            }
        }

        private _rewardList : ItemVo[];
        getRewardList():ItemVo[]{
            if(!this._rewardList){
                this._rewardList = [];
                for(let i = 0 ; i < this.tbReward.reward.length ; i++){
                    this._rewardList.push(new ItemVo(this.tbReward.reward[i][0],this.tbReward.reward[i][1]))
                }
            }
            return this._rewardList;
        }

        getName():string {
            return `通关第${this.tbReward.ID*3}关`;
        }

        getSortNum():number {
            let num = this.tbReward.ID;
            if(this.isCanReward()){
                return num;
            }else if(this.isReceive()){
                return 10000 + num;
            }else{
                return 1000 + num;
            }
        }

        getResetNumStr():string {
            return LanMgr.getLan('',10089,this.awardCount);
        }

        /** 是否领取 */
        isReceive():boolean {
            let guildCopyAwardInfo = App.hero.guildCopyAwardInfo;
            return guildCopyAwardInfo[this.tbReward.ID] > 0;
        }
        /** 是否通关 */
        isPass():boolean {
            return GuildCopyModel.getInstance().isPass(this.tbGuanqia.ID);
        }

        /** 是否可领取 */
        isCanReward():boolean {
            return this.isPass() && !this.isReceive() && this.awardCount > 0;
        }
    }
}