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
    var TabAchievementView = /** @class */ (function (_super) {
        __extends(TabAchievementView, _super);
        function TabAchievementView() {
            return _super.call(this) || this;
        }
        TabAchievementView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.honorList.array = null;
        };
        TabAchievementView.prototype.close = function () {
            this.honorList.array = null;
        };
        TabAchievementView.prototype.initView = function () {
            this.honorList.array = game.TaskModel.getInstance().getHonorTasks();
        };
        /** 任务数据更新 */
        TabAchievementView.prototype.onReresh = function () {
            this.honorList.array = game.TaskModel.getInstance().getHonorTasks();
        };
        return TabAchievementView;
    }(ui.task.TabAchievementUI));
    game.TabAchievementView = TabAchievementView;
})(game || (game = {}));
