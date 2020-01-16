/**
* name 
*/
module game {
    export class ShareMainIR extends ui.activity.share.mainIRUI {
        constructor() {
            super();
            this.btn_recive.on(Laya.Event.CLICK, this, this.onRecive);
        }

        private onRecive() {
            if (this.btn_recive.gray) {
                //未达成
                showToast(this.btn_recive.label);
            } else {
                dispatchEvt(new ShareEvent(ShareEvent.SEND_RECIVE_REWARD), {id:this._dataSource.id,tabid:this._dataSource.tab.ID});
            }
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: ShareItemVo) {
            if (item) {
                let num = item.tab.type == 1?ShareModel.todayNum():ShareModel.totalNum();
                let canrecive = num >= item.tab.share_num;
                this.list_reward.array = ary2prop(item.tab.reward);
                // this.lab_title.text = LanMgr.getLan(item.tab.desc, -1, item.tab.share_num, num);
                let tempStr = FormatStr(item.tab.desc, [item.tab.share_num, num]);
                let ary =tempStr.split("(");
                this.lab_title.text = ary[0];
                this.lbProgress.text = "(" + ary[1];
                this.lbProgress.color = canrecive?"#40fe00":"#f76768"
                this.btn_recive.skin = canrecive && !item.recive ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
                this.btn_recive.labelStrokeColor = canrecive && !item.recive ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
                this.btn_recive.label = item.recive ? LanMgr.getLan(``,10043) : canrecive ? LanMgr.getLan(``,10476) : LanMgr.getLan(``,11009);
                this.btn_recive.gray = !canrecive || item.recive;
                this.btn_recive.selected = this.btn_recive.gray;
                this.redpoint.setRedPointName("shareActivity" + item.tab.ID);
            } else {
                this.list_reward.array = [];
                this.lab_title.text = "";
                this.btn_recive.skin = null;
                this.redpoint.onDispose();
            }
        }
    }
}
