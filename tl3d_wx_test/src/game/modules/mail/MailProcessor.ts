/*
 * @Author: HuangGuoYong 
 * @Date: 2018-10-10 11:12:19 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2018-12-05 20:34:51
 */


module game {
    export class MailProcessor extends tl3d.Processor {

        private _model : MailModel;
        constructor() {
            super();
            this._model = MailModel.getInstance();
        }

        public getName(): string {
            return "MailProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new MailEvent(MailEvent.SHOW_MAIL_PANEL),new MailEvent(MailEvent.MAIL_REWARD),
                new MailEvent(MailEvent.SHOW_MAIL_READ_PANEL),new MailEvent(MailEvent.GET_ALL_MAIL),
                new MailEvent(MailEvent.DEL_All_MAIL),new MailEvent(MailEvent.DEL_MAIL)
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof MailEvent) {
                switch ($event.type) {
                    case MailEvent.SHOW_MAIL_PANEL:
                        this.showMailPanel($event.data);
                        break;
                    case MailEvent.MAIL_REWARD:
                        this.mailReward($event.data);
                        break;
                    case MailEvent.SHOW_MAIL_READ_PANEL:
                        this.showMailReadView($event.data);
                        break;
                    case MailEvent.GET_ALL_MAIL:
                        this.getAllMail();
                        break;
                    case MailEvent.DEL_All_MAIL:
                        this.delMails(null);
                        break;
                    case MailEvent.DEL_MAIL:
                        this.delMails($event.data);
                        break;
                }
            }

        }

        /** 打开邮箱 */
        private showMailPanel(index:number=0):void {
            let model = this._model;
            if(model.needRequestMail() ){
                PLC.request(Protocol.game_mail_mailList,{},(data)=>{
                    if(data && data.mailList){
                        model.setMailList(data.mailList);
                    }
                    UIMgr.showUI(UIConst.MailView,index ? index : 0);
                });
            }else{
                UIMgr.showUI(UIConst.MailView,index ? index : 0);
            }
        }

        /** 打开邮件阅读界面 */
        private showMailReadView(arg:any[]):void {
            let mail:MailData = arg[0];
            let item:MailIR = arg[1];
            if(mail.isUnread()){
                let arg = {};
                arg[Protocol.game_mail_mailUpdateState.args.id] = mail.svo.mailId;
                PLC.request(Protocol.game_mail_mailUpdateState,arg,(resData)=>{
                    if(resData && resData.updateMail) {
                        MailModel.getInstance().updateMailState(resData.updateMail);
                    }
                    item.refreshView();
                    UIMgr.showUI(UIConst.MailReadView,mail);
                });
                
            }else{
                UIMgr.showUI(UIConst.MailReadView,mail);
            }
        }
        
        /** 领取邮件附件 */
        private mailReward(mail:MailData):void {
            if(mail.isExpired()) {
                showToast(LanMgr.getLan('',10000));
                return;
            }
            let arg = {};
            arg[Protocol.game_mail_mailGet.args.id] = mail.svo.mailId;
            PLC.request(Protocol.game_mail_mailGet,arg,(resData)=>{
                if(!resData) return;
                if(resData.updateMail) {
                    this._model.updateMailState(resData.updateMail);
                }
                if(resData.commonData) {
                    UIUtil.showRewardView(resData.commonData);
                }
                this.delMails(mail);
            });
        }

        /** 删除邮件 */
        private delMails(info:MailData):void {
            let model = this._model;
            let mailId = null;
            if(info){
                mailId = info.svo.mailId;
            }else{
                if(model.getCanDelMailCnt() <= 0){
                    showToast(LanMgr.getLan('',10001));
                    return;
                }
            }
            let arg = {};
            arg[Protocol.game_mail_mailDelete.args.id] = mailId ? mailId : 0;
            PLC.request(Protocol.game_mail_mailDelete,arg,(resData)=>{
                if(!resData) return;
                if(resData.delMail) {
                    model.delMails(resData.delMail);
                }
                if(UIMgr.hasStage(UIConst.MailView)){
                    let mailUI : MailView = UIMgr.getUIByName(UIConst.MailView);
                    mailUI.resetView();
                }
                UIMgr.hideUIByName(UIConst.MailReadView);
            });
        }
        
        /** 一键领取邮件 */
        private getAllMail():void {
            let model = this._model;
            if(model.getCanGetMailCnt() <= 0){
                showToast(LanMgr.getLan('',10002));
                return;
            }
            let arg = {};
            arg[Protocol.game_mail_mailGet.args.id] = 0;
            PLC.request(Protocol.game_mail_mailGet,arg,(resData)=>{
                if(resData && resData.updateMail) {
                    model.updateMailState(resData.updateMail);
                }
                if(resData && resData.commonData) {
                    UIUtil.showRewardView(resData.commonData);
                }
                if(UIMgr.hasStage(UIConst.MailView)){
                    let mailUI : MailView = UIMgr.getUIByName(UIConst.MailView);
                    mailUI.refreshView();
                }
            });
        }
        
    }
}