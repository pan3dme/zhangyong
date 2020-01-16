

module game {

    /** 挑战信息界面 */
    export class ChallengeDetailView extends ui.task.bianqiang.ChallengeDetailUI {

        constructor(){
            super();
            this.isModelClose = true;
        }

        public onClosed():void {
            super.onClosed();
            this.bgPanel.dataSource = null;
            this.taskList.array = null;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        private initView():void {
            let info = this.dataSource as ChallengeTabData;
            this.taskList.array = info.getList();
            this.bgPanel.dataSource = { uiName: UIConst.ChallengeDetailView, closeOnSide: this.isModelClose,title:info.tbTitle.desc };
        }

    }
}