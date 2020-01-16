/*
 * @Author: HuangGuoYong
 * @Date: 2018-09-28 14:50:35
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-02 20:40:49
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
    var TaskProcessor = /** @class */ (function (_super) {
        __extends(TaskProcessor, _super);
        function TaskProcessor() {
            return _super.call(this) || this;
        }
        TaskProcessor.prototype.getName = function () {
            return "TaskProcessor";
        };
        TaskProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TaskEvent(game.TaskEvent.SHOW_TASK_VIEW),
                new game.TaskEvent(game.TaskEvent.SHOW_DETAIL_ACHIEVEMENT),
                new game.TaskEvent(game.TaskEvent.TASK_GOTO),
                new game.TaskEvent(game.TaskEvent.DAILY_TASK_GOTO),
                new game.TaskEvent(game.TaskEvent.TRIAL_TASK_GO),
                new game.TaskEvent(game.TaskEvent.RECEIVE_TASK_REWARD),
            ];
        };
        //处理事件
        TaskProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.TaskEvent) {
                switch ($event.type) {
                    case game.TaskEvent.SHOW_TASK_VIEW:
                        this.showUI($event.data);
                        break;
                    case game.TaskEvent.SHOW_DETAIL_ACHIEVEMENT:
                        this.showDetailUI($event.data);
                        break;
                    case game.TaskEvent.TASK_GOTO:
                        this.goto($event.data);
                        break;
                    case game.TaskEvent.RECEIVE_TASK_REWARD:
                        this.receiveTaskReward($event.data);
                        break;
                    case game.TaskEvent.DAILY_TASK_GOTO:
                        this.gotoDaily($event.data);
                        break;
                    case game.TaskEvent.TRIAL_TASK_GO:
                        this.gotoTrial($event.data);
                        break;
                }
            }
        };
        /** 展示成就任务界面 */
        TaskProcessor.prototype.showUI = function (index) {
            if (index === void 0) { index = 0; }
            UIMgr.showUI(UIConst.TaskView, index ? index : 0);
        };
        /** 展示详细任务界面 */
        TaskProcessor.prototype.showDetailUI = function (data) {
            UIMgr.showUI(UIConst.ChallengeDetailView, data);
        };
        /** 跳转 */
        TaskProcessor.prototype.goto = function (tbTask) {
            logdebug('任务界面跳转:', tbTask.link);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, tbTask.link));
        };
        /** 日常任务界面跳转 */
        TaskProcessor.prototype.gotoDaily = function (tbDaily) {
            logdebug('日常任务界面跳转:', tbDaily.link);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, tbDaily.link));
        };
        /** 试炼任务界面跳转 */
        TaskProcessor.prototype.gotoTrial = function (info) {
            logdebug('试炼任务界面跳转:', info.tbData.link);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, info.tbData.link));
        };
        /** 领取任务奖励 */
        TaskProcessor.prototype.receiveTaskReward = function (vo) {
            if (vo.isCanReward()) {
                var args = {};
                args[Protocol.game_task_getTaskAward.args.taskId] = vo.tbTask.ID;
                PLC.request(Protocol.game_task_getTaskAward, args, function ($data) {
                    if (!$data)
                        return;
                    if (UIMgr.hasStage(UIConst.TaskView)) {
                        var achiUI = UIMgr.getUIByName(UIConst.TaskView);
                        achiUI.refreshTaskList();
                    }
                    if (UIMgr.hasStage(UIConst.BianQiangView)) {
                        var bianqiangui = UIMgr.getUIByName(UIConst.BianQiangView);
                        bianqiangui.resetTaskList();
                    }
                    if ($data && $data.commonData) {
                        UIUtil.showRewardView($data.commonData);
                    }
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.REWARD_TASK_SUCCESS));
                });
            }
        };
        return TaskProcessor;
    }(tl3d.Processor));
    game.TaskProcessor = TaskProcessor;
})(game || (game = {}));
