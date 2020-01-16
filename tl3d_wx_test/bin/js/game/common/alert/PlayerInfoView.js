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
var common;
(function (common) {
    /** 玩家信息界面 */
    var PlayerInfoView = /** @class */ (function (_super) {
        __extends(PlayerInfoView, _super);
        function PlayerInfoView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this._fdmodel = game.FriendModel.getInstance();
            return _this;
        }
        PlayerInfoView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnAdd.on(Laya.Event.CLICK, this, this.onClick);
            this.btnChat.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_del.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_qxlh.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_lh.on(Laya.Event.CLICK, this, this.onClick);
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        };
        PlayerInfoView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        PlayerInfoView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        PlayerInfoView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btn_del.visible = this.btn_lh.visible = this.btn_qxlh.visible = this.btnAdd.visible = this.btnChat.visible = true;
            this.lineupUI.dataSource = null;
        };
        PlayerInfoView.prototype.initView = function () {
            this.lab_title.text = "好友详情";
            var info = this.dataSource;
            var clientVo = info.clientVo;
            this.lbName.text = clientVo && clientVo.name ? clientVo.name : info.svo.name;
            var guildName = clientVo && clientVo.guildName ? clientVo.guildName : info.svo.guildName;
            this.lbGuild.text = guildName ? LanMgr.getLan("", 12560, guildName) : LanMgr.getLan("", 12561);
            this.headBox.dataSource = new UserHeadVo(info.svo.head, info.svo.level, info.svo.headFrame);
            var isFirend = this._fdmodel.isMyFriend(info.svo.playerId);
            this.btnAdd.visible = !isFirend;
            this.btn_del.visible = isFirend;
            this.updateBlockBtn();
            this.lineupUI.dataSource = { lineupGods: info.getLineupGods(), shenqiAry: info.getShenqiAry(), showShenli: true, force: info.svo.force, userLevel: info.svo.level, title: "" };
            // 隐藏所有按钮
            if (info.hideAllBtn) {
                this.btn_del.visible = this.btn_lh.visible = this.btn_qxlh.visible = this.btnAdd.visible = this.btnChat.visible = false;
            }
        };
        PlayerInfoView.prototype.updateBlockBtn = function () {
            var info = this.dataSource;
            var isBlock = App.hero.isInBlockList(info.svo.playerId);
            this.btn_lh.visible = !isBlock;
            this.btn_qxlh.visible = isBlock;
        };
        PlayerInfoView.prototype.onClick = function (event) {
            var _this = this;
            var info = this.dataSource;
            var btn = event.target;
            if (btn == this.btnAdd) {
                dispatchEvt(new game.FriendEvent(game.FriendEvent.FRIEND_PANAEL_ADDFRIEND), info.svo.playerId);
            }
            else if (btn == this.btnChat) {
                dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_PRIVATE_CHAT_VIEW), info.svo.playerId);
                this.close();
            }
            else if (btn == this.btn_del) {
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10485), confirmCb: function ($data) {
                        var args = {};
                        args[Protocol.friend_friend_delete.args.playerId] = $data.svo.playerId;
                        PLC.request(Protocol.friend_friend_delete, args, function ($$data, msg) {
                            if (!$$data)
                                return;
                            _this._fdmodel.delFriend($$data.delfriend);
                            var friendsMainView = UIMgr.getUIByName(UIConst.Friend_MainView);
                            if (friendsMainView)
                                friendsMainView.initFriendListView();
                            _this.close();
                        });
                    }, parm: info
                });
            }
            else if (btn == this.btn_lh) {
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10486), confirmCb: function ($data) {
                        var args = {};
                        args[Protocol.friend_friend_pullBlack.args.playerId] = $data.svo.playerId;
                        PLC.request(Protocol.friend_friend_pullBlack, args, function ($$data, msg) {
                            if (!$$data)
                                return;
                            App.hero.addBlockList($$data.addBlack);
                            // this.updateBlockBtn();
                            _this._fdmodel.delFriend($$data.delfriend);
                            var friendsMainView = UIMgr.getUIByName(UIConst.Friend_MainView);
                            if (friendsMainView)
                                friendsMainView.initFriendListView();
                            _this.close();
                        });
                    }, parm: info
                });
            }
            else if (btn == this.btn_qxlh) {
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10487), confirmCb: function ($data) {
                        var args = {};
                        args[Protocol.friend_friend_pullWhite.args.playerId] = $data.svo.playerId;
                        PLC.request(Protocol.friend_friend_pullWhite, args, function ($$data, msg) {
                            if (!$$data)
                                return;
                            App.hero.removeBlockListById($$data.delBlack);
                            _this.updateBlockBtn();
                        });
                    }, parm: info
                });
            }
        };
        return PlayerInfoView;
    }(ui.component.PlayerInfoUI));
    common.PlayerInfoView = PlayerInfoView;
    /** 用户信息 */
    var PlayerInfoVo = /** @class */ (function (_super) {
        __extends(PlayerInfoVo, _super);
        function PlayerInfoVo() {
            var _this = _super.call(this) || this;
            _this.hideAllBtn = false; // 隐藏所有按钮
            _this.isCrossSvr = false; // 是否跨服玩家
            return _this;
        }
        PlayerInfoVo.prototype.setData = function (svo, userid, event, eventdata, hideAllBtn, isCrossSvr) {
            if (event === void 0) { event = null; }
            if (eventdata === void 0) { eventdata = null; }
            if (hideAllBtn === void 0) { hideAllBtn = false; }
            if (isCrossSvr === void 0) { isCrossSvr = false; }
            this.hideAllBtn = hideAllBtn;
            this.isCrossSvr = isCrossSvr;
            this.svo = svo;
            svo.playerId = userid;
            this.svo.event = event;
            this.svo.eventdata = eventdata;
            this.setLineupInfo(svo.lineupInfo);
            this.setDataType(1);
        };
        return PlayerInfoVo;
    }(BaseFightVo));
    common.PlayerInfoVo = PlayerInfoVo;
})(common || (common = {}));
