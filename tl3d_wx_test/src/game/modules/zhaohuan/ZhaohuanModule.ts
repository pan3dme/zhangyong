/*
* name;
*/
module game {
    export class ZhaohuanModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "ZhaohuanModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new ZhaohuanProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            ZhaohuanModel.getInstance();
        }
    }

    export class SummonEvent extends tl3d.BaseEvent {
        //召唤结果面板
        public static HIDE_ZHAOHUAN_RESULT: string = "HIDE_ZHAOHUAN_RESULT";
        //召唤面板
        public static SHOW_ZHAOHUAN_PANEL: string = "SHOW_ZHAOHUAN_PANEL";
        public static HIDE_ZHAOHUAN_PANEL: string = "HIDE_ZHAOHUAN_PANEL";
        public static SHOW_SUM_RESULT_PANEL: string = "SHOW_SUM_RESULT_PANEL";
        public static SEND_ZHAOHUAN: string = "SEND_ZHAOHUAN";

        /** 召唤成功 */
        public static ZHAOHUAN_SUCCESS : string = 'ZHAOHUAN_SUCCESS';
        public static SHOW_BTN_VISIBLE_TRUE : string = "SHOW_BTN_VISIBLE_TRUE";
        public data: any;

    }
}