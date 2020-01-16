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
    var HuodongModule = /** @class */ (function (_super) {
        __extends(HuodongModule, _super);
        function HuodongModule() {
            return _super.call(this) || this;
        }
        HuodongModule.prototype.getModuleName = function () {
            return "HuodongModule";
        };
        HuodongModule.prototype.listProcessors = function () {
            return [new game.HuodongProcessor()];
        };
        /**
         * 初始化数据
         */
        HuodongModule.prototype.onRegister = function () {
            game.HuodongModel.getInstance();
        };
        return HuodongModule;
    }(tl3d.Module));
    game.HuodongModule = HuodongModule;
    var HuodongEvent = /** @class */ (function (_super) {
        __extends(HuodongEvent, _super);
        function HuodongEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**领取事件 */
        HuodongEvent.AWARD_EVENT = "AWARD_EVENT";
        /**打开界面 */
        HuodongEvent.SHOW_HUODONG_PANEL = "SHOW_QIANDAO_PANEL";
        /**许愿成功 */
        HuodongEvent.MAKE_PROMISE_SUCCESS = "MAKE_PROMISE_SUCCESS";
        /**刷新签到界面 */
        HuodongEvent.UPDATE_QIANDAO_PANEL = "UPDATE_QIANDAO_PANEL";
        /**刷新月卡界面 */
        HuodongEvent.REFRESH_YUEKA_PANEL = "REFRESH_YUEKA_PANEL";
        /**抽奖 */
        HuodongEvent.LUCK_DRWA_OPERATION = "LUCK_DRWA_OPERATION";
        /**购买等级基金 */
        HuodongEvent.RECHARGE_LAVEL_FUND = "RECHARGE_LAVEL_FUND";
        /**领取等级基金奖励 */
        HuodongEvent.GET_LEVELFUND_REWARD = "GET_LEVELFUND_REWARD";
        /**领取寻宝额外奖励 */
        HuodongEvent.GET_LUCKEQUIP_REWARD = "GET_LUCKEQUIP_REWARD";
        /**获取转盘记录 */
        HuodongEvent.GET_LUCKY_RECORD = "GET_LUCKY_RECORD";
        /**绑定手机红点 */
        HuodongEvent.BIND_PHONE_EVENT = "BIND_PHONE_EVENT";
        /** 超级vip */
        HuodongEvent.SUPER_VIP_RP = "SUPER_VIP_RP";
        /** 内侧返利 */
        HuodongEvent.TEST_REBATE_RP = "TEST_REBATE_RP";
        /** 幸运转盘神灵幸运值改变 */
        HuodongEvent.LUCK_GOD_VALUE_CHANGE = "LUCK_GOD_VALUE_CHANGE";
        /** 幸运转盘装备幸运值改变 */
        HuodongEvent.LUCK_EQUIP_VALUE_CHANGE = "LUCK_EQUIP_VALUE_CHANGE";
        /** 幸运转盘宝物幸运值改变 */
        HuodongEvent.LUCK_TREASURE_VALUE_CHANGE = "LUCK_TREASURE_VALUE_CHANGE";
        /** 幸运转盘装备奖励领取 */
        HuodongEvent.LUCK_EQUIP_REWARD_CHANGE = "LUCK_EQUIP_REWARD_CHANGE";
        /** 幸运转盘记录改变 */
        HuodongEvent.LUCK_RECORD_CHANGE = "LUCK_RECORD_CHANGE";
        /** 累计登入天数 */
        HuodongEvent.TOTAL_LOGIN_DAY = "TOTAL_LOGIN_DAY";
        /** 登入礼包 */
        HuodongEvent.LOGIN_GIFT_RECEIVE = "LOGIN_GIFT_RECEIVE";
        return HuodongEvent;
    }(tl3d.BaseEvent));
    game.HuodongEvent = HuodongEvent;
})(game || (game = {}));
