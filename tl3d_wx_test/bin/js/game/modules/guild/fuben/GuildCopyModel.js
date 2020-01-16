var game;
(function (game) {
    var GuildCopyModel = /** @class */ (function () {
        function GuildCopyModel() {
            // -------- 关卡 --------
            /** 章节列表 */
            // private _chapterList : GuildCopyChapterVo[] = [];
            /** 关卡id列表 */
            this._guanqiaIds = [];
            this._guanqias = [];
            // -------- 通关奖励 --------
            this.hasNewAward = false;
            this._rewardList = [];
        }
        GuildCopyModel.getInstance = function () {
            if (!GuildCopyModel._instance) {
                GuildCopyModel._instance = new GuildCopyModel();
            }
            return GuildCopyModel._instance;
        };
        GuildCopyModel.prototype.initModel = function () {
            this._guanqiaIds = [];
            this._guanqias = [];
            var copyList = tb.TB_guild_copy.getList();
            for (var i = 0, len = copyList.length; i < len; i++) {
                var vo = new game.GuildGuanqiaVo(copyList[i], i);
                this._guanqias.push(vo);
                this._guanqiaIds.push(copyList[i].ID);
            }
            this._guanqias.sort(function (a, b) {
                return a.tbCopy.ID - b.tbCopy.ID;
            });
            this._guanqiaIds.sort(function (a, b) {
                return a - b;
            });
            this._rewardList = [];
            var tbReward = TableData.getInstance().getTableByName(TableData.tb_copy_reward).data;
            for (var key in tbReward) {
                this._rewardList.push(new game.GuildRewardVo(tbReward[key]));
            }
            this._rewardList.sort(function (a, b) {
                return a.tbReward.ID - b.tbReward.ID;
            });
            this.copyChallengeVo = new game.GuildChallengeVo();
        };
        GuildCopyModel.prototype.getCopyList = function () {
            return this._guanqias;
        };
        /** 获取当前副本ID */
        GuildCopyModel.prototype.getCurCopyId = function () {
            var guildInfo = game.GuildModel.getInstance().guildInfo;
            return guildInfo ? guildInfo.copyId : 0;
        };
        /** 获取当前界面副本列表的开始索引 */
        GuildCopyModel.prototype.getCurCopyIdx = function () {
            var copyId = this.getCurCopyId();
            var startIdx = 0;
            var list = this._guanqias;
            var len = list.length;
            // 是否打过副本
            if (copyId > 0) {
                if (this.isAllFinish()) {
                    startIdx = len - 3;
                }
                else {
                    var index = list.findIndex(function (item) {
                        return item.tbCopy.ID == copyId;
                    });
                    // 是否最后三关
                    if (index >= len - 3) {
                        startIdx = len - 3;
                    }
                    else {
                        startIdx = index;
                    }
                }
            }
            return startIdx;
        };
        /** 获取关卡id列表 */
        GuildCopyModel.prototype.getGuanqiaIds = function () {
            return this._guanqiaIds;
        };
        GuildCopyModel.prototype.getGuanqiaById = function (id) {
            return this._guanqias.find(function (vo) {
                return vo.tbCopy.ID == id;
            });
        };
        /** 是否全部通关 */
        GuildCopyModel.prototype.isAllFinish = function () {
            var lastCopyId = this._guanqiaIds[this._guanqiaIds.length - 1];
            return this.getCurCopyId() == lastCopyId;
        };
        /** 是否可以挑战 */
        GuildCopyModel.prototype.isCanChallenge = function () {
            return game.GuildModel.getInstance().isHasGuild() && App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) > 0 && !this.isAllFinish();
        };
        /** 是否通关 */
        GuildCopyModel.prototype.isPass = function (copyId) {
            var guildInfo = game.GuildModel.getInstance().guildInfo;
            return guildInfo && guildInfo.copyId >= copyId;
        };
        GuildCopyModel.prototype.updateNewAward = function (flag) {
            this.hasNewAward = flag;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_JIANGLI_INFO));
        };
        GuildCopyModel.prototype.getRewardList = function () {
            return this._rewardList;
        };
        /** 设置领取数量 */
        GuildCopyModel.prototype.setAwardCount = function (awardCount) {
            if (!awardCount)
                return;
            for (var id in awardCount) {
                var vo = this.getRewardById(Number(id));
                vo.awardCount = awardCount[id];
            }
            this.hasNewAward = false;
            this._rewardList.sort(function (a, b) {
                return a.getSortNum() - b.getSortNum();
            });
            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_JIANGLI_INFO));
        };
        GuildCopyModel.prototype.getRewardById = function (id) {
            return this._rewardList.find(function (vo) {
                return vo.tbReward.ID == id;
            });
        };
        /** 是否有可领取的奖励 */
        GuildCopyModel.prototype.isCanReward = function () {
            if (!game.GuildModel.getInstance().isHasGuild())
                return false;
            return this.hasNewAward || this._rewardList.some(function (vo) {
                return vo.isCanReward();
            });
        };
        /** 获取购买挑战次数花费的钻石数量 */
        GuildCopyModel.prototype.getBuyCost = function () {
            var set = tb.TB_guild_set.getSet();
            var costAry = set.buy_cost;
            var count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
            if (count >= costAry.length) {
                return costAry[costAry.length - 1];
            }
            else {
                return costAry[count];
            }
        };
        return GuildCopyModel;
    }());
    game.GuildCopyModel = GuildCopyModel;
})(game || (game = {}));
