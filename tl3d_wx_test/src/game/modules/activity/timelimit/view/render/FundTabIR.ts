/**
* name 
*/
module game {
    export class FundTabIR extends ui.box.TabIR1UI {
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

        private refreshData(item: tb.TB_fund) {
            if (item) {
                // this.btn_tab.stateNum = 1;
                this.redpoint.setRedPointName("FundActivity" + item.ID);
                // this.btn_tab.skin = SkinUtil.getActivityTabSkin(item.ID);
                this.btn_tab.label = item.recharge_num + LanMgr.getLan("",12609);
            } else {
                this.redpoint.onDispose();
            }
        }
    }
}
