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
    var ZhaohuanModule = /** @class */ (function (_super) {
        __extends(ZhaohuanModule, _super);
        function ZhaohuanModule() {
            return _super.call(this) || this;
        }
        ZhaohuanModule.prototype.getModuleName = function () {
            return "ZhaohuanModule";
        };
        ZhaohuanModule.prototype.listProcessors = function () {
            return [new game.ZhaohuanProcessor()];
        };
        /**
         * 初始化数据
         */
        ZhaohuanModule.prototype.onRegister = function () {
            game.ZhaohuanModel.getInstance();
        };
        return ZhaohuanModule;
    }(tl3d.Module));
    game.ZhaohuanModule = ZhaohuanModule;
    var SummonEvent = /** @class */ (function (_super) {
        __extends(SummonEvent, _super);
        function SummonEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //召唤结果面板
        SummonEvent.HIDE_ZHAOHUAN_RESULT = "HIDE_ZHAOHUAN_RESULT";
        //召唤面板
        SummonEvent.SHOW_ZHAOHUAN_PANEL = "SHOW_ZHAOHUAN_PANEL";
        SummonEvent.HIDE_ZHAOHUAN_PANEL = "HIDE_ZHAOHUAN_PANEL";
        SummonEvent.SHOW_SUM_RESULT_PANEL = "SHOW_SUM_RESULT_PANEL";
        SummonEvent.SEND_ZHAOHUAN = "SEND_ZHAOHUAN";
        /** 召唤成功 */
        SummonEvent.ZHAOHUAN_SUCCESS = 'ZHAOHUAN_SUCCESS';
        SummonEvent.SHOW_BTN_VISIBLE_TRUE = "SHOW_BTN_VISIBLE_TRUE";
        return SummonEvent;
    }(tl3d.BaseEvent));
    game.SummonEvent = SummonEvent;
})(game || (game = {}));
