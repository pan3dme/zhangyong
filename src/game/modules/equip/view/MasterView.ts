/**
* name 
*/
module game{
	export class MasterView extends ui.equip.EquipMasterUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.bgPanel.addChildAt(this.img_bg, 3);
		}

		public popup(){
			super.popup();
			this.bgPanel.dataSource = {uiName:UIConst.Equip_MasterView,closeOnSide:this.isModelClose};
			let data: GodItemVo = this.dataSource[0];
			let type = this.dataSource[1];
			this.bgPanel.updateTitle(type == EquipTabType.strength ? LanMgr.getLan("",12595) : LanMgr.getLan("",12596));
			let str = type == EquipTabType.strength ? LanMgr.getLan("",10304) : LanMgr.getLan("",10305);
			// 当前级
			let nowlevel = type == EquipTabType.strength ? data.countMasterLevel() : data.refineMasterLevel();
			if (nowlevel == 0){
				this.lab_masterName.text = LanMgr.getLan("",12593,str);
			}else{
				this.lab_masterName.text = LanMgr.getLan("",12594,str,nowlevel);
			}
			let now = type == EquipTabType.strength ? tb.TB_strength_suit.get_TB_strength_suitById(nowlevel) :tb.TB_refine_suit.get_TB_refine_suitById(nowlevel);
			let next = type == EquipTabType.strength ? tb.TB_strength_suit.get_TB_strength_suitById(nowlevel+1) :tb.TB_refine_suit.get_TB_refine_suitById(nowlevel+1);
			let ary = [];
			if(!now){
				now = type == EquipTabType.strength ? new tb.TB_strength_suit() : new tb.TB_refine_suit();
				now.ID = 0;
				now.level = 0;
				now.attr = [[1,0],[2,0],[3,0]];
			}
			ary.push(now);
			if(next){
				ary.push(next);
				this.list_levelInfo.array = ary;
				this.list_levelInfo.width = 550;
				this.imgArrow.visible = true;
			}else{
				this.list_levelInfo.array = ary;
				this.list_levelInfo.width = 232;
				this.imgArrow.visible = false;
			}
			Laya.timer.frameOnce(3,this,this.delayRender);
		}

		private delayRender():void {
			for(let i = 0 ; i < this.list_levelInfo.cells.length ; i++){
				let item = this.list_levelInfo.cells[i] as MasterItemRender;
				item && item.refreshData( i == 0);
			}
		}

		public close(){
			super.close();
			Laya.timer.clearAll(this);
			this.list_levelInfo.array = null;
			this.bgPanel.dataSource = null;
		}
	}


	export class MasterItemRender extends ui.equip.MasterRenderUI {
        constructor() {
            super();
			this.list_attr.renderHandler = new Handler(this, this.onAttrRender);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private initView() {
			let tbSuit = this.dataSource;
			if(this._dataSource){
				if(tbSuit instanceof tb.TB_strength_suit){
					this.lab_masterLv.text = LanMgr.getLan("",12435,tbSuit.ID);
					this.lab_need.text = LanMgr.getLan("",12437,tbSuit.level);
					this.lab_need.visible = tbSuit.ID > 0;
					this.list_attr.array = tbSuit.attr;
				}else if(tbSuit instanceof tb.TB_refine_suit){
					this.lab_masterLv.text = LanMgr.getLan("",12436,tbSuit.ID);
					this.lab_need.text = LanMgr.getLan("",12438,tbSuit.level);
					this.lab_need.visible = tbSuit.ID > 0;
					this.list_attr.array = tbSuit.attr;
				}
			}else{
				this.list_attr.array = null;
			}
        }

		private onAttrRender(item: Laya.Label, index: number){
			let data : number[] = item.dataSource;
			if(data){
				let type = data[0];
				let num = data[1];
				item.text = iface.tb_prop.attrType[type] + "：+" + num;
			}
		}

		refreshData(isNow:boolean):void {
			for(let i = 0 ; i < this.list_attr.cells.length ; i++){
				let item = this.list_attr.cells[i] as Laya.Label;
				// item.color = isNow ? "#45290a":"#ebb868";
			}
		}
    }
}