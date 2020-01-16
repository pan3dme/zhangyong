module game{
   /** 对战选手信息 */
	export class GloryGroupView extends ui.glory.GloryGroupUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton:true, closeOnSide: this.isModelClose, title:LanMgr.getLan("",12400) };
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther,showEffect);
            this.initView();		
		}
		close():void {
			super.close();
			this.fightui.dataSource = null;
		}

		private initView():void {
            let info = this.dataSource as MatchGroupVo;
			this.fightui.dataSource = info;
        }

        

    }

}