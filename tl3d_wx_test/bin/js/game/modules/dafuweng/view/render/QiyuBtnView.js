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
    var QiyuBtnView = /** @class */ (function (_super) {
        __extends(QiyuBtnView, _super);
        function QiyuBtnView() {
            return _super.call(this) || this;
        }
        QiyuBtnView.prototype.onShow = function () {
            this.redPoint.setRedPointName("adventure_qiyu");
            tl3d.ModuleEventManager.addEvent(game.DafuwengEvent.ADD_RISK_INFO, this.initView, this);
            tl3d.ModuleEventManager.addEvent(game.DafuwengEvent.DEL_RISK_INFO, this.initView, this);
            tl3d.ModuleEventManager.addEvent(game.DafuwengEvent.UPDATE_RISK_INFO, this.initView, this);
            this.bombAnim.visible = false;
            this.bombAnim.stop();
            this.bombAnim.on(Laya.Event.COMPLETE, this, this.onBombComple);
            this.ani2.on(Laya.Event.COMPLETE, this, this.onCompleAnim2);
            this.ani2.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            this.initView();
        };
        QiyuBtnView.prototype.onExist = function () {
            this.bombAnim.visible = false;
            this.bombAnim.stop();
            this.ani2.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            this.redPoint.onDispose();
            Laya.timer.clearAll(this);
            tl3d.ModuleEventManager.removeEvent(game.DafuwengEvent.ADD_RISK_INFO, this.initView, this);
            tl3d.ModuleEventManager.removeEvent(game.DafuwengEvent.DEL_RISK_INFO, this.initView, this);
            tl3d.ModuleEventManager.removeEvent(game.DafuwengEvent.UPDATE_RISK_INFO, this.initView, this);
        };
        QiyuBtnView.prototype.initView = function () {
            var list = game.DafuwengModel.getInstance().getRiskList(false);
            if (list.length > 0) {
                this.ani1.play(0, true);
            }
            else {
                this.ani1.gotoAndStop(0);
            }
            this.ani2.gotoAndStop(0);
        };
        QiyuBtnView.prototype.playAnim2 = function () {
            this.ani1.stop();
            this.ani2.play(0, false);
            this.bombAnim.visible = true;
            this.bombAnim.play(0, false);
        };
        QiyuBtnView.prototype.onCompleAnim2 = function () {
            this.initView();
        };
        QiyuBtnView.prototype.onBombComple = function () {
            this.bombAnim.visible = false;
            this.bombAnim.stop();
        };
        return QiyuBtnView;
    }(ui.dafuweng.QiyuBtnUI));
    game.QiyuBtnView = QiyuBtnView;
})(game || (game = {}));
