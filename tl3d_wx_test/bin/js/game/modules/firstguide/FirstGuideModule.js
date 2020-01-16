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
    * FirstGuideModule
    */
    var FirstGuideModule = /** @class */ (function (_super) {
        __extends(FirstGuideModule, _super);
        function FirstGuideModule() {
            return _super.call(this) || this;
        }
        FirstGuideModule.prototype.getModuleName = function () {
            return "FirstGuideModule";
        };
        FirstGuideModule.prototype.listProcessors = function () {
            return [new game.FirstGuideProcessor()];
        };
        /**
         * 模块入口
         */
        FirstGuideModule.prototype.onRegister = function () {
        };
        return FirstGuideModule;
    }(tl3d.Module));
    game.FirstGuideModule = FirstGuideModule;
    var FirstGuideEvent = /** @class */ (function (_super) {
        __extends(FirstGuideEvent, _super);
        function FirstGuideEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 引导开始 */
        FirstGuideEvent.GUIDE_START = 'GUIDE_START';
        FirstGuideEvent.FIGHT_SKILL_SELECT = 'FIGHT_SKILL_SELECT';
        // public static SHOW_SKILL_EVENT: string = 'SHOW_SKILL_EVENT';
        FirstGuideEvent.CHANGE_BOSSBLOOD = 'CHANGE_BOSSBLOOD';
        FirstGuideEvent.FIRST_GUIDE_STEP_SUCC = 'FIRST_GUIDE_STEP_SUCC';
        FirstGuideEvent.FIRST_GUIDE_SELECT_TAR_SUCC = 'FIRST_GUIDE_SELECT_TAR_SUCC';
        return FirstGuideEvent;
    }(tl3d.BaseEvent));
    game.FirstGuideEvent = FirstGuideEvent;
})(game || (game = {}));
