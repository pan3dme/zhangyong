

module game {

    export class TowerGuanqiaIR extends ui.tower.GuanqiaIRUI {

        public index : number = 0;
        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():GuanqiaVo {
			return this._dataSource;
		}

        refreshView():void {
            let data = this.dataSource;
            if(data) {
                this.lbNum.text = data.tbCopyInfo.area_number + '';
                if(data.isPass()) {
                    this.btnRing.stateNum = 2;
                    this.btnRing.skin = SkinUtil.getGuankaStateUrl(1);
                }else if(data.isCurrent()) {
                    this.btnRing.stateNum = 2;
                    this.btnRing.skin = SkinUtil.getGuankaStateUrl(2);
                }else{
                    this.btnRing.stateNum = 1;
                    this.btnRing.skin = SkinUtil.getGuankaStateUrl(0);
                }
                this.on(Laya.Event.CLICK,this,this.onClick);
            }else{
                this.off(Laya.Event.CLICK,this,this.onClick);
            }
            this.box.visible = this.index != 9;
        }

        private onClick():void {
            dispatchEvt(new TowerEvent(TowerEvent.CLICK_GUANQIA,this.dataSource));
        }
    }
}