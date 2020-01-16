/*
* name;
*/
module game {
    export class HudModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "HudModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new HudProcessor()];
        }

        protected onRegister(): void {
            HudModel.getInstance().initModel();
            PlayerDetailsView.gmLock=ExtConfig.net_host == "http://192.168.1.108"?false:true;
            PlayerDetailsView.debugLock=ExtConfig.net_host == "http://192.168.1.108"?false:true;
        }
    }

    export class HudEvent extends tl3d.BaseEvent {
        public static SHOW_CHATNOTICE_PANEL: string = 'SHOW_CHATNOTICE_PANEL';
        public static UPDATE_CHATNOTICE_TEXT: string = 'UPDATE_CHATNOTICE_TEXT';
        /**领取系统开启奖励 */
        public static GET_SYSOPEN_REWARD: string = "GET_SYSOPEN_REWARD";
        /** 打开模块 */
        public static SHOW_MODULE_VIEW: string = 'SHOW_MODULE_VIEW';
        /** 打开排行榜 */
        public static SHOW_RANK_MODULE : string = "SHOW_RANK_MODULE";
        /** 打开gm调试面板 */
        public static SHOW_GM_PANEL: string = "SHOW_GM_PANEL";
        /** 打开玩家信息界面 */
        public static SHOW_PLAYER_INFO_VIEW: string = "SHOW_PLAYER_INFO_VIEW";
        public static QIECUO_BACK: string = "QIECUO_BACK";
        /** 打开玩家阵容信息界面 */
        public static SHOW_PLAYER_LINEUP_VIEW: string = "SHOW_PLAYER_LINEUP_VIEW";
        /**刷新金币和经验面板 */
        public static UPDATE_EXP_AND_MONEY: string = "UPDATE_EXP_AND_MONEY";
        /**设置名字 */
        public static SET_NAME: string = "SET_NAME";
        /**设置头像 */
        public static SET_HEAD_ICON: string = "SET_HEAD_ICON";
        /** 设置头像 */
        public static SET_HEAD_FRAME: string = "SET_HEAD_BOX_ICON";
        /** 设置英雄形象 */
        public static SET_SHOW_GOD_MODEL: string = "SET_SHOW_GOD_MODEL";
        /**金币兑换 */
        public static EXCHANGE_GOLD_CHANGE: string = "EXCHANGE_GOLD_CHANGE";
        /**刷新面板按钮事件 */
        public static UPDATE_MAINVIEW_BUTTON: string = "UPDATE_MAINVIEW_BUTTON";
        public static UPDATE_POWER: string = "UPDATE_POWER";
        public static UPDATE_ONLINEREWARD: string = "UPDATE_ONLINEREWARD";
        /** 返回上一个界面 */
        public static RETURN_LASTVIEW : string = "RETURN_LASTVIEW";
        /** 打开入口界面 */
        public static SHOW_ENTRANCE_VIEW : string = "SHOW_ENTRANCE_VIEW";

        /** 更新跨天数据 */
        public static UPDATE_CROSS_DAY_INFO: string = "UPDATE_CROSS_DAY_INFO";
        /** 设置音量 */
        public static SET_VOLUME: string = "SET_VOLUME";
        /** 设置音效 */
        public static SET_SOUND: string = "SET_SOUND";
        /** 2d分辨率适配重置 */
        public static SCREEN_SIZE_CHNAGE: string = "SCREEN_SIZE_CHNAGE";
        /** 更新全屏界面顶部按钮信息 */
        public static UPDATE_SYS_TOP_BTN_INFO : string = "UPDATE_SYS_TOP_BTN";
        public data: any;

        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }
}