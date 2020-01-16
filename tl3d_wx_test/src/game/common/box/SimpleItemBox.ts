/**
* 简单基础列表格子
*/
module common {
	export class SimpleItemBox extends ui.box.SimpleItemBoxUI {
		constructor() {
			super();
		}

		public set dataSource($data:inface.IItemData) {
			this._dataSource = $data;
			if ($data) {
				this.imgIcon.skin = $data.getIconUrl();
				this.lbCount.text = "x" + Snums($data.getNum());
			}
		}
	}
}