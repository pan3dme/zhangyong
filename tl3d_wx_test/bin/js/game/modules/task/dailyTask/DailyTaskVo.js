/*
 * @Author: HuangGuoYong
 * @Date: 2018-09-29 17:45:40
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-18 18:49:26
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var DailyTaskVo = /** @class */ (function () {
        function DailyTaskVo(vo) {
            this.taskVo = vo;
            this.tbTask = tb.TB_daily.getTaskById(this.taskVo.id);
        }
        /** 排序 可领取 > 正在进行中 > 已领取 相同根据id排序*/
        DailyTaskVo.prototype.getSortNum = function () {
            var num = this.taskVo.id;
            if (this.isReward()) {
                num -= 1000000;
            }
            else if (this.isFinish()) {
                num -= 100000000;
            }
            else {
                num -= 10000000;
            }
            return num;
        };
        DailyTaskVo.prototype.getName = function () {
            return this.tbTask.desc;
        };
        DailyTaskVo.prototype.getTotalNum = function () {
            return this.tbTask.num;
        };
        DailyTaskVo.prototype.getCount = function () {
            return this.taskVo.count > this.tbTask.num ? this.tbTask.num : this.taskVo.count;
        };
        /** 是否开启 */
        DailyTaskVo.prototype.isOpen = function () {
            var sysId = this.tbTask.link[0];
            return App.IsSysOpen(sysId);
        };
        /** 是否进行中 */
        DailyTaskVo.prototype.isExcuting = function () {
            return false;
        };
        //是否完成日任务
        DailyTaskVo.prototype.isFinish = function () {
            return this.taskVo.count >= (this.tbTask ? this.tbTask.num : 1) ? true : false;
        };
        /** 是否已领取 */
        DailyTaskVo.prototype.isReward = function () {
            return this.taskVo.done;
        };
        /** 是否可领取 */
        DailyTaskVo.prototype.isCanReward = function () {
            return this.isFinish() && !this.isReward();
        };
        /** 获取奖励列表 */
        DailyTaskVo.prototype.getRewardList = function () {
            if (!this._rewardList) {
                this._rewardList = [];
                var rewards = this.tbTask.reward;
                for (var i = 0, len = rewards.length; i < len; i++) {
                    this._rewardList.push(App.getCostItemVo(parseInt(rewards[i][0]), parseInt(rewards[i][1])));
                }
            }
            var itemList = __spreadArrays(this._rewardList);
            if (game.WarriorProveModel.getInstance().isOpen() && this.tbTask.obtain_exp > 0) {
                itemList.push(App.getCostItemVo(CostTypeKey.warrior_prove, this.tbTask.obtain_exp));
            }
            return itemList;
        };
        return DailyTaskVo;
    }());
    game.DailyTaskVo = DailyTaskVo;
    /** 日常活跃任务数据 */
    var DailyLivenessData = /** @class */ (function () {
        function DailyLivenessData(tb) {
            this.tbLiveness = tb;
        }
        DailyLivenessData.prototype.getRewardSkin = function () {
            switch (this.getCount()) {
                case 25:
                    return SkinUtil.getTaskBaoxiang(1, this.isReward());
                case 50:
                    return SkinUtil.getTaskBaoxiang(2, this.isReward());
                case 75:
                    return SkinUtil.getTaskBaoxiang(3, this.isReward());
                case 100:
                    return SkinUtil.getTaskBaoxiang(4, this.isReward());
                default:
                    return SkinUtil.getTaskBaoxiang(1, this.isReward());
            }
        };
        /** 是否已领取 */
        DailyLivenessData.prototype.isReward = function () {
            var doneChests = App.hero.tasks.doneChests;
            return doneChests && doneChests.indexOf(this.tbLiveness.ID) != -1;
        };
        /** 是否完成 */
        DailyLivenessData.prototype.isFinish = function () {
            return App.hero.tasks.liveness >= this.tbLiveness.liveness;
        };
        /** 是否可领取 */
        DailyLivenessData.prototype.isCanReward = function () {
            return this.isFinish() && !this.isReward();
        };
        /** 需要的次数 */
        DailyLivenessData.prototype.getCount = function () {
            return this.tbLiveness.liveness;
        };
        DailyLivenessData.prototype.getSkin = function () {
            return "";
        };
        DailyLivenessData.prototype.getRewardList = function () {
            return this.tbLiveness.getRewardList();
        };
        DailyLivenessData.prototype.getEvent = function () {
            return new game.TaskEvent(game.TaskEvent.REWARD_LIVENESS);
        };
        return DailyLivenessData;
    }());
    game.DailyLivenessData = DailyLivenessData;
})(game || (game = {}));
