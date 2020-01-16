/**
* name 
*/
module game {
    export class FriendProcessor extends tl3d.Processor {

        private _model: FriendModel;
        constructor() {
            super();
            this._model = FriendModel.getInstance();
        }

        public getName(): string {
            return "FriendProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL),
                new FriendEvent(FriendEvent.FRIEND_PANAEL_ADDFRIEND),
                new FriendEvent(FriendEvent.FRIEND_QIECUO),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof FriendEvent) {
                switch ($event.type) {
                    case FriendEvent.SHOW_FRIEND_PANEL:
                        this.showFriendPanel(0);
                        break;
                    case FriendEvent.FRIEND_PANAEL_ADDFRIEND:
                        this.friendAddfriend($event.data);
                        break;
                    case FriendEvent.FRIEND_QIECUO:
                        this.showQieCuoFight($event.data);
                        break;
                }
            }
        }

        /**初始化好友列表 */
        private showFriendPanel(type: number): void {
            if (UIMgr.hasStage(UIConst.Friend_MainView)) {
                this.friendsMainView.initFriendListView();
            } else {
                Laya.timer.callLater(this, () => {
                    // 防止切磋失败再一次挑战时，在战斗界面打开了好友界面
                    let isInFight: boolean = UIMgr.hasStage(UIConst.FightViews);
                    if (!isInFight) {
                        UIMgr.showUI(UIConst.Friend_MainView);
                    }
                });
            }
        }

        //切磋
        private showQieCuoFight(userData: { playerId: string, event: tl3d.BaseEvent, eventData: any }): void {
            if (!userData || !userData.playerId) return;
            if (userData.playerId == App.hero.playerId) {
                return;
            }
            let arg = {};
            arg[Protocol.center_query_queryPlayer.args.playerId] = userData.playerId;
            PLC.request(Protocol.center_query_queryPlayer, arg, ($data) => {
                if (!$data) return;
                let info: common.PlayerInfoVo = new common.PlayerInfoVo();
                info.setData($data, userData.playerId, userData.event, userData.eventData, false);

                if (!info.isHasLineup()) {
                    LanMgr.getLan('', 10134);
                    return;
                }
                let vo = new FightVo
                vo.copyType = CopyType.qiecuo;
                vo.qiecuoVo = info;
                var battleScene = new battle.BattleScenePvp(vo.copyType);
                battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, vo.getAllRound(), vo.getTeamHp());
                battleScene.start();
                var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
                let page = new NewClientPage();
                page.result = isWin ? playState.VICTORY : playState.FAILURE;
                page.initPage(battleScene.battleReport);
                page.defType = iface.tb_prop.battleObjTypeKey.god;

                vo.fightPageControl = page;
                let event = info.svo.event ? info.svo.event : new HudEvent(HudEvent.QIECUO_BACK);
                let eventdata = info.svo.eventdata ? info.svo.eventdata : info.svo.playerId;
                let enterVo: EnterFightVo = { vo, event, eventdata };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        }

        /**申请好友 */
        private friendAddfriend(playerId): void {
            if (this._model.isMyFriend(playerId)) {
                showToast(LanMgr.getLan('', 10133));
                return;
            }
            if (App.hero.playerId == playerId) {
                showToast(LanMgr.getLan('', 10320));
                return;
            }
            /**申请好友 */
            let args = {};
            args[Protocol.friend_friend_apply.args.playerId] = playerId;
            PLC.request(Protocol.friend_friend_apply, args, ($data: any, msg: any) => {
            });
        }


        public get friendsMainView(): FriendMain {
            return UIMgr.getUIByName(UIConst.Friend_MainView);
        }

    }
}