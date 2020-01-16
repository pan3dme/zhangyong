

module game {

    /** 任务 */
    export class TaskVo implements ITaskVo {

        public taskId: number;
        private _taskVo: IServerTaskVo;
        public tbTask: tb.TB_task;
        constructor(taskId: number) {
            this.taskId = taskId;
            this.tbTask = tb.TB_task.getTaskById(taskId);
            this.getTaskVo();
        }

        getTaskVo(): IServerTaskVo {
            if (!this._taskVo) {
                this._taskVo = TaskModel.getInstance().getTaskVoById(this.taskId);
            }
            return this._taskVo;
        }

        /** 排序 可领取 > 正在进行中 > 已领取 相同根据id排序*/
        getSortNum(): number {
            let num = this.tbTask.label == AchievementTabType.challenge ? this.tbTask.rank : this.tbTask.ID;
            if (this.isCanReward()) {
                num += 100000;
            } else if (this.isReward()) {
                num += 100000000;
            } else {
                num += 10000000;
            }
            return num;
        }
        getName(): string {
            return this.tbTask.name;
        }
        getTotalNum(): number {
            return this.tbTask.check_num;
        }

        /** 是否完成日任务 */
        isFinish(): boolean {
            if (this.isReward()) return true;
            return this.getCount() >= this.tbTask.check_num ? true : false;
        }

        /** 完成次数 -- 已领取的任务取任务所需次数 */
        getCount(): number {
            if (this.isReward()) return this.tbTask.check_num;
            let count = 0;
            if (this.getTaskVo()) {
                count = this._taskVo.count > this.tbTask.check_num ? this.tbTask.check_num : this._taskVo.count;
            }
            count = count < 0 ? 0 : count;
            return count;
        }

        /** 是否已领取 */
        isReward(): boolean {
            return App.hero.tasks.doneTasks.indexOf(this.taskId) != -1;
        }

        /** 是否可领取 */
        isCanReward(): boolean {
            return this.isFinish() && !this.isReward();
        }

        /** 是否进行中 */
        isExcuting(): boolean {
            if (this.tbTask.label == AchievementTabType.challenge) {
                let tabData = BianQiangModel.getInstance().getChallengeTabData(this.tbTask.sub_label);
                let curTask = tabData.getCurTask();
                return curTask && curTask.tbTask.ID == this.tbTask.ID;
            }
            return false;
        }

        private _rewardList: inface.IItemData[];
        getRewardList(): inface.IItemData[] {
            if (!this._rewardList) {
                this._rewardList = [];
                let rewards = this.tbTask.reward;
                for (let i = 0, len = rewards.length; i < len; i++) {
                    let itemVo: inface.IItemData = {
                        getQulity: () => { return "" },
                        getIconUrl: () => { return SkinUtil.getCostSkin(parseInt(rewards[i][0])) },
                        getNum: () => { return parseInt(rewards[i][1]) },
                        getShow: () => { return false },
                        getConstNum: () => { return 0 },
                        isStartAction: () => { return false },
                        isChip: () => { return false },
                        showRace: () => { return 0 },
                        getStar: () => { return 0 },
                        isMoreThanSix: () => { return false },
                        getExtParm: () => { return null },
                    }

                    this._rewardList.push(itemVo);
                }
            }
            return this._rewardList;
        }

        private _itemList: ItemVo[];
        public getItemList(): ItemVo[] {
            if (!this._itemList) {
                this._itemList = [];
                let rewards = this.tbTask.reward;
                for (let i = 0, len = rewards.length; i < len; i++) {
                    let item:ItemVo = new ItemVo(parseInt(rewards[i][0]), parseInt(rewards[i][1]));
                    // item.isShowEff = i < this.tbTask.label;
                    item.isShowEff = false;
                    this._itemList.push(item);
                }
            }
            return this._itemList;
        }
    }

    /** 挑战章节数据 */
    export class ChallengeTabData {

        public subLbType: number;
        public tbTitle: tb.TB_task_title;
        constructor(type) {
            this.subLbType = type;
            this.tbTitle = tb.TB_task_title.getCfgById(type);
        }

        /** 子任务列表 */
        private _list: TaskVo[];
        getList(): TaskVo[] {
            if (!this._list) {
                this._list = [];
                let tbArr = tb.TB_task.getAchievementListByType(AchievementTabType.challenge, this.subLbType);
                for (let i = 0, len = tbArr.length; i < len; i++) {
                    let tbTask = tbArr[i];
                    let data = new TaskVo(tbTask.ID);
                    this._list.push(data);
                }
            }
            this.sortList();
            return this._list;
        }
        sortList(): void {
            if (!this._list) return;
            this._list.sort((a, b) => {
                return a.getSortNum() - b.getSortNum();
            });
        }

        getTaskById(taskId: number): TaskVo {
            return this.getList().find((vo) => {
                return vo.taskId == taskId;
            })
        }

        getTaskByIdx(index: number): TaskVo {
            return this.getList()[index];
        }

        /** 已领取数量 */
        getCount(): number {
            let list = this.getList();
            let num = 0;
            for (let data of list) {
                if (data.isReward()) {
                    num++;
                }
            }
            return num;
        }
        /** 子任务数量 */
        getAllCount(): number {
            return this.getList().length;
        }

        /** 获取当前正在进行的任务 */
        getCurTask():TaskVo {
            let list = this.getList();
            for (let i = 0, len = list.length; i < len; i++) {
                let achieData = list[i];
                if (!achieData.isReward()) {
                    return achieData;
                }
            }
            return null;
        }

        /** 是否可领取奖励 */
        canReward(): boolean {
            return this.getList().some((task: TaskVo) => {
                return task.isCanReward();
            })
        }

        /** 是否全部完成 */
        isAllFinish():boolean {
            return this.getCurTask() ? false : true;
        }
    }

}