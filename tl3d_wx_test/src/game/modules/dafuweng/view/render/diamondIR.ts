module game {
    export class diamondIR extends ui.dafuweng.diamondIRUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource():tb.TB_risk {
            return this._dataSource;
        }

        private initView(){
            if(this.dataSource){
                this.img.skin = this.dataSource.para[0][0] == iface.tb_prop.resTypeKey.gold?"tanxian/jinqian.png":"tanxian/zuanshi.png";
                this.lab_num.text = Snums(this.dataSource.para[0][1]);
            }
        }
    }
}