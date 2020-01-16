var game;
(function (game) {
    var PrivateChatStorage = /** @class */ (function () {
        function PrivateChatStorage() {
        }
        PrivateChatStorage.getInstance = function () {
            if (!this._instance) {
                this._instance = new PrivateChatStorage();
            }
            return this._instance;
        };
        /** 初始化缓存-解析数据 */
        PrivateChatStorage.prototype.initStorage = function () {
            var map = Laya.LocalStorage.getJSON(game.ChatModel.STORAGE_KEY);
            if (map) {
                var friendModel = game.FriendModel.getInstance();
                var chatModel = game.ChatModel.getInstance();
                for (var playerId in map) {
                    if (friendModel.isMyFriend(playerId)) {
                        this.parseStorage(playerId, map[playerId]);
                    }
                    else {
                        map[playerId] = null;
                        delete map[playerId];
                    }
                }
                Laya.LocalStorage.setJSON(game.ChatModel.STORAGE_KEY, map);
            }
        };
        /** 删除缓存 */
        PrivateChatStorage.prototype.delStorage = function (playerId) {
            var map = Laya.LocalStorage.getJSON(game.ChatModel.STORAGE_KEY);
            if (map && map[playerId]) {
                map[playerId] = null;
                delete map[playerId];
                Laya.LocalStorage.setJSON(game.ChatModel.STORAGE_KEY, map);
            }
        };
        /** 重置缓存 */
        PrivateChatStorage.prototype.resetStorage = function () {
            var chatMap = game.ChatModel.getInstance().getPrivateChatMap();
            var list = [];
            for (var _i = 0, _a = chatMap.values; _i < _a.length; _i++) {
                var value = _a[_i];
                var info = value;
                if (info.hasChat() && info.isMyFriend()) {
                    list.push(info);
                }
            }
            list.sort(function (a, b) {
                return b.lastTime - a.lastTime;
            });
            if (list.length > game.ChatModel.SAVE_PEOPLE_COUNT) {
                list = list.slice(0, game.ChatModel.SAVE_PEOPLE_COUNT);
            }
            var map = {};
            for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                var info = list_1[_b];
                map[info.playerId] = this.createStorageData(info.getChatList());
            }
            Laya.LocalStorage.setJSON(game.ChatModel.STORAGE_KEY, map);
        };
        /**
         *  创建缓存数据格式
         *  最新20条数据
         *  playerId : [[type,content,time],[type,content,time],...]
         */
        PrivateChatStorage.prototype.createStorageData = function (chatList) {
            var storageList = [];
            var len = chatList.length;
            for (var i = len - 1, j = 1; i >= 0; i--, j++) {
                if (j > game.ChatModel.SAVE_CHAT_COUNT) {
                    break;
                }
                var info = chatList[i];
                // 是否是我发送的消息
                var type = info.isSelf() ? 1 : 2;
                storageList.push([type, info.svo.content, info.svo.time]);
            }
            return storageList;
        };
        /** 解析缓存数据 */
        PrivateChatStorage.prototype.parseStorage = function (playerId, list) {
            var playerInfo = game.ChatModel.getInstance().createPrivateChatInfo(playerId);
            var friend = game.FriendModel.getInstance().getFriendById(playerId);
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var data = list_2[_i];
                var isSelfSend = data[0] == 1;
                var svo = {
                    senderName: isSelfSend ? App.hero.name : friend.name,
                    senderId: isSelfSend ? App.hero.playerId : friend.playerId,
                    receiveId: isSelfSend ? friend.playerId : App.hero.playerId,
                    receiveName: isSelfSend ? friend.name : App.hero.name,
                    senderLevel: isSelfSend ? App.hero.level : friend.level,
                    senderHead: isSelfSend ? App.hero.getHeadId() : friend.head,
                    senderHeadFrame: isSelfSend ? App.hero.headFrame : friend.headFrame,
                    time: data[2],
                    content: data[1],
                    city: LanMgr.getLan("", 12230),
                    type: iface.tb_prop.chatTypeKey.text
                };
                var info = new game.ChatInfoVo(svo, iface.tb_prop.chatChannelTypeKey.whisper);
                playerInfo.addStorageChat(info);
            }
        };
        return PrivateChatStorage;
    }());
    game.PrivateChatStorage = PrivateChatStorage;
})(game || (game = {}));
