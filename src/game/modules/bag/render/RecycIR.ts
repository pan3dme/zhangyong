module game {
    export class RecycIR extends ui.bag.RecycBoxUI {
        constructor() {
            super();
            this.on(Laya.Event.CLICK, this, this.onClick);
        }

        private onClick() {
            if (this._dataSource) {
                this._dataSource.selected = !this._dataSource.selected;
                this.boxGouxuan.visible = this._dataSource.selected;
                if (this._dataSource.quality >= QualityConst.WHITE && this._dataSource.quality <= QualityConst.PURPLE) {
                    dispatchEvt(new BagEvent(BagEvent.SELECT_RECYCLE_ITEM));
                }
            }
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: EquipItemVo) {
            if (item) {
                this.ui_base.dataSource = item;
                this.boxGouxuan.visible = item.selected;
                this.ui_base.anim_select.visible = false;
            } else {
                this.ui_base.dataSource = null;
            }
        }
    }
}