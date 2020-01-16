
module game { 

    export class RobbedRecordView extends ui.escort.RobbedRecordUI{

        private _buffList : common.BuffRenderList;
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.addChildAt(this.itemBox, 3);
        }

        createChildren():void {
            super.createChildren();
            this._buffList = new common.BuffRenderList(this.itemBox.width,this.itemBox.height,null,500,2,false);
			this._buffList.isAutoScroll = false;
			this._buffList.spaceY = 10;
			this._buffList.itemRender = RobRecordIR;
			this.itemBox.addChild(this._buffList);
        }
        
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed():void {
            super.onClosed();
            this._buffList.removeAll();
            this.bgPanel.dataSource = null;
        }

        private initView():void {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:LanMgr.getLan("",12430) };
            this._buffList.dataSource = this.dataSource;
        }

    }

}