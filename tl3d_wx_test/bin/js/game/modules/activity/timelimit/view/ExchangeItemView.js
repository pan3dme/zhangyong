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
    var ExchangeItemView = /** @class */ (function (_super) {
        __extends(ExchangeItemView, _super);
        function ExchangeItemView() {
            var _this = _super.call(this) || this;
            /**购买数量 */
            _this._buyNum = 1;
            /**最大可购买数量 */
            _this._buymaxnum = 0;
            /**当前购买总价 */
            _this._buysumMoney = 0;
            return _this;
        }
        ExchangeItemView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.ExchangeItemView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12559) };
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btn_add, this.btn_addTen, this.btn_red, this.btn_redTen, this.are_putin);
            this.btn_buy.on(Laya.Event.CLICK, this, this.buy);
        };
        ExchangeItemView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        ExchangeItemView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        ExchangeItemView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this, type);
        };
        ExchangeItemView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            Laya.timer.clearAll(this);
            this._exchangeData = null;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateView, this);
        };
        ExchangeItemView.prototype.init = function () {
            //初始化数据
            this._exchangeData = this.dataSource;
            // this._consumeNum = this._exchangeData.getOtherInfo()[0][1];//消耗数量
            this.img_type2.visible = this.lab_sum.visible = this.img_bg.visible = this._exchangeData.getOtherInfoLen() == 1;
            var rinfos = this._exchangeData.getRewardInfo(); //兑换物品
            if (this._exchangeData.getOtherInfoLen() == 1) {
                //一兑一
                var iteminfo = this._exchangeData.getOtherInfo()[0]; //消耗
                //货币图标
                this.img_type2.skin = SkinUtil.getExchangeConsume(iteminfo[0]);
            }
            this.lab_rouyu.text = LanMgr.getLan("", 12177) + App.hero.getBagItemNum(rinfos[0][0]);
            var item = new ItemVo(rinfos[0][0], rinfos[0][1]);
            //商品box
            this.itembox.dataSource = item;
            //商品名
            this.lab_name.text = item.getName();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateView, this);
            this.updateView();
        };
        ExchangeItemView.prototype.updateView = function () {
            //购买最大数量根据 （1限购数量，2可购买最大数量，3最大堆叠数量） 的最小值来获取
            this._buymaxnum = this._exchangeData.getChangeNum();
            var hasNum = this._exchangeData.condValue - this._exchangeData.rewardCount;
            //购买数量
            this._buyNum = 1;
            this._counterBar.setInitData(this._buyNum, Math.min(this._buymaxnum, hasNum), this.setBuySumMoney.bind(this));
            //商品名
            this.lab_overplus.text = LanMgr.getLan("", 12602, hasNum);
            this.setBuySumMoney();
        };
        /** 购买总价 */
        ExchangeItemView.prototype.setBuySumMoney = function () {
            this._buyNum = this._counterBar.getCurNum();
            //购买数量文本
            this.are_putin.text = this._buyNum.toString();
            if (this._exchangeData.getOtherInfoLen() == 1) {
                //购买总价
                var iteminfo = this._exchangeData.getOtherInfo()[0]; //消耗
                this._buysumMoney = this._buyNum * iteminfo[1];
                //购买总价文本
                var hasItemNum = App.hero.getBagItemNum(iteminfo[0]);
                this.lab_sum.text = Snums(hasItemNum) + "/" + Snums(this._buysumMoney);
            }
        };
        /** 购买 */
        ExchangeItemView.prototype.buy = function () {
            var _this = this;
            //判断货币是否足够
            if (this._exchangeData.getChangeNum() == 0) {
                showToast(LanMgr.getLan("", 10234));
                return;
            }
            if (this._exchangeData.endtime <= App.getServerTime()) {
                showToast(LanMgr.getLan("", 10224));
                return;
            }
            else if (this._exchangeData.condValue <= this._exchangeData.rewardCount) {
                showToast(LanMgr.getLan("", 10097));
                return;
            }
            var args = {};
            args[Protocol.game_activity_getActivityReward.args.id] = this._exchangeData.id;
            args[Protocol.game_activity_getActivityReward.args.num] = this._buyNum;
            PLC.request(Protocol.game_activity_getActivityReward, args, function ($data, msg) {
                if ($data) {
                    _this._exchangeData.modifyData($data);
                    _this._exchangeData.sort();
                    UIUtil.showRewardView($data.commonData);
                    var tab = tb.TB_operate_activity.get_TB_operate_activityById(_this._exchangeData.id);
                    dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.RED_EVENT), tab.time_index);
                }
                if (UIMgr.hasStage(UIConst.TimeLimitView)) {
                    var timeLimView = UIMgr.getUIByName(UIConst.TimeLimitView);
                    timeLimView.updateList();
                }
                _this.close();
            });
        };
        return ExchangeItemView;
    }(ui.activity.timelimitactivity.ExchangeItemUI));
    game.ExchangeItemView = ExchangeItemView;
})(game || (game = {}));
