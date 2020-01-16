module game {
    export class goAndOutIR extends ui.dafuweng.goAndOutIRUI {
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
                this.lab_info.text = this.dataSource.para[0][0] > 0? `${LanMgr.getLan("",12460)}${this.dataSource.para[0][0]}`:`${LanMgr.getLan("",12461)}${Math.abs(this.dataSource.para[0][0])}`;
                this.ani1.play();
            }
            else{
                this.ani1.stop();
            }
        }
    }
}