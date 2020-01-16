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
    var PrivateChatView = /** @class */ (function (_super) {
        __extends(PrivateChatView, _super);
        function PrivateChatView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        PrivateChatView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._buffList = new common.BuffRenderList(this.chatBox.width, this.chatBox.height, null, 50, 2, false);
            this._buffList.isAutoScroll = true;
            this._buffList.spaceY = 10;
            this._buffList.itemRender = game.ChatIR;
            this._buffList.itemRenderWidth = this.chatBox.width;
            this.chatBox.addChild(this._buffList);
            this.friendList.mouseHandler = new Handler(this, this.onSelect);
            this.friendList.renderHandler = new Handler(this, this.onRender);
        };
        PrivateChatView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        PrivateChatView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        PrivateChatView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._buffList.removeAll();
            this._curPrivateChat = null;
            this._curIdx = -1;
            this.friendList.selectedIndex = -1;
            this.friendList.array = null;
            this.faceUI.onExit();
            dispatchEvt(new game.ChatEvent(game.ChatEvent.STOP_REQUEST_PRIVATE_CHAT));
            tl3d.ModuleEventManager.removeEvent(game.ChatEvent.ADD_PRIVATE_CHAT, this.addNewChat, this);
            tl3d.ModuleEventManager.removeEvent(game.ChatEvent.NEW_PERSON_PRIVATE_CHAT, this.addNewPersonChat, this);
            this.btnFace.off(Laya.Event.CLICK, this, this.onFace);
            this.btnSend.off(Laya.Event.CLICK, this, this.onSend);
            this.textInput.off(Laya.Event.ENTER, this, this.onSend);
            this.bgPanel.dataSource = null;
        };
        PrivateChatView.prototype.initView = function () {
            var chatList = game.ChatModel.getInstance().getPrivateChatList();
            this.friendList.array = chatList;
            if (chatList.length > 0) {
                this.renderePrivateChat(0, chatList[0]);
            }
            this.bgPanel.dataSource = { uiName: UIConst.Chat_SiliaoView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12498) };
            this.faceUI.onEnter(this.clickFaceCb.bind(this));
            this.btnFace.on(Laya.Event.CLICK, this, this.onFace);
            this.btnSend.on(Laya.Event.CLICK, this, this.onSend);
            this.textInput.on(Laya.Event.ENTER, this, this.onSend);
            tl3d.ModuleEventManager.addEvent(game.ChatEvent.ADD_PRIVATE_CHAT, this.addNewChat, this);
            tl3d.ModuleEventManager.addEvent(game.ChatEvent.NEW_PERSON_PRIVATE_CHAT, this.addNewPersonChat, this);
            dispatchEvt(new game.ChatEvent(game.ChatEvent.START_REQUEST_PRIVATE_CHAT));
        };
        /** 选择私聊对象 */
        PrivateChatView.prototype.onSelect = function (e, index) {
            if (e.type == Laya.Event.CLICK) {
                if (this._curIdx == index)
                    return;
                this.renderePrivateChat(index);
            }
        };
        /** 渲染聊天内容 */
        PrivateChatView.prototype.renderePrivateChat = function (index, info) {
            if (info === void 0) { info = null; }
            var item = this.friendList.getCell(index);
            if (!item)
                return;
            this._curIdx = index;
            this.friendList.selectedIndex = index;
            this._curPrivateChat = item.dataSource ? item.dataSource : info;
            if (this._curPrivateChat) {
                this._curPrivateChat.resetNewNum(false);
                item.updateRedPoint();
                this._buffList.dataSource = [].concat(this._curPrivateChat.getChatList());
                this._buffList.isAutoScroll = true;
                this._buffList.updateScrollMaxForce();
            }
        };
        /** 添加信息私聊消息 */
        PrivateChatView.prototype.addNewChat = function (event) {
            if (this._curPrivateChat) {
                var playerId = event.data[0];
                var chatInfo = event.data[1];
                if (chatInfo && this._curPrivateChat && this._curPrivateChat.playerId == playerId) {
                    this._curPrivateChat.resetNewNum(false);
                    this._buffList.addItem(chatInfo);
                    if (this._buffList.isAutoScroll) {
                        this._buffList.updateScrollMaxForce();
                    }
                }
                else {
                    for (var _i = 0, _a = this.friendList.cells; _i < _a.length; _i++) {
                        var box = _a[_i];
                        box.updateRedPoint();
                    }
                }
            }
        };
        /** 添加新的好友的私聊 */
        PrivateChatView.prototype.addNewPersonChat = function (event) {
            var newPersonAry = event.data;
            for (var _i = 0, newPersonAry_1 = newPersonAry; _i < newPersonAry_1.length; _i++) {
                var info = newPersonAry_1[_i];
                this.friendList.addItem(info);
            }
            this.friendList.refresh();
            if (this._curIdx) {
                this.renderePrivateChat(this._curIdx);
            }
        };
        /** 删除私聊对象 */
        PrivateChatView.prototype.delItem = function (itemRender) {
            var index = this.friendList.cells.findIndex(function (item) {
                return itemRender == item;
            });
            if (index != -1) {
                this.friendList.deleteItem(index);
                if (index == this._curIdx) {
                    this._buffList.removeAll();
                    this._curIdx = -1;
                    this.friendList.selectedIndex = -1;
                    this._curPrivateChat = null;
                }
            }
            if (this.friendList.length == 0) {
                this.close();
            }
        };
        PrivateChatView.prototype.clickFaceCb = function (face) {
            this.textInput.text += face.id;
        };
        PrivateChatView.prototype.onFace = function () {
            this.faceUI.onOpenOrHide();
        };
        PrivateChatView.prototype.onRender = function (itemRender, index) {
            if (index > this.friendList.length)
                return;
            itemRender.btn_select.selected = index == this.friendList.selectedIndex;
        };
        PrivateChatView.prototype.onSend = function () {
            if (this._curPrivateChat) {
                dispatchEvt(new game.ChatEvent(game.ChatEvent.SEND_PRIVATE_CHAT, [this._curPrivateChat.playerId, this.textInput.text]));
            }
        };
        return PrivateChatView;
    }(ui.chat.PrivateChatUI));
    game.PrivateChatView = PrivateChatView;
})(game || (game = {}));
