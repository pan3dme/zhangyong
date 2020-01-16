
module game {

    export class TestRebateView extends ui.activity.testrebate.TestRebateUI {

        constructor() {
            super();
            this.isModelClose = true;
        }

        createChildren(): void {
            super.createChildren();
            this.btnClose.on(Laya.Event.CLICK,this,this.close);
            this.btnLingqu.on(Laya.Event.CLICK,this,this.onReward);
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public onClosed(): void {
            super.onClosed();
        }

        private initView(): void {
            let tbRecharge = tb.TB_recharge_rebate.getTBItemById(App.hero.accountName);
            let num = tbRecharge?tbRecharge.recharge_total:0;
            this.lbRecharge.text = LanMgr.getLan("",12611,num);
            this.lbRebate.text = LanMgr.getLan("",12612,num*20);
            let isReward = App.hero.welfare.rechargeRebate > 0;
            this.imgYilingqu.visible = isReward;
            this.btnLingqu.visible = !isReward;
        }


        private onReward():void {
            if(!HuodongModel.getInstance().canRewardTestRebate()){
                showToast(LanMgr.getLan(``,10233));
                return;
            }
            PLC.request(Protocol.game_welfare_getRechargeRebate,null,(data)=>{
                if(!data) return;
                App.hero.welfare.rechargeRebate = data['rechargeRebate'];
                UIUtil.showRewardView(data.commonData);
                this.initView();
                dispatchEvt(new HuodongEvent(HuodongEvent.TEST_REBATE_RP));
                dispatchEvt(new HudEvent(HudEvent.UPDATE_MAINVIEW_BUTTON));
            });
        }

    }

}