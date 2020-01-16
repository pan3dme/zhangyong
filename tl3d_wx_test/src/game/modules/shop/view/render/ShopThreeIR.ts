/**
* name 
*/
module game{
	export class ShopThreeIR extends ui.shop.ShopThreeIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.list_item.array = $value;
		}

		public get dataSource():any {
			return this._dataSource;
		}

		

	}
}