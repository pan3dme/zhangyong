module game {
    export class PowerAwardIR extends ui.activity.powerrank.itemIRUI {
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

        private refreshData(item: PrRankVo) {
            if (item) {
                this.lab_condition.text = item.getConditionTitle() + item.getConditionDesc();
                let list = [];
                if(item.reward.special_reward && item.reward.special_reward.length > 0) {
                    list = list.concat(...ary2prop(item.reward.special_reward));
                }
                list = list.concat(...ary2prop(item.reward.reward));
                this.list_reward.array = list;
                //排名
                if (item.index < 3){
                    this.lbRank.visible = false;
                    this.imgRank.visible = true;
                    this.imgRank.skin = SkinUtil.getRankingSkin(item.index);
                }else{
                    this.lbRank.visible = true;
                    this.imgRank.visible = false;
                    this.lbRank.text = item.rank;
                }
            }
        }

    }
}
