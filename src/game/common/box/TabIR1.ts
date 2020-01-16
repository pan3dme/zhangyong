/*
* name;
*/
module common {
    export class TabIR1 extends ui.box.TabIR1UI {
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

        public refreshData(item: any) {
            if (item) {
                this.btn_tab.label = item[0];
                if (item[1] != "") {
                    this.redpoint.setRedPointName(item[1]);
                }
                else {
                    this.redpoint.onDispose();
                }
            }
            else {
                this.redpoint.onDispose();
            }
        }
    }
} 