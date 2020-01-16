/*
* name;
*/
module game {
    export class ResModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "ResModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new ResProcessor()];
        }
        /**
         * 初始化数据
         */
        protected onRegister(){

        }
    }

    export class ResEvent extends tl3d.BaseEvent {
        //货币变化
        public static RESOURCE_CHANGE: string = "COINS_CHANGE";
        //道具变化
        public static PROP_CHANGE: string = "PROP_CHANGE";
        //限时道具变化
        public static TIME_PROP_CHANGE: string = "PROP_CHANGE";
        /** 装备变化 -- 新增删除 */
        public static EQUIPMENET_CHANGE : string = "EQUIPMENET_CHANGE";
        /** 角色经验变化 */
        public static ROLE_EXP_CHANGE : string = "ROLE_EXP_CHANGE";
        /** 英雄等级变化 */
        public static GOD_EXP_CHANGE : string = "GOD_EXP_CHANGE";
        /** 竞技场次数变化 */
        public static ARENA_NUM_CHANGE : string = "ARENA_NUM_CHANGE";
        /** 公会捐献变化 */
        public static GUILE_DONATE_CHANGE : string = "GUILE_DONATE_CHANGE";
        /** 角色等级变化 */
        public static ROLE_LEVEL_CHANGE : string = "ROLE_LEVEL_CHANGE";
        /** 限制类型数值变化 */
        public static LIMIT_VALUE_CHANGE : string = "LIMIT_VALUE_CHANGE";
        /** 剩余次数变化 */
        public static OVERPLUS_VALUE_CHANGE : string = "OVERPLUS_VALUE_CHANGE";
        /** vip等级变化 */
        public static VIP_LEVEL_CHANGE : string = "VIP_LEVEL_CHANGE";
        /** 实名认证结果 */
        public static ISCERTIFICATION_EVENT : string = "ISCERTIFICATION_EVENT";
        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }
}