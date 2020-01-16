
module game {
    export class FogForestModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "FogForestModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new FogForestProcessor()];
        }

        protected onRegister(): void  {
            FogForestModel.getInstance().initModel();
        }
    }

    export class FogForestEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_MAIN_VIEW: string = "SHOW_MAIN_VIEW";
        /** 打开奖励界面 */
        public static SHOW_REWARD_VIEW : string = "SHOW_REWARD_VIEW";
        
        /** 打开宝箱 */
        public static OPEN_BAOXIANG : string = "OPEN_BAOXIANG";
        /** 一键扫荡 */
        public static ONE_KEY_PASS : string = "ONE_KEY_PASS";
        /** 刷新界面 */
        public static UPDATE_VIEW : string = "UPDATE_VIEW";
        /** 关卡挑战 */
        public static GUANQIA_CHALLENGE : string = "GUANQIA_CHALLENGE";

        /** 领取成功 */
        public static RECEIVE_SUCCESS : string = "RECEIVE_SUCCESS";
        /** 挑战成功 */
        public static CHALLENGE_SUCCESS : string = "CHALLENGE_SUCCESS";
        /** 扫荡成功 */
        public static ALL_PASS_SUCCESS : string = "ALL_PASS_SUCCESS";
        /** 更新当前关卡信息 */
        public static UPDATE_CUR_GUANQIA : string = "UPDATE_CUR_GUANQIA";
        /** 初始化迷雾森林 */
        public static Init_FOREST : string = "Init_FOREST";

        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }

    }

    export class IRankVo {
        rank : number;
        name : string;
        guanqiaId : number;
    }

}