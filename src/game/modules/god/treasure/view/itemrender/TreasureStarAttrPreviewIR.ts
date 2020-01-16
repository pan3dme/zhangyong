module game {

    export class TreasureStarAttrPreviewIR extends ui.god.treasure.render.StarAttrPreviewIRUI {
        constructor() {
            super();
            this.starList.renderHandler = new Handler(this, this.onXingjiRender);
        }

        public set dataSource(data: any) {
            this._dataSource = data;
            this.refreshData();
        }

        public get dataSource():any {
            return this._dataSource;
        }

        private refreshData() {
            let info : tb.TB_treasure_star = this.dataSource ? this.dataSource[0] : null;
            let curLv = this.dataSource ? this.dataSource[1] : 0;
            if(info){
                let starLv = info.getStarlv();
                this.lbName.text = TreasureUtil.getStarName(starLv);

                let num = starLv > 5 ? starLv - 5 : starLv;
                let tempStararry = new Array;
                for (let i = 0; i < num; i++) {
                    tempStararry[i] = starLv >= 6 ? true : false;
                }
                
                this.starList.repeatX = num;
                this.starList.array = tempStararry;
                this.lbActivity.text = curLv >= starLv ? LanMgr.getLan("",12385) : LanMgr.getLan("",12386);
                this.lbActivity.color = curLv >= starLv ? ColorConst.TASK_GREEN : ColorConst.normalFont;

                this.attrList.array = TreasureUtil.getTbAttrStrAry(info);
                this.attrList.height = this.attrList.array.length * 24 + (this.attrList.array.length-1)*this.attrList.spaceY;
                this.height = this.attrList.y + this.attrList.height + 10;
            }else{
                this.starList.array = null;
                this.attrList.array = null;
            }
        }

        /**
		 * 渲染星星
		 */
		private onXingjiRender(cell:Laya.Image,index:number):void {
			let data = cell.dataSource;
			if(data){
                cell.width = 29;
				cell.height = 31;
				cell.skin = SkinUtil.superXing;
			}else{
                cell.width = 26;
				cell.height = 31;
				cell.skin = SkinUtil.xingxing;
			}
		}
    }
}