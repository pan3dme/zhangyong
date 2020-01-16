module game {
	export class FightTishiView extends ui.fight.FightTishiUI {
		constructor() {
			super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.FightTishiView, closeOnSide: this.isModelClose,title:LanMgr.getLan("",10536) };	
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
		}

        public onClosed(): void {
            super.onClosed();
        }

	}
}