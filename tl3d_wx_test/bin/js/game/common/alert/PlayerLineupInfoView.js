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
/**
* name
*/
var common;
(function (common) {
    var PlayerLineupInfoView = /** @class */ (function (_super) {
        __extends(PlayerLineupInfoView, _super);
        function PlayerLineupInfoView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        PlayerLineupInfoView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnLinueUp.on(Laya.Event.CLICK, this, this.onLinueUp);
            this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
        };
        PlayerLineupInfoView.prototype.popup = function () {
            // popup前设置高度
            var data = this.dataSource;
            var isShowBtn = data.type == LinuepType.arena;
            this.btnChallenge.visible = this.btnLinueUp.visible = isShowBtn;
            this.btnChallenge.x = 376;
            this.btnChallenge.label = "挑战";
            if (isShowBtn) {
                var data_1 = this.dataSource;
                this.btnLinueUp.visible = data_1.rank < data_1.myRank;
                this.btnChallenge.x = this.btnLinueUp.visible ? 376 : 275;
                this.btnChallenge.label = this.btnLinueUp.visible ? "挑战" : "扫荡";
            }
            this.height = this.img_bg.height = isShowBtn ? 730 : 660;
            _super.prototype.popup.call(this);
            this.initView();
        };
        PlayerLineupInfoView.prototype.initView = function () {
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
            var data = this.dataSource;
            this.lab_title.text = data.type == LinuepType.arena ? "挑 战" : "阵 容";
            this.lbName.text = data.name;
            this.lbGuild.text = data.guildName ? "\u516C\u4F1A\uFF1A" + data.guildName : "暂无公会";
            this.headBox.dataSource = new UserHeadVo(data.head, data.level, data.headFrame);
            this.lineupUI.dataSource = { lineupGods: data.getLineupGods(), shenqiAry: data.getShenqiAry(), showShenli: true, force: data.force, userLevel: data.level, title: "" };
        };
        /**打开布阵界面 */
        PlayerLineupInfoView.prototype.onLinueUp = function () {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        };
        /**挑战玩家 */
        PlayerLineupInfoView.prototype.onChallenge = function () {
            var data = this.dataSource;
            if (data instanceof game.ArenaInfoVo) {
                if (!data.canChallenge) {
                    if (data.isMySelf())
                        showToast(LanMgr.getLan('', 10208));
                    else
                        showToast(LanMgr.getLan('', 10209));
                    return;
                }
                if (data.rank >= data.myRank) {
                    //扫荡
                    dispatchEvt(new game.ArenaEvent(game.ArenaEvent.ARENA_BATTEL_SWEEP), this.dataSource);
                }
                else {
                    dispatchEvt(new game.ArenaEvent(game.ArenaEvent.ARENA_BATTEL_START), this.dataSource);
                }
            }
        };
        PlayerLineupInfoView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnClose.off(Laya.Event.CLICK, this, this.close);
            this.lineupUI.dataSource = null;
        };
        return PlayerLineupInfoView;
    }(ui.component.PlayerLinuepInfoUI));
    common.PlayerLineupInfoView = PlayerLineupInfoView;
    /** 阵容界面类型 */
    var LinuepType;
    (function (LinuepType) {
        LinuepType[LinuepType["glory"] = 1] = "glory";
        LinuepType[LinuepType["arena"] = 2] = "arena";
    })(LinuepType = common.LinuepType || (common.LinuepType = {}));
})(common || (common = {}));
