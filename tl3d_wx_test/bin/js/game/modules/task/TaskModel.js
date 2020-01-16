/*
 * @Author: HuangGuoYong
 * @Date: 2018-09-28 19:19:43
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-18 18:37:09
 */
var game;
(function (game) {
    var TaskModel = /** @class */ (function () {
        function TaskModel() {
            this._tabMap = [];
            // =============================== 荣誉成就 ===============================
            /** 荣誉成就 */
            this._honorTasks = [];
        }
        TaskModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TaskModel();
            }
            return this._instance;
        };
        /** 重置 */
        TaskModel.prototype.resetDataByCrossDay = function (resetData) {
            // 服务器数据
            var tasksVo = App.hero.tasks;
            for (var key in tasksVo) {
                if (resetData.hasOwnProperty(key)) {
                    tasksVo[key] = resetData[key];
                }
            }
            App.hero.updateDailyLivess(resetData);
            tasksVo.dailyTasks = resetData.dailyTasks;
            for (var id in tasksVo.dailyTasks) {
                tasksVo.dailyTasks[id]['id'] = parseInt(id);
            }
            // 本地数据
            this._dailyTasks = null;
            this.getDailyTasks(true);
            game.WarriorProveModel.getInstance().resetDataByCrossDay(resetData);
            UIMgr.hideUIByName(UIConst.TaskView);
        };
        TaskModel.prototype.initModel = function () {
            this._tabMap[game.TaskTabType.daily] = [game.TaskTabType.daily, LanMgr.getLan("", 12131), "task_daily_group"];
            this._tabMap[game.TaskTabType.warrior] = [game.TaskTabType.warrior, LanMgr.getLan("", 12132), "task_warrior_group"];
            this._tabMap[game.TaskTabType.trial] = [game.TaskTabType.trial, LanMgr.getLan("", 12133), "task_trial_group"];
            this._tabMap[game.TaskTabType.achievement] = [game.TaskTabType.achievement, LanMgr.getLan("", 12134), "task_achievement_group"];
        };
        TaskModel.prototype.getTabViewDatas = function (type) {
            switch (type) {
                case game.TaskTabType.daily:
                    return { viewName: TaskModel.tabDaily, viewClz: game.TabDailyTaskView };
                case game.TaskTabType.warrior:
                    return { viewName: TaskModel.tabWarrior, viewClz: game.TabWarriorView };
                case game.TaskTabType.trial:
                    return { viewName: TaskModel.tabTrial, viewClz: game.TabTrialView };
                case game.TaskTabType.achievement:
                    return { viewName: TaskModel.tabAchievement, viewClz: game.TabAchievementView };
            }
            return null;
        };
        TaskModel.prototype.getTabListVo = function (types) {
            var list = [];
            for (var i = 0; i < types.length; i++) {
                list.push(this._tabMap[types[i]]);
            }
            return list;
        };
        TaskModel.prototype.getDailyTasks = function (sort) {
            if (sort === void 0) { sort = false; }
            if (!this._dailyTasks) {
                this._dailyTasks = [];
                var tasks = App.hero.tasks.dailyTasks;
                for (var id in tasks) {
                    this._dailyTasks.push(new game.DailyTaskVo(tasks[id]));
                }
            }
            if (sort) {
                this._dailyTasks.sort(function (a, b) {
                    return a.getSortNum() - b.getSortNum();
                });
            }
            return this._dailyTasks;
        };
        /** 每日任务列表 */
        TaskModel.prototype.getViewList = function () {
            var list = this.getDailyTasks(true);
            return list.filter(function (item) {
                return item.isOpen();
            });
        };
        TaskModel.prototype.getLivenessList = function () {
            if (!this._livenessList) {
                this._livenessList = [];
                var tb_1 = TableData.getInstance().getTableByName(TableData.tb_daily_reward).data;
                for (var id in tb_1) {
                    this._livenessList.push(new game.DailyLivenessData(tb_1[id]));
                }
                this._livenessList.sort(function (a, b) {
                    return a.tbLiveness.ID - b.tbLiveness.ID;
                });
            }
            return this._livenessList;
        };
        /** 是否可领取奖励 */
        TaskModel.prototype.canRewardDailyTask = function () {
            var bool1 = this.getDailyTasks(false).some(function (vo) {
                return vo.isCanReward();
            });
            bool1 = bool1 || this.getLivenessList().some(function (vo) {
                return vo.isCanReward();
            });
            return bool1;
        };
        TaskModel.prototype.getHonorTasks = function () {
            return this._honorTasks;
        };
        /** 更新荣誉列表 */
        TaskModel.prototype.updateHonorList = function () {
            this._honorTasks = [];
            var tasks = App.hero.tasks.curTasks;
            for (var id in tasks) {
                var vo = tasks[id];
                var tbTask = tb.TB_task.getTaskById(vo.id);
                if (!tbTask) {
                    logerror("\u672A\u627E\u5230(" + vo.id + ")tb.TB_task");
                    continue;
                }
                if (tbTask.type == iface.tb_prop.taskTypeKey.achievement && tbTask.label == AchievementTabType.honor) {
                    this._honorTasks.push(new game.TaskVo(vo.id));
                }
            }
            this._honorTasks.sort(function (a, b) {
                return a.getSortNum() - b.getSortNum();
            });
        };
        /** 是否可领取 */
        TaskModel.prototype.canRewardHonor = function () {
            return this._honorTasks.some(function (task) {
                return task.isCanReward();
            });
        };
        /** 获取服务器任务数据 (不包括日常任务) */
        TaskModel.prototype.getTaskVoById = function (taskId) {
            var tasks = App.hero.tasks.curTasks;
            for (var tid in tasks) {
                if (parseInt(tid) == taskId) {
                    return tasks[tid];
                }
            }
            return null;
        };
        /** 任务是否已领取奖励 (不包括日常任务) */
        TaskModel.prototype.isReceivedRewardByID = function (taskId) {
            return App.hero.tasks.doneTasks.indexOf(taskId) != -1;
        };
        /** 任务是否完成： 完成任务或者已领取奖励 */
        TaskModel.prototype.isFinish = function (taskId) {
            var reward = this.isReceivedRewardByID(taskId);
            if (!reward) {
                var task = this.getTaskVoById(taskId);
                var tbTask = tb.TB_task.getTaskById(taskId);
                reward = task && tbTask ? (task.count >= tbTask.check_num) : false;
            }
            return reward;
        };
        /** 获取后置id */
        TaskModel.prototype.getPostTaskId = function (id) {
            // 后置任务为0表示最后一个任务
            var tbTask = tb.TB_task.getTaskById(id);
            return tbTask ? tbTask.post_taskid : -1;
        };
        /** 获取前置id */
        TaskModel.prototype.getPrevTaskId = function (id) {
            var tbTask = tb.TB_task.getTaskById(id);
            return tbTask.pre_taskid;
        };
        TaskModel.tabDaily = "tabDaily";
        TaskModel.tabWarrior = "tabWarrior";
        TaskModel.tabTrial = "tabTrial";
        TaskModel.tabAchievement = "tabAchievement";
        return TaskModel;
    }());
    game.TaskModel = TaskModel;
})(game || (game = {}));
