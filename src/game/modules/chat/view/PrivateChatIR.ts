

module game {

    export class PrivateChatIR extends ui.chat.PrivateChatIRUI {

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():PrivateChatInfoVo {
			return this._dataSource;
		}

        private refreshView():void {
            let data = this.dataSource;
            if(data) {
                let friend = FriendModel.getInstance().getFriendById(data.playerId);
                if(friend) {
                    this.headBox.dataSource = new UserHeadVo(friend.head,friend.level,friend.headFrame);
                    this.lab_name.text = friend.name;
                }
                this.updateRedPoint();
                this.btnDel.on(Laya.Event.CLICK,this,this.onDel);
            }else{
                this.btnDel.off(Laya.Event.CLICK,this,this.onDel);
            }
        }
        /** 更新红点，是否有新消息 */
        public updateRedPoint():void {
            let data = this.dataSource;
            if(data) {
                this.redpoint.visible = data.newNum > 0;
            }
        }

        private onDel():void {
            dispatchEvt(new ChatEvent(ChatEvent.DEL_PRIVATE_CHAT,this));
        }

    }
}