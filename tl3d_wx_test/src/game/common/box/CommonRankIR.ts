


module common {
    export class CommonRankIR extends ui.component.CommonRankItemUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        public refreshData() {
            let info = this.dataSource;
            if (info) {
                this.imgRank.visible = info.rank <= 3;
                if (this.imgRank.visible) {
                    this.imgRank.skin = SkinUtil.getRankingSkin(info.rank - 1);
                }
                this.lbRank.text = info.rank + '';
                this.lbRank.visible = info.rank > 3;
            }
        }
    }
}