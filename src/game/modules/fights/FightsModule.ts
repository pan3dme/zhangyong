module game {
    /*
    * FightsModule
    */
    export class FightsModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "FightsModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new FightsProcessor()];
        }

        /**
         * 模块入口
         */
        protected onRegister(): void  {

        }
    }

    export class FightsEvent extends tl3d.BaseEvent {
        public static FIGHT_END: string = "FIGHT_END";
        public static CHANGE_BOSSBLOOD: string = "CHANGE_BOSSBLOOD";
        public static CHANGE_BOSSANGER: string = "CHANGE_BOSSANGER";
        public static CHANGE_ACTIONBAR: string = "CHANGE_ACTIONBAR";
        public static CHANGE_BOSSBUFF: string = "CHANGE_BOSSBUFF";
        public static CHANGE_BOSSLEV: string = "CHANGE_BOSSLEV";
        public static INIT_ARTIFACE: string = "INIT_ARTIFACE";
        public static REFRESH_TITLE_EVENT: string = "REFRESH_TITLE_EVENT";
        public static HIDE_TITLE_EVENT: string = "HIDE_TITLE_EVENT";
        public static SET_ANGER: string = "SET_ANGER";
        public static SET_ROUND_TEXT: string = "SET_ROUND_TEXT";
        public static CLEAR_ARTIFACE: string = "CLEAR_ARTIFACE";
        public static INIT_SPEED: string = "INIT_SPEED";
        public static ENTER_FIGHT_EVENT: string = "ENTER_FIGHT_EVENT";
        public static EXIT_FIGHT_EVENT: string = "EXIT_FIGHT_EVENT";

        public static SHOW_RESULT_EVENT: string = "SHOW_RESULT_EVENT";
        public static GLORY_RESULT_EVENT: string = "GLORY_RESULT_EVENT";
        public static SHOW_GUILD_COPY_RESULT_EVENT: string = "SHOW_GUILD_COPY_RESULT_EVENT";
        /** 激战神域 */
        public static SHOW_GODDOMAIN_RESULT_EVENT: string = "SHOW_GODDOMAIN_RESULT_EVENT";

        /** 技能选中 */
        public static SKILL_SELECTED : string = "SKILL_SELECTED";
        /** 点击角色成功 */
        public static CLICK_ROLE_SUCCESS : string = "CLICK_ROLE_SUCCESS";
        /** 自动战斗成功 */
        public static CLICK_AUTO_SUCCESS : string = "CLICK_AUTO_SUCCESS";
        /** 切换速度成功 */
        public static SWITCH_SPEED_SUCCESS : string = "SWITCH_SPEED_SUCCESS";
        /** 表现层complete */
        public static SCENE_COMPLETE_EVENT: string = "SCENE_COMPLETE_EVENT";
        /** 技能面板显示 */
        public static SKILL_PANEL_VISIBLE: string = "SKILL_PANEL_VISIBLE";
        public static SHOW_START_BG: string = "SHOW_START_BG";
        public static PLAY_SKILL_EFF: string = "PLAY_SKILL_EFF";
        public static REPLAY_GAME_EVENT: string = "REPLAY_GAME_EVENT";
        public data: any;
    }
}