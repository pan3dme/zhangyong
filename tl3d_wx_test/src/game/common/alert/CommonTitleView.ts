/*
* name;
*/
module common {
    export class CommonTitleView extends ui.component.CommonTitleUI{
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
                this.closeByBlank.visible = data.hasOwnProperty('closeOnSide') ? data.closeOnSide : true;
            }else{
                this.eff_guang.stop();
            }
        }





    }

   
}