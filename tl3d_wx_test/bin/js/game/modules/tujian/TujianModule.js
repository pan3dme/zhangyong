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
    var TujianModule = /** @class */ (function (_super) {
        __extends(TujianModule, _super);
        function TujianModule() {
            return _super.call(this) || this;
        }
        TujianModule.prototype.getModuleName = function () {
            return "TujianModule";
        };
        TujianModule.prototype.listProcessors = function () {
            return [new game.TujianProcessor()];
        };
        /**
         * 初始化数据
         */
        TujianModule.prototype.onRegister = function () {
            game.TujianModel.getInstance();
        };
        return TujianModule;
    }(tl3d.Module));
    game.TujianModule = TujianModule;
    var TujianEvent = /** @class */ (function (_super) {
        __extends(TujianEvent, _super);
        function TujianEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**每次进入更新数据 */
        TujianEvent.SHOW_TUJIAN_PANEL = "SHOW_TUJIAN_PANEL";
        /**英雄详细界面 */
        TujianEvent.SHOW_XIANGXI_PANEL = "SHOW_XIANGXI_PANEL";
        /**进入评价界面 */
        TujianEvent.SHOW_EVALUATION_PANEL = "SHOW_EVALUATION_PANEL";
        /**更新评价 */
        TujianEvent.UPDATE_EVALUATION = "UPDATE_EVALUATION";
        /**进入评价输入界面 */
        TujianEvent.SHOW_EVALUATIONINPUT_PANEL = "SHOW_EVALUATIONINPUT_PANEL";
        /**查看英雄/怪物信息*/
        TujianEvent.SHOW_GUAIWUXINXI_PANEL = "SHOW_GUAIWUXINXI_PANEL";
        /**查看评论的英雄 */
        TujianEvent.SHOW_PINGLUNGOD_PANEL = "SHOW_PINGLUNGOD_PANEL";
        /**点赞 */
        TujianEvent.DIANZAN = "DIANZAN";
        /** 激活图鉴 */
        TujianEvent.ACTIVITY_TUJIAN_SUCC = "ACTIVITY_TUJIAN_SUCC";
        return TujianEvent;
    }(tl3d.BaseEvent));
    game.TujianEvent = TujianEvent;
})(game || (game = {}));
