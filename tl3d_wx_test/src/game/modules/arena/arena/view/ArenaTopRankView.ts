/**
* name 
*/
module game {
	export class ArenaTopRankView extends ui.arena.arena.ArenaTopRankUI {
		constructor() {
			super();
			this.isModelClose = true;
		}

		popup(): void {
			super.popup(false, false);
			this.initView();
		}

		initView(): void {
			this.bgPanel.showTitle(true,"zhandoubiaoxian/lisizuigao.png");
			let data: ArenaReportVo = this.dataSource;
			this.lbreward.changeText(`+${data.topRankDiamond}`);
			this.lbup.text = `(${data.chgRank}`;
			this.lbmax.changeText(`${data.topRank}`);
			this.lbrank.text = `${data.rank}`;
			this.lbrank.event(Laya.Event.RESIZE);
			this.lbup.event(Laya.Event.RESIZE);
			this.hbox.refresh();
		}

		public close(){
			super.close();
			this.bgPanel.closeTitle();
		}
	}
}