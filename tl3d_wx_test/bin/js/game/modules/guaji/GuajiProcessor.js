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
    var GuajiProcessor = /** @class */ (function (_super) {
        __extends(GuajiProcessor, _super);
        function GuajiProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.GuajiModel.getInstance();
            return _this;
        }
        GuajiProcessor.prototype.getName = function () {
            return "GuajiProcessor";
        };
        GuajiProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuajiEvent(game.GuajiEvent.SHOW_GUAJI_PANEL),
                new game.GuajiEvent(game.GuajiEvent.GUANQIA_STEP_COMPLETE),
                new game.GuajiEvent(game.GuajiEvent.SHOW_GUAJISHOUYI),
                new game.GuajiEvent(game.GuajiEvent.SHOW_SHOUYI_UP_VIEW),
                new game.GuajiEvent(game.GuajiEvent.SHOW_FAST_BATTLE),
                new game.GuajiEvent(game.GuajiEvent.UPDATE_ZHANGJIE_EVENT),
                new game.GuajiEvent(game.GuajiEvent.UPDATE_LASTGET_AFKTIME),
                new game.GuajiEvent(game.GuajiEvent.ENTER_FIGHT_EVENT),
                new game.GuajiEvent(game.GuajiEvent.SHOW_JINAGLI_PANEL),
                new game.GuajiEvent(game.GuajiEvent.GUAJI_DROP_ITEM),
                new game.GuajiEvent(game.GuajiEvent.PLAYER_TALK_SHOW),
                new game.GuajiEvent(game.GuajiEvent.CHANGE_GUAJI_BTN),
                new game.GuajiEvent(game.GuajiEvent.SET_ANGER),
                new game.GuajiEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO),
                new game.GuajiEvent(game.GuajiEvent.CHANGE_ROUND),
                new game.GuajiEvent(game.GuajiEvent.REFRESH_TITLE_EVENT),
                new game.GuajiEvent(game.GuajiEvent.CLEAR_ARTIFACE),
                new game.GuajiEvent(game.GuajiEvent.SET_FIGHT_BLACK_BG),
                new game.GuajiEvent(game.GuajiEvent.PLAY_SKILL_EFF),
                new game.GuajiEvent(game.GuajiEvent.INIT_ARTIFACE),
                // new GuajiEvent(GuajiEvent.CHANGE_GOD_EVENT),
                new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE),
                new game.GodEvent(game.GodEvent.WEAR_SUCCESS),
                new game.GuideEvent(game.GuideEvent.GUIDE_END),
                new game.GuideEvent(game.GuideEvent.UPDATE_GUIDE_STATUS),
                new game.GuideEvent(game.GuajiEvent.CLOSE_SHOUCHONG_TIPS),
                new game.ResEvent(game.ResEvent.ROLE_LEVEL_CHANGE),
            ];
        };
        //处理事件
        GuajiProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof game.GuajiEvent) {
                switch ($event.type) {
                    case game.GuajiEvent.SHOW_GUAJI_PANEL:
                        this.showGuaji($event.data);
                        break;
                    case game.GuajiEvent.GUANQIA_STEP_COMPLETE:
                        this.guankaStepComplete();
                        break;
                    case game.GuajiEvent.SHOW_FAST_BATTLE:
                        UIMgr.showUI(UIConst.Guaji_FastView);
                        break;
                    case game.GuajiEvent.UPDATE_LASTGET_AFKTIME:
                        this.updateLastAfkTime();
                        break;
                    case game.GuajiEvent.ENTER_FIGHT_EVENT:
                        this.enterGame($event.data);
                        break;
                    case game.GuajiEvent.CLEAR_ARTIFACE:
                        this.clearArtiface();
                        break;
                    case game.GuajiEvent.UPDATE_ZHANGJIE_EVENT:
                        this.updataZhangjie();
                        break;
                    case game.GuajiEvent.SHOW_JINAGLI_PANEL:
                        this.showjiangli($event.data);
                        break;
                    case game.GuajiEvent.GUAJI_DROP_ITEM:
                        this.showDropItem($event.data);
                        break;
                    case game.GuajiEvent.CHANGE_GUAJI_BTN:
                        this.changeGuajiBtn();
                        break;
                    case game.GuajiEvent.UPDATE_FUWEN_COPY_INFO:
                        this.updateGuajiShouyi();
                        break;
                    case game.GuajiEvent.SET_ANGER:
                        this.setanger($event.data);
                        break;
                    case game.GuajiEvent.SHOW_SHOUYI_UP_VIEW:
                        this.updataJindu();
                        Laya.timer.frameOnce(10, this, function () {
                            _this.showShouyiUpView();
                        });
                        break;
                    case game.GuajiEvent.PLAYER_TALK_SHOW:
                        this.playerTalkShow($event.data);
                        break;
                    case game.GuajiEvent.CHANGE_ROUND:
                        this.setRoundText($event.data);
                        break;
                    case game.GuajiEvent.REFRESH_TITLE_EVENT:
                        this.refreshTitle();
                        break;
                    case game.GuajiEvent.SET_FIGHT_BLACK_BG:
                        this.setFightBg($event.data);
                        break;
                    case game.GuajiEvent.CLOSE_SHOUCHONG_TIPS:
                        this.closeShouchongTip();
                        break;
                    case game.GuajiEvent.INIT_ARTIFACE:
                        this.initartiface($event.data);
                        break;
                    case game.GuajiEvent.PLAY_SKILL_EFF:
                        this.playSkillEff($event.data);
                        break;
                }
            }
            else if ($event instanceof game.GuideEvent) {
                switch ($event.type) {
                    case game.GuideEvent.GUIDE_END:
                        if (this.viewHasStage) {
                            this.guajiView.showtip();
                        }
                        break;
                    case game.GuideEvent.UPDATE_GUIDE_STATUS:
                        if (this.viewHasStage) {
                            this.guajiView.showtip();
                            if (game.GuideWeakManager.isExcuting()) {
                                this.guajiView.closeBossTips();
                            }
                        }
                        break;
                }
            }
            else if ($event instanceof game.GodEvent) {
                switch ($event.type) {
                    case game.GodEvent.BUZHEN_COMPLETE:
                    case game.GodEvent.WEAR_SUCCESS:
                        if (this.guajiView && this.guajiView.guajiScene) {
                            Laya.timer.frameOnce(5, this, this.buzhenComplete);
                        }
                        break;
                }
            }
            if ($event.type == game.ResEvent.ROLE_LEVEL_CHANGE) {
                this.changeGuajiBtn();
                this.changeWanfaBtn();
            }
        };
        GuajiProcessor.prototype.playSkillEff = function (vo) {
            if (this.guajiView) {
                this.guajiView.playSkillName(vo.name, vo.icon, vo.team);
            }
        };
        GuajiProcessor.prototype.setFightBg = function (vis) {
            if (this.guajiView) {
                this.guajiView.changeStartBg(vis);
            }
        };
        GuajiProcessor.prototype.clearArtiface = function () {
            if (this.guajiView) {
                this.guajiView.clearArtifact();
            }
        };
        GuajiProcessor.prototype.setanger = function (vo) {
            if (this.guajiView) {
                this.guajiView.setAnger(vo.camp, vo.anger);
            }
        };
        GuajiProcessor.prototype.initartiface = function (vo) {
            if (this.guajiView) {
                this.guajiView.initArtifact(vo.camp, vo.templateId, vo.anger);
            }
        };
        GuajiProcessor.prototype.refreshTitle = function () {
            if (this.guajiView) {
                this.guajiView.refreshTitle();
            }
        };
        GuajiProcessor.prototype.setRoundText = function ($round) {
            if (this.guajiView) {
                this.guajiView.setRound($round);
            }
        };
        // private setBossIcon() {
        //     if (this.viewHasStage) {
        //         this.guajiView.setBossData();
        //     }
        // }
        GuajiProcessor.prototype.updateGuajiShouyi = function () {
            if (this.viewHasStage) {
                this.guajiView.setBossData();
            }
        };
        GuajiProcessor.prototype.playerTalkShow = function ($obj) {
            if (this.viewHasStage) {
                this.guajiView.playerTalkShow($obj);
            }
        };
        GuajiProcessor.prototype.showjiangli = function (data) {
            UIMgr.showUI(UIConst.Lilian_RewardView, data);
        };
        /** 显示收益提升界面 */
        GuajiProcessor.prototype.showShouyiUpView = function () {
            if (!UIMgr.hasStage(UIConst.GuajiView))
                return;
            if (game.GuideManager.isExecuteGuide())
                return;
            var list = this._model.getShouyiSpeedList();
            if (list.length > 0) {
                UIMgr.showUI(UIConst.Guaji_ShouyiUpView, list);
            }
        };
        GuajiProcessor.prototype.changeGuajiBtn = function () {
            if (this.guajiView) {
                this.guajiView.changeBtnState();
            }
        };
        GuajiProcessor.prototype.changeWanfaBtn = function () {
            if (UIMgr.hasStage(UIConst.GuajiView)) {
                this.guajiView.updateWanfaBtnState();
            }
        };
        GuajiProcessor.prototype.showDropItem = function (pos) {
            this.guajiView.playerRewardEff(pos);
        };
        /** 更新当前挂机章节数据 */
        GuajiProcessor.prototype.updataZhangjie = function () {
            if (this.viewHasStage) {
                this.guajiView.changeBtnState();
                this.guajiView.initZhangjie(true);
                this.guajiView.showtip();
            }
        };
        /** 刷新进度 */
        GuajiProcessor.prototype.updataJindu = function () {
            if (this.viewHasStage) {
                this.guajiView.setBossData();
            }
        };
        /** 布阵更新成功 */
        GuajiProcessor.prototype.buzhenComplete = function () {
            // GuajiModel.getInstance().isRefresh = true;
            // this.guajiView.guajiScene.createGods();
        };
        /**
         * 挂机面板
         * @param show 开启关闭
         */
        GuajiProcessor.prototype.showGuaji = function (show) {
            if (!show) {
                if (!this.viewHasStage)
                    UIMgr.showUI(UIConst.GuajiView);
            }
            else {
                UIMgr.hideUIByName(UIConst.GuajiView);
            }
        };
        /** 关卡打完一波怪物 */
        GuajiProcessor.prototype.guankaStepComplete = function () {
            if (this.guajiView) {
                var curGuanka = this.guajiView.getGuanKa();
                if (curGuanka) {
                    if (this.viewHasStage) {
                        // logerror("刷新怪物3");
                        // this.guajiView.
                        this.guajiView.moveToTargetGuan(curGuanka, true, true);
                    }
                }
            }
        };
        /** 更新上次领取挂机宝箱奖励的时间 */
        GuajiProcessor.prototype.updateLastAfkTime = function () {
            if (UIMgr.hasStage(UIConst.GuajiView)) {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                view.bottomUI.updateInterval();
            }
        };
        GuajiProcessor.prototype.enterGame = function ($copytabid) {
            var arg = {};
            arg[Protocol.game_copy_clgCopy.args.copyId] = $copytabid;
            PLC.request(Protocol.game_copy_clgCopy, arg, function ($data, $msg) {
                if ($msg.length > 0)
                    return;
                if (!$data)
                    return;
                var vo = new game.FightVo;
                vo.copyType = iface.tb_prop.copyTypeKey.rune;
                vo.tab_copyinfo = tb.TB_copy_info.get_TB_copy_infoById($copytabid);
                vo.tab_copy = tb.TB_copy.get_TB_copyById(vo.tab_copyinfo.area);
                var battleScene = new battle.BattleScenePve(vo.copyType);
                battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, vo.getAllRound(), vo.getTeamHp());
                // vo.fightPageControl = new ClientPage();
                // vo.fightPageControl.initPage(battleScene);
                battleScene.start();
                var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
                logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
                var page = new game.NewClientPage();
                page.result = isWin ? playState.VICTORY : playState.FAILURE;
                page.initPage(battleScene.battleReport);
                page.defType = iface.tb_prop.battleObjTypeKey.monster;
                vo.fightPageControl = page;
                var _eventdata = App.hero.level < 15 ? [ModuleConst.FIGHT] : [ModuleConst.FUWEN, $copytabid];
                var enterVo = { vo: vo, event: new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), eventdata: _eventdata };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        GuajiProcessor.prototype.closeShouchongTip = function () {
            var view = UIMgr.getUIByName(UIConst.GuajiView);
            if (view) {
                view.hideShouchongTishi();
            }
            game.ChongzhiModel.getInstance().lastCloseTime = App.serverTimeSecond;
        };
        Object.defineProperty(GuajiProcessor.prototype, "guajiView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GuajiView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuajiProcessor.prototype, "viewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.GuajiView);
            },
            enumerable: true,
            configurable: true
        });
        return GuajiProcessor;
    }(tl3d.Processor));
    game.GuajiProcessor = GuajiProcessor;
})(game || (game = {}));
