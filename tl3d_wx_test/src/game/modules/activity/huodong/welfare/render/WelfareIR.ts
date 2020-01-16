/**
* name 
*/
module game {
	export class WelfareIR extends ui.box.TabIR4UI {
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
			let dataAry : any[] = this.dataSource;
			if (dataAry) {
				this.btn_tab.skin = SkinUtil.getTabBtnSkin(dataAry[2]);
				if (dataAry[1] && dataAry[1] != "") {
					this.redpoint.setRedPointName(dataAry[1]);
				}else {
					this.redpoint.onDispose();
				}
			}
			else {
				this.redpoint.onDispose();
			}
		}
	}
}