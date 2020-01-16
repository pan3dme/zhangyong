
module game {

    export class FaceView extends ui.chat.FaceUI {

        private _callback : Function;
		private _selectSp : Laya.Sprite;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
			this.faceList.array = null;
			this.faceList.renderHandler = new Handler(this,this.onBqRender);
			this.faceList.mouseHandler = new Handler(this,this.onBqClick);
        }

        onEnter(callback:Function,sp:Laya.Sprite=null):void {
			this.faceList.array = ChatModel.getInstance().getBqList();
            this.visible = false;
			this._selectSp = sp;
			if(sp){
				sp.visible = false;
			}
            this._callback = callback;
        }

       /** 表情列表渲染 */
		private onBqRender(img:Laya.Image,index:number):void {
			let obj = img.dataSource as IExpressionVo;
			if(obj) {
				img.skin = obj.url;
			}else{
				img.skin = null;
			}
		}

		/** 选择表情 */
		private onBqClick(event:Laya.Event):void {
			let obj = (event.currentTarget as Laya.Image).dataSource as IExpressionVo;
			if(event.type == Laya.Event.CLICK) {
                if(this._callback){
                    this._callback(obj);
                }
                this.onOpenOrHide();
			}
		}

        /**点击表情 */
		onOpenOrHide():void {
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
			if(target != this){
				this.onOpenOrHide();
			}
		}

        onExit():void {
            this.faceList.array = null;
            this._callback = null;
            this.stage.off(Laya.Event.CLICK,this,this.onClickView);
        }
    }
}