module game{
/*
* CopyTeamModule
*/
export class CopyTeamModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "CopyTeamModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new CopyTeamProcessor()];
    }

    protected onRegister():void
    {

    }
}

    export class CopyTeamEvent extends tl3d.BaseEvent {
        public static SHOW_MAIN_PANEL: string = "SHOW_MAIN_PANEL";
        public static SHOW_TEAMBUILD: string = "SHOW_TEAMBUILD";
        /** 打开排行界面 */
        public static SHOW_RANK_VIEW: string = "SHOW_RANK_VIEW";
        /** 打开奖励界面 */
        public static SHOW_REWARD_VIEW: string = "SHOW_REWARD_VIEW";
        /** 领取奖励成功 */
        public static REWARD_SUCC : string = "REWARD_SUCC";
        /** 打开规则界面 */
        public static SHOW_RULE_VIEW: string = "SHOW_RULE_VIEW";
        /** 创建队伍界面 */
        public static CREATE_TEAM_VIEW : string = "CREATE_TEAM_VIEW";
        /** 打开邀请界面 */
        public static SHOW_INVITE_VIEW : string = "SHOW_INVITE_VIEW";
        /** 加入队伍 */
        public static JOIN_TEAM : string = "JOIN_TEAM";
        /** 申请加入队伍 */
        public static APPLY_JOIN_TEAM : string = "APPLY_JOIN_TEAM";
        /** 离开队伍 */
        public static LEAVE_TEAM : string = "LEAVE_TEAM";
        /** 设置队伍位置 */
        public static SET_POS_TEAM : string = "SET_POS_TEAM";
        /** 申请列表界面 */
        public static APPLY_TEAM_PANEL : string = "APPLY_TEAM_PANEL";
        /** 同意申请 */
        public static AGREED_APPLY : string = "AGREED_APPLY";
        /** 剔除队伍 */
        public static KICK_OUT_MEMBER : string = "KICK_OUT_MEMBER";
        /** 发起战斗 */
        public static TEAM_COPY_BATTLE : string = "TEAM_COPY_BATTLE";
        /** 监听-加入队伍 */
        public static DISEVT_JOIN_TEAM : string = "DISEVT_JOIN_TEAM";
        /** 监听-退出队伍 */
        public static DISEVT_EXIT_TEAM : string = "DISEVT_EXIT_TEAM";
        /** 监听-从一个队伍加入到另一个队伍 */
        public static DISEVT_JOIN_OTHER_TEAM : string = "DISEVT_JOIN_OTHER_TEAM";
        /** 播放战报 */
        public static PLAY_REPORT : string = "PLAY_REPORT";
        /** 发送邀请 */
        public static SEND_INVITE : string = "SEND_INVITE";
        /** 关闭转移队长界面 */
        public static HIDE_TRANSFER_PANEL : string = "HIDE_TRANSFER_PANEL";
        /** 开启转移队长界面 */
        public static SHOW_TRANSFER_PANEL : string = "SHOW_TRANSFER_PANEL";
        /** 同步成员信息 */
        public static UPDATE_MEMBERLIST : string = "UPDATE_MEMBERLIST";
        /** 更新队伍通关数据 */
        public static UPDATE_GROUP_INFO : string = "UPDATE_GROUP_INFO";
        /** 申请列表红点 */
        public static UPDATE_APPLY_RP : string = "UPDATE_APPLY_RP";
        /** 队伍最高关卡更新 */
        public static UPDATE_TEAM_FLOOR : string = "UPDATE_TEAM_FLOOR";
        public data: any;
    }
}