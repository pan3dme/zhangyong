/*
 * @Author: HuangGuoYong 
 * @Date: 2018-10-10 11:12:54 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2018-11-06 19:33:28
 */


module game {
    export class MailModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "MailModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new MailProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            MailModel.getInstance();
        }
    }

    export class MailEvent extends tl3d.BaseEvent {
        /** 打开邮件界面 */
        public static SHOW_MAIL_PANEL : string = "SHOW_MAIL_PANEL";
        /** 打开邮件阅读界面 */
        public static SHOW_MAIL_READ_PANEL : string = "SHOW_MAIL_READ_PANEL";
        /** 领取奖励 */
        public static MAIL_REWARD : string = "MAIL_REWARD";

        /** 一键领取邮件 */
        public static GET_ALL_MAIL : string = "GET_ALL_MAIL";
        /** 一键删除邮件 */
        public static DEL_All_MAIL : string = "DEL_All_MAIL";
        /** 删除邮件 */
        public static DEL_MAIL : string = "DEL_MAIL";

        /** 更新邮件数据 */
        public static UPDATE_MAIL_DATA : string = "UPDATE_MAIL_DATA";
        /** 更新友情点数据 */
        public static UPDATE_FRIEND_POINT_DATA : string = "UPDATE_FRIEND_POINT_DATA";
        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }

    export interface IMailServerVo {
        mailId : string;     // 邮件id
        type : number;       // 类型
        state : number;      // 状态
        endtime : number;    // 结束时间
        title : string;      // 标题
        content : string;    // 内容   
        item : any[];       // 物品配置
        fromTo : string;     // 来源name
    }

    export interface IFriendPointServerVo{
        pointId : string;      // 友情点id
        endTime : number;      // 结束时间
        giverName : string;    // 赠送者名字
    }

    export enum MailTabType {
        mail = 0,
        friendPoint = 1
    }
}