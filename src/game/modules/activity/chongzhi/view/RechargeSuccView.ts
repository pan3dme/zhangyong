/*
* name;
*/
module game {
    export class RechargeSuccView extends ui.activity.chongzhi.RechargeSuccUI {

        private _data:tb.TB_recharge;
        public listVo: ListVo;
        private _addScore : number;     // 获得的vip积分
        constructor() {
            super();
            this.isModelClose = false;
            this.list.visible = false;
            this.listVo = new ListVo(this.list);
            this.btnComfirnm.on(Laya.Event.CLICK,this,this.close);
        }

        public popup(): void {
            let rechargeId = this.dataSource;
            this._data = tb.TB_recharge.get_TB_rechargeById(rechargeId);
             if (!this._data || this._data.recharge_type > 1){
                this.height = 310;
             }else{
                this.height = 310 + 140;
             }
            super.popup();
            this.initView();
        }

        private initView(): void {
            let rechargeId = this.dataSource;
            this._addScore = this._data.recharge_count * 10;
            this.box_yueka.visible = this._data.recharge_type == 0;
            this.box_zhonshen.visible = this._data.recharge_type == 1;
            let firstRecharge = App.hero.welfare.goodsRechargeCount[rechargeId] == 1;
            this.box_extra.visible = !this.box_yueka.visible && !this.box_zhonshen.visible;
            this.lab_score.text = Snums(this._data.recharge_count * 10);
            this.lab_diamonds.text = Snums(this._data.recharge_count * 10);
            this.lab_extra.text = firstRecharge ? (this._data.recharge_count * 10).toString() : this._data.extra_reward.toString();
            this.initItem();
        }

        public onOpened() {
            super.onOpened();
            // this.initView();
            this.eff_guang.play();
        }

        private initItem(): void {
            this.imgLeft.visible = this.imgRight.visible = this.lab_gift_title.visible = false;
            if (!this._data || this._data.recharge_type > 1) return;
            let temp:tb.TB_month_card = tb.TB_month_card.getTbMonthCardById(this._data.ID);
            let allItem:ItemVo[] = ary2prop(temp.item_gift);
            for (let key in allItem) {
                allItem[key].show = true;
                allItem[key].startAction = true;
            }
            
            this.imgLeft.visible = this.imgRight.visible = this.lab_gift_title.visible = true;
            this.list.repeatX = allItem.length > 4 ? 4 : allItem.length;
            this.list.width = this.list.repeatX * 100 + (allItem.length - 1) * this.list.spaceX;
            this.list.height = 100;
            this.list.y = this.y + 247;
            this.list.x = Laya.stage.width / 2 - this.list.width / 2;

            this.listVo.initData(this.list);
            this.listVo._dataSource = allItem;
            // this.listVo.itemRender = common.ItemBox2;
            this.listVo.setZorder(this.zOrder);
            this.listVo.setWidth(this.list.width);
            this.listVo.setHeight(this.list.height);
            let tag = this.localToGlobal(new Laya.Point(0, 247))
            this.listVo.setPosition(this.list.x, tag.y + 15);
            this._efflist = common.EffectList.showEffectList(this.listVo);
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
                AudioMgr.playSound("sound/getreward.mp3");
            }
            this.eff_guang.stop();
        }

        public onClosed(): void {
            super.onClosed();
            this.height = 310;
            this.imgLeft.visible = this.imgRight.visible = this.lab_gift_title.visible = false;
            ChongzhiModel.getInstance().arrPop();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list.array = null;
        }
    }
}