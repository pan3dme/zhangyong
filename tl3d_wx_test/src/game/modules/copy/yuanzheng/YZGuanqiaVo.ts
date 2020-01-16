
module game {

    export class YZGuanqiaVo {

        public tbCopy : tb.TB_expedition;
        public index : number;
        constructor(tb : tb.TB_expedition,index:number){
            this.tbCopy = tb;
            this.index = index;
        }
        /** 是否通过 */
        isPass():boolean {
            let finishId = App.hero.copyInfo.expeditionId;
            return this.tbCopy.ID <= finishId;
        }
        /** 是否当前挑战关卡 */
        isCurrent():boolean {
            let curGuanqia = YuanzhengModel.getInstance().curGuanqia;
            return curGuanqia && curGuanqia.tbCopy.ID == this.tbCopy.ID;
        }

        /** 是否已领取奖励 每逢3关有个关卡奖励 */
        isReward():boolean {
            let info = App.hero.copyInfo.expeditionRewardInfo;
            return info[this.tbCopy.ID] && info[this.tbCopy.ID] > 0;
        }

        /** 是否可领取 */
        public isCanReward():boolean {
            return this.isHasBaoxiang() && this.isPass() && !this.isReward();
        }

        /** 是否有宝箱奖励 */
        public isHasBaoxiang():boolean {
            return this.tbCopy.getBoxRewardList().length > 0
        }
    }
}