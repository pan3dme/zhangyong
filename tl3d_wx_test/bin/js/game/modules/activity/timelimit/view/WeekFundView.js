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
    var WeekFundView = /** @class */ (function (_super) {
        __extends(WeekFundView, _super);
        function WeekFundView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btnList.selectHandler = new Handler(_this, _this.onTabSelect);
            _this.btnList.renderHandler = new Handler(_this, _this.onTabRender);
            _this.bgPanel.dataSource = { uiName: UIConst.WeekFundView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12553) };
            return _this;
        }
        WeekFundView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        WeekFundView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        WeekFundView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            // this.init();
        };
        WeekFundView.prototype.init = function () {
            this.setTab();
            this.onTabSelect(0);
            this.timeTick();
            this.timerLoop(1000, this, this.timeTick);
            this.btn_use.on(Laya.Event.CLICK, this, this.jump);
            this.btn_wenhao.on(Laya.Event.CLICK, this, this.onClickWH);
        };
        WeekFundView.prototype.setTab = function () {
            var items = [];
            var alldata = TableData.getInstance().getTableByName(TableData.tb_fund).data;
            var openTime = App.getOpenServerTime();
            var curTime = App.getServerTime();
            for (var key in alldata) {
                // let endTime: number = openTime + alldata[key].openserver_time * 86400;
                // if (endTime >= curTime) {
                //     items.push(alldata[key]);
                // }
                items.push(alldata[key]);
            }
            this.btnList.repeatX = items.length > 5 ? 5 : items.length;
            this.btnList.dataSource = items;
            this.btnList.centerX = 0;
            this.btnList.anchorX = 0.5;
        };
        WeekFundView.prototype.hasNoReceiveWeekFund = function (id) {
            if (App.hero.welfare.weekFund && App.hero.welfare.weekFund.indexOf(id) != -1) {
                var allreward = tb.TB_fund_reward.getFundListByType(id);
                for (var j = 0; j < allreward.length; j++) {
                    if (App.hero.welfare.weekFundAward.indexOf(allreward[j].ID) == -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        WeekFundView.prototype.onTabSelect = function ($index) {
            this._selectTabNum = $index;
            this.btnList.selectedIndex = $index;
            this.showSelectTab();
        };
        WeekFundView.prototype.onTabRender = function ($cell, $index) {
            $cell.btn_tab.selected = $index == this._selectTabNum;
        };
        WeekFundView.prototype.showSelectTab = function () {
            var fundData = this.btnList.dataSource[this._selectTabNum];
            var isBuy = App.hero.welfare.weekFund.indexOf(fundData.ID) != -1;
            var allreward = tb.TB_fund_reward.getFundListByType(fundData.ID);
            allreward.sort(function (a, b) {
                var sorta = App.hero.welfare.weekFundAward.indexOf(a.ID) == -1 ? a.value : a.value + 1000;
                var sortb = App.hero.welfare.weekFundAward.indexOf(b.ID) == -1 ? b.value : b.value + 1000;
                return sorta - sortb;
            });
            this.list_reward.dataSource = allreward;
            this.btn_use.label = "￥" + fundData.recharge_num;
            this.btn_use.visible = !isBuy;
            if (fundData.ID == 1) {
                this.img_type.skin = "kaifujijin/188.png";
                this.lab_sw_open.visible = false;
                // this.img_type_icon.skin = "kaifujijin/shenmizhaohuanshu.png";
                // this.img_type_icon.x = 148;
                // this.img_type_icon.y = 263;
            }
            else {
                this.img_type.skin = "kaifujijin/288.png";
                this.lab_sw_open.visible = !App.IsSysOpen(ModuleConst.TREASURE);
                // this.img_type_icon.skin = "kaifujijin/wucaishenshi.png";
                // this.img_type_icon.x = 158;
                // this.img_type_icon.y = 278;
            }
        };
        //问好
        WeekFundView.prototype.onClickWH = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20003));
        };
        /**跳转到充值界面 */
        WeekFundView.prototype.jump = function () {
            if (this.btn_use.gray) {
                showToast(LanMgr.getLan("", 10224));
                return;
            }
            var fundData = this.btnList.dataSource[this._selectTabNum];
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                var rechargeitem = tb.TB_recharge.get_TB_rechargeById(fundData.recharge_id);
                game.ChongzhiModel.pay(rechargeitem);
            }
            else {
                this.test(fundData); //模拟充值
            }
        };
        /**
         * 测试购买
         * @param id
         */
        WeekFundView.prototype.test = function (item) {
            var _this = this;
            UIUtil.payDebug(item.recharge_id, null, function () {
                _this.showSelectTab();
            });
        };
        WeekFundView.prototype.timeTick = function () {
            var activity = this.btnList.dataSource[this._selectTabNum];
            var endTime = App.getOpenServerTime() + activity.openserver_time * 86400;
            var curTime = App.getServerTime();
            this.lab_activity_title.x = curTime >= endTime ? 299 : 276;
            if (curTime >= endTime) {
                //结束
                this.clearTimer(this, this.timeTick);
                this.btn_use.gray = true;
                this.btn_use.label = LanMgr.getLan("", 12554);
                this.box_time.visible = false;
                this.lab_activity_title.text = LanMgr.getLan("", 12554);
            }
            else {
                this.btn_use.gray = false;
                this.box_time.visible = true;
                this.lab_activity_title.text = LanMgr.getLan("", 12555);
                this.lab_time.text = activityTime(endTime, curTime);
            }
        };
        WeekFundView.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        WeekFundView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.clearTimer(this, this.timeTick);
            this.btn_use.off(Laya.Event.CLICK, this, this.jump);
            this.btn_wenhao.off(Laya.Event.CLICK, this, this.onClickWH);
        };
        WeekFundView.prototype.getTimeLab = function () {
            var str = "";
            var activity = this.btnList.dataSource[this._selectTabNum];
            var endTime = App.getOpenServerTime() + activity.openserver_time * 86400;
            var rewardTime = endTime;
            if (App.getServerTime() >= endTime) {
                //已结束
                str = LanMgr.getLan("", 10224);
                // if (App.getServerTime() >= rewardTime) {
                //     //已关闭
                //     str = "活动已关闭";
                //     this.clearTimer(this, this.timeTick);
                // } else {
                //     //领取时间
                //     str = "活动已结束（领奖倒计时：" + activityTime(rewardTime, App.getServerTime()) + "）";
                // }
            }
            else {
                //未结束
                str = "" + activityTime(rewardTime, App.getServerTime());
            }
            return str;
        };
        return WeekFundView;
    }(ui.activity.timelimitactivity.WeekFundUI));
    game.WeekFundView = WeekFundView;
})(game || (game = {}));
