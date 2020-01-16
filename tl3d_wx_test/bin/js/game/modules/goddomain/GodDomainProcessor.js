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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var GodDomainProcessor = /** @class */ (function (_super) {
        __extends(GodDomainProcessor, _super);
        function GodDomainProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.GodDomainModel.getInstance();
            _this._thread = game.GodDmThread.getInstance();
            return _this;
        }
        GodDomainProcessor.prototype.getName = function () {
            return "GodDomainProcessor";
        };
        GodDomainProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_GODDOMAIN_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_AUTO_MATCH_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_RANK_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_SHOP_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_TEAM_LIST),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_RULE_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_BUY_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.CREATE_TEAM_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.JOIN_TEAM),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_BONUS_RULE),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_CHAT_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.START_BATTLE),
                new game.GodDomainEvent(game.GodDomainEvent.ONEKEY_INVITE),
                new game.GodDomainEvent(game.GodDomainEvent.LEAVE_TEAM),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_INVITE_VIEW),
                new game.GodDomainEvent(game.GodDomainEvent.SHOW_PLAYER_INFO),
                new game.ChatEvent(game.ChatEvent.ADD_GROUP_CHAT),
                new game.HudEvent(game.HudEvent.SET_NAME),
                new game.HudEvent(game.HudEvent.UPDATE_POWER),
            ];
        };
        //处理事件
        GodDomainProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GodDomainEvent) {
                switch ($event.type) {
                    case game.GodDomainEvent.SHOW_GODDOMAIN_VIEW:
                        this.showGoddmView($event.data);
                        break;
                    case game.GodDomainEvent.SHOW_AUTO_MATCH_VIEW:
                        this.showAutoMatchView();
                        break;
                    case game.GodDomainEvent.SHOW_RANK_VIEW:
                        this.showRankView();
                        break;
                    case game.GodDomainEvent.SHOW_SHOP_VIEW:
                        this.showShopView();
                        break;
                    case game.GodDomainEvent.SHOW_TEAM_LIST:
                        this.showTeamList();
                        break;
                    case game.GodDomainEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case game.GodDomainEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case game.GodDomainEvent.CREATE_TEAM_VIEW:
                        this.createTeamView();
                        break;
                    case game.GodDomainEvent.JOIN_TEAM:
                        this.joinTeam($event.data);
                        break;
                    case game.GodDomainEvent.SHOW_BONUS_RULE:
                        this.showBonusRule();
                        break;
                    case game.GodDomainEvent.SHOW_CHAT_VIEW:
                        this.showChatView();
                        break;
                    case game.GodDomainEvent.START_BATTLE:
                        this.startBattle($event.data);
                        break;
                    case game.GodDomainEvent.ONEKEY_INVITE:
                        this.onekeyInvite();
                        break;
                    case game.GodDomainEvent.LEAVE_TEAM:
                        this.levelTeam();
                        break;
                    case game.GodDomainEvent.SHOW_INVITE_VIEW:
                        this.showInviteView();
                        break;
                    case game.GodDomainEvent.SHOW_PLAYER_INFO:
                        this.showPlayerInfo($event.data);
                        break;
                }
            }
            else if ($event instanceof game.ChatEvent) {
                switch ($event.type) {
                    case game.ChatEvent.ADD_GROUP_CHAT:
                        this.addGroupChat($event.data);
                        break;
                }
            }
            else if ($event instanceof game.HudEvent) {
                switch ($event.type) {
                    case game.HudEvent.SET_NAME:
                        this.updateName();
                        break;
                    case game.HudEvent.UPDATE_POWER:
                        this.updateForce();
                        break;
                }
            }
        };
        /** 打开界面 */
        GodDomainProcessor.prototype.showGoddmView = function (data) {
            var _this = this;
            this._thread.requestMyTeamInfo().then(function () {
                if (_this._model.hasTeam()) {
                    if (UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                        _this.teamView.show(false, false);
                    }
                    else {
                        UIMgr.showUI(UIConst.GodDm_TeamView);
                    }
                }
                else {
                    if (UIMgr.hasStage(UIConst.GodDomainView)) {
                        _this.domainView.show(false, false);
                    }
                    else {
                        UIMgr.showUI(UIConst.GodDomainView);
                    }
                }
            });
        };
        /** 打开自动匹配界面界面 */
        GodDomainProcessor.prototype.showAutoMatchView = function () {
            var _this = this;
            if (!this._model.isInDoubleTime()) {
                var cost = tb.TB_fight_goddomain_set.getSet().double_prompt;
                common.AlertBox.showAlert({
                    text: cost, confirmCb: function () {
                        _this._thread.autoMatch().then(function () {
                            UIMgr.showUI(UIConst.GodDm_AutoMatchView);
                        });
                    }, parm: null
                });
            }
            else {
                this._thread.autoMatch().then(function () {
                    UIMgr.showUI(UIConst.GodDm_AutoMatchView);
                });
            }
        };
        /** 打开排名界面 */
        GodDomainProcessor.prototype.showRankView = function () {
            UIMgr.showUI(UIConst.GodDm_RankView);
        };
        /** 打开商城界面 */
        GodDomainProcessor.prototype.showShopView = function () {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.godDm);
        };
        /** 打开队伍列表界面 */
        GodDomainProcessor.prototype.showTeamList = function () {
            this._thread.requestTeamList().then(function () {
                UIMgr.showUI(UIConst.GodDm_TeamListView);
            });
        };
        /** 打开规则界面 */
        GodDomainProcessor.prototype.showRuleView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20017));
        };
        /** 打开加成规则界面 */
        GodDomainProcessor.prototype.showBonusRule = function () {
            PLC.request(Protocol.friend_group_getRewardAddInfo, null, function ($data) {
                if (!$data)
                    return;
                var addBonus = $data['rewardAddInfo'];
                var bonus = tb.TB_fight_goddomain_set.getSet().team_bonus;
                UIUtil.showCommonTipView(LanMgr.getLanArr.apply(LanMgr, __spreadArrays([20016, []], addBonus, bonus)));
            });
        };
        /** 打开聊天界面 */
        GodDomainProcessor.prototype.showChatView = function () {
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_CHAT_PANEL), [game.OpenType.godDm, iface.tb_prop.chatChannelTypeKey.group]);
        };
        /** 打开邀请界面 */
        GodDomainProcessor.prototype.showInviteView = function () {
            this._thread.requestInviteList().then(function () {
                UIMgr.showUI(UIConst.GodDm_InviteView);
            });
        };
        /** 打开购买界面 */
        GodDomainProcessor.prototype.showBuyView = function () {
            if (!UIUtil.checkLimitEnough(iface.tb_prop.limitTypeKey.buyGodDmRewardNum, iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum)) {
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, { type: common.BuyBattleCountView.TYPE_GODDOMAIN, callback: function (num) {
                    var arg = {};
                    arg[Protocol.game_common_buyGodDomainRewardNum.args.count] = num;
                    PLC.request(Protocol.game_common_buyGodDomainRewardNum, arg, function ($data) {
                        if (!$data)
                            return;
                    });
                } });
        };
        /** 创建队伍界面 */
        GodDomainProcessor.prototype.createTeamView = function () {
            var _this = this;
            if (!this._model.isInDoubleTime()) {
                var cost = tb.TB_fight_goddomain_set.getSet().double_prompt;
                common.AlertBox.showAlert({
                    text: cost, confirmCb: function () {
                        _this._thread.createTeam().then(function () {
                            UIMgr.showUI(UIConst.GodDm_TeamView);
                            UIMgr.hideUIByName(UIConst.GodDm_TeamListView);
                        });
                    }, parm: null
                });
            }
            else {
                this._thread.createTeam().then(function () {
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                    UIMgr.hideUIByName(UIConst.GodDm_TeamListView);
                });
            }
        };
        /** 加入队伍 */
        GodDomainProcessor.prototype.joinTeam = function (info) {
            if (this._model.hasTeam()) {
                showToast(LanMgr.getLan("", 10377));
                return;
            }
            if (info.svo.memberNum >= 3) {
                showToast(LanMgr.getLan("", 10378));
                var view = UIMgr.getUIByName(UIConst.GodDm_TeamListView);
                if (view) {
                    view.onRefresh();
                }
                return;
            }
            this._thread.joinTeam(info).then(function (success) {
                if (success) {
                    UIMgr.hideUIByName(UIConst.GodDm_TeamListView);
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                }
                else {
                    var view = UIMgr.getUIByName(UIConst.GodDm_TeamListView);
                    if (view) {
                        view.onRefresh();
                    }
                }
            });
        };
        /** 开始战斗 */
        GodDomainProcessor.prototype.startBattle = function (force) {
            var _this = this;
            if (force || App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) > 0) {
                this._thread.showTeamMatchView();
            }
            else {
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10482),
                    confirmCb: function () {
                        _this._thread.showTeamMatchView();
                    }, parm: null
                });
            }
        };
        /** 一键邀请 */
        GodDomainProcessor.prototype.onekeyInvite = function () {
            var _this = this;
            if (this._model.myTeam.isAllRealPerson()) {
                showToast(LanMgr.getLan("", 10379));
                return;
            }
            var cd = this._model.oneKeyInviteCd;
            if (cd > 0 && App.serverTimeSecond < cd) {
                showToast(LanMgr.getLan("", 10380, Math.ceil(cd - App.serverTimeSecond)));
                return;
            }
            this._thread.oneKeyInvite().then(function () {
                _this.teamView.updateView();
            });
        };
        /** 离开队伍 */
        GodDomainProcessor.prototype.levelTeam = function () {
            var _this = this;
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10481),
                confirmCb: function () {
                    _this._thread.leaveTeam().then(function () {
                        UIMgr.showUI(UIConst.GodDomainView);
                    });
                }, parm: null
            });
        };
        /** 显示玩家信息界面 */
        GodDomainProcessor.prototype.showPlayerInfo = function (info) {
            var event = new game.GodDomainEvent(game.GodDomainEvent.SHOW_GODDOMAIN_VIEW);
            var clientVo = {};
            if (info.isRobot()) {
                clientVo['name'] = info.svo.name;
                clientVo['guildName'] = info.svo.guildName;
            }
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW), { playerId: info.svo.playerId, event: event, clientVo: clientVo });
        };
        /** 新增聊天消息 */
        GodDomainProcessor.prototype.addGroupChat = function (chatList) {
            if (UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                this.teamView.addNewChats(chatList);
            }
        };
        /** 更新名称 */
        GodDomainProcessor.prototype.updateName = function () {
            var memberVo = this._model.myTeam.getSelfInfo();
            if (memberVo && memberVo.isExist()) {
                memberVo.svo.name = App.hero.name;
            }
            if (UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                this.teamView.refreshMemberItem(App.hero.playerId);
            }
            if (UIMgr.hasStage(UIConst.GodDomainView)) {
                this.domainView.updateName();
            }
        };
        /** 更新战斗力 */
        GodDomainProcessor.prototype.updateForce = function () {
            if (UIMgr.hasStage(UIConst.GodDomainView)) {
                this.domainView.updateForce();
            }
        };
        Object.defineProperty(GodDomainProcessor.prototype, "domainView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GodDomainView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodDomainProcessor.prototype, "teamView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GodDm_TeamView);
            },
            enumerable: true,
            configurable: true
        });
        return GodDomainProcessor;
    }(tl3d.Processor));
    game.GodDomainProcessor = GodDomainProcessor;
})(game || (game = {}));
