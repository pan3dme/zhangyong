module game {

    export class TreasueTujianIR extends ui.god.treasure.render.TujianIRUI {
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
                this.imgMask.visible = App.hero.treasureBooks.indexOf(info.templateId) == -1;
            }else{
                this.itemBox.dataSource = null;
            }
        }

        

    }
}