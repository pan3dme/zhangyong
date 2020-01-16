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
    var FogForestModule = /** @class */ (function (_super) {
        __extends(FogForestModule, _super);
        function FogForestModule() {
            return _super.call(this) || this;
        }
        FogForestModule.prototype.getModuleName = function () {
            return "FogForestModule";
        };
        FogForestModule.prototype.listProcessors = function () {
            return [new game.FogForestProcessor()];
        };
        FogForestModule.prototype.onRegister = function () {
            game.FogForestModel.getInstance().initModel();
        };
        return FogForestModule;
    }(tl3d.Module));
    game.FogForestModule = FogForestModule;
    var FogForestEvent = /** @class */ (function (_super) {
        __extends(FogForestEvent, _super);
        function FogForestEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        FogForestEvent.SHOW_MAIN_VIEW = "SHOW_MAIN_VIEW";
        /** 打开奖励界面 */
        FogForestEvent.SHOW_REWARD_VIEW = "SHOW_REWARD_VIEW";
        /** 打开宝箱 */
        FogForestEvent.OPEN_BAOXIANG = "OPEN_BAOXIANG";
        /** 一键扫荡 */
        FogForestEvent.ONE_KEY_PASS = "ONE_KEY_PASS";
        /** 刷新界面 */
        FogForestEvent.UPDATE_VIEW = "UPDATE_VIEW";
        /** 关卡挑战 */
        FogForestEvent.GUANQIA_CHALLENGE = "GUANQIA_CHALLENGE";
        /** 领取成功 */
        FogForestEvent.RECEIVE_SUCCESS = "RECEIVE_SUCCESS";
        /** 挑战成功 */
        FogForestEvent.CHALLENGE_SUCCESS = "CHALLENGE_SUCCESS";
        /** 扫荡成功 */
        FogForestEvent.ALL_PASS_SUCCESS = "ALL_PASS_SUCCESS";
        /** 更新当前关卡信息 */
        FogForestEvent.UPDATE_CUR_GUANQIA = "UPDATE_CUR_GUANQIA";
        /** 初始化迷雾森林 */
        FogForestEvent.Init_FOREST = "Init_FOREST";
        return FogForestEvent;
    }(tl3d.BaseEvent));
    game.FogForestEvent = FogForestEvent;
    var IRankVo = /** @class */ (function () {
        function IRankVo() {
        }
        return IRankVo;
    }());
    game.IRankVo = IRankVo;
})(game || (game = {}));
