

module game {
    /** 商队信息界面 */
    export class CaravanInfoView extends ui.escort.CaravanInfoUI {
        constructor() {
            super();
            this.isModelClose = true;
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
            this.btnRob.off(Laya.Event.CLICK,this,this.onRob);
            this.linuepList.array = null;
            this.rewardList.array = null;
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            let info : CaravanInfoVo = this.dataSource;
            this.ui_head.dataSource = new UserHeadVo(info.svo.head, info.svo.level,info.svo.headFrame);
            this.lbName.text = info.svo.name;
            this.lbGuild.text = info.svo.guildName ? info.svo.guildName : LanMgr.getLan("",10063);
            this.lbShenli.text = LanMgr.getLan("",10117,info.svo.force);
            this.linuepList.array = info.getExistGods();
            this.lbRobCnt.text = LanMgr.getLan("", 12434, EscortModel.getInstance().getRobCount());
            this.rewardList.array = info.tbEscort.getRobList();
            this.btnRob.on(Laya.Event.CLICK,this,this.onRob);
            this.bgPanel.dataSource = {uiName:UIConst.CaravanInfoView,closeOnSide:this.isModelClose,title:info.tbEscort.name};
        }

        private onRob():void {
            dispatchEvt(new EscortEvent(EscortEvent.ROBBED_GOODS,this.dataSource));
        }
    }
}