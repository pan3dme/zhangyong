

module game {

    export class forestRankIR extends ui.fogforest.RankIRUI {

        constructor() {
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.initView();
		}

		public get dataSource() {
			return this._dataSource;
		}

        private initView(): void {
            let info = this.dataSource;
            if(info) {
                if(info[0] == 1) {
                    this.lbGuanqia.fontSize = this.lbName.fontSize = this.lbRank.fontSize = 20;
                    // this.lbGuanqia.color = this.lbName.color = this.lbRank.color = ColorConst.getFogForestRankColor(1);
                    this.lbGuanqia.text = info[1][1] + LanMgr.getLan("",12412);
                    this.lbName.text = info[1][2];
                    this.lbRank.text = "1";
                } else if (info[0] == 2) {
                    this.lbGuanqia.fontSize = this.lbName.fontSize = this.lbRank.fontSize = 20;
                    // this.lbGuanqia.color = this.lbName.color = this.lbRank.color = ColorConst.getFogForestRankColor(2);
                    this.lbGuanqia.text = info[1][1] + LanMgr.getLan("",12412);
                    this.lbName.text = info[1][2];
                    this.lbRank.text = "2";
                } else if (info[0] == 3) {
                    this.lbGuanqia.fontSize = this.lbName.fontSize = this.lbRank.fontSize = 20;
                    // this.lbGuanqia.color = this.lbName.color = this.lbRank.color = ColorConst.getFogForestRankColor(3);
                    this.lbGuanqia.text = info[1][1] + LanMgr.getLan("",12412);
                    this.lbName.text = info[1][2];
                    this.lbRank.text = "3";
                }
            }else{
                this.lbGuanqia.text = "";
                this.lbName.text = "";
                this.lbRank.text = "";
            }
        }
    }
}