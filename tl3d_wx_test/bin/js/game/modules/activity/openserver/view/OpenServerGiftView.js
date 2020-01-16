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
    var OpenServerGiftView = /** @class */ (function (_super) {
        __extends(OpenServerGiftView, _super);
        function OpenServerGiftView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        OpenServerGiftView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
        };
        OpenServerGiftView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
        };
        OpenServerGiftView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.initVo();
            this.btn_close.on(Laya.Event.CLICK, this, this.onClickClose);
            tl3d.ModuleEventManager.addEvent(game.OpenserverEvent.OS_GIFT_CHANGE, this.refreshData, this);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        };
        OpenServerGiftView.prototype.initVo = function () {
            this._curGiftVo = game.OpenserverModel.getInstance().getCurOpenServerGiftVo();
            this.listitem.dataSource = this._curGiftVo ? this._curGiftVo.getGiftList() : [];
        };
        OpenServerGiftView.prototype.refreshData = function () {
            this.listitem.refresh();
        };
        OpenServerGiftView.prototype.updateTime = function () {
            if (this._curGiftVo) {
                var rt = this._curGiftVo.getRemainTime();
                rt = Math.floor(rt);
                this.lab_time.text = LanMgr.getLan("", 12172, this.getTimeStr(rt));
                if (rt <= 0) {
                    this.initVo();
                }
            }
            else {
                this.lab_time.text = "";
                UIMgr.hideUIByName(UIConst.OpenServerGift);
            }
        };
        OpenServerGiftView.prototype.getTimeStr = function (nS) {
            var str = "";
            var day = float2int(nS / TimeUtil.dayTime);
            if (day > 0) {
                nS -= day * TimeUtil.dayTime;
                str += day + LanMgr.getLan("", 10025);
            }
            var hour = float2int(nS / TimeUtil.HourTime);
            if (hour > 0) {
                nS -= hour * TimeUtil.HourTime;
                str += hour + LanMgr.getLan("", 10026);
            }
            if (day > 0)
                return str;
            var minus = float2int(nS / TimeUtil.MinuteTime);
            if (minus > 0) {
                nS -= minus * TimeUtil.MinuteTime;
                str += minus + LanMgr.getLan("", 10027);
            }
            //秒
            // str += nS + "秒";
            return str;
        };
        OpenServerGiftView.prototype.onClickClose = function () {
            UIMgr.hideUIByName(UIConst.OpenServerGift);
        };
        OpenServerGiftView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.timer.clearAll(this);
            this.btn_close.off(Laya.Event.CLICK, this, this.onClickClose);
            tl3d.ModuleEventManager.removeEvent(game.OpenserverEvent.OS_GIFT_CHANGE, this.refreshData, this);
            this._curGiftVo = null;
        };
        OpenServerGiftView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return OpenServerGiftView;
    }(ui.activity.openserver.openServerGiftUI));
    game.OpenServerGiftView = OpenServerGiftView;
})(game || (game = {}));
