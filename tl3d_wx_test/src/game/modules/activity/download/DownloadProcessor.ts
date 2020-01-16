module game {
    /*
    * OnlineProcessor
    */
    export class DownloadProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "DownloadProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new DownloadeEvent(DownloadeEvent.SEND_RECEIVE_EVENT),
                new DownloadeEvent(DownloadeEvent.SHOW_WDXZ_VIEW),
                new DownloadeEvent(DownloadeEvent.DOWNLOAD_WEIDUAN),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof DownloadeEvent) {
                switch (event.type) {
                    case DownloadeEvent.SEND_RECEIVE_EVENT:
                        this.sendReceiveEvent(event.data);
                        break;
                    case DownloadeEvent.SHOW_WDXZ_VIEW:
                        this.openWeiDuanXiaZaiView();
                        break;
                    case DownloadeEvent.DOWNLOAD_WEIDUAN:
                        this.downloadWD();
                        break;
                }
            }
        }

        //领取微端下载礼包
        private sendReceiveEvent(data) {
            PLC.request(Protocol.game_welfare_getDownloadApkAward, null, ($data: any, msg: any) => {
                if (!$data) return;
                App.hero.isReceiveWDXZ = $data.downloadApkAward != 0;
                if ($data.commonData) {
                    UIUtil.showRewardView($data.commonData);
                }
                dispatchEvt(new DownloadeEvent(DownloadeEvent.RED_CHANGE_EVENT));

                let wdxzv = this.weiDuanXiaZaiView;
                if (wdxzv) wdxzv.refreshState();
            });
        }

        //打开微端下载界面
        private openWeiDuanXiaZaiView(): void {
            UIMgr.showUI(UIConst.WeiDuanXiaZaiView);
        }

        //下载微端
        private downloadWD(): void {
            BingoSDK.doExtraAction("client", (result) => {
                logyhj("微端下载结果回调");
                // result.code     //0 成功
                // result.message //错误描述
                // result.data.status  // 0: 未认证，1: 认证成年 2：认证未成年
                // result.data.gameTime //玩家游戏时间，目前QQ大厅返回，用于防成迷
                if (result.code == 0) {
                    showToast(LanMgr.getLan('', 10217));
                } else {
                    showToast(result.message);
                }
            });

        }

        public get weiDuanXiaZaiView(): WeiDuanXiaZaiView {
            return UIMgr.getUIByName(UIConst.WeiDuanXiaZaiView);
        }
    }
}