
module common {
	export class HeadBox2 extends ui.box.HeadBox2UI {

		constructor() {
			super();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public set dataSource(data: inface.IHeadData) {
            this._dataSource = data;
			this.hadBox.dataSource = data;
		}
	}
}