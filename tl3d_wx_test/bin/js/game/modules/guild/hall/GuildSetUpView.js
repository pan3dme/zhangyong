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
var game;
(function (game) {
    var GuildSetUpView = /** @class */ (function (_super) {
        __extends(GuildSetUpView, _super);
        function GuildSetUpView() {
            var _this = _super.call(this) || this;
            _this._curLv = 1;
            _this._maxLv = 0;
            _this._needYZ = false; // 需要验证
            return _this;
        }
        GuildSetUpView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.GuildSetUpView, closeOnSide: this.isModelClose, title: "设置" };
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btnAddOne, this.btnAddTen, this.btnRedOne, this.btnRedTen, this.inputLv);
            this.btn_sure.on(Laya.Event.CLICK, this, this.sure);
            this.btn_zhaomu.on(Laya.Event.CLICK, this, this.zhaomu);
            this.btnLeft.on(Laya.Event.CLICK, this, this.onLeft);
            this.btnRight.on(Laya.Event.CLICK, this, this.onRight);
        };
        GuildSetUpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        GuildSetUpView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildSetUpView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildSetUpView.prototype.initView = function () {
            var guildInfo = game.GuildModel.getInstance().guildInfo;
            this._curLv = guildInfo.limitLevel;
            this._maxLv = 100;
            this._counterBar.setInitData(this._curLv, this._maxLv, this.setLv.bind(this));
            this.setLv();
            this._needYZ = guildInfo.autoJoin == iface.tb_prop.guildAutoJoinTypeKey.no;
            this.updateBtn();
        };
        GuildSetUpView.prototype.setLv = function () {
            this._curLv = this._counterBar.getCurNum();
            this.inputLv.text = this._curLv.toString();
        };
        GuildSetUpView.prototype.updateBtn = function () {
            this.lbYanzheng.text = this._needYZ ? "需要验证" : "直接加入";
            this.btnLeft.gray = this._needYZ;
            this.btnRight.gray = !this._needYZ;
        };
        GuildSetUpView.prototype.sure = function () {
            var auto = this._needYZ ? iface.tb_prop.guildAutoJoinTypeKey.no : iface.tb_prop.guildAutoJoinTypeKey.yes;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_SETTING, [Number(this.inputLv.text), auto]));
        };
        /** 招募 */
        GuildSetUpView.prototype.zhaomu = function () {
            var auto = this._needYZ ? iface.tb_prop.guildAutoJoinTypeKey.no : iface.tb_prop.guildAutoJoinTypeKey.yes;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_ZHAOMU, [Number(this.inputLv.text), auto]));
        };
        GuildSetUpView.prototype.onLeft = function () {
            if (!this.btnLeft.gray) {
                this._needYZ = !this._needYZ;
                this.updateBtn();
            }
        };
        GuildSetUpView.prototype.onRight = function () {
            if (!this.btnRight.gray) {
                this._needYZ = !this._needYZ;
                this.updateBtn();
            }
        };
        return GuildSetUpView;
    }(ui.guild.hall.GuildSetUpUI));
    game.GuildSetUpView = GuildSetUpView;
})(game || (game = {}));
