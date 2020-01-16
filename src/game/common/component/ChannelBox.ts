/**
* name 
*/
module common{
	export class ChannelBox extends ui.component.ChannelBoxUI{
		private _callback:Function;
		constructor(){
			super();
			this.btn_god.on(Laya.Event.CLICK, this, this.onJump,[ModuleConst.SHENLING]);
			this.btn_equip.on(Laya.Event.CLICK, this, this.onJump,[ModuleConst.EQUIPMENT]);
			this.btn_artifact.on(Laya.Event.CLICK, this, this.onJump,[ModuleConst.ARTIFACT]);
			this.btn_buzhen.on(Laya.Event.CLICK, this, this.onJump,[ModuleConst.SHENLING,1]);
			this.btn_firstrecharge.on(Laya.Event.CLICK, this, this.onJump,[ModuleConst.SHOUCHONG]);
		}

		set callback(call:Function) {
			this._callback = call;
			this.initView();
		} 

		initView():void {
			let firstRechage = game.ChongzhiModel.getInstance().isAllReward();
			if(firstRechage && this.btn_firstrecharge) {
				this.btn_firstrecharge.visible = false;
			}
			let isChargeHide = this.btn_firstrecharge.visible == false;
			let oneWidth = isChargeHide ? this.width/4 : this.width/5;
			this.btn_god.x = oneWidth/2;
			this.btn_buzhen.x = oneWidth + oneWidth/2;
			this.btn_firstrecharge.x = oneWidth*2 + oneWidth/2;

			this.btn_equip.x = isChargeHide ? (oneWidth*2 + oneWidth/2) : (oneWidth*3 + oneWidth/2);
			this.btn_artifact.x = isChargeHide ? (oneWidth*3 + oneWidth/2) : (oneWidth*4 + oneWidth/2);
		}

		private onJump(...link) {
			/** 判断系统是否开启 */
			let tbSys = tb.TB_sys_open.get_TB_sys_openById(link[0]);
            if(tbSys && !App.IsSysOpen(link[0])) {
                showToast(tbSys.prompt);
				if(this._callback) {
					this._callback(false);
				}
                return;
            }
			// 跳转的时候
			if(this._callback) {
				this._callback(true);
			}
			dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), link);
		}
	}
}