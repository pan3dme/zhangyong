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
    var TabDailyTaskView = /** @class */ (function (_super) {
        __extends(TabDailyTaskView, _super);
        function TabDailyTaskView() {
            var _this = _super.call(this) || this;
            _this._model = game.TaskModel.getInstance();
            return _this;
        }
        TabDailyTaskView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.TaskModel.getInstance();
            this._boxItems = [];
            var boxAry = this._model.getLivenessList();
            var len = boxAry.length;
            for (var i = 0; i < len; i++) {
                var box = new game.TaskBaoxiangIR();
                box.dataSource = boxAry[i];
                box.x = (this.boxLiveness.width / len) * (i + 1) - 43;
                if (i != len - 1) {
                    box.x += 10;
                }
                box.y -= 50;
                this.boxLiveness.addChild(box);
                this._boxItems.push(box);
            }
        };
        TabDailyTaskView.prototype.close = function () {
            for (var _i = 0, _a = this._boxItems; _i < _a.length; _i++) {
                var box = _a[_i];
                box.dataSource = null;
            }
            this.taskList.array = null;
            Laya.timer.clearAll(this);
        };
        TabDailyTaskView.prototype.initView = function () {
            var taskObj = App.hero.tasks;
            this.lbLiveness.text = taskObj.liveness.toString();
            this.progressBar.value = taskObj.liveness / 100;
            var boxAry = this._model.getLivenessList();
            for (var i = 0; i < boxAry.length; i++) {
                var box = this._boxItems[i];
                box.dataSource = boxAry[i];
            }
            this.taskList.array = this._model.getViewList();
            Laya.timer.loop(3000, this, this.startAnim);
        };
        TabDailyTaskView.prototype.startAnim = function () {
            for (var _i = 0, _a = this._boxItems; _i < _a.length; _i++) {
                var box = _a[_i];
                box.startAni();
            }
        };
        /** 刷新列表 -- 顺序改变 */
        TabDailyTaskView.prototype.refreshTaskList = function () {
            var taskObj = App.hero.tasks;
            this.lbLiveness.text = taskObj.liveness.toString();
            this.progressBar.value = taskObj.liveness / 100;
            this.taskList.array = this._model.getViewList();
            this.taskList.refresh();
            this.refreshLiveness();
        };
        /** 刷新活跃度数据 */
        TabDailyTaskView.prototype.refreshLiveness = function () {
            for (var _i = 0, _a = this._boxItems; _i < _a.length; _i++) {
                var box = _a[_i];
                box.refreshView();
            }
        };
        /** 任务数据更新 */
        TabDailyTaskView.prototype.onReresh = function () {
            this.taskList.refresh();
        };
        return TabDailyTaskView;
    }(ui.task.TabDailyUI));
    game.TabDailyTaskView = TabDailyTaskView;
})(game || (game = {}));
