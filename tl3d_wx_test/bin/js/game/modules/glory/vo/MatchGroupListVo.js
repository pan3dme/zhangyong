var game;
(function (game) {
    /** 阶段数据 -- 多组pk */
    var MatchGroupListVo = /** @class */ (function () {
        function MatchGroupListVo(groupType) {
            this._matchList = [];
            this.winPos = {}; // 胜利数据
            this.betInfo = []; // 押注数据
            this._matchGroupList = [];
            this._isFinish = false;
            this.honorType = groupType;
            this._matchList.length = 0;
        }
        /** 初始化数据 */
        MatchGroupListVo.prototype.initData = function () {
            this._matchList.length = 0;
            this.winPos = {};
            this.betInfo.length = 0;
            this.curGroup = 0;
            this._matchGroupList.length = 0;
            this._isFinish = false;
        };
        /**
         * 更新匹配列表
         * @param playerPos 服务端的位置是排名名次排位置的 1-16,2-15...
         * @param baseInfo
         * @param winPos
         */
        MatchGroupListVo.prototype.updateMatchList = function (playerPos, baseInfo, winPos, betInfo) {
            var updateSort = this._matchList.length == 0;
            for (var playerId in playerPos) {
                var userVo = this.getPlayerById(playerId);
                if (!userVo) {
                    userVo = new game.GloryMatchPlayerVo();
                    userVo.playerId = playerId;
                    userVo.rankPos = Number(playerPos[playerId]);
                    userVo.isLastMatch = this.isLastMatch;
                    this._matchList.push(userVo);
                }
            }
            for (var playerId in baseInfo) {
                var userVo = this.getPlayerById(playerId);
                var svo = baseInfo[playerId];
                userVo.clearLineupInfo();
                userVo.setSvo(svo);
            }
            // 所有阶段输赢结果
            this.winPos = winPos;
            // 当前阶段的投注情况
            this.betInfo = betInfo;
            // 更新顺序,设置玩家位置
            if (updateSort) {
                this._matchList.sort(function (a, b) {
                    return a.rankPos - b.rankPos;
                });
            }
        };
        /** 设置当前数据的阶段 */
        MatchGroupListVo.prototype.setCurGroup = function (group) {
            this.curGroup = group;
            this._isFinish = game.GloryUtil.isEndTime(group);
        };
        /** 是否需要重新请求数据 */
        MatchGroupListVo.prototype.isNeedRequest = function (group) {
            if (this._matchList.length == 0 || this.isLastMatch)
                return true;
            // 不同阶段 或者 从未结束到-结束(有结果数据)
            return this.curGroup != group || (!this._isFinish && game.GloryUtil.isEndTime(group));
        };
        /** 获取玩家数据 */
        MatchGroupListVo.prototype.getPlayerById = function (pid) {
            return this._matchList.find(function (vo) {
                return vo.playerId == pid;
            });
        };
        /** 获取玩家数据通过位置 */
        MatchGroupListVo.prototype.getPlayerByPos = function (pos) {
            return this._matchList.find(function (vo) {
                return vo.rankPos == pos;
            });
        };
        MatchGroupListVo.prototype.getMatchList = function () {
            return this._matchList;
        };
        /** 获取匹配列表数据 */
        MatchGroupListVo.prototype.getMatchGroup = function (pos) {
            // 对手位置,对方奇数它则为偶数
            var pos2 = this.getOtherPos(pos);
            return [this.getPlayerByPos(pos), this.getPlayerByPos(pos2)];
        };
        MatchGroupListVo.prototype.getPosPlayerId = function (pos) {
            return this.getPlayerByPos(pos).playerId;
        };
        MatchGroupListVo.prototype.getPosPlayerIds = function (posAry) {
            var _this = this;
            return posAry.map(function (pos) {
                return _this.getPlayerByPos(pos).playerId;
            });
        };
        /** 获取冠军 */
        MatchGroupListVo.prototype.getGuanjun = function () {
            var group = this.honorType == game.GroupType.benfu ? game.GloryId.benfu_juesai : game.GloryId.kuafu_juesai;
            var ary = this.winPos[group] || [];
            return this.getPlayerByPos(ary[0]);
        };
        /** 获取某个位置的对手位置 */
        MatchGroupListVo.prototype.getOtherPos = function (pos) {
            return 17 - pos;
        };
        /** 某阶段是否结束 */
        MatchGroupListVo.prototype.isEnd = function (group) {
            return this.isLastMatch || App.serverTimeSecond >= game.GloryUtil.getGroupEndTime(group);
        };
        /**
         * 胜利者 0未结算 1左边赢 2右边赢
         * @param group 阶段
         * @param posAry 确定某一方是否胜利  位置列表
         */
        MatchGroupListVo.prototype.getWinType = function (group, posAry) {
            var curGroup = game.GloryModel.getInstance().updateCurGroup();
            if (this.isLastMatch || curGroup > group) {
                var ary = this.winPos[group] || [];
                var isWin = ary.some(function (pos) {
                    return posAry.indexOf(pos) != -1;
                });
                return isWin ? 1 : 2;
            }
            // 相同阶段或者未到 表示0未结算
            return 0;
        };
        /** 是否赢 */
        MatchGroupListVo.prototype.isWin = function (group, posAry) {
            var ary = this.winPos[group] || [];
            var isWin = ary.some(function (pos) {
                return posAry.indexOf(pos) != -1;
            });
            // 本届比赛中还需要判断时间，因为后端会提前计算输赢
            return this.isLastMatch ? isWin : (isWin && App.serverTimeSecond >= game.GloryUtil.getGroupEndTime(group));
        };
        /**
         * 押注 0未押注 1表示押注传入的位置 2表示押注对手位置
         * @param group 阶段
         * @param posAry 位置
         */
        MatchGroupListVo.prototype.getBetType = function (group, posAry) {
            // 不是本阶段
            if (group != this.curGroup)
                return 0;
            var betType = 0;
            for (var _i = 0, posAry_1 = posAry; _i < posAry_1.length; _i++) {
                var pos = posAry_1[_i];
                var pos2 = this.getOtherPos(pos);
                if (this.betInfo.indexOf(pos) != -1) {
                    betType = 1;
                    break;
                }
                else if (this.betInfo.indexOf(pos2) != -1) {
                    betType = 2;
                    break;
                }
            }
            return betType;
        };
        /** 选手对决组信息列表 stage pos */
        MatchGroupListVo.prototype.pushGroupWarInfo = function (info) {
            var vo = this.getGroupWarInfo(info.session, info.stage, info.pos);
            if (!vo) {
                vo = new game.MatchGroupVo();
                vo.isLastMatch = this.isLastMatch;
                this._matchGroupList.push(vo);
            }
            vo.setGroupInfo(info);
        };
        MatchGroupListVo.prototype.getGroupWarInfo = function (session, stage, pos) {
            return this._matchGroupList.find(function (vo) {
                return vo.svo.session == session && vo.svo.pos == pos && vo.svo.stage == stage;
            });
        };
        return MatchGroupListVo;
    }());
    game.MatchGroupListVo = MatchGroupListVo;
})(game || (game = {}));
