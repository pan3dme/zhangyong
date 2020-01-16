

module game {
    /** 邮件阅读 */
    export class MailReadView extends ui.mail.MailReadUI {

        constructor() {
            super();
            this.isModelClose = true;
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
            this.btnOperate.off(Laya.Event.CLICK, this, this.onConfirm);
        }

        /** 初始化界面 */
        private initView(): void {
            let info : MailData = this.dataSource;
            this.lab_title.text = info.getTitle();
            this.lbContent.text = "      "+info.getContent();
            this.lbTime.text = info.getTime();
            if(info.isHaveGift()){
                this.boxItem.visible = true;
                this.list.array = info.itemList;
                this.btnOperate.label = info.isReward() ? LanMgr.getLan("", 10196) : LanMgr.getLan("", 10041);
            }else{
                this.boxItem.visible = false;
                this.list.array = null;
                this.btnOperate.label = LanMgr.getLan("", 10196);
            }
            this.btnOperate.on(Laya.Event.CLICK, this, this.onConfirm);
        }

        private onConfirm(): void {
            let info : MailData = this.dataSource;
            if(!info) return;
            if(info.isCanReward()){
                dispatchEvt(new MailEvent(MailEvent.MAIL_REWARD, this.dataSource));
            }else{
                dispatchEvt(new MailEvent(MailEvent.DEL_MAIL, this.dataSource));
            }
        }
    }
}