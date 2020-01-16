/**
* name 
*/
module game{
	export class godTabIR extends ui.god.render.TabItemRenderUI{
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

		private refreshData(item) {
            if(item)
            this.btn_name.label = !isArrayFn(item) ? item : item[0];
        }
	}
}