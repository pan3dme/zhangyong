
    
module game {
    export class ShopModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName() : string {
            return "ShopModule";
        }

        protected listProcessors() : Array<tl3d.Processor> {
            return [new ShopProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister() : void {
            ShopModel.getInstance().initModel();
        }
    }

    export class ShopEvent extends tl3d.BaseEvent {
        /** 打开商店界面 */
        public static SHOW_SHOP_VIEW: string = "SHOW_SHOP_VIEW";
        /** 刷新集市界面 */
        public static REFRESH_JISHI_VIEW: string = "REFRESH_JISHI_VIEW";
        /** 刷新集市红点 */
        public static REFRESH_JISHI_RP: string = "REFRESH_JISHI_RP";
        /** 更新商店跨天数据 */
        public static REFRESH_SHOP_CROSSDAY: string = "REFRESH_SHOP_CROSSDAY";
        /**购买并刷新荣誉商店界面 */
        public static CHANGE_RONGYUSHANGDIAN_PANEL: string = "CHANGE_RONGYUSHANGDIAN_PANEL";
        /**购买界面 */
        public static SHOW_GOUMAI_PANEL: string = "SHOW_GOUMAI_PANEL";
        /**集市免费次数刷新时间 */
        public static MARKET_REFRESH_REPLY_TIME_CHNAGE: string = "MARKET_REFRESH_REPLY_TIME_CHNAGE";
        /**荣誉商店界面 */
        public static SHOW_RONGYUSHANGDIAN_PANEL: string = "SHOW_RONGYUSHANGDIAN_PANEL";
        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }
}