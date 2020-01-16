module game{
    export interface GemstoneTipsVo {
        gemVo:GemstoneItemVo;
        godVo:GodItemVo;
        slot:number;
        hideBtn:boolean;
    }

	export class GemstoneTipsView extends ui.equip.gemstone.GemstoneTipsUI{

		constructor(){
			super();
			this.isModelClose = true;
		}

        createChildren():void {
            super.createChildren();
            this.btnWear.on(Laya.Event.CLICK,this,this.onWear);
        }

		public popup() {
			super.popup();
			this.initView();
		}

        public close():void {
            super.close();
        }

        private initView():void {
            let info : GemstoneTipsVo = this.dataSource;
            if(!info) return;
            let tbItem = info.gemVo.tbItem;
            let tbGem = info.gemVo.tbGem;
            this.itemBox.dataSource = tbItem;
            this.lbName.text = tbItem.name;
            this.lbNum.text = info.gemVo.num + "";
            this.lbDesc.text = LanMgr.attrName[tbGem.getType()] +"+" + tbGem.getAttrVal();
            this.btnWear.visible = !info.hideBtn;
        }

        private onWear():void {
            let info : GemstoneTipsVo = this.dataSource;
            if(info) {
                dispatchEvt(new GemstoneEvent(GemstoneEvent.WEAR_GEMSTONE),info);
                this.close();
            }
        }
    }
}