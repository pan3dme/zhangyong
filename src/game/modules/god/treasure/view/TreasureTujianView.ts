/**
* name 
*/
module game{
	
	export class TreasureTujianView extends ui.god.treasure.TreasureTujianUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12372) };
            this.itemList.array = null;
		}
		
		public popup(closeOther?: boolean, showEffect?: boolean){
			super.popup(closeOther,showEffect);
			this.initView();
		}

		public onClosed(){
			super.onClosed();
            this.itemList.array = null;
		}

		private initView():void{
            this.itemList.array = TreasureModel.getInstance().getTujianViewList();
		}

	}
}