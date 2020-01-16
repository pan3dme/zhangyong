var game;
(function (game) {
    var ChatThread = /** @class */ (function () {
        function ChatThread() {
        }
        ChatThread.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChatThread();
            }
            return this._instance;
        };
        /** 后台请求列表：增量 */
        ChatThread.prototype.startAutoRequest = function (type, atOnce) {
            if (atOnce === void 0) { atOnce = false; }
            Laya.timer.clear(this, this.onRequest);
            Laya.timer.loop(5000, this, this.onRequest, [type]);
            if (atOnce) {
                this.onRequest(type);
            }
        };
        ChatThread.prototype.onRequest = function (type) {
            if (type == iface.tb_prop.chatChannelTypeKey.guild && !game.GuildModel.getInstance().isHasGuild()) {
                return;
            }
            if (type == iface.tb_prop.chatChannelTypeKey.group && !game.GodDomainModel.getInstance().isOpen()) {
                return;
            }
            var arg = {};
            arg[Protocol.chat_chat_list.args.channel] = type;
            PLC.request(Protocol.chat_chat_list, arg, function (res) {
                if (!res)
                    return;
                game.ChatModel.getInstance().updateChatList(res);
            }, false);
        };
        /** 停止后台请求 */
        ChatThread.prototype.stopRequest = function () {
            Laya.timer.clear(this, this.onRequest);
        };
        return ChatThread;
    }());
    game.ChatThread = ChatThread;
})(game || (game = {}));
