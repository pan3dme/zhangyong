module game{
	export class SingleCompoundView extends ui.equip.gemstone.SingleCompoundUI{

        private _counterBar : common.CounterBar;
        private _curGemvo : GemstoneItemVo;
        private _nextGemvo : GemstoneItemVo;

		private _curNum: number = 1;
		private _maxNum: number = 0;
		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("",12450) };
            this._curGemvo = GemstoneUtils.createGemstoneVo();
            this._nextGemvo = GemstoneUtils.createGemstoneVo();
            this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btnAddOne,this.btnAddTen,this.btnRedOne,this.btnRedTen,this.lbInput);
            this.btnComp.on(Laya.Event.CLICK,this,this.onCompound);
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
        }

        private initView():void {
            let info = this.dataSource as GemstoneItemVo;
            let curTbItem : tb.TB_item = info.tbItem;
            this._curGemvo.setData({equipId:0,num:0,templateId:curTbItem.ID});
            let curTbGem : tb.TB_gemstone_new = tb.TB_gemstone_new.getTBOneById(curTbItem.defined[0]);
            this.headBox1.dataSource = curTbItem;
            this.headBox1.itemBox.label_number.visible = false;
            this.imgAttr1.skin = SkinUtil.getAttrSkin(curTbGem.getAttrType());
            this.lbAttr1.text = curTbGem.getAttrVal() + "";
            this.lbName1.text = curTbItem.name;

            this._nextGemvo.setData({equipId:0,num:0,templateId:curTbItem.ID+1});
            let nexTbItem : tb.TB_item = tb.TB_item.get_TB_itemById(this._nextGemvo.templateId);
            let nextTbGem : tb.TB_gemstone_new = tb.TB_gemstone_new.getTBOneById(nexTbItem.defined[0]);
            this.headBox2.dataSource = nexTbItem;
            this.headBox2.itemBox.label_number.visible = false;
            this.imgAttr2.skin = SkinUtil.getAttrSkin(nextTbGem.getAttrType());
            this.lbAttr2.text = nextTbGem.getAttrVal() + "";
            this.lbName2.text = nexTbItem.name;

            this._maxNum = GemstoneUtils.getCompoundNum(nexTbItem.ID);
            this._curNum = Math.max(1,this._maxNum);
            this._counterBar.setInitData(this._curNum,this._maxNum,this.setSumNum.bind(this));
            this.setSumNum();
        }
        
        /** 设置数量 */
		private setSumNum(): void {
            let compoundObj = GemstoneUtils.getCompoundObjById(this._nextGemvo.templateId);
            if(!compoundObj) return;
			this._curNum = this._counterBar.getCurNum();
			this.lbInput.text = this._curNum.toString();
            let needNum = compoundObj.materialNum * this._curNum;
            let ownNum = GemstoneUtils.getOwnNum(compoundObj.materialId);
            this.pbNum.value = ownNum / needNum;
            this.lbNum.text = `${ownNum}/${needNum}`;
		}

        /** 刷新界面 */
        public refreshView():void {
            this.initView();
        }
        public playSuccAnim():void {
        }

        /** 合成 */
        private onCompound():void {
            if(this._curNum <= 0) {
                showToast(LanMgr.getLan('', 10299));
                return;
            }
            if(this._curGemvo.templateId) {
                dispatchEvt(new GemstoneEvent(GemstoneEvent.COMPOUND_GEMSTONE),[this._nextGemvo.templateId,this._curNum]);
            }
        }

    }
}