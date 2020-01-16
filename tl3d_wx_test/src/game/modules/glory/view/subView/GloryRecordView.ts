module game{
   /** 记录 */
	export class GloryRecordView extends ui.glory.RecordUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton:true, closeOnSide: this.isModelClose, title:LanMgr.getLan("",12399) };
			this.bgPanel.addChildAt(this.img_bg, 3);
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther,showEffect);
            this.initView();		
		}
		close():void {
			super.close();
			this.recordList.array = null;
		}

		private initView():void {
            this.recordList.array = GloryModel.getInstance().getMyMatchList();
        }

        

    }

}