

module game {

    export class TowerGuanqiaView extends ui.tower.GuanqiaViewUI {

        private _tbCopyInfo: tb.TB_copy_info;
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.SLT_GuanqiaView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12127) };
            this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        private initView(): void {
            this._tbCopyInfo = this.dataSource;
            let copyInfo = this._tbCopyInfo;
            this.lbTitle.text = LanMgr.getLan('', 10019) + copyInfo.name;
            let isOpen = true;
            //条件
            let power = copyInfo.getConditionVal(CopyConditionType.power);
            if (App.hero.force < power) {
                this.lab_condition.text = LanMgr.getLan("", 12128, power);
                isOpen = false;
            }else{
                let tbCopy = tb.TB_copy.get_TB_copyById(copyInfo.area);
                let guanka = TowerModel.getInstance().getGuanqiaModelVo(tbCopy.sub_type).getGuanqiaVo(copyInfo.ID);
                if (App.hero.level < guanka.getOpenLevel()) {
                    //等级未达到
                    this.lab_condition.text = LanMgr.getLan("", 12129, guanka.getOpenLevel());
                    isOpen = false;
                }else{
                    this.lab_condition.text = "";
                }
            }
            let list = copyInfo.getRewardItems();
            this.listReward.array = list;
            this.listReward.width = 100 * list.length + (list.length-1) * this.listReward.spaceX;
            let copyType: number = tb.TB_copy.get_TB_copyById(copyInfo.area).type;
            let monsters : tb.TB_monster[] = copyType == iface.tb_prop.copyTypeKey.underground ? copyInfo.getIconMonster() : copyInfo.getIconMonster();
            this.lineupUI.dataSource = {lineupGods:monsters,shenqiAry:[],showShenli:false,title:LanMgr.getLan("", 10020)};
            this.height = isOpen ? 810 : 830;
        }

        public onClosed(): void {
            super.onClosed();
            this._tbCopyInfo = null;
            this.lineupUI.dataSource = null;
            this.listReward.array = null;
        }

        private onChallenge(): void {
            if(!this._tbCopyInfo) return;
            let tbCopy = tb.TB_copy.get_TB_copyById(this._tbCopyInfo.area);
            if (tbCopy.type == iface.tb_prop.copyTypeKey.tower) {
                dispatchEvt(new TowerEvent(TowerEvent.CHALLENGE_GUANQIA, this._tbCopyInfo));
            }
            UIMgr.hideUIByName(UIConst.SLT_GuanqiaView);
        }

        getCopyInfo():tb.TB_copy_info{
            return this._tbCopyInfo || this.dataSource;
        }
    }
}