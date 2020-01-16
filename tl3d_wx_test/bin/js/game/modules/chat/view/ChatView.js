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
    var ChatView = /** @class */ (function (_super) {
        __extends(ChatView, _super);
        function ChatView() {
            var _this = _super.call(this) || this;
            _this.defaultText = '                    ' + LanMgr.getLan("", 12499);
            return _this;
        }
        ChatView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            var mgr = DialogExt.manager;
            this.popupEffect = mgr.leftPopupEffHandler;
            this.closeEffect = mgr.leftCloseEffHandler;
            this.popupCenter = false;
            this.centerY = -60;
            this.isModelClose = true;
        };
        ChatView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._openType = -1;
            this.width = this.bg.width = Math.min(Laya.stage.width, 910);
            var boxWid = this.bg.width - this.chatBox.left - this.chatBox.right;
            this._buffList = new common.BuffRenderList(boxWid, this.chatBox.height, null, 50, 2, false);
            this._buffList.isAutoScroll = true;
            this._buffList.spaceY = 10;
            this._buffList.itemRender = game.ChatIR;
            this._buffList.itemRenderWidth = (boxWid - 20 < 580 ? 580 : (boxWid - 20));
            this._buffList.setScrollChangeHandler(this.onScrollChange, this);
            this.chatBox.addChild(this._buffList);
            this.tabList.selectHandler = new Handler(this, this.onTabSelect);
            this.tabList.renderHandler = new Handler(this, this.onTabRender);
            this.tabList.selectedIndex = -1;
            this.btnClose.on(Laya.Event.CLICK, this, this.onExit);
            this.btnFace.on(Laya.Event.CLICK, this, this.onFaceOpenOrHide);
            this.btnQuick.on(Laya.Event.CLICK, this, this.onQuickOpenOrHide);
            this.btnSend.on(Laya.Event.CLICK, this, this.onSend);
            this.imgScroll.on(Laya.Event.CLICK, this, this.scrollToBottom);
            this.textInput.on(Laya.Event.ENTER, this, this.onSend);
        };
        ChatView.prototype.close = function () {
            _super.prototype.close.call(this);
            this._openType = -1;
            this.tabList.array = null;
            this.tabList.selectedIndex = -1;
            this.faceUI.onExit();
            this.quickUI.onExit();
        };
        ChatView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        ChatView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        ChatView.prototype.initView = function () {
            this.faceUI.onEnter(this.clickFaceCb.bind(this), this.imgFace);
            this.quickUI.onEnter(this.clickQuickCb.bind(this), this.imgQuick);
            this.imgScroll.visible = false;
            var dataAry = this.dataSource ? this.dataSource : [];
            this._openType = isNaN(dataAry[0]) ? game.OpenType.common : dataAry[0];
            var channel = isNaN(dataAry[1]) ? 0 : dataAry[1];
            var model = game.ChatModel.getInstance();
            var index = model.getIndexByChannel(channel);
            index = index >= 0 ? index : 0;
            this.tabList.array = model.getTabbarDatas(this._openType);
            this.tabList.selectedIndex = index;
        };
        ChatView.prototype.onTabSelect = function (index) {
            if (index == -1)
                return;
            this.imgScroll.visible = false;
            this._buffList.removeAll();
            var model = game.ChatModel.getInstance();
            var channel = model.getChannelByIndex(this.tabList.selectedIndex);
            var arr = model.getChatListByType(channel);
            this._buffList.dataSource = arr.concat();
            this._buffList.isAutoScroll = true;
            this._buffList.updateScrollMaxForce();
            var lv = App.getOpenValue(ModuleConst.CHAT);
            if (index == 0 || index == 1) {
                this.textInput.prompt = App.hero.level >= lv ? this.defaultText : LanMgr.getLan('', 11017, lv);
            }
            else {
                this.textInput.prompt = this.defaultText;
            }
            model.resetNewNum(channel);
            var isSys = channel == iface.tb_prop.chatChannelTypeKey.system;
            this.btnQuick.visible = this.btnFace.visible = this.btnSend.visible = this.bgInput.visible = !isSys;
            this.imgFace.visible = this.imgQuick.visible = false;
            this.tabList.refresh();
        };
        ChatView.prototype.addNewChats = function (chatList) {
            if (!this._buffList || !chatList || chatList.length == 0)
                return;
            var len = chatList.length;
            for (var i = 0; i < len; i++) {
                this._buffList.addItem(chatList[i]);
            }
            if (this._buffList.isAutoScroll) {
                this._buffList.updateScrollMaxForce();
            }
            else {
                this.imgScroll.visible = true;
            }
        };
        ChatView.prototype.onTabRender = function (cell, index) {
            if (!cell)
                return;
            var curIndex = this.tabList.selectedIndex;
            var btn = cell.btnChannel;
            btn.selected = index == curIndex;
            btn.labelSize = index == curIndex ? 26 : 22;
            btn.labelColors = index == curIndex ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
        };
        /** 更新新消息数量 */
        ChatView.prototype.updateNewChatNum = function () {
            var model = game.ChatModel.getInstance();
            var channel = model.getChannelByIndex(this.tabList.selectedIndex);
            model.resetNewNum(channel);
            this.tabList.refresh();
        };
        ChatView.prototype.afterSend = function () {
            this._buffList.isAutoScroll = true;
            this.imgScroll.visible = false;
            this.textInput.text = "";
        };
        /** 滚动位置更新 */
        ChatView.prototype.onScrollChange = function (value, isDown) {
            if (value >= this._buffList.scrollBar.max) {
                this._buffList.isAutoScroll = true;
                this.imgScroll.visible = false;
            }
            else {
                this._buffList.isAutoScroll = false;
            }
        };
        /** 滚动到底部 */
        ChatView.prototype.scrollToBottom = function () {
            this._buffList.isAutoScroll = true;
            this.imgScroll.visible = false;
            this._buffList.updateScrollMaxForce();
        };
        /** 发送消息 */
        ChatView.prototype.onSend = function () {
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SEND_CHAT_TEXT, [this.textInput.text, this.tabList.selectedIndex]));
        };
        /** 点击表情回调 */
        ChatView.prototype.clickFaceCb = function (face) {
            this.textInput.text += face.id;
        };
        ChatView.prototype.clickQuickCb = function (info) {
            if (!info)
                return;
            if (info.ID == 4 && !game.GuildModel.getInstance().isHasGuild()) {
                showToast(LanMgr.getLan("", 10259));
                return;
            }
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SEND_CHAT_TEXT, [info.desc, this.tabList.selectedIndex]));
        };
        /**点击表情按钮 */
        ChatView.prototype.onFaceOpenOrHide = function () {
            this.faceUI.onOpenOrHide();
        };
        ChatView.prototype.onQuickOpenOrHide = function () {
            this.quickUI.onOpenOrHide();
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SHORTCUTS_OPEN_OR_HIDE));
        };
        ChatView.prototype.onExit = function () {
            UIMgr.hideUIByName(UIConst.ChatView);
        };
        return ChatView;
    }(ui.chat.ChatUI));
    game.ChatView = ChatView;
})(game || (game = {}));
