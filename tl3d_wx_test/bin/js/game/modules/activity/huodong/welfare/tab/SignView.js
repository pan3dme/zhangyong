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
    var SignView = /** @class */ (function (_super) {
        __extends(SignView, _super);
        function SignView() {
            var _this = _super.call(this) || this;
            _this.initView();
            _this.btn_sign.on(Laya.Event.CLICK, _this, _this.sign);
            _this.list_totalsign.renderHandler = new Handler(_this, _this.onTotalsign);
            return _this;
        }
        SignView.prototype.onAdd = function () {
            this.initView();
        };
        SignView.prototype.onExit = function () {
            this.close();
        };
        SignView.prototype.initView = function () {
            game.HuodongModel.getInstance().initCanBuQianDate();
            var signData = tb.TB_day_sign.get_TB_day_sign();
            var monthDays = getMonthDays(App.serverTimeSecond);
            signData.length = monthDays;
            var num = game.HuodongModel.getBuqianNum();
            this.list_item.dataSource = signData;
            var totalSign = game.HuodongModel.getTotalSignNum();
            /**设置进度条 */
            var plan = totalSign / monthDays;
            this.progress.value = plan;
            /**补签次数 */
            var value = tb.TB_game_set.get_TB_game_setById(1).add_sign - num;
            this.lab_buqian.text = value + LanMgr.getLan("次", -1);
            /**累计签到 */
            this.lab_totalSign.text = totalSign + "/" + monthDays;
            var today = new Date(App.serverTimeSecond * 1000).getDate();
            /**是否签到 */
            var isSignBool = today == App.hero.welfare.todaySignIn;
            /**是否还有补签次数 */
            var isHaveBuqian = value > 0;
            this.btn_sign.disabled = isSignBool && !isHaveBuqian;
            this.btn_sign.label = isSignBool ? isHaveBuqian ? "\u8865\u7B7E" : "已签到" : "签到";
            this.lab_resetDays.text = (monthDays - today) + LanMgr.getLan("天后重置", -1);
            this.imgcost.visible = this.lbcost.visible = isSignBool && isHaveBuqian;
            this.list_totalsign.dataSource = tb.TB_total_sign.get_TB_total_sign();
            if (this.imgcost.visible) {
                var cost = game.HuodongModel.getSignCost();
                this.imgcost.skin = SkinUtil.getCostSkin(cost[0]);
                this.lbcost.text = "X" + cost[1];
            }
        };
        /**设置一下位置 */
        SignView.prototype.onTotalsign = function (cell, index) {
            var data = cell.dataSource;
            cell.x = this.list_totalsign.width * (data.total_day / 30) - (cell.width / 2);
        };
        //签到请求
        SignView.prototype.sign = function () {
            var _this = this;
            if (game.HuodongModel.isTodaySign()) {
                this.Replacement();
                return;
            }
            PLC.request(Protocol.game_welfare_dailySignIn, null, function ($data, msg) {
                logdebug($data);
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                _this.initView();
            });
        };
        /**补签 */
        SignView.prototype.Replacement = function () {
            var _this = this;
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10494, game.HuodongModel.getSignCost()[1]), confirmCb: function () {
                    PLC.request(Protocol.game_welfare_dailySignInSupply, null, function ($data, msg) {
                        if (!$data)
                            return;
                        _this.initView();
                        UIUtil.showRewardView($data.commonData);
                    });
                }, parm: null
            });
        };
        return SignView;
    }(ui.activity.huodong.welfare.tab.SignUI));
    game.SignView = SignView;
})(game || (game = {}));
