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
    var WeiDuanXiaZaiView = /** @class */ (function (_super) {
        __extends(WeiDuanXiaZaiView, _super);
        function WeiDuanXiaZaiView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        WeiDuanXiaZaiView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        WeiDuanXiaZaiView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        WeiDuanXiaZaiView.prototype.init = function () {
            this.btn_download.on(Laya.Event.CLICK, this, this.onDownload);
            this.btnClose.on(Laya.Event.CLICK, this, this.onExit);
            var tabset = tb.TB_activity_set.getTabSet();
            this.itemlists.dataSource = ary2prop(tabset.micro_download_reward);
            listAtCenter(this.itemlists, 244, this.itemlists.repeatX, this.itemlists.dataSource.length);
            this.refreshState();
        };
        WeiDuanXiaZaiView.prototype.refreshState = function () {
            //领取状态
            var isDownload = App.hero.downClient == 1;
            var isReceive = App.hero.isReceiveWDXZ;
            if (!isDownload) {
                //不是微端进来的，显示下载
                this.btn_download.disabled = false;
                this.btn_download.label = "立即下载";
                this.btn_download.skin = "comp/button/btn_dengluyouxi.png";
                this.btn_download.labelStrokeColor = "#ca7005";
            }
            else if (!isReceive) {
                //还没领取，显示领取
                this.btn_download.disabled = false;
                this.btn_download.label = "领取";
                this.btn_download.skin = "comp/button/btn_qianwang.png";
                this.btn_download.labelStrokeColor = "#2f7806";
            }
            else {
                this.btn_download.disabled = true;
                this.btn_download.label = "已领取";
            }
        };
        //下载
        WeiDuanXiaZaiView.prototype.onDownload = function () {
            if (App.hero.downClient == 0) {
                dispatchEvt(new game.DownloadeEvent(game.DownloadeEvent.DOWNLOAD_WEIDUAN));
            }
            else if (!App.hero.isReceiveWDXZ) {
                dispatchEvt(new game.DownloadeEvent(game.DownloadeEvent.SEND_RECEIVE_EVENT));
            }
        };
        WeiDuanXiaZaiView.prototype.onExit = function () {
            UIMgr.hideUIByName(UIConst.WeiDuanXiaZaiView);
        };
        WeiDuanXiaZaiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btn_download.off(Laya.Event.CLICK, this, this.onDownload);
            this.btnClose.off(Laya.Event.CLICK, this, this.onExit);
        };
        return WeiDuanXiaZaiView;
    }(ui.activity.download.WeiDuanXiaZaiViewUI));
    game.WeiDuanXiaZaiView = WeiDuanXiaZaiView;
})(game || (game = {}));
