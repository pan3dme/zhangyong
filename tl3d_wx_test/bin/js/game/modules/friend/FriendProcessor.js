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
    var FriendProcessor = /** @class */ (function (_super) {
        __extends(FriendProcessor, _super);
        function FriendProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.FriendModel.getInstance();
            return _this;
        }
        FriendProcessor.prototype.getName = function () {
            return "FriendProcessor";
        };
        FriendProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL),
                new game.FriendEvent(game.FriendEvent.FRIEND_PANAEL_ADDFRIEND),
                new game.FriendEvent(game.FriendEvent.FRIEND_QIECUO),
            ];
        };
        //处理事件
        FriendProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.FriendEvent) {
                switch ($event.type) {
                    case game.FriendEvent.SHOW_FRIEND_PANEL:
                        this.showFriendPanel(0);
                        break;
                    case game.FriendEvent.FRIEND_PANAEL_ADDFRIEND:
                        this.friendAddfriend($event.data);
                        break;
                    case game.FriendEvent.FRIEND_QIECUO:
                        this.showQieCuoFight($event.data);
                        break;
                }
            }
        };
        /**初始化好友列表 */
        FriendProcessor.prototype.showFriendPanel = function (type) {
            if (UIMgr.hasStage(UIConst.Friend_MainView)) {
                this.friendsMainView.initFriendListView();
            }
            else {
                Laya.timer.callLater(this, function () {
                    // 防止切磋失败再一次挑战时，在战斗界面打开了好友界面
                    var isInFight = UIMgr.hasStage(UIConst.FightViews);
                    if (!isInFight) {
                        UIMgr.showUI(UIConst.Friend_MainView);
                    }
                });
            }
        };
        //切磋
        FriendProcessor.prototype.showQieCuoFight = function (userData) {
            if (!userData || !userData.playerId)
                return;
            if (userData.playerId == App.hero.playerId) {
                return;
            }
            var arg = {};
            arg[Protocol.center_query_queryPlayer.args.playerId] = userData.playerId;
            PLC.request(Protocol.center_query_queryPlayer, arg, function ($data) {
                if (!$data)
                    return;
                var info = new common.PlayerInfoVo();
                info.setData($data, userData.playerId, userData.event, userData.eventData, false);
                if (!info.isHasLineup()) {
                    LanMgr.getLan('', 10134);
                    return;
                }
                var vo = new game.FightVo;
                vo.copyType = CopyType.qiecuo;
                vo.qiecuoVo = info;
                var battleScene = new battle.BattleScenePvp(vo.copyType);
                battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, vo.getAllRound(), vo.getTeamHp());
                battleScene.start();
                var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
                var page = new game.NewClientPage();
                page.result = isWin ? playState.VICTORY : playState.FAILURE;
                page.initPage(battleScene.battleReport);
                page.defType = iface.tb_prop.battleObjTypeKey.god;
                vo.fightPageControl = page;
                var event = info.svo.event ? info.svo.event : new game.HudEvent(game.HudEvent.QIECUO_BACK);
                var eventdata = info.svo.eventdata ? info.svo.eventdata : info.svo.playerId;
                var enterVo = { vo: vo, event: event, eventdata: eventdata };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        /**申请好友 */
        FriendProcessor.prototype.friendAddfriend = function (playerId) {
            if (this._model.isMyFriend(playerId)) {
                showToast(LanMgr.getLan('', 10133));
                return;
            }
            if (App.hero.playerId == playerId) {
                showToast(LanMgr.getLan('', 10320));
                return;
            }
            /**申请好友 */
            var args = {};
            args[Protocol.friend_friend_apply.args.playerId] = playerId;
            PLC.request(Protocol.friend_friend_apply, args, function ($data, msg) {
            });
        };
        Object.defineProperty(FriendProcessor.prototype, "friendsMainView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Friend_MainView);
            },
            enumerable: true,
            configurable: true
        });
        return FriendProcessor;
    }(tl3d.Processor));
    game.FriendProcessor = FriendProcessor;
})(game || (game = {}));
