/**
* name 
*/
module game{
	export class TupoView extends ui.god.TupoUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.list_attr.renderHandler = new Handler(this, this.onRender);
		}

		public popup() {
			super.popup();
			this.bgPanel.dataSource = { uiName: UIConst.God_TupoView, closeOnSide: this.isModelClose, title:"comp/title/tupochengg.png" };
			let godVo = this.dataSource as GodItemVo;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel - 1);
			let nexttab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			let dataAry = new Array<tb.TB_fusion_soul>();
			dataAry.push(fusiontab);
			dataAry.push(nexttab);
			this.list_attr.dataSource = dataAry;
		}

		/**
		 * 渲染属性
		 * @param itemRender 
		 * @param index 
		 */
		private onRender(itemRender: Laya.Box, index: number) {
            let lv: Laya.Label = itemRender.getChildByName("lab_lv") as Laya.Label;
            let add: Laya.Label = itemRender.getChildByName("lab_add") as Laya.Label;
            let tili: Laya.Label = itemRender.getChildByName("lab_tili") as Laya.Label;
            let gongji: Laya.Label = itemRender.getChildByName("lab_gongji") as Laya.Label;
            let fangyu: Laya.Label = itemRender.getChildByName("lab_fangyu") as Laya.Label;
			lv.text = LanMgr.getLan("",12179) + `：${itemRender.dataSource.ID}` + LanMgr.getLan("",10031);
			add.text = `速度：+${itemRender.dataSource.special_attr[0][1]}`;
			tili.text = LanMgr.getLan("",12335) + `：${itemRender.dataSource.attr_max[0][1]}`;
			gongji.text = LanMgr.getLan("",12336) + `：${itemRender.dataSource.attr_max[1][1]}`;
			fangyu.text = LanMgr.getLan("",12337) + `：${itemRender.dataSource.attr_max[2][1]}`;
			add.color = gongji.color = fangyu.color = tili.color = lv.color = this.dataSource.fuseLevel == itemRender.dataSource.ID?"#13b222":ColorConst.normalFont;
        }

		public close() {
			super.close();
			this.bgPanel.dataSource = null;
		}
	}
}