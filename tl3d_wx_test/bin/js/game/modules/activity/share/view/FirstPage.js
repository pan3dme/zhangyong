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
    var FirstPage = /** @class */ (function (_super) {
        __extends(FirstPage, _super);
        function FirstPage() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        FirstPage.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        FirstPage.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        FirstPage.prototype.init = function () {
            this._clickflag = true;
            var tabset = tb.TB_activity_set.getTabSet();
            // this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.btn_recive.on(Laya.Event.CLICK, this, this.onRecive);
            this.list_reward.dataSource = ary2prop(tabset.share_rewrad);
            listAtCenter(this.list_reward, 86, this.list_reward.repeatX, this.list_reward.dataSource.length);
            this.refreshState();
        };
        FirstPage.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            if (!this.uiScene) {
                this.uiScene = new Base2dSceneLayer();
                this.addChild(this.uiScene);
            }
            this.uiScene.onShow();
            var tabgod = tb.TB_god.get_TB_godById(tb.TB_activity_set.getTabSet().model);
            this.uiScene.addModelChar(String(tabgod.model), 520, 680, 180, 2.3);
        };
        FirstPage.prototype.refreshState = function () {
            //领取状态
            var isshare = game.ShareModel.totalNum() == 1;
            var isreceive = game.ShareModel.isReceiveFirst();
            var canreceiveFlag = isshare && !isreceive;
            this.btn_recive.skin = canreceiveFlag ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_recive.labelStrokeColor = canreceiveFlag ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
            this.btn_recive.label = isreceive ? LanMgr.getLan("", 10043) : isshare ? LanMgr.getLan("", 10476) : LanMgr.getLan("", 12619);
            this.btn_recive.gray = isreceive;
            this.btn_recive.selected = this.btn_recive.gray;
        };
        FirstPage.prototype.onRecive = function () {
            var _this = this;
            if (this._clickflag) {
                this._clickflag = false;
                var isshare = game.ShareModel.totalNum() == 1;
                var isreceive = game.ShareModel.isReceiveFirst();
                var canreceiveFlag = isshare && !isreceive;
                if (canreceiveFlag) {
                    //分享完未领取
                    PLC.request(Protocol.game_activity_getFirstShareAward, null, function ($data, $msg) {
                        _this._clickflag = true;
                        if (!$data)
                            return;
                        App.hero.welfare.doneShares = $data.doneShares;
                        _this.refreshState();
                        UIUtil.showRewardView($data.commonData);
                        dispatchEvt(new game.ShareEvent(game.ShareEvent.RED_POINT_CHANGE));
                    });
                }
                else if (!isshare) {
                    //发起邀请
                    if (Number(window.platform.pid) == iface.tb_prop.platformTypeKey.changyu) {
                        BingoSDK.share(LanMgr.getLan("", 12617), LanMgr.getLan("", 12618), "https://h5.binnet/test/bingo.jpg", function (result) {
                            if (result.code == 0) {
                                _this.requestReward();
                            }
                            else {
                                _this._clickflag = true;
                                showToast(result.code == -1 ? LanMgr.getLan("", 10231) : LanMgr.getLan("", 10232, result.message, result.showMessage));
                            }
                        });
                    }
                    else {
                        this.requestReward();
                    }
                }
                else {
                    this._clickflag = true;
                }
            }
        };
        FirstPage.prototype.requestReward = function () {
            var _this = this;
            //未分享
            PLC.request(Protocol.game_activity_shareSucc, null, function ($data, $msg) {
                _this._clickflag = true;
                if (!$data)
                    return;
                App.hero.welfare.shareNumTotal = $data.shareNumTotal;
                App.hero.welfare.shareNumToday = $data.shareNumToday;
                game.ShareModel.shareTime = App.getServerTime();
                _this.refreshState();
                dispatchEvt(new game.ShareEvent(game.ShareEvent.RED_POINT_CHANGE));
            });
        };
        FirstPage.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.uiScene) {
                this.uiScene.onExit();
                this.uiScene = null;
            }
        };
        FirstPage.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            // this.btn_close.off(Laya.Event.CLICK, this, this.close);
            this.btn_recive.off(Laya.Event.CLICK, this, this.onRecive);
        };
        return FirstPage;
    }(ui.activity.share.firstPageUI));
    game.FirstPage = FirstPage;
})(game || (game = {}));
