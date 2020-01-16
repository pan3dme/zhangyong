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
    var TaskIR = /** @class */ (function (_super) {
        __extends(TaskIR, _super);
        function TaskIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TaskIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        TaskIR.prototype.refreshView = function () {
            var taskData = this._dataSource;
            if (taskData) {
                this.lbTitle.text = taskData.getName();
                this.lbTitle.event(Laya.Event.RESIZE);
                this.lbProgress.text = "(" + Snums(taskData.getCount()) + "/" + Snums(taskData.getTotalNum()) + ")";
                this.lbNotice.visible = this.imgFinish.visible = this.lbDailyLvs.visible = false;
                this.btnOperate.visible = true;
                if (taskData instanceof game.TaskVo && taskData.tbTask.type == iface.tb_prop.taskTypeKey.achievement && taskData.tbTask.label == AchievementTabType.challenge) {
                    // 挑战子任务（前置条件未完成显示完成上个任务）
                    this.btnOperate.visible = false;
                    if (taskData.isReward()) {
                        this.imgFinish.visible = true;
                    }
                    else {
                        this.lbNotice.visible = true;
                        this.lbNotice.text = (taskData.isExcuting() ? LanMgr.getLan("", 12147) : LanMgr.getLan("", 12148));
                        this.lbNotice.color = taskData.isExcuting() ? ColorConst.TASK_GREEN : ColorConst.TASK_ORANGE;
                    }
                }
                else if (taskData instanceof game.DailyTaskVo) {
                    this.lbDailyLvs.visible = true;
                    this.lbDailyLvs.text = taskData.tbTask.liveness > 0 ? LanMgr.getLan("", 12146, taskData.tbTask.liveness) : "";
                }
                if (taskData.isReward()) {
                    this.btnOperate.label = LanMgr.getLan('', 10043);
                    this.btnOperate.skin = SkinUtil.buttonNormal;
                    this.btnOperate.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    this.btnOperate.disabled = true;
                    this.lbProgress.color = ColorConst.FATE_GOLD;
                }
                else {
                    this.btnOperate.disabled = false;
                    if (taskData.isFinish()) {
                        this.btnOperate.label = LanMgr.getLan('', 10041);
                        this.btnOperate.skin = SkinUtil.buttonGreen;
                        this.btnOperate.labelStrokeColor = ColorConst.GREEN_FILTER;
                        this.lbProgress.color = ColorConst.GREEN;
                    }
                    else {
                        this.btnOperate.label = LanMgr.getLan('', 10042);
                        this.btnOperate.skin = SkinUtil.buttonNormal;
                        this.btnOperate.labelStrokeColor = ColorConst.ORANGE_FILTER;
                        this.lbProgress.color = ColorConst.RED;
                    }
                }
                var list = taskData.getRewardList();
                ;
                this.rewardList.array = list;
                this.rewardList.width = list.length * 120 + (list.length - 1) * this.rewardList.spaceX;
                this.lbDailyLvs.x = this.rewardList.x + this.rewardList.width;
                this.btnOperate.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.rewardList.array = null;
                this.btnOperate.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        TaskIR.prototype.onClick = function () {
            var taskData = this._dataSource;
            if (taskData instanceof game.TaskVo) {
                if (taskData.isCanReward()) {
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.RECEIVE_TASK_REWARD, this.dataSource));
                }
                else {
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.TASK_GOTO, taskData.tbTask));
                }
            }
            else if (taskData instanceof game.DailyTaskVo) {
                dispatchEvt(new game.TaskEvent(game.TaskEvent.CLICK_DAILY_TASK, this.dataSource));
            }
        };
        return TaskIR;
    }(ui.task.itemrender.TaskIRUI));
    game.TaskIR = TaskIR;
})(game || (game = {}));
