/*
* name;
*/
module common {
    export class CommonTitle9View extends ui.component.CommonTitle9UI{
        constructor(){
            super();
        }

        public set dataSource($value:IPanelOption) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():IPanelOption {
            return this._dataSource;
        }

		private refreshData() {
            let data = this.dataSource;
            if (data) {
                this.eff_guang.play();
                this.img_title.skin = data.title;
            }else{
                this.eff_guang.stop();
            }
        }





    }

   
}