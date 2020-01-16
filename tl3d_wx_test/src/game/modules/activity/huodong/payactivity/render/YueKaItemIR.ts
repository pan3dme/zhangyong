/**
* name 
*/
module game {
	export class YueKaItemIR extends ui.activity.huodong.welfare.render.YueKaItemIRUI {
		constructor() {
			super()
		}

		public set dataSource(value) {
			this._dataSource = value;
			this.refresh();
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refresh(): void {
			if (this.dataSource) {
				this.img_receivebg.visible = this.dataSource.show;
				this.ui_item.dataSource = this.dataSource.item;
				this.gray = this.dataSource.show;
			}
			else {
				
			}
		}
	}
}