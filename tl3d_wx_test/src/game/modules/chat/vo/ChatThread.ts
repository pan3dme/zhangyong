

module game {

    export class ChatThread {

        private static _instance: ChatThread;
        public static getInstance(): ChatThread {
            if (!this._instance) {
                
                this._instance = new ChatThread();
            }
            return this._instance;
        }

        /** 后台请求列表：增量 */
        startAutoRequest(type:number,atOnce:boolean=false):void {
            Laya.timer.clear(this,this.onRequest);
            Laya.timer.loop(5000,this,this.onRequest,[type]);
            if(atOnce){
                this.onRequest(type);
            }
        }

        onRequest(type:number):void {
            if(type == iface.tb_prop.chatChannelTypeKey.guild && !GuildModel.getInstance().isHasGuild()){
                return;
            }
            if(type == iface.tb_prop.chatChannelTypeKey.group && !GodDomainModel.getInstance().isOpen()){
                return;
            }
            let arg = {};
            arg[Protocol.chat_chat_list.args.channel] = type;
            PLC.request(Protocol.chat_chat_list,arg,(res)=>{
                if(!res) return;
                ChatModel.getInstance().updateChatList(res);
            },false);
        }
        /** 停止后台请求 */
        stopRequest():void {
            Laya.timer.clear(this,this.onRequest);
        }
    }
}