

module game {

    export class PrivateChatInfoVo {

        public playerId : string;
        private _chatList : ChatInfoVo[];
        public lastTime : number;         // 最新的聊天信息时间

        public newNum : number = 0;     // 新消息数量
        constructor(playerId:string){
            this.playerId = playerId;
            this._chatList = [];
            this.lastTime = new Date().getTime();
        }
        /** 添加缓存数据 */
        addStorageChat(info:ChatInfoVo):void {
            this._chatList.push(info);
            this.lastTime = info.svo.time;
            this._chatList.sort((a,b)=>{
                return a.svo.time - b.svo.time;
            });
        }
        /** 添加聊天数据 */
        addChat(info:ChatInfoVo):void {
            this._chatList.push(info);
            this.lastTime = info.svo.time;
            if(!info.isSelf()) {
                this.newNum ++;
            }
            dispatchEvt(new ChatEvent(ChatEvent.ADD_PRIVATE_CHAT,[this.playerId,info]));
        }
        resetNewNum(flag:boolean):void {
            this.newNum = 0;
            dispatchEvt(new ChatEvent(ChatEvent.UPDATE_PRIVATE_CHAT));
        }
        /** 获取聊天列表 */
        getChatList():ChatInfoVo[] {
            return this._chatList;
        }
        /** 是否有聊天 */
        hasChat():boolean {
            return this._chatList.length > 0;
        }
        /** 是否好友 */
        isMyFriend():boolean {
            return FriendModel.getInstance().isMyFriend(this.playerId);
        }
        /** 是否已经存在该聊天 */
        isExitChat(senderId:string,time:number):boolean {
            return this._chatList.some((info)=>{
                return info.svo.senderId == senderId && info.svo.time == time;
            });
        }
    }
}