var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var MatchProcessor = /** @class */ (function (_super) {
        __extends(MatchProcessor, _super);
        function MatchProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.MatchModel.getInstance();
            _this._request = game.MatchThread.getInsatnce();
            return _this;
        }
        MatchProcessor.prototype.getName = function () {
            return "MatchProcessor";
        };
        MatchProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ArenaEvent(game.ArenaEvent.SHOW_MATCH_PANEL),
                new game.ArenaEvent(game.ArenaEvent.SHOW_BUY_VIEW),
                new game.ArenaEvent(game.ArenaEvent.SHOW_NOTICE_VIEW),
                new game.ArenaEvent(game.ArenaEvent.SHOW_AWARD_VIEW),
                new game.ArenaEvent(game.ArenaEvent.SHOW_RANK_VIEW),
                new game.ArenaEvent(game.ArenaEvent.SHOW_RECORD_VIEW),
                new game.ArenaEvent(game.ArenaEvent.SHOW_PLAYER_LINEUP),
                new game.ArenaEvent(game.ArenaEvent.MATCH_REWARD_BOX),
                new game.ArenaEvent(game.ArenaEvent.REFRESH_MATCH_LIST),
                new game.ArenaEvent(game.ArenaEvent.MATCH_CHALLENGE),
                new game.ArenaEvent(game.ArenaEvent.MATCH_PLAYBACK),
                new game.ArenaEvent(game.ArenaEvent.FIGHT_BACK_TO_RECORD),
            ];
        };
        MatchProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.ArenaEvent) {
                switch (event.type) {
                    case game.ArenaEvent.SHOW_MATCH_PANEL:
                        this.showMatchView();
                        break;
                    case game.ArenaEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case game.ArenaEvent.SHOW_NOTICE_VIEW:
                        this.showNoticeView();
                        break;
                    case game.ArenaEvent.SHOW_AWARD_VIEW:
                        this.showRewardView();
                        break;
                    case game.ArenaEvent.SHOW_RANK_VIEW:
                        this.showRankView();
                        break;
                    case game.ArenaEvent.SHOW_RECORD_VIEW:
                        this.showRecordView();
                        break;
                    case game.ArenaEvent.SHOW_PLAYER_LINEUP:
                        this.showLineupView(event.data);
                        break;
                    case game.ArenaEvent.MATCH_REWARD_BOX:
                        this.rewardBox(event.data);
                        break;
                    case game.ArenaEvent.REFRESH_MATCH_LIST:
                        this.refreshList();
                        break;
                    case game.ArenaEvent.MATCH_CHALLENGE:
                        this.matchChallenge(event.data);
                        break;
                    case game.ArenaEvent.MATCH_PLAYBACK:
                        this.recordPlayback(event.data);
                        break;
                    case game.ArenaEvent.FIGHT_BACK_TO_RECORD:
                        this.backToRecord();
                        break;
                }
            }
        };
        /** 打开匹配赛界面 */
        MatchProcessor.prototype.showMatchView = function (request) {
            if (request === void 0) { request = true; }
            if (request) {
                this._request.requestMatchInfo().then(function () {
                    UIMgr.showUI(UIConst.ArenaMatchView);
                });
            }
            else {
                UIMgr.showUI(UIConst.ArenaMatchView);
            }
        };
        /** 打开匹配赛购买界面 */
        MatchProcessor.prototype.showBuyView = function () {
            var _this = this;
            if (!UIUtil.checkLimitEnough(iface.tb_prop.limitTypeKey.buyMatchNum, iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum)) {
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, { type: common.BuyBattleCountView.TYPE_MATCH, callback: function (num) {
                    var arg = {};
                    arg[Protocol.game_match_buyBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_match_buyBattleCnt, arg, function ($data) {
                        if (!$data)
                            return;
                        _this.matchView.updateSYCount();
                    });
                } });
        };
        /** 打开匹配赛提示界面 */
        MatchProcessor.prototype.showNoticeView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20015));
        };
        /** 打开匹配赛奖励界面 */
        MatchProcessor.prototype.showRewardView = function () {
            UIMgr.showUI(UIConst.MatchRewardView);
        };
        /** 打开匹配赛排行界面 */
        MatchProcessor.prototype.showRankView = function () {
            UIMgr.showUI(UIConst.MatchRankView);
        };
        /** 打开匹配赛记录界面 */
        MatchProcessor.prototype.showRecordView = function (request) {
            var _this = this;
            if (request === void 0) { request = true; }
            if (request) {
                this._request.requestRecordList().then(function () {
                    var list = _this._model.getRecordList();
                    if (!list || list.length == 0) {
                        showToast(LanMgr.getLan('', 10070));
                        return;
                    }
                    UIMgr.showUI(UIConst.ArenaRecordView, list);
                });
            }
            else {
                UIMgr.showUI(UIConst.ArenaRecordView, this._model.getRecordList());
            }
        };
        /** 打开阵容界面 */
        MatchProcessor.prototype.showLineupView = function (info) {
            if (!info.isHasLineup()) {
                this._request.requestLineup(info).then(function () {
                    UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
                });
            }
            else {
                UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
            }
        };
        /** 领取宝箱 */
        MatchProcessor.prototype.rewardBox = function (info) {
            var _this = this;
            if (!info.isCanReward())
                return;
            this._request.rewardBaoxiang(info).then(function () {
                _this.matchView.updateBox();
            });
        };
        /** 刷新列表 */
        MatchProcessor.prototype.refreshList = function () {
            var _this = this;
            var time = App.serverTimeSecond - this._model.lastRefreshTime;
            if (time < tb.TB_match_set.getSet().refresh_interval) {
                showToast(LanMgr.getLan("", 11015));
                return;
            }
            this._request.refreshList().then(function () {
                _this.matchView.refreshList();
                _this.matchView.resetRefreshInterval();
            });
        };
        /** 挑战 */
        MatchProcessor.prototype.matchChallenge = function (info) {
            var _this = this;
            if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.matchNum) <= 0) {
                this.showBuyView();
                return;
            }
            this._request.requestBattleStart(info).then(function ($data) {
                _this.doChallenge(info, $data);
            });
        };
        /** 开始挑战 */
        MatchProcessor.prototype.doChallenge = function (info, resData) {
            var battleEndInfo = resData['battleEndInfo'];
            var reportData = resData.battleReport.reportData;
            logzhanbao(reportData);
            var isWin = battleEndInfo.selfChgScore > 0;
            info.isWin = isWin;
            var vo = new game.FightVo();
            vo.copyType = CopyType.arenaMatch;
            vo.arenaMatchVo = info;
            var pageVo = new game.ServerPage();
            pageVo.initPage(reportData);
            pageVo.result = isWin ? playState.VICTORY : playState.FAILURE;
            vo.fightPageControl = pageVo;
            var enterVo = { vo: vo, event: new game.ArenaEvent(game.ArenaEvent.SHOW_MATCH_PANEL), responseData: resData };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        /** 记录回放 */
        MatchProcessor.prototype.recordPlayback = function (info) {
            var _this = this;
            var args = {};
            args[Protocol.center_match_getBattleReport.args.idx] = info.index;
            PLC.request(Protocol.center_match_getBattleReport, args, function ($data, msg) {
                if (!$data)
                    return;
                var reportData = $data.battleReport.reportData;
                if (!reportData)
                    return;
                _this.doPlayback($data, info);
            });
        };
        /** 开始回放 */
        MatchProcessor.prototype.doPlayback = function ($data, info) {
            var reportData = $data.battleReport.reportData;
            logzhanbao(reportData);
            var vo = new game.FightVo();
            vo.copyType = CopyType.arenaMatch;
            vo.arenaMatchVo = info;
            var serverPage = new game.ServerPage();
            serverPage.initPage(reportData);
            serverPage.result = info.isWin ? playState.VICTORY : playState.FAILURE;
            vo.fightPageControl = serverPage;
            var enterVo = { vo: vo, event: new game.ArenaEvent(game.ArenaEvent.FIGHT_BACK_TO_RECORD) };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        /** 战斗结束返回记录界面 */
        MatchProcessor.prototype.backToRecord = function () {
            this.showMatchView(false);
            this.showRecordView(false);
        };
        Object.defineProperty(MatchProcessor.prototype, "matchView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.ArenaMatchView);
            },
            enumerable: true,
            configurable: true
        });
        return MatchProcessor;
    }(tl3d.Processor));
    game.MatchProcessor = MatchProcessor;
})(game || (game = {}));
