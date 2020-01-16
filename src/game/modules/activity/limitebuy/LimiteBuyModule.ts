
module game {
    export class LimiteBuyModule extends tl3d.Module {
        constructor() {
            super();
        }

        public getModuleName(): string {
            return "LimiteBuyModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new LimiteBuyProcessor()];
        }

        protected onRegister(): void {
            LimiteBuyModel.getInstance().initModel();
        }
    }

    export class LimiteBuyEvent extends tl3d.BaseEvent {
        /** 初始化限时团购 */
        public static UPDATE_RP: string = "UPDATE_RP";
        /** 打开限时购买主界面 */
        public static SHOW_LIMITEBUY_VIEW: string = "SHOW_SUMMON_VIEW";
        /** 限时团购购买请求 */
        public static LIMITEGROUP_BUY: string = "LIMITEGROUP_BUY";
        /** 更新限时团购数据 */
        public static UPDATE_LIMITEGROUPDATA: string = "UPDATE_LIMITEGROUPDATA";
        /** 限时召唤召唤请求 */
        public static LIMITESUMMON_BUY: string = "LIMITESUMMON_BUY";
        /** 限时召唤领取宝箱请求 */
        public static LIMITESUMMON_REWARD: string = "LIMITESUMMON_REWARD"
        /** 限时召唤排名奖励界面 */
        public static SHOW_RANK_VIEW:string = "SHOW_RANK_VIEW";
        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }

    export enum TabType {
        summon = 0,
        group = 1,
    }
}