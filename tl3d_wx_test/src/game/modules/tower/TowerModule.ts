

module game{
	export class TowerModule extends tl3d.Module{
		constructor(){
			super();
		}
		public getModuleName(): string {
            return "TowerModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new TowerProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            TowerModel.getInstance().initModel();
        }
	}

	export class TowerEvent extends tl3d.BaseEvent {
        /** 打开试炼塔界面 */
        public static SHOW_SHILIANTA_PANEL: string = "SHOW_SHILIANTA_PANEL";
        /** 关卡进度更新 */
        public static PROGRESS_CHANGE : string = "PROGRESS_CHANGE";
        /** 领取boss奖励成功 */
        public static GET_BOSS_AWARD_SUC : string = "GET_BOSS_AWARD_SUC";
        /** 点击关卡 */
        public static CLICK_GUANQIA : string = "CLICK_GUANQIA";
        /** 关卡挑战 */
        public static CHALLENGE_GUANQIA : string = "CHALLENGE_GUANQIA";

        /** 试炼塔奖励 */
        public static SHOW_TOWER_JIANGLI : string = "SHOW_TOWER_JIANGLI";
        /** 试炼塔排行榜 */
        public static SHOW_TOWER_RANK : string = "SHOW_TOWER_RANK";
        /** 领取boss奖励 */
        public static LINGQU_BOSS_JIANGLI : string = "LINGQU_BOSS_JIANGLI";
        public data: any;

        constructor(type:string,$data:any=null){
            super(type);
            this.data = $data;
        }
    }

    export enum ShiliantaType {
        all = 0,        // 全部
        jiandan = 1,    // 简单
        kunnan = 2      // 困难
    }
}