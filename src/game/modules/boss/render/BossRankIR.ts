

module game {

    export class BossRankIR extends ui.boss.RankIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():BossRankInfo {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
			if(info){
				this.headBox.dataSource = new UserHeadVo(info.svo.head,info.svo.playerLevel,info.svo.headFrame);
                this.lbName.text = info.svo.playerName;
                this.lbDamage.text = info.svo.value.toString();
				this.headBox.on(Laya.Event.CLICK,this,this.onShowInfo);
				this.ui_view.dataSource = {rank:info.rank};
			} else{
				this.headBox.dataSource = null;
				this.headBox.off(Laya.Event.CLICK,this,this.onShowInfo);
			}
        }

		private onShowInfo():void {
			let info = this.dataSource;
			if(info && info.svo && info.svo.playerId) {
				UIUtil.showPlayerLineupInfo(info.svo.playerId);
			}
		}
    }
}