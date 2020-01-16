/*
* name;
*/
module game {
    export class RechargeGiftSuccView extends ui.activity.chongzhi.RechargeGiftSuccUI {
        public static OPENSERVER_GIFT_ID:number[] = [26,27,28,29,30,31,32];//开服礼包充值id
        public static FUND_GIFT_ID:number[] = [24,25];//成长基金礼包充值id
        public static OPENSERVER_HAOLI_GIFT_ID:number[] = [17,18,19,20,21,22,23];//开服好礼礼包充值id
        public static LEVEL_FUND_GIFT_ID:number[] = [16];//等级基金礼包充值id
        public static CHAOZHI_GIFT_ID:number[] = [10,11,12,13,14,15];//超值礼包

        constructor() {
            super();
            this.isModelClose = false;
            this.list.visible = false;
            this.listVo = new ListVo(this.list);
            this.btnComfirnm.on(Laya.Event.CLICK,this,this.close);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        listVo: ListVo;

        private initView(): void {
            this.eff_guang.play();
            let id:number = this.dataSource;
            let rechargeTemp:tb.TB_recharge = tb.TB_recharge.get_TB_rechargeById(id);
            this.lab_score.text = Snums(rechargeTemp.recharge_count * 10);

            let allItem:ItemVo[] = [];
            if (RechargeGiftSuccView.OPENSERVER_GIFT_ID.indexOf(id)!= -1){
                let osGiftTemp:tb.TB_openservice_gift = OpenserverModel.getInstance().getOsGiftByRechargeid(id);
                if (osGiftTemp){
                    allItem = ary2prop(osGiftTemp.reward);
                }
            }else if (RechargeGiftSuccView.OPENSERVER_HAOLI_GIFT_ID.indexOf(id)!= -1){
                let oshlGiftTemp:tb.TB_openservice = tb.TB_openservice.getTB_openserviceByChargeid(id);
                if (oshlGiftTemp){
                    allItem = ary2prop(oshlGiftTemp.reward);
                }
            }else if (RechargeGiftSuccView.CHAOZHI_GIFT_ID.indexOf(id)!= -1){
                let czGiftTemp:tb.TB_operate_activity[] = tb.TB_operate_activity.get_TB_operate_activity("index",id+"");
                if (czGiftTemp[0]){
                    allItem = ary2prop(czGiftTemp[0].reward);
                }
            }else if (tb.TB_daily_recharge.getAllRecharges().indexOf(id)!= -1){
                let tbData:tb.TB_daily_recharge = tb.TB_daily_recharge.getTBByRechargeId(id);
                if (tbData){
                    allItem = ary2prop(tbData.reward);
                }
            }else if (tb.TB_week_recharge.getAllRecharges().indexOf(id)!= -1){
                let tbData:tb.TB_week_recharge = tb.TB_week_recharge.getTBByRechargeId(id);
                if (tbData){
                    allItem = ary2prop(tbData.reward);
                }
            }else if (tb.TB_month_recharge.getAllRecharges().indexOf(id)!= -1){
                let tbData:tb.TB_month_recharge = tb.TB_month_recharge.getTBByRechargeId(id);
                if (tbData){
                    allItem = ary2prop(tbData.reward);
                }
            }else if (RechargeGiftSuccView.FUND_GIFT_ID.indexOf(id)!= -1){
                //周基金
                this.lab_tq.text = LanMgr.getLan("激活{0}基金", -1, rechargeTemp.recharge_count);
                this.height = 300;
                return;
            }else if (RechargeGiftSuccView.LEVEL_FUND_GIFT_ID.indexOf(id)!= -1){
                //等级基金
                this.lab_tq.text = LanMgr.getLan("激活等级基金特权", -1);
                this.height = 300;
                return;
            }else if (tb.TB_warrior_cycle.getAllRecharges().indexOf(id)!= -1){
                //勇者之证
                this.lab_tq.text = LanMgr.getLan("解锁勇者之证进阶奖励", -1);
                let tbData:tb.TB_warrior_cycle = WarriorProveModel.getInstance().curTabCycle;
                if (tbData){
                    allItem = ary2prop(tbData.activate_reward);
                }
            }
            this.lab_tq.text = "";
            for (let key in allItem) {
                allItem[key].show = true;
                allItem[key].startAction = true;
            }

            this.list.repeatX = allItem.length > 4 ? 4 : allItem.length;
            this.list.width = this.list.repeatX * 100;
            this.list.height = 100;
            this.list.y = this.y - 20;
            this.list.x = ((Laya.stage.width / 2) - 45) - ((this.list.repeatX - 1) * ((90 + this.list.spaceX) / 2));

            this.listVo.initData(this.list);
            this.listVo._dataSource = allItem;
            this.listVo.setZorder(this.zOrder);
            this.listVo.setWidth(this.list.width);
            this.listVo.setHeight(this.list.height);
            this.listVo.setPosition(this.list.x, this.list.y);
            this._efflist = common.EffectList.showEffectList(this.listVo);

            this.height = 350;
        }
        /**获得物品效果列表 */
        private _efflist: common.EffectList;
        public close() {
            super.close();
            if(this.dataSource && this.dataSource.callback){
                this.dataSource.callback.call(null);
            }
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.eff_guang.stop();
            AudioMgr.playSound("sound/getreward.mp3");
        }

        public onClosed(): void {
            super.onClosed();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list.array = null;
            ChongzhiModel.getInstance().showVipupPanel();
        }
    }
}