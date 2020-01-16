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
    var IslandProcessor = /** @class */ (function (_super) {
        __extends(IslandProcessor, _super);
        function IslandProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.IslandModel.getInstance();
            return _this;
        }
        IslandProcessor.prototype.getName = function () {
            return "IslandProcessor";
        };
        IslandProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.IslandsEvent(game.IslandsEvent.SHOW_MAIN_VIEW),
                new game.IslandsEvent(game.IslandsEvent.SHOW_RULE_VIEW),
                new game.IslandsEvent(game.IslandsEvent.SHOW_RESCORD_VIEW),
                new game.IslandsEvent(game.IslandsEvent.SHOW_BUY_VIEW),
                new game.IslandsEvent(game.IslandsEvent.SHOW_ORE_MAP),
                new game.IslandsEvent(game.IslandsEvent.OPEN_ORE_INFO),
                new game.IslandsEvent(game.IslandsEvent.OPEN_ORE_EXPLAIN),
                new game.IslandsEvent(game.IslandsEvent.OCCUPY_ORE),
                new game.IslandsEvent(game.IslandsEvent.ROB_ORE),
                new game.IslandsEvent(game.IslandsEvent.UPDATE_ORE_LIST),
            ];
        };
        //处理事件
        IslandProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.IslandsEvent) {
                switch ($event.type) {
                    case game.IslandsEvent.SHOW_MAIN_VIEW:
                        this.showMainView();
                        break;
                    case game.IslandsEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case game.IslandsEvent.SHOW_RESCORD_VIEW:
                        this.showRecordView();
                        break;
                    case game.IslandsEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case game.IslandsEvent.SHOW_ORE_MAP:
                        this.showOreMap($event.data);
                        break;
                    case game.IslandsEvent.OPEN_ORE_INFO:
                        this.openOreInfoView($event.data);
                        break;
                    case game.IslandsEvent.OPEN_ORE_EXPLAIN:
                        this.openOreExplain($event.data);
                        break;
                    case game.IslandsEvent.OCCUPY_ORE:
                        this.occupyOre($event.data);
                        break;
                    case game.IslandsEvent.ROB_ORE:
                        this.robOre($event.data);
                        break;
                    case game.IslandsEvent.UPDATE_ORE_LIST:
                        this.renderOreMap($event.data);
                        break;
                }
            }
        };
        /** 打开界面 */
        IslandProcessor.prototype.showMainView = function () {
            game.IslandUtil.requestSelfInfo().then(function () {
                UIMgr.showUI(UIConst.IslandView);
            });
        };
        /** 打开规则界面 */
        IslandProcessor.prototype.showRuleView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20012));
        };
        /** 打开记录界面 */
        IslandProcessor.prototype.showRecordView = function () {
            var _this = this;
            PLC.request(Protocol.game_mine_mineRecordList, null, function ($data) {
                if (!$data)
                    return;
                var recordList = [];
                for (var _i = 0, _a = $data.recordList; _i < _a.length; _i++) {
                    var svo = _a[_i];
                    recordList.push(new game.IslandRecordVo(svo));
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
        /** 打开购买界面 */
        IslandProcessor.prototype.showBuyView = function () {
            if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum) >= tb.TB_island_set.getSet().buy_max) {
                showToast(LanMgr.getLan('', 10146));
                return;
            }
            var cost = this._model.getBuyCost();
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, cost)) {
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, { type: common.BuyBattleCountView.TYPE_MINEROB, callback: function (num) {
                    var arg = {};
                    arg[Protocol.game_common_buyMineRobCnt.args.count] = num;
                    PLC.request(Protocol.game_common_buyMineRobCnt, arg, function ($data) {
                        if (!$data)
                            return;
                        var view = UIMgr.getUIByName(UIConst.SysTopView);
                        if (view && view.box_island.visible) {
                            view.updateIslandCount();
                        }
                    });
                } });
        };
        /** 打开矿产地图界面 */
        IslandProcessor.prototype.showOreMap = function (info) {
            if (!info)
                return;
            var args = {};
            args[Protocol.center_mine_getMineList.args.islandId] = info.tbIsland.ID;
            PLC.request(Protocol.center_mine_getMineList, args, function ($data) {
                if (!$data)
                    return;
                info.setServerVo($data.mineList);
                UIMgr.showUI(UIConst.OreMapView, info);
            });
        };
        /** 打开矿产信息界面 */
        IslandProcessor.prototype.openOreInfoView = function (info) {
            var _this = this;
            var args = {};
            args[Protocol.center_mine_getTargetMineInfo.args.mineIndex] = info.svo.mineIndex;
            PLC.request(Protocol.center_mine_getTargetMineInfo, args, function ($data) {
                if (!$data)
                    return;
                info.setDetailInfo($data.mineInfo);
                _this.renderOreItem(info.svo.mineIndex);
                if (info.isSelf()) {
                    UIMgr.showUI(UIConst.SelfOreView, info);
                }
                else if (info.hasUser()) {
                    UIMgr.showUI(UIConst.PlayerOreView, info);
                }
                else {
                    UIMgr.showUI(UIConst.EmptyOreView, info);
                }
            });
        };
        /** 刷新矿点界面 */
        IslandProcessor.prototype.renderOreItem = function (mineIndex) {
            if (UIMgr.hasStage(UIConst.OreMapView)) {
                this.oreMapView.updateOreData(mineIndex);
            }
        };
        /** 说明界面 */
        IslandProcessor.prototype.openOreExplain = function (tbOre) {
            UIMgr.showUI(UIConst.OreExplainView, tbOre);
        };
        /** 更新矿点信息 */
        IslandProcessor.prototype.updateOreInfo = function (info) {
            var _this = this;
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10530),
                confirmCb: function () {
                    _this.openOreInfoView(info);
                }
            });
        };
        /** 更新矿点地图 */
        IslandProcessor.prototype.renderOreMap = function (islandId) {
            if (UIMgr.hasStage(UIConst.OreMapView)) {
                this.oreMapView.updateView();
            }
            if (UIMgr.hasStage(UIConst.IslandView)) {
                this.islandView.updateView();
            }
        };
        /** 掠夺矿产 */
        IslandProcessor.prototype.robOre = function (info) {
            var _this = this;
            if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum) <= 0) {
                showToast(LanMgr.getMsgByCode('RobCountNotEnough'));
                return;
            }
            if (info.isOutTime()) {
                showToast(LanMgr.getLan('', 10194));
                return;
            }
            // 可能会有随机收益
            // let award = info.getRobAward();
            // if (award[1] <= 0) {
            //     showToast(LanMgr.getLan('该岛屿暂无收益,稍后再试', -1));
            //     return;
            // }
            var args = {};
            args[Protocol.game_mine_mineRobStart.args.mineIndex] = info.svo.mineIndex;
            args[Protocol.game_mine_mineRobStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_mine_mineRobStart, args, function ($data, msg, msgCode) {
                if (!$data) {
                    if (msgCode == Lans.OccupyInfoHasRefresh) {
                        _this.updateOreInfo(info);
                        UIMgr.hideUIByName(UIConst.PlayerOreView);
                    }
                    return;
                }
                info.setDetailInfo($data.mineInfo);
                _this.doRobFight(info);
            });
        };
        IslandProcessor.prototype.doRobFight = function (info) {
            var _this = this;
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.island;
            copyvo.islandOreInfo = game.OreSpotInfoVo.copy(info);
            copyvo.islandOreInfo.isOccupyFight = false;
            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
            logdebug('神秘岛屿掠夺：', info.tbOre.ID, isWin, copyvo);
            var arg = {};
            arg[Protocol.game_mine_mineRobEnd.args.mineIndex] = info.svo.mineIndex;
            arg[Protocol.game_mine_mineRobEnd.args.isWin] = isWin;
            PLC.request(Protocol.game_mine_mineRobEnd, arg, function ($data) {
                if (!$data)
                    return;
                var islandInfo = _this._model.getIslandById(info.tbIsland.ID);
                var enterVo = { vo: copyvo, event: new game.IslandsEvent(game.IslandsEvent.SHOW_ORE_MAP), eventdata: islandInfo, responseData: $data };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        /** 占领矿产 */
        IslandProcessor.prototype.occupyOre = function (info) {
            var _this = this;
            var model = this._model;
            if (model.getOccupyCount() <= 0) {
                showToast(LanMgr.getLan('', 10195));
                return;
            }
            var curPlayerId = info.svo.playerId ? info.svo.playerId : null;
            var args = {};
            args[Protocol.center_mine_getTargetMineInfo.args.mineIndex] = info.svo.mineIndex;
            PLC.request(Protocol.center_mine_getTargetMineInfo, args, function ($data) {
                if (!$data)
                    return;
                var mineInfo = $data.mineInfo;
                var playerId = mineInfo ? mineInfo.playerId : null;
                if (curPlayerId != playerId) {
                    _this.updateOreInfo(info);
                    return;
                }
                if (model.getSelfOre()) {
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan("", 10531),
                        confirmCb: function () {
                            _this.doOccupyCheck(info);
                        }
                    });
                }
                else {
                    _this.doOccupyCheck(info);
                }
            });
        };
        /** 抢占前检测 */
        IslandProcessor.prototype.doOccupyCheck = function (info) {
            var _this = this;
            if (!info.svo) {
                showToast(LanMgr.getLan('', 10441));
                return;
            }
            if (!info.hasUser()) {
                var arg = {};
                arg[Protocol.game_mine_mineOccupy.args.mineIndex] = info.svo.mineIndex;
                PLC.request(Protocol.game_mine_mineOccupy, arg, function ($data, msg, msgCode) {
                    if (!$data) {
                        if (msgCode == Lans.OccupyInfoHasRefresh) {
                            _this.updateOreInfo(info);
                            UIMgr.hideUIByName(UIConst.PlayerOreView);
                        }
                        return;
                    }
                    UIMgr.hideUIByName(UIConst.EmptyOreView);
                    _this._model.setMyOreInfo({ mineId: info.svo.mineId, mineType: info.svo.mineType, islandId: info.tbIsland.ID });
                    info.svo.playerId = App.hero.playerId;
                    info.svo.playerName = App.hero.name;
                    info.svo.force = App.hero.force;
                    info.svo.occupyTime = App.serverTimeSecond;
                    var ary = [];
                    if ($data.commonData) {
                        UIUtil.getRewardItemVoList(ary, $data.commonData, false, false);
                    }
                    if ($data.firstData) {
                        UIUtil.getRewardItemVoList(ary, $data.firstData, true, false);
                    }
                    if (ary.length > 0) {
                        var info_1 = { content: LanMgr.getLan("", 12197), itemArray: ary };
                        UIMgr.showUI(UIConst.OreSettlementView, info_1);
                    }
                    _this.renderOreMap(info.tbIsland.ID);
                });
                return;
            }
            var args = {};
            args[Protocol.game_mine_mineOccupyStart.args.mineIndex] = info.svo.mineIndex;
            args[Protocol.game_mine_mineOccupyStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_mine_mineOccupyStart, args, function ($data, msg, msgCode) {
                if (!$data) {
                    if (msgCode == Lans.OccupyInfoHasRefresh) {
                        _this.updateOreInfo(info);
                        UIMgr.hideUIByName(UIConst.PlayerOreView);
                    }
                    return;
                }
                info.setDetailInfo($data.mineInfo);
                _this.doOccupyFight(info);
            });
        };
        /** 抢占 */
        IslandProcessor.prototype.doOccupyFight = function (info) {
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.island;
            copyvo.islandOreInfo = game.OreSpotInfoVo.copy(info);
            copyvo.islandOreInfo.isOccupyFight = true;
            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
            var model = this._model;
            logdebug('神秘岛屿抢占：', info.tbOre.ID, isWin, copyvo);
            var arg = {};
            arg[Protocol.game_mine_mineOccupyEnd.args.mineIndex] = info.svo.mineIndex;
            arg[Protocol.game_mine_mineOccupyEnd.args.isWin] = isWin;
            PLC.request(Protocol.game_mine_mineOccupyEnd, arg, function ($data) {
                if (!$data)
                    return;
                if ($data.myInfo) {
                    model.setMyOreInfo($data.myInfo);
                }
                var islandInfo = model.getIslandById(info.tbIsland.ID);
                var enterVo = { vo: copyvo, event: new game.IslandsEvent(game.IslandsEvent.SHOW_ORE_MAP), eventdata: islandInfo, responseData: $data };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        Object.defineProperty(IslandProcessor.prototype, "islandView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.IslandView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IslandProcessor.prototype, "oreMapView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.OreMapView);
            },
            enumerable: true,
            configurable: true
        });
        return IslandProcessor;
    }(tl3d.Processor));
    game.IslandProcessor = IslandProcessor;
})(game || (game = {}));
