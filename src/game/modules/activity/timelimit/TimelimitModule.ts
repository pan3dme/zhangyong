module game {
    /*
    * TimelimitactivityModule
    */
    export class TimelimitModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "TimelimitModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new TimelimitProcessor()];
        }

        /**
         * 模块入口
         */
        protected onRegister(): void  {
           /**获得限时活动数据 需要在红点创建之后 */
            game.TimelimitModel.getInstance().getActicity();
        }
    }

    export class TimelimitEvent extends tl3d.BaseEvent {
        public static SHOW_TIMELIMIT_ACTIVITY: string = "SHOW_TIMELIMIT_ACTIVITY";
        public static GET_TAB_EVENT: string = "GET_TAB_EVENT";
        public static SELECTED_TAB_DATA_EVENT: string = "SELECTED_TAB_DATA_EVENT";
        public static RED_EVENT: string = "RED_EVENT";
        public static GROUP_RED_EVENT: string = "GROUP_RED_EVENT";
        public static FUND_EVENT: string = "FUND_EVENT";
        public static FUND_RED_EVENT: string = "FUND_RED_EVENT";
        public data: any;
    }
}