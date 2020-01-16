/**
* name 
*/
module game {
	export class ArtifactModule extends tl3d.Module {
		constructor() {
			super();
		}

		public getModuleName(): string {
			return "ArtifactModule";
		}

		protected listProcessors(): Array<tl3d.Processor> {
			return [new ArtifactProcessor(),
			]
		}
	}

	export class ArtifactEvent extends tl3d.BaseEvent {
		/**打开神器界面 */
		public static SHOW_ARTIFACT_PANEL: string = 'SHOW_ARTIFACT_PANEL';
		/**打开神器选择界面 */
		public static SHOW_ARTIFACT_LIST_PANEL: string = 'SHOW_ARTIFACT_LIST_PANEL';
		/**神器操作 */
		public static ARTIFACT_OPERATION: string = 'ARTIFACT_OPERATION'
		/**神器操作成功 */
		public static ARTIFACT_OPERATION_SUCCESS: string = 'ARTIFACT_OPERATION_SUCCESS'
		/** 神器解锁成功 */
		public static ARTIFACT_UNLOCK_SUCCESS : string = "ARTIFACT_UNLOCK_SUCCESS";
		/** 神器强化成功 */
		public static ARTIFACT_STRENGTH_SUCCESS : string = "ARTIFACT_STRENGTH_SUCCESS";
		/** 神器穿戴或者卸下成功 */
		public static ADJUST_LINEUP_ARTIFACT_SUCCESS : string = "ADJUST_LINEUP_ARTIFACT_SUCCESS";

		/** 神器强化等级变化 */
		public static ARTIFACT_STRENGTH_LV_CHANGE : string = "ARTIFACT_STRENGTH_LV_CHANGE";
		/** 神器技能等级变化 */
		public static ARTIFACT_SKILL_LV_CHANGE : string = "ARTIFACT_SKILL_LV_CHANGE";
		/** 神器洗练属性变化 */
		public static ARTIFACT_BAPTIZE_CHANGE : string = "ARTIFACT_BAPTIZE_CHANGE";
		/** 神器星级属性变化 */
		public static ARTIFACT_STAR_CHANGE : string = "ARTIFACT_STAR_CHANGE";
		/** 神器激活 */
		public static ARTIFACT_ACTIVE : string = "ARTIFACT_ACTIVE";


		/** 切换神器 */
		public static SWITCH_ARTIFACT : string = "SWITCH_ARTIFACT";
		/** 切换选项卡 */
		public static SELECT_TABBAR : string = "SELECT_TABBAR";
		public static SHOW_VISIBLE_TRUE : string = "SHOW_ARTIFACT_VISIBLE_TRUE";
		public data: any;

	}
}