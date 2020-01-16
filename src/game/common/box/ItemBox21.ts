/**
* 基础列表格子
* 添加一个已领取标签
*/
module common {
	export class ItemBox21 extends ui.box.ItemBox21UI {

		constructor() {
			super();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public set dataSource(data: inface.IItemData) {
            this._dataSource = data;
			this.ui_item.dataSource = data;
			if(!data)return;
			this.img_receive.visible = data.getExtParm();
		}
	}
}