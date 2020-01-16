/**
* name 
*/
module game {
	export class PropretyIR extends Laya.Label {
		constructor() {
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData($value);
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refreshData(data: any) {
			this.text = data;
		}
	}

	export class strengthAttriRender extends Laya.Box {
		constructor() {
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData($value);
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refreshData(data: any) {
			if (data) {
				let lab_attr1 = <Laya.Label>this.getChildByName('lab_attriName')
				let lab_nowAttriPro = <Laya.Label>this.getChildByName('lab_nowAttriPro')
				let lab_nextAttriPro = <Laya.Label>this.getChildByName('lab_nextAttriPro')
				let imgArrow = <Laya.Image>this.getChildByName('imgArrow');
				imgArrow.visible = lab_nextAttriPro.visible = data.nextValue ? true : false;
				lab_attr1.text = data.name;
				lab_nowAttriPro.text = "+" + data.value;
				lab_nextAttriPro.text = "+" + data.nextValue;
			}
		}
	}

}