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
    /** 队员信息菜单 */
    var MemberMenuView = /** @class */ (function (_super) {
        __extends(MemberMenuView, _super);
        function MemberMenuView() {
            var _this = _super.call(this) || this;
            _this.visible = false;
            return _this;
        }
        MemberMenuView.prototype.show = function (data) {
            this.dataSource = data;
            this.x = data.point.x;
            this.y = data.point.y;
            this.visible = true;
            this.parent.setChildIndex(this, this.parent.numChildren - 1);
            this.btnChange.on(Laya.Event.CLICK, this, this.onClick);
            this.btnOut.on(Laya.Event.CLICK, this, this.onClick);
            this.btnShow.on(Laya.Event.CLICK, this, this.onClick);
        };
        MemberMenuView.prototype.onClosed = function () {
            this.visible = false;
            this.btnChange.off(Laya.Event.CLICK, this, this.onClick);
            this.btnOut.off(Laya.Event.CLICK, this, this.onClick);
            this.btnShow.off(Laya.Event.CLICK, this, this.onClick);
        };
        MemberMenuView.prototype.onClick = function (event) {
            var _this = this;
            var btn = event.target;
            var data = this.dataSource;
            var member = data.info;
            if (!member || !member.isExist()) {
                showToast(LanMgr.getLan("", 10382));
                return;
            }
            var instan = game.GodDmThread.getInstance();
            if (btn == this.btnChange) {
                instan.appointCaptain(member).then(function () {
                    _this.onClosed();
                });
            }
            else if (btn == this.btnOut) {
                instan.kickoutMember(member).then(function () {
                    _this.onClosed();
                });
            }
            else if (btn == this.btnShow) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_PLAYER_INFO), member);
                this.onClosed();
            }
        };
        /** 检测是否存在 */
        MemberMenuView.prototype.checkExist = function () {
            var data = this.dataSource;
            if (!data || !data.info || !data.info.isExist()) {
                this.onClosed();
            }
        };
        return MemberMenuView;
    }(ui.goddomain.MemberMenuUI));
    game.MemberMenuView = MemberMenuView;
})(game || (game = {}));
