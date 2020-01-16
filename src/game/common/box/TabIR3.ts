/*
* name;
*/
module common {
    export class TabIR3 extends ui.box.TabIR3UI {
        public static TYPE_TOP:number = 0;      //上标签
        public static TYPE_BOTTOM:number = 1;   //底标签
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

        public refreshData(item: any) {
            if (item) {
                this.lab_tab.text = item.label;
                if (item.red && item.red != ""){
                    this.redpoint.setRedPointName(item.red);
                }else{
                    this.redpoint.onDispose();
                }
                let type:number = item.type != null ? item.type : TabIR3.TYPE_BOTTOM;
                switch(type){
                    case TabIR3.TYPE_BOTTOM:
                        this.img_bg.scaleY = 1;
                        this.lab_tab.y = 23;
                        break;
                    case TabIR3.TYPE_TOP:
                        this.img_bg.scaleY = -1;
                        this.lab_tab.y = 32;
                        break;
                }
            }
            else {
                this.redpoint.onDispose();
            }
        }

        private _isSelect:boolean = false;
        public setSelect(val:boolean):void{
            if (this._isSelect == val) return;
            this._isSelect = val;
            if (val){
                this.img_bg.skin = SkinUtil.fenye_down;
                this.lab_tab.color = "#7e5336";
            }else{
                this.img_bg.skin = SkinUtil.fenye_up;
                this.lab_tab.color = "#e6ca91";
            }
        }

        public static onSelectCell(cells:common.TabIR3[], selectIndex:number):void{
            if (!cells || cells.length < 1) return;
            for (let i:number = 0; i < cells.length; i++){
                let cell:common.TabIR3 = cells[i];
                if (cell){
                    cell.setSelect(i==selectIndex);
                }
            }
        }
    }
} 