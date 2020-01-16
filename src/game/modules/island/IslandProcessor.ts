

module game {

    export class IslandProcessor extends tl3d.Processor {

        private _model : IslandModel;
        constructor() {
            super();
            this._model = IslandModel.getInstance();
        }
        public getName(): string {
            return "IslandProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new IslandsEvent(IslandsEvent.SHOW_MAIN_VIEW),
                new IslandsEvent(IslandsEvent.SHOW_RULE_VIEW),
                new IslandsEvent(IslandsEvent.SHOW_RESCORD_VIEW),
                new IslandsEvent(IslandsEvent.SHOW_BUY_VIEW),
                new IslandsEvent(IslandsEvent.SHOW_ORE_MAP),
                new IslandsEvent(IslandsEvent.OPEN_ORE_INFO),
                new IslandsEvent(IslandsEvent.OPEN_ORE_EXPLAIN),
                new IslandsEvent(IslandsEvent.OCCUPY_ORE),
                new IslandsEvent(IslandsEvent.ROB_ORE),
                new IslandsEvent(IslandsEvent.UPDATE_ORE_LIST),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof IslandsEvent) {
                switch ($event.type) {
                    case IslandsEvent.SHOW_MAIN_VIEW:
                        this.showMainView();
                        break;
                    case IslandsEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case IslandsEvent.SHOW_RESCORD_VIEW:
                        this.showRecordView();
                        break;
                    case IslandsEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case IslandsEvent.SHOW_ORE_MAP:
                        this.showOreMap($event.data);
                        break;
                    case IslandsEvent.OPEN_ORE_INFO:
                        this.openOreInfoView($event.data);
                        break;
                    case IslandsEvent.OPEN_ORE_EXPLAIN:
                        this.openOreExplain($event.data);
                        break;
                    case IslandsEvent.OCCUPY_ORE:
                        this.occupyOre($event.data);
                        break;
                    case IslandsEvent.ROB_ORE:
                        this.robOre($event.data);
                        break;
                    case IslandsEvent.UPDATE_ORE_LIST:
                        this.renderOreMap($event.data);
                        break;

                }
            }

        }

        /** 打开界面 */
        private showMainView(): void {
            IslandUtil.requestSelfInfo().then(() => {
                UIMgr.showUI(UIConst.IslandView);
            });
        }
        /** 打开规则界面 */
        private showRuleView(): void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20012));
        }
        /** 打开记录界面 */
        private showRecordView(): void {
            PLC.request(Protocol.game_mine_mineRecordList, null, ($data) => {
                if (!$data) return;
                let recordList: IslandRecordVo[] = [];
                for (let svo of $data.recordList) {
                    recordList.push(new IslandRecordVo(svo));
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
        /** 打开购买界面 */
        private showBuyView(): void {
            if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum) >= tb.TB_island_set.getSet().buy_max) {
                showToast(LanMgr.getLan('', 10146));
                return;
            }
            let cost = this._model.getBuyCost();
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, cost)) {
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {type:common.BuyBattleCountView.TYPE_MINEROB, callback:(num:number)=>{
				let arg = {};
				arg[Protocol.game_common_buyMineRobCnt.args.count] = num;
				PLC.request(Protocol.game_common_buyMineRobCnt, arg, ($data) => {
                        if (!$data) return;
                        let view = UIMgr.getUIByName(UIConst.SysTopView) as game.SysTopView;
                        if (view && view.box_island.visible){
                            view.updateIslandCount();
                        }
                    });
			}});
        }
        /** 打开矿产地图界面 */
        private showOreMap(info: IslandInfoVo): void {
            if (!info) return;
            let args = {};
            args[Protocol.center_mine_getMineList.args.islandId] = info.tbIsland.ID;
            PLC.request(Protocol.center_mine_getMineList, args, ($data) => {
                if (!$data) return;
                info.setServerVo($data.mineList);
                UIMgr.showUI(UIConst.OreMapView, info);
            });
        }
        /** 打开矿产信息界面 */
        private openOreInfoView(info: OreSpotInfoVo): void {
            let args = {};
            args[Protocol.center_mine_getTargetMineInfo.args.mineIndex] = info.svo.mineIndex;
            PLC.request(Protocol.center_mine_getTargetMineInfo, args, ($data) => {
                if (!$data) return;
                info.setDetailInfo($data.mineInfo);
                this.renderOreItem(info.svo.mineIndex);
                if (info.isSelf()) {
                    UIMgr.showUI(UIConst.SelfOreView, info);
                } else if (info.hasUser()) {
                    UIMgr.showUI(UIConst.PlayerOreView, info);
                } else {
                    UIMgr.showUI(UIConst.EmptyOreView, info);
                }
            });
        }
        /** 刷新矿点界面 */
        private renderOreItem(mineIndex: number): void {
            if (UIMgr.hasStage(UIConst.OreMapView)) {
                this.oreMapView.updateOreData(mineIndex);
            }
        }
        /** 说明界面 */
        private openOreExplain(tbOre: tb.TB_island_level): void {
            UIMgr.showUI(UIConst.OreExplainView, tbOre);
        }

        /** 更新矿点信息 */
        private updateOreInfo(info: OreSpotInfoVo): void {
            common.AlertBox.showAlert(
                {
                    text: LanMgr.getLan(``,10530),
                    confirmCb: () => {
                        this.openOreInfoView(info);
                    }
                });
        }
        /** 更新矿点地图 */
        private renderOreMap(islandId: number): void {
            if (UIMgr.hasStage(UIConst.OreMapView)) {
                this.oreMapView.updateView();
            }
            if (UIMgr.hasStage(UIConst.IslandView)) {
                this.islandView.updateView();
            }
        }

        /** 掠夺矿产 */
        private robOre(info: OreSpotInfoVo): void {
            if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum) <= 0) {
                showToast(LanMgr.getMsgByCode('RobCountNotEnough'));
                return;
            }
            if (info.isOutTime()) {
                showToast(LanMgr.getLan('', 10194));
                return;
            }
            // 可能会有随机收益
            // let award = info.getRobAward();
            // if (award[1] <= 0) {
            //     showToast(LanMgr.getLan('该岛屿暂无收益,稍后再试', -1));
            //     return;
            // }
            let args = {};
            args[Protocol.game_mine_mineRobStart.args.mineIndex] = info.svo.mineIndex;
            args[Protocol.game_mine_mineRobStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_mine_mineRobStart, args, ($data,msg,msgCode) => {
                if (!$data) {
                    if(msgCode == Lans.OccupyInfoHasRefresh){
                        this.updateOreInfo(info);
                        UIMgr.hideUIByName(UIConst.PlayerOreView);
                    }
                    return;
                }
                info.setDetailInfo($data.mineInfo);
                this.doRobFight(info);
            });
        }
        private doRobFight(info: OreSpotInfoVo): void {
            let copyvo = new FightVo();
            copyvo.copyType = CopyType.island;
            copyvo.islandOreInfo = OreSpotInfoVo.copy(info);
            copyvo.islandOreInfo.isOccupyFight = false;

            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;

            logdebug('神秘岛屿掠夺：', info.tbOre.ID, isWin, copyvo);
            let arg = {};
            arg[Protocol.game_mine_mineRobEnd.args.mineIndex] = info.svo.mineIndex;
            arg[Protocol.game_mine_mineRobEnd.args.isWin] = isWin;
            PLC.request(Protocol.game_mine_mineRobEnd, arg, ($data: any) => {
                if (!$data) return;
                let islandInfo = this._model.getIslandById(info.tbIsland.ID);
                let enterVo: EnterFightVo = { vo: copyvo, event: new IslandsEvent(IslandsEvent.SHOW_ORE_MAP), eventdata: islandInfo, responseData: $data };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        }


        /** 占领矿产 */
        private occupyOre(info: OreSpotInfoVo): void {
            let model = this._model;
            if (model.getOccupyCount() <= 0) {
                showToast(LanMgr.getLan('', 10195));
                return;
            }
            let curPlayerId = info.svo.playerId ? info.svo.playerId : null;
            let args = {};
            args[Protocol.center_mine_getTargetMineInfo.args.mineIndex] = info.svo.mineIndex;
            PLC.request(Protocol.center_mine_getTargetMineInfo, args, ($data) => {
                if (!$data) return;
                let mineInfo: IOreSpotSvo = $data.mineInfo;
                let playerId = mineInfo ? mineInfo.playerId : null;
                if (curPlayerId != playerId) {
                    this.updateOreInfo(info);
                    return;
                }
                if (model.getSelfOre()) {
                    common.AlertBox.showAlert(
                        {
                            text: LanMgr.getLan(``,10531),
                            confirmCb: () => {
                                this.doOccupyCheck(info);
                            }
                        });
                } else {
                    this.doOccupyCheck(info);
                }
            });
        }
        /** 抢占前检测 */
        private doOccupyCheck(info: OreSpotInfoVo): void {
            if(!info.svo) {
                showToast(LanMgr.getLan('', 10441));
                return;
            }
            if (!info.hasUser()) {
                let arg = {};
                arg[Protocol.game_mine_mineOccupy.args.mineIndex] = info.svo.mineIndex;
                PLC.request(Protocol.game_mine_mineOccupy, arg, ($data: any,msg,msgCode) => {
                    if (!$data) {
                        if(msgCode == Lans.OccupyInfoHasRefresh){
                            this.updateOreInfo(info);
                            UIMgr.hideUIByName(UIConst.PlayerOreView);
                        }
                        return;
                    }
                    UIMgr.hideUIByName(UIConst.EmptyOreView);
                    this._model.setMyOreInfo({ mineId: info.svo.mineId, mineType: info.svo.mineType, islandId: info.tbIsland.ID });
                    info.svo.playerId = App.hero.playerId;
                    info.svo.playerName = App.hero.name;
                    info.svo.force = App.hero.force;
                    info.svo.occupyTime = App.serverTimeSecond;
                    let ary = [];
                    if ($data.commonData) {
                        UIUtil.getRewardItemVoList(ary, $data.commonData, false, false);
                    }
                    if ($data.firstData) {
                        UIUtil.getRewardItemVoList(ary, $data.firstData, true, false);
                    }
                    if (ary.length > 0) {
                        let info: IOreSettlementVo = { content: LanMgr.getLan("",12197), itemArray: ary };
                        UIMgr.showUI(UIConst.OreSettlementView, info)
                    }
                    this.renderOreMap(info.tbIsland.ID);
                });
                return;
            }
            let args = {};
            args[Protocol.game_mine_mineOccupyStart.args.mineIndex] = info.svo.mineIndex;
            args[Protocol.game_mine_mineOccupyStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.game_mine_mineOccupyStart, args, ($data,msg,msgCode) => {
                if (!$data) {
                    if(msgCode == Lans.OccupyInfoHasRefresh){
                        this.updateOreInfo(info);
                        UIMgr.hideUIByName(UIConst.PlayerOreView);
                    }
                    return;
                }
                info.setDetailInfo($data.mineInfo);
                this.doOccupyFight(info);
            });
        }
        /** 抢占 */
        private doOccupyFight(info: OreSpotInfoVo): void {
            let copyvo = new FightVo();
            copyvo.copyType = CopyType.island;
            copyvo.islandOreInfo = OreSpotInfoVo.copy(info);
            copyvo.islandOreInfo.isOccupyFight = true;

            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;

            let model = this._model;
            logdebug('神秘岛屿抢占：', info.tbOre.ID, isWin, copyvo);
            let arg = {};
            arg[Protocol.game_mine_mineOccupyEnd.args.mineIndex] = info.svo.mineIndex;
            arg[Protocol.game_mine_mineOccupyEnd.args.isWin] = isWin;
            PLC.request(Protocol.game_mine_mineOccupyEnd, arg, ($data: any) => {
                if (!$data) return;
                if ($data.myInfo) {
                    model.setMyOreInfo($data.myInfo);
                }
                let islandInfo = model.getIslandById(info.tbIsland.ID);
                let enterVo: EnterFightVo = { vo: copyvo, event: new IslandsEvent(IslandsEvent.SHOW_ORE_MAP), eventdata: islandInfo, responseData: $data };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });

        }


        get islandView(): IslandView {
            return UIMgr.getUIByName(UIConst.IslandView);
        }

        get oreMapView(): OreMapView {
            return UIMgr.getUIByName(UIConst.OreMapView);
        }
    }
}