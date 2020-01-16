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
    var ShareMainPage = /** @class */ (function (_super) {
        __extends(ShareMainPage, _super);
        function ShareMainPage() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this._sharecd = tb.TB_activity_set.getTabSet().share_cd;
            return _this;
        }
        ShareMainPage.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        ShareMainPage.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        ShareMainPage.prototype.init = function () {
            this.bgPanel.dataSource = { uiName: UIConst.MainShare, closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12616) };
            this.btn_invite.on(Laya.Event.CLICK, this, this.onInvite);
            this.list_item.array = game.ShareModel.getInstance().getItemList();
            this.cdLoop();
        };
        ShareMainPage.prototype.cdLoop = function () {
            var curtime = App.getServerTime();
            var differ = curtime - game.ShareModel.shareTime;
            this._canOpt = differ >= this._sharecd;
            if (differ < this._sharecd) {
                this.onCdChange();
                this.lab_cd.timerLoop(1000, this, this.onCdChange);
            }
        };
        ShareMainPage.prototype.onCdChange = function () {
            var differ = App.getServerTime() - game.ShareModel.shareTime;
            if (differ > this._sharecd) {
                this._canOpt = true;
                this.lab_cd.clearTimer(this, this.onCdChange);
                this.lab_cd.text = "";
            }
            else {
                this.lab_cd.text = "CD:" + (Math.floor(this._sharecd - differ));
            }
        };
        ShareMainPage.prototype.onInvite = function () {
            var _this = this;
            //cd判断
            if (!this._canOpt) {
                showToast(LanMgr.getLan("", 11008));
                return;
            }
            //发起邀请
            if (Number(window.platform.pid) == iface.tb_prop.platformTypeKey.changyu) {
                12618;
                BingoSDK.share(LanMgr.getLan("", 12617), LanMgr.getLan("", 12618), "https://h5.binnet/test/bingo.jpg", function (result) {
                    if (result.code == 0) {
                        _this.requestReward();
                    }
                    else {
                        showToast(result.code == -1 ? LanMgr.getLan("", 10231) : LanMgr.getLan("", 10232, result.message, result.showMessage));
                    }
                });
            }
            else {
                this.requestReward();
            }
        };
        ShareMainPage.prototype.requestReward = function () {
            var _this = this;
            //分享成功刷新倒计时
            game.ShareModel.shareTime = App.getServerTime();
            this._canOpt = false;
            this.onCdChange();
            this.lab_cd.timerLoop(1000, this, this.onCdChange);
            PLC.request(Protocol.game_activity_shareSucc, null, function ($data, $msg) {
                if (!$data)
                    return;
                App.hero.welfare.shareNumTotal = $data.shareNumTotal;
                App.hero.welfare.shareNumToday = $data.shareNumToday;
                //刷新列表
                _this.list_item.refresh();
                dispatchEvt(new game.ShareEvent(game.ShareEvent.RED_POINT_CHANGE));
            });
        };
        ShareMainPage.prototype.updateItem = function (id) {
            var itemvo = this.list_item.array[id];
            if (id == itemvo.id) {
                itemvo.recive = game.ShareModel.receiveState(itemvo.tab.ID);
                this.list_item.setItem(id, itemvo);
            }
        };
        ShareMainPage.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btn_invite.off(Laya.Event.CLICK, this, this.onInvite);
            this.lab_cd.clearTimer(this, this.onCdChange);
            this.lab_cd.text = "";
            this.list_item.array = [];
            this.bgPanel.dataSource = null;
        };
        return ShareMainPage;
    }(ui.activity.share.mainPageUI));
    game.ShareMainPage = ShareMainPage;
})(game || (game = {}));
