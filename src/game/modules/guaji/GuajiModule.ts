/**
* name 
*/
module game{
	export class GuajiModule extends tl3d.Module{
		constructor(){
			super();
		}
		public getModuleName(): string {
            return "GuajiModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new GuajiProcessor()];
        }

        
        /**
         * 初始化数据
         */
        protected onRegister(){
            tb.TB_copy.initAllCopy();
            GuajiModel.getInstance().initModel();
        }
	}

	export class GuajiEvent extends tl3d.BaseEvent {
        /** 打开挂机界面 */
        public static SHOW_GUAJI_PANEL: string = "SHOW_GUAJI_PANEL";
        /** 关卡一波完成 进行下一波或者下一关 */
        public static GUANQIA_STEP_COMPLETE: string = "GUANQIA_STEP_COMPLETE";
        /** 打开挂机收益 */
        public static SHOW_GUAJISHOUYI: string = "SHOW_GUAJISHOUYI";
        /** 打开挂机收益提升界面 */
        public static SHOW_SHOUYI_UP_VIEW: string = "SHOW_SHOUYI_UP_VIEW";

        /** 打开快速战斗 */
        public static SHOW_FAST_BATTLE : string = 'SHOW_FAST_BATTLE';
        /** 快速战斗成功 */
        public static FAST_BATTLE_SUCCESS : string = 'FAST_BATTLE_SUCCESS';

        /** 领取挂机收益 */
        public static LINGQU_GUAJI_JIANGLI : string = "LINGQU_GUAJI_JIANGLI";
        public static LINGQU_GUAJI_JIANGLI_SUCC : string = "LINGQU_GUAJI_JIANGLI_SUCC";
        /** 更新上次领取挂机收益的时间 */
        public static UPDATE_LASTGET_AFKTIME : string = "UPDATE_LASTGET_AFKTIME";
        /** 领取挂机宝箱奖励 关卡上的宝箱*/
        public static REWARD_BAOXIANG_SUCC : string = "UPDATE_LASTGET_AFKTIME";
        /** 点击扫荡 */
        public static CLICK_SAODANG : string = "CLICK_SAODANG";

        //进入战斗副本
        public static ENTER_FIGHT_EVENT: string = "ENTER_FIGHT_EVENT";
        //更新挂机章节
        public static UPDATE_ZHANGJIE_EVENT: string = "UPDATE_ZHANGJIE_EVENT";
        //符文通关奖励
        public static SHOW_JINAGLI_PANEL: string = "SHOW_JINAGLI_PANEL";
         //符文通关奖励
        public static FUBEN_REWARD_CHANGE: string = "FUBEN_REWARD_CHANGE";
        //掉落物品
        public static GUAJI_DROP_ITEM: string = "GUAJI_DROP_ITEM";
        // 更新历练副本信息
        public static UPDATE_FUWEN_COPY_INFO : string = "UPDATE_FUWEN_COPY_INFO";
        // // 出站英雄变化
        // public static CHANGE_GOD_EVENT : string = "CHANGE_GOD_EVENT";
        // 红点变化
        public static RED_CHANGE : string = "RED_CHANGE";

        /** 移动到目标关卡完成 */
        public static MOVE_TO_TARGET_GK : string = "MOVE_TO_TARGET_GK";
        /** 显示对话 */
        public static PLAYER_TALK_SHOW : string = "PLAYER_TALK_SHOW";

        /** 系统开启按钮：点击确定按钮 */
        public static CONFIRM_SYS_OPEN_BUTTON : string = "CONFIRM_SYS_OPEN_BUTTON";
        /** 关闭首充提示 */
        public static CLOSE_SHOUCHONG_TIPS : string = "CLOSE_SHOUCHONG_TIPS";
        /** 挂机按钮变化 */
        public static CHANGE_GUAJI_BTN : string = "CHANGE_GUAJI_BTN";
        /** 进入挂机开始战斗 */
        public static ENTER_FIGHT : string = "ENTER_FIGHT";
        /** 角色创建完成 */
        public static CREATE_ROLE_SUCC : string = "CREATE_ROLE_SUCC";
        /** 挂机战斗完成 */
        public static GUAJI_FIGHT_END : string = "GUAJI_FIGHT_END";
        /** 挂机战斗对话结束 */
        public static GUAJI_TALK_END : string = "GUAJI_TALK_END";
        /** 挑战副本成功 */
        public static BATTLE_COPY_SUCCESS : string = "BATTLE_COPY_SUCCESS";
        /** 更新回合 */
        public static CHANGE_ROUND : string = "CHANGE_ROUND";
        /** 设置战斗头部信息 */
        public static REFRESH_TITLE_EVENT : string = "REFRESH_TITLE_EVENT";
        /** 设置战斗头部信息 */
        public static INIT_ARTIFACE : string = "INIT_ARTIFACE";
        public static SET_ANGER: string = "SET_ANGER";
        public static CLEAR_ARTIFACE: string = "CLEAR_ARTIFACE";
        public static GET_PROP_EFF: string = "GET_PROP_EFF";
        public static SET_FIGHT_BLACK_BG: string = "SET_FIGHT_BLACK_BG";
        public static PLAY_SKILL_EFF: string = "PLAY_SKILL_EFF";
        public data: any;

        constructor(type:string,$data:any=null){
            super(type);
            this.data = $data;
        }
    }
}