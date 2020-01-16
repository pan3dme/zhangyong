var game;
(function (game) {
    var GuanqiaVo = /** @class */ (function () {
        function GuanqiaVo(cp, isBoss) {
            if (isBoss === void 0) { isBoss = false; }
            this.isBoss = false;
            this._openLv = 0; // 开放等级
            this._prevId = 0; // 上一关卡id
            this.tbCopyInfo = cp;
            this.isBoss = isBoss;
            this.tbCopy = tb.TB_copy.get_TB_copyById(cp.area);
            this._prevId = this.tbCopyInfo.getConditionVal(CopyConditionType.id);
            this._openLv = this.tbCopyInfo.getConditionVal(CopyConditionType.level);
        }
        /** 获取开放等级 */
        GuanqiaVo.prototype.getOpenLevel = function () {
            return this._openLv;
        };
        /** 获取上一关卡id */
        GuanqiaVo.prototype.getPrevId = function () {
            return this._prevId;
        };
        /** 是否通过 */
        GuanqiaVo.prototype.isPass = function () {
            var modelVo = game.TowerModel.getInstance().getGuanqiaModelVo(this.tbCopy.sub_type);
            var cur = modelVo.curGuanqia;
            return modelVo.isAllFinish() ? true : this.tbCopyInfo.area_number < cur.tbCopyInfo.area_number;
        };
        /** 是否当前关卡 */
        GuanqiaVo.prototype.isCurrent = function () {
            var cur = game.TowerModel.getInstance().getGuanqiaModelVo(this.tbCopy.sub_type).curGuanqia;
            return cur.tbCopyInfo.ID == this.tbCopyInfo.ID;
        };
        /** 获取怪物头像 */
        GuanqiaVo.prototype.getMonsterList = function () {
            return this.tbCopyInfo.getMonsters();
        };
        /** 是否已领取奖励  先判断是否boss关卡，再判断是否领取 */
        GuanqiaVo.prototype.isReward = function () {
            var curRewardId = App.hero.towerAwardInfo[this.tbCopy.sub_type];
            if (!curRewardId)
                return false;
            // 试炼塔是有序的,可以直接用id的大小去判断
            return this.isBoss ? (this.tbCopyInfo.ID <= curRewardId) : false;
        };
        /** 是否可领取 */
        GuanqiaVo.prototype.isCanReward = function () {
            return this.isBoss && this.isPass() && !this.isReward();
        };
        return GuanqiaVo;
    }());
    game.GuanqiaVo = GuanqiaVo;
})(game || (game = {}));
