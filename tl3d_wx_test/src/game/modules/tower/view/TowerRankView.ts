/**
* name 
*/
module game{
	export class TowerRankView extends ui.tower.RankUI {
		constructor(){
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12124) };
		}

		public onClosed():void {
			super.onClosed();
			this.list_rank.array = null;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        private initView():void {
			this.list_rank.itemRender = TowerRankIR;
			if(this.dataSource){
				this.list_rank.array = this.dataSource.getList();
				this.lb_myrank.text = this.dataSource.getRankDesc();
			} else {
				this.list_rank.array = TowerModel.getInstance().getRankListVo().getList();
				this.lb_myrank.text = TowerModel.getInstance().getRankListVo().getRankDesc();
			}
		}
		
	}

}