var game;
(function (game) {
    var GloryThread = /** @class */ (function () {
        function GloryThread() {
        }
        /** 请求赛季信息 {session,regTime} */
        GloryThread.requestSeason = function () {
            return new Promise(function (resolve, reject) {
                if (!App.IsSysOpen(ModuleConst.GLORY_FIGHT)) {
                    resolve();
                }
                else {
                    PLC.request(Protocol.center_honour_getHonourWarSession, null, function ($data) {
                        if (!$data)
                            return;
                        var model = game.GloryModel.getInstance();
                        model.updateSeason($data.honourInfo);
                        model.setLastRankList($data.rankList);
                        resolve();
                    });
                }
            });
        };
        /** 请求匹配信息 */
        GloryThread.requestMatchInfo = function (group, force) {
            if (force === void 0) { force = false; }
            return new Promise(function (resolve, reject) {
                var model = game.GloryModel.getInstance();
                if (!model.isInGameTime()) {
                    resolve(false);
                    return;
                }
                // 跨服海选阶段 显示本服决赛
                group = group == game.GloryId.kuafu_haixuan ? game.GloryId.benfu_juesai : group;
                var svrType = game.GloryUtil.getHonorTypeByGroup(group);
                var listVo = model.getGroupListVo(svrType);
                if (!force && !listVo.isNeedRequest(group)) {
                    resolve(true);
                    return;
                }
                var args = {};
                args[Protocol.center_honour_getSessionListInfo.args.type] = 0;
                args[Protocol.center_honour_getSessionListInfo.args.stage] = group;
                PLC.request(Protocol.center_honour_getSessionListInfo, args, function ($data) {
                    if (!$data) {
                        showToast(svrType == game.GroupType.benfu ? LanMgr.getLan("", 10344) : LanMgr.getLan("", 10345));
                        resolve(false);
                        return;
                    }
                    model.setMatchInfo(svrType, group, $data);
                    resolve(true);
                });
            });
        };
        /** 请求上届回顾对战列表 */
        GloryThread.requestLastList = function (group) {
            return new Promise(function (resolve) {
                var model = game.GloryModel.getInstance();
                if (model.season <= 1) {
                    resolve();
                    return;
                }
                var type = game.GloryUtil.getHonorTypeByGroup(group);
                var listVo = model.getLastListVo(type);
                if (!listVo.isNeedRequest(group)) {
                    resolve();
                    return;
                }
                var args = {};
                args[Protocol.center_honour_getSessionListInfo.args.type] = 1;
                args[Protocol.center_honour_getSessionListInfo.args.stage] = group;
                PLC.request(Protocol.center_honour_getSessionListInfo, args, function ($data) {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    model.setLastList(type, group, $data);
                    resolve();
                });
            });
        };
        /** 请求选手对决信息 */
        GloryThread.requestWarInfo = function (groupVo, group, pos) {
            return new Promise(function (resolve) {
                var model = game.GloryModel.getInstance();
                var season = groupVo.isLastMatch ? model.season - 1 : model.season;
                var info = groupVo.getGroupWarInfo(season, group, pos);
                // 不存在 或者 上次请求时未结束，这次请求时间已结束  时需要重新请求
                if (!info || (!info.isHasResult() && info.isEndGroup())) {
                    var args = {};
                    args[Protocol.center_honour_getHonourWarInfo.args.stage] = group;
                    args[Protocol.center_honour_getHonourWarInfo.args.type] = groupVo.isLastMatch ? 1 : 0;
                    args[Protocol.center_honour_getHonourWarInfo.args.pos] = pos;
                    PLC.request(Protocol.center_honour_getHonourWarInfo, args, function ($data) {
                        if (!$data)
                            return;
                        groupVo.pushGroupWarInfo($data["warInfo"]);
                        resolve(groupVo.getGroupWarInfo(season, group, pos));
                    });
                    return;
                }
                resolve(info);
            });
        };
        /** 请求阵容数据 */
        GloryThread.requestUserLineup = function (userVo) {
            return new Promise(function (resolve) {
                if (userVo.isHasLineup()) {
                    resolve();
                    return;
                }
                else {
                    var args = {};
                    args[Protocol.center_honour_getHonourWarPlayerData.args.type] = userVo.isLastMatch ? 1 : 0;
                    args[Protocol.center_honour_getHonourWarPlayerData.args.stage] = userVo.stage;
                    args[Protocol.center_honour_getHonourWarPlayerData.args.pos] = userVo.pos;
                    args[Protocol.center_honour_getHonourWarPlayerData.args.playerId] = userVo.playerId;
                    PLC.request(Protocol.center_honour_getHonourWarPlayerData, args, function ($data) {
                        if (!$data)
                            return;
                        var playerInfo = $data['playerInfo'];
                        userVo.setDetailInfo(playerInfo['guildName'], playerInfo['lineupInfo']);
                        resolve();
                    });
                }
            });
        };
        /** 请求阵容数据 */
        GloryThread.requestLineup = function (groupVo, isLeft) {
            return new Promise(function (resolve) {
                var info = isLeft ? groupVo.lUser : groupVo.rUser;
                if (info.isHasLineup()) {
                    resolve();
                    return;
                }
                else {
                    var args = {};
                    args[Protocol.center_honour_getHonourWarPlayerInfo.args.stage] = groupVo.svo.stage;
                    args[Protocol.center_honour_getHonourWarPlayerInfo.args.recordId] = groupVo.svo.recordId;
                    args[Protocol.center_honour_getHonourWarPlayerInfo.args.playerId] = info.playerId;
                    PLC.request(Protocol.center_honour_getHonourWarPlayerInfo, args, function ($data) {
                        if (!$data)
                            return;
                        var playerInfo = $data['playerInfo'];
                        info.setDetailInfo(playerInfo['guildName'], playerInfo['lineupInfo']);
                        resolve();
                    });
                }
            });
        };
        /** 请求我的比赛匹配列表 */
        GloryThread.requestMyMatch = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var model = game.GloryModel.getInstance();
                var curPhase = model.updateCurGroup();
                if (_this._rqGroup == curPhase) {
                    resolve();
                }
                else {
                    PLC.request(Protocol.center_honour_getHonourWarMyList, null, function ($data) {
                        if (!$data) {
                            resolve();
                            return;
                        }
                        _this._rqGroup = curPhase;
                        model.setMyMatchList($data.myList);
                        resolve();
                    });
                }
            });
        };
        GloryThread._rqGroup = -1; // 请求时，当时的比赛阶段，用来判断是否需要重新请求数据
        return GloryThread;
    }());
    game.GloryThread = GloryThread;
})(game || (game = {}));
