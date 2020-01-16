/*
* name;
*/
module common {
    export class VipLvUpView extends ui.hud.view.VipLvUpUI {

        constructor() {
            super();
            this.isModelClose = false;
            this.btnComfirnm.on(Laya.Event.CLICK,this,this.close);
        }

        public popup(): void {
            super.popup();
            this.initView();
        }

        public onOpened() {
            super.onOpened();
            this.eff_guang.play();
        }

        private initView(): void {
            let data : {oldVip,newVip,oldScore,newScore} = this.dataSource;
            this.lbScore.text = "积分x" + (data.newScore - data.oldScore);
            this.oldClip.value = data.oldVip;
            this.newClip.value = data.newVip;
        }

        public close() {
            super.close();
            if(this.dataSource && this.dataSource.callback){
                this.dataSource.callback.call(null);
            }
            this.eff_guang.stop();
        }

        public onClosed(): void {
            super.onClosed();
        }
    }
}