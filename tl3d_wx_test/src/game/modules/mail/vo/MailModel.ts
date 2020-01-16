
    
module game {

    export class MailModel {
        constructor() {
            
        }
        private static _instance: MailModel;
        public static getInstance(): MailModel {
            if (!this._instance) {
                this._instance = new MailModel();
            }
            return this._instance;
        }
        /** 登录时是否显示邮件红点（未请求列表） */
        public loginMailRp : boolean = false;
        /** 登录时是否显示友情点红点（未请求列表） */
        public loginPointRp : boolean = false;

        /** 是否有未读邮件 */
        public hasNewMail : boolean = false;
        updateNewMail(flag:boolean):void {
            this.hasNewMail = flag;
            dispatchEvt(new MailEvent(MailEvent.UPDATE_MAIL_DATA));
        }

        /** 新友情点邮件数据 */
        public hasNewPointMail : boolean = false;
        updateNewPoint(flag:boolean):void {
            this.hasNewPointMail = flag;
            dispatchEvt(new MailEvent(MailEvent.UPDATE_FRIEND_POINT_DATA));
        }

        // =============================== 邮件 ===============================
        private _list : MailData[] = [];
        /** 是否已请求过列表 */
        private _initedMail : boolean = false;
        /** 设置邮件 */
        public setMailList(mailList:any[]):void {
            this._list = [];
            for(let svo of mailList) {
                this._list.push(new MailData(svo));
            }
            this._list.sort((a,b)=>{
                return b.svo.endtime - a.svo.endtime;
            });
            this.loginMailRp = false;
            this.hasNewMail = false;
            this._initedMail = true;
            dispatchEvt(new MailEvent(MailEvent.UPDATE_MAIL_DATA));
        }
        /** 是否需要请求邮件列表 */
        needRequestMail():boolean {
            return !this._initedMail || this.hasNewMail;
        }

        /** 获取邮件列表 */
        getMailList():MailData[] {
            return this._list;
        }

        /** 更新邮件状态 */
        updateMailState(sdata:any[]):void {
            for(let arr of sdata) {
                let mail = this.getMailByID(arr[0]);
                if(mail) {
                    mail.svo.state = arr[1];
                }
            }
            dispatchEvt(new MailEvent(MailEvent.UPDATE_MAIL_DATA));
        }

        /** 删除邮件 */
        delMail(mid:string):void {
            let mail = this.getMailByID(mid);
            if(mail) {
                let index = this._list.indexOf(mail);
                this._list.splice(index,1);
            }
        }

        /** 删除多封邮件 */
        delMails(mids:string[]):void {
            for(let mid of mids){
                this.delMail(mid);
            }
            dispatchEvt(new MailEvent(MailEvent.UPDATE_MAIL_DATA));
        }

        /** 获取邮件 */
        getMailByID(mid:string):MailData {
            let mail = this._list.find((m)=>{
                return m.svo.mailId == mid;
            });
            return mail;
        }

        /** 获取可删除的邮件数量 1.已读邮件且附件已领取的邮件 2.已读邮件且无附件的邮件*/
        getCanDelMailCnt():number {
            let list = this._list.filter((mail)=>{
                return mail.isReward() || (mail.isRead() && !mail.isHaveGift());
            });
            return list.length;
        }

        /** 获取可领取的邮件数量*/
        getCanGetMailCnt():number {
            let list = this._list.filter((mail)=>{
                return mail.isHaveGift() && !mail.isReward();
            });
            return list.length;
        }

        /** 是否显示邮件红点 */
        isShowMailRedpoint():boolean {
            return this.loginMailRp || this.hasNewMail || this._list.some((mail:MailData)=>{
                return mail.isUnread() || mail.isCanReward();
            });
        }
        
        // =============================== 友情点 ===============================
        private _pointList : PointData[] = [];
        getPointList():PointData[]{
            return this._pointList;
        }
        needRequestPointMail():boolean {
            return !this._initedPoint || this.hasNewPointMail;
        }
        private _initedPoint : boolean = false;
        /** 设置邮件 */
        public sePointList(pointList:any[]):void {
            this._pointList = [];
            for(let svo of pointList) {
                this._pointList.push(new PointData(svo));
            }
            this._pointList.sort((a,b)=>{
                return b.svo.endTime - a.svo.endTime;
            });
            this.loginPointRp = false;
            this.hasNewPointMail = false;
            this._initedPoint = true;
            dispatchEvt(new MailEvent(MailEvent.UPDATE_FRIEND_POINT_DATA));
        }
        /** 删除友情点邮件 */
        delPointMail(mid:string):void {
            let mail = this.getPointMailByID(mid);
            if(mail) {
                let index = this._pointList.indexOf(mail);
                this._pointList.splice(index,1);
            }

        }

        /** 删除多封友情点邮件 */
        delPointMails(mids:string[]):void {
            for(let mid of mids){
                this.delPointMail(mid);
            }
            dispatchEvt(new MailEvent(MailEvent.UPDATE_FRIEND_POINT_DATA));
        }

        /** 获取友情点邮件 */
        getPointMailByID(mid:string):PointData {
            let mail = this._pointList.find((m)=>{
                return m.svo.pointId == mid;
            });
            return mail;
        }

        /** 是否可操作 -- 可领取友情点 */
        canOperateFriendPoint():boolean {
            // 每日可领取的友情点上限之内
            // return this._pointList.length > 0 && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.friendPoint) < tb.TB_game_set.getMaxFriendPonit() ;
            return this.loginPointRp || this.hasNewPointMail || this._pointList.length > 0;
        }

        /** 格式化 */
        static formatAryToStr(ary:any[]):any[] {
            let result = [];
            for(let i = 0 , len = ary.length ; i < len ; i++){
                let type = ary[i][0];
                let value = ary[i][1];
                switch(type){
                    case iface.tb_prop.mailArgsTypeKey.none:
                        result.push(value);
                        break;
                    case iface.tb_prop.mailArgsTypeKey.item:
                        let item = tb.TB_item.get_TB_itemById(value);
                        result.push(item.name);
                        break;
                    case iface.tb_prop.mailArgsTypeKey.honourBet:
                        var tbHonour = tb.TB_honour.getItemById(value);
                        result.push(tbHonour.name);
                        break;
                    case iface.tb_prop.mailArgsTypeKey.honourAward:
                        var tbHonourR = tb.TB_honour_reward.getItemById(value);
                        result.push(tbHonourR.desc);
                        break;
                }
            }
            return result;
        }
    }

}