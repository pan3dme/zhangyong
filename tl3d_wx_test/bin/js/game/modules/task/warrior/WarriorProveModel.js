var game;
(function (game) {
    var WarriorProveModel = /** @class */ (function () {
        function WarriorProveModel() {
            /** 等级列表 -- 注意:不再对该列直接排序，默认等级排序 */
            this._levelList = [];
        }
        WarriorProveModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new WarriorProveModel();
            }
            return this._instance;
        };
        /**每天重置,就不用考虑跨周跨月重置 */
        WarriorProveModel.prototype.resetDataByCrossDay = function (resetData) {
            this.initModel();
            UIMgr.hideUIByName(UIConst.WarriorBuyLevelView);
            UIMgr.hideUIByName(UIConst.WarriorJinjieView);
        };
        WarriorProveModel.prototype.initModel = function () {
            var _this = this;
            var date = new Date(App.serverTime);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            this.curTabCycle = tb.TB_warrior_cycle.getList().find(function (vo) {
                return vo.time == (year * 100 + month);
            });
            // 每天重置一次,不用考虑跨周或者跨月
            for (var _i = 0, _a = this._levelList; _i < _a.length; _i++) {
                var vo = _a[_i];
                vo.clear();
                Laya.Pool.recover("WarriorProveVo", vo);
            }
            this._levelList.length = 0;
            this.maxLevel = 0;
            this.startTime = 0;
            this.endTime = 0;
            if (this.curTabCycle) {
                var year_1 = Math.floor(this.curTabCycle.time / 100);
                var month_1 = this.curTabCycle.time % 100;
                // 当月1号0点
                var startDate = new Date(year_1, month_1 - 1, 1, 0, 0, 0, 0);
                this.startTime = startDate.getTime() / 1000;
                // 下月1号0点
                var endDate = new Date(year_1, month_1, 1, 0, 0, 0, 0);
                this.endTime = endDate.getTime() / 1000;
                // 获取当前期数的勇者之证列表
                var curCycle_1 = this.curTabCycle.ID;
                var tbList = tb.TB_warrior_prove.getList().filter(function (tbVo) {
                    return tbVo.cycle == curCycle_1;
                });
                tbList.sort(function (a, b) {
                    return a.level - b.level;
                });
                // 最高级别
                tbList.forEach(function (tbVo) {
                    if (tbVo.level > _this.maxLevel) {
                        _this.maxLevel = tbVo.level;
                    }
                });
                var cycleList = tb.TB_warrior_cycle.getList();
                for (var i = 0; i < tbList.length; i++) {
                    var team = Laya.Pool.getItemByClass("WarriorProveVo", game.WarriorProveVo);
                    team.setTbData(tbList[i]);
                    this._levelList.push(team);
                }
            }
            game.TrialTaskModel.getInstance().initModel();
        };
        /** 更新领取状态 */
        WarriorProveModel.prototype.updateAwardState = function (data) {
            if (data.hasOwnProperty("modifyWarriorLevelAward")) {
                App.hero.tasks.warriorLevelAwards.push(data['modifyWarriorLevelAward']);
            }
            if (data.hasOwnProperty("modifyWarriorAdvanceAward")) {
                App.hero.tasks.warriorAdvanceAwards.push(data['modifyWarriorAdvanceAward']);
            }
        };
        /** 勇者之证是否开启 开服七天*/
        WarriorProveModel.prototype.isOpen = function () {
            if (!game.HudModel.isHudShow(ModuleConst.WARRIOR_PROVE)) {
                return false;
            }
            return App.IsSysOpen(ModuleConst.WARRIOR_PROVE) && this.isInCycle() && App.serverTimeSecond >= (App.getOpenServerTime() + 7 * TimeConst.ONE_DAY_SEC);
        };
        /** 是否在赛季中 */
        WarriorProveModel.prototype.isInCycle = function () {
            return this.curTabCycle ? true : false;
        };
        /** 获取勇者之证列表 */
        WarriorProveModel.prototype.getWarriorList = function () {
            return this._levelList;
        };
        /** 获取勇者对象 */
        WarriorProveModel.prototype.getWarriorVoByLv = function (lv) {
            return this._levelList.find(function (vo) {
                return vo.tbData.level == lv;
            });
        };
        /** 获取活动时间 */
        WarriorProveModel.prototype.getTimeStr = function () {
            if (!this.curTabCycle)
                return "";
            var startDate = new Date(this.startTime * 1000);
            var endDate = new Date(this.endTime * 1000 - 1);
            var month = startDate.getMonth() + 1;
            return LanMgr.getLan("", 12135, month, startDate.getDate(), month, endDate.getDate());
        };
        /** 获取当前等级数据:为空表示0级 */
        WarriorProveModel.prototype.getCurTbLevel = function () {
            var lv = App.hero.tasks.warriorLevel;
            return lv > 0 ? this._levelList.find(function (vo) {
                return vo.tbData.level == lv;
            }) : null;
        };
        /** 是否可领取 -- 勇者之证 */
        WarriorProveModel.prototype.isCanReward = function () {
            if (!this.isOpen())
                return false;
            return this._levelList.some(function (vo) {
                return vo.isCanReward();
            });
        };
        /** 是否可领取每周礼包 */
        WarriorProveModel.prototype.isCanRewardGift = function () {
            if (!this.isOpen())
                return false;
            return this.isUnlockJinjie() && !this.isRewardWeekGift();
        };
        /** 是否已经最高等级 */
        WarriorProveModel.prototype.isMaxLevel = function () {
            return App.hero.tasks.warriorLevel >= this.maxLevel;
        };
        /** 是否解锁进阶 */
        WarriorProveModel.prototype.isUnlockJinjie = function () {
            return App.hero.tasks.warriorAdvance == 1;
        };
        /** 是否领取了某等级的普通奖励 */
        WarriorProveModel.prototype.isRewardCommon = function (level) {
            return App.hero.tasks.warriorLevelAwards.indexOf(level) != -1;
        };
        /** 是否领取了某等级的进阶奖励 */
        WarriorProveModel.prototype.isRewardJinjie = function (level) {
            return App.hero.tasks.warriorAdvanceAwards.indexOf(level) != -1;
        };
        /** 是否领取了每周积分礼包 */
        WarriorProveModel.prototype.isRewardWeekGift = function () {
            return App.hero.tasks.warriorWeekAward == 1;
        };
        return WarriorProveModel;
    }());
    game.WarriorProveModel = WarriorProveModel;
})(game || (game = {}));
