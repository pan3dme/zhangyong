/*
 * @Author: HuangGuoYong 
 * @Date: 2018-09-28 19:19:43 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-18 18:37:09
 */

module game {

    export class TaskModel {
        constructor() {

        }
        private static _instance: TaskModel;
        public static getInstance(): TaskModel {
            if (!this._instance) {
                this._instance = new TaskModel();
            }
            return this._instance;
        }
        /** 重置 */
        resetDataByCrossDay(resetData:any):void {
            // 服务器数据
            let tasksVo = App.hero.tasks;
            for(let key in tasksVo) {
                if(resetData.hasOwnProperty(key)){
                    tasksVo[key] = resetData[key];
                }
            }
            App.hero.updateDailyLivess(resetData);
            tasksVo.dailyTasks = resetData.dailyTasks;
			for (let id in tasksVo.dailyTasks) {
				tasksVo.dailyTasks[id]['id'] = parseInt(id);
			}
            // 本地数据
            this._dailyTasks = null;
            this.getDailyTasks(true);
            WarriorProveModel.getInstance().resetDataByCrossDay(resetData);
            UIMgr.hideUIByName(UIConst.TaskView);
        }

        private _tabMap : any[] = [];
        initModel():void {
            this._tabMap[TaskTabType.daily] = [TaskTabType.daily,LanMgr.getLan("",12131),"task_daily_group"];
            this._tabMap[TaskTabType.warrior] = [TaskTabType.warrior,LanMgr.getLan("",12132),"task_warrior_group"];
            this._tabMap[TaskTabType.trial] = [TaskTabType.trial,LanMgr.getLan("",12133),"task_trial_group"];
            this._tabMap[TaskTabType.achievement] = [TaskTabType.achievement,LanMgr.getLan("",12134),"task_achievement_group"];
        }

        public static tabDaily: string = "tabDaily";
		public static tabWarrior: string = "tabWarrior";
		public static tabTrial: string = "tabTrial";
		public static tabAchievement: string = "tabAchievement";
		getTabViewDatas(type): { viewName: string, viewClz: any } {
			switch (type) {
				case TaskTabType.daily:
					return { viewName: TaskModel.tabDaily, viewClz: TabDailyTaskView };
				case TaskTabType.warrior:
					return { viewName: TaskModel.tabWarrior, viewClz: TabWarriorView };
				case TaskTabType.trial:
					return { viewName: TaskModel.tabTrial, viewClz: TabTrialView };
				case TaskTabType.achievement:
					return { viewName: TaskModel.tabAchievement, viewClz: TabAchievementView };
			}
			return null;
		}
        getTabListVo(types:number[]):any[] {
            let list = [];
            for(let i = 0 ; i < types.length ; i++) {
                list.push(this._tabMap[types[i]]);
            }
            return list;
        }

        // =============================== 日常任务 ===============================
        /** 每日任务 */
        private _dailyTasks: DailyTaskVo[];
        getDailyTasks(sort: boolean = false): DailyTaskVo[] {
            if (!this._dailyTasks) {
                this._dailyTasks = [];
                let tasks = App.hero.tasks.dailyTasks;
                for (let id in tasks) {
                    this._dailyTasks.push(new DailyTaskVo(tasks[id]))
                }
            }
            if (sort) {
                this._dailyTasks.sort((a, b) => {
                    return a.getSortNum() - b.getSortNum();
                });
            }
            return this._dailyTasks;
        }
        /** 每日任务列表 */
        getViewList():DailyTaskVo[]{
            let list = this.getDailyTasks(true);
            return list.filter((item)=>{
                return item.isOpen();
            });
        }
        /** 活跃度宝箱列表 */
        private _livenessList: DailyLivenessData[];
        getLivenessList(): DailyLivenessData[] {
            if (!this._livenessList) {
                this._livenessList = [];
                let tb = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_daily_reward)).data;
                for (let id in tb) {
                    this._livenessList.push(new DailyLivenessData(tb[id]));
                }
                this._livenessList.sort((a, b) => {
                    return a.tbLiveness.ID - b.tbLiveness.ID;
                })
            }
            return this._livenessList;
        }

        /** 是否可领取奖励 */
        canRewardDailyTask(): boolean {
            let bool1: boolean = this.getDailyTasks(false).some((vo: DailyTaskVo) => {
                return vo.isCanReward();
            });
            bool1 = bool1 || this.getLivenessList().some((vo: DailyLivenessData) => {
                return vo.isCanReward();
            });
            return bool1;
        }

        // =============================== 荣誉成就 ===============================
        /** 荣誉成就 */
        private _honorTasks: TaskVo[] = [];
        getHonorTasks(): TaskVo[] {
            return this._honorTasks;
        }
        /** 更新荣誉列表 */
        updateHonorList(): void {
            this._honorTasks = [];
            let tasks = App.hero.tasks.curTasks;
            for (let id in tasks) {
                let vo: IServerTaskVo = tasks[id];
                let tbTask = tb.TB_task.getTaskById(vo.id);
                if(!tbTask){
                    logerror(`未找到(${vo.id})tb.TB_task`);
                    continue;
                }
                if (tbTask.type == iface.tb_prop.taskTypeKey.achievement && tbTask.label == AchievementTabType.honor) {
                    this._honorTasks.push(new TaskVo(vo.id));
                }
            }
            this._honorTasks.sort((a, b) => {
                return a.getSortNum() - b.getSortNum();
            });
        }
        /** 是否可领取 */
        canRewardHonor(): boolean {
            return this._honorTasks.some((task: TaskVo) => {
                return task.isCanReward();
            });
        }

        /** 获取服务器任务数据 (不包括日常任务) */
        getTaskVoById(taskId: number): IServerTaskVo {
            let tasks = App.hero.tasks.curTasks;
            for (let tid in tasks) {
                if (parseInt(tid) == taskId) {
                    return tasks[tid];
                }
            }
            return null;
        }
        /** 任务是否已领取奖励 (不包括日常任务) */
        isReceivedRewardByID(taskId: number): boolean {
            return App.hero.tasks.doneTasks.indexOf(taskId) != -1;
        }
        /** 任务是否完成： 完成任务或者已领取奖励 */
        isFinish(taskId: number): boolean {
            let reward = this.isReceivedRewardByID(taskId);
            if (!reward) {
                let task = this.getTaskVoById(taskId);
                let tbTask = tb.TB_task.getTaskById(taskId);
                reward = task && tbTask ? (task.count >= tbTask.check_num) : false
            }
            return reward;
        }

        /** 获取后置id */
        getPostTaskId(id): number {
            // 后置任务为0表示最后一个任务
            let tbTask: tb.TB_task = tb.TB_task.getTaskById(id);
            return tbTask?tbTask.post_taskid:-1;
        }
        /** 获取前置id */
        getPrevTaskId(id): number {
            let tbTask: tb.TB_task = tb.TB_task.getTaskById(id);
            return tbTask.pre_taskid;
        }
    }
}