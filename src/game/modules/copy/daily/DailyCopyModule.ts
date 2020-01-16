

module game {
    export class DailyCopyModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "DailyCopyModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new DailyCopyProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            DailyCopyModel.getInstance().initModel();
        }
    }

    export class DailyEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_DAILY_COPY_VIEW : string = "SHOW_DAILY_COPY_VIEW";
        /** 展示购买界面 */
        public static SHOW_BUY_VIEW : string = "SHOW_BUY_VIEW";

        /** 挑战boss */
        public static CHALLENGE_BOSS : string = "CHALLENGE_DAILY_BOSS";
        /** 再来一次 */
        public static CHALLENGE_BOSS_AGAIN : string = "CHALLENGE_BOSS_AGAIN";
        /** 购买每日副本挑战次数 */
        public static BUY_DAILY_COPY_COUNT : string = "BUY_DAILY_COPY_COUNT";
        /** 每日副本通关id变化 */
        public static DAILY_COPY_ID_CHANGE : string = "DAILY_COPY_ID_CHANGE";
        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }

    
}