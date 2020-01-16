
module game {

    export class SuperVipView extends ui.activity.supervip.SuperVipUI {

        public static QQ: string = "3048553263";        // 客服qq
        public static dayValue: number = 2000;         // 单日累计充值目标
        public static allValue: number = 10000;         // 历史累计充值目标
        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12613) };
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public onClosed(): void {
            super.onClosed();
            this.btnReward.off(Laya.Event.CLICK,this,this.onReward);
            this.imgReward.off(Laya.Event.CLICK,this,this.onShow);
            tl3d.ModuleEventManager.removeEvent(ResEvent.VIP_LEVEL_CHANGE,this.updateView,this);
        }

        private initView(): void {
            tl3d.ModuleEventManager.addEvent(ResEvent.VIP_LEVEL_CHANGE,this.updateView,this);
            this.updateView();
            this.btnReward.on(Laya.Event.CLICK,this,this.onReward);
            this.imgReward.on(Laya.Event.CLICK,this,this.onShow);
        }

        private updateView(): void {
            this.lbTitle1.text = LanMgr.getLan("",12614,SuperVipView.dayValue);
            this.lbValue1.text = `${App.hero.welfare.dailyRechargeSum}/${SuperVipView.dayValue}`;
            this.lbTitle2.text = LanMgr.getLan("",12615,SuperVipView.allValue);
            this.lbValue2.text = `${App.hero.welfare.rechargeSum}/${SuperVipView.allValue}`;
            let isVip: boolean = App.hero.welfare.superVip == 1;
            this.lbQQ.text = isVip ? SuperVipView.QQ : "*********";
            let isReward: boolean = App.hero.welfare.superVipAward == 1;
            this.btnReward.disabled = !isVip || isReward;
            this.btnReward.label = isVip ? (isReward ? LanMgr.getLan("",10043) : LanMgr.getLan("",10476)) : LanMgr.getLan("",10090);
        }

        private onReward():void {
            PLC.request(Protocol.game_welfare_getSuperVipAward,null,($data)=>{
                if(!$data) return;
                UIUtil.showRewardView($data.commonData);
                App.hero.welfare.superVipAward = $data["superVipAward"];
                this.updateView();
                dispatchEvt(new HuodongEvent(HuodongEvent.SUPER_VIP_RP));
            });
        }

        private onShow():void {
            UIMgr.showUI(UIConst.ManyItemsTip,{data:tb.TB_activity_set.getTabSet().getVipGiftList()});
        }
    }

}