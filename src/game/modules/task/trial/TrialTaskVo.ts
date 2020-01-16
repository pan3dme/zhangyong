
module game {
    /** 试炼任务 */
    export class TrialTaskVo {

        public tbData : tb.TB_week_trial | tb.TB_month_trial;
        public isWeek : boolean;    // 是否周试炼
        public sortNum : number = 0;
        constructor(){}
        setTbData(tbData:tb.TB_week_trial | tb.TB_month_trial,isWeek:boolean):void {
            this.tbData = tbData;
            this.isWeek = isWeek;
        }

        /** 清理 */
        clear():void {
            this.tbData = null;
        }
        /** 获取标题 */
        getTitle():string {
            return this.isWeek ? `${LanMgr.getLan("",12140)}${this.tbData.title}` : `${LanMgr.getLan("",12141)}${this.tbData.title}`;
        }
        /** 获取完成数量 */
        getNum():number {
            return TrialTaskModel.getInstance().getFinishNum(this.tbData.ID,this.isWeek);
        }

        /** 是否完成 */
        isFinish():boolean {
            return this.getNum() >= this.tbData.num;
        }
        /** 是否已领取奖励 */
        isReward():boolean {
            return TrialTaskModel.getInstance().isReward(this.tbData.ID,this.isWeek);
        }
        /** 是否可领取奖励 */
        isCanReward():boolean {
            return this.isFinish() && !this.isReward();
        }
    }
}