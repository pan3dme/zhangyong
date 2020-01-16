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
/**
* name
*/
var game;
(function (game) {
    var XiangouLibaoView = /** @class */ (function (_super) {
        __extends(XiangouLibaoView, _super);
        function XiangouLibaoView() {
            return _super.call(this) || this;
        }
        XiangouLibaoView.prototype.onEnter = function (type) {
            var _this = this;
            this._curType = type;
            this.initView();
            Laya.timer.callLater(this, function () {
                UIUtil.playListEff(_this.listLibao.cells);
            });
        };
        XiangouLibaoView.prototype.onExit = function () {
            this.close();
            UIUtil.clearListEff(this.listLibao.cells);
        };
        XiangouLibaoView.prototype.close = function () {
            this._curType = 0;
            Laya.timer.clearAll(this);
        };
        XiangouLibaoView.prototype.initView = function () {
            if ([game.WelfareType.dayLibao, game.WelfareType.weekLibao, game.WelfareType.monthLibao].indexOf(this._curType) == -1)
                return;
            var dataAry = [];
            var date = new Date();
            date.setTime(App.serverTime);
            if (this._curType == game.WelfareType.dayLibao) {
                dataAry = tb.TB_daily_recharge.getAllTB();
                date.setDate(date.getDate() + 1);
                date.setHours(0, 0, 0, 0);
                this._endTime = date.getTime() / 1000;
            }
            else if (this._curType == game.WelfareType.weekLibao) {
                dataAry = tb.TB_week_recharge.getAllTB();
                var week = date.getDay();
                var addDay = week == WeekNum.Sun ? 1 : (7 - week + 1);
                date.setDate(date.getDate() + addDay);
                date.setHours(0, 0, 0, 0);
                this._endTime = date.getTime() / 1000;
            }
            else if (this._curType == game.WelfareType.monthLibao) {
                dataAry = tb.TB_month_recharge.getAllTB();
                date.setMonth(date.getMonth() + 1);
                date.setDate(1);
                date.setHours(0, 0, 0, 0);
                this._endTime = date.getTime() / 1000;
            }
            this.listLibao.array = dataAry;
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        };
        XiangouLibaoView.prototype.updateTime = function () {
            var time = Math.ceil(this._endTime - App.serverTimeSecond);
            if (time > 0) {
                var day = Math.floor(time / TimeConst.ONE_DAY_SEC);
                time = time - day * TimeConst.ONE_DAY_SEC;
                var hours = Math.floor(time / TimeConst.ONE_HOURS_SEC);
                time = time - hours * TimeConst.ONE_HOURS_SEC;
                var mini = Math.ceil(time / 60);
                this.lbTime.text = day > 0 ? "\u5012\u8BA1\u65F6\uFF1A" + day + "\u5929" + hours + "\u65F6" : "\u5012\u8BA1\u65F6\uFF1A" + hours + "\u65F6" + mini + "\u5206";
            }
            else {
                this.lbTime.text = "\u5012\u8BA1\u65F6\uFF1A0\u65F60\u5206";
                Laya.timer.clearAll(this);
            }
            this.img_time.x = this.lbTime.x - 25;
        };
        return XiangouLibaoView;
    }(ui.activity.huodong.welfare.tab.XianGouLibaoUI));
    game.XiangouLibaoView = XiangouLibaoView;
})(game || (game = {}));
