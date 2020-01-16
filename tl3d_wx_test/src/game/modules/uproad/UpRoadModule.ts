/**
* name 
*/
module game{
	export class UpRoadModule extends tl3d.Module {
		constructor(){
			super();
		}
		public getModuleName(): string {
            return "UpRoadModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new UpRoadProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            
        }
	}

    export class UpRoadEvent extends tl3d.BaseEvent {
        /**等级变化 */
        public static UR_LEVEL_CHANGE: string = "UR_LEVEL_CHANGE";
        /**完成次数变化 */
        public static UR_COUNT_CHANGE: string = "UR_COUNT_CHANGE";
        /**领奖次数变化 */
        public static UR_REWARD_CHANGE: string = "UR_REWARD_CHANGE";

        /** 领取奖励成功 */
        public static REWARD_SUCCESS : string = "UPROAD_REWARD_SUCCESS";
    }
}