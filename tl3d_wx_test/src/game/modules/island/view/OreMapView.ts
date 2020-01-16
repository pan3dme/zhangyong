
module game {

    export class OreMapView extends ui.island.OreMapUI {
        constructor() {
            super();
            this.group = UIConst.hud_group;
        }
        createChildren(): void {
            super.createChildren();
            this.itemList.cells.forEach((item, index) => {
                let yu:number = Math.floor(index/6);
                if (yu%2 == 1) {
                    item.x += 86;
                }
            });
            this.itemPanel.hScrollBarSkin = "";
            this.itemPanel.hScrollBar.on(Laya.Event.CHANGE,this,this.onPanelScroll);
        }
        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.itemPanel.width = w;
            this.itemPanel.height = h;
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
            Laya.timer.clearAll(this);
            this.itemList.array = null;
            IslandUtil.stopIslandLoop();
            UIMgr.hideUIByName(UIConst.SysTopView);
        }

        private onPanelScroll():void {
            let info: IslandInfoVo = this.dataSource;
            if (info){
                info.scrollX = this.itemPanel.hScrollBar.value;
            }
            // console.log("onPanelScroll",this.itemPanel.hScrollBar.value);
        }

        private initView(): void {
            let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)},
					{btnSkin:SkinUtil.btn_record,redpointName:"island_record",callback:this.onRecord.bind(this)},
				];
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onExit.bind(this)});
            this.updateView();
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            let info: IslandInfoVo = this.dataSource;
            IslandUtil.loopRequestIsland(info.tbIsland.ID);
            this.callLater(this.scrollTo);
        }

         private scrollTo():void{
             let info: IslandInfoVo = this.dataSource;
            if (!info) return;
             let scrollX = info.scrollX;
             if(scrollX == 0) {
                let self:OreSpotInfoVo = this.getSelfIsLandInfo();
                if (self){
                    let cell = this.itemList.getCell(self.pos-1);
                    if (cell){
                        scrollX = this.itemList.x + cell.x + cell.width/2 - 360;
                    }
                }else{
                    info.scrollX = 230;
                    scrollX = info.scrollX;
                }
             }
             
            this.itemPanel.scrollTo(scrollX);
        }

        //获取自己的
        private getSelfIsLandInfo():OreSpotInfoVo{
            let info: IslandInfoVo = this.dataSource;
            if (info){
                let all:OreSpotInfoVo[] = info.oreList;
                for (let i:number = 0; i < all.length; i++){
                    let infovo:OreSpotInfoVo = all[i];
                    if (infovo && infovo.isSelf()){
                        return infovo;
                    }
                }
            }
            return null;
        }


        public updateView(): void {
            let info: IslandInfoVo = this.dataSource;
            this.itemList.array = info.oreList;
        }

        /** 更新时间 */
        public updateTime(): void {
            let time = IslandModel.getInstance().getNextRefreshTime();
            this.lbRefreshTime.text = LanMgr.getLan('', 10190, GameUtil.toCountdown(time, "hh:mm:ss"));
        }


        /** 更新矿点信息 */
        public updateOreData(mineIndex: number): void {
            let itemRender = this.itemList.cells.find((item) => {
                let info = item.dataSource;
                return info && info.isExist() && info.svo.mineIndex == mineIndex;
            });
            if (itemRender) {
                itemRender.refreshView();
            }
        }

         /** 规则 */
        private onRule(): void {
            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_RULE_VIEW));
        }
        /** 记录 */
        private onRecord(): void {
            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_RESCORD_VIEW));
        }

        private onExit(): void {
            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_MAIN_VIEW));
        }

    }
}