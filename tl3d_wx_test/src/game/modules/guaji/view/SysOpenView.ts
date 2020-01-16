/**
* name 
*/
module game {
	export class GuaJiSysOpenView extends ui.guaji.SysOpenUI {
		constructor() {
			super();
		}

		/** 设置引导数据 */
		public setGuideView(sysid:number):void {
			let tbSys = tb.TB_sys_open.get_TB_sys_openById(sysid);
			this.imgIcon.skin = tbSys ? SkinUtil.getSysOpenSkin(tbSys.ID) : null;
		}
		/** 设置引导状态 */
		public setGuideStatus(flag:boolean):void {
			if(flag){
				this.stage.on(Laya.Event.CLICK,this,this.onConfirm);
				Laya.timer.once(1500,this,()=>{
					this.stage.off(Laya.Event.CLICK,this,this.onConfirm);
					Laya.timer.clearAll(this);
					this.onConfirm();
				});
			}else{
				this.stage.off(Laya.Event.CLICK,this,this.onConfirm);
				Laya.timer.clearAll(this);
			}
		}
		private onConfirm():void {
			dispatchEvt(new GuajiEvent(GuajiEvent.CONFIRM_SYS_OPEN_BUTTON));
		}
	}
}