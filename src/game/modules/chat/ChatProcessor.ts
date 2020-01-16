

module game {

    export class ChatProcessor extends tl3d.Processor {
        gmKey:string="nbhero";
		debugKey:string="debughero";

        private _model : ChatModel;
	    constructor(){
			super();
            this._model = ChatModel.getInstance();
		}
        public getName(): string {
            return "ChatProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new ChatEvent(ChatEvent.SHOW_CHAT_PANEL),
                new ChatEvent(ChatEvent.SEND_CHAT_TEXT),
                new ChatEvent(ChatEvent.SEND_CHAT_VOICE),
                new ChatEvent(ChatEvent.ADD_ALL_CHAT),
                new ChatEvent(ChatEvent.ADD_WORLD_CHAT),
                new ChatEvent(ChatEvent.ADD_GUILD_CHAT),
                new ChatEvent(ChatEvent.ADD_GROUP_CHAT),
                new ChatEvent(ChatEvent.ADD_PROVINCE_CHAT),
                new ChatEvent(ChatEvent.ADD_CROSS_CHAT),
                new ChatEvent(ChatEvent.ADD_SYSTEM_CHAT),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof ChatEvent) {
                switch ($event.type) {
                    case ChatEvent.SHOW_CHAT_PANEL:
                        this.showChatPanel($event.data);
                        break;
                    case ChatEvent.SEND_CHAT_TEXT:
                        this.onSendText($event.data);
                        break;
                    case ChatEvent.SEND_CHAT_VOICE:
                        this.onSendVoice($event.data);
                        break;
                    case ChatEvent.ADD_ALL_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.all);
                        break;
                    case ChatEvent.ADD_WORLD_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.world);
                        break;
                    case ChatEvent.ADD_GUILD_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.guild);
                        break;
                    case ChatEvent.ADD_GROUP_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.group);
                        break;
                    case ChatEvent.ADD_PROVINCE_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.province);
                        break;
                    case ChatEvent.ADD_CROSS_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.crossServer);
                        break;
                    case ChatEvent.ADD_SYSTEM_CHAT:
                        this.addNewChat($event.data,iface.tb_prop.chatChannelTypeKey.system);
                        break;
                }
            }
        }

        /** 打开聊天主界面 */
        private showChatPanel(data:any):void {
            let arg = {};
            arg[Protocol.chat_chat_list.args.channel] = iface.tb_prop.chatChannelTypeKey.all;
            PLC.request(Protocol.chat_chat_list,arg,(res)=>{
                if(!res) return;
                this._model.updateChatList(res);
                UIMgr.showUI(UIConst.ChatView,data);
            });
        }
        
        /** 聊天文本消息发送 */
        private onSendText(args:any[]):void {
            let model = this._model;
            let ct : string = args[0];
            let channel : number = model.getChannelByIndex(args[1]);
            if(channel == iface.tb_prop.chatChannelTypeKey.all) {
                channel = iface.tb_prop.chatChannelTypeKey.world;
            }
            let lv = App.getOpenValue(ModuleConst.CHAT);
			if (channel == iface.tb_prop.chatChannelTypeKey.world  && !App.IsSysOpen(ModuleConst.CHAT)) {
				showToast(LanMgr.getLan('', 11017,lv));
				return;
			}
            if(channel == iface.tb_prop.chatChannelTypeKey.province && !App.IsSysOpen(ModuleConst.CHAT_PROVI)){
                showToast(LanMgr.getLan('', 10251,App.getOpenValue(ModuleConst.CHAT_PROVI)));
				return;
            }
            if(channel == iface.tb_prop.chatChannelTypeKey.crossServer && !App.IsSysOpen(ModuleConst.CHAT_CROSSSRV)){
                showToast(LanMgr.getLan('', 10252,App.getOpenValue(ModuleConst.CHAT_CROSSSRV)));
				return;
            }
            if(channel == iface.tb_prop.chatChannelTypeKey.guild && !App.hero.guildId){
                showToast(LanMgr.getLan('',10071));
                return;
            }
            if(channel == iface.tb_prop.chatChannelTypeKey.group && !GodDomainModel.getInstance().hasTeam()){
                showToast(LanMgr.getLan('',10253));
                return;
            }
            if(!ct || ct == "" || ct.trim().length <= 0) {
                showToast(LanMgr.getLan('',10012));
                return;
            }
            if(ct==this.gmKey){
                PlayerDetailsView.gmLock=false;
                return;
            }
            else if(ct==this.debugKey){
                PlayerDetailsView.debugLock=false;
                return;
            }
            let cdTime = model.getCdTime(channel);
            let s = Math.ceil(cdTime - App.serverTimeSecond);
            if(channel == iface.tb_prop.chatChannelTypeKey.world && App.serverTimeSecond < cdTime) {
                showToast(LanMgr.getLan('',10013,s));
                return;
            }
            if(channel == iface.tb_prop.chatChannelTypeKey.province && App.serverTimeSecond < cdTime) {
                let s = Math.ceil(cdTime - App.serverTimeSecond);
                showToast(LanMgr.getLan('',10254,s));
                return;
            }
            if(channel == iface.tb_prop.chatChannelTypeKey.crossServer && App.serverTimeSecond < cdTime) {
                let s = Math.ceil(cdTime - App.serverTimeSecond);
                showToast(LanMgr.getLan('',10255,s));
                return;
            }
            let arg = {};
            arg[Protocol.chat_chat_send.args.channel] = channel;
            arg[Protocol.chat_chat_send.args.type] = iface.tb_prop.chatTypeKey.text;
            arg[Protocol.chat_chat_send.args.content] = ct;
            PLC.request(Protocol.chat_chat_send,arg,(res)=>{
                if(!res) return;
                model.setCdTime(res['cdTime'],channel);
                // 同省跟跨服发消息完会获取不到自己发的，需要时间
                ChatThread.getInstance().onRequest(channel);
                let ui = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                if(ui){
                    ui.afterSend();
                }
                dispatchEvt(new ChatEvent(ChatEvent.CHAT_SEND_SUCCESS));
            });

            //聊天上报
            var hero=App.hero;
            var sinfo=window.platform.serverInfo;
            BingoSDK.gameReport("chat", hero.playerId, hero.accountName, sinfo.serverId,sinfo.srv_name, {chatTo:channel,content:ct, level: hero.level,vip:hero.vip,charge:hero.welfare.rechargeSum });
        }
        

        /** 聊天语音发送 */
        private onSendVoice(args:any[]):void {
            
        }

        /** 新增聊天消息 */
        private addNewChat(chatList:ChatInfoVo[],type:number):void {
            if(!chatList || chatList.length <= 0) return;
            // 添加新消息
            if(UIMgr.hasStage(UIConst.ChatView)){
                let ui = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                let uiChannel = this._model.getChannelByIndex(ui.tabList.selectedIndex);
                if(uiChannel == type){
                    ui.addNewChats(chatList);
                }
            }
            // 更新主界面聊天消息--没有私聊
            if(UIMgr.hasStage(UIConst.Main3DView) && type == iface.tb_prop.chatChannelTypeKey.all){
                let ui = UIMgr.getUIByName(UIConst.Main3DView) as MainView;
                ui.updateChatList();
            }
            // 更新新消息数量
            if(UIMgr.hasStage(UIConst.ChatView) && type == iface.tb_prop.chatChannelTypeKey.all){
                let ui = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                ui.updateNewChatNum();
            }
        }
        
    }
}