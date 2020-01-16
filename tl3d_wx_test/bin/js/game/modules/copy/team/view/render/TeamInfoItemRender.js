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
    var TeamInfoItemRender = /** @class */ (function (_super) {
        __extends(TeamInfoItemRender, _super);
        function TeamInfoItemRender() {
            var _this = _super.call(this) || this;
            _this._model = game.CopyTeamModel.getInstance();
            _this.btn_invitation.on(Laya.Event.CLICK, _this, _this.onInvitation);
            _this.btn_kickout.on(Laya.Event.CLICK, _this, _this.onKickOut);
            _this.btn_transfer.on(Laya.Event.CLICK, _this, _this.onTransfer);
            return _this;
        }
        Object.defineProperty(TeamInfoItemRender.prototype, "dataSource", {
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
        TeamInfoItemRender.prototype.refreshData = function () {
            var info = this.dataSource;
            this.img_leader.visible = info.job && info.job == iface.tb_prop.groupJobTypeKey.captain;
            this.img_pos.skin = SkinUtil.getTeamPos(info.pos);
            this.img_force.visible = this.lab_force.visible = this.list_god.visible = info.playerId != null;
            this.btn_transfer.visible = info.pos > 1 && info.playerId != null && this._model.IsLeader();
            this.btn_kickout.visible = this._model.IsLeader() && info.playerId != null && this._model.leaderId !== info.playerId;
            this.btn_invitation.visible = info.playerId == null && this._model.IsLeader();
            this.lab_info.y = info.playerId != null ? 22 : 63;
            if (info.playerId) {
                this.lab_info.text = info.name;
                this.lab_force.text = String(info.force);
                this.list_god.array = this.getLineupInfo(info.lineupInfo[0]);
            }
            else {
                this.lab_info.text = LanMgr.getLan("", 12487);
                this.list_god.array = null;
                this.lab_force.text = "";
            }
        };
        TeamInfoItemRender.prototype.getLineupInfo = function (lineup) {
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
        TeamInfoItemRender.prototype.onInvitation = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_INVITE_VIEW));
        };
        TeamInfoItemRender.prototype.onKickOut = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.KICK_OUT_MEMBER), this.dataSource.playerId);
        };
        TeamInfoItemRender.prototype.onTransfer = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SET_POS_TEAM), this.dataSource.pos);
        };
        return TeamInfoItemRender;
    }(ui.teamcopy.render.TeamInfoRenderUI));
    game.TeamInfoItemRender = TeamInfoItemRender;
})(game || (game = {}));
