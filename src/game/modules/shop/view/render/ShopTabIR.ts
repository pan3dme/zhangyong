
module game {
	export class ShopTabIR extends ui.shop.ShopTabIRUI {
		constructor() {
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource(): any {
			return this._dataSource;
		}

		private refreshData(): void {
			let info = this.dataSource;
			if (!info) return;
			// this.lab_name.text = info.name;
			this.img_tab.skin = SkinUtil.getShopTabSkin(info.type);
			this.redpoint.onDispose();
			if (info.type === ShopType.jishi) {
				this.redpoint.setRedPointName("jishi_group");
			}
		}

		private _isSelect:boolean = false;
		public setSelect(val:boolean):void{
			if (this._isSelect == val) return;
			this._isSelect = val;
			this.tab_zhuobu.selected = val;
			// if (this._isSelect){
			// 	this.img_tab.skin = "comp/bg/naniu2.png";
			// 	this.lab_name.color = "#ffeecc";
			// 	this.lab_name.stroke = 4;
			// 	this.lab_name.strokeColor = "#4c260d";
			// }else{
			// 	this.img_tab.skin = "comp/bg/anniu.png";
			// 	this.lab_name.color = "#4c260d";
			// 	this.lab_name.stroke = 0;
			// }
		}
	}
}