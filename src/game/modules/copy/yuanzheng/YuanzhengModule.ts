

module game {
    export class YuanzhengModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "YuanzhengModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new YuanzhengProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister(): void  {
            YuanzhengModel.getInstance().initModel();
        }
    }

    export class YuanzhengEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_MAIN_VIEW: string = "SHOW_MAIN_VIEW";
        /** 展示回复血量或者复活界面 */
        public static SHOW_RECOVERY_VIEW: string = "SHOW_RECOVERY_VIEW";
        /** 展示关卡挑战信息界面 */
        public static SHOW_CHALLENGE_VIEW: string = "SHOW_CHALLENGE_VIEW";
        /** 展示远征商店 */
        public static SHOW_SHOP_VIEW : string = "SHOW_YAUNZHENG_SHOP_VIEW";
        /** 前往设置阵容-展示布阵界面 */
        public static GOTO_SET_LINUEP : string = "GOTO_SET_LINUEP";
        /** 展示援助界面 */
        public static SHOW_HELP_VIEW : string = "SHOW_HELP_VIEW"; 

        /** 关卡挑战 */
        public static GUANQIA_CHALLENGE : string = "GUANQIA_CHALLENGE";
        /** 领取关卡奖励 */
        public static GUANQIA_REWARD : string = "GUANQIA_REWARD";

        /** 回复血量或复活英雄 */
        public static RECOVERY_GOD : string = "YAUNZHENG_RECOVERY_GOD";
        /** 更新界面 */
        public static UPDATE_VIEW : string = "UPDATE_VIEW";
        /** 派遣成功 */
        public static YZ_DISPATCH_SUCC : string = "YZ_DISPATCH_SUCC";
        public data: any;

        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }
    
}