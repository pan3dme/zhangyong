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
    var GloryProcessor = /** @class */ (function (_super) {
        __extends(GloryProcessor, _super);
        function GloryProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.GloryModel.getInstance();
            return _this;
        }
        GloryProcessor.prototype.getName = function () {
            return "GloryProcessor";
        };
        GloryProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_LAST_REVIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_AWARD_VIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_RULE_VIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_SHOP_VIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_RECORD_VIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_RECORD_BACK_VIEW),
                new game.GloryEvent(game.GloryEvent.SHOW_PLAYBACK),
                new game.GloryEvent(game.GloryEvent.BET_PLAYER),
            ];
        };
        //处理事件
        GloryProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GloryEvent) {
                switch ($event.type) {
                    case game.GloryEvent.SHOW_MAIN_VIEW:
                        this.showMainView($event.data);
                        break;
                    case game.GloryEvent.SHOW_LAST_REVIEW:
                        this.showLastReview($event.data);
                        break;
                    case game.GloryEvent.SHOW_AWARD_VIEW:
                        this.showAward();
                        break;
                    case game.GloryEvent.SHOW_RULE_VIEW:
                        this.showRule();
                        break;
                    case game.GloryEvent.SHOW_SHOP_VIEW:
                        this.showShop();
                        break;
                    case game.GloryEvent.SHOW_RECORD_VIEW:
                        this.showRecord();
                        break;
                    case game.GloryEvent.SHOW_RECORD_BACK_VIEW:
                        this.showRecordBack($event.data);
                        break;
                    case game.GloryEvent.SHOW_PLAYBACK:
                        this.showPalyback($event.data);
                        break;
                    case game.GloryEvent.BET_PLAYER:
                        this.betPlayer($event.data);
                        break;
                }
            }
        };
        /** 打开界面 */
        GloryProcessor.prototype.showMainView = function (data) {
            var model = this._model;
            // 请求赛季信息
            game.GloryThread.requestSeason().then(function () {
                // 游戏时间内，并且有人报名
                if (model.isInGameTime() && model.serverPhase > 0) {
                    var group = model.updateCurGroup();
                    game.GloryThread.requestMatchInfo(group).then(function (isSuccess) {
                        if (isSuccess) {
                            UIMgr.showUI(UIConst.GloryFightView, data);
                        }
                    });
                }
                else {
                    UIMgr.showUI(UIConst.GloryWaitView);
                }
            });
        };
        /** 打开上届回顾 */
        GloryProcessor.prototype.showLastReview = function (data) {
            var _this = this;
            game.GloryThread.requestLastList(game.GloryId.kuafu_juesai).then(function () {
                var groupVo = _this._model.getLastListVo(game.GroupType.kuafu);
                if (groupVo.getMatchList().length <= 0) {
                    showToast(LanMgr.getLan("", 10333));
                    return;
                }
                UIMgr.showUI(UIConst.GloryLastReview, data);
            });
        };
        /** 打开奖励界面 */
        GloryProcessor.prototype.showAward = function () {
            UIMgr.showUI(UIConst.GloryRewardView);
        };
        /** 打开规则界面 */
        GloryProcessor.prototype.showRule = function () {
            var min = Math.floor(tb.TB_honour_set.getSet().bet_endtime / 60);
            UIUtil.showCommonTipView(LanMgr.getLanArr(20014, [], [min]));
        };
        /** 打开商店界面 */
        GloryProcessor.prototype.showShop = function () {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.rongyao);
        };
        /** 打开记录界面 */
        GloryProcessor.prototype.showRecord = function () {
            var _this = this;
            game.GloryThread.requestMyMatch().then(function () {
                if (_this._model.getMyMatchList().length == 0) {
                    showToast(LanMgr.getLan("", 10334));
                    return;
                }
                UIMgr.showUI(UIConst.GloryRecordView);
            });
        };
        GloryProcessor.prototype.showRecordBack = function (type) {
            if (type == 0) {
                this.showMainView(null);
            }
            else {
                this.showLastReview(null);
            }
            this.showRecord();
        };
        /** 显示回放 */
        GloryProcessor.prototype.showPalyback = function (info) {
            var _this = this;
            if (info.isBye()) {
                showToast(LanMgr.getLan("", 10335));
                return;
            }
            var model = this._model;
            if (model.reportDataDic[info.svo.recordId]) {
                this.doPlayback(info, model.reportDataDic[info.svo.recordId]);
            }
            else {
                var args = {};
                args[Protocol.center_honour_getHonourWarPlayback.args.recordId] = info.svo.recordId;
                args[Protocol.center_honour_getHonourWarPlayback.args.stage] = info.svo.stage;
                PLC.request(Protocol.center_honour_getHonourWarPlayback, args, function (res) {
                    if (!res)
                        return;
                    var reportData = res.battleInfo.reportData;
                    if (!reportData)
                        return;
                    model.reportDataDic[info.svo.recordId] = reportData;
                    _this.doPlayback(info, reportData);
                });
            }
        };
        /** 开始回放 */
        GloryProcessor.prototype.doPlayback = function (info, reportData) {
            logzhanbao(reportData);
            var vo = new game.FightVo();
            vo.copyType = CopyType.glory;
            vo.gloryMatchVo = info;
            var pageVo = new game.ServerPage();
            pageVo.initPage(reportData);
            pageVo.result = info.svo.winner == 1 ? playState.VICTORY : playState.FAILURE;
            vo.fightPageControl = pageVo;
            var index = game.GloryUtil.isInKuafu(info.svo.stage) ? 1 : 0;
            var group = info.svo.stage;
            var eventNotice = info.isMyMatch ? game.GloryEvent.SHOW_RECORD_BACK_VIEW : (UIMgr.hasStage(UIConst.GloryLastReview) ? game.GloryEvent.SHOW_LAST_REVIEW : game.GloryEvent.SHOW_MAIN_VIEW);
            var eventdata = info.isMyMatch ? (UIMgr.hasStage(UIConst.GloryLastReview) ? 1 : 0) : [index, group];
            var enterVo = { vo: vo, event: new game.GloryEvent(eventNotice), eventdata: eventdata };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        /** 押注 */
        GloryProcessor.prototype.betPlayer = function (ary) {
            var _this = this;
            var item = ary[1];
            var info = item.dataSource;
            if (info.isBye()) {
                showToast(LanMgr.getLan("", 10336));
                return;
            }
            if (!info.isInBetTime()) {
                showToast(this._model.getBetNotice());
                return;
            }
            if (info.isHasBet()) {
                showToast(LanMgr.getLan("", 10339));
                return;
            }
            if (info.isHasResult()) {
                showToast(LanMgr.getLan("", 10340));
                return;
            }
            var notEnough = false;
            for (var _i = 0, _a = info.tbHonor.bet_item; _i < _a.length; _i++) {
                var ary_1 = _a[_i];
                if (UIUtil.checkNotEnough(ary_1[0], ary_1[1])) {
                    notEnough = true;
                    return;
                }
            }
            if (notEnough) {
                return;
            }
            var str = LanMgr.getLan("", 10502);
            for (var _b = 0, _c = info.tbHonor.bet_item; _b < _c.length; _b++) {
                var ary_2 = _c[_b];
                str += ary_2[1] + " <img style='padding:10px 3px 3px 3px;' src='" + SkinUtil.getCostSkin(ary_2[0]) + "' ></img>  ";
            }
            str += LanMgr.getLan("", 10503);
            common.AlertBox.showAlert({
                text: str, confirmCb: function () {
                    _this.doBet(ary);
                }, parm: null, yes: LanMgr.getLan("", 10504)
            });
        };
        GloryProcessor.prototype.doBet = function (ary) {
            var _this = this;
            var betLf = ary[0];
            var item = ary[1];
            var info = item.dataSource;
            var args = {};
            var playerId = betLf ? info.lUser.playerId : info.rUser.playerId;
            args[Protocol.game_honour_honourWarBet.args.playerId] = playerId;
            args[Protocol.game_honour_honourWarBet.args.recordId] = info.svo.recordId;
            args[Protocol.game_honour_honourWarBet.args.stage] = info.svo.stage;
            PLC.request(Protocol.game_honour_honourWarBet, args, function ($data) {
                if (!$data)
                    return;
                info.svo.betId = $data.betId;
                item.updateBet();
                var vo = _this._model.getGroupListVoByGroup(info.svo.stage);
                var playerVo = vo && vo.getPlayerById(playerId);
                if (playerVo) {
                    vo.betInfo.push(playerVo.rankPos);
                }
                if (UIMgr.hasStage(UIConst.GloryFightView)) {
                    var view = UIMgr.getUIByName(UIConst.GloryFightView);
                    view.listView.renderBtnState();
                }
                dispatchEvt(new game.GloryEvent(game.GloryEvent.BET_SUCCESS));
            });
        };
        return GloryProcessor;
    }(tl3d.Processor));
    game.GloryProcessor = GloryProcessor;
})(game || (game = {}));
