
    module game {
    export class JiangliIR extends ui.activity.limitebuy.render.JiangliIRUI {
        constructor() {
            super();
        }

        public set dataSource($value: tb.TB_summon_rank) {
            this._dataSource = $value;
            this.refreshData();
        }
        public get dataSource(): tb.TB_summon_rank {
            return this._dataSource;
        }

        public refreshData(): void {
            let info = this.dataSource;
            if(info) {
                if(info.rank[0] == info.rank[1]) {
                    this.img_first.visible = true;
                    this.lb_rank.visible = false;                 
                } else {
                    this.img_first.visible = false;
                    this.lb_rank.visible = true;
                    this.lb_rank.text = info.rank[0] + "-" + info.rank[1];
                }
                this.lb_score.text = info.score + '分';
                this.list_items.array = [new ItemVo(info.reward[0][0], info.reward[0][1])];
            } else {
                return;
            }
        }
        
    }
}