/**
* name 
*/
module game {
	export class ArenaIR extends ui.arena.arena.render.ArenaIRUI {
		constructor() {
			super();
			this.on(Laya.Event.CLICK, this, this.onLinueUp);
		}

		set dataSource(value) {
			this._dataSource = value;
			if (!!value) this.refreshView();
		}

		get dataSource(): ArenaInfoVo {
			return this._dataSource;
		}

		private refreshView(): void {
			this.setForceLabel();
			let data = this.dataSource;
			this.lbname.text = data.name;
			this.lbguild.text = data.guildName;
			this.lbrank.text = data.rank + '';
			this.imgmyself.visible = data.isMySelf();
			this.imgRank.skin = SkinUtil.getArenaRankBg(data.rank);
			this.lbrank.fontSize = ArenaModel.getClgRankLbSize(data.rank);
		}

		/**设置神力Label */
		setForceLabel(): void {
			this.lbshenli.text = this.dataSource.force + '';
		}

		private onLinueUp(): void {
			if(this.dataSource.isMySelf()){
				showToast(LanMgr.getLan('',10208))
				return;
			}
			dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_LINUEUP_PANLE), this.dataSource);
		}
	}
}