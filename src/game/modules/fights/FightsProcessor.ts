module game {
    /*
    * FightsProcessor
    */
    export class FightsProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        public getName(): string {
            return "FightsProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new FightsEvent(FightsEvent.FIGHT_END),
                new FightsEvent(FightsEvent.CHANGE_BOSSBLOOD),
                new FightsEvent(FightsEvent.CHANGE_BOSSANGER),
                new FightsEvent(FightsEvent.CHANGE_ACTIONBAR),
                new FightsEvent(FightsEvent.CHANGE_BOSSBUFF),
                new FightsEvent(FightsEvent.CHANGE_BOSSLEV),
                new FightsEvent(FightsEvent.INIT_ARTIFACE),
                new FightsEvent(FightsEvent.REFRESH_TITLE_EVENT),
                new FightsEvent(FightsEvent.HIDE_TITLE_EVENT),
                new FightsEvent(FightsEvent.SHOW_START_BG),
                new FightsEvent(FightsEvent.SET_ANGER),
                new FightsEvent(FightsEvent.CLEAR_ARTIFACE),
                new FightsEvent(FightsEvent.SET_ROUND_TEXT),
                new FightsEvent(FightsEvent.GLORY_RESULT_EVENT),
                new FightsEvent(FightsEvent.INIT_SPEED),
                new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT),
                new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT),
                new FightsEvent(FightsEvent.PLAY_SKILL_EFF),
                new FightsEvent(FightsEvent.SHOW_RESULT_EVENT),
                new FightsEvent(FightsEvent.REPLAY_GAME_EVENT),
                new FightsEvent(FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT),
                new FightsEvent(FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof FightsEvent) {
                switch (event.type) {
                    case FightsEvent.FIGHT_END:
                        Laya.timer.callLater(this, this.fightend);
                        // this.fightend();
                        break;
                    case FightsEvent.CHANGE_BOSSBLOOD:
                        if (event.data != null) {
                            this.changeBossBlood(event.data);
                        }
                        break;
                    case FightsEvent.CHANGE_BOSSANGER:
                        if (event.data != null) {
                            this.changeBossAnger(event.data);
                        }
                        break;
                    case FightsEvent.CHANGE_ACTIONBAR:
                        if (event.data != null) {
                            this.changeActionBar(event.data.vo);
                        }
                        break;
                    case FightsEvent.CHANGE_BOSSLEV:
                        if (event.data != null) {
                            this.changeBossLev(event.data);
                        }
                        break;
                    case FightsEvent.CHANGE_BOSSBUFF:
                        this.showBossBuff(event.data);
                        break;
                    case FightsEvent.INIT_ARTIFACE:
                        this.initartiface(event.data);
                        break;
                    case FightsEvent.SET_ANGER:
                        this.setanger(event.data);
                        break;
                    case FightsEvent.REFRESH_TITLE_EVENT:
                        this.refreshTitle();
                        break;
                    case FightsEvent.HIDE_TITLE_EVENT:
                        this.hideTitle();
                        break;
                    case FightsEvent.SET_ROUND_TEXT:
                        this.setRoundText(event.data);
                        break;
                    case FightsEvent.CLEAR_ARTIFACE:
                        this.clearArtiface();
                        break;
                    case FightsEvent.INIT_SPEED:
                        this.initSpeed();
                        break;
                    case FightsEvent.ENTER_FIGHT_EVENT:
                        this.enterFight(event.data);
                        break;
                    case FightsEvent.GLORY_RESULT_EVENT:
                        this.showGloryResult(event.data);
                        break;
                    case FightsEvent.EXIT_FIGHT_EVENT:
                        this.exitFight(event.data);
                        break;
                    case FightsEvent.SHOW_RESULT_EVENT:
                        this.showResultView(event.data);
                        break;
                    case FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT:
                        this.showGuildCopyResultView(event.data);
                        break;
                    case FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT:
                        this.showGodDomainResultView(event.data);
                        break;
                    case FightsEvent.SHOW_START_BG:
                        this.showStartBg();
                        break;
                    case FightsEvent.PLAY_SKILL_EFF:
                        this.playSkillEff(event.data);
                        break;
                    case FightsEvent.REPLAY_GAME_EVENT:
                        this.replayGame(event.data);
                        break;
                }
            }
        }

        private replayGame(vo) {
            if (this.fightview) {
                this.fightview.exitView();
                this.fightview.dataSource = vo;
                this.fightview.setData(vo);
            }
        }

        private playSkillEff(vo) {
            if (this.fightview) {
                this.fightview.playSkillName(vo.name, vo.icon, vo.team);
            }
        }

        private showStartBg() {
            if (!this.fightview) {
                return;
            }
            this.fightview.showStartBg();
        }

        private showGuildCopyResultView($vo): void {
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
        }

        private showResultView($vo) {
            if (!this.fightview) {
                return;
            }

            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            // setTimeout(() => {
            if ($vo.type == playState.VICTORY) {
                if ($vo.copyVo && $vo.copyVo.vo && $vo.copyVo.vo.copyType == CopyType.qiecuo) {
                    UIMgr.showUI(UIConst.FightVictoryQc, $vo);
                } else {
                    UIMgr.showUI(UIConst.FightVictory, $vo);
                }
            } else {
                UIMgr.showUI(UIConst.FightFailure, $vo);
            }
            // 弹出胜利或者失败的时候需要关闭战斗时的弹窗
            UIMgr.hideUIByName(UIConst.PlayerLineupInfoView);
            UIMgr.hideUIByName(UIConst.GuaiwuxinxiView);
            UIMgr.hideUIByName(UIConst.FightTishiView);
            // }, 500);
        }
        /** 激战神域结果 */
        private showGodDomainResultView($vo): void {
            if (!this.fightview) {
                return;
            }
            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            UIMgr.showUI(UIConst.GodDm_BattleResultView, $vo);
        }


        private showGloryResult(entervo: EnterFightVo) {
            if (!this.fightview) {
                return;
            }
            if (!entervo || !entervo.vo) return;
            //在弹出战斗结算界面时，所有弹窗都关闭
            common.AlertBox.close();
            let fightVo = entervo.vo;
            if (fightVo.copyType == CopyType.jingji_pve) {
                if (fightVo.fightPageControl.getResult() == playState.VICTORY) {
                    UIMgr.showUI(UIConst.ArenaSuccView, entervo);
                } else {
                    UIMgr.showUI(UIConst.ArenaFailView, entervo);
                }
            } else if (fightVo.copyType == CopyType.jingji_record) {
                UIMgr.showUI(UIConst.ArenaResultView, entervo);
            } else if (fightVo.copyType == CopyType.glory) {
                UIMgr.showUI(UIConst.GloryFightResultView, entervo);
            } else if (fightVo.copyType == CopyType.arenaMatch) {
                if (fightVo.arenaMatchVo.isRecord()) {
                    UIMgr.showUI(UIConst.ArenaResultView, entervo);
                } else {
                    UIMgr.showUI(UIConst.MatchResultView, entervo);
                }
            }
        }

        private exitFight(sdata: any) {
            if (!sdata) return;
            let $enterVo: EnterFightVo = sdata;
            if (!$enterVo) return;

            //如果要加入是否打开界面参数，需要在结束界面判断是否满足条件，否则会导致不满足条件时，黑屏
            // if (sdata.isOpen) {
            if ($enterVo.event && $enterVo['flag'] == void 0) {
                let eventdata = $enterVo.hasOwnProperty("eventdata") ? $enterVo.eventdata : null;
                dispatchEvt($enterVo.event, eventdata);
            }
            if (!UIMgr.hasStage(UIConst.HudView)) {
                UIMgr.showUI(UIConst.HudView);
            }
            UIMgr.hideUIByName(UIConst.FightViews);
            // }
        }

        private enterFight($obj: EnterFightVo) {
            logdebug('enterFight:', $obj);
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (this.fightview) {
                this.replayGame($obj);
            } else {
                UIMgr.showUI(UIConst.FightViews, $obj);
            }
        }

        private initSpeed() {
            if (this.fightview) {
                this.fightview.initSpeed();
            }
        }

        private clearArtiface() {
            if (this.fightview) {
                this.fightview.clearArtifact();
            }
        }

        private setRoundText($round: number) {
            if (this.fightview) {
                this.fightview.setRound($round);
            }
        }

        private refreshTitle() {
            if (this.fightview) {
                this.fightview.refreshTitle();
            }
        }
        private hideTitle() {
            if (this.fightview) {
                this.fightview.fightTitle.setVis(false);
            }
        }

        private showBossBuff(buffary) {
            if (this.fightview) {
                this.fightview.setBossBuff(buffary);
            }
        }

        private setanger(vo: StepVo) {
            if (this.fightview) {
                this.fightview.setAnger(vo.camp, vo.anger);
            }
        }

        private initartiface(vo: StepVo) {
            if (this.fightview) {
                this.fightview.initArtifact(vo.camp, vo.templateId, vo.anger);
            }
        }

        private fightend() {
            if (this.fightview) {
                this.fightview.fightEnd();
            }
        }

        private changeActionBar($sdata) {
            if (this.fightview) {
                // this.fightview.setActionBar($sdata);
            }
        }

        private changeBossBlood($blooddata) {
            if (this.fightview) {
                this.fightview.setBossBlood($blooddata.vo, $blooddata.info);
            }
        }

        private changeBossAnger($data) {
            if (this.fightview) {
                this.fightview.setBossAnger($data);
            }
        }

        private changeBossLev(lev: number) {
            if (this.fightview) {
                this.fightview.setBossLev(lev);
            }
        }

        public get fightview(): FightView {
            let bole: boolean = UIMgr.hasStage(UIConst.FightViews);
            return bole ? UIMgr.getUIByName(UIConst.FightViews) : null;
        }

    }
}