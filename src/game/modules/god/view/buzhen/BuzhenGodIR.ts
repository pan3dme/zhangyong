

module game {

    export class BuzhenGodIR extends ui.box.BuzhenItemBoxUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():BuzhenListItemVo {
            return this._dataSource;
        }

        private refreshData() {
            let itemVo = this.dataSource;
            if (itemVo) {
                let godVo = itemVo.godVo;
                this.ui_head.dataSource = godVo;
                this.lbBlood.visible = this.bloodProg.visible = false;
                this.gray = false;
                this.img_yuanzhu.visible = itemVo.godVo.isAid;
                if(itemVo.linuepType == iface.tb_prop.lineupTypeKey.expedition){
                    if(itemVo.showBlood){
                        this.lbBlood.visible = this.bloodProg.visible = true;
                        let percent = Math.ceil(itemVo.hp/itemVo.totalHp*100);
                        this.lbBlood.text = percent + "%";
                        this.bloodProg.value = itemVo.hp / itemVo.totalHp;
                    }else{
                        this.lbBlood.visible = this.bloodProg.visible = false;
                    }
                    if(itemVo.canGray){
                        this.gray = itemVo.hp <= 0 || godVo.level < YuanzhengModel.SHANGZHEN_LEVEL;
                    }
                }
            } else {
                this.chk_select.visible = false;
            }

        }
    }
}