/**
* name 
*/
module game {
    export class GuajiProcessor extends tl3d.Processor {

        private _model: GuajiModel;
        constructor() {
            super();
            this._model = GuajiModel.getInstance();
        }

        public getName(): string {
            return "GuajiProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GuajiEvent(GuajiEvent.SHOW_GUAJI_PANEL),
                new GuajiEvent(GuajiEvent.GUANQIA_STEP_COMPLETE),
                new GuajiEvent(GuajiEvent.SHOW_GUAJISHOUYI),
                new GuajiEvent(GuajiEvent.SHOW_SHOUYI_UP_VIEW),
                new GuajiEvent(GuajiEvent.SHOW_FAST_BATTLE),
                new GuajiEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT),
                new GuajiEvent(GuajiEvent.UPDATE_LASTGET_AFKTIME),
                new GuajiEvent(GuajiEvent.ENTER_FIGHT_EVENT),
                new GuajiEvent(GuajiEvent.SHOW_JINAGLI_PANEL),
                new GuajiEvent(GuajiEvent.GUAJI_DROP_ITEM),
                new GuajiEvent(GuajiEvent.PLAYER_TALK_SHOW),
                new GuajiEvent(GuajiEvent.CHANGE_GUAJI_BTN),
                new GuajiEvent(GuajiEvent.SET_ANGER),
                new GuajiEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO),
                new GuajiEvent(GuajiEvent.CHANGE_ROUND),
                new GuajiEvent(GuajiEvent.REFRESH_TITLE_EVENT),
                new GuajiEvent(GuajiEvent.CLEAR_ARTIFACE),
                new GuajiEvent(GuajiEvent.SET_FIGHT_BLACK_BG),
                new GuajiEvent(GuajiEvent.PLAY_SKILL_EFF),
                new GuajiEvent(GuajiEvent.INIT_ARTIFACE),
                // new GuajiEvent(GuajiEvent.CHANGE_GOD_EVENT),
                new GodEvent(GodEvent.BUZHEN_COMPLETE),
                new GodEvent(GodEvent.WEAR_SUCCESS),
                new GuideEvent(GuideEvent.GUIDE_END),
                new GuideEvent(GuideEvent.UPDATE_GUIDE_STATUS),
                new GuideEvent(GuajiEvent.CLOSE_SHOUCHONG_TIPS),
                new ResEvent(ResEvent.ROLE_LEVEL_CHANGE),
                // new HudEvent(HudEvent.UPDATE_POWER),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof GuajiEvent) {
                switch ($event.type) {
                    case GuajiEvent.SHOW_GUAJI_PANEL:
                        this.showGuaji($event.data);
                        break;
                    case GuajiEvent.GUANQIA_STEP_COMPLETE:
                        this.guankaStepComplete();
                        break;
                    case GuajiEvent.SHOW_FAST_BATTLE:
                        UIMgr.showUI(UIConst.Guaji_FastView);
                        break;
                    case GuajiEvent.UPDATE_LASTGET_AFKTIME:
                        this.updateLastAfkTime();
                        break;
                    case GuajiEvent.ENTER_FIGHT_EVENT:
                        this.enterGame($event.data);
                        break;
                    case GuajiEvent.CLEAR_ARTIFACE:
                        this.clearArtiface();
                        break;
                    case GuajiEvent.UPDATE_ZHANGJIE_EVENT:
                        this.updataZhangjie();
                        break;
                    case GuajiEvent.SHOW_JINAGLI_PANEL:
                        this.showjiangli($event.data);
                        break;
                    case GuajiEvent.GUAJI_DROP_ITEM:
                        this.showDropItem($event.data);
                        break;
                    case GuajiEvent.CHANGE_GUAJI_BTN:
                        this.changeGuajiBtn();
                        break;
                    case GuajiEvent.UPDATE_FUWEN_COPY_INFO:
                        this.updateGuajiShouyi();
                        break;
                    case GuajiEvent.SET_ANGER:
                        this.setanger($event.data);
                        break;
                    case GuajiEvent.SHOW_SHOUYI_UP_VIEW:
                        this.updataJindu();
                        Laya.timer.frameOnce(10, this, () => {
                            this.showShouyiUpView();
                        });
                        break;
                    case GuajiEvent.PLAYER_TALK_SHOW:
                        this.playerTalkShow($event.data);
                        break;
                    case GuajiEvent.CHANGE_ROUND:
                        this.setRoundText($event.data);
                        break;
                    case GuajiEvent.REFRESH_TITLE_EVENT:
                        this.refreshTitle();
                        break;
                    case GuajiEvent.SET_FIGHT_BLACK_BG:
                        this.setFightBg($event.data);
                        break;
                    case GuajiEvent.CLOSE_SHOUCHONG_TIPS:
                        this.closeShouchongTip();
                        break;
                    case GuajiEvent.INIT_ARTIFACE:
                        this.initartiface($event.data);
                        break;
                    case GuajiEvent.PLAY_SKILL_EFF:
                        this.playSkillEff($event.data);
                        break;
                }
            } else if ($event instanceof GuideEvent) {
                switch ($event.type) {
                    case GuideEvent.GUIDE_END:
                        if (this.viewHasStage) {
                            this.guajiView.showtip();
                        }
                        break;
                    case GuideEvent.UPDATE_GUIDE_STATUS:
                        if (this.viewHasStage) {
                            this.guajiView.showtip();
                            if (GuideWeakManager.isExcuting()) {
                                this.guajiView.closeBossTips();
                            }
                        }
                        break;
                }
            } else if ($event instanceof GodEvent) {
                switch ($event.type) {
                    case GodEvent.BUZHEN_COMPLETE:
                    case GodEvent.WEAR_SUCCESS:
                        if (this.guajiView && this.guajiView.guajiScene) {
                            Laya.timer.frameOnce(5, this, this.buzhenComplete);
                        }
                        break;
                }
            }
            if ($event.type == ResEvent.ROLE_LEVEL_CHANGE) {
                this.changeGuajiBtn();
                this.changeWanfaBtn();
            }

        }

        private playSkillEff(vo){
            if (this.guajiView) {
                this.guajiView.playSkillName(vo.name,vo.icon,vo.team);
            }
        }

        private setFightBg(vis){
            if (this.guajiView) {
                this.guajiView.changeStartBg(vis);
            }
        }

        private clearArtiface() {
            if (this.guajiView) {
                this.guajiView.clearArtifact();
            }
        }

        private setanger(vo: StepVo) {
            if (this.guajiView) {
                this.guajiView.setAnger(vo.camp, vo.anger);
            }
        }

        private initartiface(vo: StepVo) {
            if (this.guajiView) {
                this.guajiView.initArtifact(vo.camp, vo.templateId, vo.anger);
            }
        }

        private refreshTitle() {
            if (this.guajiView) {
                this.guajiView.refreshTitle();
            }
        }

        private setRoundText($round: number) {
            if (this.guajiView) {
                this.guajiView.setRound($round);
            }
        }

        // private setBossIcon() {
        //     if (this.viewHasStage) {
        //         this.guajiView.setBossData();
        //     }
        // }

        private updateGuajiShouyi() {
            if (this.viewHasStage) {
                this.guajiView.setBossData();
            }
        }

        private playerTalkShow($obj) {
            if (this.viewHasStage) {
                this.guajiView.playerTalkShow($obj);
            }
        }

        private showjiangli(data) {
            UIMgr.showUI(UIConst.Lilian_RewardView, data);
        }
        /** 显示收益提升界面 */
        private showShouyiUpView(): void {
            if (!UIMgr.hasStage(UIConst.GuajiView)) return;
            if (GuideManager.isExecuteGuide()) return;
            let list = this._model.getShouyiSpeedList();
            if (list.length > 0) {
                UIMgr.showUI(UIConst.Guaji_ShouyiUpView, list);
            }
        }

        private changeGuajiBtn(): void {
            if (this.guajiView) {
                this.guajiView.changeBtnState();
            }
        }
        private changeWanfaBtn(): void {
            if (UIMgr.hasStage(UIConst.GuajiView)) {
                this.guajiView.updateWanfaBtnState();
            }
        }
        private showDropItem(pos: tl3d.Vector2D): void {
            this.guajiView.playerRewardEff(pos);
        }
        /** 更新当前挂机章节数据 */
        private updataZhangjie() {
            if (this.viewHasStage) {
                this.guajiView.changeBtnState();
                this.guajiView.initZhangjie(true);
                this.guajiView.showtip();
            }
        }

        /** 刷新进度 */
        private updataJindu() {
            if (this.viewHasStage) {
                this.guajiView.setBossData();
            }
        }

        /** 布阵更新成功 */
        private buzhenComplete(): void {
            // GuajiModel.getInstance().isRefresh = true;
            // this.guajiView.guajiScene.createGods();
        }

		/**
		 * 挂机面板
		 * @param show 开启关闭
		 */
        private showGuaji(show: boolean): void {
            if (!show) {
                if (!this.viewHasStage)
                    UIMgr.showUI(UIConst.GuajiView);
            } else {
                UIMgr.hideUIByName(UIConst.GuajiView);
            }
        }

        /** 关卡打完一波怪物 */
        private guankaStepComplete(): void {
            if (this.guajiView) {
                let curGuanka: GuaJiGuanqiaVo = this.guajiView.getGuanKa();
                if (curGuanka) {
                    if (this.viewHasStage) {
                        // logerror("刷新怪物3");
                        // this.guajiView.
                        this.guajiView.moveToTargetGuan(curGuanka, true, true);
                    }
                }
            }
        }

        /** 更新上次领取挂机宝箱奖励的时间 */
        private updateLastAfkTime(): void {
            if (UIMgr.hasStage(UIConst.GuajiView)) {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                view.bottomUI.updateInterval();
            }
        }

        private enterGame($copytabid) {
            let arg = {};
            arg[Protocol.game_copy_clgCopy.args.copyId] = $copytabid;
            PLC.request(Protocol.game_copy_clgCopy, arg, ($data, $msg: string) => {
                if ($msg.length > 0) return;
                if (!$data) return;
                let vo = new FightVo
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
                let page = new NewClientPage();
                page.result = isWin ? playState.VICTORY : playState.FAILURE;
                page.initPage(battleScene.battleReport);
                page.defType = iface.tb_prop.battleObjTypeKey.monster;
                vo.fightPageControl = page;


                let _eventdata = App.hero.level < 15 ? [ModuleConst.FIGHT] : [ModuleConst.FUWEN, $copytabid]
                let enterVo: EnterFightVo = { vo: vo, event: new HudEvent(HudEvent.SHOW_MODULE_VIEW), eventdata: _eventdata };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        }

        closeShouchongTip():void {
            let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
            if(view){
                view.hideShouchongTishi();
            }
            ChongzhiModel.getInstance().lastCloseTime = App.serverTimeSecond;
        }


        public get guajiView(): GuajiView {
            return UIMgr.getUIByName(UIConst.GuajiView);
        }

        public get viewHasStage(): boolean {
            return UIMgr.hasStage(UIConst.GuajiView);
        }

    }
}