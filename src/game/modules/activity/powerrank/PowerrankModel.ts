/**
* PowerrankModel
*/
module game{
	export class PowerrankModel{
		private static _instance: PowerrankModel;
		static getInstance(): PowerrankModel {
			if (!PowerrankModel._instance) {
				PowerrankModel._instance = new PowerrankModel();
			}
			return PowerrankModel._instance;
		}

		/**当前排行榜 */
		curRankID: number;
		rankingList: Object = {};

		public visiableView(){
			let nTime = App.getOpenServerTime() + (tb.TB_rank_type.getPowerRanKEndTime()+1) * TimeConst.ONE_DAY_SEC;
            let visibleTime = nTime - App.getServerTime();
			return visibleTime > 0;
		}

		//登录红点
		public firstLogin: boolean = false;
	}
}