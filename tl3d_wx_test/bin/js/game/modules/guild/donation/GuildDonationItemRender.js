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
    var GuildDonationItemRender = /** @class */ (function (_super) {
        __extends(GuildDonationItemRender, _super);
        function GuildDonationItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildDonationItemRender.prototype, "dataSource", {
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
        GuildDonationItemRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.lbName.text = data.tbDonate.desc;
                this.lbGet.text = "\u516C\u4F1A\u8D21\u732E+" + data.getDonate();
                this.imgBg.skin = SkinUtil.getDonationImgUrl(data.tbDonate.ID);
                this.imgCost.skin = SkinUtil.getCostSkin(data.tbDonate.cost[0]);
                this.imgCost.scaleX = 1;
                this.imgCost.scaleY = 1;
                if (data.tbDonate.cost[0] == iface.tb_prop.resTypeKey.gold) {
                    this.imgCost.scaleX = 0.8;
                    this.imgCost.scaleY = 0.8;
                }
                this.lbCost.text = "X" + Snums(data.tbDonate.cost[1]);
                this.btnDonation.disabled = data.isDonate();
                if (!this.btnDonation.disabled) {
                    this.btnDonation.gray = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate) != 0;
                }
                this.btnDonation.label = data.isDonate() ? "已捐献" : "捐 献";
                this.btnDonation.on(Laya.Event.CLICK, this, this.onDonate);
            }
            else {
                this.btnDonation.off(Laya.Event.CLICK, this, this.onDonate);
            }
        };
        GuildDonationItemRender.prototype.onDonate = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_DONATE, this.dataSource));
        };
        return GuildDonationItemRender;
    }(ui.guild.donation.GuildDonationItemRenderUI));
    game.GuildDonationItemRender = GuildDonationItemRender;
})(game || (game = {}));
