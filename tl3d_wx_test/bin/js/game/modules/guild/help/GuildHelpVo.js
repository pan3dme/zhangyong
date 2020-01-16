var game;
(function (game) {
    /** 我的求助数据vo */
    var GuildHelpVo = /** @class */ (function () {
        function GuildHelpVo() {
            this.pos = -1; // 栏位 从0开始
        }
        GuildHelpVo.prototype.updateSvo = function (svo) {
            this.svo = svo;
            if (svo) {
                this.tbHelp = tb.TB_guild_help.getItemnById(svo.helpType);
                if (!this.tbHelp) {
                    logerror("数据错误,", svo);
                }
                // 因为更新数据频繁，防止重复创建
                var vo = this.tbHelp.getRewardList()[0];
                if (!this._itemVo) {
                    this._itemVo = new ItemVo(0, 0);
                    this._itemVo.show = true;
                }
                this._itemVo.id = vo.id;
                this._itemVo.count = vo.count;
            }
            else {
                this.tbHelp = null;
            }
        };
        GuildHelpVo.prototype.getItemVo = function () {
            return this._itemVo && this._itemVo.id ? this._itemVo : null;
        };
        // ------- 我的求援列表vo数据 --------
        /** 获取可领取数量 */
        GuildHelpVo.prototype.getCanRewardNum = function () {
            return this.svo ? this.svo.helpNum - this.svo.getNum : 0;
        };
        /** 是否求援过 */
        GuildHelpVo.prototype.isExist = function () {
            return this.svo ? true : false;
        };
        /** 是否可领取 */
        GuildHelpVo.prototype.isCanReward = function () {
            return this.getCanRewardNum() > 0;
        };
        /** 是否领取完成 */
        GuildHelpVo.prototype.isRewardFinish = function () {
            return this.svo && this.svo.getNum >= this.tbHelp.help_num;
        };
        /** 是否完成 */
        GuildHelpVo.prototype.isFinish = function () {
            return this.svo && this.svo.helpNum >= this.tbHelp.help_num;
        };
        /** 是否免费 */
        GuildHelpVo.prototype.isFree = function () {
            return game.GuildHelpModel.getInstance().isFreeHelp();
        };
        /** 获取援助消耗 */
        GuildHelpVo.prototype.getCost = function () {
            return tb.TB_guild_set.getSet().help_cost[0];
        };
        /** 清理 */
        GuildHelpVo.prototype.clear = function () {
            this.svo = null;
            this.tbHelp = null;
        };
        return GuildHelpVo;
    }());
    game.GuildHelpVo = GuildHelpVo;
})(game || (game = {}));
