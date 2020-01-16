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
    /** 邀请你组队 */
    var CopyTeamInviteJoinView = /** @class */ (function (_super) {
        __extends(CopyTeamInviteJoinView, _super);
        function CopyTeamInviteJoinView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this._thread = game.CopyTeamThread.getInstance();
            return _this;
        }
        CopyTeamInviteJoinView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamInviteJoinView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.btnYes.off(Laya.Event.CLICK, this, this.onYes);
            this.btnNo.off(Laya.Event.CLICK, this, this.onNot);
            this.checkBox.off(Laya.Event.CHANGE, this, this.onChange);
        };
        CopyTeamInviteJoinView.prototype.initView = function () {
            this.checkBox.selected = false;
            this._cd = tb.TB_fight_goddomain_set.getSet().invite_time;
            var info = this.dataSource;
            this.lab_title.text = LanMgr.getLan("", 12480);
            this.lbContent.text = LanMgr.getLan("", 12481, info.name);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            this.btnYes.on(Laya.Event.CLICK, this, this.onYes);
            this.btnNo.on(Laya.Event.CLICK, this, this.onNot);
            this.checkBox.on(Laya.Event.CHANGE, this, this.onChange);
        };
        /** 更新时间 */
        CopyTeamInviteJoinView.prototype.updateTime = function () {
            if (this._cd <= 0) {
                Laya.timer.clear(this, this.updateTime);
                this.close();
                return;
            }
            this.lbTime.text = LanMgr.getLan("", 12172, this._cd) + "s";
            this._cd--;
        };
        CopyTeamInviteJoinView.prototype.onYes = function () {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            if (game.GodDomainModel.getInstance().hasTeam()) {
                //处于激战神域队伍中
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10497),
                    confirmCb: function () {
                        _this.joinOpt(info.playerId);
                    },
                    parm: null
                });
            }
            else {
                this.joinOpt(info.playerId);
            }
        };
        CopyTeamInviteJoinView.prototype.joinOpt = function (playerId) {
            this.close();
            this._thread.joinInvite(playerId).then(function () {
                game.GodDomainModel.getInstance().resetGroupId();
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_TEAMBUILD));
            });
        };
        CopyTeamInviteJoinView.prototype.onNot = function () {
            this.close();
            var info = this.dataSource;
            if (!info)
                return;
            this._thread.refuseInvite(info.playerId).then(function () {
            });
        };
        CopyTeamInviteJoinView.prototype.onChange = function () {
            var _this = this;
            var info = this.dataSource;
            var state = this.checkBox.selected ? iface.tb_prop.groupInviteTypeKey.no : iface.tb_prop.groupInviteTypeKey.yes;
            this._thread.todayRefuseJoin(info.playerId, state).then(function (setInvite) {
                _this.checkBox.selected = setInvite == iface.tb_prop.groupInviteTypeKey.no ? true : false;
            });
        };
        return CopyTeamInviteJoinView;
    }(ui.goddomain.InviteJoinUI));
    game.CopyTeamInviteJoinView = CopyTeamInviteJoinView;
})(game || (game = {}));
