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
    var GuildDonationProcessor = /** @class */ (function (_super) {
        __extends(GuildDonationProcessor, _super);
        function GuildDonationProcessor() {
            return _super.call(this) || this;
        }
        GuildDonationProcessor.prototype.getName = function () {
            return "GuildDonationProcessor";
        };
        GuildDonationProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.GUILD_DONATE),
                new game.GuildEvent(game.GuildEvent.UPDATE_GUILD_DONATE),
            ];
        };
        //处理事件
        GuildDonationProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GuildEvent) {
                switch ($event.type) {
                    case game.GuildEvent.GUILD_DONATE:
                        this.guildDonate($event.data);
                        break;
                    case game.GuildEvent.UPDATE_GUILD_DONATE:
                        this.updateDonate();
                        break;
                }
            }
        };
        /** 公会捐献 */
        GuildDonationProcessor.prototype.guildDonate = function (donateVo) {
            var _this = this;
            //判断消耗是否足够
            if (UIUtil.checkNotEnough(donateVo.tbDonate.cost[0], donateVo.tbDonate.cost[1])) {
                return;
            }
            if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate) != 0) {
                showToast(LanMgr.getLan('', 10392));
                return;
            }
            var arg = {};
            arg[Protocol.guild_guild_donate.args.id] = donateVo.tbDonate.ID;
            PLC.request(Protocol.guild_guild_donate, arg, function (data) {
                if (!data)
                    return;
                if (data.hasOwnProperty('modifyGuildExp')) {
                    App.hero.guildExp = data.modifyGuildExp;
                    var info = game.GuildModel.getInstance().guildInfo;
                    if (info) {
                        info.exp = data.modifyGuildExp;
                        info.level = data.modifyGuildLevel;
                    }
                }
                UIUtil.showRewardView(data.commonData);
                _this.donateView.renderView();
                dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_DONATE_SUCCESS));
            });
        };
        /** 更新公会捐献 */
        GuildDonationProcessor.prototype.updateDonate = function () {
            if (this.donateView) {
                this.donateView.renderView();
            }
        };
        Object.defineProperty(GuildDonationProcessor.prototype, "donateView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GuildDonationView);
            },
            enumerable: true,
            configurable: true
        });
        return GuildDonationProcessor;
    }(tl3d.Processor));
    game.GuildDonationProcessor = GuildDonationProcessor;
})(game || (game = {}));
