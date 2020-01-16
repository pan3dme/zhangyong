module game {
    export class fightBossBuffIR extends ui.fight.box.BossBuffBoxUI {
        constructor() {
            super();
        }
        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData() {
            if (this.dataSource) {
                let vo: GodBuffVo = this.dataSource;
                this.img_buff.skin = SkinUtil.getBuffIcon(vo.tb_buff.icon);
                this.lab_round.text = String(vo.round);
            }
        }
    }
}