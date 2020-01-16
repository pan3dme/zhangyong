


module game {
    export class YuanzhengProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "YuanzhengProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new YuanzhengEvent(YuanzhengEvent.SHOW_MAIN_VIEW),
                new YuanzhengEvent(YuanzhengEvent.SHOW_RECOVERY_VIEW),
                new YuanzhengEvent(YuanzhengEvent.SHOW_CHALLENGE_VIEW),
                new YuanzhengEvent(YuanzhengEvent.SHOW_SHOP_VIEW),
                new YuanzhengEvent(YuanzhengEvent.SHOW_HELP_VIEW),
                new YuanzhengEvent(YuanzhengEvent.GOTO_SET_LINUEP),
                new YuanzhengEvent(YuanzhengEvent.GUANQIA_CHALLENGE),
                new YuanzhengEvent(YuanzhengEvent.GUANQIA_REWARD),
                new YuanzhengEvent(YuanzhengEvent.RECOVERY_GOD),
                new YuanzhengEvent(YuanzhengEvent.UPDATE_VIEW),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof YuanzhengEvent) {
                switch ($event.type) {
                    case YuanzhengEvent.SHOW_MAIN_VIEW:
                        this.showMainView();
                        break;
                    case YuanzhengEvent.SHOW_RECOVERY_VIEW:
                        this.showRecoveryView($event.data);
                        break;
                    case YuanzhengEvent.SHOW_CHALLENGE_VIEW:
                        this.showChallengeView($event.data);
                        break;
                    case YuanzhengEvent.SHOW_SHOP_VIEW:
                        this.showShopView($event.data);
                        break;
                    case YuanzhengEvent.SHOW_HELP_VIEW:
                        this.showHelpView();
                        break;
                    case YuanzhengEvent.GOTO_SET_LINUEP:
                        this.gotoBuzhen($event.data);
                        break;
                    case YuanzhengEvent.GUANQIA_CHALLENGE:
                        this.challengeGuanqia();
                        break;
                    case YuanzhengEvent.GUANQIA_REWARD:
                        this.rewardGuanqia($event.data);
                        break;
                    case YuanzhengEvent.RECOVERY_GOD:
                        this.recoveryGod($event.data);
                        break;
                    case YuanzhengEvent.UPDATE_VIEW:
                        this.updateView();
                        break;
                }
            }

        }

        private updateView() {
            if (UIMgr.hasStage(UIConst.YuanzhengView)) {
                let view = UIMgr.getUIByName(UIConst.YuanzhengView) as YuanzhengView;
                view.initView();
            }
        }

        /** 打开界面 */
        private showMainView(): void {
            UIMgr.showUI(UIConst.YuanzhengView);
        }

        /** 展示关卡挑战信息界面 */
        private showChallengeView(info: YZGuanqiaVo): void {
            if (info.isPass()) {
                showToast(LanMgr.getLan('', 10107));
                return;
            }
            if (!info.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            let model = YuanzhengModel.getInstance();
            let challengeVo = model.curChallengeVo;
            if (challengeVo.guanqiaVo != info) {
                logwarn('数据不匹配,不是当前挑战关卡');
                return;
            }
            PLC.request(Protocol.game_expedition_getChallengerInfo, null, ($data) => {
                if (!$data) return;
                model.updateData($data.challengerInfo);
                UIMgr.showUI(UIConst.Yuanzheng_ChallengeView, challengeVo);
            });
        }

        /** 展示回复血量或者复活界面 */
        private showRecoveryView(type: number): void {
            let list = YuanzhengModel.getInstance().getGodsByRecoveryType(type);
            if (list.length <= 0) {
                showToast(LanMgr.getLan('', (type == iface.tb_prop.expeditionOpTypeKey.recover ? 10127 : 10128)));
                return;
            }
            UIMgr.showUI(UIConst.Yuanzheng_RecoveryView, type);
        }

        /** 展示商店界面 */
        private showShopView(type: number): void {
            dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.yuanzheng);
        }
        /** 展示援助界面 */
        private showHelpView(): void {
            UIMgr.showUI(UIConst.Yuanzheng_HelpView);
        }

        /** 前往布阵 */
        private gotoBuzhen(info: YZChallengeVo): void {
            dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.expedition);
        }
        /** 关卡挑战 */
        private challengeGuanqia(): void {
            if (UIUtil.checkUnableToEnterFight(iface.tb_prop.lineupTypeKey.expedition)) {
                return;
            }
            let vo = new FightVo
            vo.copyType = CopyType.yuanzhenCopy;
            vo.yuanzhengCopyVo = YuanzhengModel.getInstance().curChallengeVo;
            var battleScene = new battle.BattleScenePvp(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, vo.getAllRound(), vo.getTeamHp());
            // vo.fightPageControl = new ClientPage();
            // vo.fightPageControl.initPage(battleScene);

            battleScene.start();

            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new NewClientPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            page.defType = iface.tb_prop.battleObjTypeKey.god;
            vo.fightPageControl = page;
            vo.fightPageControl.lossHpObj = battleScene.getLossHpObj();
            vo.fightPageControl.maxHpObj = battleScene.getMaxHpObj();

            let enterVo: EnterFightVo = { vo: vo, event: new YuanzhengEvent(YuanzhengEvent.SHOW_MAIN_VIEW) };
            dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        }


        /** 领取关卡奖励 */
        private rewardGuanqia(itemRender: YZBaoxiangIR): void {
            let info = itemRender.dataSource;
            if (!info) return;
            if (info.isCanReward()) {
                let args = {};
                args[Protocol.game_expedition_getBoxReward.args.id] = info.tbCopy.ID;
                PLC.request(Protocol.game_expedition_getBoxReward, args, ($data: any) => {
                    if (!$data) return;
                    App.hero.updateCopyInfo($data);
                    UIUtil.showRewardView($data.commonData);
                    itemRender.refreshView();
                });
            } else {
                UIMgr.showUI(UIConst.ManyItemsTip, {data:info.tbCopy.getBoxRewardList()});
            }
        }

        /** 回复血量或复活英雄 */
        private recoveryGod(info: any): void {
            let model = YuanzhengModel.getInstance();
            let type = info.type;
            let godVo = info.godVo as GodItemVo;
            if (type == iface.tb_prop.expeditionOpTypeKey.recover && App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui) <= 0) {
                let cost = LanMgr.getLan(``,10307,model.getMedicineCost(CostTypeKey.huifu_yaoshui)) + `<img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img>` + LanMgr.getLan(``,10498);
                common.AlertBox.showAlert({
                    text: cost, confirmCb: () => {
                        this.buyYaoshui(info);
                    }, parm: null, yes: LanMgr.getLan(``,10499)
                });
                return;
            } else if (type == iface.tb_prop.expeditionOpTypeKey.revive && App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui) <= 0) {

                let cost = LanMgr.getLan(``,10307,model.getMedicineCost(CostTypeKey.fuhuo_yaoshui)) + `<img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img>` + LanMgr.getLan(``,10498);
                common.AlertBox.showAlert({
                    text: cost, confirmCb: () => {
                        this.buyYaoshui(info);
                    }, parm: null, yes: LanMgr.getLan(``,10499)
                });
                return;
            }

            let args = {};
            args[Protocol.game_expedition_expeditionGodOperate.args.godId] = godVo.uuid;
            args[Protocol.game_expedition_expeditionGodOperate.args.opType] = type;
            PLC.request(Protocol.game_expedition_expeditionGodOperate, args, ($data: any) => {
                if (!$data) return;
                showToast(LanMgr.getLan('', (type == iface.tb_prop.expeditionOpTypeKey.recover ? 10115 : 10116)));
                App.hero.updateCopyInfo($data);
                let view = UIMgr.getUIByName(UIConst.Yuanzheng_RecoveryView) as YZHuifuView;
                if (view) {
                    view.delItem();
                }
            });
        }

        /** 购买药水 */
        private buyYaoshui(info: any): void {
            let type = info.type;
            let godVo = info.godVo as GodItemVo;
            let cost = YuanzhengModel.getInstance().getMedicineCost(type);
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, cost)) {
                return;
            }
            let itemId = type == iface.tb_prop.expeditionOpTypeKey.recover ? CostTypeKey.huifu_yaoshui : CostTypeKey.fuhuo_yaoshui;
            let args = {};
            args[Protocol.game_shop_specialItemBuy.args.id] = itemId;
            PLC.request(Protocol.game_shop_specialItemBuy, args, ($data: any) => {
                if (!$data) return;
                this.recoveryGod(info);
            });
        }

        get yuanzhengView(): YuanzhengView {
            return UIMgr.getUIByName(UIConst.YuanzhengView);
        }
    }
}