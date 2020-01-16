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
    var TabWarriorView = /** @class */ (function (_super) {
        __extends(TabWarriorView, _super);
        function TabWarriorView() {
            return _super.call(this) || this;
        }
        TabWarriorView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.WarriorProveModel.getInstance();
            this.btnBuy.on(Laya.Event.CLICK, this, this.onBuy);
            this.btnUnlock.on(Laya.Event.CLICK, this, this.onUnlock);
            this.listTask.array = null;
        };
        TabWarriorView.prototype.close = function () {
            this.listTask.array = null;
            Laya.timer.clearAll(this);
            tl3d.ModuleEventManager.removeEvent(game.TaskEvent.UPDATE_WARRIOR_EXP, this.initView, this);
            tl3d.ModuleEventManager.removeEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.initView, this);
        };
        TabWarriorView.prototype.initView = function () {
            var model = this._model;
            this.lbLevel.text = App.hero.tasks.warriorLevel + "";
            if (App.hero.tasks.warriorLevel > 0) {
                var curTbLv = model.getWarriorVoByLv(App.hero.tasks.warriorLevel);
                this.pgExp.value = App.hero.tasks.warriorExp / curTbLv.tbData.exp;
                this.lbExp.text = App.hero.tasks.warriorExp + "/" + curTbLv.tbData.exp;
            }
            else {
                var nextTbLv = model.getWarriorVoByLv(1);
                this.lbLevel.text = "0";
                this.pgExp.value = 0;
                this.lbExp.text = "0/" + nextTbLv.tbData.total_exp;
            }
            this.lbTime.text = model.getTimeStr();
            var isUnlock = model.isUnlockJinjie();
            this.btnUnlock.label = isUnlock ? LanMgr.getLan("", 12142) : LanMgr.getLan("", 12143);
            this.btnUnlock.visible = !isUnlock;
            this.imgSuo.visible = !isUnlock;
            // 按照等级低到高
            var lvList = model.getWarriorList();
            this.listTask.array = lvList;
            // 默认位置 首先默认选择最低可领取在第一个
            var index = lvList.findIndex(function (vo) {
                return vo.isCanReward();
            });
            if (index == -1) {
                // 否则，默认位置在第一个未完成的;全部领取完，显示在最底下即可
                index = lvList.findIndex(function (vo) {
                    return !vo.isFinish();
                });
                index = index == -1 ? lvList.length - 1 : index;
            }
            this.listTask.scrollTo(index);
            // Laya.timer.frameOnce(1,this,()=>{
            //     this.listTask.scrollTo(index);
            // });
            this._endTime = model.endTime;
            Laya.timer.clear(this, this.updateTime);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_WARRIOR_EXP, this.initView, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.initView, this);
        };
        /** 倒计时 */
        TabWarriorView.prototype.updateTime = function () {
            var time = this._endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbLastTime.text = GameUtil.getTimeStr2(time);
            }
            else {
                this.lbLastTime.text = LanMgr.getLan("", 12094, 0, 0);
                Laya.timer.clear(this, this.updateTime);
            }
        };
        TabWarriorView.prototype.onReresh = function () {
        };
        /** 购买等级 */
        TabWarriorView.prototype.onBuy = function () {
            dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_WARRIOR_BUY_LEVEL));
        };
        /** 进阶解锁 */
        TabWarriorView.prototype.onUnlock = function () {
            dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_WARRIOR_JINJIE));
        };
        return TabWarriorView;
    }(ui.task.TabWarriorUI));
    game.TabWarriorView = TabWarriorView;
})(game || (game = {}));
