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
    var InviteJoinView = /** @class */ (function (_super) {
        __extends(InviteJoinView, _super);
        function InviteJoinView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this._thread = game.GodDmThread.getInstance();
            return _this;
        }
        InviteJoinView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        InviteJoinView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.btnYes.off(Laya.Event.CLICK, this, this.onYes);
            this.btnNo.off(Laya.Event.CLICK, this, this.onNot);
            this.checkBox.off(Laya.Event.CHANGE, this, this.onChange);
        };
        InviteJoinView.prototype.initView = function () {
            this.checkBox.selected = false;
            this._cd = tb.TB_fight_goddomain_set.getSet().invite_time;
            var info = this.dataSource;
            this.lab_title.text = "激战神域邀请";
            this.lbContent.text = "\u4F60\u7684\u597D\u53CB" + info.name + "\u9080\u8BF7\u4F60\u7EC4\u961F\uFF0C\u4E00\u8D77\u6FC0\u6218\u795E\u57DF\uFF0C\u662F\u5426\u8981\u52A0\u5165\uFF1F";
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            this.btnYes.on(Laya.Event.CLICK, this, this.onYes);
            this.btnNo.on(Laya.Event.CLICK, this, this.onNot);
            this.checkBox.on(Laya.Event.CHANGE, this, this.onChange);
        };
        /** 更新时间 */
        InviteJoinView.prototype.updateTime = function () {
            if (this._cd <= 0) {
                Laya.timer.clear(this, this.updateTime);
                this.close();
                return;
            }
            this.lbTime.text = "\u5012\u8BA1\u65F6\uFF1A" + this._cd + "\u79D2";
            this._cd--;
        };
        InviteJoinView.prototype.onYes = function () {
            var _this = this;
            var info = this.dataSource;
            this._thread.joinInvite(info.playerId).then(function () {
                _this.close();
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_GODDOMAIN_VIEW));
            });
        };
        InviteJoinView.prototype.onNot = function () {
            var _this = this;
            var info = this.dataSource;
            this._thread.refuseInvite(info.playerId).then(function () {
                _this.close();
            });
        };
        InviteJoinView.prototype.onChange = function () {
            var _this = this;
            var info = this.dataSource;
            var state = this.checkBox.selected ? iface.tb_prop.groupInviteTypeKey.no : iface.tb_prop.groupInviteTypeKey.yes;
            this._thread.todayRefuseJoin(info.playerId, state).then(function (setInvite) {
                _this.checkBox.selected = setInvite == iface.tb_prop.groupInviteTypeKey.no ? true : false;
            });
        };
        return InviteJoinView;
    }(ui.goddomain.InviteJoinUI));
    game.InviteJoinView = InviteJoinView;
})(game || (game = {}));
