

module game {
    export class IconChangeView extends ui.guild.init.IconChangeUI {
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.IconChangeView, closeOnSide: this.isModelClose,title:"头像设置" };	
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this.list_icon.array = null;
            this.btn_sure.off(Laya.Event.CLICK, this, this.sure);
        }

        private initView(): void {
            this.btn_sure.on(Laya.Event.CLICK, this, this.sure);
            //将表中的图标数据读出来
            let list = this.dataSource.list_icon as IconVo[];
            this.list_icon.array = list;
            this.list_icon.mouseHandler = new Handler(this, this.onSelect);
            this.list_icon.renderHandler = new Handler(this, this.onRender);
            
            /** 获取到默认的index或者已有的index */
            let index = 0;
            if(this.dataSource.iconId){
                index = list.findIndex((vo)=>{
                    return vo.tbHead.ID == this.dataSource.iconId;
                });
            }
            this.list_icon.selectedIndex = index;
        }

        private sure(): void {
            if(this.dataSource.type == GuildIconChangeType.createChange) {
                dispatchEvt(new GuildEvent(GuildEvent.CREATE_GUILD_CHANGEICON), this.list_icon.selectedItem);
            } else if (this.dataSource.type == GuildIconChangeType.infoChange) {
                dispatchEvt(new GuildEvent(GuildEvent.GUILD_HALL_VIEW_CHANGEICON), this.list_icon.selectedItem);
            }
        }
        
        private onSelect(event: Laya.Event, index: number): void {
            if (event.type == Laya.Event.CLICK) {

            }
        }

        private onRender(itemRender: IconRender, index: number): void {
            if(index > this.list_icon.length)
                return;
            itemRender.img_selected.visible = index == this.list_icon.selectedIndex;
        }

    }
}