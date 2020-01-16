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
    * FenjieModule
    */
    var FenjieModule = /** @class */ (function (_super) {
        __extends(FenjieModule, _super);
        function FenjieModule() {
            return _super.call(this) || this;
        }
        FenjieModule.prototype.getModuleName = function () {
            return "FenjieModule";
        };
        FenjieModule.prototype.listProcessors = function () {
            return [new game.FenjieProcessor()];
        };
        /**
         * 模块入口
         */
        FenjieModule.prototype.onRegister = function () {
        };
        return FenjieModule;
    }(tl3d.Module));
    game.FenjieModule = FenjieModule;
    var FenjieEvent = /** @class */ (function (_super) {
        __extends(FenjieEvent, _super);
        function FenjieEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**打开分解面板 */
        FenjieEvent.SHOW_FENJIE_VIEW = "SHOW_FENJIE_VIEW";
        /**点击分解 */
        FenjieEvent.CLICK_BTN_FENJIE = "CLICK_BTN_FENJIE";
        return FenjieEvent;
    }(tl3d.BaseEvent));
    game.FenjieEvent = FenjieEvent;
})(game || (game = {}));
