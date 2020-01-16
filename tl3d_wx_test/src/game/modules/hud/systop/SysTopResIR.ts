

module game {

    export class SysTopResIR extends ui.hud.render.SysTopResIRUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshView();
        }

        public get dataSource(): number {
            return this._dataSource;
        }

        public refreshView() {
            let resType: number = this._dataSource;
            if (resType) {
                this.imgRes.skin = SkinUtil.getCostSkin(resType);
                this.lbNum.text = Snums(App.getResNum(resType));
                this.btnAdd.on(Laya.Event.CLICK, this, this.onClick);
                let ary = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
                this.btnAdd.visible = ary.indexOf(resType) != -1;
                this.width = ary.indexOf(resType) != -1 ? 130 : 110;
            } else {
                this.imgRes.skin = null;
                this.lbNum.text = "";
                this.btnAdd.off(Laya.Event.CLICK, this, this.onClick);
            }
        }

        private onClick(): void {
            let resType: number = this._dataSource;
            switch (resType) {
                case iface.tb_prop.resTypeKey.gold:
                    // 交换金币
                    UIMgr.showUI(UIConst.ExchangeGoldView);
                    break;
                case iface.tb_prop.resTypeKey.diamond:
                    // 打开充值界面
                    dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
            }
        }
    }
}