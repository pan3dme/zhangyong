
module game {
	export class gloryLastRankPropIR {

		private _rankui: Laya.Box;
		private uiScene: Base2dSceneLayer;
		public lbName: Laya.Label;
		public lbForce: Laya.Label;
		public roleBox: Laya.Box;

		private _dataSource: any;
		constructor(rankui: Laya.Box) {
			this._rankui = rankui;
			this._rankui.visible = false;

			this.lbName = rankui.getChildByName("lbName") as Laya.Label;
			let hbox = rankui.getChildByName("hbox") as Laya.Box;
			this.lbForce = hbox.getChildByName("lbForce") as Laya.Label;
			this.roleBox = rankui.getChildByName("roleBox") as Laya.Box;
			this.uiScene = new Base2dSceneLayer();
			this.roleBox.addChildAt(this.uiScene, 0);
			this.uiScene.setModelBox(rankui, this.roleBox, this.lbForce);
		}

		public set dataSource($value: common.IPlayerLinuepInfo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource(): common.IPlayerLinuepInfo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if (info) {
				this.lbName.text = info.name;
				this.lbForce.text = info.force + "";
				this.lbForce.event(Laya.Event.RESIZE);
				this.uiScene.onShow();
				let model = GodUtils.getShowGodModel(info.showGodId,info.showSkinId);
				Laya.timer.once(200, this, this.delayShow, [model]);
				this._rankui.visible = true;
				this.roleBox.on(Laya.Event.CLICK,this,this.onShowInfo);
			} else {
				this.uiScene.onExit();
				Laya.timer.clearAll(this);
				this._rankui.visible = false;
				this.roleBox.off(Laya.Event.CLICK,this,this.onShowInfo);
			}
		}

		private onShowInfo():void {
			let info = this.dataSource;
			if(info && info.playerId) {
				UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
			}
		}

		/** 延迟展示模型（延迟主要为了定位） */
		private delayShow(modelId): void {
			if(modelId <= 0) return;
			let point = this.roleBox.localToGlobal(new Laya.Point(0, 0));
			this.uiScene.addModelChar(modelId, point.x + this.roleBox.width / 2 - Launch.offsetX, point.y - Launch.offsetY + 200, 180, 1.8);
		}

	}
}