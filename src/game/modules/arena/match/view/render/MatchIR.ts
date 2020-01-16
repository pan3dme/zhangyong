/**
* name 
*/
module game {
	export class MatchIR extends ui.arena.match.render.MatchIRUI {
		constructor() {
			super();
			
		}

		set dataSource(value:MatchPlayerVo) {
			this._dataSource = value;
			this.refreshView();
		}

		get dataSource(): MatchPlayerVo {
			return this._dataSource;
		}

		private refreshView(): void {
			let data = this.dataSource;
            if(data){
                this.headBox.dataSource = data.headVo;
                this.lbName.text = data.name;
                this.lbForce.text =  LanMgr.getLan("",10117,data.force);
                this.lbScore.text = LanMgr.getLan("",12543) + "：" + data.score;
                this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
                this.headBox.on(Laya.Event.CLICK, this, this.onCheck);
            }else {
                this.headBox.dataSource = null;
                this.btnChallenge.off(Laya.Event.CLICK, this, this.onChallenge);
				this.headBox.off(Laya.Event.CLICK, this, this.onCheck);
            }
		}
		/** 挑战 */
		private onChallenge(): void {
			dispatchEvt(new ArenaEvent(ArenaEvent.MATCH_CHALLENGE), this.dataSource);
		}
		/** 查看阵容 */
		private onCheck():void {
			dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_PLAYER_LINEUP), this.dataSource);
		}
	}
}