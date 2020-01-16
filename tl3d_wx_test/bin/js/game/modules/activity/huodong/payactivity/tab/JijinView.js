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
    var JijinView = /** @class */ (function (_super) {
        __extends(JijinView, _super);
        function JijinView() {
            var _this = _super.call(this) || this;
            _this.initView();
            _this.btn_recharge.on(Laya.Event.CLICK, _this, _this.recharge);
            return _this;
        }
        JijinView.prototype.onAdd = function () {
            var _this = this;
            this.listRender();
            Laya.timer.callLater(this, function () {
                UIUtil.playListEff(_this.list_itemJijin.cells);
            });
            this.ani1.play(0, true);
        };
        JijinView.prototype.onExit = function () {
            this.close();
            this.ani1.stop();
            UIUtil.clearListEff(this.list_itemJijin.cells);
        };
        JijinView.prototype.initView = function () {
            this.setBtnLabel();
            this.listRender();
            var buyCondition = tb.TB_activity_set.getTabSet().level_fund_buy;
            this.lab_vip.text = LanMgr.getLan("VIP{0}可购买", -1, buyCondition[0]);
        };
        JijinView.prototype.setBtnLabel = function () {
            this.list_itemJijin.refresh();
            this.btn_recharge.disabled = App.hero.welfare.buyLevelFund == 1;
            if (this.btn_recharge.disabled) {
                //绿色灰
                this.btn_recharge.skin = "comp/button/btn_qianwang.png";
                this.btn_recharge.labelStrokeColor = "#538901";
                this.btn_recharge.label = LanMgr.getLan("已购买", -1);
            }
            else {
                this.btn_recharge.skin = "comp/button/button.png";
                this.btn_recharge.labelStrokeColor = "#ca7005";
                this.btn_recharge.label = LanMgr.getLan("购买", -1);
            }
            var buyCondition = tb.TB_activity_set.getTabSet().level_fund_buy;
            this.redpoint.visible = App.hero.welfare.buyLevelFund == 0 && App.hero.vip >= buyCondition[0] && App.hero.diamond >= buyCondition[1];
        };
        //排序 可领取 > 未到达 > 已领取
        JijinView.prototype.listRender = function () {
            var arr = tb.TB_level_fund.get_TB_level_fund();
            arr.sort(function (a, b) {
                var aSortNum = App.hero.level >= a.level ? App.hero.welfare.levelFundAward[a.ID] ? a.ID + 1000 : a.ID + 10 : a.ID + 100;
                var bSortNum = App.hero.level >= b.level ? App.hero.welfare.levelFundAward[b.ID] ? b.ID + 1000 : b.ID + 10 : b.ID + 100;
                if (aSortNum > bSortNum) {
                    return 1;
                }
                else if (aSortNum < bSortNum) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            this.list_itemJijin.dataSource = arr;
        };
        JijinView.prototype.recharge = function () {
            var _this = this;
            // sendDispatchEvent(new HuodongEvent(HuodongEvent.RECHARGE_LAVEL_FUND));
            /**购买等级基金 */
            var buyCondition = tb.TB_activity_set.getTabSet().level_fund_buy;
            if (App.hero.vip < buyCondition[0]) {
                showToast(LanMgr.getLan("", 10214, buyCondition[0]));
                return;
            }
            if (App.hero.diamond < buyCondition[1]) {
                showToast(LanMgr.getLan("", 10005));
                return;
            }
            PLC.request(Protocol.game_activity_buyLevelFund, null, function ($data) {
                if (!$data)
                    return;
                App.hero.welfare.buyLevelFund = $data.buyLevelFund;
                _this.setBtnLabel();
            });
        };
        return JijinView;
    }(ui.activity.huodong.welfare.tab.JijinUI));
    game.JijinView = JijinView;
})(game || (game = {}));
