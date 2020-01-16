var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /*
    * OnlineProcessor
    */
    var DownloadProcessor = /** @class */ (function (_super) {
        __extends(DownloadProcessor, _super);
        function DownloadProcessor() {
            return _super.call(this) || this;
        }
        DownloadProcessor.prototype.getName = function () {
            return "DownloadProcessor";
        };
        //监听事件
        DownloadProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.DownloadeEvent(game.DownloadeEvent.SEND_RECEIVE_EVENT),
                new game.DownloadeEvent(game.DownloadeEvent.SHOW_WDXZ_VIEW),
                new game.DownloadeEvent(game.DownloadeEvent.DOWNLOAD_WEIDUAN),
            ];
        };
        //处理事件
        DownloadProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.DownloadeEvent) {
                switch (event.type) {
                    case game.DownloadeEvent.SEND_RECEIVE_EVENT:
                        this.sendReceiveEvent(event.data);
                        break;
                    case game.DownloadeEvent.SHOW_WDXZ_VIEW:
                        this.openWeiDuanXiaZaiView();
                        break;
                    case game.DownloadeEvent.DOWNLOAD_WEIDUAN:
                        this.downloadWD();
                        break;
                }
            }
        };
        //领取微端下载礼包
        DownloadProcessor.prototype.sendReceiveEvent = function (data) {
            var _this = this;
            PLC.request(Protocol.game_welfare_getDownloadApkAward, null, function ($data, msg) {
                if (!$data)
                    return;
                App.hero.isReceiveWDXZ = $data.downloadApkAward != 0;
                if ($data.commonData) {
                    UIUtil.showRewardView($data.commonData);
                }
                dispatchEvt(new game.DownloadeEvent(game.DownloadeEvent.RED_CHANGE_EVENT));
                var wdxzv = _this.weiDuanXiaZaiView;
                if (wdxzv)
                    wdxzv.refreshState();
            });
        };
        //打开微端下载界面
        DownloadProcessor.prototype.openWeiDuanXiaZaiView = function () {
            UIMgr.showUI(UIConst.WeiDuanXiaZaiView);
        };
        //下载微端
        DownloadProcessor.prototype.downloadWD = function () {
            BingoSDK.doExtraAction("client", function (result) {
                logyhj("微端下载结果回调");
                // result.code     //0 成功
                // result.message //错误描述
                // result.data.status  // 0: 未认证，1: 认证成年 2：认证未成年
                // result.data.gameTime //玩家游戏时间，目前QQ大厅返回，用于防成迷
                if (result.code == 0) {
                    showToast(LanMgr.getLan('', 10217));
                }
                else {
                    showToast(result.message);
                }
            });
        };
        Object.defineProperty(DownloadProcessor.prototype, "weiDuanXiaZaiView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.WeiDuanXiaZaiView);
            },
            enumerable: true,
            configurable: true
        });
        return DownloadProcessor;
    }(tl3d.Processor));
    game.DownloadProcessor = DownloadProcessor;
})(game || (game = {}));
