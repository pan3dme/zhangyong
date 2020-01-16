module game {
    export class QiyuBtnView extends ui.dafuweng.QiyuBtnUI {
        constructor() {
            super();
        }

        public onShow():void {
            this.redPoint.setRedPointName("adventure_qiyu");
            tl3d.ModuleEventManager.addEvent(DafuwengEvent.ADD_RISK_INFO,this.initView,this);
            tl3d.ModuleEventManager.addEvent(DafuwengEvent.DEL_RISK_INFO,this.initView,this);
            tl3d.ModuleEventManager.addEvent(DafuwengEvent.UPDATE_RISK_INFO,this.initView,this);
            this.bombAnim.visible = false;
            this.bombAnim.stop();
            this.bombAnim.on(Laya.Event.COMPLETE,this,this.onBombComple);
            this.ani2.on(Laya.Event.COMPLETE,this,this.onCompleAnim2);
            this.ani2.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            this.initView();
        }

        public onExist():void {
            this.bombAnim.visible = false;
            this.bombAnim.stop();
            this.ani2.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            this.redPoint.onDispose();
            Laya.timer.clearAll(this);
            tl3d.ModuleEventManager.removeEvent(DafuwengEvent.ADD_RISK_INFO,this.initView,this);
            tl3d.ModuleEventManager.removeEvent(DafuwengEvent.DEL_RISK_INFO,this.initView,this);
            tl3d.ModuleEventManager.removeEvent(DafuwengEvent.UPDATE_RISK_INFO,this.initView,this);
        }

        private initView():void {
            let list = DafuwengModel.getInstance().getRiskList(false);
            if(list.length > 0) {
                this.ani1.play(0,true);
            }else{
                this.ani1.gotoAndStop(0);
            }
            this.ani2.gotoAndStop(0);
        }

        public playAnim2():void {
            this.ani1.stop();
            this.ani2.play(0,false);
            this.bombAnim.visible = true;
            this.bombAnim.play(0,false);
        }

        private onCompleAnim2():void {
            this.initView();
        }

        private onBombComple():void {
            this.bombAnim.visible = false;
            this.bombAnim.stop();
        }
    }
}