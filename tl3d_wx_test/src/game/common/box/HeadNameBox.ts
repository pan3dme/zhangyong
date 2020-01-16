/**
* name 
*/
module common {
	import LList=Laya.List;
	import LImage=Laya.Image;
	export class HeadNameBox extends ui.box.HeadNameBoxUI {
		constructor() {
			super();		
		}

		//出战图片
		public get img_shangzhen():LImage{
			return this.ui_head.img_shangzhen;
		}

		getDataSource():any{
			return this._dataSource;
		}

		public set dataSource(data: inface.IHeadData) {
			this._dataSource = data;
			this.ui_head.dataSource = data;
			if (data) {
				this.lab_name.text = data.getName();
			}
			else {
				this.lab_name.text = "";
			}
		}

		public get dataSource():inface.IHeadData{
			return this._dataSource;
		}
	}
}