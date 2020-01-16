/**
* 基础列表格子
* 有底框，如果在基础ItemBoxUI去添加一个底，整体扩大的话 给个ui都要去调，而且精细的居中问题会很麻烦
*/
module common {
	export class ItemBox3 extends ui.box.ItemBox3UI {

		constructor() {
			super();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public set dataSource(data: inface.IItemData) {
            this._dataSource = data;
			this.itemBox.dataSource = data;
			if (data && data instanceof ItemVo && data.isShowEff){
				this.ani_light.visible = true;
                this.ani_light.loadAnimation(ResConst.anim_teshutishi,Handler.create(null,()=>{
                    this.ani_light.play(1, true);
                }),ResConst.atlas_teshutishi);
				
			}else{
				this.ani_light.visible = false;
                this.ani_light.stop();
			}
		}
	}
}