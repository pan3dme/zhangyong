

module game {

    export class PrivateChatStorage {

        private static _instance: PrivateChatStorage;
        public static getInstance(): PrivateChatStorage {
            if (!this._instance) {
                this._instance = new PrivateChatStorage();
            }
            return this._instance;
        }

        /** 初始化缓存-解析数据 */
        initStorage():void {
            let map : any = Laya.LocalStorage.getJSON(ChatModel.STORAGE_KEY);
            if(map){
                let friendModel = FriendModel.getInstance();
                let chatModel = ChatModel.getInstance();
                for(let playerId in map){
                    if(friendModel.isMyFriend(playerId)){
                        this.parseStorage(playerId,map[playerId]);
                    }else{
                        map[playerId] = null;
                        delete map[playerId];
                    }
                }
                Laya.LocalStorage.setJSON(ChatModel.STORAGE_KEY,map);
            }
        }

        /** 删除缓存 */
        delStorage(playerId:string):void {
            let map : any = Laya.LocalStorage.getJSON(ChatModel.STORAGE_KEY);
            if(map && map[playerId]){
                map[playerId] = null;
                delete map[playerId];
                Laya.LocalStorage.setJSON(ChatModel.STORAGE_KEY,map);
            }
        }
        /** 重置缓存 */
        resetStorage():void {
            let chatMap = ChatModel.getInstance().getPrivateChatMap();
            let list : PrivateChatInfoVo[] = [];
            for(let value of chatMap.values){
                let info : PrivateChatInfoVo = value;
                if(info.hasChat() && info.isMyFriend()){
                    list.push(info);
                }
            }
            list.sort((a,b)=>{
                return b.lastTime - a.lastTime;
            });
            if(list.length > ChatModel.SAVE_PEOPLE_COUNT){
                list = list.slice(0,ChatModel.SAVE_PEOPLE_COUNT);
            }
            let map = {};
            for(let info of list){
                map[info.playerId] = this.createStorageData(info.getChatList());
            }
            Laya.LocalStorage.setJSON(ChatModel.STORAGE_KEY,map);
        }

        /** 
         *  创建缓存数据格式
         *  最新20条数据
         *  playerId : [[type,content,time],[type,content,time],...]
         */
        createStorageData(chatList:ChatInfoVo[]):any[]{
            let storageList = [];
            let len = chatList.length;
            for(let i = len - 1 , j = 1 ; i >= 0 ; i--,j++){
                if(j > ChatModel.SAVE_CHAT_COUNT){
                    break;
                }
                let info = chatList[i];
                // 是否是我发送的消息
                let type = info.isSelf() ? 1 : 2;
                storageList.push([type,info.svo.content,info.svo.time]);
            }
            return storageList;
        }

        /** 解析缓存数据 */
        parseStorage(playerId,list:any[]):void {
            let playerInfo = ChatModel.getInstance().createPrivateChatInfo(playerId);
            let friend : IFriendInfoVo = FriendModel.getInstance().getFriendById(playerId);
            for(let data of list){
                let isSelfSend = data[0] == 1;
                let svo : IServerChatVo = {
                    senderName : isSelfSend ? App.hero.name : friend.name,
                    senderId : isSelfSend ? App.hero.playerId : friend.playerId,
                    receiveId : isSelfSend ? friend.playerId : App.hero.playerId,
                    receiveName : isSelfSend ? friend.name : App.hero.name,
                    senderLevel : isSelfSend ? App.hero.level : friend.level,
                    senderHead : isSelfSend ? App.hero.getHeadId() : friend.head,
                    senderHeadFrame : isSelfSend ? App.hero.headFrame : friend.headFrame,
                    time : data[2],
                    content : data[1],
                    city : LanMgr.getLan("",12230),
                    type : iface.tb_prop.chatTypeKey.text
                };
                let info = new ChatInfoVo(svo,iface.tb_prop.chatChannelTypeKey.whisper);
                playerInfo.addStorageChat(info);
            }
        }

    }
}