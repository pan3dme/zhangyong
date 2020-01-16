/**
* name 
*/
module game{
	export class godReplaceIR extends ui.god.render.ReplaceIRUI{

		constructor(){
			super();
		}

		public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource():GodItemVo {
            return this._dataSource;
        }

		private initView() {
            let godVo = this.dataSource;
			if(godVo){
				this.headbox.dataSource = godVo;
                this.lbName.text = godVo.tab_god.name;
                this.btnShangzhen.on(Laya.Event.CLICK,this,this.onShangzhen);
                this.headbox.on(Laya.Event.CLICK,this,this.onShow);
			}else{
                this.headbox.dataSource = null;
				this.btnShangzhen.off(Laya.Event.CLICK,this,this.onShangzhen);
                this.headbox.off(Laya.Event.CLICK,this,this.onShow);
			}
        }

		private onShangzhen():void {
            let view = UIMgr.getUIByName(UIConst.God_ReplaceGodView) as ReplaceGodView;
            let originGod = view.getGodVo();
            if(this.dataSource){
                GodUtils.replaceGod(originGod,this.dataSource,view.getPos());
            }
        }

        private onShow():void {
            dispatchEvt(new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL),this._dataSource);
        }

	}
}