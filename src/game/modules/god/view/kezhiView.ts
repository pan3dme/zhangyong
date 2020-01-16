/**
* name 
*/
module game {
	export class kezhiView extends ui.god.ZhenYingKeZhiUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.God_kezhiView, closeOnSide: this.isModelClose, closeOnButton: false, title:LanMgr.getLan("",12339) };
			this.panel_attr.vScrollBarSkin = '';
		}

		private _allHalo:tb.TB_halo[][];
		private _allRaceAttr:RaceForceIR[];
		public popup(): void {
			super.popup();
			// 原因：布阵界面之上
			this.zOrder = UI_DEPATH_VALUE.TOP+3;
			this.initView();
		}

		public onClosed(): void {
			super.onClosed();
			this._allHalo = null;
			this.clearRaceForceIR();
		}

		private initView():void {
			let raceObj = this.dataSource || {};
			this._allHalo = tb.TB_halo.getAllType();
			this.clearRaceForceIR();
			if (this._allHalo && this._allHalo.length > 0){
				this._allRaceAttr = [];
				for (let i:number = 0; i < this._allHalo.length; i++){
					let halos:tb.TB_halo[] = this._allHalo[i];
					if (halos && halos.length > 0){
						let ui:game.RaceForceIR = new game.RaceForceIR();
						ui.dataSource = { godNum:(raceObj[i]||0) ,halos};
						this.panel_attr.addChild(ui);
						this._allRaceAttr.push(ui);
					}
				}
				this.layoutAttr();
			}

			this.panel_attr.scrollTo(0,0);
		}

		private layoutAttr():void{
			if (this._allRaceAttr){
				this._allRaceAttr.sort((a,b)=>{
					return a.sortnum - b.sortnum;
				});
				let posy:number = 0;
				let spacey:number = 10;
				for (let i:number = 0; i < this._allRaceAttr.length; i++){
					let ui:game.RaceForceIR = this._allRaceAttr[i];
					ui.x = 10;
					ui.y = posy;
					posy += ui.height + spacey;
				}
			}
		}

		private clearRaceForceIR():void{
			if (this._allRaceAttr){
				for (let i:number = 0; i < this._allRaceAttr.length; i++){
					this._allRaceAttr[i].dataSource = null;
					this._allRaceAttr[i].destroy();
					this._allRaceAttr[i] = null;
				}
				this._allRaceAttr = null;
			}
		}

	}
}