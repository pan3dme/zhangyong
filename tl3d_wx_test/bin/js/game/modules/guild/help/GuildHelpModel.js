var game;
(function (game) {
    var GuildHelpModel = /** @class */ (function () {
        function GuildHelpModel() {
            /** 是否全部结束 -- 避免频繁去判断 */
            this._isAllFinish = false;
            /** 是否领取完全部碎片 */
            this._isAllRewardFinish = false;
            // ------------ 数据请求 ------------
            /** 是否已经请求了我的求援数据列表 */
            this._hasRequestMy = false;
            this._myHelpList = [];
            this._othersHelps = [];
            this._myHelpIds = [];
        }
        GuildHelpModel.getInstance = function () {
            if (!GuildHelpModel._instance) {
                GuildHelpModel._instance = new GuildHelpModel();
            }
            return GuildHelpModel._instance;
        };
        ;
        GuildHelpModel.prototype.initModel = function () {
            this._myHelpList = [];
            this._isAllFinish = false;
            this._isAllRewardFinish = false;
            var num = tb.TB_guild_set.getSet().daily_help_num;
            for (var i = 0; i < num; i++) {
                var vo = new game.GuildHelpVo();
                vo.pos = i;
                this._myHelpList.push(vo);
            }
        };
        /** 清除跨天数据 我的求助列表及工会救援不需要充值，打开界面就会重新请求*/
        GuildHelpModel.prototype.clearCrossDayData = function () {
            UIMgr.hideUIByName(UIConst.GuildHelpView);
            UIMgr.hideUIByName(UIConst.GuildAskHelpView);
            // 跨天清除已领取完成数据
            for (var _i = 0, _a = this._myHelpList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.isRewardFinish()) {
                    vo.clear();
                }
            }
            this.updateFinishState();
            this._hasRequestMy = false;
            App.hero.guildHelpNum = this._myHelpIds.length;
        };
        /** 更新我的求助数据 */
        GuildHelpModel.prototype.updateHelpList = function (list) {
            var _loop_1 = function (i) {
                var vo = this_1._myHelpList[i];
                var svo = list.find(function (value) {
                    return value.helpPos == vo.pos;
                });
                vo.updateSvo(svo);
            };
            var this_1 = this;
            for (var i = 0; i < this._myHelpList.length; i++) {
                _loop_1(i);
            }
            this.updateFinishState();
        };
        /** 更新数量 */
        GuildHelpModel.prototype.updateHelpAwardNum = function (info, svo) {
            if (info && info.svo) {
                info.svo.getNum = svo.getNum;
                info.svo.helpNum = svo.helpNum;
                this.updateFinishState();
            }
        };
        /** 更新完成状态 */
        GuildHelpModel.prototype.updateFinishState = function () {
            this._myHelpIds.length = 0;
            this._isAllFinish = true;
            this._isAllRewardFinish = true;
            for (var _i = 0, _a = this._myHelpList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.isExist()) {
                    this._myHelpIds.push(vo.tbHelp.ID);
                }
                if (!vo.isFinish()) {
                    this._isAllFinish = false;
                }
                if (!vo.isRewardFinish()) {
                    this._isAllRewardFinish = false;
                }
            }
        };
        /** 新增求援数据 */
        GuildHelpModel.prototype.addHelp = function (svo) {
            if (!svo)
                return;
            var helpVo = this._myHelpList.find(function (vo) {
                return vo.pos == svo.helpPos;
            });
            if (!helpVo) {
                logerror("获取不到改槽位的vo：", svo);
            }
            helpVo.updateSvo(svo);
            this.updateFinishState();
        };
        /** 获取我的求助列表 */
        GuildHelpModel.prototype.getMyHelps = function () {
            return this._myHelpList;
        };
        /** 是否存在该求助 */
        GuildHelpModel.prototype.isExistHelp = function (tbid) {
            return this._myHelpIds.indexOf(tbid) != -1;
        };
        /** 是否我的求助全部完成 */
        GuildHelpModel.prototype.isAllFinish = function () {
            return this._isAllFinish;
        };
        /** 是否领取完全部碎片 */
        GuildHelpModel.prototype.isAllRewardFinish = function () {
            return this._isAllRewardFinish;
        };
        /** 获取求援次数 */
        GuildHelpModel.prototype.getAskHelpNum = function () {
            return this._myHelpIds.length;
        };
        /** 获取全部完成（领取完碎片）次数 */
        GuildHelpModel.prototype.getRewardFinishNum = function () {
            var num = 0;
            this._myHelpList.forEach(function (vo) {
                if (vo.isRewardFinish()) {
                    num++;
                }
            });
            return num;
        };
        /** 更新援助数据 */
        GuildHelpModel.prototype.updateOthersHelp = function (list) {
            for (var _i = 0, _a = this._othersHelps; _i < _a.length; _i++) {
                var vo = _a[_i];
                vo.clear();
                Laya.Pool.recover(GuildHelpModel.VO_SIGN, vo);
            }
            this._othersHelps.length = 0;
            for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                var svo = list_1[_b];
                var helpVo = Laya.Pool.getItemByClass(GuildHelpModel.VO_SIGN, game.GuildHelpVo);
                helpVo.updateSvo(svo);
                this._othersHelps.push(helpVo);
            }
        };
        GuildHelpModel.prototype.getOthersHelp = function () {
            return this._othersHelps;
        };
        /** 更新数量 */
        GuildHelpModel.prototype.updateOthersNum = function (svo) {
            var info = this.getOthersInfoById(svo.helpId);
            if (info && info.svo) {
                info.svo.getNum = svo.getNum;
                info.svo.helpNum = svo.helpNum;
                if (info.isFinish()) {
                    this.removeOthersById(svo.helpId);
                }
            }
        };
        /** 获取其他人的求援 */
        GuildHelpModel.prototype.getOthersInfoById = function (helpId) {
            return this._othersHelps.find(function (vo) {
                return vo.svo.helpId == helpId;
            });
        };
        /** 移除 */
        GuildHelpModel.prototype.removeOthersById = function (helpId) {
            var findVo = this._othersHelps.find(function (vo) {
                return vo.svo.helpId == helpId;
            });
            var index = this._othersHelps.indexOf(findVo);
            if (index != -1) {
                this._othersHelps.splice(index, 1);
                findVo.clear();
                Laya.Pool.recover(GuildHelpModel.VO_SIGN, findVo);
            }
        };
        // ------------ 公会援助 ------------
        /** 获取免费援助次数 */
        GuildHelpModel.prototype.getFreeHelpNum = function () {
            var total = tb.TB_guild_set.getSet().free_help_num;
            var cur = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.dailyFreeHelpNum);
            return total - cur;
        };
        /** 是否可以免费援助 */
        GuildHelpModel.prototype.isFreeHelp = function () {
            return this.getFreeHelpNum() > 0;
        };
        /** 获取钻石援助剩余次数 */
        GuildHelpModel.prototype.getCostNum = function () {
            return tb.TB_guild_set.getSet().cost_help_max - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildHelpBuyNum);
        };
        /** 是否消耗援助达到上限 */
        GuildHelpModel.prototype.isCostMax = function () {
            return this.getCostNum() <= 0;
        };
        /** 是否已领取宝箱 */
        GuildHelpModel.prototype.isReawrdBX = function () {
            return App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildHelpAwardNum) > 0;
        };
        /** 是否可领取宝箱 -- 需要领取完全部碎片才代表完成*/
        GuildHelpModel.prototype.isCanRewardBX = function () {
            return game.GuildModel.getInstance().isHasGuild() && !this.isReawrdBX() && this.isAllRewardFinish();
        };
        /** 是否可以求援 */
        GuildHelpModel.prototype.isCanAskHelp = function () {
            if (!game.GuildModel.getInstance().isHasGuild())
                return false;
            var total = tb.TB_guild_set.getSet().daily_help_num;
            return this._hasRequestMy ? (this.getAskHelpNum() < total) : (App.hero.guildHelpNum < total);
        };
        /** 是否可以领取碎片 */
        GuildHelpModel.prototype.isCanRewardSuipian = function () {
            return game.GuildModel.getInstance().isHasGuild() && this._myHelpList.some(function (vo) {
                return vo.isCanReward();
            });
        };
        /** 是否可以援助其他人 */
        GuildHelpModel.prototype.isCanHelpOthers = function () {
            return game.GuildModel.getInstance().isHasGuild() && this.isFreeHelp() && this._othersHelps.length > 0;
        };
        /** 请求我的求援列表 -- 主要援助我的数量 */
        GuildHelpModel.prototype.requestMyHelpList = function () {
            var _this = this;
            return new Promise(function (resolve) {
                // 求援是手动发起的，如果已请求过，但没有求援数据或者已经完成，就不需要重新请求
                if (_this._hasRequestMy && (_this.getAskHelpNum() == 0 || _this.isAllFinish())) {
                    resolve();
                    return;
                }
                PLC.request(Protocol.guild_guildHelp_getMyGuildHelpList, null, function (data) {
                    if (!data) {
                        resolve();
                        return;
                    }
                    _this.updateHelpList(data["guildHelpList"]);
                    var isFirst = !_this._hasRequestMy;
                    _this._hasRequestMy = true;
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_MY_HELP_LIST), isFirst);
                    resolve();
                });
            });
        };
        /** 请求公会援助列表 */
        GuildHelpModel.prototype.requestOthersHelpList = function () {
            var _this = this;
            return new Promise(function (resolve) {
                PLC.request(Protocol.guild_guildHelp_getGuildHelpList, null, function (data) {
                    if (!data) {
                        resolve();
                        return;
                    }
                    _this.updateOthersHelp(data["guildHelpList"]);
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_OTHERS_HELP_LIST));
                    resolve();
                });
            });
        };
        GuildHelpModel.VO_SIGN = "guild_help_vo";
        return GuildHelpModel;
    }());
    game.GuildHelpModel = GuildHelpModel;
})(game || (game = {}));
