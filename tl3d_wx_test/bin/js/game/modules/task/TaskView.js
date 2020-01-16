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
    var TaskView = /** @class */ (function (_super) {
        __extends(TaskView, _super);
        function TaskView() {
            var _this = _super.call(this) || this;
            _this._openState = false;
            return _this;
        }
        TaskView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.TaskView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12130) };
            this._model = game.TaskModel.getInstance();
            this.addChild(this.bgPanel.btnClose);
            this.listBtns.renderHandler = new Laya.Handler(this, this.onRenderTab);
            this.listBtns.selectedIndex = -1;
        };
        /** 初始化tab */
        TaskView.prototype.initTaskTabBtns = function () {
            var isOpen = game.WarriorProveModel.getInstance().isOpen();
            // 没初始化或者 未开启变为开启
            if (!this._tabOperate || this._openState != isOpen) {
                this._openState = isOpen;
                var tabTypes = isOpen ? [game.TaskTabType.daily, game.TaskTabType.warrior, game.TaskTabType.trial, game.TaskTabType.achievement] : [game.TaskTabType.daily, game.TaskTabType.achievement];
                this.listBtns.array = this._model.getTabListVo(tabTypes);
                this._tabInfoList = [];
                for (var i = 0; i < tabTypes.length; i++) {
                    this._tabInfoList.push(this.buildTabInfo(tabTypes[i]));
                }
                if (!this._tabOperate) {
                    this._tabOperate = new common.TabListOperate(this.listBtns, this.boxContent);
                }
                this._tabOperate.setTabItemist(this._tabInfoList);
            }
        };
        TaskView.prototype.buildTabInfo = function (type) {
            var model = this._model;
            var viewData = model.getTabViewDatas(type);
            return {
                viewName: viewData.viewName,
                viewClz: viewData.viewClz,
                onSelectVerify: function () {
                    if ((type == game.TaskTabType.warrior || type == game.TaskTabType.trial) && !game.WarriorProveModel.getInstance().curTabCycle) {
                        showToast(LanMgr.getLan('', 10454));
                        return false;
                    }
                    return true;
                },
                onSelectAfter: function () {
                },
                onShow: function (view) {
                    if (view && GameUtil.isFunction(view['initView'])) {
                        view['initView']();
                    }
                },
                onHide: function (view) {
                    // 切换界面,界面隐藏
                    if (view && GameUtil.isFunction(view['close'])) {
                        view['close']();
                    }
                },
                onClosed: function (view) {
                    // 界面释放
                    if (view && GameUtil.isFunction(view['close'])) {
                        view['close']();
                    }
                },
                dataSource: null
            };
        };
        TaskView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TaskView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        TaskView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._tabOperate.viewDispose();
            tl3d.ModuleEventManager.removeEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.onRefreshTask, this);
            tl3d.ModuleEventManager.removeEvent(game.TaskEvent.UPDATE_DAILY_TASK, this.onRefreshTask, this);
        };
        /** 初始化界面 */
        TaskView.prototype.initView = function () {
            this.initTaskTabBtns();
            var index = this.dataSource || 0;
            if (index >= this._tabOperate.getViewNum()) {
                index = 0;
            }
            this.listBtns.selectedIndex = index;
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.onRefreshTask, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_DAILY_TASK, this.onRefreshTask, this);
        };
        TaskView.prototype.onSelectTab = function (index) {
            this.listBtns.selectedIndex = index;
        };
        /** 渲染标签 */
        TaskView.prototype.onRenderTab = function (cell, index) {
            if (!cell)
                return;
            var btnTab = cell.getChildByName("btnTab");
            var redpoint = cell.getChildByName("redpoint");
            var info = this.listBtns.getItem(index);
            // [type,name,redpoint]
            if (info) {
                redpoint.setRedPointName(info[2]);
                btnTab.label = info[1];
                btnTab.selected = this.listBtns.selectedIndex == index;
            }
            else {
                redpoint.onDispose();
            }
        };
        /** 刷新列表 -- 顺序改变 */
        TaskView.prototype.refreshTaskList = function () {
            var index = this.listBtns.selectedIndex;
            if (index == game.TaskTabType.daily) {
                var view = this.tabDaily;
                view && view.refreshTaskList();
            }
        };
        TaskView.prototype.refreshLiveness = function () {
            var index = this.listBtns.selectedIndex;
            if (index == game.TaskTabType.daily) {
                var view = this.tabDaily;
                view && view.refreshLiveness();
            }
        };
        /** 任务数据更新 */
        TaskView.prototype.onRefreshTask = function () {
            var name = this._tabOperate ? this._tabOperate.getSelectedName() : "";
            if (name == game.TaskModel.tabDaily) {
                var view = this.tabDaily;
                view && view.onReresh();
            }
            else if (name == game.TaskModel.tabWarrior) {
                var view = this.tabWarrior;
                view && view.onReresh();
            }
            else if (name == game.TaskModel.tabTrial) {
                var view = this.tabTrial;
                view && view.onReresh();
            }
            else if (name == game.TaskModel.tabAchievement) {
                var view = this.tabAchievement;
                view && view.onReresh();
            }
        };
        Object.defineProperty(TaskView.prototype, "tabDaily", {
            get: function () {
                return this._tabOperate ? this._tabOperate.getViewByName(game.TaskModel.tabDaily) : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskView.prototype, "tabWarrior", {
            get: function () {
                return this._tabOperate ? this._tabOperate.getViewByName(game.TaskModel.tabWarrior) : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskView.prototype, "tabTrial", {
            get: function () {
                return this._tabOperate ? this._tabOperate.getViewByName(game.TaskModel.tabTrial) : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskView.prototype, "tabAchievement", {
            get: function () {
                return this._tabOperate ? this._tabOperate.getViewByName(game.TaskModel.tabAchievement) : null;
            },
            enumerable: true,
            configurable: true
        });
        return TaskView;
    }(ui.task.TaskUI));
    game.TaskView = TaskView;
})(game || (game = {}));
