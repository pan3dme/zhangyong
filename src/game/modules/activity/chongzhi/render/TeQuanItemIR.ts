/**
* name 
*/
module game {
    export class TeQuanItemIR extends ui.activity.chongzhi.teQuanItemIRUI {
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
            if (item) {
                this.visible = true;
                this.ui_item.dataSource = item.item;
                if (item.play){
                    this.eff.visible = true;
                    this.eff.loadAnimation(ResConst.anim_teshutishi,Handler.create(null,()=>{
                        this.eff.play(1, true);
                    }),ResConst.atlas_teshutishi);
                }else{
                    this.eff.visible = false;
                    this.eff.stop();
                }
            } else {
                this.visible = false;
                this.eff.stop();
            }
        }

    
    }
}
