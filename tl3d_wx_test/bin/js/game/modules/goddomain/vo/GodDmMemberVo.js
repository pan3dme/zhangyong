var game;
(function (game) {
    var GodDmMemberVo = /** @class */ (function () {
        function GodDmMemberVo(pos) {
            this.pos = pos;
        }
        /** 清除数据 */
        GodDmMemberVo.prototype.clearVo = function () {
            this.svo = null;
            this.tbgod = null;
        };
        /** 更新最新数据 */
        GodDmMemberVo.prototype.updateData = function (data) {
            // 没有队员
            if (!data) {
                this.clearVo();
                return;
            }
            // 初始化
            if (!this.svo) {
                this.svo = data;
                this.tbgod = tb.TB_god.get_TB_godById(data.godId);
                return;
            }
            // 更新
            for (var key in data) {
                this.svo[key] = data[key];
            }
            // 没有公会时,data里面没有guildName字段；导致上面的遍历不够，需要重新判断
            if (!data.hasOwnProperty("guildName")) {
                this.svo.guildName = null;
            }
            this.tbgod = tb.TB_god.get_TB_godById(data.godId);
        };
        /** 奖励次数 */
        GodDmMemberVo.prototype.getRewardCnt = function () {
            return this.isSelf() ? App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) : this.svo.rewardCount;
        };
        /** 是否存在 */
        GodDmMemberVo.prototype.isExist = function () {
            return this.svo ? true : false;
        };
        /** 是否机器人 */
        GodDmMemberVo.prototype.isRobot = function () {
            return this.isExist() && this.svo.isRobot == 1;
        };
        /** 是否队长 */
        GodDmMemberVo.prototype.isCaptain = function () {
            return this.isExist() && this.svo.job == iface.tb_prop.groupJobTypeKey.captain;
        };
        GodDmMemberVo.prototype.isSelf = function () {
            return this.isExist() && this.svo.playerId == App.hero.playerId;
        };
        /** 是否准备 */
        GodDmMemberVo.prototype.isReady = function () {
            return this.isExist() && (this.isCaptain() || this.svo.state == iface.tb_prop.groupStateTypeKey.yes);
        };
        GodDmMemberVo.prototype.getModel = function () {
            return game.GodUtils.getShowGodModel(this.tbgod ? this.tbgod.ID : 0, this.svo.skinId);
        };
        return GodDmMemberVo;
    }());
    game.GodDmMemberVo = GodDmMemberVo;
})(game || (game = {}));
