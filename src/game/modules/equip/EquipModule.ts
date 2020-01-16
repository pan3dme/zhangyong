/**
* name 
*/
module game {
	export class EquipModule extends tl3d.Module {
		constructor() {
			super();
		}
		public getModuleName(): string {
			return "EquipModule";
		}

		protected listProcessors(): Array<tl3d.Processor> {
			return [new EquipProcessor(),new GemstoneProcessor()];
		}

		protected onRegister():void{
		}

	}

	export class EquipEvent extends tl3d.BaseEvent {
		/**装备的一系列操作 */
		public static EQUIP_OPERATION: string = "EQUIP_WEAR_ORCHANGE";
		/** 装备强化成功 */
		public static EQUIP_STRENGTH_SUCCESS: string = "EQUIP_STRENGTH_SUCCESS";
		/** 穿点装备成功 */
		public static WEAR_EQUIPMENT_SUCCESS: string = "WEAR_EQUIPMENT_SUCCESS";
		/** 一键穿戴成功 */
		public static ONEKE_WEAR_SUCCESS : string = "ONEKE_WEAR_SUCCESS";
		/** 一键强化成功 */
		public static ONEKE_STRENGTH_SUCCESS : string = "ONEKE_STRENGTH_SUCCESS";
		/** 一键精炼成功 */
		public static ONEKE_REFINE_SUCCESS : string = "ONEKE_REFINE_SUCCESS";
		/** 精炼成功 */
		public static DEFINE_EQUIPMENT_SUCCESS : string = "DEFINE_EQUIPMENT_SUCCESS";
		
		public static CHANGE_EQUIP_ITEM: string = "CHANGE_EQUIP_ITEM";
		public static SHOW_EQUIP_PANEL: string = "SHOW_EQUIP_PANEL";
		public static SWITCH_TAB_SUCCESS: string = "SWITCH_TAB_SUCCESS";
		public static CLOSE_JUMP_VIEW: string = "CLOSE_JUMP_VIEW";
		public static SHOW_EQUIPREFINE_PANEL:string = "SHOW_EQUIPREFINE_PANEL";
		public static SHOW_EQUIP_STH_PANEL:string = "SHOW_EQUIP_STH_PANEL";
		public static OPEN_EQUIP_PANEL:string="OPEN_EQUIP_PANEL";

		public data: any;

	}
}