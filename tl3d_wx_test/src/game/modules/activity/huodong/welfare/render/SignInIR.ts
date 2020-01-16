/**
* name 
*/
module game {
	export class SignInIR extends ui.activity.huodong.welfare.render.QiandaoRenderUI {
		constructor() {
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refreshData() {
			let data = this._dataSource;
			if (data) {
				this.img_repair.visible = HuodongModel.getInstance().canBuqianDate == data.ID;
				let item = new ItemVo(data.reward[0], data.reward[1]);
				item.show = true;
				let isAlready: boolean = data.ID in App.hero.welfare.dailySignIn;
				this.img_already.visible = isAlready;
				this.box_item.dataSource = item;
				this.lbday.text = `${data.ID}天`;
			}
		}
	}
}