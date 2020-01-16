module game {
    /*
    * FirstGuideModule
    */
    export class FirstGuideModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "FirstGuideModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new FirstGuideProcessor()];
        }

        /**
         * 模块入口
         */
        protected onRegister(): void  {

        }
    }

    export class FirstGuideEvent extends tl3d.BaseEvent {
        /** 引导开始 */
        public static GUIDE_START: string = 'GUIDE_START';
        public static FIGHT_SKILL_SELECT: string = 'FIGHT_SKILL_SELECT';
        // public static SHOW_SKILL_EVENT: string = 'SHOW_SKILL_EVENT';
        public static CHANGE_BOSSBLOOD: string = 'CHANGE_BOSSBLOOD';
        public static FIRST_GUIDE_STEP_SUCC: string = 'FIRST_GUIDE_STEP_SUCC';
        public static FIRST_GUIDE_SELECT_TAR_SUCC: string = 'FIRST_GUIDE_SELECT_TAR_SUCC';

        public data: any;
    }
}