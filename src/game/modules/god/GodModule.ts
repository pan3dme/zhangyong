module game{
    export class GodModule extends tl3d.Module {
        constructor(){
            super();
        }

        public getModuleName(): string {
            return "GodModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new GodProcessor(),new TreasureProcessor()];
        }
         /**
         * 初始化数据
         */
        protected onRegister():void
        {
            GodModel.getInstance();
        }
    }

    export class GodEvent extends tl3d.BaseEvent {
        //展示面板
        public static SHOW_SHENGLING_PANEL: string = "SHOW_SHENGLING_PANEL";
        //点击觉醒
        public static CLICK_JUEXING_EVENT: string = "CLICK_JUEXING_EVENT";
        //选择英雄
        public static SELECT_GOD_EVENT: string = "SELECT_GOD_EVENT";
        //某英雄变化
        public static CHANGE_GOD_ITEM: string = "CHANGE_GOD_ITEM";
        // 显示克制界面
        public static SHOW_KEZHI_VIEW : string = "SHOW_KEZHI_VIEW";
        //布阵成功
        public static BUZHEN_COMPLETE: string = "BUZHEN_COMPLETE";
        /** 布阵成功 -- 通过布阵界面 */
        public static BUZHEN_COMPLETE_ALL : string = "BUZHEN_COMPLETE_ALL";
        /** 布阵成功 -- 通过单只英雄的上阵下针 */
        public static BUZHEN_COMPLETE_ONE : string = "BUZHEN_COMPLETE_ONE";
        /** 打开布阵界面 */
        public static SHOW_BUZHEN_PANEL:string = "SHOW_BUZHEN_PANEL";
        /** 打开英雄更换界面 */
        public static SHOW_REPLACE_VIEW : string = "SHOW_REPLACE_VIEW";
        /** 打开英雄养成界面 */
        public static SHOW_GOD_CULTURE_VIEW : string = "SHOW_GOD_CULTURE_VIEW";
        //布阵选择英雄
        public static BUZHEN_SELECT_ROLE : string = "BUZHEN_SELECT_ROLE";
        //使用经验池升级
        public static USE_EXPPOOL:string = "USE_EXPPOOL";
        //穿戴成功
        public static WEAR_SUCCESS:string = "WEAR_SUCCESS";
        //点击升星
        public static CLICK_STAR_UP: string = "CLICK_STAR_UP";
        public static CHOOSE_LINEUP_GOD: string = "CHOOSE_LINEUP_GOD";
        public static SHOW_SHENGJIE_ATTR: string = "SHOW_SHENGJIE_ATTR";
        
        /**神灵属性改变 */
        public static GOD_PORP_CHANGE: string = "GOD_LEVEL_UP_SUC";
        public static RONGHUN_SUCCESS: string = "RONGHUN_SUCCESS";
        public static EQUIP_LEVELUP_SUCCESS: string = "EQUIP_LEVELUP_SUCCESS";

        /** 切换tab界面成功 */
        public static SWITCH_TAB_SUCCESS : string = "SWITCH_TAB_SUCCESS";
        //英雄变化
        public static GOD_CHANGE: string = "GOD_CHANGE";
        /** 添加神灵 */
        public static ADD_GODS : string = "ADD_GODS";

        // 使用经验池升级成功
        public static USE_EXPPOOL_SUCCESS : string = "USE_EXPPOOL_SUCCESS";
        // 英雄升阶成功
        public static GOD_SHENGJIE_SUCCESS : string = "GOD_SHENGJIE_SUCCESS";
        /** 觉醒成功 */
        public static GOD_AWAKEN_SUCCESS : string = "GOD_AWAKEN_SUCCESS";

        /** 选中融魂 */
        public static SELECT_RONGHUN_ITEM : string = "SELECT_RONGHUN_ITEM";

        /** 上阵一只神灵，加号上阵的 */
        public static SHANGZHEN_ONE_GOD : string = "SHANGZHEN_ONE_GOD";

        /** 上阵阵营英雄数量改变 */
        // public static LINE_RACE_GOD_NUM_CHANGE : string = "LINE_RACE_GOD_NUM_CHANGE";

        /** 激活添加皮肤ID */
        public static ADD_SKINID : string = "ADD_SKINID";
        /** 神灵最高星级改变 */
        public static GOD_MAX_STAR_LV_CHANGE : string = "GOD_MAX_STAR_LV_CHANGE";
        public data: any;
    }

}