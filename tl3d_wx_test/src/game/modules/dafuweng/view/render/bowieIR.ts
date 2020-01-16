module game {
    export enum bowieState{
        CLOSE,OPEN
    }
    export class bowieIR extends ui.dafuweng.yanliBoxIRUI {
        private _model = DafuwengModel.getInstance();
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

        private initView() {
            Laya.Tween.clearAll(this);
            Laya.Tween.clearAll(this.img_barrel);
            if (this.dataSource) {
                this.ui_prop.dataSource = new ItemVo(this.dataSource.prop[0], this.dataSource.prop[1]);
                //初始化位置
                this.img_barrel.y = 0;
                this.img_barrel.alpha = 1;
                this.curState = bowieState.CLOSE;
            }else{
                
            }
        }

        public curState:number;
        public openAndcloseEff(cb: Function) {
            this.openEff(() => {
                setTimeout(() => {
                    this.closeEff(() => {
                        if (cb) {
                            cb();
                        }
                    });
                }, 1000);
            });
        }

        public openEff(cb?: Function) {
            if (this.dataSource) {
                Laya.Tween.to(this.img_barrel, { y: -93, alpha: 0.7 }, 600, null, Handler.create(this, () => {
                    this.curState = bowieState.OPEN;
                    // logyhj("打开完回调");
                    if (cb) {
                        cb();
                    }
                }))
            }
        }

        public closeEff(cb?: Function) {
            if (this.dataSource) {
                Laya.Tween.to(this.img_barrel, { y: 0, alpha: 1 }, 600, null, Handler.create(this, () => {
                    this.curState = bowieState.CLOSE;
                    // logyhj("关闭完回调");
                    if (cb) {
                        cb();
                    }
                }))
            }
        }


    }
}