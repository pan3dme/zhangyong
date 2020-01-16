
module game {

    export class CopyRewardVo {

        public tbData : tb.TB_team_target;
        public sortNum : number;
        constructor(tbData:tb.TB_team_target){
            this.tbData = tbData;
            this.sortNum = 0;
        }

        /** 是否完成 */
        isFinish():boolean {
            return CopyTeamModel.getInstance().myFloor >= this.tbData.need_copy;
        }
        /** 是否已领取 */
        isReward():boolean {
            return CopyTeamModel.getInstance().groupCopyChapterAward.indexOf(this.tbData.ID) != -1;
        }
        /** 是否可领取 */
        isCanReward():boolean {
            return this.isFinish() && !this.isReward();
        }
    }
}