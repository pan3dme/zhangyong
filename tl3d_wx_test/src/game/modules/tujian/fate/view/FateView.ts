
    
module game {
    export class FateView extends ui.tujian.FateViewUI {

        public onShow(): void {
            this.initView();
            tl3d.ModuleEventManager.addEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC, this.updateNum, this);
        }

        public onExit(): void {
            this.list_fate.array = null;
            this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
            tl3d.ModuleEventManager.removeEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC, this.updateNum, this);
        }

        private initView(): void {
            /** list列表数据 */
            this.list_fate.array = FateModel.getInstance().arrFateVo;
            //监听
            this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
            this.updateNum();
        }

        private updateNum():void {
            //图鉴进度
            this.lb_tujian.text = LanMgr.getLan('', 12120, FateModel.getInstance().getFateArrNum()[0], FateModel.getInstance().getFateArrNum()[1]);
        }

        /** 按键监听(打开属性列表) */
        private onLook(): void {
            UIMgr.showUI(UIConst.Tujian_AttrView);
        }
    }
}