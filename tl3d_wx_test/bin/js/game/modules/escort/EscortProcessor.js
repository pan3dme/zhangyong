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
    var EscortProcessor = /** @class */ (function (_super) {
        __extends(EscortProcessor, _super);
        function EscortProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.EscortModel.getInstance();
            return _this;
        }
        EscortProcessor.prototype.getName = function () {
            return "EscortProcessor";
        };
        EscortProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.EscortEvent(game.EscortEvent.SHOW_MAIN_VIEW),
                new game.EscortEvent(game.EscortEvent.SHOW_CARAVAN_INFO_VIEW),
                new game.EscortEvent(game.EscortEvent.SHOW_ESCORT_GOODS_VIEW),
                new game.EscortEvent(game.EscortEvent.SHOW_RECORD_VIEW),
                new game.EscortEvent(game.EscortEvent.SHOW_RULE_VIEW),
                new game.EscortEvent(game.EscortEvent.QUICK_FINISH),
                new game.EscortEvent(game.EscortEvent.ROBBED_GOODS),
                new game.EscortEvent(game.EscortEvent.REFRESH_GOODS),
                new game.EscortEvent(game.EscortEvent.ONEKEY_REFRESH_GOODS),
                new game.EscortEvent(game.EscortEvent.ESCORT_GOODS),
                new game.EscortEvent(game.EscortEvent.RECEIVE_AWARD),
            ];
        };
        //处理事件
        EscortProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.EscortEvent) {
                switch ($event.type) {
                    case game.EscortEvent.SHOW_MAIN_VIEW:
                        this.showView();
                        break;
                    case game.EscortEvent.SHOW_CARAVAN_INFO_VIEW:
                        this.showCarvanView($event.data);
                        break;
                    case game.EscortEvent.SHOW_ESCORT_GOODS_VIEW:
                        break;
                    case game.EscortEvent.SHOW_RECORD_VIEW:
                        this.showRecordView();
                        break;
                    case game.EscortEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case game.EscortEvent.QUICK_FINISH:
                        this.quickFinish();
                        break;
                    case game.EscortEvent.ROBBED_GOODS:
                        this.robbedGoods($event.data);
                        break;
                    case game.EscortEvent.REFRESH_GOODS:
                        this.refreshGoods();
                        break;
                    case game.EscortEvent.ONEKEY_REFRESH_GOODS:
                        this.oneKeyGoods();
                        break;
                    case game.EscortEvent.ESCORT_GOODS:
                        this.escortGoods();
                        break;
                    case game.EscortEvent.RECEIVE_AWARD:
                        this.receiveAward();
                        break;
                }
            }
        };
        /** 打开界面 */
        EscortProcessor.prototype.showView = function () {
            UIMgr.showUI(UIConst.EscortMainView);
        };
        /** 打开商队信息界面 */
        EscortProcessor.prototype.showCarvanView = function (info) {
            if (info.svo.playerId == App.hero.playerId) {
                showToast(LanMgr.getMsgByCode('EscortIsMySelf'));
                return;
            }
            if (this._model.getRobCount() <= 0) {
                showToast(LanMgr.getMsgByCode('RobCountNotEnough'));
                return;
            }
            if (App.serverTimeSecond >= info.svo.endTime) {
                showToast(LanMgr.getLan('', 10166));
                return;
            }
            if (info.svo.robCount >= tb.TB_escort_set.getSet().rob_num) {
                showToast(LanMgr.getLan('', 10165, 2));
                return;
            }
            var arg = {};
            arg[Protocol.center_escort_getTargetInfo.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.center_escort_getTargetInfo, arg, function ($data) {
                if (!$data)
                    return;
                info.setDetailInfo($data.targetInfo);
                UIMgr.showUI(UIConst.CaravanInfoView, info);
            });
        };
        /** 打开记录界面 */
        EscortProcessor.prototype.showRecordView = function () {
            var _this = this;
            PLC.request(Protocol.game_escort_getRecordList, null, function ($data) {
                if (!$data)
                    return;
                var recordList = [];
                for (var _i = 0, _a = $data.recordList; _i < _a.length; _i++) {
                    var svo = _a[_i];
                    recordList.push(new game.CaravanRecordVo(svo));
                }
                if (recordList.length <= 0) {
                    showToast(LanMgr.getLan("", 10070));
                    return;
                }
                recordList.sort(function (a, b) {
                    return b.svo.recordTime - a.svo.recordTime;
                });
                _this._model.updateNewRecord(false);
                UIMgr.showUI(UIConst.RobbedRecordView, recordList);
            });
        };
        /** 打开规则界面 */
        EscortProcessor.prototype.showRuleView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20009));
        };
        /** 快速完成 */
        EscortProcessor.prototype.quickFinish = function () {
            var _this = this;
            var model = this._model;
            if (App.serverTimeSecond >= model.endTime) {
                showToast(LanMgr.getLan('', 10175));
                return;
            }
            var cost = tb.TB_escort_set.getSet().complete_cost;
            if (UIUtil.checkNotEnough(cost[0], cost[1])) {
                return;
            }
            PLC.request(Protocol.game_escort_quickEscort, null, function ($data) {
                if (!$data)
                    return;
                model.updateEscortInfo($data.escortInfo);
                _this.caravanMainView.refreshInterval();
                _this.caravanMainView.showReward();
                dispatchEvt(new game.EscortEvent(game.EscortEvent.UPDATE_SELF_INFO));
            });
        };
        /** 刷新货物 */
        EscortProcessor.prototype.refreshGoods = function () {
            var _this = this;
            var model = this._model;
            if (model.isMaxQuality(model.escortId)) {
                showToast(LanMgr.getLan('', 10169));
                return;
            }
            var cost = model.getRefreshCost();
            if (UIUtil.checkNotEnough(cost[0], cost[1])) {
                return;
            }
            PLC.request(Protocol.game_escort_refreshQuality, null, function ($data) {
                if (!$data)
                    return;
                App.hero.escortTradeId = $data.escortTradeId;
                model.updateEscortInfo(null);
                _this.caravanMainView.startAnim($data.escortTradeId);
                _this.caravanMainView.updateCost();
                dispatchEvt(new game.EscortEvent(game.EscortEvent.REFRESH_GOODS_SUCCESS));
            });
        };
        /** 一键刷橙 */
        EscortProcessor.prototype.oneKeyGoods = function () {
            var _this = this;
            var model = this._model;
            if (model.isMaxQuality(model.escortId)) {
                showToast(LanMgr.getLan('', 10169));
                return;
            }
            var cost = model.getOneKeyCost();
            if (UIUtil.checkNotEnough(cost[0], cost[1])) {
                return;
            }
            PLC.request(Protocol.game_escort_refreshOrange, null, function ($data) {
                if (!$data)
                    return;
                App.hero.escortTradeId = $data.escortTradeId;
                model.updateEscortInfo(null);
                _this.caravanMainView.selectItem($data.escortTradeId);
                _this.caravanMainView.updateCost();
            });
        };
        /** 护送货物 */
        EscortProcessor.prototype.escortGoods = function () {
            var model = this._model;
            if (model.endTime >= App.serverTimeSecond) {
                showToast(LanMgr.getLan('', 10167));
                return;
            }
            if (model.getEscortCount() <= 0) {
                showToast(LanMgr.getMsgByCode('EscortCountNotEnough'));
                return;
            }
            if (model.isDoubleTime() || game.GuideWeakManager.isExcuting()) {
                this.onRequestEscortGoods();
            }
            else {
                var self_1 = this;
                common.AlertBox.showAlert({
                    text: tb.TB_escort_set.getSet().double_prompt,
                    confirmCb: function () {
                        self_1.onRequestEscortGoods();
                    }
                });
            }
        };
        EscortProcessor.prototype.onRequestEscortGoods = function () {
            var _this = this;
            PLC.request(Protocol.game_escort_tradeEscort, null, function ($data) {
                if (!$data)
                    return;
                var model = _this._model;
                $data['addEscort']['playerId'] = App.hero.playerId;
                var info = new game.CaravanInfoVo($data.addEscort);
                model.updateEscortInfo({ tradeId: info.svo.tradeId, endTime: info.svo.endTime });
                App.hero.escortTradeId = $data.escortTradeId;
                model.delayRewardInfo();
                _this.caravanMainView.addCaravan(info);
                _this.caravanMainView.updateCount();
                _this.caravanMainView.refreshInterval();
                UIMgr.hideUIByName(UIConst.EscortView);
                dispatchEvt(new game.EscortEvent(game.EscortEvent.ESCORT_GOODS_SUCCESS));
            });
        };
        /** 掠夺物品  */
        EscortProcessor.prototype.robbedGoods = function (info) {
            var _this = this;
            if (App.serverTimeSecond >= info.svo.endTime) {
                showToast(LanMgr.getLan('', 10166));
                return;
            }
            var args = {};
            args[Protocol.game_escort_robTradeBattleStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_escort_robTradeBattleStart, args, function ($data) {
                if (!$data)
                    return;
                info.setDetailInfo($data.targetInfo);
                _this.doFight(info);
            });
        };
        EscortProcessor.prototype.doFight = function (info) {
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.escort;
            copyvo.caravanInfoVo = info;
            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
            var arg = {};
            arg[Protocol.game_escort_robTradeBattleEnd.args.isWin] = isWin;
            arg[Protocol.game_escort_robTradeBattleEnd.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_escort_robTradeBattleEnd, arg, function ($data) {
                if (!$data)
                    return;
                var enterVo = { vo: copyvo, event: new game.EscortEvent(game.EscortEvent.SHOW_MAIN_VIEW), responseData: $data };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        /** 领取奖励 */
        EscortProcessor.prototype.receiveAward = function () {
            var _this = this;
            PLC.request(Protocol.game_escort_receiveAwards, null, function ($data) {
                if (!$data)
                    return;
                var model = _this._model;
                model.updateEscortInfo(null);
                UIUtil.showRewardView($data.commonData);
                model.updateEscortInfo($data.escortInfo);
                _this.caravanMainView.selectItem(App.hero.escortTradeId);
                UIMgr.hideUIByName(UIConst.EscortRewardView);
                dispatchEvt(new game.EscortEvent(game.EscortEvent.UPDATE_REWARD_RP));
            });
        };
        Object.defineProperty(EscortProcessor.prototype, "caravanMainView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.EscortMainView);
            },
            enumerable: true,
            configurable: true
        });
        return EscortProcessor;
    }(tl3d.Processor));
    game.EscortProcessor = EscortProcessor;
})(game || (game = {}));
