module game {
    export class PowerRank extends ui.activity.powerrank.powerRankUI {
        constructor() {
            super();
            this.isModelClose = true;
        }

        public show(closeOther?: boolean,showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public close(type?: string, showEffect?: boolean, sound?: boolean): void {
            super.close(type, showEffect, sound);
        }

        public onClosed(): void {
            super.onClosed();
        }

        public initView(): void {
            let data:RankListVo = this.dataSource;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: data.getTitle()+ LanMgr.getLan("",12631)};
            this.list_rank.array = data.forceRankList;

            this.lab_title.text = data.getTitle();
            this.lb_myrank.text = data.getMyValueDesc() + "   " + data.getMyRankDesc();
        }

    }
}