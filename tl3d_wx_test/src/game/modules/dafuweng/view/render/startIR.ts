module game {
    export class startIR extends ui.dafuweng.startIRUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private initView(){

        }
    }
}