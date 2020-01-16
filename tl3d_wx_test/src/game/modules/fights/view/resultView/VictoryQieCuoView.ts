module game {
	export class VictoryQieCuoView extends ui.fight.shengliQieCuoUI {
		constructor() {
			super();
		}

		public popup() {
			super.popup(false, false);
			this.mouseEnabled = true;
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
		}

		public onOpened() {
			super.onOpened();
			AudioMgr.setPlayRate(1);
			AudioMgr.playSound("sound/victory.mp3");
			this.bg.showTitle(true,SkinUtil.title_shengli, true, true, true, null, this);
		}

		public close(): void {
			super.close();
			this.btn_close.off(Laya.Event.CLICK, this, this.close);
			dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT),this.dataSource.copyVo);
		}

		public onClosed() {
			super.onClosed();
		}
	}
}