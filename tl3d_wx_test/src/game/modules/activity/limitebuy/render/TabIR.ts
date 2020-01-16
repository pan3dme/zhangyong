
module game {
    export class LbTabIR extends ui.box.TabIR2UI {
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
            let type = this._dataSource;
            if(type) {
                let model = LimiteBuyModel.getInstance();
                if (type == LimiteBuyType.summon) {
                    this.btn_tab.skin = SkinUtil.lim_summon;
                    //红点
                    if(model.Lim_Summon_Rp || model.haveBoxReward() || model.haveFreeTimes()) {
                        this.redpoint.visible = true;
                    } else {
                        this.redpoint.visible = false;
                    }
                } else if (type == LimiteBuyType.group) {
                    this.btn_tab.skin = SkinUtil.lim_group;
                    //红点
                    if(model.Lim_Group_Rp) {
                        this.redpoint.visible = true;
                    } else {
                        this.redpoint.visible = false;
                    }
                }
            } else {
                return;
            }
        }
    }
}