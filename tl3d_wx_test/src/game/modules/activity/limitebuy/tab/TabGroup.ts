
module game {
    export class TabGroup extends ui.activity.limitebuy.tab.TabGroupUI {
        constructor() {
            super();
            this.list_item.selectHandler = new Handler(this, this.onSelect);
            this.btn_buy.on(Laya.Event.CLICK, this, this.onClick);
        }

        public set dataSource($value: Array<limiteGroupVo>) {
            this._dataSource = $value;
            this.initData();
        }
        public get dataSource(): Array<limiteGroupVo> {
            return this._dataSource;
        }

        private initData(): void {
            let info = this.dataSource;
            if(!info) {
                this.list_item.selectedIndex = -1;
                return;
            }
            let list: Array<ItemVo> = [];
            for(let obj of info) {
                // let item = new ItemVo(obj.tbGroup.item[0], obj.getBuyNum());
                let item = new ItemVo(obj.tbGroup.item[0], obj.tbGroup.item[1]);
                item.show = false;
                list.push(item);
            }
            this.list_item.array = list;
            if (this.list_item.selectedIndex < 0){
                this.list_item.selectedIndex = 0;
            }
            this.onSelect(this.list_item.selectedIndex);
            Laya.timer.loop(60000, this, this.Timer);
        }
        /** 选择计数 */
        private _curIndex : number;
        private onSelect(index: number): void {
            if(index < 0) return;
            this.list_item.selectedIndex = index;
            this._curIndex = index;
            let info=this.dataSource[index];
            if(!info) return;
            this.lb_time.text = info.getRemainTime();                                                 //剩余时间
            this.lb_buy.text = LanMgr.getLan("今日可购买{0}次", -1, info.getRemainNum());      //今日可购买次数
            this.lb_allbuy.text = LanMgr.getLan("全服已购买{0}次", -1, info.getAllBuyNum());   //总的购买次数
            this.lb_cost.text = info.getCurZheKouList()[0] + '';                                      //价格显示
            this.list_zhekou.array = info.getZheKouList();                                            //折扣列表
            //使用遮罩进度条
            let value = info.getAllBuyNum() / info.tbGroup.total_buy_num[info.tbGroup.total_buy_num.length - 1];
            this.pg_zhekou.value = value;
            // this.view_item.dataSource = new ItemVo(info.tbGroup.item[0], info.getBuyNum());
            this.view_item.dataSource = new ItemVo(info.tbGroup.item[0], info.tbGroup.item[1]);
        }
   
        /** 计时器，计算剩余时间 */
        private Timer(): void {
            let info=this.dataSource[this._curIndex];
            this.lb_time.text = info.getRemainTime();
        }

        /** 购买 */
        private onClick() {
            dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.LIMITEGROUP_BUY), this.dataSource[this._curIndex]);
        }
    }
}