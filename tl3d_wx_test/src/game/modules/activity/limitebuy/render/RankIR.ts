
module game {
    export class LbRankIR extends ui.activity.limitebuy.render.RankIRUI {
        constructor() {
            super();
        }

        public set dataSource($value: any) {
            this._dataSource = $value;
            this.refreshData();
        }
        public get dataSource() {
            return this._dataSource;
        }

        public refreshData(): void {
            let info = this.dataSource;
            this.lb_rank.text = info[0];
            if(info[2]) {
                this.lb_name.text = info[2][2];
                this.lb_score.text = info[2][1];
            } else {
                this.lb_name.text = "虚位以待";
                this.lb_score.text = info[1] == 0 ? '' : '大于' + info[1];
            }
        }
        
    }
}