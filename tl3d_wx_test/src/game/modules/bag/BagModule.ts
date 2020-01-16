/**
* name 
*/
module game{
	export class BagModule extends tl3d.Module{
		constructor(){
			super();
		}

		public getModuleName(): string {
            return "BagModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new BagProcessor()];
        }

		/**
		 * 模块初始化
		 */
		protected onRegister():void
		{
			BagModel.getInstance();
		}
	}
	export class BagEvent extends tl3d.BaseEvent {
		//展示背包
		public static SHOW_BAG_PANEL: string = "SHOW_BAG_PANEL"; 
		//使用多个道具
		public static USE_MANY_ITEM: string = "USE_MANY_ITEM"; 
		//打开批量出售面板
		public static OPEN_SELL_VIEW: string = "OPEN_SELL_VIEW"; 
		public static FENJIE_EQUIPS: string = "FENJIE_EQUIPS"; 
		//背包变化
		public static CHANGE_ITEM: string = "CHANGE_ITEM"; 
		//装备变化
		public static CHANGE_EQUIP_ITEM: string = "CHANGE_EQUIP_ITEM"; 
		//勾选
		public static SELECT_RECYCLE_ITEM: string = "SELECT_RECYCLE_ITEM"; 
		//停止滚动
		public static STOP_SCROLL: string = "STOP_SCROLL"; 

		/** 使用成功 */
		public static USE_ITEM_SUCCESS : string = "USE_ITEM_SUCCESS";
		public data: any;
	}
}