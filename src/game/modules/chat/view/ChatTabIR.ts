

module game {

    export class ChatTabIR extends ui.chat.ChatTabIRUI{

        private _model : ChatModel;
        constructor(){
            super();
            this._model = ChatModel.getInstance();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():number {
			return this._dataSource;
		}

        refreshView():void {
            let channel = this.dataSource;
			if(channel){
				this.btnChannel.label = LanMgr.channelNames[channel];
                let newNum = this._model.getNewNum(channel);
                this.lbNum.visible= this.imgNum.visible = newNum > 0;
                this.lbNum.text = newNum > ChatModel.MAX_COUNT ? `${ChatModel.MAX_COUNT}+` : `${newNum}`;
			} else{
				this.lbNum.visible = this.imgNum.visible = false;
			}
        }

		
    }
}