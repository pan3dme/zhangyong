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
    var CopyTeamApply = /** @class */ (function (_super) {
        __extends(CopyTeamApply, _super);
        function CopyTeamApply() {
            return _super.call(this) || this;
        }
        CopyTeamApply.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btnRefuse.on(Laya.Event.CLICK, this, this.onRefuse);
            this._model = game.CopyTeamModel.getInstance();
        };
        CopyTeamApply.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamApply.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamApply.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.timer.clear(this, this.onRefresh);
            this.bgPanel.dataSource = null;
            this.teamList.array = null;
        };
        CopyTeamApply.prototype.initView = function () {
            this.timer.clear(this, this.onRefresh);
            this.timer.loop(10000, this, this.onRefresh);
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamApply, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12259) };
            this.updateList();
            // this.rewardList.x = 400
        };
        CopyTeamApply.prototype.updateList = function () {
            this.teamList.array = this._model.getApplyList();
            this.imgEmpty.visible = this.lbEmpty.visible = this.teamList.array.length <= 0;
        };
        CopyTeamApply.prototype.onRefresh = function () {
            var _this = this;
            game.CopyTeamThread.getInstance().getApplyList(true)
                .then(function () {
                _this.updateList();
            });
        };
        CopyTeamApply.prototype.onRefuse = function () {
            var _this = this;
            if (!this.teamList || !this.teamList.array || this.teamList.array.length <= 0)
                return;
            game.CopyTeamThread.getInstance().applyOpt(null, iface.tb_prop.applyOptTypeKey.no)
                .then(function () {
                _this.updateList();
            });
        };
        return CopyTeamApply;
    }(ui.teamcopy.TeamCopyApplyUI));
    game.CopyTeamApply = CopyTeamApply;
})(game || (game = {}));
