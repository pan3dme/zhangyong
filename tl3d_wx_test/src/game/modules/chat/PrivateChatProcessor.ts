

module game {

    export class PrivateChatProcessor extends tl3d.Processor {

	    constructor(){
			super();
		}
        public getName(): string {
            return "PrivateChatProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new ChatEvent(ChatEvent.SHOW_PRIVATE_CHAT_VIEW),
                new ChatEvent(ChatEvent.SEND_PRIVATE_CHAT),
                new ChatEvent(ChatEvent.DEL_PRIVATE_CHAT),
                
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof ChatEvent) {
                switch ($event.type) {
                    case ChatEvent.SHOW_PRIVATE_CHAT_VIEW:
                        this.showPrivateChat($event.data);
                        break;
                    case ChatEvent.SEND_PRIVATE_CHAT:
                        this.onSendPrivateChat($event.data);
                        break;
                    case ChatEvent.DEL_PRIVATE_CHAT:
                        this.delPrivateChat($event.data);
                        break;
                    
                }
            }
        }

        /** 打开私聊界面 */
        private showPrivateChat(playerId:string):void {
            let chatModel = ChatModel.getInstance();
            if(playerId){
                if(!FriendModel.getInstance().isMyFriend(playerId)){
                    showToast(LanMgr.getLan('',10138));
                    return;
                }
                let info = chatModel.createPrivateChatInfo(playerId);
                info.lastTime = new Date().getTime();
            }else{
                // 没有私聊数据
                if(!chatModel.hasPrivateChat()){
                    showToast(LanMgr.getLan('',10141));
                    return;
                }
            }
            UIMgr.showUI(UIConst.Chat_SiliaoView,playerId);
        }

        /** 发送私聊信息 */
        private onSendPrivateChat(args:any[]):void {
            let playerId : string = args[0];
            let ct : string = args[1];
            if(!ct || ct == "" || ct.trim().length <= 0) {
                showToast(LanMgr.getLan('',10012));
                return;
            }
            if(!FriendModel.getInstance().isMyFriend(playerId)){
                showToast(LanMgr.getLan('',10133));
                return;
            }
             let lv = App.getOpenValue(ModuleConst.CHAT);
            if (!App.IsSysOpen(ModuleConst.CHAT)) {
				showToast(LanMgr.getLan('', 11017,lv));
				return;
			}
            let arg = {};
            arg[Protocol.chat_chat_send.args.channel] = iface.tb_prop.chatChannelTypeKey.whisper;
            arg[Protocol.chat_chat_send.args.type] = iface.tb_prop.chatTypeKey.text;
            arg[Protocol.chat_chat_send.args.content] = ct;
            arg[Protocol.chat_chat_send.args.receiveId] = playerId;
            PLC.request(Protocol.chat_chat_send,arg,(res)=>{
                if(!res) return;
                ChatThread.getInstance().onRequest(iface.tb_prop.chatChannelTypeKey.whisper);
                this.privateChatView.textInput.text = "";
            });
        }
        /** 删除私聊信息 */
        private delPrivateChat(itemRender:PrivateChatIR):void {
            let info : PrivateChatInfoVo = itemRender.dataSource;
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10140), 
                confirmCb: () => {
                    ChatModel.getInstance().delPrivateChat(info.playerId);
                    this.privateChatView.delItem(itemRender);
                }
            });
        }

        get privateChatView():PrivateChatView {
            return UIMgr.getUIByName(UIConst.Chat_SiliaoView);
        }
    }
}