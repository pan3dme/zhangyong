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
    var FateView = /** @class */ (function (_super) {
        __extends(FateView, _super);
        function FateView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FateView.prototype.onShow = function () {
            this.initView();
            tl3d.ModuleEventManager.addEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC, this.updateNum, this);
        };
        FateView.prototype.onExit = function () {
            this.list_fate.array = null;
            this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
            tl3d.ModuleEventManager.removeEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC, this.updateNum, this);
        };
        FateView.prototype.initView = function () {
            /** list列表数据 */
            this.list_fate.array = game.FateModel.getInstance().arrFateVo;
            //监听
            this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
            this.updateNum();
        };
        FateView.prototype.updateNum = function () {
            //图鉴进度
            this.lb_tujian.text = LanMgr.getLan('', 12120, game.FateModel.getInstance().getFateArrNum()[0], game.FateModel.getInstance().getFateArrNum()[1]);
        };
        /** 按键监听(打开属性列表) */
        FateView.prototype.onLook = function () {
            UIMgr.showUI(UIConst.Tujian_AttrView);
        };
        return FateView;
    }(ui.tujian.FateViewUI));
    game.FateView = FateView;
})(game || (game = {}));
