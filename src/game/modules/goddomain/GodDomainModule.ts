

module game {
    export class GodDomainModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "GodDomainModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new GodDomainProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister(): void  {
            GodDomainModel.getInstance().initModel();
        }
    }

    export class GodDomainEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_GODDOMAIN_VIEW: string = "SHOW_GODDOMAIN_VIEW";
        /** 打开自动匹配界面 */
        public static SHOW_AUTO_MATCH_VIEW: string = "SHOW_AUTO_MATCH_VIEW";
        /** 打开商城界面 */
        public static SHOW_SHOP_VIEW: string = "SHOW_SHOP_VIEW";
        /** 打开排行界面 */
        public static SHOW_RANK_VIEW: string = "SHOW_RANK_VIEW";
        /** 打开队伍列表界面 */
        public static SHOW_TEAM_LIST: string = "SHOW_TEAM_LIST";
        /** 打开规则界面 */
        public static SHOW_RULE_VIEW: string = "SHOW_RULE_VIEW";
        /** 打开购买界面 */
        public static SHOW_BUY_VIEW : string = "SHOW_BUY_VIEW";
        /** 创建队伍界面 */
        public static CREATE_TEAM_VIEW : string = "CREATE_TEAM_VIEW";
        /** 打开加成规则 */
        public static SHOW_BONUS_RULE : string = "SHOW_BONUS_RULE";
        /** 打开聊天界面 */
        public static SHOW_CHAT_VIEW : string = "SHOW_CHAT_VIEW";
        /** 打开邀请界面 */
        public static SHOW_INVITE_VIEW : string = "SHOW_INVITE_VIEW";
        /** 打开玩家界面 */
        public static SHOW_PLAYER_INFO : string = "SHOW_PLAYER_INFO";

        /** 加入队伍 */
        public static JOIN_TEAM : string = "JOIN_TEAM";
        /** 开始战斗 */
        public static START_BATTLE : string = "START_BATTLE";
        /** 一键邀请 */
        public static ONEKEY_INVITE : string = "ONEKEY_INVITE";
        /** 离开队伍 */
        public static LEAVE_TEAM : string = "LEAVE_TEAM";
        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }


    export enum PoolConst {
        TeamListVo = "TeamListVo",
        InviteInfoVo = "InviteInfoVo",
    }

}