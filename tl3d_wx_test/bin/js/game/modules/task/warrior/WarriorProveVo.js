var game;
(function (game) {
    /** 勇者之证 */
    var WarriorProveVo = /** @class */ (function () {
        function WarriorProveVo() {
        }
        WarriorProveVo.prototype.setTbData = function (tbData) {
            this.tbData = tbData;
        };
        /** 清理 */
        WarriorProveVo.prototype.clear = function () {
            this.tbData = null;
        };
        /** 是否已完成 */
        WarriorProveVo.prototype.isFinish = function () {
            return App.hero.tasks.warriorLevel >= this.tbData.level;
        };
        /** 是否已领取普通奖励 */
        WarriorProveVo.prototype.isHasRewardCommon = function () {
            return game.WarriorProveModel.getInstance().isRewardCommon(this.tbData.ID);
        };
        /** 是否可领取普通奖励 */
        WarriorProveVo.prototype.isCanRewardCommon = function () {
            return this.isFinish() && this.tbData.getRewardItems().length > 0 && !this.isHasRewardCommon();
        };
        /** 是否已领取进阶奖励 */
        WarriorProveVo.prototype.isHasRewardJinjie = function () {
            return game.WarriorProveModel.getInstance().isRewardJinjie(this.tbData.ID);
        };
        /** 是否可领取进阶奖励 */
        WarriorProveVo.prototype.isCanRewardJinjie = function () {
            return this.isFinish() && game.WarriorProveModel.getInstance().isUnlockJinjie() && this.tbData.getSpecialItems().length > 0 && !this.isHasRewardJinjie();
        };
        /** 是否可领取 */
        WarriorProveVo.prototype.isCanReward = function () {
            return this.isCanRewardCommon() || this.isCanRewardJinjie();
        };
        return WarriorProveVo;
    }());
    game.WarriorProveVo = WarriorProveVo;
})(game || (game = {}));
