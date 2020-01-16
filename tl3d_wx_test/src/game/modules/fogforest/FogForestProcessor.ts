

module game {

    export class FogForestProcessor extends tl3d.Processor {

        private _model : FogForestModel;
        constructor() {
            super();
            this._model = FogForestModel.getInstance();
        }
        public getName(): string {
            return "FogForestProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new FogForestEvent(FogForestEvent.SHOW_MAIN_VIEW),
                new FogForestEvent(FogForestEvent.SHOW_REWARD_VIEW),
                new FogForestEvent(FogForestEvent.OPEN_BAOXIANG),
                new FogForestEvent(FogForestEvent.GUANQIA_CHALLENGE),
                new FogForestEvent(FogForestEvent.ONE_KEY_PASS),
                new FogForestEvent(FogForestEvent.UPDATE_VIEW),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof FogForestEvent) {
                switch ($event.type) {
                    case FogForestEvent.SHOW_MAIN_VIEW:
                        this.showMainView();
                        break;
                    case FogForestEvent.SHOW_REWARD_VIEW:
                        this.showRewardView();
                        break;
                    case FogForestEvent.OPEN_BAOXIANG:
                        this.openBaoxiang($event.data);
                        break;
                    case FogForestEvent.GUANQIA_CHALLENGE:
                        this.challenge($event.data);
                        break;
                    case FogForestEvent.ONE_KEY_PASS:
                        this.oneKeyPass();
                        break;
                    case FogForestEvent.UPDATE_VIEW:
                        this._model.initNum();
                        this.initView();
                        break;
                }
            }
        }

        /** 打开界面 */
        private showMainView(): void {
            this._model.firstLogin = false;
            UIMgr.showUI(UIConst.FogForestView);
        }

        private showRewardView(): void {
            UIMgr.showUI(UIConst.FogForestRewardView);
        }

        /** 打开宝箱 */
        private openBaoxiang(itemRender: ForestRewardIR): void {
            let info = itemRender.dataSource;
            if (!info || !info.isCanReward()) {
                showToast(LanMgr.getLan('', 10317));
                return;
            }
            let args = {};
            args[Protocol.game_forest_getChestAward.args.floor] = info.tbForest.ID;
            PLC.request(Protocol.game_forest_getChestAward, args, ($data: any) => {
                if (!$data) return;
                UIUtil.showRewardView($data.commonData);
                itemRender.refreshView();
                let fogForestView = UIMgr.getUIByName(UIConst.FogForestView) as FogForestView;
                // if (fogForestView) fogForestView.refreshBaoxiang();
                let view = UIMgr.getUIByName(UIConst.FogForestRewardView) as ForestRewardView;
                if (view) view.initView();
                //为后面红点设置监听
                dispatchEvt(new FogForestEvent(FogForestEvent.RECEIVE_SUCCESS));
            });
        }

        /** 扫荡 */
        private oneKeyPass(): void {
            let model = this._model;
            /** 是否全部完成 */
            if (model.isMaxFloor()) {
                showToast(LanMgr.getLan('', 10185));
                return;
            }
            /** VIP是否能够开启扫荡迷雾森林 */
            let vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.forest);
            if (!(App.hero.vip >= vipPrivilege.vip_level || (vipPrivilege.para && App.hero.forestMaxFloor >= vipPrivilege.para))) {
                showToast(LanMgr.getLan("", 10318, vipPrivilege.para, vipPrivilege.vip_level));
                return;
            }
            /** 扫荡请求 */
            let args = {};
            PLC.request(Protocol.game_forest_sweepForest, args, ($data: any) => {
                if (!$data) return;
                UIUtil.showRewardView($data.commonData);
                model.forestCurFloor = App.hero.forestMaxFloor;
                this.initView();
                dispatchEvt(new FogForestEvent(FogForestEvent.ALL_PASS_SUCCESS));
            });
        }

        /** 挑战 */
        private challenge(info: ForestGuanqiaVo): void {
            /** 是否全部完成 */
            if (this._model.isAllFinish()) {
                showToast(LanMgr.getLan('', 10185));
                return;
            }
            if(info.isPass()) {
                showToast(LanMgr.getLan('', 10319));
                return;
            }
            if (info.tbForest.need_power > App.hero.force) {
                showToast(LanMgr.getLan('', 10200, info.tbForest.need_power));
                return;
            }

            let vo = new FightVo
            vo.copyType = CopyType.fogForest;
            vo.forestGuanqia = info;
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

            let enterVo: EnterFightVo = { vo: vo, event: new FogForestEvent(FogForestEvent.SHOW_MAIN_VIEW) };
            dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        }

        /** 初始化关卡数据 */
        private initView(): void {
            let fogForestView = UIMgr.getUIByName(UIConst.FogForestView) as FogForestView;
            if (fogForestView) fogForestView.initView();
            if(UIMgr.hasStage(UIConst.SysTopView)){
                let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                view.updateFogforest();
            }
            
        }

    }
}