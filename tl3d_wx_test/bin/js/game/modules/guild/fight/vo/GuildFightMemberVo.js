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
    var GuildFightMemberVo = /** @class */ (function (_super) {
        __extends(GuildFightMemberVo, _super);
        function GuildFightMemberVo(isMyTeam) {
            var _this = _super.call(this) || this;
            _this.isMyTeam = isMyTeam;
            return _this;
        }
        GuildFightMemberVo.prototype.setServerInfo = function (svo) {
            if (this.svo) {
                for (var key in svo) {
                    this.svo[key] = svo[key];
                }
            }
            else {
                this.svo = svo;
                this.headVo = new UserHeadVo(this.svo.head, this.svo.level, this.svo.headFrame);
            }
            if (!this.lineupInfo) {
                _super.prototype.setLineupInfo.call(this, this.svo.lineupInfo);
            }
            // 按照还有生命和没生命排列，然后再按钮积分排列
            this.sortNum = svo.integral + svo.lifeNum * 10000000;
        };
        /** 是否死亡 */
        GuildFightMemberVo.prototype.isDead = function () {
            return this.svo.lifeNum <= 0;
        };
        /** 获取阵容当前血量 */
        GuildFightMemberVo.prototype.getLineupCurHp = function () {
            var blood = 0;
            var hpInfo = this.svo.hpInfo;
            for (var gid in hpInfo) {
                if (!isNaN(hpInfo[gid])) {
                    blood += hpInfo[gid];
                }
            }
            return blood;
        };
        /** 获取玩家的英雄id组（战斗的英雄） */
        GuildFightMemberVo.prototype.getLineupGodIds = function () {
            var ary = [];
            for (var i = 0; i < this.lineupGods.length; i++) {
                var vo = this.lineupGods[i];
                if (vo) {
                    var blood = this.getGodCurHp(vo.templateId);
                    if (blood > 0) {
                        ary.push(vo.templateId);
                    }
                    else {
                        ary.push(0);
                    }
                }
                else {
                    ary.push(0);
                }
            }
            return ary;
        };
        /** 获取敌方阵容英雄初始血量（战斗使用） */
        GuildFightMemberVo.prototype.getEnemyGodsHpAry = function () {
            var hps = [];
            var godAry = this.getLineupGodIds();
            for (var i = 0; i < godAry.length; i++) {
                var id = godAry[i];
                if (id != 0) {
                    hps.push(this.getGodCurHp(id));
                }
                else {
                    hps.push(0);
                }
            }
            return hps;
        };
        /** 获取英雄当前血量 */
        GuildFightMemberVo.prototype.getGodCurHp = function (tbid) {
            return this.svo.hpInfo[tbid] ? this.svo.hpInfo[tbid] : 0;
        };
        /**
         * 传给后端的伤害信息 对手剩余血量（key：英雄id, value: 血量）
         */
        GuildFightMemberVo.prototype.getEnemyHpInfo = function (lossHpInfo) {
            var enemyHp = {};
            for (var gid in lossHpInfo) {
                var baseHp = this.getGodTotalHp(Number(gid));
                var totalHp = this.getGodCurHp(Number(gid));
                var result = totalHp - (lossHpInfo[gid] ? lossHpInfo[gid] : 0);
                result = result <= 0 ? 0 : result;
                result = result > baseHp ? baseHp : result;
                enemyHp[gid] = Math.round(result);
            }
            return enemyHp;
        };
        /** 复制一份数据 */
        GuildFightMemberVo.copy = function (oldInfo) {
            var vo = new GuildFightMemberVo(oldInfo.isMyTeam);
            var data = JSON.parse(JSON.stringify(oldInfo.svo));
            vo.setServerInfo(data);
            return vo;
        };
        return GuildFightMemberVo;
    }(BaseFightVo));
    game.GuildFightMemberVo = GuildFightMemberVo;
})(game || (game = {}));
