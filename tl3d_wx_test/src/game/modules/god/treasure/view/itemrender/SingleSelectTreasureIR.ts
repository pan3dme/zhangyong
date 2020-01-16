module game {

    export class SingleSelectTreasureIR extends ui.god.treasure.render.SingleSelectTreasureIRUI {
        constructor() {
            super();
        }

        public set dataSource(data: TreasureItemVo) {
            this._dataSource = data;
            this.initView();
        }

        public get dataSource():TreasureItemVo {
            return this._dataSource;
        }

        private initView() {
            let info : TreasureItemVo = this.dataSource;
            if(info){
                this.itemBox.dataSource = info;
                this.animSelect.play(0,true);
            }else{
                this.itemBox.dataSource = null;
                this.animSelect.stop();
            }
        }

        

    }
}