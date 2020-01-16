
module game {

    export class ChooseGodIR extends ui.god.render.ChooseBoxUI {
        constructor() {
            super();
        }

        public set dataSource($value: any) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource() {
            return this._dataSource;
        }
        /** 初始化界面 */
        private initView() {
            if (!this._dataSource) return;
            let info = this.dataSource;
            if(info){
                this.redpoint.onDispose();
                this.img_gouxuan.visible = false;
                this.god_icon.dataSource = null;
                this.item_icon.dataSource = null;
                this.god_icon.visible = this.item_icon.visible = false;
                this.gray = false;
                 if (info instanceof GodItemVo) {
                    this.god_icon.dataSource = info;
                    this.god_icon.visible = true;
                    this.gray = this.dataSource.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
                } else {
                    this.item_icon.dataSource = info;
                    this.item_icon.visible = true;
                }
            }else {
                this.redpoint.onDispose();
                 this.god_icon.dataSource = null;
                this.item_icon.dataSource = null;
                this.god_icon.visible = this.item_icon.visible = false;
                this.gray = false;
            }
        }
        /** 更新数据 */
        refreshData():void {
            let info = this.dataSource;
            if(info){
                if (info instanceof GodItemVo) {
                    this.gray = this.dataSource.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
                }
            }
        }

    }
}