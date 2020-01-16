/**
* name 
*/
module game {
    export class TlTabIR extends ui.box.TabIR2UI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: any) {
            //item[0] 为表中的time_index字段
            if (item) {
                let link = item[1].link;
                if (item[0] != 99 && item[0] < TimelimitModel.ACTIVITY_JIJIN_ID) {
                    this.btn_tab.skin = SkinUtil.getTabBtnSkin("tabicon"+link);
                    this.redpoint.setRedPointName("timeActivity" + item[0]);
                } else {
                    this.btn_tab.skin = SkinUtil.getTabBtnSkin("tabicon"+item[0]);
                    if (item[0] >= TimelimitModel.ACTIVITY_JIJIN_ID){
                        this.redpoint.setRedPointName("timeActivity" + item[0]);
                    }
                }
            } else {
                this.redpoint.onDispose();
            }
        }

        private _isSelect:boolean = false;
		public setSelect(val:boolean):void{
			if (this._isSelect == val) return;
			this._isSelect = val;
			this.selectBox.selected = val;
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
