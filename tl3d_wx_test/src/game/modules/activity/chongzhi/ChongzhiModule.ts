/**
* name 
*/
module game {
	export class ChongzhiModule extends tl3d.Module {
		constructor() {
			super();
		}

		public getModuleName(): string {
			return "ChongzhiModule";
		}

		protected listProcessors(): Array<tl3d.Processor> {
			return [new ChongzhiProcessor()];
		}
		/**
		 * 模块初始化
		 */
		protected onRegister(): void {
			ChongzhiModel.getInstance().initModel();
		}
	}

	export class TopUpEvent extends tl3d.BaseEvent {
		/**打开充值界面 */
		public static SHOW_CHONGZHI_PANEL: string = "SHOW_CHONGZHI_PANEL";
		/**打开充值成功弹窗 */
		public static SHOW_CHONGZHISUCC_PANEL: string = "SHOW_CHONGZHISUCC_PANEL";
		/**打开首充界面 */
		public static SHOW_SHOUCHONG_PANEL: string = "SHOW_SHOUCHONG_PANEL";
		/**领取首充奖励 */
		public static GET_FIRSTRECHARGE_REWARD: string = `GET_FIRSTRECHARGE_REWARD`;
		/**首充红点事件 */
		public static SHOUCHONG_RED_EVEN: string = "SHOUCHONG_RED_EVEN";
		/**特权礼包红点*/
		public static UPDATE_TEQUANRED_EVEN: string = "UPDATE_TEQUANRED_EVEN";

		/** 限购礼包 */
        public static XIANGOU_LIBAO_CHANGE : string = "XIANGOU_LIBAO_CHANGE";
        /** 充值成功 */
        public static CHONGZHI_SUCCESS : string = "CHONGZHI_SUCCESS";
		public data: any;
	}
}