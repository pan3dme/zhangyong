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
    var FundRewardIR = /** @class */ (function (_super) {
        __extends(FundRewardIR, _super);
        function FundRewardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(FundRewardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        FundRewardIR.prototype.refreshData = function (item) {
            if (item) {
                this.visible = true;
                this.itemList.dataSource = ary2prop(item.reward);
                this.lbday.text = LanMgr.getLan("", 12610, item.value);
                var param = 0;
                var receive = App.hero.welfare.weekFundAward.indexOf(item.ID) != -1;
                if (receive) {
                    //已领取
                    param = 2;
                    // this.btn_receive.label = "已领取";
                    // this.btn_receive.disabled = true;
                    this.btn_receive.visible = false;
                    this.img_hasreceive.visible = true;
                }
                else if (App.getServerTime() > App.getOpenServerTime() + (item.value - 1) * 86400) {
                    //可领取
                    param = 1;
                    this.btn_receive.label = LanMgr.getLan("", 10476);
                    this.btn_receive.gray = false;
                    this.btn_receive.visible = true;
                    this.img_hasreceive.visible = false;
                }
                else {
                    //未达到
                    param = 0;
                    this.btn_receive.label = LanMgr.getLan("", 10090);
                    this.btn_receive.gray = true;
                    this.btn_receive.visible = true;
                    this.img_hasreceive.visible = false;
                }
                this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive, [param]);
                this.img_hasreceive.on(Laya.Event.CLICK, this, this.onClickReceive, [param]);
            }
            else {
                this.visible = false;
                this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
                this.img_hasreceive.off(Laya.Event.CLICK, this, this.onClickReceive);
            }
        };
        FundRewardIR.prototype.onClickReceive = function (param) {
            var _this = this;
            if (param == 1) {
                //先判断是否购买
                if (App.hero.welfare.weekFund.indexOf(this._dataSource.type) == -1) {
                    //未购买
                    showToast(LanMgr.getLan("", 10235));
                    return;
                }
                var args = {};
                args[Protocol.game_welfare_getWeekFundAward.args.id] = this._dataSource.ID;
                PLC.request(Protocol.game_welfare_getWeekFundAward, args, function ($data, $msg) {
                    if (!$data)
                        return;
                    UIUtil.showRewardView($data.commonData);
                    _this.refreshData(_this._dataSource);
                });
            }
            else if (param == 0) {
                showToast(LanMgr.getLan("", 10236));
            }
            else {
                showToast(LanMgr.getLan("", 10220));
            }
        };
        return FundRewardIR;
    }(ui.activity.timelimitactivity.JiJinIRUI));
    game.FundRewardIR = FundRewardIR;
})(game || (game = {}));
