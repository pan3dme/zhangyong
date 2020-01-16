

module game {

    export class SysTopBtnIR extends ui.hud.render.SysTopBtnIRUI {
		constructor() {
			super();
		}

		public set dataSource($value:BtnFuncVo) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():BtnFuncVo {
			return this._dataSource;
		}

		public refreshView() {
            let data : BtnFuncVo = this._dataSource;
			if (data) {
				this.lbText.visible = data.text ? true : false;
				this.lbText.text = data.text;
                this.btnFunc.skin = data.btnSkin;
                this.btnFunc.on(Laya.Event.CLICK,this,this.onClick);
                this.redpoint.setRedPointName(data.redpointName);
			}else{
				this.lbText.visible = false;
                this.btnFunc.skin = null;
                this.btnFunc.on(Laya.Event.CLICK,this,this.onClick);
                this.redpoint.onDispose();
            }
		}

        private onClick():void {
			let data : BtnFuncVo = this._dataSource;
			if (data && data.callback) {
                data.callback();
            }
        }
    }
}