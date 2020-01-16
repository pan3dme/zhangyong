


module game {
    export class EscortModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "CaravanEscortModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new EscortProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister(): void {
            EscortModel.getInstance().initModel();
        }
    }

    export class EscortEvent extends tl3d.BaseEvent {

        /** 打开护送主场景 */
        public static SHOW_MAIN_VIEW: string = "SHOW_MAIN_VIEW";
        /** 打开商队信息界面 */
        public static SHOW_CARAVAN_INFO_VIEW: string = "SHOW_CARAVAN_INFO_VIEW";
        /** 打开护送物品界面 */
        public static SHOW_ESCORT_GOODS_VIEW: string = "SHOW_ESCORT_GOODS_VIEW";
        /** 打开规则界面 */
        public static SHOW_RULE_VIEW : string = "SHOW_RULE_VIEW";
        /** 打开记录界面 */
        public static SHOW_RECORD_VIEW : string = "SHOW_RECORD_VIEW";

        /** 掠夺货物 */
        public static ROBBED_GOODS : string = "ROBBED_GOODS";
        /** 快速完成 */
        public static QUICK_FINISH : string = "QUICK_FINISH";
        /** 刷新货物 */
        public static REFRESH_GOODS : string = "REFRESH_GOODS";
        /** 一键刷橙 */
        public static ONEKEY_REFRESH_GOODS : string = "ONEKEY_REFRESH_GOODS";
        /** 护送货物 */
        public static ESCORT_GOODS : string = "ESCORT_GOODS";
        /** 领取奖励 */
        public static RECEIVE_AWARD : string = "RECEIVE_AWARD";

        /** 刷新成功 */
        public static REFRESH_GOODS_SUCCESS : string = "REFRESH_GOODS_SUCCESS";
        /** 护送成功 */
        public static ESCORT_GOODS_SUCCESS : string = "ESCORT_GOODS_SUCCESS";
        /** 更新自己信息 */
        public static UPDATE_SELF_INFO : string = "UPDATE_SELF_INFO";
        /** 更新记录红点 */
        public static UPDATE_RECORD_RP : string = "UPDATE_RECORD_RP";
        /** 更新奖励红点 */
        public static UPDATE_REWARD_RP : string = "UPDATE_REWARD_RP";
        /** 动画结束 */
        public static ANIMATION_END : string = "ANIMATION_END";
        
        public data: any;

        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }

    /** 商队服务端信息 */
    export interface ICaravanInfoSVo {
        name : string;
        tradeId : number;
        playerId : string;
        endTime : number;      // 护送剩余时间
        force : number;        // 神力
        head:any;
        headFrame:any;
        level:number;

        // 打开请求的数据
        guildName : string;
        lineupInfo : any[];
        robCount : number;    // 被拦截次数
        multiple : number;      // 奖励倍数
    }

}