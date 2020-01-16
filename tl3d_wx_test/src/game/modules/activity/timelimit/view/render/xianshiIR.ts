module game {
    export class xianshiIR extends ui.activity.timelimitactivity.xianshiViewUI {
        constructor() {
            super();
            this.init();
        }

        private _xianshiItem: ItemVo;
        private init() {
            //限时获得消耗物品
            let activityArr: tb.TB_operate_activity[] = tb.TB_operate_activity.get_TB_operate_activity("time_index", TimelimitModel.getInstance().xianshiTimeIdx + "");
            if (activityArr && activityArr.length > 0) {
                this._xianshiItem = new ItemVo(activityArr[0].defined[0][0], 0);
                this.lab_xianshi.text = LanMgr.getLan("活动期间，领取挂机\n奖励有概率额外获得{0}。", -1, this._xianshiItem.getName());
                this.item_xianshi.dataSource = this._xianshiItem;
                // this.img_xianshi.skin = SkinUtil.getExchangeConsume(this._xianshiItem.id);
            }
        }

        public onAdd(timestr:string) {
            // if (this._xianshiItem) {
            //     this.lab_has.text = App.hero.getBagItemNum(this._xianshiItem.id) + "";
            // } else {
            //     this.lab_has.text = "";
            // }
            this.setTime(timestr);
        }

        public onExit(){
            this.close();
        }

        public setTime(timestr:string){
            this.lab_time1.text = timestr;
        }

    }
}