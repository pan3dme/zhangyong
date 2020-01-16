/**
* name 
*/
module game{
	export class TujianModule extends tl3d.Module {
		constructor(){
			super();
		}
		public getModuleName(): string {
            return "TujianModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new TujianProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            TujianModel.getInstance();
        }
	}

    export class TujianEvent extends tl3d.BaseEvent {
        /**每次进入更新数据 */
        public static SHOW_TUJIAN_PANEL: string = "SHOW_TUJIAN_PANEL";
        /**英雄详细界面 */
        public static SHOW_XIANGXI_PANEL: string = "SHOW_XIANGXI_PANEL";
        /**进入评价界面 */
        public static SHOW_EVALUATION_PANEL:string = "SHOW_EVALUATION_PANEL";
        /**更新评价 */
        public static UPDATE_EVALUATION:string = "UPDATE_EVALUATION";
        /**进入评价输入界面 */
        public static SHOW_EVALUATIONINPUT_PANEL:string = "SHOW_EVALUATIONINPUT_PANEL";
        /**查看英雄/怪物信息*/
        public static SHOW_GUAIWUXINXI_PANEL:string = "SHOW_GUAIWUXINXI_PANEL";
        /**查看评论的英雄 */
        public static SHOW_PINGLUNGOD_PANEL:string = "SHOW_PINGLUNGOD_PANEL";
        /**点赞 */
        public static DIANZAN:string = "DIANZAN";

        /** 激活图鉴 */
        public static ACTIVITY_TUJIAN_SUCC:string = "ACTIVITY_TUJIAN_SUCC";

        public data: any;
    }
}