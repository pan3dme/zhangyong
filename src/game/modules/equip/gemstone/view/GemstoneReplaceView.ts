module game{
	export class GemstoneReplaceView extends ui.equip.gemstone.GemstoneReplaceUI{

		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12451) };
            this.listGems.mouseHandler = new Handler(this,this.onSelect);
            this.listGems.renderHandler = new Handler(this,this.onGenRender);
            this.listGems.selectEnable = false;
            this.addChild(this.bgPanel.btnClose);
        }

		public popup() {
			super.popup();
			this.initView();
		}

        public close():void {
            super.close();
            this.listGems.array = null;
        }

        private initView():void {
            let info : BaoshiIRVo = this.dataSource;
            let list = GemstoneModel.getInstance().getReplaceViewList(info.type,true);
            this.listGems.array = list;
            this.imgEmpty.visible = list.length == 0;
            this.lbEmpty.text = LanMgr.getLan("",12452,LanMgr.baoshiName[info.type]);
        }

        private onSelect(evt: Laya.Event, index: number):void {
			if(index == -1) return;
			if(evt.type == Laya.Event.CLICK) {
				let gemstoneVo : GemstoneItemVo = this.listGems.array[index];
                let info : BaoshiIRVo = this.dataSource;
				if(!gemstoneVo || !info) return;
                let vo : GemstoneTipsVo = {gemVo:gemstoneVo,godVo:info.godVo,hideBtn:false,slot:info.slot};
				UIMgr.showUI(UIConst.GemstoneTipsView,vo);
			}
		}

         /** 宝石渲染 */
        private onGenRender(box:Laya.Box,index:number):void {
            let gemVo = box.dataSource as GemstoneItemVo;
            if(gemVo){
                let itemBox = box.getChildByName("itemBox") as common.ItemBox2;
                let lbLv = box.getChildByName("lbLv") as Laya.Label;
                itemBox.dataSource = gemVo;
                itemBox.itemBox.lbLevel.visible = false;
                lbLv.text = `${gemVo.gemLv}${LanMgr.getLan("",10031)}${LanMgr.attrName[gemVo.tbGem.getAttrType()]}`;
            }
        }
    }
}