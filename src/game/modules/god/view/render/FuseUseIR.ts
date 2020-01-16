/**
* name 
*/
module game{
	export class godFuseUseIR extends ui.god.render.HaveItemBoxUI{
		constructor(){
			super();
		}

		public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

		private refreshData(id) {
			this.img_icon.skin = SkinUtil.getRonghunHave(id);
			this.lab_have.text = String(App.hero.getBagItemNum(id));
        }
	}
}