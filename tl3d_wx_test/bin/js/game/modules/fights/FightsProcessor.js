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
    /*
    * FightsProcessor
    */
    var FightsProcessor = /** @class */ (function (_super) {
        __extends(FightsProcessor, _super);
        function FightsProcessor() {
            return _super.call(this) || this;
        }
        FightsProcessor.prototype.getName = function () {
            return "FightsProcessor";
        };
        //监听事件
        FightsProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.FightsEvent(game.FightsEvent.FIGHT_END),
                new game.FightsEvent(game.FightsEvent.CHANGE_BOSSBLOOD),
                new game.FightsEvent(game.FightsEvent.CHANGE_BOSSANGER),
                new game.FightsEvent(game.FightsEvent.CHANGE_ACTIONBAR),
                new game.FightsEvent(game.FightsEvent.CHANGE_BOSSBUFF),
                new game.FightsEvent(game.FightsEvent.CHANGE_BOSSLEV),
                new game.FightsEvent(game.FightsEvent.INIT_ARTIFACE),
                new game.FightsEvent(game.FightsEvent.REFRESH_TITLE_EVENT),
                new game.FightsEvent(game.FightsEvent.HIDE_TITLE_EVENT),
                new game.FightsEvent(game.FightsEvent.SHOW_START_BG),
                new game.FightsEvent(game.FightsEvent.SET_ANGER),
                new game.FightsEvent(game.FightsEvent.CLEAR_ARTIFACE),
                new game.FightsEvent(game.FightsEvent.SET_ROUND_TEXT),
                new game.FightsEvent(game.FightsEvent.GLORY_RESULT_EVENT),
                new game.FightsEvent(game.FightsEvent.INIT_SPEED),
                new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT),
                new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT),
                new game.FightsEvent(game.FightsEvent.PLAY_SKILL_EFF),
                new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT),
                new game.FightsEvent(game.FightsEvent.REPLAY_GAME_EVENT),
                new game.FightsEvent(game.FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT),
                new game.FightsEvent(game.FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT),
            ];
        };
        //处理事件
        FightsProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.FightsEvent) {
                switch (event.type) {
                    case game.FightsEvent.FIGHT_END:
                        Laya.timer.callLater(this, this.fightend);
                        // this.fightend();
                        break;
                    case game.FightsEvent.CHANGE_BOSSBLOOD:
                        if (event.data != null) {
                            this.changeBossBlood(event.data);
                        }
                        break;
                    case game.FightsEvent.CHANGE_BOSSANGER:
                        if (event.data != null) {
                            this.changeBossAnger(event.data);
                        }
                        break;
                    case game.FightsEvent.CHANGE_ACTIONBAR:
                        if (event.data != null) {
                            this.changeActionBar(event.data.vo);
                        }
                        break;
                    case game.FightsEvent.CHANGE_BOSSLEV:
                        if (event.data != null) {
                            this.changeBossLev(event.data);
                        }
                        break;
                    case game.FightsEvent.CHANGE_BOSSBUFF:
                        this.showBossBuff(event.data);
                        break;
                    case game.FightsEvent.INIT_ARTIFACE:
                        this.initartiface(event.data);
                        break;
                    case game.FightsEvent.SET_ANGER:
                        this.setanger(event.data);
                        break;
                    case game.FightsEvent.REFRESH_TITLE_EVENT:
                        this.refreshTitle();
                        break;
                    case game.FightsEvent.HIDE_TITLE_EVENT:
                        this.hideTitle();
                        break;
                    case game.FightsEvent.SET_ROUND_TEXT:
                        this.setRoundText(event.data);
                        break;
                    case game.FightsEvent.CLEAR_ARTIFACE:
                        this.clearArtiface();
                        break;
                    case game.FightsEvent.INIT_SPEED:
                        this.initSpeed();
                        break;
                    case game.FightsEvent.ENTER_FIGHT_EVENT:
                        this.enterFight(event.data);
                        break;
                    case game.FightsEvent.GLORY_RESULT_EVENT:
                        this.showGloryResult(event.data);
                        break;
                    case game.FightsEvent.EXIT_FIGHT_EVENT:
                        this.exitFight(event.data);
                        break;
                    case game.FightsEvent.SHOW_RESULT_EVENT:
                        this.showResultView(event.data);
                        break;
                    case game.FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT:
                        this.showGuildCopyResultView(event.data);
                        break;
                    case game.FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT:
                        this.showGodDomainResultView(event.data);
                        break;
                    case game.FightsEvent.SHOW_START_BG:
                        this.showStartBg();
                        break;
                    case game.FightsEvent.PLAY_SKILL_EFF:
                        this.playSkillEff(event.data);
                        break;
                    case game.FightsEvent.REPLAY_GAME_EVENT:
                        this.replayGame(event.data);
                        break;
                }
            }
        };
        FightsProcessor.prototype.replayGame = function (vo) {
            if (this.fightview) {
                this.fightview.exitView();
                this.fightview.dataSource = vo;
                this.fightview.setData(vo);
            }
        };
        FightsProcessor.prototype.playSkillEff = function (vo) {
            if (this.fightview) {
                this.fightview.playSkillName(vo.name, vo.icon, vo.team);
            }
        };
        FightsProcessor.prototype.showStartBg = function () {
            if (!this.fightview) {
                return;
            }
            this.fightview.showStartBg();
        };
        FightsProcessor.prototype.showGuildCopyResultView = function ($vo) {
            if (!this.fightview) {
                return;
            }
            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            UIMgr.showUI(UIConst.FightGuildCopyResultView, $vo);
            // 弹出胜利或者失败的时候需要关闭战斗时的弹窗
            UIMgr.hideUIByName(UIConst.PlayerLineupInfoView);
            UIMgr.hideUIByName(UIConst.GuaiwuxinxiView);
            UIMgr.hideUIByName(UIConst.FightTishiView);
        };
        FightsProcessor.prototype.showResultView = function ($vo) {
            if (!this.fightview) {
                return;
            }
            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            // setTimeout(() => {
            if ($vo.type == playState.VICTORY) {
                if ($vo.copyVo && $vo.copyVo.vo && $vo.copyVo.vo.copyType == CopyType.qiecuo) {
                    UIMgr.showUI(UIConst.FightVictoryQc, $vo);
                }
                else {
                    UIMgr.showUI(UIConst.FightVictory, $vo);
                }
            }
            else {
                UIMgr.showUI(UIConst.FightFailure, $vo);
            }
            // 弹出胜利或者失败的时候需要关闭战斗时的弹窗
            UIMgr.hideUIByName(UIConst.PlayerLineupInfoView);
            UIMgr.hideUIByName(UIConst.GuaiwuxinxiView);
            UIMgr.hideUIByName(UIConst.FightTishiView);
            // }, 500);
        };
        /** 激战神域结果 */
        FightsProcessor.prototype.showGodDomainResultView = function ($vo) {
            if (!this.fightview) {
                return;
            }
            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            UIMgr.showUI(UIConst.GodDm_BattleResultView, $vo);
        };
        FightsProcessor.prototype.showGloryResult = function (entervo) {
            if (!this.fightview) {
                return;
            }
            if (!entervo || !entervo.vo)
                return;
            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            var fightVo = entervo.vo;
            if (fightVo.copyType == CopyType.jingji_pve) {
                if (fightVo.fightPageControl.getResult() == playState.VICTORY) {
                    UIMgr.showUI(UIConst.ArenaSuccView, entervo);
                }
                else {
                    UIMgr.showUI(UIConst.ArenaFailView, entervo);
                }
            }
            else if (fightVo.copyType == CopyType.jingji_record) {
                UIMgr.showUI(UIConst.ArenaResultView, entervo);
            }
            else if (fightVo.copyType == CopyType.glory) {
                UIMgr.showUI(UIConst.GloryFightResultView, entervo);
            }
            else if (fightVo.copyType == CopyType.arenaMatch) {
                if (fightVo.arenaMatchVo.isRecord()) {
                    UIMgr.showUI(UIConst.ArenaResultView, entervo);
                }
                else {
                    UIMgr.showUI(UIConst.MatchResultView, entervo);
                }
            }
        };
        FightsProcessor.prototype.exitFight = function (sdata) {
            if (!sdata)
                return;
            var $enterVo = sdata;
            if (!$enterVo)
                return;
            //如果要加入是否打开界面参数，需要在结束界面判断是否满足条件，否则会导致不满足条件时，黑屏
            // if (sdata.isOpen) {
            if ($enterVo.event && $enterVo['flag'] == void 0) {
                var eventdata = $enterVo.hasOwnProperty("eventdata") ? $enterVo.eventdata : null;
                dispatchEvt($enterVo.event, eventdata);
            }
            if (!UIMgr.hasStage(UIConst.HudView)) {
                UIMgr.showUI(UIConst.HudView);
            }
            UIMgr.hideUIByName(UIConst.FightViews);
            // }
        };
        FightsProcessor.prototype.enterFight = function ($obj) {
            logdebug('enterFight:', $obj);
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (this.fightview) {
                this.replayGame($obj);
            }
            else {
                UIMgr.showUI(UIConst.FightViews, $obj);
            }
        };
        FightsProcessor.prototype.initSpeed = function () {
            if (this.fightview) {
                this.fightview.initSpeed();
            }
        };
        FightsProcessor.prototype.clearArtiface = function () {
            if (this.fightview) {
                this.fightview.clearArtifact();
            }
        };
        FightsProcessor.prototype.setRoundText = function ($round) {
            if (this.fightview) {
                this.fightview.setRound($round);
            }
        };
        FightsProcessor.prototype.refreshTitle = function () {
            if (this.fightview) {
                this.fightview.refreshTitle();
            }
        };
        FightsProcessor.prototype.hideTitle = function () {
            if (this.fightview) {
                this.fightview.fightTitle.setVis(false);
            }
        };
        FightsProcessor.prototype.showBossBuff = function (buffary) {
            if (this.fightview) {
                this.fightview.setBossBuff(buffary);
            }
        };
        FightsProcessor.prototype.setanger = function (vo) {
            if (this.fightview) {
                this.fightview.setAnger(vo.camp, vo.anger);
            }
        };
        FightsProcessor.prototype.initartiface = function (vo) {
            if (this.fightview) {
                this.fightview.initArtifact(vo.camp, vo.templateId, vo.anger);
            }
        };
        FightsProcessor.prototype.fightend = function () {
            if (this.fightview) {
                this.fightview.fightEnd();
            }
        };
        FightsProcessor.prototype.changeActionBar = function ($sdata) {
            if (this.fightview) {
                // this.fightview.setActionBar($sdata);
            }
        };
        FightsProcessor.prototype.changeBossBlood = function ($blooddata) {
            if (this.fightview) {
                this.fightview.setBossBlood($blooddata.vo, $blooddata.info);
            }
        };
        FightsProcessor.prototype.changeBossAnger = function ($data) {
            if (this.fightview) {
                this.fightview.setBossAnger($data);
            }
        };
        FightsProcessor.prototype.changeBossLev = function (lev) {
            if (this.fightview) {
                this.fightview.setBossLev(lev);
            }
        };
        Object.defineProperty(FightsProcessor.prototype, "fightview", {
            get: function () {
                var bole = UIMgr.hasStage(UIConst.FightViews);
                return bole ? UIMgr.getUIByName(UIConst.FightViews) : null;
            },
            enumerable: true,
            configurable: true
        });
        return FightsProcessor;
    }(tl3d.Processor));
    game.FightsProcessor = FightsProcessor;
})(game || (game = {}));
