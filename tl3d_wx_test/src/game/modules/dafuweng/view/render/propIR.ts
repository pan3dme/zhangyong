module game {
    export class propIR extends ui.dafuweng.propIRUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource(): tb.TB_risk {
            return this._dataSource;
        }

        private initView(){
            if(this.dataSource){
                this.ui_item.dataSource = new ItemVo(this.dataSource.para[0][0], this.dataSource.para[0][1]);
            }
        }
    }
}