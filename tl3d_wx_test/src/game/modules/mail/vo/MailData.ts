
module game {
    
    export class MailData {

        public svo : IMailServerVo;
        public itemList : ItemVo[] = [];
        public tbMail : tb.TB_mail;
        constructor(vo:IMailServerVo){
            this.svo = vo;
            this.tbMail = tb.TB_mail.getItemById(vo.type);
            for(let arr of vo.item) {
                this.itemList.push(new ItemVo(arr[0],arr[1]));
            }
        }

        /** 过期时间 */
        getTime():string {
            let time = this.svo.endtime - App.serverTimeSecond;
            let day = Math.ceil(time / 86400); 
            return day + LanMgr.getLan("",12088);
        }

        /** 是否未读 */
        isUnread():boolean {
            return this.svo.state == iface.tb_prop.mailStateTypeKey.unread;
        }

        /** 是否已读 */
        isRead():boolean {
            return this.svo.state == iface.tb_prop.mailStateTypeKey.read;
        }

        /** 是否已领取 */
        isReward():boolean {
            return this.svo.state == iface.tb_prop.mailStateTypeKey.get;
        }

        /** 是否有附件 */
        isHaveGift():boolean {
            return this.itemList.length > 0;
        }

        /** 是否可领取 -- 有附件及未领取 */
        isCanReward():boolean {
            return this.isHaveGift() && !this.isReward();
        }

        /** 是否已过期 */
        isExpired():boolean {
            return App.serverTimeSecond >= this.svo.endtime;
        }

        /** 获取内容 */
        getContent():string{
            if(!this.svo.content) {
                return this.tbMail.mail_content;
            }
            let ary = JSON.parse(this.svo.content);
            return FormatStr(this.tbMail.mail_content, MailModel.formatAryToStr(ary));
        }
        /** 获取标题 */
        getTitle():string {
            if(!this.svo.title) {
                return this.tbMail.mail_name;
            }
            let ary = JSON.parse(this.svo.title);
            return FormatStr(this.tbMail.mail_name, MailModel.formatAryToStr(ary));
        }
    }

    export class PointData {
        public svo : IFriendPointServerVo;
        constructor(vo:IFriendPointServerVo){
            this.svo = vo;
        }

        /** 过期时间 */
        getTime():string {
            let time = this.svo.endTime - App.serverTimeSecond;
            let day = Math.ceil(time / 86400); 
            return day + LanMgr.getLan("",10025);
        }
    }
}