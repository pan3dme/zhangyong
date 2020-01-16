module game {

    export class godChooseIR extends ui.god.render.ChooseBoxUI {
        constructor() {
            super();
            this.on(Laya.Event.CLICK, this, this.onBtnClick);
        }

        private onBtnClick() {
            if (!this._dataSource) return;
            let godVo = this.dataSource;
            if(!godVo.isInLinuep()) {
                this._dataSource.selected = !this._dataSource.selected;
                this.img_gouxuan.visible = this._dataSource.selected;
            }
        }

        public set dataSource($value: GodItemVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():GodItemVo {
            return this._dataSource;
        }

        private refreshData() {
            if (!this._dataSource) return;
            let item = this._dataSource;
            this.img_gouxuan.visible = item.selected;
            if (this.dataSource instanceof GodItemVo) {
                this.god_icon.dataSource = item;
            } else {
                this.item_icon.dataSource = item;
            }
            if(this.dataSource instanceof GodItemVo) {
                 this.gray = this.dataSource.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            } else {
                this.gray = false;
            }
            this.item_icon.visible = this.dataSource instanceof ItemVo;
            this.god_icon.visible = this.dataSource instanceof GodItemVo;
        }

    }
}