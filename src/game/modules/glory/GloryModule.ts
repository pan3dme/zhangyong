

module game {
    export class GloryModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "GloryModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new GloryProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister(): void  {
            GloryModel.getInstance().initModel();
        }
    }

    export class GloryEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_MAIN_VIEW: string = "SHOW_MAIN_VIEW";
        /** 上届回顾 */
        public static SHOW_LAST_REVIEW: string = "SHOW_LAST_REVIEW";
        /** 奖励界面 */
        public static SHOW_AWARD_VIEW: string = "SHOW_AWARD_VIEW";
        /** 规则界面 */
        public static SHOW_RULE_VIEW: string = "SHOW_RULE_VIEW";
        /** 记录界面 */
        public static SHOW_RECORD_VIEW: string = "SHOW_RECORD_VIEW";
        public static SHOW_RECORD_BACK_VIEW: string = "SHOW_RECORD_BACK_VIEW";
        /** 商店 */
        public static SHOW_SHOP_VIEW: string = "SHOW_SHOP_VIEW";

        /** 显示回放 */
        public static SHOW_PLAYBACK: string = "SHOW_PLAYBACK";
        /** 押注 */
        public static BET_PLAYER: string = "BET_PLAYER";
        /** 押注成功 */
        public static BET_SUCCESS : string = "BET_SUCCESS";
        /** 报名成功 */
        public static JOIN_SUCCESS : string = "JOIN_SUCCESS";

        public static SHOW_REDPOINT : string = "SHOW_REDPOINT";
        public data: any;

        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }

    export interface IMatchTimeVo {
        week: number;
        startHour: number;
        endHour: number;
        title: string;
    }

    export enum GroupType {
        benfu = 1,  // 本服
        kuafu = 2,  // 跨服
    }

    export enum GloryId {
        benfu_haixuan = 1,   // 本服海选
        benfu_16t8 = 2,      // 本服16进8 跨服显示第一个阶段比赛（海选赛不显示）
        benfu_8t4 = 3,
        benfu_4t2 = 4,
        benfu_juesai = 5,    // 本服决赛
        kuafu_haixuan = 6,   // 跨服海选赛
        kuafu_16t8 = 7,      // 跨服16进8 跨服显示第一个阶段比赛（海选赛不显示）
        kuafu_8t4 = 8,
        kuafu_4t2 = 9,
        kuafu_juesai = 10,   // 跨服决赛
    }
}