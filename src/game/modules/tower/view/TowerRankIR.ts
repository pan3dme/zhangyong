/**
* name 
*/
module game{
	export class TowerRankIR extends ui.tower.RankIRUI {
		constructor(){
			super();
		}

		public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource(): RankVo{
            return this._dataSource;
        }

		private refreshData() {
            let data = this.dataSource;
            if (data) {
                this.lbName.text = data.name;
                this.lbGuild.text = data.guildName ? LanMgr.getLan("", 12125, data.guildName) : '';
                this.lbDesc.text = data.getDesc();
                this.lbValue.text = data.getValue();
                this.headBox.dataSource = data.getHeadVo();
                this.headBox.on(Laya.Event.CLICK,this,this.onShowInfo);

                this.ui_view.dataSource = {rank:data.getRank()}
            }else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK,this,this.onShowInfo);
            }
        }

        private onShowInfo():void {
			let info = this.dataSource;
			if(info && info.uid) {
				UIUtil.showPlayerLineupInfo(info.uid);
			}
		}


	}

}