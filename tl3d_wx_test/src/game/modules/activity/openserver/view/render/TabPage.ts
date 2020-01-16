/**
* name 
*/
module game {
    export class TabPage extends ui.activity.openserver.tabPageUI {

        private uiScene: Base2dSceneLayer;

        constructor() {
            super();
            this.btn_buy.on(Laya.Event.CLICK, this, this.onClick);
            this.uiScene = new Base2dSceneLayer();
            this.addChild(this.uiScene);
        }

        private onClick() {
            if (this.btn_buy.gray) {
                showToast(this.btn_buy.label);
                return;
            }

            if (this.dataSource.isbuy()) {
                //领取
               
            } else {
                //购买
                let payid = this.dataSource.tab.charge_id;
                let pid = Number(window.platform.pid); 
                if (ChongzhiModel.isRealPay(pid)) {
                    let rechargeitem = tb.TB_recharge.get_TB_rechargeById(payid);
                    ChongzhiModel.pay(rechargeitem);
                } else {
                    UIUtil.payDebug(payid,{ text: LanMgr.getLan("",12638), yes: LanMgr.getLan("",12639) },()=>{
                        OpenserverModel.getInstance().addpay(this.dataSource.id);
                        this.updateBtn(this.dataSource);
                    });
                }
            }

        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private _lastmodel: number;
        public showmodel(model, model_multiple) {
            this.uiScene.onShow();
            //因模型和特效的关系，切换模型时，必须重新new 一个scenechar
            if (this._lastmodel == model) {
                return;
            }
            this.uiScene.clearSceneChar();
            this.uiScene.addModelChar(String(model), 200, 700, 180, model_multiple);
            this._lastmodel = model;
        }

        public closePanel() {
            if (this.uiScene) {
                this.uiScene.onExit();
            }
            this._lastmodel = -1;
        }

        private refreshData(item: DayVo) {
            if (item) {
                this.list_reward.dataSource = ary2prop(item.tab.reward);
                listAtCenter(this.list_reward, 15, 5, this.list_reward.dataSource.length);
                this.callLater(this.showmodel, [item.tab.model_show, item.tab.model_multiple]);
                this.updateBtn(item);
            } else {
                this.list_reward.dataSource = null;
            }
        }

        private updateBtn(item: DayVo) {
            let isreceive: boolean = item.isReceive();
            let isbuy: boolean = item.isbuy();
            let canbuy: boolean = item.canBuy();
            this.redpoint.visible = isbuy && !isreceive;
            let haspay: boolean = OpenserverModel.getInstance().hasPay(item.id);
            this.btn_buy.gray = false;
            if (isreceive) {
                this.btn_buy.label = LanMgr.getLan(``,10036);
                this.btn_buy.gray = true;
            } else if (isbuy) {
                this.btn_buy.label = LanMgr.getLan(``,10036);
                this.btn_buy.gray = true;
            } else if (haspay) {
                this.btn_buy.label = LanMgr.getLan(``,10473);
                this.btn_buy.gray = true;
            } else if (!canbuy) {
                this.btn_buy.label = LanMgr.getLan(``,10474);
                this.btn_buy.gray = true;
            } else {
                this.btn_buy.label = LanMgr.getLan(``,10475) + item.tab.recharge_num;
            }
        }
    }
}
