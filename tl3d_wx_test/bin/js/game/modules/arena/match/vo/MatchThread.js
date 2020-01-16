var game;
(function (game) {
    var MatchThread = /** @class */ (function () {
        function MatchThread() {
        }
        MatchThread.getInsatnce = function () {
            if (!MatchThread._instance) {
                MatchThread._instance = new MatchThread();
            }
            return MatchThread._instance;
        };
        /** 获取匹配赛信息 */
        MatchThread.prototype.requestMatchInfo = function () {
            return new Promise(function (resolve, reject) {
                if (!App.IsSysOpen(ModuleConst.MATCH_FIGHT)) {
                    resolve();
                    return;
                }
                PLC.request(Protocol.game_match_getMatchInfo, null, (function ($data) {
                    if (!$data)
                        return;
                    var model = game.MatchModel.getInstance();
                    model.score = $data['score'];
                    model.benfuRank = $data['rank'];
                    model.setMatchList($data["clgList"]);
                    resolve();
                }));
            });
        };
        /** 刷新列表 */
        MatchThread.prototype.refreshList = function () {
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.game_match_refreshClgList, null, (function ($data) {
                    if (!$data)
                        return;
                    var model = game.MatchModel.getInstance();
                    model.lastRefreshTime = $data['clgListTime'];
                    model.score = $data['score'];
                    model.benfuRank = $data['rank'];
                    model.setMatchList($data["clgList"]);
                    resolve();
                }));
            });
        };
        /** 领取宝箱 */
        MatchThread.prototype.rewardBaoxiang = function (info) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.game_match_getMatchChest.args.chestId] = info.tbBox.ID;
                PLC.request(Protocol.game_match_getMatchChest, args, (function ($data) {
                    if (!$data)
                        return;
                    UIUtil.showRewardView($data.commonData);
                    game.MatchModel.getInstance().doneMatchChests = $data['doneMatchChests'];
                    dispatchEvt(new game.ArenaEvent(game.ArenaEvent.MATCH_REWARD_BOX_SUCC));
                    resolve();
                }));
            });
        };
        /** 请求玩家阵容信息 */
        MatchThread.prototype.requestLineup = function (info) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.center_match_observePlayer.args.obPlayerId] = info.playerId;
                PLC.request(Protocol.center_match_observePlayer, args, (function ($data) {
                    if (!$data)
                        return;
                    info.setDetailData($data['defInfo']);
                    resolve();
                }));
            });
        };
        /** 获取排行榜列表数据 */
        MatchThread.prototype.requestRankList = function (benfu) {
            return new Promise(function (resolve, reject) {
                var model = game.MatchModel.getInstance();
                if (benfu) {
                    PLC.request(Protocol.center_match_getLocalRankList, null, (function ($data) {
                        if (!$data)
                            return;
                        if ($data.hasOwnProperty('rank')) {
                            model.benfuRank = $data['rank'];
                        }
                        resolve($data['localRankList']);
                    }));
                }
                else {
                    PLC.request(Protocol.center_match_getWorldRankList, null, (function ($data) {
                        if (!$data)
                            return;
                        if ($data.hasOwnProperty('rank')) {
                            model.kuafuRank = $data['rank'];
                        }
                        resolve($data['worldRankList']);
                    }));
                }
            });
        };
        /** 开始挑战 */
        MatchThread.prototype.requestBattleStart = function (info) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.game_match_battleStart.args.targetIdx] = info.index;
                PLC.request(Protocol.game_match_battleStart, args, function ($data) {
                    if (!$data)
                        return;
                    var model = game.MatchModel.getInstance();
                    model.challengeCount = $data['clgMatchNum'];
                    var battleEndInfo = $data['battleEndInfo'];
                    model.score = battleEndInfo.selfScore;
                    info.score = battleEndInfo.tarScore;
                    resolve($data);
                });
            });
        };
        /** 请求记录列表 */
        MatchThread.prototype.requestRecordList = function () {
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.game_match_getBattleRecords, null, function ($data) {
                    if (!$data)
                        return;
                    game.MatchModel.getInstance().setRecordList($data['battleRecords']);
                    resolve();
                });
            });
        };
        return MatchThread;
    }());
    game.MatchThread = MatchThread;
})(game || (game = {}));
