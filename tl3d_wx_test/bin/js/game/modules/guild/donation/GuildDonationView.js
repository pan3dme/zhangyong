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
    var GuildDonationView = /** @class */ (function (_super) {
        __extends(GuildDonationView, _super);
        function GuildDonationView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GuildDonationView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildDonationView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildDonationView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list.array = null;
            this.bgPanel.dataSource = null;
        };
        GuildDonationView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.GuildDonationView, closeOnSide: this.isModelClose, title: "公会贡献" };
            this.list.itemRender = game.GuildDonationItemRender;
            this.renderView();
        };
        GuildDonationView.prototype.renderView = function () {
            var guildInfo = game.GuildModel.getInstance().guildInfo;
            this.lbTitle.text = guildInfo.name + " Lv\uFF1A" + guildInfo.level;
            this.lbExp.text = guildInfo.exp + "/" + tb.TB_guild.get_TB_guildById(guildInfo.level).need_exp;
            this.expProg.value = guildInfo.exp / tb.TB_guild.get_TB_guildById(guildInfo.level).need_exp;
            this.lbGongxian.text = "X" + App.hero.guildDonate;
            this.list.array = game.GuildModel.getInstance().getDonationList();
        };
        return GuildDonationView;
    }(ui.guild.donation.GuildDonationUI));
    game.GuildDonationView = GuildDonationView;
})(game || (game = {}));
