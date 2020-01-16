var game;
(function (game) {
    var RankListVo = /** @class */ (function () {
        function RankListVo(id) {
            this.id = 0; //（1.战力排行，2.历练副本排行，3.等级排行，4.试炼塔排行，5.单英雄排行）
            this.myRank = 0;
            this.rankValue = 0;
            this.forceRankList = [];
            this.maxRank = 50;
            this.firstRankGodId = 0;
            this.firstAwakenLv = 0;
            this.secondRankGodId = 0;
            this.secondAwakenLv = 0;
            this.thirdRankGodId = 0;
            this.thirdAwakenLv = 0;
            this.id = id;
            this.rankType = tb.TB_rank_type.getSet(id);
            var rewards = tb.TB_rank_reward.getRewardListByType(this.rankType.type);
            this.rewardList = [];
            for (var i = 0; i < rewards.length; i++) {
                this.rewardList[i] = new game.PrRankVo(this.id, i, null);
                this.rewardList[i].reward = rewards[i];
                this.rewardList[i].rank = rewards[i].rank[0] == rewards[i].rank[1] ? String(rewards[i].rank[0]) : rewards[i].rank[0] + "~" + rewards[i].rank[1];
                ;
            }
        }
        //解析数据
        RankListVo.prototype.syncData = function (data) {
            this.godInfo = data['godInfo'] || {};
            this.firstRankGodId = this.godInfo[1] ? this.godInfo[1][0] : 0;
            this.firstAwakenLv = this.godInfo[1] ? this.godInfo[1][1] : 0;
            this.firstSkinId = this.godInfo[1] ? this.godInfo[1][2] : 0;
            this.secondRankGodId = this.godInfo[2] ? this.godInfo[2][0] : 0;
            this.secondAwakenLv = this.godInfo[2] ? this.godInfo[2][1] : 0;
            this.secondSkinId = this.godInfo[2] ? this.godInfo[2][2] : 0;
            this.thirdRankGodId = this.godInfo[3] ? this.godInfo[3][0] : 0;
            this.thirdAwakenLv = this.godInfo[3] ? this.godInfo[2][1] : 0;
            this.thirdSkinId = this.godInfo[3] ? this.godInfo[3][2] : 0;
            this.myRank = data.myRank;
            this.rankValue = data.rankValue;
            this.forceRankList = [];
            for (var i = 0; i < this.maxRank; i++) {
                var obj = data.forceRankList[i + 1];
                this.forceRankList[i] = new game.PrRankVo(this.id, i, obj);
                this.forceRankList[i].reward = this.getReward(i + 1);
            }
            for (var i = 0; i < this.rewardList.length; i++) {
                if (this.rewardList[i].reward.rank[0] == this.rewardList[i].reward.rank[1]) {
                    this.rewardList[i].copyInfo(this.forceRankList[this.rewardList[i].reward.rank[0] - 1]);
                }
            }
        };
        /** 获取模型ID */
        RankListVo.prototype.getModelId = function (rank) {
            if (rank == 1) {
                return game.GodUtils.getShowGodModel(this.firstRankGodId, this.firstSkinId);
            }
            else if (rank == 2) {
                return game.GodUtils.getShowGodModel(this.secondRankGodId, this.secondSkinId);
            }
            return game.GodUtils.getShowGodModel(this.thirdRankGodId, this.thirdSkinId);
        };
        RankListVo.prototype.getReward = function (rank) {
            for (var i = 0; i < this.rewardList.length; i++) {
                if (this.rewardList[i].reward.rank[0] <= rank && rank <= this.rewardList[i].reward.rank[1]) {
                    return this.rewardList[i].reward;
                }
            }
            return null;
        };
        //获取我的排行描述
        RankListVo.prototype.getMyRankDesc = function () {
            var selfData = this.forceRankList.find(function (Info) { return Info.playerID == App.hero.playerId; });
            switch (this.id) {
                case game.PrRankVo.ID_ZHANLI: //神力
                    return LanMgr.getLan("", 12178) + "：" + Snums(selfData ? selfData.power : App.hero.maxHistoryForce);
                case game.PrRankVo.ID_FUBEN: //副本
                    var model = game.GuajiModel.getInstance();
                    return LanMgr.getLan("", 12181) + "：" + model.getCopyRankDesc(selfData ? selfData.power : model.getMaxLev());
                case game.PrRankVo.ID_LEVEL: //等级
                    return LanMgr.getLan("", 12180) + "：" + (selfData ? selfData.power : App.hero.level);
                case game.PrRankVo.ID_SHENLING: //英雄星级
                    var star = 0;
                    if (selfData) {
                        star = selfData.power;
                    }
                    else {
                        var allgod = App.hero.getGodAry();
                        if (allgod && allgod.length > 1) {
                            star = allgod[0].starLevel;
                        }
                    }
                    return LanMgr.getLan("", 12630, star);
                case game.PrRankVo.ID_SHILIAN: //试炼塔
                    var copyId = App.hero.towerCopyInfo['2'] ? App.hero.towerCopyInfo['2'] : App.hero.towerCopyInfo['1'];
                    return LanMgr.getLan("", 12183) + "：" + game.TowerModel.getInstance().getCopyRankDesc(selfData ? selfData.power : copyId);
                default:
                    return "";
            }
        };
        //获取我的值描述
        RankListVo.prototype.getMyValueDesc = function () {
            return LanMgr.getLan("", 12265) + (this.myRank ? this.myRank : LanMgr.getLan("", 12187));
        };
        //获取标题
        RankListVo.prototype.getTitle = function () {
            switch (this.id) {
                case game.PrRankVo.ID_FUBEN: //副本
                    return LanMgr.getLan("", 12181);
                case game.PrRankVo.ID_LEVEL: //等级
                    return LanMgr.getLan("", 12179);
                case game.PrRankVo.ID_SHENLING: //神灵
                    return LanMgr.getLan("", 12629);
                case game.PrRankVo.ID_SHILIAN: //试炼
                    return LanMgr.getLan("", 12183);
                case game.PrRankVo.ID_ZHANLI: //战力
                    return LanMgr.getLan("", 12081);
                default:
                    return "";
            }
        };
        return RankListVo;
    }());
    game.RankListVo = RankListVo;
})(game || (game = {}));
