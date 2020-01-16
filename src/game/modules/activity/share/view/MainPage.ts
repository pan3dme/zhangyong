module game {
    export class ShareMainPage extends ui.activity.share.mainPageUI {
        constructor() {
            super();
            this.isModelClose = true;
            this._sharecd = tb.TB_activity_set.getTabSet().share_cd;
        }

        private _sharecd: number;
        private _canOpt: boolean;

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        private init() {
            this.bgPanel.dataSource = { uiName: UIConst.MainShare, closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12616) };
            this.btn_invite.on(Laya.Event.CLICK, this, this.onInvite);
            this.list_item.array = ShareModel.getInstance().getItemList();
            this.cdLoop();
        }

        private cdLoop() {
            let curtime = App.getServerTime();
            let differ = curtime - ShareModel.shareTime;
            this._canOpt = differ >= this._sharecd;
            if (differ < this._sharecd) {
                this.onCdChange();
                this.lab_cd.timerLoop(1000, this, this.onCdChange);
            }
        }

        private onCdChange() {
            let differ = App.getServerTime() - ShareModel.shareTime;
            if (differ > this._sharecd) {
                this._canOpt = true;
                this.lab_cd.clearTimer(this, this.onCdChange);
                this.lab_cd.text = "";
            } else {
                this.lab_cd.text = "CD:" + (Math.floor(this._sharecd - differ));
            }
        }

        private onInvite() {
            //cd判断
            if (!this._canOpt) {
                showToast(LanMgr.getLan("", 11008));
                return;
            }
            //发起邀请
            if (Number(window.platform.pid) == iface.tb_prop.platformTypeKey.changyu) {12618
                BingoSDK.share(LanMgr.getLan("",12617), LanMgr.getLan("",12618), "https://h5.binnet/test/bingo.jpg", (result) => {
                    if (result.code == 0) {
                        this.requestReward();
                    } else {
                        showToast(result.code == -1 ? LanMgr.getLan(``,10231) : LanMgr.getLan(``,10232,result.message,result.showMessage));
                    }
                });
            }
            else {
                this.requestReward();
            }
        }

        private requestReward(): void  {

            //分享成功刷新倒计时
            ShareModel.shareTime = App.getServerTime();
            this._canOpt = false;
            this.onCdChange();
            this.lab_cd.timerLoop(1000, this, this.onCdChange);

            PLC.request(Protocol.game_activity_shareSucc, null, ($data, $msg: string) => {
                if (!$data) return;
                App.hero.welfare.shareNumTotal = $data.shareNumTotal;
                App.hero.welfare.shareNumToday = $data.shareNumToday;
                //刷新列表
                this.list_item.refresh();
                dispatchEvt(new ShareEvent(ShareEvent.RED_POINT_CHANGE));
            });
        }

        public updateItem(id: number) {
            let itemvo: ShareItemVo = this.list_item.array[id];
            if (id == itemvo.id) {
                itemvo.recive = ShareModel.receiveState(itemvo.tab.ID);
                this.list_item.setItem(id, itemvo);
            }
        }

        public onClosed() {
            super.onClosed();
            this.btn_invite.off(Laya.Event.CLICK, this, this.onInvite);
            this.lab_cd.clearTimer(this, this.onCdChange);
            this.lab_cd.text = "";
            this.list_item.array = [];
            this.bgPanel.dataSource = null;
        }
    }
}