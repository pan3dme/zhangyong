

module game {

    export class YZGuanqiaIR extends ui.yuanzheng.GuanqiaIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():YZGuanqiaVo {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
            if(info) {
                this.btnOpen.skin = info.isPass() || info.isCurrent() ? SkinUtil.zuobiao_liang : SkinUtil.zuobiao_an;
                this.box.visible = info.isPass();
                this.lbName.text = info.index.toString();
                this.on(Laya.Event.CLICK,this,this.onClick);
            }else {
                this.off(Laya.Event.CLICK,this,this.onClick);
            }
        }

        private onClick():void {
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_CHALLENGE_VIEW,this.dataSource));
        }
    }
}