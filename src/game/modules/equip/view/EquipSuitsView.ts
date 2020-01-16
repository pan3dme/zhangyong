module game {
	export class EquipSuitsView extends ui.equip.EquipSuitUI {
		constructor() {
			super();
			this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton:true, closeOnSide: this.isModelClose,title:"" };
            this.itemList.renderHandler = new Handler(this,this.itemRender);
            this.bgPanel.addChildAt(this.img_bg, 3);
		}

		public popup() {
			super.popup();
			this.initView();
		}

		private initView():void {
			let ary : number[] = this.dataSource;
            let quality = ary[0];
            let num = ary[1];
            let model = EquipModel.getInstance();
            let title = LanMgr.qualityColor[quality] + LanMgr.getLan("",12597);
            this.lbName.text = `${title}（${num}/4）：` ;
            this.bgPanel.updateTitle(title);
            let list : any[] = tb.TB_equip_suit.getSuitByQuality(quality);
            list = list.map((tbSuit)=>{
                let title = LanMgr.getLan("",12598,LanMgr.numChinese[tbSuit.ID%10]) + "：";
                let ary = tbSuit.suit_percent;
                let val = ary[1] == 0 ? ary[2] : `${ary[2]*100}%`;
                let ct = `${iface.tb_prop.attrType[ary[0]]}+${val}`;
                return {content:title+ct,enough:num>=tbSuit.ID%10};
            })
            this.itemList.array = list;
		}

        private itemRender(lable:Laya.Label,index:number):void {
            let data = lable.dataSource;
            lable.text = data["content"];
            lable.color = data["enough"] ? "#319c28" : "#45290a";
        }

		public close() {
			super.close();
            this.itemList.array = null;
		}
	}
}