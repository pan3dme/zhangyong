var game;
(function (game) {
    var GuildDonationVo = /** @class */ (function () {
        function GuildDonationVo(tb) {
            this.tbDonate = tb;
        }
        GuildDonationVo.prototype.isDonate = function () {
            var id = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate);
            return id == this.tbDonate.ID;
        };
        /** 获取贡献值 */
        GuildDonationVo.prototype.getDonate = function () {
            var num = 0;
            var reward = this.tbDonate.reward;
            for (var _i = 0, reward_1 = reward; _i < reward_1.length; _i++) {
                var ary = reward_1[_i];
                if (Number(ary[0]) == iface.tb_prop.resTypeKey.guildDonate) {
                    num = Number(ary[1]);
                    break;
                }
            }
            return num;
        };
        return GuildDonationVo;
    }());
    game.GuildDonationVo = GuildDonationVo;
})(game || (game = {}));
