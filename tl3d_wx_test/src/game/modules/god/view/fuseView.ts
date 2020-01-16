/**
* name 
*/
module game{
	export class fuseView extends ui.god.RonghunLvInfoUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.list_info.renderHandler = new Handler(this, this.onRender);
		}

		public popup() {
			super.popup();
			this.bgPanel.dataSource = { uiName: UIConst.God_fuseView, closeOnSide: this.isModelClose };
			this.lab_nowlv.text = this.dataSource.fuseLevel + LanMgr.getLan("",10031);
			this.list_info.dataSource = tb.TB_fusion_soul.get_TB_fusion_soul().slice(1,5);
		}

		/**
		 * 渲染属性
		 * @param itemRender 
		 * @param index 
		 */
		private onRender(itemRender: Laya.Box, index: number) {
			let godVo = this.dataSource as GodItemVo;
			let itemData = itemRender.dataSource as tb.TB_fusion_soul;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(itemData.ID - 1);
            let lv: Laya.Label = itemRender.getChildByName("lab_lv") as Laya.Label;
            let add: Laya.Label = itemRender.getChildByName("lab_add") as Laya.Label;
            let tiaojian: Laya.Label = itemRender.getChildByName("lab_tiaojian") as Laya.Label;
            let shangxian: Laya.Label = itemRender.getChildByName("lab_shangxian") as Laya.Label;
			lv.text = LanMgr.getLan("",12179) + itemData.ID;
			add.text = LanMgr.getLan("",12348) + itemData.special_attr[0][1];
			tiaojian.text = LanMgr.getLan("",12349,fusiontab.break_limit);
			shangxian.text = `${LanMgr.getLan("",12350)}：${LanMgr.getLan("",12351)}：${itemData.attr_max[0][1]} ${LanMgr.getLan("",12352)}：${itemData.attr_max[1][1]} ${LanMgr.getLan("",12353)}：${itemData.attr_max[2][1]}`;
			tiaojian.visible = itemData.break_limit == 0 ? false : true;
			add.color = shangxian.color = lv.color = godVo.fuseLevel >= itemData.ID?"#13b222":ColorConst.normalFont;
			tiaojian.color = godVo.starLevel >= fusiontab.break_limit?"#13b222":ColorConst.normalFont;
        }

		public close() {
			super.close();
			this.bgPanel.dataSource = null;
		}
	}
}