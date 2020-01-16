/**
* name 
*/
module game {
	export class ArenaRecordIR extends ui.arena.arena.render.ArenaRecordIRUI {
		constructor() {
			super();
			
		}

		set dataSource(value) {
			this._dataSource = value;
			this.refreshView();
		}

		get dataSource(): IArenaRecord {
			return this._dataSource;
		}

		refreshView(): void {
			let data = this.dataSource;
			if(data){
				this.lbname.text = data.name;
				this.lbtime.text = data.beforeTime();
				this.headbox.dataSource = new UserHeadVo(data.head, data.level,data.headFrame);
				this.lbtype.text = `${data.isChallenge() ? LanMgr.getLan("",12540) : LanMgr.getLan("",12541)}${data.isWin ? LanMgr.getLan("",12542) : LanMgr.getLan("",12405)}`;

				this.lbVal.color = data.isWin ? ColorConst.TASK_GREEN : ColorConst.RED; 
				this.lbValPre.text = data.getChgValuePrev();
				let value = data.getChgValue();
				this.lbVal.text = value > 0 ? `+${value}` : `${value}`;
				this.imgrank.skin = data.getChangeTypeSkin();
				this.lbVal.event(Laya.Event.RESIZE);
				this.hbox.refresh();
				
				this.lbNone.visible = data.isNotChange();
				this.hbox.visible = !this.lbNone.visible;
				this.btnplay.visible = !data.isNpc();
				this.btnplay.on(Laya.Event.CLICK, this, this.onPlayback);
			}else{
				this.btnplay.off(Laya.Event.CLICK, this, this.onPlayback);
			}
		}

		/** 回放 */
		private onPlayback(): void {
			let data = this.dataSource;
			if(data){
				dispatchEvt(data.getEvent(), this.dataSource);
			}
		}
	}
}