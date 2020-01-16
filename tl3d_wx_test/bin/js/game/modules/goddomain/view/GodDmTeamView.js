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
var game;
(function (game) {
    var GodDmTeamView = /** @class */ (function (_super) {
        __extends(GodDmTeamView, _super);
        function GodDmTeamView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        GodDmTeamView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._thread = game.GodDmThread.getInstance();
            this._model = game.GodDomainModel.getInstance();
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GOD_DOMAIN);
        };
        GodDmTeamView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.item_0.y = this.item_1.y = this.item_2.y = (h - this.item_0.height) / 2 + 40;
            this._memberItems = [this.item_0, this.item_1, this.item_2];
            for (var _i = 0, _a = this._memberItems; _i < _a.length; _i++) {
                var item = _a[_i];
                item.uiPos = new Laya.Point(item.x, item.y);
                item.initData();
            }
        };
        GodDmTeamView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GodDmTeamView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.menuUI.onClosed();
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateRewardCount, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateCoin, this);
            this.btnAdd.off(Laya.Event.CLICK, this, this.onClick);
            this.btnBonus.off(Laya.Event.CLICK, this, this.onClick);
            this.btnChat.off(Laya.Event.CLICK, this, this.onClick);
            this.btnFight.off(Laya.Event.CLICK, this, this.onOperation);
            this.btnInvite.off(Laya.Event.CLICK, this, this.onClick);
            this.btnLeave.off(Laya.Event.CLICK, this, this.onClick);
            this.checkBox.off(Laya.Event.CHANGE, this, this.onChange);
            this.clearMemberList();
            game.ChatThread.getInstance().stopRequest();
            UIMgr.hideUIByName(UIConst.ChatView);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        GodDmTeamView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnSkin: SkinUtil.btn_buzhen, callback: this.onBuzhen.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onRank.bind(this) },
                { btnSkin: SkinUtil.btn_team, callback: this.onTeam.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.godDomain];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onLeave.bind(this) });
            this.clearMemberList();
            if (this._model.myTeam.isCaptain()) {
                for (var _i = 0, _a = this._memberItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.on(Laya.Event.CLICK, this, this.onItemClick);
                    item.on(Laya.Event.MOUSE_UP, this, this.onItemClick);
                    item.on(Laya.Event.MOUSE_DOWN, this, this.onItemClick);
                    item.on(Laya.Event.MOUSE_OUT, this, this.onItemClick);
                    item.on(Laya.Event.MOUSE_MOVE, this, this.onItemClick);
                }
            }
            else {
                for (var _b = 0, _c = this._memberItems; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.on(Laya.Event.CLICK, this, this.onItemClick);
                }
            }
            this.menuUI.onClosed();
            this.updateView();
            this.checkState();
            this.updateRewardCount();
            this.updateListTick();
            this.btnAdd.on(Laya.Event.CLICK, this, this.onClick);
            this.btnBonus.on(Laya.Event.CLICK, this, this.onClick);
            this.btnChat.on(Laya.Event.CLICK, this, this.onClick);
            this.btnFight.on(Laya.Event.CLICK, this, this.onOperation);
            this.btnInvite.on(Laya.Event.CLICK, this, this.onClick);
            this.btnLeave.on(Laya.Event.CLICK, this, this.onClick);
            this.checkBox.on(Laya.Event.CHANGE, this, this.onChange);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateRewardCount, this);
            game.ChatThread.getInstance().startAutoRequest(iface.tb_prop.chatChannelTypeKey.all);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateCoin, this);
            this.updateCoin();
        };
        /** 更新界面 */
        GodDmTeamView.prototype.updateView = function () {
            var myTeam = this._model.myTeam;
            var list = myTeam.getMemberList();
            for (var i = 0; i < 3; i++) {
                this._memberItems[i].dataSource = list[i];
            }
            var isCaptain = myTeam.isCaptain();
            this.lbBonus.text = LanMgr.getLan("", 12323, myTeam.rewardAdd - 100);
            this.checkBox.visible = isCaptain;
            this.checkBox.selected = myTeam.isAutoJoin();
            this.btnInvite.visible = isCaptain;
        };
        /** 检测当前自己的状态 */
        GodDmTeamView.prototype.checkState = function () {
            var self = this._model.myTeam.getSelfInfo();
            var isCaptain = self.isCaptain();
            this.btnFight.label = isCaptain ? LanMgr.getLan("", 12320) : (self.isReady() ? LanMgr.getLan("", 12321) : LanMgr.getLan("", 12322));
            this.updateTimeTick();
        };
        GodDmTeamView.prototype.updateCoin = function () {
            this.lbScore.text = "神域积分：" + this._model.score;
            this.lbCoin.text = "神域币：" + App.hero.godDomain;
        };
        /** 开始定时刷新界面数据 */
        GodDmTeamView.prototype.updateListTick = function (time) {
            if (time === void 0) { time = 3000; }
            Laya.timer.clear(this, this.intervalRefresh);
            Laya.timer.loop(time, this, this.intervalRefresh);
        };
        /** 定时刷新 */
        GodDmTeamView.prototype.intervalRefresh = function () {
            var _this = this;
            this._thread.requestMyTeamInfo(false).then(function () {
                // 由于异步的，所以界面关闭后会走进来
                if (!UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                    return;
                }
                if (_this._model.hasTeam()) {
                    var myTeam = _this._model.myTeam;
                    //  开始匹配 不刷新列表
                    if (myTeam.regTime > 0) {
                        Laya.timer.clear(_this, _this.intervalRefresh);
                        UIMgr.showUI(UIConst.GodDm_TeamMatchView);
                    }
                    else {
                        _this.updateView();
                        if (myTeam.isChange || myTeam.autoStartTime > 0) {
                            _this.checkState();
                        }
                        _this.menuUI.checkExist();
                    }
                }
                else {
                    showToast(LanMgr.getLan("", 10381));
                    UIMgr.showUI(UIConst.GodDomainView);
                }
            });
        };
        /** 更新时间定时器 */
        GodDmTeamView.prototype.updateTimeTick = function () {
            Laya.timer.clear(this, this.updateAutoTime);
            Laya.timer.loop(1000, this, this.updateAutoTime);
            this.updateAutoTime();
        };
        GodDmTeamView.prototype.stopTimeTick = function () {
            this.lbPrompt.text = LanMgr.getLan("", 10483);
            Laya.timer.clear(this, this.updateAutoTime);
        };
        /** 检测队员准备时间 */
        GodDmTeamView.prototype.updateAutoTime = function () {
            var _this = this;
            var team = this._model.myTeam;
            var self = team.getSelfInfo();
            if (self.isCaptain()) {
                this.lbPrompt.visible = true;
                if (team.isAllReady() && team.autoStartTime > 0) {
                    var time = Math.ceil(team.autoStartTime - App.serverTimeSecond);
                    if (time > 0) {
                        this.lbPrompt.text = LanMgr.getLan("", 12319, time);
                    }
                    else {
                        Laya.timer.clear(this, this.updateAutoTime);
                        this.lbPrompt.text = LanMgr.getLan("", 12318);
                        dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.START_BATTLE), true);
                    }
                }
                else {
                    Laya.timer.clear(this, this.updateAutoTime);
                    this.lbPrompt.text = LanMgr.getLan("", 12318);
                }
            }
            else {
                if (self.isReady()) {
                    Laya.timer.clear(this, this.updateAutoTime);
                    this.lbPrompt.visible = false;
                }
                else {
                    this.lbPrompt.visible = true;
                    var time = Math.ceil(self.svo.readyTime - App.serverTimeSecond);
                    if (time > 0) {
                        this.lbPrompt.text = LanMgr.getLan("", 12317, time);
                    }
                    else {
                        Laya.timer.clear(this, this.updateAutoTime);
                        this.lbPrompt.text = LanMgr.getLan("", 12317, 0);
                        this._thread.changePrepareState(self, iface.tb_prop.groupStateTypeKey.yes).then(function () {
                            _this.checkState();
                            _this.lbPrompt.visible = !self.isReady();
                        });
                    }
                }
            }
        };
        /** 拖拽 */
        GodDmTeamView.prototype.onItemClick = function (e) {
            var _this = this;
            var memberItem = e.currentTarget;
            var info = memberItem.dataSource;
            if (!info || !info.isExist())
                return;
            if (e.type == Laya.Event.MOUSE_DOWN) {
                this._clickPoint = new Laya.Point(e.stageX, e.stageY);
                this.setChildIndex(memberItem, this.numChildren - 1);
                memberItem.startDrag(new Laya.Rectangle(0, 0, Laya.stage.width - 200, Laya.stage.height - 470));
                memberItem.startMove();
            }
            else if (e.type == Laya.Event.MOUSE_UP) {
                memberItem.stopDrag();
                // 没移动过不触发
                if (this._clickPoint && this._clickPoint.x == e.stageX && this._clickPoint.y == e.stageY) {
                    return;
                }
                // 目标 -- 移动ui中点的是否在目标内
                var targetItem = this._memberItems.find(function (item) {
                    return item.isInInitArea(memberItem.x + 100, memberItem.y + 195);
                });
                // 落在其他正确位置
                if (targetItem && targetItem != memberItem) {
                    this._thread.swapMember(info, targetItem.dataSource).then(function (succ) {
                        memberItem.stopMove();
                        _this.updateView();
                    });
                }
                else {
                    memberItem.stopMove();
                }
            }
            else if (e.type == Laya.Event.MOUSE_OUT) {
                // 移开舞台会不触发MOUSE_UP事件，所以需要监听MOUSE_OUT。
                memberItem.stopDrag();
                memberItem.stopMove();
            }
            else if (e.type == Laya.Event.MOUSE_MOVE) {
                this.menuUI.onClosed();
                memberItem.clearChat();
            }
            else if (e.type == Laya.Event.CLICK) {
                // 点击自己无用
                if (info.isSelf()) {
                    this.menuUI.onClosed();
                    return;
                }
                // 移动过不触发
                if (this._clickPoint && (this._clickPoint.x != e.stageX || this._clickPoint.y != e.stageY)) {
                    this.menuUI.onClosed();
                    return;
                }
                var self_1 = this._model.myTeam.getSelfInfo();
                if (self_1.isCaptain()) {
                    this.menuUI.show({ point: new Laya.Point(e.stageX, e.stageY), info: info });
                }
                else {
                    dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_PLAYER_INFO), info);
                }
            }
        };
        /** 更新奖励次数 */
        GodDmTeamView.prototype.updateRewardCount = function () {
            this.lbCount.text = "\u5956\u52B1\u6B21\u6570\uFF1A" + App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) + "\u6B21";
        };
        GodDmTeamView.prototype.onClick = function (event) {
            var target = event.target;
            if (target == this.btnAdd) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_BUY_VIEW));
            }
            else if (target == this.btnBonus) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_BONUS_RULE));
            }
            else if (target == this.btnChat) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_CHAT_VIEW));
            }
            else if (target == this.btnInvite) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.ONEKEY_INVITE));
            }
            else if (target == this.btnLeave) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.LEAVE_TEAM));
            }
        };
        /** 战斗、准备（取消） */
        GodDmTeamView.prototype.onOperation = function () {
            var _this = this;
            var self = this._model.myTeam.getSelfInfo();
            if (self.isCaptain()) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.START_BATTLE));
            }
            else {
                var thread_1 = this._thread;
                var state_1 = self.svo.state == iface.tb_prop.groupStateTypeKey.yes ? iface.tb_prop.groupStateTypeKey.no : iface.tb_prop.groupStateTypeKey.yes;
                if (state_1 == iface.tb_prop.groupStateTypeKey.yes) {
                    if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) <= 0) {
                        common.AlertBox.showAlert({
                            text: LanMgr.getLan("", 10505),
                            confirmCb: function () {
                                thread_1.changePrepareState(self, state_1).then(function () {
                                    _this.checkState();
                                    _this.refreshMemberItem(App.hero.playerId);
                                });
                            }, parm: null
                        });
                    }
                    else {
                        thread_1.changePrepareState(self, state_1).then(function () {
                            _this.checkState();
                            _this.refreshMemberItem(App.hero.playerId);
                        });
                    }
                }
                else {
                    thread_1.changePrepareState(self, state_1).then(function () {
                        _this.checkState();
                    });
                }
            }
        };
        /** 刷新  */
        GodDmTeamView.prototype.refreshMemberItem = function (playerId) {
            var member = this._memberItems.find(function (item) {
                return item.dataSource && item.dataSource.isExist() && item.dataSource.svo.playerId == playerId;
            });
            if (member) {
                member.refreshData();
            }
        };
        /** 设置自动加入 */
        GodDmTeamView.prototype.onChange = function () {
            var _this = this;
            var self = this._model.myTeam.getSelfInfo();
            if (self.isCaptain() && this.checkBox.visible) {
                var autoJoin = this.checkBox.selected ? iface.tb_prop.groupJoinTypeKey.yes : iface.tb_prop.groupJoinTypeKey.no;
                this._thread.changeJoinState(autoJoin).then(function () {
                    _this.checkBox.selected = _this._model.myTeam.isAutoJoin();
                });
            }
        };
        /** 对话 */
        GodDmTeamView.prototype.addNewChats = function (chatList) {
            if (!chatList || chatList.length == 0)
                return;
            var _loop_1 = function (chatVo) {
                var member = this_1._memberItems.find(function (item) {
                    return item.dataSource && item.dataSource.isExist() && item.dataSource.svo.playerId == chatVo.svo.senderId;
                });
                if (member) {
                    member.addChat(chatVo);
                }
            };
            var this_1 = this;
            for (var _i = 0, chatList_1 = chatList; _i < chatList_1.length; _i++) {
                var chatVo = chatList_1[_i];
                _loop_1(chatVo);
            }
        };
        GodDmTeamView.prototype.clearMemberList = function () {
            for (var _i = 0, _a = this._memberItems; _i < _a.length; _i++) {
                var item = _a[_i];
                item.off(Laya.Event.MOUSE_UP, this, this.onItemClick);
                item.off(Laya.Event.MOUSE_DOWN, this, this.onItemClick);
                item.off(Laya.Event.MOUSE_OUT, this, this.onItemClick);
                item.off(Laya.Event.MOUSE_MOVE, this, this.onItemClick);
                item.off(Laya.Event.CLICK, this, this.onItemClick);
                item.dataSource = null;
            }
        };
        GodDmTeamView.prototype.onRank = function (event) {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_RANK_VIEW));
        };
        GodDmTeamView.prototype.onShop = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_SHOP_VIEW));
        };
        GodDmTeamView.prototype.onBuzhen = function () {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        };
        GodDmTeamView.prototype.onTeam = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_TEAM_LIST));
        };
        GodDmTeamView.prototype.onLeave = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.LEAVE_TEAM));
        };
        return GodDmTeamView;
    }(ui.goddomain.TeamUI));
    game.GodDmTeamView = GodDmTeamView;
})(game || (game = {}));
