/**
* name 
*/
module game {
	export class ArenaRankView extends ui.arena.arena.ArenaRankUI {
		private _myRank: number;
		private _rewardTime: string;
		constructor() {
			super();
			this.isModelClose = true;
			this.rewardList.array = tb.TB_arena_new.get_TB_arena_new();
			this.tab.selectHandler = new Handler(this, this.onTabSelect);
			let rewardTime = tb.TB_arena_new_set.getArenaNewSet().daily_reward;
			this._rewardTime = `${rewardTime[0]}:${buquan(rewardTime[1], 2)}`;
			this.bgPanel.dataSource = { uiName: UIConst.ArenaRankView, closeOnSide: true, closeOnButton: true, title: LanMgr.getLan("",12551) }
		}

		popup(): void {
			super.popup();
			this.initView();
		}

		initView(): void {
			let data: ArenaInfo = this.dataSource;
			this._myRank = data.rank;
			this.tab.selectedIndex = 0;
			this.rankList.array = data.rankInfoList;
			this.onTabSelect(0);
		}

		private onTabSelect(index: number): void {
			this.viewstack.selectedIndex = index;
			this.lbtime.text = index == 1 ? LanMgr.getLan("",12552,this._rewardTime) : `${LanMgr.getLan("",12265)}${this._myRank}`
		}

		onClosed(): void {
			super.onClosed();
			this.rankList.array = null;
		}
	}
}