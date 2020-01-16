var game;
(function (game) {
    var GuildChallengeVo = /** @class */ (function () {
        function GuildChallengeVo() {
        }
        GuildChallengeVo.prototype.setSvo = function (vo) {
            this.svo = vo;
        };
        GuildChallengeVo.prototype.setGuanqiaVo = function (guanqia) {
            this.guanqiaVo = guanqia;
            this.tbCopy = tb.TB_guild_copy.getItemnById(guanqia.tbCopy.ID);
            var monsterId = this.tbCopy.getMonterId();
            this.monster = tb.TB_monster.get_TB_monsterById(monsterId);
        };
        GuildChallengeVo.prototype.getName = function () {
            return LanMgr.getLan('', 10030, this.tbCopy.ID % 10);
        };
        GuildChallengeVo.prototype.getRankList = function () {
            if (!this._rankList) {
                this._rankList = [];
                for (var key in this.svo.rankInfo) {
                    this._rankList.push(new GuildChallengeItemVo(this.tbCopy, this.svo.rankInfo[key], parseInt(key)));
                }
            }
            return this._rankList;
        };
        /** 是否击过杀怪物 */
        GuildChallengeVo.prototype.isKillMonsters = function (playerid) {
            if (this.svo && this.svo.rankInfo) {
                for (var id in this.svo.rankInfo) {
                    var rankInfo = this.svo.rankInfo[id];
                    if (rankInfo && rankInfo[0] == playerid)
                        return true;
                }
            }
            return false;
        };
        /** 获取怪物总血量 */
        GuildChallengeVo.prototype.getMonstersBlood = function () {
            return this.monster.getPropValByType(1);
        };
        /** 获取怪物剩余血量 */
        GuildChallengeVo.prototype.getMonstersRestBlood = function () {
            var total = 0;
            for (var id in this.svo.mosterInfo) {
                total += Math.ceil(this.svo.mosterInfo[id]);
            }
            return total;
        };
        GuildChallengeVo.prototype.getSelfRank = function () {
            var find = this.getRankList().find(function (vo) {
                return vo.playerId == App.hero.playerId;
            });
            return find ? find.rank : 0;
        };
        GuildChallengeVo.prototype.isPass = function () {
            return this.getMonstersRestBlood() <= 0;
        };
        /** 获取怪物血量 */
        GuildChallengeVo.prototype.getMonstersHp = function () {
            var hps = [];
            var monsterAry = this.tbCopy.moster;
            for (var i = 0; i < monsterAry.length; i++) {
                var id = monsterAry[i];
                if (Number(id) != 0) {
                    var monster = tb.TB_monster.get_TB_monsterById(id);
                    var blood = this.svo.mosterInfo[id] ? this.svo.mosterInfo[id] : monster.getPropValByType(1);
                    hps.push(blood);
                }
                else {
                    hps.push(0);
                }
            }
            return hps;
        };
        // ============= 结算界面 ==============
        /** 获取本次伤害 */
        GuildChallengeVo.prototype.getCurDamage = function () {
            var damage = 0;
            for (var id in this.enemyLossHp) {
                damage += this.enemyLossHp[id];
            }
            return Math.floor(damage);
        };
        /** 结算界面总伤害 */
        GuildChallengeVo.prototype.getTotalDamage = function () {
            var total = this.battleEndData['totalDamage'] ? this.battleEndData['totalDamage'] : 0;
            return Math.floor(total);
        };
        GuildChallengeVo.prototype.getRank = function () {
            return this.battleEndData['rank'] ? this.battleEndData['rank'] : 0;
        };
        return GuildChallengeVo;
    }());
    game.GuildChallengeVo = GuildChallengeVo;
    var GuildChallengeItemVo = /** @class */ (function () {
        function GuildChallengeItemVo(tb, ary, rank) {
            this.tbCopy = tb;
            this.rank = rank;
            this.playerId = ary[0];
            this.playerName = ary[1];
            this.head = ary[2];
            this.level = ary[3];
            this.damage = ary[4];
            this.headFrame = ary[5];
            this.headVo = new UserHeadVo(this.head, this.level, this.headFrame);
        }
        GuildChallengeItemVo.prototype.getRewardList = function () {
            if (!this._rewardList) {
                this._rewardList = [];
                var reward = void 0;
                if (this.rank == 1) {
                    reward = this.tbCopy.rank_1;
                }
                else if (this.rank == 2) {
                    reward = this.tbCopy.rank_2;
                }
                else if (this.rank == 3) {
                    reward = this.tbCopy.rank_3;
                }
                else {
                    reward = this.tbCopy.rank_4;
                }
                for (var i = 0; i < reward.length; i++) {
                    this._rewardList.push(new ItemVo(reward[i][0], reward[i][1]));
                }
            }
            return this._rewardList;
        };
        return GuildChallengeItemVo;
    }());
    game.GuildChallengeItemVo = GuildChallengeItemVo;
})(game || (game = {}));
