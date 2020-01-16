


module game {
    export class DailyCopyProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "DailyCopyProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new DailyEvent(DailyEvent.SHOW_DAILY_COPY_VIEW),
                new DailyEvent(DailyEvent.CHALLENGE_BOSS),
                new DailyEvent(DailyEvent.CHALLENGE_BOSS_AGAIN),
                new DailyEvent(DailyEvent.SHOW_BUY_VIEW),
                new DailyEvent(DailyEvent.BUY_DAILY_COPY_COUNT),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof DailyEvent) {
                switch ($event.type) {
                    case DailyEvent.SHOW_DAILY_COPY_VIEW:
                        this.showMainView($event.data);
                        break;
                    case DailyEvent.CHALLENGE_BOSS:
                    case DailyEvent.CHALLENGE_BOSS_AGAIN:
                        this.challengeBoss($event.data);
                        break;
                    case DailyEvent.SHOW_BUY_VIEW:
                        this.showBuyView($event.data);
                        break;
                    case DailyEvent.BUY_DAILY_COPY_COUNT:
                        // this.buyCount($event.data);
                        break;
                }
            }

        }
        /** 打开界面 */
        private showMainView(data: any): void {
            UIMgr.showUI(UIConst.Copy_DailyMainView, data);
        }

        /** 挑战 */
        private challengeBoss(dailyVo: DailyCopyInfoVo): void {
            if (UIUtil.checkUnableToEnterFight()) {
                
                return;
            }
            if (dailyVo.isLvLimit()) {
                showToast(LanMgr.getLan('', 10104));
                return;
            }
            let count = App.hero.getOverplusValue(dailyVo.getOverplusType());
            if (count <= 0) {
                // showToast(LanMgr.getLan('', 10105));
                // dispatchEvt(new DailyEvent(DailyEvent.SHOW_BUY_VIEW, dailyVo.type));
                if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, DailyCopyModel.getInstance().getBuyCost(dailyVo.getLimitType()))) {
                    showToast(LanMgr.getLan('', 10105));
                    return;
                }
                let total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum)
                let count = total - App.hero.getlimitValue(dailyVo.getLimitType());
                if (count <= 0) {
                    if (App.hero.vip < tb.TB_vip.getMaxVip()) {
                        showToast(LanMgr.getLan('', 10082));
                    } else {
                        showToast(LanMgr.getLan('', 10260));
                    }
                    return;
                }
            }
            // 扣除次数
            if (App.hero.isPassDailyCopy(dailyVo.tbCopy.ID)) {
                //扫荡
                let arg = {};
                arg[Protocol.game_copy_dailyCopySweep.args.copyId] = dailyVo.tbCopy.ID;
                arg[Protocol.game_copy_dailyCopySweep.args.num] = 1;
                PLC.request(Protocol.game_copy_dailyCopySweep, arg, ($data) => {
                    if (!$data) return;
                    if (this.dailyCopyView) {
                        this.dailyCopyView.updateView();
                    }
                    UIUtil.showRewardView($data.commonData);
                    // this.doFight(dailyVo);
                });
            } else {
                this.doFight(dailyVo);
            }
        }
        private doFight(dailyVo: DailyCopyInfoVo): void {
            let vo = new FightVo
            vo.copyType = CopyType.dailycopy;
            vo.dailyCopyInfo = dailyVo;
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
            arg[Protocol.game_copy_dailyCopyBattle.args.copyId] = dailyVo.tbCopy.ID;
            arg[Protocol.game_copy_dailyCopyBattle.args.isWin] = isWin;
            PLC.request(Protocol.game_copy_dailyCopyBattle, arg, ($data,msg) => {
                if (!$data) return;
                vo.resultData = $data;
                if (this.dailyCopyView) {
                    this.dailyCopyView.updateView();
                }
                let enterVo: EnterFightVo = { vo: vo, event: new DailyEvent(DailyEvent.SHOW_DAILY_COPY_VIEW), eventdata: dailyVo.getCopyType() };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });

        }

        // /** 展示购买界面 */
        // private showBuyView(copyType: number): void {
        //     UIMgr.showUI(UIConst.Copy_DailyBuyView, copyType);
        // }
        /** 购买次数 */
        private showBuyView(copyType: number): void {
            let model = DailyCopyModel.getInstance();
            let limitType = model.getLimitType(copyType);
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, model.getBuyCost(limitType))) {
                showToast(LanMgr.getLan('', 10105));
                return;
            }
            let total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum)
            let count = total - App.hero.getlimitValue(limitType);
            if (count <= 0) {
                if (App.hero.vip < tb.TB_vip.getMaxVip()) {
                    showToast(LanMgr.getLan('', 10082));
                } else {
                    showToast(LanMgr.getLan('', 10260));
                }
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {
                type: model.getBuyBattleType(copyType), callback: (num: number) => {
                    let args = {};
                    args[Protocol.game_common_buyDailyCopyBattleCnt.args.type] = copyType;
                    args[Protocol.game_common_buyDailyCopyBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_common_buyDailyCopyBattleCnt, args, ($data) => {
                        if (!$data) return;
                        if (this.dailyCopyView) {
                            this.dailyCopyView.updateView();
                        }
                        UIMgr.hideUIByName(UIConst.Copy_DailyBuyView);
                    });
                }
            });

        }

        get dailyCopyView(): DailyCopyView {
            return UIMgr.getUIByName(UIConst.Copy_DailyView);
        }
    }
}