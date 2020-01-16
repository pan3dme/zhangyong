module game {
    export class guajiDefeated extends ui.fight.shibaiUI {

        constructor() {
            super();
            this.isModelClose = true;
            this.btn_close.on(Laya.Event.CLICK,this,this.close);
            this._tickFun = () => {
                this.timeTick();
            }
        }

        private timeTick() {
            this.time--;
            if (this.time <= 0) {
                this.close();
            }
            this.lab_time.text = String(this.time);
        }

        private _tickFun: Function;
        private time: number;
        public popup() {
            super.popup(false, false);
            this.time = 6;
            this._tickFun();
            this.bgPanel.showTitle(false,"zhandoubiaoxian/shibai.png",false, true, false, null, this);
            this.btn_again.visible = false;
            Laya.timer.loop(1000, this, this._tickFun);
            this.btn_close.x = 282 ;
            this.channel.callback = ()=>{
                this.close();
            };
        }

        public onOpened() {
            super.onOpened();
            AudioMgr.playSound("sound/defeated.mp3");
        }


        public close(): void {
            super.close();
            Laya.timer.clear(this, this._tickFun);
            this.bgPanel.closeTitle();
        }

        public onClosed() {
            super.onClosed();
            if(UIMgr.hasStage(UIConst.GuajiView)) {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                view.delayShowBossTips();
            }
        }
    }
}