module game {

    export class BossRewardIR extends ui.boss.BossRewardIRUI {

        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource(): any {
            return this._dataSource;
        }

        initView(): void {
            let data = this.dataSource;
            if (data) {
                this.ui_item.dataSource = data.itemData;
                this.lab_info.text = data.type == 1 ? LanMgr.getLan("",12506) : LanMgr.getLan("",12507);
                this.img_infobg.skin = data.type == 1 ? SkinUtil.redBg : SkinUtil.greenBg;
            } else {
                this.ui_item.dataSource = null;
                this.lab_info.text = "";
                this.img_infobg.skin = null;
            }
        }
    }
}