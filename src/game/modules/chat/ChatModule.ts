

module game {

    export class ChatModule extends tl3d.Module {

        constructor() {
            super();
        }
        public getModuleName(): string {
            return "ChatModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new ChatProcessor(),new PrivateChatProcessor()];
        }

        /**
		 * 模块初始化
		 */
		protected onRegister():void{
		}
    }

    export class ChatEvent extends tl3d.BaseEvent {
        /** 打开聊天主界面 */
        public static SHOW_CHAT_PANEL : string = "SHOW_CHAT_PANEL";
        /** 发送消息 */
        public static SEND_CHAT_TEXT : string = "SEND_CHAT_TEXT";
        /** 发送语音消息 */
        public static SEND_CHAT_VOICE : string = "SEND_CHAT_VOICE";
        
        /** 添加全部频道的聊天消息 */
        public static ADD_ALL_CHAT : string = "ADD_ALL_CHAT";
        /** 添加世界频道的聊天消息 */
        public static ADD_WORLD_CHAT : string = "ADD_WORLD_CHAT";
        /** 添加工会频道的聊天消息 */
        public static ADD_GUILD_CHAT : string = "ADD_GUILD_CHAT";
        /** 添加组队频道的聊天消息 */
        public static ADD_GROUP_CHAT : string = "ADD_GROUP_CHAT";
        /** 添加同省频道的聊天信息 */
        public static ADD_PROVINCE_CHAT : string = "ADD_PROVINCE_CHAT";
        /** 添加跨服频道的聊天信息 */
        public static ADD_CROSS_CHAT : string = "ADD_CROSS_CHAT";
        /** 添加系统频道的聊天信息 */
        public static ADD_SYSTEM_CHAT : string = "ADD_SYSTEM_CHAT";
        /** 更新新消息数量 */
        public static UPDATE_NEW_CHAT_COUNT : string = "UPDATE_NEW_CHAT_COUNT";

        /** 更新世界聊天 */
        public static UPDATE_WORLD_CHAT : string = "UPDATE_WORLD_CHAT";
        /** 更新工会聊天 */
        public static UPDATE_CLUB_CHAT : string = "UPDATE_CLUB_CHAT";

        /** 打开私聊聊天主界面 */
        public static SHOW_PRIVATE_CHAT_VIEW : string = "SHOW_PRIVATE_CHAT_VIEW";
        /** 发送私聊消息 */
        public static SEND_PRIVATE_CHAT : string = "SEND_PRIVATE_CHAT";
        /** 删除私聊信息 */
        public static DEL_PRIVATE_CHAT : string = "DEL_PRIVATE_CHAT";
        /** 添加私聊频道的聊天消息 */
        public static ADD_PRIVATE_CHAT : string = "ADD_PRIVATE_CHAT";
        /** 新发起的私聊 */
        public static NEW_PERSON_PRIVATE_CHAT : string = "NEW_PERSON_PRIVATE_CHAT"
        /** 开始定时请求私聊数据 */
        public static START_REQUEST_PRIVATE_CHAT : string = "START_REQUEST_PRIVATE_CHAT";
        /** 停止请求私聊数据 */
        public static STOP_REQUEST_PRIVATE_CHAT : string = "STOP_REQUEST_PRIVATE_CHAT";
        /** 更新私聊 */
        public static UPDATE_PRIVATE_CHAT : string = "UPDATE_PRIVATE_CHAT";

        /** 快捷语打开或隐藏 */
        public static SHORTCUTS_OPEN_OR_HIDE : string = "SHORTCUTS_OPEN_OR_HIDE";
        /** 聊天发送成功 */
        public static CHAT_SEND_SUCCESS : string = "CHAT_SEND_SUCCESS";
        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }

    export interface IServerChatVo {
        senderName : string;    // 发送者名字
        senderId : string;      // 发送者id
        receiveId : string;     // 接收者id
        receiveName : string;   // 接受者名字
        senderLevel : number ;  // 发送者等级
        senderHead : any ;   // 发送者头像
        senderHeadFrame : number ;   // 发送者头像框
        time : number;          // 聊天时间
        content : any;          // 聊天内容
        type : number;          // 聊天类型     // iface.tb_prop.chatTypeKey 文本、语音、公告
        city : string;
    }

    export interface IExpressionVo {
        id : string;    //代号
        index : number; //序号
        url : string;   //表情地址
    }

    export interface IHtmlHrefVo {
        type : number;      // NoticeParamType枚举
        id ?: number;        // god类型表示英雄id  item类型表示道具id
        num ?: number;       // god类型表示英雄星级  item类型表示道具数量

        guildId ?: string;      // 公会ID
        guildName ?: string;    // 工会名称
        teamGroupId ?: string;  // 组队ID
    }

    /** 打开方式 */
    export enum OpenType {
        common = 0,     // 通用
        godDm = 1,      // 激战神域
    }
}