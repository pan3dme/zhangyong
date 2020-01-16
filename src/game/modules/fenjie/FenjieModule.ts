module game{
/*
* FenjieModule
*/
    export class FenjieModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "FenjieModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new FenjieProcessor()];
        }

        /**
         * 模块入口
         */
        protected onRegister(): void {

        }
    }

    export class FenjieEvent extends tl3d.BaseEvent {
        /**打开分解面板 */
        public static SHOW_FENJIE_VIEW: string = "SHOW_FENJIE_VIEW";
        /**点击分解 */
        public static CLICK_BTN_FENJIE: string = "CLICK_BTN_FENJIE";
        public data: any;
    }
}