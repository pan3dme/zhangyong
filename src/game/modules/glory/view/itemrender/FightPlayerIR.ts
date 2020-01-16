
module game{
	export class gloryFightPlayerIR extends ui.glory.iRender.FightPlayerIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: GloryMatchPlayerVo) {
			this._dataSource = $value;
			this.initView();
		}

		public get dataSource():GloryMatchPlayerVo {
			return this._dataSource;
		}

		public initView():void {
			let info = this.dataSource;
			if(info){
				this.headBox.dataSource = info.headVo;
				this.lbForce.text = LanMgr.getLan("",10117,info.force);
                this.lbName.text = info.name;
				this.headBox.on(Laya.Event.CLICK,this,this.onShowLineup);
			} else{
				this.headBox.dataSource = null;
				this.headBox.off(Laya.Event.CLICK,this,this.onShowLineup);
			}
		}

		private onShowLineup():void{
			let info = this.dataSource;
			if(info){
				GloryThread.requestUserLineup(info).then(()=>{
					dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_LINEUP_VIEW),info);
				});
			}
		}
		

	}
}