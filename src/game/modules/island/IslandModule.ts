
module game {
    export class IslandModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "IslandModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new IslandProcessor()];
        }

        protected onRegister(): void  {
            IslandModel.getInstance().initModel();
        }
    }

    export class IslandsEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_MAIN_VIEW: string = "SHOW_MAIN_VIEW";
        /** 进入岛屿 */
        public static SHOW_ORE_MAP : string = "SHOW_ORE_MAP";
        /** 打开规则界面 */
        public static SHOW_RULE_VIEW : string = "SHOW_RULE_VIEW";
        /** 打开记录界面 */
        public static SHOW_RESCORD_VIEW : string = "SHOW_RESCORD_VIEW";
        /** 打开购买界面 */
        public static SHOW_BUY_VIEW : string = "SHOW_BUY_VIEW";
        /** 打开矿产信息界面 */
        public static OPEN_ORE_INFO : string = "OPEN_ORE_INFO";
        /** 打开矿产说明 */
        public static OPEN_ORE_EXPLAIN : string = "OPEN_ORE_EXPLAIN";

        /** 占领矿产 */
        public static OCCUPY_ORE : string = "OCCUPY_ORE";
        /** 掠夺矿产 */
        public static ROB_ORE : string = "ROB_ORE";

        /** 更新岛屿的矿点列表 */
        public static UPDATE_ORE_LIST : string = "UPDATE_ORE_LIST";
        /** 更新记录信息 */
        public static UPDATE_RECORD_INFO : string = "UPDATE_RECORD_INFO";
        
        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }

    }

    /** 我的矿产信息 */
    export interface IMyOreInfo {
        islandId : number;
        mineId : number;
        mineType : number;
    }
}