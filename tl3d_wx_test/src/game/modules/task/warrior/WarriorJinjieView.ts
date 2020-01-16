
module game {

    export class WarriorJinjieView extends ui.task.warrior.WarriorJinjieUI {

        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.WarriorJinjieView, closeOnSide: this.isModelClose, title:"comp/title/jinjiejiangli.png" };
            this.btnBuy.on(Laya.Event.CLICK,this,this.onBuy);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed():void {
            super.onClosed();
            this.listExtral.array = null;
            this.listReward.array = null;
        }

        public initView():void {
            let curCycle = WarriorProveModel.getInstance().curTabCycle;
            this.lbAddLv.text = LanMgr.getLan("",12136,curCycle.level_up);
            let items = curCycle.getRewardItems();
            this.listReward.array = items;
            this.listReward.width = items.length >= 5 ? 480 : (items.length*100 + (items.length-1)*this.listReward.spaceX);
            let specials = curCycle.getShowItems();
            this.listExtral.array = specials;
            this.listExtral.width = specials.length * 100 + (specials.length - 1) * this.listExtral.spaceX;
            this.listExtral.width = specials.length >= 5 ? 480 : (specials.length*100 + (specials.length-1)*this.listExtral.spaceX);
            let tbChongzhi = tb.TB_recharge.get_TB_rechargeById(curCycle.recharge_id);
            this.btnBuy.label = `￥${tbChongzhi.recharge_count}`;
        }

        private onBuy():void {
            if(WarriorProveModel.getInstance().isUnlockJinjie()) {
                showToast(LanMgr.getLan('', 10456));
                return;
            }
            let curCycle = WarriorProveModel.getInstance().curTabCycle;
            let tbData : tb.TB_recharge = curCycle ? tb.TB_recharge.get_TB_rechargeById(curCycle.recharge_id) : null;
			if(!tbData) return;
			let pid = Number(window.platform.pid); 
            if (ChongzhiModel.isRealPay(pid)) {
                let rechargeitem = tb.TB_recharge.get_TB_rechargeById(tbData.ID);
                ChongzhiModel.pay(rechargeitem);
            } else {
                UIUtil.payDebug(tbData.ID);
            }
        }
    }

}