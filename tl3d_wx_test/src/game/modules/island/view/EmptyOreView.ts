
module game {

    export class EmptyOreView extends ui.island.EmptyOreUI {

        constructor() {
            super();
        }
        createChildren():void{
            super.createChildren();
            this.isModelClose = true;
            this.lbGain.autoSize = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("",12210)};
            this.btnNext.on(Laya.Event.CLICK, this, this.onScroll,[true]);
			this.btnPrev.on(Laya.Event.CLICK, this, this.onScroll,[false]);
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
            this.btnOccupy.off(Laya.Event.CLICK,this,this.onOccupy);
        }

        private initView(): void {
            let info : OreSpotInfoVo = this.dataSource;
            this.bgPanel.updateTitle(info.tbOre.name);
            this.lbGain.text = LanMgr.getLan('',10191,info.tbOre.reward[1]);
            this.lbMinu.text = `/${Math.floor(info.tbOre.interval/60)}${LanMgr.getLan("",12090)}`;
            this.lbGain.x = this.width/2 - (this.lbGain.width + 145)/2;
            this.imgGain.skin = SkinUtil.getCostSkin(info.tbOre.reward[0]);
            this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            this.lbMinu.x = this.imgGain.x + this.imgGain.width + 5;
            this.itemList.array = info.tbOre.getRateList();
            let occupyTime = info.getAllOccupyTime();
            this.pgRes.value = (info.tbOre.max_time - occupyTime) / info.tbOre.max_time;
            this.lbPercent.text = Math.floor((info.tbOre.max_time - occupyTime) / info.tbOre.max_time*100) + "%";
            this.btnOccupy.on(Laya.Event.CLICK,this,this.onOccupy);
        }
        
        private onOccupy():void {
            dispatchEvt(new IslandsEvent(IslandsEvent.OCCUPY_ORE,this.dataSource));
        }

        private onScroll(next:boolean):void {
			if(next){
				this.itemList.scrollBar.value += 300;
			}else{
				this.itemList.scrollBar.value -= 300;
			}
		}
    }
}