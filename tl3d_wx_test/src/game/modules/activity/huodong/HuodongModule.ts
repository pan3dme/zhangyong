/**
* name 
*/
module game {
    export class HuodongModule extends tl3d.Module {
        constructor() {
            super();
        }

        public getModuleName(): string {
            return "HuodongModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new HuodongProcessor()];
        }

		/**
         * 初始化数据
         */
        protected onRegister(): void {
            HuodongModel.getInstance();
        }
    }

    export class HuodongEvent extends tl3d.BaseEvent {
         /**领取事件 */
        public static AWARD_EVENT: string = "AWARD_EVENT";
        /**打开界面 */
        public static SHOW_HUODONG_PANEL: string = "SHOW_QIANDAO_PANEL";
        /**许愿成功 */
        public static MAKE_PROMISE_SUCCESS: string = "MAKE_PROMISE_SUCCESS";
        /**刷新签到界面 */
        public static UPDATE_QIANDAO_PANEL: string = "UPDATE_QIANDAO_PANEL";
        /**刷新月卡界面 */
        public static REFRESH_YUEKA_PANEL: string = "REFRESH_YUEKA_PANEL";
        /**抽奖 */
        public static LUCK_DRWA_OPERATION: string = "LUCK_DRWA_OPERATION";
        /**购买等级基金 */
        public static RECHARGE_LAVEL_FUND: string = "RECHARGE_LAVEL_FUND";
        /**领取等级基金奖励 */
        public static GET_LEVELFUND_REWARD: string = "GET_LEVELFUND_REWARD";
        /**领取寻宝额外奖励 */
        public static GET_LUCKEQUIP_REWARD: string = "GET_LUCKEQUIP_REWARD";
        /**获取转盘记录 */
        public static GET_LUCKY_RECORD: string = "GET_LUCKY_RECORD";
        /**绑定手机红点 */
        public static BIND_PHONE_EVENT: string = "BIND_PHONE_EVENT";
        /** 超级vip */
        public static SUPER_VIP_RP: string = "SUPER_VIP_RP";
        /** 内侧返利 */
        public static TEST_REBATE_RP: string = "TEST_REBATE_RP";
        /** 幸运转盘神灵幸运值改变 */
        public static LUCK_GOD_VALUE_CHANGE: string = "LUCK_GOD_VALUE_CHANGE";
        /** 幸运转盘装备幸运值改变 */
        public static LUCK_EQUIP_VALUE_CHANGE: string = "LUCK_EQUIP_VALUE_CHANGE";
        /** 幸运转盘宝物幸运值改变 */
        public static LUCK_TREASURE_VALUE_CHANGE: string = "LUCK_TREASURE_VALUE_CHANGE";
         /** 幸运转盘装备奖励领取 */
        public static LUCK_EQUIP_REWARD_CHANGE: string = "LUCK_EQUIP_REWARD_CHANGE";
        /** 幸运转盘记录改变 */
        public static LUCK_RECORD_CHANGE: string = "LUCK_RECORD_CHANGE";
        /** 累计登入天数 */
        public static TOTAL_LOGIN_DAY: string = "TOTAL_LOGIN_DAY";
        /** 登入礼包 */
        public static LOGIN_GIFT_RECEIVE: string = "LOGIN_GIFT_RECEIVE";
        
        public data: any;
    }
}