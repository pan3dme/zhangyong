/**
* name 
*/
module common {
    export class EffItemBox extends ui.box.effItemBoxUI {
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

        private refreshData(item: ItemVo) {
            if (item) {
                this.visible = true;
                this.ui_item.dataSource = item;
                if (item.isShowEff){
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
