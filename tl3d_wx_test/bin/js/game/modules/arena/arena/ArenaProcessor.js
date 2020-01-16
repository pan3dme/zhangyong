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
/**
* name
*/
var game;
(function (game) {
    var ArenaProcessor = /** @class */ (function (_super) {
        __extends(ArenaProcessor, _super);
        function ArenaProcessor() {
            return _super.call(this) || this;
        }
        ArenaProcessor.prototype.getName = function () {
            return "ArenaProcessor";
        };
        ArenaProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ArenaEvent(game.ArenaEvent.SHOW_ARENA_PANEL),
                new game.ArenaEvent(game.ArenaEvent.SHOW_ARENARANK_PANEL),
                new game.ArenaEvent(game.ArenaEvent.BUY_ARENA_CHALLENGE),
                new game.ArenaEvent(game.ArenaEvent.UPDATE_MYSELF_FORCE),
                new game.ArenaEvent(game.ArenaEvent.ARENA_CHALLENGE_END),
                new game.ArenaEvent(game.ArenaEvent.SHOW_LINUEUP_PANLE),
                new game.ArenaEvent(game.ArenaEvent.ARENA_BUY_CARDITEM),
                new game.ArenaEvent(game.ArenaEvent.ARENA_BATTEL_SWEEP),
                new game.ArenaEvent(game.ArenaEvent.ARENA_BATTEL_START),
                new game.ArenaEvent(game.ArenaEvent.SHOW_RECORD_PANLE),
                new game.ArenaEvent(game.ArenaEvent.GET_ARENA_BAGTTLE),
                new game.ArenaEvent(game.ArenaEvent.UPDATE_ARENA_RANK),
                new game.ArenaEvent(game.ArenaEvent.CLEAN_ARENA_TIME),
                new game.ArenaEvent(game.ArenaEvent.LOOK_REPORT_END),
                new game.ArenaEvent(game.ArenaEvent.TURN_OVER_CAED),
            ];
        };
        ArenaProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.ArenaEvent) {
                switch (event.type) {
                    case game.ArenaEvent.SHOW_ARENA_PANEL:
                        this.showArenaView();
                        break;
                    case game.ArenaEvent.LOOK_REPORT_END:
                        this.lookReportEnd();
                        break;
                    case game.ArenaEvent.TURN_OVER_CAED:
                        this.turnOverCard(event.data);
                        break;
                    case game.ArenaEvent.CLEAN_ARENA_TIME:
                        this.clearArenaCd();
                        break;
                    case game.ArenaEvent.UPDATE_ARENA_RANK:
                        this.updateClgList();
                        break;
                    case game.ArenaEvent.GET_ARENA_BAGTTLE:
                        this.getBattleReport(event.data);
                        break;
                    case game.ArenaEvent.SHOW_RECORD_PANLE:
                        this.showRecordView();
                        break;
                    case game.ArenaEvent.ARENA_BATTEL_START:
                        this.battleStart(event.data);
                        break;
                    case game.ArenaEvent.ARENA_BATTEL_SWEEP:
                        this.battleSweep(event.data);
                        break;
                    case game.ArenaEvent.ARENA_BUY_CARDITEM:
                        this.buyCardItems(event.data);
                        break;
                    case game.ArenaEvent.SHOW_LINUEUP_PANLE:
                        this.showLinueView(event.data);
                        break;
                    case game.ArenaEvent.BUY_ARENA_CHALLENGE:
                        this.buyBattleCnt();
                        break;
                    case game.ArenaEvent.ARENA_CHALLENGE_END:
                        this.challengeEnd(event.data);
                        break;
                    case game.ArenaEvent.SHOW_ARENARANK_PANEL:
                        this.showRankView();
                        break;
                }
            }
        };
        /**打开竞技界面 */
        ArenaProcessor.prototype.showArenaView = function () {
            this.refreshClgList().then(function (data) {
                if (data)
                    UIMgr.showUI(UIConst.ArenaView, data);
            });
        };
        /**刷新竞技界面 */
        ArenaProcessor.prototype.updateClgList = function () {
            var _this = this;
            this.refreshClgList().then(function (data) {
                if (data && _this.ArenaViewHasStage) {
                    _this.ArenaView.dataSource = data;
                    _this.ArenaView.setArenaInfo();
                }
            });
        };
        /**挑战完成回到界面 */
        ArenaProcessor.prototype.challengeEnd = function (data) {
            this.showArenaView();
            if (data.isHistoryTop()) {
                UIMgr.showUI(UIConst.ArenaTopRankView, data);
            }
        };
        /**打开排行榜界面 */
        ArenaProcessor.prototype.showRankView = function () {
            this.getArenaRankList().then(function (data) {
                if (data)
                    UIMgr.showUI(UIConst.ArenaRankView, data);
            });
        };
        /**打开防守记录界面 */
        ArenaProcessor.prototype.showRecordView = function () {
            this.getBattleRecords().then(function (data) {
                if (data)
                    UIMgr.showUI(UIConst.ArenaRecordView, data);
            });
        };
        /**观看战报回到界面 */
        ArenaProcessor.prototype.lookReportEnd = function () {
            var _this = this;
            this.refreshClgList().then(function (data) {
                if (data)
                    UIMgr.showUI(UIConst.ArenaView, data);
                _this.getBattleRecords().then(function (data) {
                    if (data)
                        UIMgr.showUI(UIConst.ArenaRecordView, data);
                });
            });
        };
        // private _myRank: number = 0;
        /**刷新挑战玩家列表请求 */
        ArenaProcessor.prototype.refreshClgList = function () {
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.center_arena_refreshClgList, null, function ($data, msg) {
                    if (!$data) {
                        resolve(null);
                        return;
                    }
                    var info = new game.ArenaInfo($data);
                    // this._myRank = info.rank;
                    resolve(info);
                });
            });
        };
        /**获取竞技场排行榜请求 */
        ArenaProcessor.prototype.getArenaRankList = function () {
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.center_arena_getArenaRankList, null, function ($data, msg) {
                    if (!$data) {
                        resolve(null);
                        return;
                    }
                    resolve(new game.ArenaInfo($data));
                });
            });
        };
        /**获取防守记录请求 */
        ArenaProcessor.prototype.getBattleRecords = function () {
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.center_arena_getBattleRecords, null, function ($data, msg) {
                    if (!$data) {
                        resolve(null);
                        return;
                    }
                    resolve(game.ArenaRecordVo.parseRecord($data.battleRecords));
                });
            });
        };
        /** 竞技场扫荡 */
        ArenaProcessor.prototype.battleSweep = function (info) {
            var _this = this;
            var args = {};
            args[Protocol.game_arena_arenaSweep.args.targetId] = info.playerId;
            args[Protocol.game_arena_arenaSweep.args.targetRank] = info.rank;
            args[Protocol.game_arena_arenaSweep.args.selfRank] = info.myRank;
            PLC.request(Protocol.game_arena_arenaSweep, args, function ($data, msg) {
                if (!$data)
                    return;
                // let reportData = $data.battleReport.reportData;
                // if (!reportData) return;
                $data['name'] = info.name;
                // this.doPlayback($data, new ArenaEvent(ArenaEvent.ARENA_CHALLENGE_END), null, info);
                var vo = _this.getVo($data, null, null, info);
                vo.eventdata.type = game.ArenaBattleType.SWEEP;
                UIMgr.showUI(UIConst.ArenaSuccView, vo);
            });
        };
        /**竞技场战斗开始 */
        ArenaProcessor.prototype.battleStart = function (info) {
            var _this = this;
            // if (App.hero.arenaNum <= 0) {
            // 	this.buyBattleCnt();
            // 	showToast(LanMgr.getLan(`挑战次数不足！`, -1));
            // 	return;
            // }
            // if (this.ArenaView.getChallengeFailCD() > 0) {
            // 	this.clearArenaCd();
            // 	showToast(LanMgr.getLan(`竞技场冷却时间中，无法挑战`, -1));
            // 	return;
            // }
            var args = {};
            args[Protocol.game_arena_battleStart.args.targetId] = info.playerId;
            args[Protocol.game_arena_battleStart.args.targetRank] = info.rank;
            args[Protocol.game_arena_battleStart.args.selfRank] = info.myRank;
            PLC.request(Protocol.game_arena_battleStart, args, function ($data, msg) {
                if (!$data)
                    return;
                var reportData = $data.battleReport.reportData;
                if (!reportData)
                    return;
                $data['name'] = info.name;
                _this.doPlayback($data, new game.ArenaEvent(game.ArenaEvent.ARENA_CHALLENGE_END), null, info);
            });
        };
        /**获取竞技场战报 */
        ArenaProcessor.prototype.getBattleReport = function (data) {
            var _this = this;
            var args = {};
            args[Protocol.center_arena_getBattleReport.args.idx] = data.id;
            PLC.request(Protocol.center_arena_getBattleReport, args, function ($data, msg) {
                if (!$data)
                    return;
                var reportData = $data.battleReport.reportData;
                if (!reportData)
                    return;
                $data['name'] = data.name;
                _this.doPlayback($data, new game.ArenaEvent(game.ArenaEvent.LOOK_REPORT_END), data, null);
            });
        };
        ArenaProcessor.prototype.getVo = function ($data, event, arenaRecordVo, info) {
            var vo = new game.FightVo();
            vo.arenaReportVo = new game.ArenaReportVo($data, arenaRecordVo);
            if (info) {
                vo.arenaReportVo.head = info.head;
                vo.arenaReportVo.level = info.level;
                vo.arenaReportVo.force = info.force;
                vo.arenaReportVo.targetforce = 0;
                vo.arenaReportVo.headFrame = info.headFrame;
            }
            else if (arenaRecordVo) {
                vo.arenaReportVo.head = arenaRecordVo.head;
                vo.arenaReportVo.level = arenaRecordVo.level;
                vo.arenaReportVo.force = arenaRecordVo.getForce();
                vo.arenaReportVo.targetforce = arenaRecordVo.getTagForce();
                vo.arenaReportVo.headFrame = arenaRecordVo.headFrame;
            }
            if (event && event.type == game.ArenaEvent.LOOK_REPORT_END) {
                vo.copyType = CopyType.jingji_record;
            }
            else {
                vo.copyType = CopyType.jingji_pve;
            }
            var serverPage = new game.ServerPage();
            if ($data.battleReport) {
                serverPage.initPage($data.battleReport.reportData);
                logzhanbao($data.battleReport.reportData);
            }
            var isWin = arenaRecordVo ? arenaRecordVo.isWin : vo.arenaReportVo.isWin;
            serverPage.result = isWin ? playState.VICTORY : playState.FAILURE;
            vo.fightPageControl = serverPage;
            var enterVo = { vo: vo, event: event, eventdata: vo.arenaReportVo };
            return enterVo;
        };
        /** 开始回放 */
        ArenaProcessor.prototype.doPlayback = function ($data, event, arenaRecordVo, info) {
            var vo = this.getVo($data, event, arenaRecordVo, info);
            vo.eventdata.type = game.ArenaBattleType.BATTLE;
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), vo);
        };
        /**购买挑战次数 */
        ArenaProcessor.prototype.buyBattleCnt = function () {
            var _this = this;
            if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyArenaNum) >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum)) {
                if (App.hero.vip >= tb.TB_vip.getMaxVip()) {
                    showToast(LanMgr.getLan("", 10360));
                }
                else {
                    showToast(LanMgr.getLan("", 10361));
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL), [1]);
                }
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {
                type: common.BuyBattleCountView.TYPE_ARENA, callback: function (num) {
                    var arg = {};
                    arg[Protocol.game_arena_buyBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_arena_buyBattleCnt, arg, function ($data, msg) {
                        if (!$data)
                            return;
                        _this.ArenaView.setChallengeNum();
                    });
                }
            });
        };
        /**竞技场清除挑战cd */
        ArenaProcessor.prototype.clearArenaCd = function () {
            // let cost = tb.TB_arena_new_set.getArenaNewSet().clear_cost;//<br/><br/>
            // let img = HtmlUtil.convertHtmlText(`<img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img>`);
            // common.AlertBox.showAlert({
            // 	title: `清除冷却时间`, text: `确定要花费${img}${cost}清除冷却时间?`, confirmCb: () => {
            // 		PLC.request(Protocol.game_arena_clearArenaCd, null, ($data: any, msg: any) => {
            // 			if (!$data) return;
            // 			this.ArenaView.setArenaChallengeCD();
            // 		});
            // 	}
            // });
        };
        /**查看阵容信息 */
        ArenaProcessor.prototype.showLinueView = function (vo) {
            if (vo.isNpc() && vo.tbData) {
                UIMgr.showUI(UIConst.PlayerLineupInfoView, vo);
            }
            else {
                var arg = {};
                arg[Protocol.center_arena_observeArenaPlayer.args.obPlayerId] = vo.playerId;
                PLC.request(Protocol.center_arena_observeArenaPlayer, arg, function ($data, msg) {
                    if (!$data)
                        return;
                    vo.setDefInfo($data.targetDefInfo);
                    UIMgr.showUI(UIConst.PlayerLineupInfoView, vo);
                });
            }
        };
        /**竞技场翻牌 */
        ArenaProcessor.prototype.turnOverCard = function (idx) {
            var _this = this;
            var arg = {};
            arg[Protocol.game_arena_turnOverCard.args.idx] = idx;
            PLC.request(Protocol.game_arena_turnOverCard, arg, function ($data, msg) {
                if (!$data)
                    return;
                Laya.timer.frameOnce(50, _this, function () { UIUtil.showRewardView($data.commonData); });
                _this.ArenaSuccView.setItemListCells($data.cardInfos);
            });
        };
        /**竞技场购买翻牌道具 */
        ArenaProcessor.prototype.buyCardItems = function (idx) {
            var _this = this;
            var arg = {};
            arg[Protocol.game_arena_turnOverCard.args.idx] = idx;
            PLC.request(Protocol.game_arena_buyCardItems, arg, function ($data, msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                _this.ArenaSuccView.setItemListCellById(idx);
            });
        };
        Object.defineProperty(ArenaProcessor.prototype, "ArenaView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.ArenaView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArenaProcessor.prototype, "ArenaViewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.ArenaView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArenaProcessor.prototype, "ArenaSuccView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.ArenaSuccView);
            },
            enumerable: true,
            configurable: true
        });
        return ArenaProcessor;
    }(tl3d.Processor));
    game.ArenaProcessor = ArenaProcessor;
})(game || (game = {}));
