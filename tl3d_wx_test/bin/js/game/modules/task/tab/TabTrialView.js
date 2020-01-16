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
    var TabTrialView = /** @class */ (function (_super) {
        __extends(TabTrialView, _super);
        function TabTrialView() {
            return _super.call(this) || this;
        }
        TabTrialView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.listBtn.selectHandler = new Handler(this, this.onSelectTab);
            this.listBtn.renderHandler = new Handler(this, this.onRenderTab);
            this.listBtn.selectedIndex = -1;
            this.listBtn.array = [0, 1];
            this.btnJiangli.on(Laya.Event.CLICK, this, this.showJinjie);
            this.imgBaoxiang.on(Laya.Event.CLICK, this, this.onLingqu);
        };
        TabTrialView.prototype.close = function () {
            this.animGuang.visible = false;
            this.animGuang.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            Laya.timer.clearAll(this);
            this.listBtn.selectedIndex = -1;
            tl3d.ModuleEventManager.removeEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateBaoxiangState, this);
        };
        TabTrialView.prototype.initView = function () {
            this.listBtn.selectedIndex = 0;
            this.updateBaoxiangState();
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateBaoxiangState, this);
        };
        /** 选择标签页 */
        TabTrialView.prototype.onSelectTab = function (index) {
            if (index == -1)
                return;
            var isWeek = index == 0;
            var model = game.TrialTaskModel.getInstance();
            var dataAry = isWeek ? model.getWeekList(true) : model.getMonthList(true);
            this.listTask.array = dataAry;
            this.listTask.scrollTo(0);
            // 倒计时
            this._endTime = isWeek ? (model.weekEndTime > model.monthEndTime ? model.monthEndTime : model.weekEndTime) : model.monthEndTime;
            Laya.timer.clear(this, this.updateTime);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        };
        /** 渲染tab */
        TabTrialView.prototype.onRenderTab = function (cell, index) {
            var btn = cell.getChildByName("btnTab");
            var redpoint = cell.getChildByName("redpoint");
            var type = cell.dataSource;
            if (!isNaN(type)) {
                redpoint.setRedPointName(type == 0 ? "task_trial_week" : "task_trial_month");
                btn.label = type == 0 ? LanMgr.getLan("", 12144) : LanMgr.getLan("", 12145);
                var selectedIndex = this.listBtn.selectedIndex;
                btn.skin = index == selectedIndex ? SkinUtil.fenye_down : SkinUtil.fenye_up;
                btn.labelSize = selectedIndex == index ? 24 : 22;
                btn.labelColors = selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
                btn.labelBold = true;
            }
            else {
                redpoint.onDispose();
            }
        };
        /** 更新宝箱状态 */
        TabTrialView.prototype.updateBaoxiangState = function () {
            var model = game.WarriorProveModel.getInstance();
            var isUnlock = model.isUnlockJinjie();
            var isReward = model.isRewardWeekGift();
            this.btnJiangli.visible = !isUnlock;
            if (isUnlock && !isReward) {
                this.ani1.play(0, true);
                this.animGuang.visible = true;
                this.animGuang.play(0, true);
            }
            else {
                this.animGuang.visible = false;
                this.animGuang.gotoAndStop(0);
                this.ani1.gotoAndStop(0);
            }
            this.imgBaoxiang.skin = isReward ? SkinUtil.help_bx_open : SkinUtil.help_bx_noopen;
            this.imgBaoxiang.gray = !isUnlock;
        };
        /** 倒计时 */
        TabTrialView.prototype.updateTime = function () {
            var time = this._endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbLastTime.text = GameUtil.getTimeStr2(time);
            }
            else {
                this.lbLastTime.text = LanMgr.getLan("", 12094, 0, 0);
                Laya.timer.clear(this, this.updateTime);
            }
        };
        /** 刷新列表 */
        TabTrialView.prototype.onReresh = function () {
            var isWeek = this.listBtn.selectedIndex == 0;
            var model = game.TrialTaskModel.getInstance();
            var dataAry = isWeek ? model.getWeekList(true) : model.getMonthList(true);
            this.listTask.array = dataAry;
        };
        /** 领取每周积分礼包 */
        TabTrialView.prototype.showJinjie = function () {
            dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_WARRIOR_JINJIE));
        };
        TabTrialView.prototype.onLingqu = function () {
            var _this = this;
            var model = game.WarriorProveModel.getInstance();
            if (!model.isUnlockJinjie()) {
                showToast(LanMgr.getLan('', 10452));
                return;
            }
            if (model.isRewardWeekGift()) {
                showToast(LanMgr.getLan('', 10453));
                return;
            }
            PLC.request(Protocol.game_task_getWarriorAdvanceWeekAward, null, function (data) {
                if (!data)
                    return;
                App.hero.tasks.warriorWeekAward = data['modifyWarriorWeekAward'] || 0;
                _this.updateBaoxiangState();
                var clientAddItemVoList = [];
                clientAddItemVoList.push(new ItemVo(CostTypeKey.warrior_prove, tb.TB_warrior_set.getSet().warrior_gift));
                UIUtil.showRewardView({ clientAddItemVoList: clientAddItemVoList });
                dispatchEvt(new game.TaskEvent(game.TaskEvent.REWARD_WEEK_GIFT_SUCC));
            });
        };
        return TabTrialView;
    }(ui.task.TabTrialUI));
    game.TabTrialView = TabTrialView;
})(game || (game = {}));
