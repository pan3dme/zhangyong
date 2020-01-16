module game {
    export class JiangLiView extends ui.activity.limitebuy.JiangLiUI {
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
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "排名奖励"};
            this.list_jiangli.array = this.dataSource;
        }

    }
}