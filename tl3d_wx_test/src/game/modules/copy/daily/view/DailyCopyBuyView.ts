

module game {

    export class DailyCopyBuyView extends ui.dailycopy.DailyCopyBuyUI{

        constructor(){
            super();
            this.isModelClose = true;
        }

        createChildren():void {
            super.createChildren();
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this.bgPanel.dataSource = null;
            this.btnBuy.off(Laya.Event.CLICK,this,this.onBuy);
            this.btnCancel.off(Laya.Event.CLICK,this,this.onCancel);
        }

        private initView(): void {
            let model = DailyCopyModel.getInstance();
            let type : number = this.dataSource;
            this.bgPanel.dataSource = {uiName:UIConst.Copy_DailyBuyView,closeOnSide:this.isModelClose};
            let limitType = model.getLimitType(type);
            this.btnBuy.on(Laya.Event.CLICK,this,this.onBuy);
            this.btnCancel.on(Laya.Event.CLICK,this,this.onCancel);
            this.lbCost.text = model.getBuyCost(limitType).toString();
            let total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum);
            let count = total - App.hero.getlimitValue(limitType);
            this.lbCount.text = LanMgr.getLan('',10106,count);
        }

        private onBuy():void {
            dispatchEvt(new DailyEvent(DailyEvent.BUY_DAILY_COPY_COUNT,this.dataSource));
        }
        private onCancel():void {
            UIMgr.hideUIByName(UIConst.Copy_DailyBuyView);
        }

        
    }
}