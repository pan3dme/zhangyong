module common {
	export class DialogOpenEff extends Laya.Animation {

		private _isInit:boolean = false;
		constructor() {
			super();
		}

		public showEff(parent:Dialog, handler:Laya.Handler =null):void{
			if (!this._isInit){
				this._isInit = true;
				this.zOrder = parent.zOrder;
				this.x += parent.x;
				this.y += parent.y;
			}
			parent.visible = false;
			Dialog.manager.addChild(this);
			this.visible = true;
			this.play();

			Laya.timer.once(100, this, ()=>{
				parent.visible = true;
				parent.popupEffect.runWith(parent);
				if (handler) handler.run();
			})
			Laya.timer.once(500, this, this.closeEff);
		}

		public closeEff():void{
			this.removeSelf();
			this.visible = false;
			this.stop();
			Laya.timer.clearAll(this);
		}


















	}
}
