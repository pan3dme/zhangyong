/*
 * @Author: HuangGuoYong
 * @Date: 2018-09-28 14:50:47
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2018-11-22 14:40:26
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var TaskModule = /** @class */ (function (_super) {
        __extends(TaskModule, _super);
        function TaskModule() {
            return _super.call(this) || this;
        }
        TaskModule.prototype.getModuleName = function () {
            return "TaskModule";
        };
        TaskModule.prototype.listProcessors = function () {
            return [new game.TaskProcessor(), new game.DailyTaskProcessor(), new game.WarriorProveProcessor()];
        };
        /**
         * 初始化数据
         */
        TaskModule.prototype.onRegister = function () {
            game.TaskModel.getInstance().initModel();
            game.WarriorProveModel.getInstance().initModel();
        };
        return TaskModule;
    }(tl3d.Module));
    game.TaskModule = TaskModule;
    var TaskEvent = /** @class */ (function (_super) {
        __extends(TaskEvent, _super);
        function TaskEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 领取任务奖励成功 */
        TaskEvent.REWARD_TASK_SUCCESS = "REWARD_TASK_SUCCESS";
        /** 显示成就任务 */
        TaskEvent.SHOW_TASK_VIEW = "SHOW_TASK_VIEW";
        /** 显示详细任务 */
        TaskEvent.SHOW_DETAIL_ACHIEVEMENT = "SHOW_DETAIL_TASK";
        /** 更新成就 */
        TaskEvent.UPDATE_ACHIEVEMENT_DATA = "UPDATE_ACHIEVEMENT_DATA";
        /** 更新限时任务 */
        TaskEvent.UPDATE_LIMIT_TASK = "UPDATE_LIMIT_TASK";
        /** 显示日常任务ui */
        TaskEvent.SHOW_DAILY_TASK = "SHOW_DAILY_TASK";
        /** 更新每日任务 */
        TaskEvent.UPDATE_DAILY_TASK = "UPDATE_DAILY_TASK";
        /** 点击日常任务 */
        TaskEvent.CLICK_DAILY_TASK = "CLICK_DAILY_TASK";
        /** 领取活跃奖励 */
        TaskEvent.REWARD_LIVENESS = "REWARD_LIVENESS";
        /** 更新活跃任务数据 */
        TaskEvent.UPDATE_LIVENESS_DATA = "UPDATE_LIVENESS_DATA";
        /** 任务跳转 */
        TaskEvent.TASK_GOTO = "TASK_GOTO";
        /** 日常任务跳转 */
        TaskEvent.DAILY_TASK_GOTO = "DAILY_TASK_GOTO";
        /** 试炼任务跳转 */
        TaskEvent.TRIAL_TASK_GO = "TRIAL_TASK_GO";
        /** 领取任务奖励 */
        TaskEvent.RECEIVE_TASK_REWARD = "RECEIVE_TASK_REWARD";
        // -------------- 勇者之证 --------------
        /** 展示勇者等级购买界面 */
        TaskEvent.SHOW_WARRIOR_BUY_LEVEL = "SHOW_WARRIOR_BUY_LEVEL";
        /** 展示勇者进阶解锁界面 */
        TaskEvent.SHOW_WARRIOR_JINJIE = "SHOW_WARRIOR_JINJIE";
        /** 去领取等级奖励 */
        TaskEvent.TO_REWARD_LEVEL = "TO_REWARD_LEVEL";
        /** 去领取试炼任务奖励 */
        TaskEvent.TO_REWARD_TRAIL_TASK = "REWARD_TRAIL_TASK";
        /** 成功领取等级奖励 */
        TaskEvent.REWARD_LEVEL_SUCC = "REWARD_LEVEL_SUCC";
        /** 更新勇者之证积分 */
        TaskEvent.UPDATE_WARRIOR_EXP = "UPDATE_WARRIOR_EXP";
        /** 更新试炼任务完成数量 */
        TaskEvent.UPDATE_TRIAL_TASK_COUNT = "UPDATE_TRIAL_TASK_COUNT";
        /** 更新试炼任务领取状态 */
        TaskEvent.UPDATE_TRIAL_TASK_REWARD = "UPDATE_TRIAL_TASK_REWARD";
        /** 成功解锁勇者进阶 */
        TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC = "UNLOCK_WARRIOR_JINJIE_SUCC";
        /** 领取每周积分礼包成功 */
        TaskEvent.REWARD_WEEK_GIFT_SUCC = "REWARD_WEEK_GIFT_SUCC";
        return TaskEvent;
    }(tl3d.BaseEvent));
    game.TaskEvent = TaskEvent;
    /** 任务界面tab类型 */
    var TaskTabType;
    (function (TaskTabType) {
        TaskTabType[TaskTabType["daily"] = 0] = "daily";
        TaskTabType[TaskTabType["warrior"] = 1] = "warrior";
        TaskTabType[TaskTabType["trial"] = 2] = "trial";
        TaskTabType[TaskTabType["achievement"] = 3] = "achievement";
    })(TaskTabType = game.TaskTabType || (game.TaskTabType = {}));
})(game || (game = {}));
