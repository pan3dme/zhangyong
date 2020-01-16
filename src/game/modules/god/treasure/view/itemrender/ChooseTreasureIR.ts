module game {

    export class ChooseTreasureIR extends ui.god.treasure.render.ChooseTreasureIRUI {
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
            }else{
                this.itemBox.dataSource = null;
            }
        }

        /** 更新数据 */
        public refreshData():void {
            // let info = this.dataSource;
            // if(info){
            //     this.gray = info.isExsitGod();
            // }
        }

    }
}