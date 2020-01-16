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
    /** 自动匹配界面 */
    var AutoMatchView = /** @class */ (function (_super) {
        __extends(AutoMatchView, _super);
        function AutoMatchView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this._model = game.GodDomainModel.getInstance();
            _this._thread = game.GodDmThread.getInstance();
            return _this;
        }
        AutoMatchView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        AutoMatchView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.btnCancel.off(Laya.Event.CLICK, this, this.onCancel);
        };
        AutoMatchView.prototype.initView = function () {
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            this.btnCancel.on(Laya.Event.CLICK, this, this.onCancel);
            Laya.timer.loop(2000, this, this.matchTeam);
        };
        /** 更新时间 */
        AutoMatchView.prototype.updateTime = function () {
            var time = Math.ceil(App.serverTimeSecond - this._model.matchTime);
            this.lbTime.text = LanMgr.getLan("", 10507, time);
        };
        /** 匹配队伍 */
        AutoMatchView.prototype.matchTeam = function () {
            var _this = this;
            this._thread.requestMyTeamInfo(false).then(function () {
                if (_this._model.hasTeam()) {
                    Laya.timer.clearAll(_this);
                    _this._model.matchTime = 0;
                    _this.close();
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                }
            });
        };
        /** 取消匹配 */
        AutoMatchView.prototype.onCancel = function () {
            var _this = this;
            this._thread.cancelAutoMatch().then(function () {
                _this._model.matchTime = 0;
                if (_this._model.hasTeam()) {
                    Laya.timer.clearAll(_this);
                    _this.close();
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                }
                else {
                    _this.close();
                }
            });
        };
        return AutoMatchView;
    }(ui.goddomain.AutoMatchUI));
    game.AutoMatchView = AutoMatchView;
})(game || (game = {}));
