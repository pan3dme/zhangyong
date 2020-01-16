

module game {

    export class EscortProcessor extends tl3d.Processor {

        private _model : EscortModel;
        constructor() {
            super();
            this._model = EscortModel.getInstance();
        }
        public getName(): string {
            return "EscortProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new EscortEvent(EscortEvent.SHOW_MAIN_VIEW),
                new EscortEvent(EscortEvent.SHOW_CARAVAN_INFO_VIEW),
                new EscortEvent(EscortEvent.SHOW_ESCORT_GOODS_VIEW),
                new EscortEvent(EscortEvent.SHOW_RECORD_VIEW),
                new EscortEvent(EscortEvent.SHOW_RULE_VIEW),
                new EscortEvent(EscortEvent.QUICK_FINISH),
                new EscortEvent(EscortEvent.ROBBED_GOODS),
                new EscortEvent(EscortEvent.REFRESH_GOODS),
                new EscortEvent(EscortEvent.ONEKEY_REFRESH_GOODS),
                new EscortEvent(EscortEvent.ESCORT_GOODS),
                new EscortEvent(EscortEvent.RECEIVE_AWARD),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof EscortEvent) {
                switch ($event.type) {
                    case EscortEvent.SHOW_MAIN_VIEW:
                        this.showView();
                        break;
                    case EscortEvent.SHOW_CARAVAN_INFO_VIEW:
                        this.showCarvanView($event.data);
                        break;
                    case EscortEvent.SHOW_ESCORT_GOODS_VIEW:
                        break;
                    case EscortEvent.SHOW_RECORD_VIEW:
                        this.showRecordView();
                        break;
                    case EscortEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case EscortEvent.QUICK_FINISH:
                        this.quickFinish();
                        break;
                    case EscortEvent.ROBBED_GOODS:
                        this.robbedGoods($event.data);
                        break;
                    case EscortEvent.REFRESH_GOODS:
                        this.refreshGoods();
                        break;
                    case EscortEvent.ONEKEY_REFRESH_GOODS:
                        this.oneKeyGoods();
                        break;
                    case EscortEvent.ESCORT_GOODS:
                        this.escortGoods();
                        break;
                    case EscortEvent.RECEIVE_AWARD:
                        this.receiveAward();
                        break;
                }
            }
        }

        /** 打开界面 */
        private showView(): void {
            UIMgr.showUI(UIConst.EscortMainView);
        }

        /** 打开商队信息界面 */
        private showCarvanView(info: CaravanInfoVo): void {
            if (info.svo.playerId == App.hero.playerId) {
                showToast(LanMgr.getMsgByCode('EscortIsMySelf'));
                return;
            }
            if (this._model.getRobCount() <= 0) {
                showToast(LanMgr.getMsgByCode('RobCountNotEnough'));
                return;
            }
            if (App.serverTimeSecond >= info.svo.endTime) {
                showToast(LanMgr.getLan('', 10166));
                return;
            }
            if (info.svo.robCount >= tb.TB_escort_set.getSet().rob_num) {
                showToast(LanMgr.getLan('', 10165, 2));
                return;
            }
            let arg = {};
            arg[Protocol.center_escort_getTargetInfo.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.center_escort_getTargetInfo, arg, ($data) => {
                if (!$data) return;
                info.setDetailInfo($data.targetInfo);
                UIMgr.showUI(UIConst.CaravanInfoView, info);
            });
        }

        /** 打开记录界面 */
        private showRecordView(): void {
            PLC.request(Protocol.game_escort_getRecordList, null, ($data) => {
                if (!$data) return;
                let recordList: CaravanRecordVo[] = [];
                for (let svo of $data.recordList) {
                    recordList.push(new CaravanRecordVo(svo));
                }
                if (recordList.length <= 0) {
                    showToast(LanMgr.getLan("", 10070));
                    return
                }
                recordList.sort((a, b) => {
                    return b.svo.recordTime - a.svo.recordTime;
                });
                this._model.updateNewRecord(false);
                UIMgr.showUI(UIConst.RobbedRecordView, recordList);
            });
        }

        /** 打开规则界面 */
        private showRuleView(): void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20009));
        }

        /** 快速完成 */
        private quickFinish(): void {
            let model = this._model;
            if (App.serverTimeSecond >= model.endTime) {
                showToast(LanMgr.getLan('', 10175));
                return;
            }
            let cost = tb.TB_escort_set.getSet().complete_cost;
            if (UIUtil.checkNotEnough(cost[0], cost[1])) {
                return;
            }
            PLC.request(Protocol.game_escort_quickEscort, null, ($data) => {
                if (!$data) return;
                model.updateEscortInfo($data.escortInfo);
                this.caravanMainView.refreshInterval();
                this.caravanMainView.showReward();
                dispatchEvt(new EscortEvent(EscortEvent.UPDATE_SELF_INFO));
            });
        }

        /** 刷新货物 */
        private refreshGoods(): void {
            let model = this._model;
            if (model.isMaxQuality(model.escortId)) {
                showToast(LanMgr.getLan('', 10169));
                return;
            }
            let cost = model.getRefreshCost();
            if (UIUtil.checkNotEnough(cost[0], cost[1])) {
                return;
            }
            PLC.request(Protocol.game_escort_refreshQuality, null, ($data) => {
                if (!$data) return;
                App.hero.escortTradeId = $data.escortTradeId;
                model.updateEscortInfo(null);
                this.caravanMainView.startAnim($data.escortTradeId);
                this.caravanMainView.updateCost();
                dispatchEvt(new EscortEvent(EscortEvent.REFRESH_GOODS_SUCCESS));
            });
        }
        /** 一键刷橙 */
        private oneKeyGoods(): void {
            let model = this._model;
            if (model.isMaxQuality(model.escortId)) {
                showToast(LanMgr.getLan('', 10169));
                return;
            }
            let cost = model.getOneKeyCost();
            if (UIUtil.checkNotEnough(cost[0], cost[1])) {
                return;
            }
            PLC.request(Protocol.game_escort_refreshOrange, null, ($data) => {
                if (!$data) return;
                App.hero.escortTradeId = $data.escortTradeId;
                model.updateEscortInfo(null);
                this.caravanMainView.selectItem($data.escortTradeId);
                this.caravanMainView.updateCost();
            });
        }
        /** 护送货物 */
        private escortGoods(): void {
            let model = this._model;
            if (model.endTime >= App.serverTimeSecond) {
                showToast(LanMgr.getLan('', 10167));
                return;
            }
            if (model.getEscortCount() <= 0) {
                showToast(LanMgr.getMsgByCode('EscortCountNotEnough'));
                return;
            }
            if(model.isDoubleTime() || GuideWeakManager.isExcuting()) {
                this.onRequestEscortGoods();
            }else{
                let self= this;
                common.AlertBox.showAlert({
                    text: tb.TB_escort_set.getSet().double_prompt,
                    confirmCb: () => {
                        self.onRequestEscortGoods();
                    }
                });
            }
        }

        private onRequestEscortGoods():void{
            PLC.request(Protocol.game_escort_tradeEscort, null, ($data) => {
                if (!$data) return;
                let model = this._model;
                $data['addEscort']['playerId'] = App.hero.playerId;
                let info = new CaravanInfoVo($data.addEscort);
                model.updateEscortInfo({ tradeId: info.svo.tradeId, endTime: info.svo.endTime });
                App.hero.escortTradeId = $data.escortTradeId;
                model.delayRewardInfo();
                this.caravanMainView.addCaravan(info);
                this.caravanMainView.updateCount();
                this.caravanMainView.refreshInterval();
                UIMgr.hideUIByName(UIConst.EscortView);
                dispatchEvt(new EscortEvent(EscortEvent.ESCORT_GOODS_SUCCESS));
            });
        }

        /** 掠夺物品  */
        private robbedGoods(info: CaravanInfoVo): void {
            if (App.serverTimeSecond >= info.svo.endTime) {
                showToast(LanMgr.getLan('', 10166));
                return;
            }
            let args = {};
            args[Protocol.game_escort_robTradeBattleStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_escort_robTradeBattleStart, args, ($data) => {
                if (!$data) return;
                info.setDetailInfo($data.targetInfo)
                this.doFight(info);
            });
        }
        private doFight(info: CaravanInfoVo): void {
            let copyvo = new FightVo();
            copyvo.copyType = CopyType.escort;
            copyvo.caravanInfoVo = info;

            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;

            let arg = {};
            arg[Protocol.game_escort_robTradeBattleEnd.args.isWin] = isWin;
            arg[Protocol.game_escort_robTradeBattleEnd.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_escort_robTradeBattleEnd, arg, ($data: any) => {
                if (!$data) return;
                let enterVo: EnterFightVo = { vo: copyvo, event: new EscortEvent(EscortEvent.SHOW_MAIN_VIEW),responseData: $data };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        }

        /** 领取奖励 */
        private receiveAward(): void {
            PLC.request(Protocol.game_escort_receiveAwards, null, ($data: any) => {
                if (!$data) return;
                let model = this._model;
                model.updateEscortInfo(null);
                UIUtil.showRewardView($data.commonData);
                model.updateEscortInfo($data.escortInfo);
                this.caravanMainView.selectItem(App.hero.escortTradeId);
                UIMgr.hideUIByName(UIConst.EscortRewardView);
                dispatchEvt(new EscortEvent(EscortEvent.UPDATE_REWARD_RP));
            });
        }


        get caravanMainView(): EscortMainView {
            return UIMgr.getUIByName(UIConst.EscortMainView);
        }
    }
}