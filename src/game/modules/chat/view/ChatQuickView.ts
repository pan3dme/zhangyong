
module game {

    export class ChatQuickView extends ui.chat.ChatQuickUI {

        private _callback : Function;
		private _selectSp : Laya.Sprite;

		public forbitHide : boolean = false;	// 是否禁止隐藏
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
			this.lanList.renderHandler = new Handler(this,this.onRender);
			this.lanList.mouseHandler = new Handler(this,this.onClick);
        }

        onEnter(callback:Function,sp:Laya.Sprite):void {
			this.forbitHide = false;
            this.visible = false;
			this._selectSp = sp;
			if(sp){
				sp.visible = false;
			}
            this._callback = callback;
            this.lanList.array = tb.TB_chat_quick.getList();;
        }

       /** 列表渲染 */
		private onRender(box:Laya.Box,index:number):void {
            let label = box.getChildByName("lbContent") as Laya.Label;
			let obj = box.dataSource as tb.TB_chat_quick;
			if(obj) {
				label.text = obj.desc;
			}
		}

		/** 选择 */
		private onClick(event:Laya.Event):void {
			let box = event.currentTarget as Laya.Box;
			let label = box.getChildByName("lbContent") as Laya.Label;
			let obj = box.dataSource as tb.TB_chat_quick;
			if(event.type == Laya.Event.CLICK) {
                if(this._callback){
                    this._callback(obj);
                }
                this.onOpenOrHide();
			}else if(event.type == Laya.Event.MOUSE_OVER || event.type == Laya.Event.ROLL_OVER){
				label.color = ColorConst.TASK_ORANGE;
			}else if(event.type == Laya.Event.MOUSE_OUT || event.type == Laya.Event.ROLL_OUT){
				label.color = ColorConst.WHITE;
			}
		}

        /** 点击 */
		onOpenOrHide():void {
			// 禁止隐藏
			if(this.forbitHide && this.visible) {
				return;
			}
			this.visible = !this.visible;
			if(this.visible) {
				Laya.timer.callLater(this,()=>{
					this.stage.on(Laya.Event.CLICK,this,this.onClickView);
				});
				if(this._selectSp){
					this._selectSp.visible = true;
				}
			}else{
				this.stage.off(Laya.Event.CLICK,this,this.onClickView);
				if(this._selectSp){
					this._selectSp.visible = false;
				}
			}
		}

        private onClickView(event:Laya.Event):void {
			let target = event.target;
			if(target != this.lanList){
				this.onOpenOrHide();
			}
		}

        onExit():void {
            this.lanList.array = null;
            this._callback = null;
			if(this._selectSp){
				this._selectSp.visible = false;
			}
            this.stage.off(Laya.Event.CLICK,this,this.onClickView);
			this.forbitHide = false;
        }
    }
}