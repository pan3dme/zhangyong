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
/*
* name;
*/
var game;
(function (game) {
    var ResModule = /** @class */ (function (_super) {
        __extends(ResModule, _super);
        function ResModule() {
            return _super.call(this) || this;
        }
        ResModule.prototype.getModuleName = function () {
            return "ResModule";
        };
        ResModule.prototype.listProcessors = function () {
            return [new game.ResProcessor()];
        };
        /**
         * 初始化数据
         */
        ResModule.prototype.onRegister = function () {
        };
        return ResModule;
    }(tl3d.Module));
    game.ResModule = ResModule;
    var ResEvent = /** @class */ (function (_super) {
        __extends(ResEvent, _super);
        function ResEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        //货币变化
        ResEvent.RESOURCE_CHANGE = "COINS_CHANGE";
        //道具变化
        ResEvent.PROP_CHANGE = "PROP_CHANGE";
        //限时道具变化
        ResEvent.TIME_PROP_CHANGE = "PROP_CHANGE";
        /** 装备变化 -- 新增删除 */
        ResEvent.EQUIPMENET_CHANGE = "EQUIPMENET_CHANGE";
        /** 角色经验变化 */
        ResEvent.ROLE_EXP_CHANGE = "ROLE_EXP_CHANGE";
        /** 英雄等级变化 */
        ResEvent.GOD_EXP_CHANGE = "GOD_EXP_CHANGE";
        /** 竞技场次数变化 */
        ResEvent.ARENA_NUM_CHANGE = "ARENA_NUM_CHANGE";
        /** 公会捐献变化 */
        ResEvent.GUILE_DONATE_CHANGE = "GUILE_DONATE_CHANGE";
        /** 角色等级变化 */
        ResEvent.ROLE_LEVEL_CHANGE = "ROLE_LEVEL_CHANGE";
        /** 限制类型数值变化 */
        ResEvent.LIMIT_VALUE_CHANGE = "LIMIT_VALUE_CHANGE";
        /** 剩余次数变化 */
        ResEvent.OVERPLUS_VALUE_CHANGE = "OVERPLUS_VALUE_CHANGE";
        /** vip等级变化 */
        ResEvent.VIP_LEVEL_CHANGE = "VIP_LEVEL_CHANGE";
        /** 实名认证结果 */
        ResEvent.ISCERTIFICATION_EVENT = "ISCERTIFICATION_EVENT";
        return ResEvent;
    }(tl3d.BaseEvent));
    game.ResEvent = ResEvent;
})(game || (game = {}));
