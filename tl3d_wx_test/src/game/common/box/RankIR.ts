


module common{
	export class RankIR extends ui.box.RankIRUI{
		constructor(){
			super();
            this.lbMidDesc.autoSize = this.lbBottomDesc.autoSize = true;
		}

		public set dataSource($value: common.RankVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():common.RankVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.lbName.text = info.name;
                this.lbMidDesc.text = info.getMidDesc();
                this.lbMid.text = info.getMid();
                this.boxMid.visible = info.isShowMid();
                this.lbMidDesc.event(Laya.Event.RESIZE);
                this.lbBottomDesc.text = info.getBottomDesc();
                this.lbBottom.text = info.getBottom();
                this.boxBottom.visible = info.isShowBottom();
                this.lbBottomDesc.event(Laya.Event.RESIZE);
                this.lbValue.text = info.getValue();
                this.lbValueDesc.text = info.getValueDesc();

                this.headBox.dataSource = info.getHeadVo();
				this.ui_view.dataSource = {rank:info.rank}
				this.headBox.on(Laya.Event.CLICK,this,this.onShowInfo);
			} else{
				this.headBox.dataSource = null;
				this.headBox.off(Laya.Event.CLICK,this,this.onShowInfo);
			}
		}

		private onShowInfo():void {
			let info = this.dataSource;
			if(!info || !info.playerId) return;
			if(info.rankSvrType == common.RankSvrType.matchCrossSvr){
				UIUtil.showMatchLineupInfo(info);
			}else{
				UIUtil.showPlayerLineupInfo(info.playerId);
			}
		}


	}
}