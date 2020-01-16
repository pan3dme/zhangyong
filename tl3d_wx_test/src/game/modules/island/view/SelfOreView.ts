
module game {

    export class SelfOreView extends ui.island.SelfOreUI {

        constructor() {
            super();
        }
        createChildren():void{
            super.createChildren();
            this.lbGain.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("",12210) };
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
            this.itemList.array = null;
            this.btnExplain.off(Laya.Event.CLICK,this,this.onExplain);
        }

        private initView(): void {
            let info : OreSpotInfoVo = this.dataSource;
            this.bgPanel.updateTitle(info.tbOre.name);
            let rewardNum:number = Number(info.getAward()[1]);
            if (rewardNum <= 0){
                this.imgGain.visible = false;
                this.lbGain.text = LanMgr.getLan('',10193,LanMgr.getLan("",12209));
            }else{
                this.imgGain.visible = true;
                this.lbGain.text = LanMgr.getLan('',10193,(rewardNum));
                this.imgGain.skin = SkinUtil.getCostSkin(info.getAward()[0]);
                this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            }
            let rewardList:ItemVo[] = info.getSpecialAward();
            if (rewardList && rewardList.length > 0){
                this.itemList.array = rewardList;
                this.itemList.visible = true;
                this.lab_empty.visible = false;
            }else{
                this.itemList.visible = false;
                this.lab_empty.visible = true;
            }
            let occupyTime = info.getAllOccupyTime();
            this.pgRes.value = (info.tbOre.max_time - occupyTime) / info.tbOre.max_time;
            this.lbPercent.text = Math.floor((info.tbOre.max_time - occupyTime) / info.tbOre.max_time*100) + "%";
            let minu = Math.ceil((info.tbOre.max_time - occupyTime)/60)
            this.lbTime.text = LanMgr.getLan('',10192,minu);
            this.btnExplain.on(Laya.Event.CLICK,this,this.onExplain);
        }
        
        private onExplain():void {
            let info : OreSpotInfoVo = this.dataSource;
            dispatchEvt(new IslandsEvent(IslandsEvent.OPEN_ORE_EXPLAIN,info.tbOre));
        }

    }
}