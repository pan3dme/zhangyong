var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    /** 试炼任务 */
    var TrialTaskModel = /** @class */ (function () {
        function TrialTaskModel() {
            /** 周试炼开始时间 */
            this.weekStartTime = 0;
            /** 周试炼结束时间 */
            this.weekEndTime = 0;
            /** 月试炼开始时间 */
            this.monthStartTime = 0;
            /** 月试炼开始时间 */
            this.monthEndTime = 0;
            /** 周任务列表 */
            this._weekList = [];
            /** 月任务列表 */
            this._monthList = [];
        }
        TrialTaskModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TrialTaskModel();
            }
            return this._instance;
        };
        /** 初始化列表 -- 接在WarriorProveModel.initModel之后 */
        TrialTaskModel.prototype.initModel = function () {
            // 每天重置,就不用考虑跨周跨月重置
            for (var _i = 0, _a = this._weekList; _i < _a.length; _i++) {
                var vo = _a[_i];
                vo.clear();
                Laya.Pool.recover("TrialTaskVo", vo);
            }
            this._weekList.length = 0;
            for (var _b = 0, _c = this._monthList; _b < _c.length; _b++) {
                var vo = _c[_b];
                vo.clear();
                Laya.Pool.recover("TrialTaskVo", vo);
            }
            this._monthList.length = 0;
            this.weekStartTime = 0;
            this.weekEndTime = 0;
            this.monthStartTime = 0;
            this.monthEndTime = 0;
            var curTabCycle = game.WarriorProveModel.getInstance().curTabCycle;
            if (curTabCycle) {
                this.weekStartTime = game.GloryUtil.getFormatTime(1, 0, 0, 0);
                this.weekEndTime = game.GloryUtil.getFormatTime(7, 23, 59, 59) + 1;
                this.monthStartTime = game.WarriorProveModel.getInstance().startTime;
                this.monthEndTime = game.WarriorProveModel.getInstance().endTime;
                // 周任务
                var weekList = tb.TB_week_trial.getList("cycle", curTabCycle.ID);
                for (var i = 0; i < weekList.length; i++) {
                    var team = Laya.Pool.getItemByClass("TrialTaskVo", game.TrialTaskVo);
                    team.setTbData(weekList[i], true);
                    this._weekList.push(team);
                }
                // 月任务
                var monthList = tb.TB_month_trial.getList("cycle", curTabCycle.ID);
                for (var i = 0; i < monthList.length; i++) {
                    var team = Laya.Pool.getItemByClass("TrialTaskVo", game.TrialTaskVo);
                    team.setTbData(monthList[i], false);
                    this._monthList.push(team);
                }
            }
        };
        /** 周任务列表 */
        TrialTaskModel.prototype.getWeekList = function (sort) {
            if (sort === void 0) { sort = false; }
            var list = __spreadArrays(this._weekList);
            if (sort) {
                // 可领取、未完成、已领取排序
                list.forEach(function (vo) {
                    vo.sortNum = vo.isReward() ? (100000 + vo.tbData.ID) : (!vo.isFinish() ? 10000 + vo.tbData.ID : vo.tbData.ID);
                });
                list.sort(function (a, b) {
                    return a.sortNum - b.sortNum;
                });
            }
            return list;
        };
        /** 月任务列表 */
        TrialTaskModel.prototype.getMonthList = function (sort) {
            if (sort === void 0) { sort = false; }
            var list = __spreadArrays(this._monthList);
            if (sort) {
                // 可领取、未完成、已领取排序
                list.forEach(function (vo) {
                    vo.sortNum = vo.isReward() ? (100000 + vo.tbData.ID) : (!vo.isFinish() ? 10000 + vo.tbData.ID : vo.tbData.ID);
                });
                list.sort(function (a, b) {
                    return a.sortNum - b.sortNum;
                });
            }
            return list;
        };
        /** 修改试炼任务奖励次数 */
        TrialTaskModel.prototype.modifyReward = function (modifyObj, isWeek) {
            var obj = modifyObj || {};
            for (var id in obj) {
                if (isWeek) {
                    var weekTask = App.hero.tasks.warriorWeekTasks || {};
                    if (!weekTask[id]) {
                        weekTask[id] = { count: 0, reward: 0 };
                    }
                    weekTask[id].reward = obj[id];
                }
                else {
                    var monthTask = App.hero.tasks.warriorMonthTasks || {};
                    if (!monthTask[id]) {
                        monthTask[id] = { count: 0, reward: 0 };
                    }
                    monthTask[id].reward = obj[id];
                }
            }
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_TRIAL_TASK_REWARD));
        };
        /** 修改试炼任务完成次数 */
        TrialTaskModel.prototype.modifyFinishNum = function (modifyObj, isWeek) {
            var obj = modifyObj || {};
            for (var id in obj) {
                if (isWeek) {
                    var weekTasks = App.hero.tasks.warriorWeekTasks || {};
                    if (!weekTasks[id]) {
                        weekTasks[id] = { count: 0, reward: 0 };
                    }
                    weekTasks[id].count = obj[id];
                }
                else {
                    var monthTask = App.hero.tasks.warriorMonthTasks || {};
                    if (!monthTask[id]) {
                        monthTask[id] = { count: 0, reward: 0 };
                    }
                    monthTask[id].count = obj[id];
                }
            }
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_TRIAL_TASK_COUNT));
        };
        /** 是否可领取 */
        TrialTaskModel.prototype.isCanReward = function (type) {
            if (!game.WarriorProveModel.getInstance().isOpen())
                return false;
            return type == 0 ? this._weekList.some(function (vo) { return vo.isCanReward(); }) : this._monthList.some(function (vo) { return vo.isCanReward(); });
        };
        /** 获取任务完成次数 */
        TrialTaskModel.prototype.getFinishNum = function (id, isWeek) {
            var weekTask = App.hero.tasks.warriorWeekTasks || {};
            var monthTask = App.hero.tasks.warriorMonthTasks || {};
            var obj = isWeek ? weekTask[id] : monthTask[id];
            return obj ? obj.count : 0;
        };
        /** 是否领取了任务奖励 */
        TrialTaskModel.prototype.isReward = function (id, isWeek) {
            var weekTask = App.hero.tasks.warriorWeekTasks || {};
            var monthTask = App.hero.tasks.warriorMonthTasks || {};
            var obj = isWeek ? weekTask[id] : monthTask[id];
            return obj ? obj.reward == 1 : false;
        };
        /** 是否已领取每周积分礼包奖励 */
        TrialTaskModel.prototype.isRewardWeekGift = function () {
            return App.hero.tasks.warriorWeekAward == 1;
        };
        return TrialTaskModel;
    }());
    game.TrialTaskModel = TrialTaskModel;
})(game || (game = {}));
