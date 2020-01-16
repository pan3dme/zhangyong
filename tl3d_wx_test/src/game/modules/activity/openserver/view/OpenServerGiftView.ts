module game {
    export class OpenServerGiftView extends ui.activity.openserver.openServerGiftUI {
        private _curGiftVo:OpenServerGiftVo;
        constructor() {
            super();
            this.isModelClose = true;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
        }

        public onOpened() {
            super.onOpened();
            this.initVo();
            this.btn_close.on(Laya.Event.CLICK, this, this.onClickClose);
            tl3d.ModuleEventManager.addEvent(OpenserverEvent.OS_GIFT_CHANGE, this.refreshData, this);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        }

        public initVo():void{
            this._curGiftVo = OpenserverModel.getInstance().getCurOpenServerGiftVo();
            this.listitem.dataSource = this._curGiftVo ? this._curGiftVo.getGiftList() : [];
        }

        private refreshData():void{
            this.listitem.refresh();
        }

        private updateTime():void{
            if (this._curGiftVo){
                let rt:number = this._curGiftVo.getRemainTime();
                rt = Math.floor(rt);
                this.lab_time.text = LanMgr.getLan("",12172,this.getTimeStr(rt));
                if (rt <= 0){
                    this.initVo();
                }
            }else{
                this.lab_time.text = "";
                UIMgr.hideUIByName(UIConst.OpenServerGift);
            }
        }

        private getTimeStr(nS:number):string{
            let str:string = "";
            var day: number = float2int(nS / TimeUtil.dayTime);
            if (day > 0){
                nS -= day * TimeUtil.dayTime;
                str += day + LanMgr.getLan("",10025);
            }
            var hour: number = float2int(nS / TimeUtil.HourTime);
            if (hour > 0){
                nS -= hour * TimeUtil.HourTime;
                str += hour + LanMgr.getLan("",10026);
            }
            if (day > 0) return str;
            var minus: number = float2int(nS / TimeUtil.MinuteTime);
            if (minus > 0){
                nS -= minus * TimeUtil.MinuteTime;
                str += minus + LanMgr.getLan("",10027);
            }
            //秒
            // str += nS + "秒";

            return str;
        }

  
        private onClickClose():void{
            UIMgr.hideUIByName(UIConst.OpenServerGift);
        }
        
        public close() {
            super.close();
            Laya.timer.clearAll(this);
            this.btn_close.off(Laya.Event.CLICK, this, this.onClickClose);
            tl3d.ModuleEventManager.removeEvent(OpenserverEvent.OS_GIFT_CHANGE, this.refreshData, this);
            this._curGiftVo = null;
        }

        public onClosed() {
            super.onClosed();

        }
    }
}