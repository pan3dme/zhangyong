var game;
(function (game) {
    var BossInfoVo = /** @class */ (function () {
        function BossInfoVo(tbBoss) {
            this.sortNum = 0; // 排序编号
            this.quality = 1;
            this.tbBoss = tbBoss;
            var monsterId = this.tbBoss.monster.find(function (id) {
                return Number(id) != 0;
            });
            this.tbMonster = tb.TB_monster.get_TB_monsterById(monsterId);
            this.quality = tbBoss.ID <= 2 ? 1 : (tbBoss.ID <= 5 ? 2 : 3);
        }
        BossInfoVo.prototype.setSvo = function (svo) {
            this.svo = svo;
            // 已解锁 等级从高到底；未解锁，等级从低到高
            if (!this.isOpen()) {
                this.sortNum = 10000 + this.tbBoss.level;
            }
            else {
                this.sortNum = -this.tbBoss.level;
            }
        };
        BossInfoVo.prototype.getRewardList = function () {
            if (!this._rewardList) {
                this._rewardList = [];
                this._rewardList.push(new AwardRankData(1, "1", this.getItemList(this.tbBoss.rank_1)));
                this._rewardList.push(new AwardRankData(2, "2", this.getItemList(this.tbBoss.rank_2)));
                this._rewardList.push(new AwardRankData(3, "3", this.getItemList(this.tbBoss.rank_2)));
                this._rewardList.push(new AwardRankData(4, "4-10", this.getItemList(this.tbBoss.rank_3)));
                this._rewardList.push(new AwardRankData(5, LanMgr.getLan("", 12501) + "10", this.getItemList(this.tbBoss.rank_4)));
            }
            return this._rewardList;
        };
        BossInfoVo.prototype.getItemList = function (rankAry) {
            var result = [];
            rankAry.forEach(function (ary) {
                result.push(new ItemVo(Number(ary[0]), Number(ary[1])));
            });
            return result;
        };
        /** 是否开启 */
        BossInfoVo.prototype.isOpen = function () {
            return App.hero.level >= this.tbBoss.level;
        };
        /** 是否死亡 */
        BossInfoVo.prototype.isDead = function () {
            return this.svo.bossReviveTime > App.serverTimeSecond;
        };
        /** 获取怪物总血量 */
        BossInfoVo.prototype.getBossTotalHp = function () {
            return this.tbMonster.getPropValByType(1);
        };
        /** 获取怪物剩余血量 */
        BossInfoVo.prototype.getBossHp = function () {
            return this.svo.bossHp;
        };
        /** 获取怪物血量 -- 战斗初始化血量，有阵容顺序的 */
        BossInfoVo.prototype.getMonstersHp = function () {
            var hpAry = [];
            for (var i = 0; i < this.tbBoss.monster.length; i++) {
                if (Number(this.tbBoss.monster[i]) != 0) {
                    hpAry.push(this.svo.bossHp);
                }
                else {
                    hpAry.push(0);
                }
            }
            // loghgy('getMonstersHp',hpAry);
            return hpAry;
        };
        // ============= 结算界面 ==============
        /** 获取本次伤害 */
        BossInfoVo.prototype.getCurDamage = function () {
            // let damage = 0;
            // for(let id in this.enemyLossHp){
            //     damage += this.enemyLossHp[id];
            // }
            // return damage;
            return this.enemyLossHp;
        };
        /** 结算界面总伤害 */
        BossInfoVo.prototype.getTotalDamage = function () {
            var total = this.battleEndData['totalDamage'] ? this.battleEndData['totalDamage'] : 0;
            return Math.floor(total);
        };
        BossInfoVo.prototype.getRank = function () {
            return this.battleEndData['rank'] ? this.battleEndData['rank'] : 0;
        };
        /** 设置排行榜 */
        BossInfoVo.prototype.setRankList = function (ary) {
            this.rankList = [];
            for (var i = 0; i < 3; i++) {
                var vo = ary[i] || {};
                vo['rank'] = i;
                this.rankList.push(vo);
            }
        };
        return BossInfoVo;
    }());
    game.BossInfoVo = BossInfoVo;
    var BossRankInfo = /** @class */ (function () {
        function BossRankInfo(info, rank) {
            this.svo = info;
            this.rank = rank;
            this.head = info.head;
            this.headVo = new UserHeadVo(info.head, info.playerLevel, info.headFrame);
        }
        return BossRankInfo;
    }());
    game.BossRankInfo = BossRankInfo;
})(game || (game = {}));
