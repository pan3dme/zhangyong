/**
* name 
*/
module common {
	export class XianshiBaoxiangView extends ui.component.XianshiBaoxiangUI {
		constructor() {
			super()
			this.isModelClose = false;
		}

		public popup(closeOther?: boolean, showEffect?: boolean):void {
			super.popup(closeOther,showEffect);
			this.zOrder = this.dataSource;
		}

		public onOpened():void {
			super.onOpened();
            this.btnConfirm.on(Laya.Event.CLICK,this,this.close);
		}

        public onClosed(type?: string):void {
            super.onClosed(type);
        }


	}
}