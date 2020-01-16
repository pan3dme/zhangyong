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
    var TeamBuildRender = /** @class */ (function (_super) {
        __extends(TeamBuildRender, _super);
        function TeamBuildRender() {
            var _this = _super.call(this) || this;
            _this._model = game.CopyTeamModel.getInstance();
            _this.btnApply.on(Laya.Event.CLICK, _this, _this.onApply);
            return _this;
        }
        Object.defineProperty(TeamBuildRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        TeamBuildRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.btnApply.label = LanMgr.getLan("", 12489);
                this.btnApply.disabled = false;
                this.lbName.text = info.svo.name;
                this.lbForce.text = String(info.svo.force);
                var tabcopy = tb.TB_team_copy.getTB_team_copyById(this._model.getNextId(info.svo.copyFloor));
                this.lbInfo.text = LanMgr.getLan("", 10079, Math.floor(tabcopy.copy / 10)) + "-" + LanMgr.getLan("", 10030, tabcopy.copy % 10);
                this.lbInfo.color = (this._model.myFloor >= info.svo.copyFloor) ? "#319c28" : "#ff0000";
                var item = null, ui_1 = null;
                for (var i = 0; i < info.memberList.length; i++) {
                    item = info.memberList[i];
                    ui_1 = item.pos == 1 ? this.ui_pic1 : item.pos == 2 ? this.ui_pic2 : this.ui_pic3;
                    ui_1.dataSource = item.head ? new UserHeadVo(item.head, item.level, item.headFrame) : null;
                }
            }
        };
        TeamBuildRender.prototype.onApply = function () {
            if (this.dataSource) {
                if (this.dataSource.svo.copyFloor > this._model.myFloor) {
                    showToast(LanMgr.getLan("", 10269));
                    return;
                }
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.APPLY_JOIN_TEAM), this.dataSource.svo.groupId);
                this.btnApply.label = LanMgr.getLan("", 12488);
                this.btnApply.disabled = true;
            }
        };
        return TeamBuildRender;
    }(ui.teamcopy.render.TeamBuildRenderUI));
    game.TeamBuildRender = TeamBuildRender;
})(game || (game = {}));
