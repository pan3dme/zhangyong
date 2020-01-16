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
    /*
    * DafuwengModule
    */
    var DafuwengModule = /** @class */ (function (_super) {
        __extends(DafuwengModule, _super);
        function DafuwengModule() {
            return _super.call(this) || this;
        }
        DafuwengModule.prototype.getModuleName = function () {
            return "DafuwengModule";
        };
        DafuwengModule.prototype.listProcessors = function () {
            return [new game.DafuwengProcessor()];
        };
        /**
         * 模块入口
         */
        DafuwengModule.prototype.onRegister = function () {
            game.DafuwengModel.getInstance();
        };
        return DafuwengModule;
    }(tl3d.Module));
    game.DafuwengModule = DafuwengModule;
    var DafuwengEvent = /** @class */ (function (_super) {
        __extends(DafuwengEvent, _super);
        function DafuwengEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 显示奇遇界面 */
        DafuwengEvent.SHOW_QIYU_VIEW = "SHOW_QIYU_VIEW";
        /** 删除奇遇标签页 */
        DafuwengEvent.DEL_QIYU_TAB = "DEL_QIYU_TAB";
        /** 更新化奇遇信息 */
        DafuwengEvent.UPDATE_RISK_INFO = "UPDATE_RISK_INFO";
        /** 添加奇遇信息 */
        DafuwengEvent.ADD_RISK_INFO = "ADD_RISK_INFO";
        /** 删除奇遇信息 */
        DafuwengEvent.DEL_RISK_INFO = "DEL_RISK_INFO";
        DafuwengEvent.CLICK_CAIDAXIAO = "CLICK_CAIDAXIAO";
        DafuwengEvent.PLAY_SUCCESS = "PLAY_SUCCESS";
        return DafuwengEvent;
    }(tl3d.BaseEvent));
    game.DafuwengEvent = DafuwengEvent;
})(game || (game = {}));
