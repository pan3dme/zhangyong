module game {
    export class WeekFundView extends ui.activity.timelimitactivity.WeekFundUI {
        constructor() {
            super();
            this.isModelClose = true;
            this.btnList.selectHandler = new Handler(this, this.onTabSelect);
            this.btnList.renderHandler = new Handler(this, this.onTabRender);
            this.bgPanel.dataSource = {uiName:UIConst.WeekFundView,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12553)};
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        public onOpened() {
            super.onOpened();
            // this.init();
        }

        private init() {
            this.setTab()
            this.onTabSelect(0)
            this.timeTick();
            this.timerLoop(1000, this, this.timeTick);
            this.btn_use.on(Laya.Event.CLICK, this, this.jump);
            this.btn_wenhao.on(Laya.Event.CLICK, this, this.onClickWH);
        }

        private setTab() {
            let items: tb.TB_fund[] = [];
            let alldata = TableData.getInstance().getTableByName(TableData.tb_fund).data;
            let openTime: number = App.getOpenServerTime();
            let curTime: number = App.getServerTime();
            for (let key in alldata) {
                // let endTime: number = openTime + alldata[key].openserver_time * 86400;
                // if (endTime >= curTime) {
                //     items.push(alldata[key]);
                // }
                items.push(alldata[key]);
            }
            this.btnList.repeatX = items.length > 5 ? 5 : items.length;
            this.btnList.dataSource = items;
            this.btnList.centerX = 0;
            this.btnList.anchorX = 0.5;
        }

        private hasNoReceiveWeekFund(id: number): boolean {
            if (App.hero.welfare.weekFund && App.hero.welfare.weekFund.indexOf(id) != -1) {
                let allreward: tb.TB_fund_reward[] = tb.TB_fund_reward.getFundListByType(id);
                for (let j: number = 0; j < allreward.length; j++) {
                    if (App.hero.welfare.weekFundAward.indexOf(allreward[j].ID) == -1) {
                        return true;
                    }
                }
            }
            return false;
        }

        private _selectTabNum: number;
        private onTabSelect($index: number) {
            this._selectTabNum = $index;
            this.btnList.selectedIndex = $index;
            this.showSelectTab();
        }

        private onTabRender($cell: FundTabIR, $index: number) {
            $cell.btn_tab.selected = $index == this._selectTabNum;
        }

        public showSelectTab() {
            let fundData: tb.TB_fund = this.btnList.dataSource[this._selectTabNum];
            let isBuy: boolean = App.hero.welfare.weekFund.indexOf(fundData.ID) != -1;
            let allreward: tb.TB_fund_reward[] = tb.TB_fund_reward.getFundListByType(fundData.ID);
            allreward.sort((a: tb.TB_fund_reward, b: tb.TB_fund_reward) => {
                let sorta: number = App.hero.welfare.weekFundAward.indexOf(a.ID) == -1 ? a.value : a.value + 1000;
                let sortb: number = App.hero.welfare.weekFundAward.indexOf(b.ID) == -1 ? b.value : b.value + 1000;
                return sorta - sortb;
            });
            this.list_reward.dataSource = allreward;

            this.btn_use.label = "￥" + fundData.recharge_num;
            this.btn_use.visible = !isBuy;
            if (fundData.ID == 1){
                this.img_type.skin = "kaifujijin/188.png";
                this.lab_sw_open.visible = false;
                // this.img_type_icon.skin = "kaifujijin/shenmizhaohuanshu.png";
                // this.img_type_icon.x = 148;
                // this.img_type_icon.y = 263;
            }else{
                this.img_type.skin = "kaifujijin/288.png";
                this.lab_sw_open.visible = !App.IsSysOpen(ModuleConst.TREASURE);
                // this.img_type_icon.skin = "kaifujijin/wucaishenshi.png";
                // this.img_type_icon.x = 158;
                // this.img_type_icon.y = 278;
            }
        }

          //问好
        private onClickWH(): void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20003));
        }

        /**跳转到充值界面 */
        private jump(): void {
            if (this.btn_use.gray) {
                showToast(LanMgr.getLan(``,10224));
                return;
            }
            let fundData: tb.TB_fund = this.btnList.dataSource[this._selectTabNum];
            let pid = Number(window.platform.pid); 
            if (ChongzhiModel.isRealPay(pid)) {
                let rechargeitem = tb.TB_recharge.get_TB_rechargeById(fundData.recharge_id);
                ChongzhiModel.pay(rechargeitem);
            } else {
                this.test(fundData);//模拟充值
            }
        }

        /**
		 * 测试购买
		 * @param id 
		 */
        private test(item: tb.TB_fund) {
            UIUtil.payDebug(item.recharge_id,null,()=>{
                this.showSelectTab();
            });
        }

        private timeTick() {
            let activity: tb.TB_fund = this.btnList.dataSource[this._selectTabNum];
            let endTime: number = App.getOpenServerTime() + activity.openserver_time * 86400;
            let curTime:number = App.getServerTime();
            this.lab_activity_title.x = curTime >= endTime?299:276
            if (curTime >= endTime){
                //结束
                this.clearTimer(this, this.timeTick);
                this.btn_use.gray = true;
                this.btn_use.label = LanMgr.getLan("",12554);
                this.box_time.visible = false;
                this.lab_activity_title.text = LanMgr.getLan("",12554);
            }else{
                this.btn_use.gray = false;
                this.box_time.visible = true;
                this.lab_activity_title.text = LanMgr.getLan("",12555);
                this.lab_time.text=activityTime(endTime,curTime);
            }
        }

      

         public close():void{
            super.close();
        }

        public onClosed() {
            super.onClosed();
            this.clearTimer(this, this.timeTick);
            this.btn_use.off(Laya.Event.CLICK, this, this.jump);
            this.btn_wenhao.off(Laya.Event.CLICK, this, this.onClickWH);
        }

        private getTimeLab(): string {
            let str: string = "";
            let activity: tb.TB_fund = this.btnList.dataSource[this._selectTabNum];
            let endTime: number = App.getOpenServerTime() + activity.openserver_time * 86400;
            let rewardTime: number = endTime;
            if (App.getServerTime() >= endTime) {
                //已结束
                str = LanMgr.getLan("",10224);

                // if (App.getServerTime() >= rewardTime) {
                //     //已关闭
                //     str = "活动已关闭";
                //     this.clearTimer(this, this.timeTick);
                // } else {
                //     //领取时间
                //     str = "活动已结束（领奖倒计时：" + activityTime(rewardTime, App.getServerTime()) + "）";
                // }
            } else {
                //未结束
                str = "" + activityTime(rewardTime, App.getServerTime());
            }
            return str;
        }
    }
}
