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
var common;
(function (common) {
    /** 购买战斗次数 */
    var BuyBattleCountView = /** @class */ (function (_super) {
        __extends(BuyBattleCountView, _super);
        function BuyBattleCountView() {
            var _this = _super.call(this) || this;
            /**购买数量 */
            _this._buyNum = 1;
            /**最大可购买数量 */
            _this._buymaxnum = 0;
            /**当前购买总价 */
            _this._buysumMoney = 0;
            _this._type = 0;
            _this._callback = null;
            return _this;
        }
        BuyBattleCountView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.BuyBattleCount, closeOnSide: this.isModelClose, title: "购买次数" };
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btn_add, this.btn_addTen, this.btn_red, this.btn_redTen, this.are_putin);
        };
        BuyBattleCountView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        BuyBattleCountView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        BuyBattleCountView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            this.btnYes.off(Laya.Event.CLICK, this, this.buy);
            this.btnNot.off(Laya.Event.CLICK, this, this.close);
        };
        BuyBattleCountView.prototype.initView = function () {
            // 原因： 因为EffectList的层级问题，这边要比EffectList的层级高
            this.zOrder = UI_DEPATH_VALUE.TOP + 2;
            this.btnYes.on(Laya.Event.CLICK, this, this.buy);
            this.btnNot.on(Laya.Event.CLICK, this, this.close);
            this._type = this.dataSource.type;
            this._callback = this.dataSource.callback;
            this._buymaxnum = this.getMaxNum();
            if (this._buymaxnum <= 0) {
                if (App.hero.vip >= tb.TB_vip.getMaxVip()) {
                    showToast(LanMgr.getLan("", 10360));
                }
                else {
                    showToast(LanMgr.getLan("", 10361));
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL), [1]);
                }
                this.close();
                return;
            }
            //购买数量
            this._buyNum = 1;
            this._counterBar.setInitData(this._buyNum, this._buymaxnum, this.setBuySumMoney.bind(this));
            this.setBuySumMoney();
            this.lab_remain.text = LanMgr.getLan("（剩余购买次数：{0}次）", -1, this._buymaxnum);
        };
        /** 购买总价 */
        BuyBattleCountView.prototype.setBuySumMoney = function () {
            this._buyNum = this._counterBar.getCurNum();
            //购买数量文本
            this.are_putin.text = this._buyNum.toString();
            //购买总价
            this._buysumMoney = this.getConsume(this._buyNum);
            //购买总价文本
            this.lab_consume.text = "X" + Snums(this._buysumMoney);
            this.lab_content0.text = LanMgr.getLan(this.getContent0(), -1, this._buysumMoney);
            this.lab_content1.text = LanMgr.getLan(this.getContent1(), -1, this._buyNum);
            this.img_gem.x = this.lab_content0.width + 5;
            this.lab_content1.x = this.img_gem.x + this.img_gem.width + 5;
        };
        BuyBattleCountView.prototype.getContent0 = function () {
            switch (this._type) {
                case BuyBattleCountView.TYPE_ARENA:
                    return "确定要花费{0}";
                default:
                    return "是否花费{0}";
            }
        };
        BuyBattleCountView.prototype.getContent1 = function () {
            switch (this._type) {
                case BuyBattleCountView.TYPE_GODDOMAIN:
                case BuyBattleCountView.TYPE_ARENA:
                    return "购买{0}次奖励次数";
                default:
                    return "购买{0}次挑战次数";
            }
        };
        /** 购买 */
        BuyBattleCountView.prototype.buy = function () {
            if (this._buysumMoney > App.hero.diamond) {
                showToast(LanMgr.getLan("", 10005));
                dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                this.close();
                return;
            }
            if (this._callback) {
                this._callback(this._buyNum);
            }
            this.close();
        };
        BuyBattleCountView.prototype.getMaxNum = function () {
            var viptype = 0;
            var limittype = 0;
            switch (this._type) {
                case BuyBattleCountView.TYPE_ARENA:
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum;
                    limittype = iface.tb_prop.limitTypeKey.buyArenaNum;
                    break;
                case BuyBattleCountView.TYPE_BOSS:
                    limittype = iface.tb_prop.limitTypeKey.buyWorldBossNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.worldBossNum;
                    break;
                case BuyBattleCountView.TYPE_MATCH:
                    limittype = iface.tb_prop.limitTypeKey.buyMatchNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum;
                    break;
                case BuyBattleCountView.TYPE_GODDOMAIN:
                    limittype = iface.tb_prop.limitTypeKey.buyGodDmRewardNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum;
                    break;
                case BuyBattleCountView.TYPE_GUILDCOPY:
                    limittype = iface.tb_prop.limitTypeKey.buyGuildCopyNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_DAILYCOPY_ONE:
                    limittype = iface.tb_prop.limitTypeKey.buyDailyCopyNum1;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_DAILYCOPY_TWO:
                    limittype = iface.tb_prop.limitTypeKey.buyDailyCopyNum2;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_DAILYCOPY_THREE:
                    limittype = iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_MINEROB:
                    return tb.TB_island_set.getSet().buy_max - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum);
            }
            var count = App.hero.baseAddVipNum(viptype) - App.hero.getlimitValue(limittype);
            return count;
        };
        BuyBattleCountView.prototype.getConsume = function (num) {
            var costAry;
            var count;
            switch (this._type) {
                case BuyBattleCountView.TYPE_ARENA:
                    var temp = tb.TB_arena_new_set.getArenaNewSet();
                    var limitNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyArenaNum);
                    return this.getLeiJI(num, limitNum, temp.buy_cost);
                case BuyBattleCountView.TYPE_BOSS:
                    return tb.TB_boss_set.getSet().buy_cost * num;
                case BuyBattleCountView.TYPE_MATCH:
                    return tb.TB_match_set.getSet().buy_cost * num;
                case BuyBattleCountView.TYPE_GODDOMAIN:
                    var set = tb.TB_fight_goddomain_set.getSet();
                    costAry = set.buy_cost;
                    count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGodDmRewardNum);
                    return this.getLeiJI(num, count, costAry);
                case BuyBattleCountView.TYPE_GUILDCOPY:
                    var guildset = tb.TB_guild_set.getSet();
                    costAry = guildset.buy_cost;
                    count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
                    return this.getLeiJI(num, count, costAry);
                case BuyBattleCountView.TYPE_DAILYCOPY_ONE:
                case BuyBattleCountView.TYPE_DAILYCOPY_TWO:
                case BuyBattleCountView.TYPE_DAILYCOPY_THREE:
                    var copyset = tb.TB_copy_set.getCopySet();
                    costAry = copyset.daily_copy_cost;
                    var limittype = this._type == BuyBattleCountView.TYPE_DAILYCOPY_ONE ? iface.tb_prop.limitTypeKey.buyDailyCopyNum1 : this._type == BuyBattleCountView.TYPE_DAILYCOPY_TWO ? iface.tb_prop.limitTypeKey.buyDailyCopyNum2 : iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
                    count = App.hero.getlimitValue(limittype);
                    return this.getLeiJI(num, count, costAry);
                case BuyBattleCountView.TYPE_MINEROB:
                    var islandset = tb.TB_island_set.getSet();
                    costAry = islandset.buy_cost;
                    count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum);
                    return this.getLeiJI(num, count, costAry);
            }
            return 0;
        };
        BuyBattleCountView.prototype.getLeiJI = function (num, index, costAry) {
            var totalcost = 0;
            for (var i = 0; i < num; i++) {
                if (index + i >= costAry.length) {
                    totalcost += costAry[costAry.length - 1];
                }
                else {
                    totalcost += costAry[index + i];
                }
            }
            return totalcost;
        };
        BuyBattleCountView.TYPE_ARENA = 0; //竞技场购买次数
        BuyBattleCountView.TYPE_BOSS = 1; //世界boss购买次数
        BuyBattleCountView.TYPE_MATCH = 2; //匹配赛购买次数
        BuyBattleCountView.TYPE_GODDOMAIN = 3; //激战神域
        BuyBattleCountView.TYPE_GUILDCOPY = 4; //公会副本
        BuyBattleCountView.TYPE_DAILYCOPY_ONE = 5; //每日试炼副本
        BuyBattleCountView.TYPE_DAILYCOPY_TWO = 6; //每日试炼副本
        BuyBattleCountView.TYPE_DAILYCOPY_THREE = 7; //每日试炼副本
        BuyBattleCountView.TYPE_MINEROB = 8; //矿点
        return BuyBattleCountView;
    }(ui.component.BuyBattleCountUI));
    common.BuyBattleCountView = BuyBattleCountView;
})(common || (common = {}));
