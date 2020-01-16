

module game {
    /** 商队护送列表界面 */
    export class EscortView extends ui.escort.EscortUI {

        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.box_Content.addChild(this.img_bg);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public close():void {
            super.close();
            this.itemList.array = null;
        }

        public onClosed(): void {
            super.onClosed();
            this.bgPanel.dataSource = null;

        }

        private initView(): void {
            this.bgPanel.dataSource = { uiName: UIConst.EscortView, closeOnSide: this.isModelClose,title:LanMgr.getLan("",12398) };
            this.itemList.array = EscortModel.getInstance().getGoodsList();
        }
    }
}