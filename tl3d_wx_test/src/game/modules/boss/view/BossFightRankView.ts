

module game {

    export class BossFightRankView extends ui.boss.FightRankUI{
        
        constructor() {
            super();
            this.isModelClose = false;
            // this.mouseEnabled = false;
            this.mouseThrough = true;
            this.isModal = false;
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
            let isFull = GameUtil.isFullScreen();
			this.lbTitle.y = isFull ? (241+HudModel.TOP_ADD_HEIGHT) : 241;
			this.rankList.y = isFull ? (258+HudModel.TOP_ADD_HEIGHT) : 258;
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
			this.rankList.array = null;
        }

        public initView(): void {
			this.rankList.array = this.dataSource;
        }
    }
}