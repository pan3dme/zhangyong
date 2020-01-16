module game {

    export class StrengthAttrIR extends ui.god.treasure.render.StrengthAttrIRUI {
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
                this.lbValue.color = info[2] || ColorConst.normalFont;
            }else{
            }
        }


    }
}