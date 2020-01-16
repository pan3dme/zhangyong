module game {
    export class ItemSelectBox extends ui.activity.limitebuy.render.ItemSelectBoxUI {
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

        public refreshData(): void {
            let info = this.dataSource;
            if(info) {
                this.ui_item.dataSource = info;
                this.anim_select.play();
            }else{
                this.ui_item.dataSource = null;
                this.anim_select.gotoAndStop(0);
            }
        }
        
    }
}