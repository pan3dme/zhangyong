/**
* name 
*/
module game{
	export class ArenaRecordView extends ui.arena.arena.ArenaRecordUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12539) };
			this.bgPanel.addChildAt(this.img_bg, 3);
		}

		popup():void{
			super.popup();
			this.initView();
		}

		private initView():void {
			this.recordList.array = this.dataSource;
			this.lab_norecord.visible = !this.dataSource || this.dataSource.length == 0;
		}

		onClosed():void {
			super.onClosed();
			this.recordList.array = null;
		}
	}
}