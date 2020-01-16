module game {
    export class QiyuTabIR extends ui.dafuweng.QiyuTabIRUI {

        public clientPos : Laya.Point;
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource(): DafuwengVo {
            return this._dataSource;
        }

        private _endTime : number = 0;
        private initView(){
            let info = this.dataSource;
            if(info){
                this._endTime = info.svo.limitTime;
                Laya.timer.loop(1000,this,this.updateTime);
                this.updateTime();
                this.img.skin = SkinUtil.getQiyuSkin(info.tbRisk.type);
                this.animSelect.play(0,true);
            }else {
                Laya.timer.clearAll(this);
                this._endTime = 0;
                this.animSelect.stop();
            }
        }

        private updateTime():void {
            let time = this._endTime - App.serverTimeSecond;
            this.lbTime.text = GameUtil.toCountdown(time,"hh:mm:ss");
        }
    }
}