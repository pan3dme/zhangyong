
module game {
    export class ZheKouIR extends ui.activity.limitebuy.render.ZheKouIRUI {
        constructor() {
            super();
        }

        public set dataSource($value: Array<number>) {
            this._dataSource = $value;
            this.refreshData();
        }
        public get dataSource(): Array<number> {
            return this._dataSource;
        }

        public refreshData(): void {
            let info = this._dataSource;
            if(info) {
                if(info[0] >= 7) {
                    this.lb_zhe.color = "#e691f6";
                    this.lb_zhe.color = ColorConst.getLimiteBuyZheKouColor(1);
                    this.lb_zhe.stroke = 2;
                    this.lb_zhe.strokeColor = "#830072";
                    this.lb_zhe.strokeColor = ColorConst.getLimiteBuyZheKouColor(2);
                } else {
                    this.lb_zhe.color = ColorConst.getLimiteBuyZheKouColor(3);
                    this.lb_zhe.stroke = 2;
                    this.lb_zhe.strokeColor = ColorConst.getLimiteBuyZheKouColor(4);
                }
                this.lb_zhe.text = info[0] + '折';
                if(info[1] == 0) {
                    this.lb_num.text = "";
                } else {
                    this.lb_num.text = info[1] + '';
                }
            } else {

            }
        }
    }
}