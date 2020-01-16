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
    /** 挑战章节标题item */
    var ChallengeTitleIR = /** @class */ (function (_super) {
        __extends(ChallengeTitleIR, _super);
        function ChallengeTitleIR() {
            var _this = _super.call(this) || this;
            _this.lbName.autoSize = true;
            return _this;
        }
        Object.defineProperty(ChallengeTitleIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        /** 初始化界面 */
        ChallengeTitleIR.prototype.initView = function () {
            var taskData = this._dataSource;
            if (taskData) {
                this.lbTitle.text = taskData.tbTitle.desc;
                this.pbBar.value = taskData.getCount() / taskData.getAllCount();
                this.lbPercent.text = Math.floor((taskData.getCount() / taskData.getAllCount()) * 100) + "%";
                this.icon.skin = SkinUtil.getTaskIcon(taskData.tbTitle.ID);
                var curTask = taskData.getCurTask();
                if (curTask) {
                    this.lbName.text = curTask.getName();
                    this.lbProgress.x = this.lbName.x + this.lbName.width + 10;
                    this.lbProgress.text = "(" + Snums(curTask.getCount()) + "/" + Snums(curTask.getTotalNum()) + ")";
                    this.rewardList.array = curTask.getRewardList();
                    // 这边只有前往或者领取
                    if (curTask.isFinish()) {
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
                    this.redpoint.visible = curTask.isCanReward();
                    this.lbNotice.visible = false;
                    this.lbName.visible = this.lbProgress.visible = this.rewardList.visible = this.btnOperate.visible = true;
                }
                else {
                    this.rewardList.array = null;
                    this.redpoint.visible = false;
                    this.lbNotice.visible = true;
                    this.pbBar.value = 1;
                    this.lbName.visible = this.lbProgress.visible = this.rewardList.visible = this.btnOperate.visible = false;
                }
                this.btnOperate.on(Laya.Event.CLICK, this, this.onClick);
                this.btnCheck.on(Laya.Event.CLICK, this, this.onCheck);
            }
            else {
                this.rewardList.array = null;
                this.btnOperate.off(Laya.Event.CLICK, this, this.onClick);
                this.btnCheck.off(Laya.Event.CLICK, this, this.onCheck);
            }
        };
        ChallengeTitleIR.prototype.onClick = function () {
            var taskData = this.dataSource.getCurTask();
            if (taskData) {
                if (taskData.isCanReward()) {
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.RECEIVE_TASK_REWARD, taskData));
                }
                else {
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.TASK_GOTO, taskData.tbTask));
                }
            }
        };
        /** 查看 */
        ChallengeTitleIR.prototype.onCheck = function (event) {
            dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_DETAIL_ACHIEVEMENT, this.dataSource));
        };
        return ChallengeTitleIR;
    }(ui.task.bianqiang.ChallengeTitleIRUI));
    game.ChallengeTitleIR = ChallengeTitleIR;
})(game || (game = {}));
