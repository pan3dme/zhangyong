
module game {

    export class OreExplainView extends ui.island.OreExplainUI {

        constructor() {
            super();
        }
        createChildren():void{
            super.createChildren();
            this.lbGain.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("",12210) };
        }
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public onClosed(): void {
            super.onClosed();
            this.itemList.array = null;
        }

        private initView(): void {
            let tbOre : tb.TB_island_level = this.dataSource;
            this.bgPanel.updateTitle(tbOre.name);
            this.lbGain.text = LanMgr.getLan('',10191,tbOre.reward[1]);
            this.lbMinu.text = `/${Math.floor(tbOre.interval/60)}${LanMgr.getLan("",12090)}`;
            this.lbGain.x = this.width/2 - (this.lbGain.width + 145)/2;
            this.imgGain.skin = SkinUtil.getCostSkin(tbOre.reward[0]);
            this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            this.lbMinu.x = this.imgGain.x + this.imgGain.width + 5;
            this.itemList.array = tbOre.getRateList();
        }

    }
}