module game {

    export class EquipGodIR extends ui.equip.render.EquipGodIRUI {
        constructor() {
            super();
        }

        public set dataSource($value: GodItemVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():GodItemVo {
            return this._dataSource;
        }

        private refreshData() {
            let info = this.dataSource;
            if(info) {
                this.headBox.dataSource = this.dataSource;
                this.headBox.visible = true;
                this.anim_select.play();
            }else{
                this.headBox.dataSource = null;
                this.headBox.visible = false;
                this.anim_select.gotoAndStop(0);
            }
        }

    }
}