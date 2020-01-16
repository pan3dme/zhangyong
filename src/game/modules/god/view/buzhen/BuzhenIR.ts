

module game {

    export class godBuzhenIR extends ui.box.BuzhenBoxUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():BuzhenItemVo {
            return this._dataSource;
        }

        public refreshData(isEmpty:boolean = false) {
            if (this._dataSource) {
                let infoVo: BuzhenItemVo = this._dataSource;
                this.lbLock.visible = this.imgLock.visible = !infoVo.openflag;
                this.lbLock.text = infoVo.msg;
                this.lbEmpty.visible = isEmpty && infoVo.openflag;
                this.lbEmpty.text = infoVo.posDes;
            } else {
            }

        }
    }

}