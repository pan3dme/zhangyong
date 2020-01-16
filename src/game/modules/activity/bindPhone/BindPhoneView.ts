
module game {

    export class BindPhoneView extends ui.activity.bindPhone.BindPhoneUI {

        constructor() {
            super();
            this.btn_recive.on(Laya.Event.CLICK, this, this.onRecive);
        }

        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
            
        }

        public onClosed(): void {
            super.onClosed();
            tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateView, this);
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateView, this);
            this.bgPanel.dataSource = { title: "yunyingxuqiu/bangdingshouji.png" };
            this.updateView();
        }

        private updateView(): void {
            let tabset = tb.TB_activity_set.getTabSet();
            let list = ary2prop(tabset.phone_bind_reward);
            this.list_reward.array = list;
            this.list_reward.width = list.length * 100 + (list.length - 1) * this.list_reward.spaceX;
            this.refreshState();
        }

        public refreshState() {
            //绑定状态
            let bindok: boolean = App.hero.bindPhone == 1;
            //领取状态
            let receiveok: boolean = App.hero.bindMobileAward != 0;

            let canreceiveFlag: boolean = bindok && !receiveok;
            this.btn_recive.skin = canreceiveFlag ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_recive.labelStrokeColor = canreceiveFlag ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
            this.btn_recive.label = receiveok ? "已领取" : bindok ? "领取" : "立即绑定";
            this.btn_recive.gray = receiveok;
            this.btn_recive.selected = this.btn_recive.gray;
        }

        private onRecive() {
            //领取状态
            let receiveok: boolean = App.hero.bindMobileAward != 0;
            if (receiveok) {
                showToast(LanMgr.getLan('', 10043));
                return;
            }

            //绑定状态
            let bindok: boolean = App.hero.bindPhone == 1;
            if (!bindok) {

            }

            //领奖励
            PLC.request(Protocol.game_welfare_getBindMobileAward, null, ($data, $msg: string) => {
                if (!$data) return;
                App.hero.bindMobileAward = $data.bindMobileAward;
                this.refreshState();
                UIUtil.showRewardView($data.commonData);
                dispatchEvt(new HuodongEvent(HuodongEvent.BIND_PHONE_EVENT));
            });
        }
    }

}