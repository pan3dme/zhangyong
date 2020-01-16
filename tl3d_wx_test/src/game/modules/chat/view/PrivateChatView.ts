
module game {

    export class PrivateChatView extends ui.chat.PrivateChatUI {

        private _buffList : common.BuffRenderList;
        private _curIdx : number;
        private _curPrivateChat : PrivateChatInfoVo;
        constructor(){
            super();
            this.isModelClose = true;
        }

        createChildren():void {
            super.createChildren();
            this._buffList = new common.BuffRenderList(this.chatBox.width,this.chatBox.height,null,50,2,false);
			this._buffList.isAutoScroll = true;
			this._buffList.spaceY = 10;
			this._buffList.itemRender = ChatIR;
            this._buffList.itemRenderWidth = this.chatBox.width;
			this.chatBox.addChild(this._buffList);
            this.friendList.mouseHandler = new Handler(this, this.onSelect);
            this.friendList.renderHandler = new Handler(this, this.onRender);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this._buffList.removeAll();
            this._curPrivateChat = null;
            this._curIdx = -1;
            this.friendList.selectedIndex = -1;
            this.friendList.array = null;
            this.faceUI.onExit();
            dispatchEvt(new ChatEvent(ChatEvent.STOP_REQUEST_PRIVATE_CHAT));
            tl3d.ModuleEventManager.removeEvent(ChatEvent.ADD_PRIVATE_CHAT,this.addNewChat,this);
            tl3d.ModuleEventManager.removeEvent(ChatEvent.NEW_PERSON_PRIVATE_CHAT,this.addNewPersonChat,this);
            this.btnFace.off(Laya.Event.CLICK, this, this.onFace);
            this.btnSend.off(Laya.Event.CLICK, this, this.onSend);
            this.textInput.off(Laya.Event.ENTER,this,this.onSend);
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            let chatList = ChatModel.getInstance().getPrivateChatList();
            this.friendList.array = chatList;
            if(chatList.length > 0){
                this.renderePrivateChat(0,chatList[0]);
            }
            this.bgPanel.dataSource = {uiName:UIConst.Chat_SiliaoView,closeOnSide:this.isModelClose,closeOnButton:false, title:LanMgr.getLan("",12498)};
            this.faceUI.onEnter(this.clickFaceCb.bind(this));
            this.btnFace.on(Laya.Event.CLICK, this, this.onFace);
            this.btnSend.on(Laya.Event.CLICK, this, this.onSend);
            this.textInput.on(Laya.Event.ENTER,this,this.onSend);
            tl3d.ModuleEventManager.addEvent(ChatEvent.ADD_PRIVATE_CHAT,this.addNewChat,this);
            tl3d.ModuleEventManager.addEvent(ChatEvent.NEW_PERSON_PRIVATE_CHAT,this.addNewPersonChat,this);
            dispatchEvt(new ChatEvent(ChatEvent.START_REQUEST_PRIVATE_CHAT));
        }
        /** 选择私聊对象 */
        private onSelect(e: Laya.Event, index: number):void {
            if (e.type == Laya.Event.CLICK) {
                if(this._curIdx == index) return;
                this.renderePrivateChat(index);
            }
        }
        /** 渲染聊天内容 */
        private renderePrivateChat(index:number,info:PrivateChatInfoVo=null):void {
            let item = this.friendList.getCell(index) as PrivateChatIR;
            if(!item) return;
            this._curIdx = index;
             this.friendList.selectedIndex = index;
            this._curPrivateChat = item.dataSource ? item.dataSource : info;
            if(this._curPrivateChat){
                this._curPrivateChat.resetNewNum(false);
                item.updateRedPoint();
                this._buffList.dataSource = [].concat(this._curPrivateChat.getChatList());
                this._buffList.isAutoScroll = true;
			    this._buffList.updateScrollMaxForce();
            }
        }
        
        /** 添加信息私聊消息 */
        private addNewChat(event:ChatEvent):void {
            if(this._curPrivateChat){
                let playerId = event.data[0];
                let chatInfo = event.data[1];
                if(chatInfo && this._curPrivateChat && this._curPrivateChat.playerId == playerId) {
                    this._curPrivateChat.resetNewNum(false);
                    this._buffList.addItem(chatInfo);
                    if (this._buffList.isAutoScroll) {
                        this._buffList.updateScrollMaxForce();
                    }
                }else{
                    for(let box of this.friendList.cells){
                        (box as PrivateChatIR).updateRedPoint();
                    }
                }
            }
        }
        /** 添加新的好友的私聊 */
        private addNewPersonChat(event:ChatEvent):void {
            let newPersonAry = event.data as Array<PrivateChatInfoVo>;
            for(let info of newPersonAry){
                this.friendList.addItem(info);
            }
            this.friendList.refresh();
            if(this._curIdx){
                this.renderePrivateChat(this._curIdx);
            }
        }

        /** 删除私聊对象 */
        delItem(itemRender:PrivateChatIR):void {
            let index = this.friendList.cells.findIndex((item)=>{
                return itemRender == item;
            });
            if(index != -1){
                this.friendList.deleteItem(index);
                if(index == this._curIdx){
                    this._buffList.removeAll();
                    this._curIdx = -1;
                     this.friendList.selectedIndex = -1;
                    this._curPrivateChat = null;
                }
            }
            if(this.friendList.length == 0) {
                this.close();
            }
        }

        private clickFaceCb(face:IExpressionVo):void {
			this.textInput.text += face.id;
		}

        private onFace():void {
            this.faceUI.onOpenOrHide();
        }

        private onRender(itemRender: PrivateChatIR, index: number): void {
            if(index > this.friendList.length)
                return;
            itemRender.btn_select.selected = index == this.friendList.selectedIndex;
        }
        
        private onSend():void {
            if(this._curPrivateChat){
                dispatchEvt(new ChatEvent(ChatEvent.SEND_PRIVATE_CHAT,[this._curPrivateChat.playerId,this.textInput.text]));
            }
        }
    }
}