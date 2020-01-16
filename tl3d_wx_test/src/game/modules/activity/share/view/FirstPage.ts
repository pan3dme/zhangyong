module game {
    export class FirstPage extends ui.activity.share.firstPageUI {

        private uiScene: Base2dSceneLayer;

        constructor() {
            super();
            this.isModelClose = true;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        private init() {
            this._clickflag = true;
            let tabset = tb.TB_activity_set.getTabSet();
            // this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.btn_recive.on(Laya.Event.CLICK, this, this.onRecive);
            this.list_reward.dataSource = ary2prop(tabset.share_rewrad);
            listAtCenter(this.list_reward, 86, this.list_reward.repeatX, this.list_reward.dataSource.length);
            this.refreshState();
        }

        public onOpened() {
            super.onOpened();
            if (!this.uiScene) {
                this.uiScene = new Base2dSceneLayer();
                this.addChild(this.uiScene);
            }
            this.uiScene.onShow();

            let tabgod = tb.TB_god.get_TB_godById(tb.TB_activity_set.getTabSet().model);
            this.uiScene.addModelChar(String(tabgod.model), 520, 680, 180, 2.3);
        }

        public refreshState() {
            //领取状态
            let isshare: boolean = ShareModel.totalNum() == 1;
            let isreceive: boolean = ShareModel.isReceiveFirst();
            let canreceiveFlag: boolean = isshare && !isreceive;
            this.btn_recive.skin = canreceiveFlag ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_recive.labelStrokeColor = canreceiveFlag ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
            this.btn_recive.label = isreceive ? LanMgr.getLan("",10043) : isshare ? LanMgr.getLan("",10476) : LanMgr.getLan("",12619);
            this.btn_recive.gray = isreceive;
            this.btn_recive.selected = this.btn_recive.gray;
        }

        private _clickflag: boolean;
        private onRecive() {
            if (this._clickflag) {
                this._clickflag = false;
                let isshare: boolean = ShareModel.totalNum() == 1;
                let isreceive: boolean = ShareModel.isReceiveFirst();
                let canreceiveFlag: boolean = isshare && !isreceive;
                if (canreceiveFlag) {
                    //分享完未领取
                    PLC.request(Protocol.game_activity_getFirstShareAward, null, ($data, $msg: string) => {
                        this._clickflag = true;
                        if (!$data) return;
                        App.hero.welfare.doneShares = $data.doneShares;
                        this.refreshState();
                        UIUtil.showRewardView($data.commonData);
                        dispatchEvt(new ShareEvent(ShareEvent.RED_POINT_CHANGE));
                    });
                } else if (!isshare) {
                    //发起邀请
                    if (Number(window.platform.pid) == iface.tb_prop.platformTypeKey.changyu) {
                        BingoSDK.share(LanMgr.getLan("",12617), LanMgr.getLan("",12618), "https://h5.binnet/test/bingo.jpg", (result) => {
                            if (result.code == 0) {
                                this.requestReward();
                            } else {
                                this._clickflag = true;
                                showToast(result.code == -1 ? LanMgr.getLan(``,10231) : LanMgr.getLan(``,10232,result.message,result.showMessage));
                            }
                        });
                    }
                    else {
                        this.requestReward();
                    }
                } else {
                    this._clickflag = true;
                }
            }
        }

        private requestReward(): void {
            //未分享
            PLC.request(Protocol.game_activity_shareSucc, null, ($data, $msg: string) => {
                this._clickflag = true;
                if (!$data) return;
                App.hero.welfare.shareNumTotal = $data.shareNumTotal;
                App.hero.welfare.shareNumToday = $data.shareNumToday;
                ShareModel.shareTime = App.getServerTime();
                this.refreshState();
                dispatchEvt(new ShareEvent(ShareEvent.RED_POINT_CHANGE));
            });
        }

        public close() {
            super.close();
            if (this.uiScene) {
                this.uiScene.onExit();
                this.uiScene = null;
            }
        }

        public onClosed() {
            super.onClosed();
            // this.btn_close.off(Laya.Event.CLICK, this, this.close);
            this.btn_recive.off(Laya.Event.CLICK, this, this.onRecive);
        }

    }
}