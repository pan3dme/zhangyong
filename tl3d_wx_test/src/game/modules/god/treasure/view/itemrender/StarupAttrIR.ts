module game {

    export class StarupAttrIR extends ui.god.treasure.render.StarupAttrIrUI {
        constructor() {
            super();
        }

        public set dataSource(data: any) {
            this._dataSource = data;
            this.refreshData();
        }

        public get dataSource():any {
            return this._dataSource;
        }

        private refreshData() {
            let info : any[] = this.dataSource;
            if(info){
                this.lbName.text = info[0];
                this.lbValue.text = info[1];
            }else{
                
            }
        }


    }
}