/**
* name 
*/
module game {
    export class TabIR extends ui.box.TabIR1UI {
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

        private refreshData(item: DayVo) {
            if (item) {
                this.btn_tab.label = LanMgr.getLan("",12624,num2ChiNum(item.tab.ID));
                this.img_lock.visible = !item.isopen();
                this.redpoint.setRedPointName("openRewardActivity" + item.id);
            }else{
                this.redpoint.onDispose();
            }
        }
    }
}
