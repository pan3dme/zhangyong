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
var battle;
(function (battle) {
    /**
     * 支持双方神器
     * 出手顺序:当行动条和速度值相同时，随机出手
     * 可自定义胜负条件
     */
    var BattleScenePvp = /** @class */ (function (_super) {
        __extends(BattleScenePvp, _super);
        function BattleScenePvp(type) {
            return _super.call(this, type) || this;
        }
        BattleScenePvp.prototype.calWinCamp = function () {
            if (this.type === CopyType.glory) {
                var atkAllHp = this.getCampAllHp(battle.BatteConsts.BATTLE_CAMPATK);
                var defAllHp = this.getCampAllHp(battle.BatteConsts.BATTLE_CAMPDEF);
                if (atkAllHp === defAllHp) {
                    return utils.random(battle.BatteConsts.BATTLE_CAMPATK, battle.BatteConsts.BATTLE_CAMPDEF);
                }
                return atkAllHp > defAllHp ? battle.BatteConsts.BATTLE_CAMPATK : battle.BatteConsts.BATTLE_CAMPDEF;
            }
            return battle.BatteConsts.BATTLE_CAMPDEF;
        };
        ;
        BattleScenePvp.prototype.getCampAllHp = function (camp) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return 0;
            }
            var allHp = 0;
            var objs = campData.objs;
            for (var idx in objs) {
                var obj = objs[idx];
                allHp += obj.hp;
            }
            return allHp;
        };
        ;
        BattleScenePvp.prototype.atkBarRank = function (a, b) {
            if (a.getAtkBar() !== b.getAtkBar()) {
                return b.getAtkBar() - a.getAtkBar();
            }
            if (a.atkSpd !== b.atkSpd) {
                return b.atkSpd - a.atkSpd;
            }
            return Math.random() < 0.5 ? -1 : 1;
        };
        return BattleScenePvp;
    }(battle.BattleScene));
    battle.BattleScenePvp = BattleScenePvp;
})(battle || (battle = {}));
