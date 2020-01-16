var game;
(function (game) {
    /** 任务 */
    var TaskVo = /** @class */ (function () {
        function TaskVo(taskId) {
            this.taskId = taskId;
            this.tbTask = tb.TB_task.getTaskById(taskId);
            this.getTaskVo();
        }
        TaskVo.prototype.getTaskVo = function () {
            if (!this._taskVo) {
                this._taskVo = game.TaskModel.getInstance().getTaskVoById(this.taskId);
            }
            return this._taskVo;
        };
        /** 排序 可领取 > 正在进行中 > 已领取 相同根据id排序*/
        TaskVo.prototype.getSortNum = function () {
            var num = this.tbTask.label == AchievementTabType.challenge ? this.tbTask.rank : this.tbTask.ID;
            if (this.isCanReward()) {
                num += 100000;
            }
            else if (this.isReward()) {
                num += 100000000;
            }
            else {
                num += 10000000;
            }
            return num;
        };
        TaskVo.prototype.getName = function () {
            return this.tbTask.name;
        };
        TaskVo.prototype.getTotalNum = function () {
            return this.tbTask.check_num;
        };
        /** 是否完成日任务 */
        TaskVo.prototype.isFinish = function () {
            if (this.isReward())
                return true;
            return this.getCount() >= this.tbTask.check_num ? true : false;
        };
        /** 完成次数 -- 已领取的任务取任务所需次数 */
        TaskVo.prototype.getCount = function () {
            if (this.isReward())
                return this.tbTask.check_num;
            var count = 0;
            if (this.getTaskVo()) {
                count = this._taskVo.count > this.tbTask.check_num ? this.tbTask.check_num : this._taskVo.count;
            }
            count = count < 0 ? 0 : count;
            return count;
        };
        /** 是否已领取 */
        TaskVo.prototype.isReward = function () {
            return App.hero.tasks.doneTasks.indexOf(this.taskId) != -1;
        };
        /** 是否可领取 */
        TaskVo.prototype.isCanReward = function () {
            return this.isFinish() && !this.isReward();
        };
        /** 是否进行中 */
        TaskVo.prototype.isExcuting = function () {
            if (this.tbTask.label == AchievementTabType.challenge) {
                var tabData = game.BianQiangModel.getInstance().getChallengeTabData(this.tbTask.sub_label);
                var curTask = tabData.getCurTask();
                return curTask && curTask.tbTask.ID == this.tbTask.ID;
            }
            return false;
        };
        TaskVo.prototype.getRewardList = function () {
            if (!this._rewardList) {
                this._rewardList = [];
                var rewards_1 = this.tbTask.reward;
                var _loop_1 = function (i, len) {
                    var itemVo = {
                        getQulity: function () { return ""; },
                        getIconUrl: function () { return SkinUtil.getCostSkin(parseInt(rewards_1[i][0])); },
                        getNum: function () { return parseInt(rewards_1[i][1]); },
                        getShow: function () { return false; },
                        getConstNum: function () { return 0; },
                        isStartAction: function () { return false; },
                        isChip: function () { return false; },
                        showRace: function () { return 0; },
                        getStar: function () { return 0; },
                        isMoreThanSix: function () { return false; },
                        getExtParm: function () { return null; },
                    };
                    this_1._rewardList.push(itemVo);
                };
                var this_1 = this;
                for (var i = 0, len = rewards_1.length; i < len; i++) {
                    _loop_1(i, len);
                }
            }
            return this._rewardList;
        };
        TaskVo.prototype.getItemList = function () {
            if (!this._itemList) {
                this._itemList = [];
                var rewards = this.tbTask.reward;
                for (var i = 0, len = rewards.length; i < len; i++) {
                    var item = new ItemVo(parseInt(rewards[i][0]), parseInt(rewards[i][1]));
                    // item.isShowEff = i < this.tbTask.label;
                    item.isShowEff = false;
                    this._itemList.push(item);
                }
            }
            return this._itemList;
        };
        return TaskVo;
    }());
    game.TaskVo = TaskVo;
    /** 挑战章节数据 */
    var ChallengeTabData = /** @class */ (function () {
        function ChallengeTabData(type) {
            this.subLbType = type;
            this.tbTitle = tb.TB_task_title.getCfgById(type);
        }
        ChallengeTabData.prototype.getList = function () {
            if (!this._list) {
                this._list = [];
                var tbArr = tb.TB_task.getAchievementListByType(AchievementTabType.challenge, this.subLbType);
                for (var i = 0, len = tbArr.length; i < len; i++) {
                    var tbTask = tbArr[i];
                    var data = new TaskVo(tbTask.ID);
                    this._list.push(data);
                }
            }
            this.sortList();
            return this._list;
        };
        ChallengeTabData.prototype.sortList = function () {
            if (!this._list)
                return;
            this._list.sort(function (a, b) {
                return a.getSortNum() - b.getSortNum();
            });
        };
        ChallengeTabData.prototype.getTaskById = function (taskId) {
            return this.getList().find(function (vo) {
                return vo.taskId == taskId;
            });
        };
        ChallengeTabData.prototype.getTaskByIdx = function (index) {
            return this.getList()[index];
        };
        /** 已领取数量 */
        ChallengeTabData.prototype.getCount = function () {
            var list = this.getList();
            var num = 0;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var data = list_1[_i];
                if (data.isReward()) {
                    num++;
                }
            }
            return num;
        };
        /** 子任务数量 */
        ChallengeTabData.prototype.getAllCount = function () {
            return this.getList().length;
        };
        /** 获取当前正在进行的任务 */
        ChallengeTabData.prototype.getCurTask = function () {
            var list = this.getList();
            for (var i = 0, len = list.length; i < len; i++) {
                var achieData = list[i];
                if (!achieData.isReward()) {
                    return achieData;
                }
            }
            return null;
        };
        /** 是否可领取奖励 */
        ChallengeTabData.prototype.canReward = function () {
            return this.getList().some(function (task) {
                return task.isCanReward();
            });
        };
        /** 是否全部完成 */
        ChallengeTabData.prototype.isAllFinish = function () {
            return this.getCurTask() ? false : true;
        };
        return ChallengeTabData;
    }());
    game.ChallengeTabData = ChallengeTabData;
})(game || (game = {}));
