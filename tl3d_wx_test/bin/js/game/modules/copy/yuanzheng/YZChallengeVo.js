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
    var YZChallengeVo = /** @class */ (function (_super) {
        __extends(YZChallengeVo, _super);
        function YZChallengeVo() {
            return _super.call(this) || this;
        }
        /** 设置关卡挑战的玩家数据 */
        YZChallengeVo.prototype.setServerInfo = function (svo) {
            this.svo = svo;
            _super.prototype.setLineupInfo.call(this, this.svo.lineupInfo);
            this.headVo = new UserHeadVo(this.svo.head, this.svo.level, this.svo.headFrame);
        };
        /** 设置关卡数据 */
        YZChallengeVo.prototype.setGuanqiaVo = function (vo) {
            this.guanqiaVo = vo;
        };
        /** 获取玩家的英雄id组 */
        YZChallengeVo.prototype.getLineupGodIds = function () {
            var ary = [];
            for (var i = 0; i < this.lineupGods.length; i++) {
                var vo = this.lineupGods[i];
                if (vo) {
                    var blood = this.svo.hpInfo[vo.templateId];
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
        /** 获取英雄当前血量 */
        YZChallengeVo.prototype.getEnemyGodHp = function (tbid) {
            return this.svo.hpInfo[tbid];
        };
        /** 获取敌方阵容英雄初始血量（战斗使用） */
        YZChallengeVo.prototype.getEnemyGodsHpAry = function () {
            var hps = [];
            var godAry = this.getLineupGodIds();
            for (var i = 0; i < godAry.length; i++) {
                var id = godAry[i];
                if (id != 0) {
                    var god = tb.TB_god.get_TB_godById(id);
                    var blood = this.svo.hpInfo[id];
                    hps.push(blood);
                }
                else {
                    hps.push(0);
                }
            }
            return hps;
        };
        /** 获取己方阵容英雄初始血量万分比（战斗使用） */
        YZChallengeVo.prototype.getSelfGodsHp = function () {
            var hpAry = [];
            var godidAry = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.expedition, true);
            var expeditionSelfHpInfo = App.hero.copyInfo.expeditionSelfHpInfo;
            for (var i = 0; i < godidAry.length; i++) {
                // let godvo: GodItemVo = App.hero.getGodVoById(godidAry[i]);
                // if (godvo) {
                // let percent = expeditionSelfHpInfo.hasOwnProperty(godvo.uuid) ? (expeditionSelfHpInfo[godvo.uuid] / YuanzhengModel.BLOOD_BASE) : 1;
                // hpAry.push(percent);
                // } else {
                //     hpAry.push(0);
                // }
                var percent = expeditionSelfHpInfo.hasOwnProperty(godidAry[i]) ? (expeditionSelfHpInfo[godidAry[i]] / game.YuanzhengModel.BLOOD_BASE) : 1;
                hpAry.push(percent);
            }
            // loghgy('getSelfGodsHp:',hpAry);
            return hpAry;
        };
        /** 传给后端的最终伤害信息（key：英雄id, value: 剩余血量万分比）
         *  向上取整
         */
        YZChallengeVo.prototype.getSelfHpInfo = function (lossHpInfo, totalHpInfo, isSuccess, lineUp) {
            var selfHpInfo = {};
            if (!isSuccess) {
                // 失败为0
                for (var uuid in lossHpInfo) {
                    selfHpInfo[this.getGodUuid(uuid, lineUp)] = 0;
                }
                loghgy('最终的剩余的血量万分比:', selfHpInfo);
                return selfHpInfo;
            }
            var expeditionSelfHpInfo = App.hero.copyInfo.expeditionSelfHpInfo;
            loghgy('lossHpInfo:', lossHpInfo, totalHpInfo, expeditionSelfHpInfo);
            for (var teamId in lossHpInfo) {
                var goduuid = this.getGodUuid(teamId, lineUp);
                var blood = totalHpInfo[teamId];
                var hp = lossHpInfo[teamId];
                // 11 ： 200
                // 失去的血量万分比
                var lossPercent = Math.ceil(hp / blood * game.YuanzhengModel.BLOOD_BASE);
                if (!expeditionSelfHpInfo.hasOwnProperty(goduuid)) {
                    expeditionSelfHpInfo[goduuid] = game.YuanzhengModel.BLOOD_BASE;
                }
                // 剩余的血量万分比
                var resetPercent = expeditionSelfHpInfo[goduuid] - lossPercent;
                resetPercent = resetPercent <= 0 ? 0 : resetPercent;
                resetPercent = resetPercent >= game.YuanzhengModel.BLOOD_BASE ? game.YuanzhengModel.BLOOD_BASE : resetPercent;
                selfHpInfo[goduuid] = resetPercent;
            }
            loghgy('最终的剩余的血量万分比:', selfHpInfo);
            return selfHpInfo;
        };
        YZChallengeVo.prototype.getGodUuid = function (uuid, lineUp) {
            var team = App.hero.lineupInfo[lineUp];
            if (team) {
                var id = (uuid % 10) - 1;
                //    let godvo = App.hero.getGodVoById(team[id])
                //    return godvo?godvo.templateId : -1;
                return team[id];
            }
        };
        return YZChallengeVo;
    }(BaseFightVo));
    game.YZChallengeVo = YZChallengeVo;
})(game || (game = {}));
