module game {

    export class EquipBaoshiIR extends ui.equip.gemstone.EquipBaoshiIRUI {

        constructor() {
            super();
            this.equipBox.img_suo.visible = false;
            this.equipBox.lab_isopen.visible = false;
            this.equipBox.redpoint.onDispose();
        }

        public set dataSource($value: IGodGemUIVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():IGodGemUIVo {
            return this._dataSource;
        }

        private refreshData() {
            let info = this.dataSource;
            if(info){
                let equipVo = info.equipVo;
                let position = info.position;
                let godVo = info.godVo;
                let equipBox = this.equipBox;
                let isExist : boolean = equipVo ? true : false;
                equipBox.dataSource = equipVo;
                equipBox.itemBox.visible = isExist;
                equipBox.itemBox.dataSource = equipVo;
                equipBox.btn_add.visible = false;
                this.imgGem1.visible = godVo.isExistGem((position-1)*3+GemstoneType.shengming);
                this.imgGem2.visible = godVo.isExistGem((position-1)*3+GemstoneType.gongji);
                this.imgGem3.visible = godVo.isExistGem((position-1)*3+GemstoneType.fangyu);
                this.redpoint.onDispose();
                this.redpoint.setRedPointName(`equip_baoshi_group_${godVo.uuid}_${position}`);
                equipBox.ani_select.play();
            }else{
                this.equipBox.ani_select.gotoAndStop(0);
            }
        }

    
    }
}