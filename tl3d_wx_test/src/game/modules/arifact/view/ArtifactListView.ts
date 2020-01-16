

module game {

    export class ArtifactListView extends ui.artifact.ArtifactListUI{

        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12521) };	
            this.addChild(this.bgPanel.btnClose);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            // 原因：布阵界面之上
			this.zOrder = UI_DEPATH_VALUE.TOP+3;
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            // 原因：布阵界面之上
			this.zOrder = UI_DEPATH_VALUE.TOP+3;
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this.listShenqi.array = null;
        }
        
        initView(): void {
            this.listShenqi.array = tb.TB_artifact.get_TB_artifact();
        }


    }
}