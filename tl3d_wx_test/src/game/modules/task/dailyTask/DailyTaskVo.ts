/*
 * @Author: HuangGuoYong 
 * @Date: 2018-09-29 17:45:40 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-18 18:49:26
 */


module game {

    export class DailyTaskVo implements ITaskVo {
        public taskVo: IServerTaskVo;
        public tbTask: tb.TB_daily;
        constructor(vo: IServerTaskVo) {
            this.taskVo = vo;
            this.tbTask = tb.TB_daily.getTaskById(this.taskVo.id);
        }

        /** 排序 可领取 > 正在进行中 > 已领取 相同根据id排序*/
        getSortNum(): number {
            let num = this.taskVo.id;
            if (this.isReward()) {
                num -= 1000000;
            } else if (this.isFinish()) {
                num -= 100000000;
            } else {
                num -= 10000000;
            }
            return num;
        }
        getName(): string {
            return this.tbTask.desc;
        }
        getTotalNum(): number {
            return this.tbTask.num;
        }
        getCount(): number {
            return this.taskVo.count > this.tbTask.num ? this.tbTask.num : this.taskVo.count;
        }
        /** 是否开启 */
        isOpen(): boolean {
            let sysId = this.tbTask.link[0];
            return App.IsSysOpen(sysId);
        }
        /** 是否进行中 */
        isExcuting(): boolean {
            return false;
        }

        //是否完成日任务
        isFinish(): boolean {
            return this.taskVo.count >= (this.tbTask ? this.tbTask.num : 1) ? true : false;
        }

        /** 是否已领取 */
        isReward(): boolean {
            return this.taskVo.done;
        }

        /** 是否可领取 */
        isCanReward(): boolean {
            return this.isFinish() && !this.isReward();
        }

        private _rewardList: inface.IItemData[];
        /** 获取奖励列表 */
        getRewardList(): inface.IItemData[] {
            if (!this._rewardList) {
                this._rewardList = [];
                let rewards = this.tbTask.reward;
                for (let i = 0, len = rewards.length; i < len; i++) {
                    this._rewardList.push(App.getCostItemVo(parseInt(rewards[i][0]),parseInt(rewards[i][1])));
                }
            }
            let itemList = [...this._rewardList];
            if(WarriorProveModel.getInstance().isOpen() && this.tbTask.obtain_exp > 0){
                itemList.push(App.getCostItemVo(CostTypeKey.warrior_prove,this.tbTask.obtain_exp));
            }
            return itemList;
        }
    }

    /** 日常活跃任务数据 */
    export class DailyLivenessData implements inface.IBaoxiangData{
        public tbLiveness: tb.TB_daily_reward;
        constructor(tb: tb.TB_daily_reward) {
            this.tbLiveness = tb;
        }

        getRewardSkin(): string {
            switch(this.getCount()){
                case 25:
                    return SkinUtil.getTaskBaoxiang(1,this.isReward());
                case 50:
                    return SkinUtil.getTaskBaoxiang(2,this.isReward());
                case 75:
                    return SkinUtil.getTaskBaoxiang(3,this.isReward());
                case 100:
                    return SkinUtil.getTaskBaoxiang(4,this.isReward());
                default:
                    return SkinUtil.getTaskBaoxiang(1,this.isReward());
            }
        }
        

        /** 是否已领取 */
        isReward(): boolean {
            let doneChests = App.hero.tasks.doneChests;
            return doneChests && doneChests.indexOf(this.tbLiveness.ID) != -1;
        }

        /** 是否完成 */
        isFinish(): boolean {
            return App.hero.tasks.liveness >= this.tbLiveness.liveness;
        }

        /** 是否可领取 */
        isCanReward(): boolean {
            return this.isFinish() && !this.isReward();
        }

        /** 需要的次数 */
        getCount(): number {
            return this.tbLiveness.liveness;
        }

        getSkin():string {
            return ""
        }

        getRewardList():ItemVo[] {
            return this.tbLiveness.getRewardList();
        }

        getEvent():tl3d.BaseEvent {
            return new TaskEvent(TaskEvent.REWARD_LIVENESS);
        }
    }
}