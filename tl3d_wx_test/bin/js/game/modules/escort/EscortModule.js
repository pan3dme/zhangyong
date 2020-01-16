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
    var EscortModule = /** @class */ (function (_super) {
        __extends(EscortModule, _super);
        function EscortModule() {
            return _super.call(this) || this;
        }
        EscortModule.prototype.getModuleName = function () {
            return "CaravanEscortModule";
        };
        EscortModule.prototype.listProcessors = function () {
            return [new game.EscortProcessor()];
        };
        /**
         * 初始化数据
         */
        EscortModule.prototype.onRegister = function () {
            game.EscortModel.getInstance().initModel();
        };
        return EscortModule;
    }(tl3d.Module));
    game.EscortModule = EscortModule;
    var EscortEvent = /** @class */ (function (_super) {
        __extends(EscortEvent, _super);
        function EscortEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开护送主场景 */
        EscortEvent.SHOW_MAIN_VIEW = "SHOW_MAIN_VIEW";
        /** 打开商队信息界面 */
        EscortEvent.SHOW_CARAVAN_INFO_VIEW = "SHOW_CARAVAN_INFO_VIEW";
        /** 打开护送物品界面 */
        EscortEvent.SHOW_ESCORT_GOODS_VIEW = "SHOW_ESCORT_GOODS_VIEW";
        /** 打开规则界面 */
        EscortEvent.SHOW_RULE_VIEW = "SHOW_RULE_VIEW";
        /** 打开记录界面 */
        EscortEvent.SHOW_RECORD_VIEW = "SHOW_RECORD_VIEW";
        /** 掠夺货物 */
        EscortEvent.ROBBED_GOODS = "ROBBED_GOODS";
        /** 快速完成 */
        EscortEvent.QUICK_FINISH = "QUICK_FINISH";
        /** 刷新货物 */
        EscortEvent.REFRESH_GOODS = "REFRESH_GOODS";
        /** 一键刷橙 */
        EscortEvent.ONEKEY_REFRESH_GOODS = "ONEKEY_REFRESH_GOODS";
        /** 护送货物 */
        EscortEvent.ESCORT_GOODS = "ESCORT_GOODS";
        /** 领取奖励 */
        EscortEvent.RECEIVE_AWARD = "RECEIVE_AWARD";
        /** 刷新成功 */
        EscortEvent.REFRESH_GOODS_SUCCESS = "REFRESH_GOODS_SUCCESS";
        /** 护送成功 */
        EscortEvent.ESCORT_GOODS_SUCCESS = "ESCORT_GOODS_SUCCESS";
        /** 更新自己信息 */
        EscortEvent.UPDATE_SELF_INFO = "UPDATE_SELF_INFO";
        /** 更新记录红点 */
        EscortEvent.UPDATE_RECORD_RP = "UPDATE_RECORD_RP";
        /** 更新奖励红点 */
        EscortEvent.UPDATE_REWARD_RP = "UPDATE_REWARD_RP";
        /** 动画结束 */
        EscortEvent.ANIMATION_END = "ANIMATION_END";
        return EscortEvent;
    }(tl3d.BaseEvent));
    game.EscortEvent = EscortEvent;
})(game || (game = {}));
