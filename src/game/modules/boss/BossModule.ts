

module game {
    export class BossModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "BossModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new BossProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            BossModel.getInstance().initModel();
        }
    }

    export class BossEvent extends tl3d.BaseEvent {
        /** 打开界面 */
        public static SHOW_BOSS_VIEW : string = "SHOW_BOSS_PANEL";
        /** 打开排行界面 */
        public static SHOW_RANK_VIEW  : string = "SHOW_RANK_VIEW";
        /** 打开奖励界面 */
        public static SHOW_REWARD_VIEW : string = "SHOW_REWARD_VIEW";
        /** 打开规则界面 */
        public static SHOW_RULE_VIEW : string = "SHOW_RULE_VIEW";
        /** 打开购买界面 */
        public static SHOW_BUY_VIEW : string = "WB_SHOW_BUY_VIEW";

        /** 更新了boss最新消息 */
        public static UPDATE_BOSS_INFO : string = "UPDATE_WORLD_BOSS_INFO";
        /** 挑战boss */
        public static CHALLENGE_BOSS : string = "CHALLENGE_BOSS";
        
        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }

    export interface IWorldBossInfo {
        bossHp : number;
        bossId : number;
        bossRankNum : number;
        bossReviveTime : number;
    }

    
}