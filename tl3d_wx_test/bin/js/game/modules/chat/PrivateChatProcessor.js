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
    var PrivateChatProcessor = /** @class */ (function (_super) {
        __extends(PrivateChatProcessor, _super);
        function PrivateChatProcessor() {
            return _super.call(this) || this;
        }
        PrivateChatProcessor.prototype.getName = function () {
            return "PrivateChatProcessor";
        };
        PrivateChatProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ChatEvent(game.ChatEvent.SHOW_PRIVATE_CHAT_VIEW),
                new game.ChatEvent(game.ChatEvent.SEND_PRIVATE_CHAT),
                new game.ChatEvent(game.ChatEvent.DEL_PRIVATE_CHAT),
            ];
        };
        //处理事件
        PrivateChatProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.ChatEvent) {
                switch ($event.type) {
                    case game.ChatEvent.SHOW_PRIVATE_CHAT_VIEW:
                        this.showPrivateChat($event.data);
                        break;
                    case game.ChatEvent.SEND_PRIVATE_CHAT:
                        this.onSendPrivateChat($event.data);
                        break;
                    case game.ChatEvent.DEL_PRIVATE_CHAT:
                        this.delPrivateChat($event.data);
                        break;
                }
            }
        };
        /** 打开私聊界面 */
        PrivateChatProcessor.prototype.showPrivateChat = function (playerId) {
            var chatModel = game.ChatModel.getInstance();
            if (playerId) {
                if (!game.FriendModel.getInstance().isMyFriend(playerId)) {
                    showToast(LanMgr.getLan('', 10138));
                    return;
                }
                var info = chatModel.createPrivateChatInfo(playerId);
                info.lastTime = new Date().getTime();
            }
            else {
                // 没有私聊数据
                if (!chatModel.hasPrivateChat()) {
                    showToast(LanMgr.getLan('', 10141));
                    return;
                }
            }
            UIMgr.showUI(UIConst.Chat_SiliaoView, playerId);
        };
        /** 发送私聊信息 */
        PrivateChatProcessor.prototype.onSendPrivateChat = function (args) {
            var _this = this;
            var playerId = args[0];
            var ct = args[1];
            if (!ct || ct == "" || ct.trim().length <= 0) {
                showToast(LanMgr.getLan('', 10012));
                return;
            }
            if (!game.FriendModel.getInstance().isMyFriend(playerId)) {
                showToast(LanMgr.getLan('', 10133));
                return;
            }
            var lv = App.getOpenValue(ModuleConst.CHAT);
            if (!App.IsSysOpen(ModuleConst.CHAT)) {
                showToast(LanMgr.getLan('', 11017, lv));
                return;
            }
            var arg = {};
            arg[Protocol.chat_chat_send.args.channel] = iface.tb_prop.chatChannelTypeKey.whisper;
            arg[Protocol.chat_chat_send.args.type] = iface.tb_prop.chatTypeKey.text;
            arg[Protocol.chat_chat_send.args.content] = ct;
            arg[Protocol.chat_chat_send.args.receiveId] = playerId;
            PLC.request(Protocol.chat_chat_send, arg, function (res) {
                if (!res)
                    return;
                game.ChatThread.getInstance().onRequest(iface.tb_prop.chatChannelTypeKey.whisper);
                _this.privateChatView.textInput.text = "";
            });
        };
        /** 删除私聊信息 */
        PrivateChatProcessor.prototype.delPrivateChat = function (itemRender) {
            var _this = this;
            var info = itemRender.dataSource;
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10140),
                confirmCb: function () {
                    game.ChatModel.getInstance().delPrivateChat(info.playerId);
                    _this.privateChatView.delItem(itemRender);
                }
            });
        };
        Object.defineProperty(PrivateChatProcessor.prototype, "privateChatView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Chat_SiliaoView);
            },
            enumerable: true,
            configurable: true
        });
        return PrivateChatProcessor;
    }(tl3d.Processor));
    game.PrivateChatProcessor = PrivateChatProcessor;
})(game || (game = {}));
