

module game {

    export class MailView extends ui.mail.MailViewUI {

        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:LanMgr.getLan("",12191) };
            this.mailList.mouseHandler = new Handler(this, this.onClickHandler);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed(): void {
            super.onClosed();
            this.mailList.array = null;
            this.btnGetAll.off(Laya.Event.CLICK, this, this.onGetAll);
            this.btnDelAll.off(Laya.Event.CLICK, this, this.onDelAll);
        }

        private initView(): void {
            this.resetView();
            this.btnGetAll.on(Laya.Event.CLICK, this, this.onGetAll);
            this.btnDelAll.on(Laya.Event.CLICK, this, this.onDelAll);
        }

        /** 重置邮件列表 */
        resetView(): void {
            let list1 = MailModel.getInstance().getMailList();
            this.mailList.array = list1;
            this.box_empty.visible = list1.length == 0;
            this.lab_mail_num.text = LanMgr.getLan("", -12190, list1.length );
        }

        /** 刷新界面 */
        refreshView(): void {
            this.mailList.refresh();
            this.box_empty.visible = this.mailList.array.length == 0;
            this.lab_mail_num.text = LanMgr.getLan("", 12190, this.mailList.array.length);
        }

        /** 点击阅读邮件 */
        private onClickHandler(event: Laya.Event, index: number): void {
            if (event.type == Laya.Event.CLICK) {
                dispatchEvt(new MailEvent(MailEvent.SHOW_MAIL_READ_PANEL, [this.mailList.getItem(index), this.mailList.getCell(index)]));
            }
        }

        /** 一键领取邮件 */
        private onGetAll(): void {
            dispatchEvt(new MailEvent(MailEvent.GET_ALL_MAIL));
        }
        /** 一键删除邮件 */
        private onDelAll(): void {
            dispatchEvt(new MailEvent(MailEvent.DEL_All_MAIL));
        }

    }
}