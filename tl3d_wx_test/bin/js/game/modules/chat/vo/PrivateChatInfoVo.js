var game;
(function (game) {
    var PrivateChatInfoVo = /** @class */ (function () {
        function PrivateChatInfoVo(playerId) {
            this.newNum = 0; // 新消息数量
            this.playerId = playerId;
            this._chatList = [];
            this.lastTime = new Date().getTime();
        }
        /** 添加缓存数据 */
        PrivateChatInfoVo.prototype.addStorageChat = function (info) {
            this._chatList.push(info);
            this.lastTime = info.svo.time;
            this._chatList.sort(function (a, b) {
                return a.svo.time - b.svo.time;
            });
        };
        /** 添加聊天数据 */
        PrivateChatInfoVo.prototype.addChat = function (info) {
            this._chatList.push(info);
            this.lastTime = info.svo.time;
            if (!info.isSelf()) {
                this.newNum++;
            }
            dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_PRIVATE_CHAT, [this.playerId, info]));
        };
        PrivateChatInfoVo.prototype.resetNewNum = function (flag) {
            this.newNum = 0;
            dispatchEvt(new game.ChatEvent(game.ChatEvent.UPDATE_PRIVATE_CHAT));
        };
        /** 获取聊天列表 */
        PrivateChatInfoVo.prototype.getChatList = function () {
            return this._chatList;
        };
        /** 是否有聊天 */
        PrivateChatInfoVo.prototype.hasChat = function () {
            return this._chatList.length > 0;
        };
        /** 是否好友 */
        PrivateChatInfoVo.prototype.isMyFriend = function () {
            return game.FriendModel.getInstance().isMyFriend(this.playerId);
        };
        /** 是否已经存在该聊天 */
        PrivateChatInfoVo.prototype.isExitChat = function (senderId, time) {
            return this._chatList.some(function (info) {
                return info.svo.senderId == senderId && info.svo.time == time;
            });
        };
        return PrivateChatInfoVo;
    }());
    game.PrivateChatInfoVo = PrivateChatInfoVo;
})(game || (game = {}));
