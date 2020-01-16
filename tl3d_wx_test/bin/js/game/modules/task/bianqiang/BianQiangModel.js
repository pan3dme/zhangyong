var game;
(function (game) {
    var BianQiangModel = /** @class */ (function () {
        function BianQiangModel() {
        }
        BianQiangModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new BianQiangModel();
            }
            return this._instance;
        };
        /** 获取挑战列表 */
        BianQiangModel.prototype.getChallengeTasks = function () {
            if (!this._challengeTasks) {
                this._challengeTasks = [];
                var tb_1 = TableData.getInstance().getTableByName(TableData.tb_task_title).data;
                for (var id in tb_1) {
                    var tb_task_title = tb_1[id];
                    this._challengeTasks.push(new game.ChallengeTabData(tb_task_title.ID));
                }
            }
            return this._challengeTasks;
        };
        /** 过滤全部完成的挑战任务 */
        BianQiangModel.prototype.filterChallengeTask = function () {
            var tasks = this.getChallengeTasks();
            return tasks;
        };
        /** 获取挑战某一个标签数据 */
        BianQiangModel.prototype.getChallengeTabData = function (type) {
            var list = this.getChallengeTasks();
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var task = list_1[_i];
                if (task.tbTitle.ID == type) {
                    return task;
                }
            }
            return null;
        };
        /** 获取挑战分类table数据 */
        BianQiangModel.prototype.getChallengeTabTypeList = function () {
            var list = [];
            var tb = TableData.getInstance().getTableByName(TableData.tb_task_title).data;
            for (var id in tb) {
                list.push(id);
            }
            return list;
        };
        return BianQiangModel;
    }());
    game.BianQiangModel = BianQiangModel;
})(game || (game = {}));
