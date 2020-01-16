

module game {

    export class RefreshView extends ui.shop.ShopRefreshUI {
        public static IS_TIPS_TODAY:boolean = true;
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.Shop_RefreshView, closeOnSide: this.isModelClose,title:LanMgr.getLan("",12173)};
        }

        /** 界面移除 */
        public onClosed(): void {
            super.onClosed();
            this.btn_sure.off(Laya.Event.CLICK, this, this.onRefresh);
            this.btn_cancel.off(Laya.Event.CLICK, this, this.close);
            this.chk_tips.off(Laya.Event.CHANGE, this, this.onChkChange);
            this._marketSetTemp = null;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        private _marketSetTemp:tb.TB_market_set;
        public initView(): void {
            this._marketSetTemp = this.dataSource;
            //监听
            this.btn_sure.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btn_cancel.on(Laya.Event.CLICK, this, this.close);
            this.chk_tips.on(Laya.Event.CHANGE, this, this.onChkChange);
            
            this.chk_tips.selected = !RefreshView.IS_TIPS_TODAY;
            this.lab_content.text = LanMgr.getLan("", 12174, this._marketSetTemp.cost_diamond);
            this.img_Gem.x = this.lab_content.x +124;
        }

        private onChkChange():void{
            RefreshView.IS_TIPS_TODAY = !this.chk_tips.selected;
        }

        /** 刷新 */
        private onRefresh(): void {
            if (!this._marketSetTemp) return;
            if(UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, this._marketSetTemp.cost_diamond)) {
                return;
            }
            dispatchEvt(new ShopEvent(ShopEvent.REFRESH_JISHI_VIEW));
        }
    }
}