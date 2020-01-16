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
    var TeamApplyRender = /** @class */ (function (_super) {
        __extends(TeamApplyRender, _super);
        function TeamApplyRender() {
            var _this = _super.call(this) || this;
            _this._model = game.CopyTeamModel.getInstance();
            _this.btn_gread.on(Laya.Event.CLICK, _this, _this.onAgreed);
            return _this;
        }
        Object.defineProperty(TeamApplyRender.prototype, "dataSource", {
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
        TeamApplyRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (!info) {
                this.list_god.dataSource = null;
            }
            else {
                this.lab_info.text = info.name;
                this.lab_force.text = String(info.force);
                this.list_god.dataSource = this.getLineupInfo(info.lineupInfo[0]);
            }
        };
        TeamApplyRender.prototype.getLineupInfo = function (lineup) {
            var item = null, tbGod, ary = [];
            for (var i = 0; i < 6; i++) {
                item = lineup[i];
                if (!item) {
                    ary.push(null);
                    continue;
                }
                tbGod = tb.TB_god.get_TB_godById(item[0]);
                var godVo = new GodItemVo(tbGod);
                // [templateId, starLv, level, attrs, degree, awakenLv, skinId]
                godVo.starLevel = item[1];
                godVo.level = item[2];
                godVo.degree = item[4];
                godVo.dataType = 1;
                if (item[3]) {
                    godVo.iSeverAttri = map2ary(item[3]);
                }
                ary.push(godVo);
            }
            return ary;
        };
        TeamApplyRender.prototype.onAgreed = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.AGREED_APPLY), { playerId: this.dataSource.playerId, state: iface.tb_prop.applyOptTypeKey.yes });
        };
        return TeamApplyRender;
    }(ui.teamcopy.render.TeamApplyRenderUI));
    game.TeamApplyRender = TeamApplyRender;
    var TeamInviteChiRender = /** @class */ (function (_super) {
        __extends(TeamInviteChiRender, _super);
        function TeamInviteChiRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TeamInviteChiRender.prototype, "dataSource", {
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
        TeamInviteChiRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (!info)
                return;
            _super.prototype.refreshData.call(this);
            this.updateBtn();
        };
        TeamInviteChiRender.prototype.updateBtn = function () {
            this.btn_gread.label = this.dataSource.isInvite ? LanMgr.getLan("", 12330) : LanMgr.getLan("", 12331);
            this.btn_gread.disabled = this.dataSource.isInvite;
        };
        TeamInviteChiRender.prototype.onAgreed = function () {
            var _this = this;
            if (!this.dataSource)
                return;
            game.CopyTeamThread.getInstance().inviteFriend(this.dataSource.playerId).then(function () {
                _this.dataSource.isInvite = true;
                _this.updateBtn();
            });
        };
        return TeamInviteChiRender;
    }(TeamApplyRender));
    game.TeamInviteChiRender = TeamInviteChiRender;
})(game || (game = {}));
