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
    var WarriorProveProcessor = /** @class */ (function (_super) {
        __extends(WarriorProveProcessor, _super);
        function WarriorProveProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.WarriorProveModel.getInstance();
            return _this;
        }
        WarriorProveProcessor.prototype.getName = function () {
            return "WarriorProveProcessor";
        };
        WarriorProveProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TaskEvent(game.TaskEvent.SHOW_WARRIOR_BUY_LEVEL),
                new game.TaskEvent(game.TaskEvent.SHOW_WARRIOR_JINJIE),
                new game.TaskEvent(game.TaskEvent.TO_REWARD_LEVEL),
                new game.TaskEvent(game.TaskEvent.TO_REWARD_TRAIL_TASK),
            ];
        };
        //处理事件
        WarriorProveProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.TaskEvent) {
                switch (event.type) {
                    case game.TaskEvent.SHOW_WARRIOR_BUY_LEVEL:
                        this.showBuyLevel();
                        break;
                    case game.TaskEvent.SHOW_WARRIOR_JINJIE:
                        this.showJinjie();
                        break;
                    case game.TaskEvent.TO_REWARD_LEVEL:
                        this.rewardLevel(event.data);
                        break;
                    case game.TaskEvent.TO_REWARD_TRAIL_TASK:
                        this.rewardTrialTask(event.data);
                        break;
                }
            }
        };
        /** 展示勇者等级购买界面 */
        WarriorProveProcessor.prototype.showBuyLevel = function () {
            var model = this._model;
            if (model.isMaxLevel()) {
                showToast(LanMgr.getLan('', 10457));
                return;
            }
            UIMgr.showUI(UIConst.WarriorBuyLevelView);
        };
        /** 展示勇者进阶解锁界面 */
        WarriorProveProcessor.prototype.showJinjie = function () {
            var model = this._model;
            if (model.isUnlockJinjie()) {
                showToast(LanMgr.getLan('', 10456));
                return;
            }
            UIMgr.showUI(UIConst.WarriorJinjieView);
        };
        /** 领取等级奖励 */
        WarriorProveProcessor.prototype.rewardLevel = function (item) {
            if (!item || !item.dataSource)
                return;
            var info = item.dataSource;
            if (!info.isFinish()) {
                showToast(LanMgr.getLan('', 10459));
                return;
            }
            if (info.isHasRewardCommon() && info.isHasRewardJinjie()) {
                showToast(LanMgr.getLan('', 10460));
                return;
            }
            var model = this._model;
            var isUnlockJinjie = model.isUnlockJinjie();
            // 解锁进阶后，领取奖励需要一次性领取
            if (isUnlockJinjie && info.isCanRewardJinjie()) {
                // 领取进阶奖励时，如果普通奖励未领取会一起领取了
                var args = {};
                args[Protocol.game_task_getWarriorAdvanceAward.args.id] = info.tbData.ID;
                PLC.request(Protocol.game_task_getWarriorAdvanceAward, args, function (data) {
                    if (!data)
                        return;
                    model.updateAwardState(data);
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.REWARD_LEVEL_SUCC));
                    item.refreshView();
                    if (data && data.commonData) {
                        UIUtil.showRewardView(data.commonData);
                    }
                });
            }
            else {
                if (info.isCanRewardCommon()) {
                    var args = {};
                    args[Protocol.game_task_getWarriorLevelAward.args.id] = info.tbData.ID;
                    PLC.request(Protocol.game_task_getWarriorLevelAward, args, function (data) {
                        if (!data)
                            return;
                        model.updateAwardState(data);
                        dispatchEvt(new game.TaskEvent(game.TaskEvent.REWARD_LEVEL_SUCC));
                        item.refreshView();
                        if (data && data.commonData) {
                            UIUtil.showRewardView(data.commonData);
                        }
                    });
                }
                else {
                    // 未解锁进阶
                    if (!isUnlockJinjie) {
                        showToast(LanMgr.getLan('', 10461));
                        this.showJinjie();
                        return;
                    }
                }
            }
        };
        /** 领取试炼任务奖励 */
        WarriorProveProcessor.prototype.rewardTrialTask = function (info) {
            var _this = this;
            if (!info.isFinish()) {
                dispatchEvt(new game.TaskEvent(game.TaskEvent.TRIAL_TASK_GO, info));
                return;
            }
            if (info.isReward()) {
                showToast(LanMgr.getLan('', 10033));
                return;
            }
            var isWeek = info.isWeek;
            if (isWeek) {
                var args = {};
                args[Protocol.game_task_getWarriorWeekReward.args.id] = info.tbData.ID;
                PLC.request(Protocol.game_task_getWarriorWeekReward, args, function (data) {
                    if (!data)
                        return;
                    game.TrialTaskModel.getInstance().modifyReward(data['modifyWarriorWeekReward'], true);
                    var clientAddItemVoList = [];
                    clientAddItemVoList.push(new ItemVo(CostTypeKey.warrior_prove, info.tbData.obtain_exp));
                    UIUtil.showRewardView({ clientAddItemVoList: clientAddItemVoList });
                    _this.updateTaskTabView(game.TaskTabType.trial);
                });
            }
            else {
                var args = {};
                args[Protocol.game_task_getWarriorMonthReward.args.id] = info.tbData.ID;
                PLC.request(Protocol.game_task_getWarriorMonthReward, args, function (data) {
                    if (!data)
                        return;
                    game.TrialTaskModel.getInstance().modifyReward(data['modifyWarriorMonthReward'], false);
                    var clientAddItemVoList = [];
                    clientAddItemVoList.push(new ItemVo(CostTypeKey.warrior_prove, info.tbData.obtain_exp));
                    UIUtil.showRewardView({ clientAddItemVoList: clientAddItemVoList });
                    _this.updateTaskTabView(game.TaskTabType.trial);
                });
            }
        };
        /** 更新界面 */
        WarriorProveProcessor.prototype.updateTaskTabView = function (type) {
            if (!UIMgr.hasStage(UIConst.TaskView))
                return;
            var view = UIMgr.getUIByName(UIConst.TaskView);
            view.onRefreshTask();
        };
        return WarriorProveProcessor;
    }(tl3d.Processor));
    game.WarriorProveProcessor = WarriorProveProcessor;
})(game || (game = {}));
