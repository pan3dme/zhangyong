module game{
	export class GemstoneCompoundView extends ui.equip.gemstone.GemstoneCompoundUI{

        private _curLv : number = 0;
        private _curType : number = 0;
		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.listGems.mouseHandler = new Handler(this,this.onMouseClick);
            this.listGems.renderHandler = new Handler(this,this.onGenRender);
            this.listYulan.renderHandler = new Handler(this,this.onYulanRender);
            this.btnComp.on(Laya.Event.CLICK,this,this.onOneKeyCompound);
            this.lvCombo.selectedIndex = -1;
            this.typeCombo.selectedIndex = -1;
            this.lvCombo.dataSource = ["2","3","4","5","6","7","8"];
			this.lvCombo.selectHandler = new Handler(this, this.onSelectLv);
			this.lvCombo.showHandler = new Handler(this, this.onShowCombo);
            this.typeCombo.dataSource = [LanMgr.getLan("",12453),LanMgr.getLan("",12351),LanMgr.getLan("",12352),LanMgr.getLan("",12353)];
			this.typeCombo.selectHandler = new Handler(this, this.onSelectType);
			this.typeCombo.showHandler = new Handler(this, this.onShowCombo);
        }

		public popup() {
			super.popup();
			this.initView();
		}
        public show() {
			super.show();
			this.initView();
		}

        public close():void {
            super.close();
            this.lvCombo.selectedIndex = -1;
            this.typeCombo.selectedIndex = -1;
            this.listGems.array = null;
            this.listYulan.array = null;
        }

        private initView():void {
            this.refreshView();
            this._curLv = 8;
            this._curType = 0;
            this.lvCombo.selectedIndex = 6;
            this.typeCombo.selectedIndex = 0;
            this.renderYulan();
        }

        private onSelectLv(index:number):void {
            if(index < 0) return;
            this._curLv = this.lvCombo.selectedIndex + 2;
            this.renderYulan();
        }
        private onSelectType(index:number):void {
            if(index < 0) return;
            this._curType = this.typeCombo.selectedIndex;
            this.renderYulan();
        }
        private onShowCombo(show:boolean):void {
            this.isModelClose = !show;
        }
        
        /** 渲染预览 */
        private renderYulan():void {
            let list = GemstoneUtils.getCanCompMaxLvList(this._curType,this._curLv);
            this.listYulan.array = list;
            this.listYulan.width = list.length * 100 + (list.length -1) * this.listYulan.spaceX;
            this.boxEmptyHC.visible = list.length == 0;
        }
        /** 点击宝石 */
        private onMouseClick(event:Laya.Event,index:number):void {
			if(event.type == Laya.Event.CLICK){
				let gemVo = this.listGems.getItem(index) as GemstoneItemVo;
				if(gemVo.gemLv >= GemstoneModel.max_gem_lv) {
                    showToast(LanMgr.getLan('', 10298));
                    return;
                }
                UIMgr.showUI(UIConst.SingleCompoundView,gemVo);
			}
		}
        /** 宝石渲染 */
        private onGenRender(box:Laya.Box,index:number):void {
            let gemVo = box.dataSource as GemstoneItemVo;
            if(gemVo){
                let itemBox = box.getChildByName("itemBox") as common.ItemBox2;
                let lbLv = box.getChildByName("lbLv") as Laya.Label;
                let imgRedpoint = box.getChildByName("imgRedpoint") as Laya.Image;
                itemBox.dataSource = gemVo;
                itemBox.itemBox.lbLevel.visible = false;
                lbLv.text = `${gemVo.gemLv}${LanMgr.getLan("",10031)}${LanMgr.attrName[gemVo.tbGem.getAttrType()]}`;
                imgRedpoint.visible = GemstoneUtils.isCanCompoundByMaterial(gemVo.tbItem.ID);
            }
        }

        private onYulanRender(box:Laya.Box,index:number):void {
            let itemVo = box.dataSource as ItemVo;
            if(itemVo){
                let itemBox = box.getChildByName("itemBox") as common.ItemBox2;
                let lbLv = box.getChildByName("lbLv") as Laya.Label;
                itemBox.dataSource = itemVo;
                itemBox.itemBox.lbLevel.visible = false;
                itemBox.itemBox.addTipsListener();
                let tbItem = tb.TB_item.get_TB_itemById(itemVo.id);
                let tbGem = tb.TB_gemstone_new.getTBOneById(tbItem.defined[0]);
                lbLv.text = `${tbGem.getLevel()}${LanMgr.getLan("",10031)}${LanMgr.attrName[tbGem.getAttrType()]}`;
            }
        }

        /** 刷新界面 */
        public refreshView():void {
            let list = [...GemstoneModel.getInstance().getCompoundViewList()];
            list.sort((a,b)=>{
                return b.gemLv - a.gemLv;
            });
            this.listGems.array = list;
            this.boxEmptyGems.visible = list.length == 0;
            this.renderYulan();
        }

        /** 一键合成 */
        private onOneKeyCompound():void {
            dispatchEvt(new GemstoneEvent(GemstoneEvent.ONEKEY_COMPOUND_GEM),[this._curLv,this._curType,[...this.listYulan.array]]);
        }
    }
}