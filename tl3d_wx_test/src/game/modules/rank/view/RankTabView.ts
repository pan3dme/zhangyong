/**
* name 
*/
module game {
	export class RankTabView extends ui.rank.RankTabViewUI {

		constructor() {
			super();
			this.isModelClose = true;
		}

		close():void {
			super.close();
			RankModel.getInstance().rankingList = {};
			this.list_tab.array = null;
			this.bgPanel.dataSource = null;
		}

		public popup() {
			super.popup();
			this.initView();
		}

		public initView(): void {
			let info = this.dataSource || [];
			this.bgPanel.dataSource = { uiName: UIConst.RankTabView, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12186) };
			let dataAry = RankModel.getInstance().arrRankListName.map((ary:any[],index:number)=>{
				return {typeList:ary,svo:info[index]};
			});
			this.list_tab.array = dataAry;
		}

	}
}