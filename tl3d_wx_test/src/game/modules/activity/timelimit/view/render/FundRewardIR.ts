/**
* name 
*/
module game {
    export class FundRewardIR extends ui.activity.timelimitactivity.JiJinIRUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: tb.TB_fund_reward) {
            if (item) {
                this.visible = true;
                this.itemList.dataSource = ary2prop(item.reward);
                this.lbday.text = LanMgr.getLan("", 12610, item.value);
                
                let param:number = 0;
                let receive:boolean = App.hero.welfare.weekFundAward.indexOf(item.ID) != -1;
                if (receive){
                    //已领取
                    param = 2;
                    // this.btn_receive.label = "已领取";
                    // this.btn_receive.disabled = true;
                    this.btn_receive.visible = false;
                    this.img_hasreceive.visible = true;
                }else if (App.getServerTime() > App.getOpenServerTime() + (item.value-1)*86400){
                    //可领取
                    param = 1;
                    this.btn_receive.label = LanMgr.getLan("",10476);
                    this.btn_receive.gray = false;
                    this.btn_receive.visible = true;
                    this.img_hasreceive.visible = false;
                }else{
                    //未达到
                    param = 0;
                    this.btn_receive.label = LanMgr.getLan("",10090);
                    this.btn_receive.gray = true;
                    this.btn_receive.visible = true;
                    this.img_hasreceive.visible = false;
                }

                this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive, [param]);
                this.img_hasreceive.on(Laya.Event.CLICK, this, this.onClickReceive, [param]);
            } else {
                this.visible = false;
                this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
                this.img_hasreceive.off(Laya.Event.CLICK, this, this.onClickReceive);
            }
        }

        private onClickReceive(param:number):void{
            if (param == 1){
                //先判断是否购买
                if (App.hero.welfare.weekFund.indexOf(this._dataSource.type) == -1){
                    //未购买
                    showToast(LanMgr.getLan(``,10235));
                    return;
                }
                var args = {};
			    args[Protocol.game_welfare_getWeekFundAward.args.id] = this._dataSource.ID;
			    PLC.request(Protocol.game_welfare_getWeekFundAward, args, ($data: any, $msg) => {
				    if (!$data) return;
                    UIUtil.showRewardView($data.commonData);
				    this.refreshData(this._dataSource);
			    })
            }else if (param == 0){
                showToast(LanMgr.getLan(``,10236));
            }else{
                showToast(LanMgr.getLan(``,10220));
            }
        }
    }
}
