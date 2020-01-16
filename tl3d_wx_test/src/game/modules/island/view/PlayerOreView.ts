
module game {

    export class PlayerOreView extends ui.island.PlayerOreUI {

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
            // this.linuepList.array = null;
            this.btnExplain.off(Laya.Event.CLICK,this,this.onExplain);
            this.btnOccupy.off(Laya.Event.CLICK,this,this.onOccupy);
            this.btnRob.off(Laya.Event.CLICK,this,this.onRob);
        }

        private initView(): void {
            let info : OreSpotInfoVo = this.dataSource;
            this.bgPanel.updateTitle(info.tbOre.name);
            this.headBox.dataSource = info.getHeadVo();
            this.lbName.text = info.svo.playerName;
            // this.lbForce.text = info.svo.force + "";
            this.lbGuild.text = LanMgr.getLan("",12083) + (info.svo.guildName ? info.svo.guildName : LanMgr.getLan("",12084));
            // this.linuepList.array = info.getExistGods();
            let award = info.getRobAward();
            this.lbGain.text = info.svo.robCount >= tb.TB_island_set.getSet().plunder_max_num ? 0 : award[1].toString();
            this.imgGain.skin = SkinUtil.getCostSkin(award[0]);
            this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            this.itemList.array = info.tbOre.getLossList();
            let occupyTime = info.getAllOccupyTime();
            this.pgRes.value = (info.tbOre.max_time - occupyTime) / info.tbOre.max_time;
            this.lbResPerc.text = Math.floor((info.tbOre.max_time - occupyTime) / info.tbOre.max_time*100) + "%";
            this.btnExplain.on(Laya.Event.CLICK,this,this.onExplain);
            this.btnOccupy.on(Laya.Event.CLICK,this,this.onOccupy);
            this.btnRob.on(Laya.Event.CLICK,this,this.onRob);
            this.lineupUI.dataSource = {lineupGods:info.getLineupGods(),shenqiAry:info.getShenqiAry(),showShenli:true,force:info.svo.force,userLevel:info.svo.level,title:""};
        }
        
        private onExplain():void {
            let info : OreSpotInfoVo = this.dataSource;
            dispatchEvt(new IslandsEvent(IslandsEvent.OPEN_ORE_EXPLAIN,info.tbOre));
        }
        /** 占领 */
        private onOccupy():void {
            dispatchEvt(new IslandsEvent(IslandsEvent.OCCUPY_ORE,this.dataSource));
        }
        /** 掠夺 */
        private onRob():void {
            dispatchEvt(new IslandsEvent(IslandsEvent.ROB_ORE,this.dataSource));
        }
    }
}