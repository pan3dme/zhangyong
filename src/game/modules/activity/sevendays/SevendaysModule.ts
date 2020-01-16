/**
* name 
*/
module game{
	export class SevendaysModule extends tl3d.Module {
		constructor() {
			super();
		}

		public getModuleName(): string {
			return "SevendaysModule";
		}

		protected listProcessors(): Array<tl3d.Processor> {
			return [new SevendaysProcessor()];
		}
	}
	
	export class SevendaysEvent extends tl3d.BaseEvent {
		public static UPDATE_SEVENDAYS_PANEL:string = "UPDATE_SEVENDAYS_PANEL";
		public static DRAW_SEVENDAYS_REWARD:string = "DRAW_SEVENDAYS_REWARD";
		public static SHOW_SEVENDAYS_PANEL:string = "SHOW_SEVENDAYS_PANEL";
		public static SEVENDAYS_RED_EVENT:string = "RED_EVENT";

		data: any;
	}
}