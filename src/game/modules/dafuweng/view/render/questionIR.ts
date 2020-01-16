module game {
    export class questionIR extends ui.dafuweng.questionIRUI {
        private _model = DafuwengModel.getInstance();
        constructor() {
            super();
            this.img_question.on(Laya.Event.CLICK, this, this.onClick);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            if($value){
                // this.ani1.play();
            }
            else{
                this.ani1.stop();
            }
        }

        public get dataSource(): tb.TB_risk {
            return this._dataSource;
        }

        private onClick() {
            showToast(LanMgr.getLan('', 10285));
        }
    }
}