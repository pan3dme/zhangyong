
module game {

    export class GuildAskHelpView extends ui.guild.help.AskHelpViewUI {

        private _model : GuildHelpModel;
        private _selectInfo : tb.TB_guild_help;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this._model = GuildHelpModel.getInstance();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:"求 援" };	
            this.listItem.selectedIndex = -1;
            this.listItem.mouseHandler = new Handler(this,this.onMouse);
            this.listItem.renderHandler = new Handler(this,this.onRender);
            this.checkBox.selected = true;
            this.btnSure.on(Laya.Event.CLICK,this,this.onSure);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
            this.listItem.array = tb.TB_guild_help.getList();
		}

        public onClosed(): void {
            super.onClosed();
            this.listItem.cells.forEach((cellBox:Laya.Box,cellIdx:number)=>{
                let img = cellBox.getChildByName("imgGouxuan") as Laya.Box;
                img.visible = false;
            });
            this.listItem.array = null;
            this._selectInfo = null;
        }

        private initView(): void {
            this.listItem.selectedIndex = -1;
        }
        
        private onMouse(evt:Laya.Event,index:number):void {
            if(index == -1) return;
            if(evt.type == Laya.Event.CLICK){
                let cell = this.listItem.getCell(index);
                if(cell.gray){
                    showToast(LanMgr.getLan('',10417));
                    return;
                }
                let imgGouxuan = cell.getChildByName("imgGouxuan") as Laya.Box; 
                if(imgGouxuan.visible){
                    imgGouxuan.visible = false;
                    this._selectInfo = null;
                }else{
                    this.listItem.cells.forEach((cellBox:Laya.Box,cellIdx:number)=>{
                        let img = cellBox.getChildByName("imgGouxuan") as Laya.Box;
                        img.visible = cellIdx == index;
                        if(cellIdx == index){
                            this._selectInfo = cellBox.dataSource;
                        }
                    });
                }
            }
        }

        private onRender(cell:Laya.Box,index:number):void {
            let itemBox = cell.getChildByName("itemBox") as common.ItemBox2;
            let imgGouxuan = cell.getChildByName("imgGouxuan") as Laya.Box;
            let info = cell.dataSource as tb.TB_guild_help;
            if(info){
                let isExist = GuildHelpModel.getInstance().isExistHelp(info.ID);
                cell.gray = isExist;
                itemBox.dataSource = info.getRewardList()[0];
            }else{
                itemBox.dataSource = null;
                imgGouxuan.visible = false;
            }
        }

        private onSure():void {
            if(!this._selectInfo){
                showToast(LanMgr.getLan('',10420));
                return;
            }
            let info:GuildHelpVo = this.dataSource;
            if(info){
                dispatchEvt(new GuildEvent(GuildEvent.SEND_ASK_HELP),[info.pos,this._selectInfo,this.checkBox.selected]);
            }
        }
    }
}