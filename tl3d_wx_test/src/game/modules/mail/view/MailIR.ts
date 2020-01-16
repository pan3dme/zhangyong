

module game {

    /** 邮件 */
    export class MailIR extends ui.mail.MailIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():MailData {
			return this._dataSource;
		}

        refreshView():void {
            let mail = this.dataSource;
            if(mail) {
                this.lbTitle.text = mail.getTitle();
                this.imgBox.visible = mail.isHaveGift();
                this.imgBox.skin = SkinUtil.getTaskBaoxiang(4,mail.isReward());
                this.lbTime.text = mail.getTime();
                this.imgIcon.skin = SkinUtil.getMailStateUrl(mail.isUnread() ? 1 : 2);
                this.imgIcon.gray = mail.isRead() || mail.isReward();
            }else {
                this.lbTitle.text = "";
                this.lbTime.text = "";
            }
        }
    }
}