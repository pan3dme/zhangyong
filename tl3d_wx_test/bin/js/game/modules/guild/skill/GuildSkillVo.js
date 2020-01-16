var game;
(function (game) {
    var GuildSkillVo = /** @class */ (function () {
        function GuildSkillVo(godType, attrType) {
            this.godType = godType;
            this.attrType = attrType;
            this.updateData();
        }
        GuildSkillVo.prototype.updateData = function () {
            this.lv = game.GuildSkillModel.getInstance().getSkillLv(this.godType, this.attrType);
            this.tbSkill = tb.TB_guild_skill.getTbByParam(this.godType, this.attrType, this.lv);
        };
        /** 返回当前效果的字符串 */
        GuildSkillVo.prototype.getXiaoguo = function () {
            if (this.tbSkill.attr[0] <= 4 && this.tbSkill.attr[1] == 0) {
                return this.tbSkill.attr[2] + '';
            }
            return (Math.floor(this.tbSkill.attr[2] * 10000) / 100) + '%';
        };
        /** 获得属性球最大等级 */
        GuildSkillVo.prototype.getMaxLv = function () {
            var count = 0;
            var initId = this.godType * 1000 + this.attrType * 100 + 0;
            for (var id = initId;; id++) {
                var tbSkill = tb.TB_guild_skill.get_TB_guild_skillById(id);
                if (tbSkill.cost == 0)
                    break;
                count++;
            }
            return count;
        };
        /** 是否可升级 */
        GuildSkillVo.prototype.isCanLvup = function () {
            return this.tbSkill.cost != 0 && this.tbSkill.cost <= App.hero.guildDonate;
        };
        return GuildSkillVo;
    }());
    game.GuildSkillVo = GuildSkillVo;
})(game || (game = {}));
