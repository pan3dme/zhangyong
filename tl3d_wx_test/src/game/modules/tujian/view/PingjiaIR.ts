/**
* name 
*/
module game {
	export class PingjiaIR extends ui.tujian.render.pingjiaIRUI {
		constructor() {
			super();
		}

		public set dataSource($value: PingjiaInfo) {
			this._dataSource = $value;
			this.refresh();
		}

		public get dataSource():PingjiaInfo {
			return this._dataSource;
		}

		public refresh(): void {
			let info = this.dataSource;
			if (info) {
				this.label_name.text = info.name;
				this.label_Numbers.text = info.num + "";
				this.label_godstext.text = info.content;
				this.label_godstext.event(Laya.Event.RESIZE);
				this.btn_giveup.on(Laya.Event.CLICK, this, this.onGiveup);
				this.imgBg.height = this.height = this.label_godstext.height + 65;
			} else {
				this.btn_giveup.off(Laya.Event.CLICK, this, this.onGiveup);
			}
		}

		/**查看评论的英雄 */
		private game_god_observeGod(): void {
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_PINGLUNGOD_PANEL), this.dataSource);
		}

		/**点赞 */
		private onGiveup(): void {
			let info = this.dataSource;
			if(!info) return;
			if (info.playerId == App.hero.playerId){
				showToast(LanMgr.getLan('', 10468));
				return;
			}
			dispatchEvt(new TujianEvent(TujianEvent.DIANZAN), this.dataSource);
		}


	}
}