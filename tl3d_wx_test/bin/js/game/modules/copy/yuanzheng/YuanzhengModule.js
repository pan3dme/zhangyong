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
    var YuanzhengModule = /** @class */ (function (_super) {
        __extends(YuanzhengModule, _super);
        function YuanzhengModule() {
            return _super.call(this) || this;
        }
        YuanzhengModule.prototype.getModuleName = function () {
            return "YuanzhengModule";
        };
        YuanzhengModule.prototype.listProcessors = function () {
            return [new game.YuanzhengProcessor()];
        };
        /**
         * 初始化数据
         */
        YuanzhengModule.prototype.onRegister = function () {
            game.YuanzhengModel.getInstance().initModel();
        };
        return YuanzhengModule;
    }(tl3d.Module));
    game.YuanzhengModule = YuanzhengModule;
    var YuanzhengEvent = /** @class */ (function (_super) {
        __extends(YuanzhengEvent, _super);
        function YuanzhengEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        YuanzhengEvent.SHOW_MAIN_VIEW = "SHOW_MAIN_VIEW";
        /** 展示回复血量或者复活界面 */
        YuanzhengEvent.SHOW_RECOVERY_VIEW = "SHOW_RECOVERY_VIEW";
        /** 展示关卡挑战信息界面 */
        YuanzhengEvent.SHOW_CHALLENGE_VIEW = "SHOW_CHALLENGE_VIEW";
        /** 展示远征商店 */
        YuanzhengEvent.SHOW_SHOP_VIEW = "SHOW_YAUNZHENG_SHOP_VIEW";
        /** 前往设置阵容-展示布阵界面 */
        YuanzhengEvent.GOTO_SET_LINUEP = "GOTO_SET_LINUEP";
        /** 展示援助界面 */
        YuanzhengEvent.SHOW_HELP_VIEW = "SHOW_HELP_VIEW";
        /** 关卡挑战 */
        YuanzhengEvent.GUANQIA_CHALLENGE = "GUANQIA_CHALLENGE";
        /** 领取关卡奖励 */
        YuanzhengEvent.GUANQIA_REWARD = "GUANQIA_REWARD";
        /** 回复血量或复活英雄 */
        YuanzhengEvent.RECOVERY_GOD = "YAUNZHENG_RECOVERY_GOD";
        /** 更新界面 */
        YuanzhengEvent.UPDATE_VIEW = "UPDATE_VIEW";
        /** 派遣成功 */
        YuanzhengEvent.YZ_DISPATCH_SUCC = "YZ_DISPATCH_SUCC";
        return YuanzhengEvent;
    }(tl3d.BaseEvent));
    game.YuanzhengEvent = YuanzhengEvent;
})(game || (game = {}));
