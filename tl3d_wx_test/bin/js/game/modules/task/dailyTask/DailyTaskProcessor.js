/*
 * @Author: HuangGuoYong
 * @Date: 2018-09-29 17:35:55
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-18 18:50:22
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
    var DailyTaskProcessor = /** @class */ (function (_super) {
        __extends(DailyTaskProcessor, _super);
        function DailyTaskProcessor() {
            return _super.call(this) || this;
        }
        DailyTaskProcessor.prototype.getName = function () {
            return "DailyTaskProcessor";
        };
        DailyTaskProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TaskEvent(game.TaskEvent.CLICK_DAILY_TASK),
                new game.TaskEvent(game.TaskEvent.REWARD_LIVENESS),
            ];
        };
        //处理事件
        DailyTaskProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.TaskEvent) {
                switch (event.type) {
                    case game.TaskEvent.CLICK_DAILY_TASK:
                        this.onClickDailyTask(event.data);
                        break;
                    case game.TaskEvent.REWARD_LIVENESS:
                        this.rewardLiveness(event.data);
                        break;
                }
            }
        };
        /** 日常任务：领取、前往 */
        DailyTaskProcessor.prototype.onClickDailyTask = function (dailyTask) {
            var _this = this;
            if (dailyTask.isReward())
                return;
            var tbTask = dailyTask.tbTask;
            if (dailyTask.isFinish()) {
                var args = {};
                args[Protocol.game_task_getDailyAward.args.dailyId] = tbTask.ID;
                PLC.request(Protocol.game_task_getDailyAward, args, function ($data) {
                    if (!$data)
                        return;
                    App.hero.updateDailyLivess($data);
                    if (UIMgr.hasStage(UIConst.TaskView)) {
                        var viewe = _this.taskView;
                        viewe.refreshTaskList();
                    }
                    if ($data && $data.commonData) {
                        UIUtil.showRewardView($data.commonData);
                    }
                });
            }
            else {
                dispatchEvt(new game.TaskEvent(game.TaskEvent.DAILY_TASK_GOTO, tbTask));
            }
        };
        /** 领取活跃度奖励 */
        DailyTaskProcessor.prototype.rewardLiveness = function (livenessData) {
            var _this = this;
            var args = {};
            args[Protocol.game_task_getLivenessChest.args.chestId] = livenessData.tbLiveness.ID;
            PLC.request(Protocol.game_task_getLivenessChest, args, function ($data) {
                if (!$data)
                    return;
                if (UIMgr.hasStage(UIConst.TaskView)) {
                    var view = _this.taskView;
                    view.refreshLiveness();
                }
                if ($data) {
                    UIUtil.showRewardView($data.commonData);
                }
            });
        };
        Object.defineProperty(DailyTaskProcessor.prototype, "taskView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.TaskView);
            },
            enumerable: true,
            configurable: true
        });
        return DailyTaskProcessor;
    }(tl3d.Processor));
    game.DailyTaskProcessor = DailyTaskProcessor;
})(game || (game = {}));
