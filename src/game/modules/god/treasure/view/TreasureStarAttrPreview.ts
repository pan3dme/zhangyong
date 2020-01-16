/**
* name 
*/
module game{
	/** 选择圣物界面 */
	export class TreasureStarAttrPreview extends ui.god.treasure.StarAttrPreviewUI{

        private _buffList : common.BuffRenderList;
		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:false,title:LanMgr.getLan("",12383) };
            this._buffList = new common.BuffRenderList(this.contentBox.width,this.contentBox.height,null,50,2,false);
			this._buffList.isAutoScroll = false;
			this._buffList.spaceY = 10;
			this._buffList.itemRender = TreasureStarAttrPreviewIR;
			this.contentBox.addChild(this._buffList);
			this.btnClose.on(Laya.Event.CLICK,this,this.close);
		}
		
		public popup(closeOther?: boolean, showEffect?: boolean){
			super.popup(closeOther,showEffect);
			this.initView();
		}

		public onClosed(){
			super.onClosed();
            this._buffList.removeAll();
		}

		private initView():void{
            let treasureVo = this.dataSource as TreasureItemVo;
            let list = tb.TB_treasure_star.getList2(treasureVo.quality,treasureVo.slot);
			this._buffList.dataSource = list.map((tbData)=>{
                return [tbData,treasureVo.starLv];
            });
		}

	}
}