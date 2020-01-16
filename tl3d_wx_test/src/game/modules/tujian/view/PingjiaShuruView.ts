/**
* name 
*/
module game {
export  class PingjiaShuruView extends ui.tujian.PingjiaShuruUI{
        constructor(){
            super();
            this.isModelClose = true;
            this.btn_Sure.on(Laya.Event.CLICK, this, this.onSure);
			this.btn_Calloff.on(Laya.Event.CLICK, this, this.close);
			this.textarea_put.on(Laya.Event.INPUT,this,this.onPutText);
        }

		public onOpened():void
		{
			super.onOpened();
			this.onPutText();
		}

		public onClosed():void
		{
			super.onClosed();
            this.textarea_put.text = "";
		}

        public onPutText(): void {
			this.label_residuetext.text = LanMgr.getLan("", 12119, (60 - this.textarea_put.text.length));
		}

		/**确认添加评价 */
		private onSure(): void {
			let args = {};
			if (this.textarea_put.text.length === 0) {
				showToast(LanMgr.getLan("", 10207));
				return;
			}
			args[Protocol.game_god_publishComment.args.templateId] = this.dataSource.ID;
			args[Protocol.game_god_publishComment.args.content] = this.textarea_put.text;
			dispatchEvt(new TujianEvent(TujianEvent.UPDATE_EVALUATION),args);
			this.close();
		}
		
    }
}