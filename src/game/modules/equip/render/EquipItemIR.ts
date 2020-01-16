module game {

    export class EquipItemIR extends ui.box.EquipItemBoxUI {

        private _anim : Laya.Animation;
        constructor() {
            super();
        }

        public set dataSource($value: EquipItemVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():EquipItemVo {
            return this._dataSource;
        }

        private refreshData() {
            // let info = this.dataSource;
            // if(info){
            //     this.ani_select.play();
            // }else{
            //     this.ani_select.gotoAndStop(0);
            // }
        }
    }
}