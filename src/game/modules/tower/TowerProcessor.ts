
module game {
    export class TowerProcessor extends tl3d.Processor {

        private _model: TowerModel;
        constructor() {
            super();
            this._model = TowerModel.getInstance();
        }

        public getName(): string {
            return "TowerProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TowerEvent(TowerEvent.SHOW_SHILIANTA_PANEL),
                new TowerEvent(TowerEvent.PROGRESS_CHANGE),
                new TowerEvent(TowerEvent.CLICK_GUANQIA),
                new TowerEvent(TowerEvent.CHALLENGE_GUANQIA),
                new TowerEvent(TowerEvent.SHOW_TOWER_JIANGLI),
                new TowerEvent(TowerEvent.SHOW_TOWER_RANK),
                new TowerEvent(TowerEvent.LINGQU_BOSS_JIANGLI),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof TowerEvent) {
                switch ($event.type) {
                    case TowerEvent.SHOW_SHILIANTA_PANEL:
                        this.showView();
                        break;
                    case TowerEvent.PROGRESS_CHANGE:
                        this.renderGuanqia();
                        break;
                    case TowerEvent.CLICK_GUANQIA:
                        this.clickGuanqia($event.data);
                        break;
                    case TowerEvent.CHALLENGE_GUANQIA:
                        this.challengeGuanqia($event.data);
                        break;
                    case TowerEvent.SHOW_TOWER_JIANGLI:
                        this.towerJinagli($event.data);
                        break;
                    case TowerEvent.SHOW_TOWER_RANK:
                        this.towerRank($event.data);
                        break;
                    case TowerEvent.LINGQU_BOSS_JIANGLI:
                        this.bossJiangli($event.data);
                        break;
                }
            }
        }

        /** 展示试炼塔界面 */
        private showView(): void {
            let vo = this._model.putongModel;
            let index = vo.isAllFinish() && !vo.isCanReward() ? 1 : 0;
            this._model.resetTowerData();
            UIMgr.showUI(UIConst.ShiliantaView, index);
        }

        /** 更新关卡 */
        private renderGuanqia(): void {
            if (UIMgr.hasStage(UIConst.ShiliantaView)) {
                let view = UIMgr.getUIByName(UIConst.ShiliantaView) as TowerView;
                view.renderGuanqia();
            }
        }

        /** 点击关卡 */
        private clickGuanqia(guanka: GuanqiaVo): void {
            if (guanka.isPass()) {
                showToast(LanMgr.getLan('', 10018));
                return;
            }
            if (!guanka.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            UIMgr.showUI(UIConst.SLT_GuanqiaView, guanka.tbCopyInfo);
        }

        /** 关卡挑战 */
        private challengeGuanqia(tbCopyInfo: tb.TB_copy_info): void {
            let tbCopy = tb.TB_copy.get_TB_copyById(tbCopyInfo.area);
            let guanka = this._model.getGuanqiaModelVo(tbCopy.sub_type).getGuanqiaVo(tbCopyInfo.ID);
            let power = tbCopyInfo.getConditionVal(CopyConditionType.power);
            if (App.hero.force < power) {
                showToast(LanMgr.getLan('', 10462,power));
                return;
            }
            if (guanka.isPass()) {
                showToast(LanMgr.getLan('', 10018));
                return;
            }
            if (!guanka.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            let modelVo = this._model.getGuanqiaModelVo(guanka.tbCopy.sub_type);
            if (modelVo.isCanReward()) {
                showToast(LanMgr.getLan('', 10032));
                return;
            }
            if (App.hero.level < guanka.getOpenLevel()) {
                showToast(LanMgr.getLan('', 10463, guanka.getOpenLevel()));
                return;
            }

            //开始战斗            
            let vo = new FightVo
            vo.copyType = iface.tb_prop.copyTypeKey.tower;
            vo.tab_copyinfo = guanka.tbCopyInfo;
            vo.tab_copy = tb.TB_copy.get_TB_copyById(vo.tab_copyinfo.area);
            var battleScene = new battle.BattleScenePve(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, vo.getAllRound(), vo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new NewClientPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            page.defType = iface.tb_prop.battleObjTypeKey.monster;
            vo.fightPageControl = page;

            let arg = {};
            arg[Protocol.game_copy_settleTowerCopy.args.copyId] = tbCopyInfo.ID;
            arg[Protocol.game_copy_settleTowerCopy.args.isWin] = isWin;
            PLC.request(Protocol.game_copy_settleTowerCopy, arg, ($data, $msg: string) => {
                if (!$data) return;
                vo.resultData = $data;
                let enterVo: EnterFightVo = { vo: vo, event: new TowerEvent(TowerEvent.SHOW_SHILIANTA_PANEL) };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        }

        /** 试炼塔奖励 */
        private towerJinagli(type: number): void {
            if (!type) type = ShiliantaType.jiandan;
            UIMgr.showUI(UIConst.SLT_JiangliView, type);
        }
        /** 试炼塔排名 */
        private towerRank(type: number): void {
            let arg = {};
            arg[Protocol.game_rank_getRankList.args.rankType] = iface.tb_prop.rankTypeKey.towerCopyFloor;
            PLC.request(Protocol.game_rank_getRankList, arg, (res) => {
                if (res) {
                    this._model.setRankList(res.rankList, res.myRank);
                }
                UIMgr.showUI(UIConst.SLT_RankView, this._model.getRankListVo());
            });
        }

        /** 领取boss奖励 */
        private bossJiangli(data: GuanqiaVo): void {
            if (!data.isBoss) {
                showToast(LanMgr.getLan('', 10034));
                return;
            }
            if (data.isReward()) {
                showToast(LanMgr.getLan('', 10033));
                return;
            }
            let arg = {};
            arg[Protocol.game_copy_getTowerAward.args.copyId] = data.tbCopyInfo.ID;
            PLC.request(Protocol.game_copy_getTowerAward, arg, (res) => {
                if (res) {
                    UIUtil.showRewardView(res.commonData);
                }
            });
        }
    }
}