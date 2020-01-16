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
     * 只支持己方神器
     * 出手顺序:当行动条和速度值相同时，我方阵营的靠前站位先出手
     * 只有在有效回合内，击败所有敌方，才算胜利
     */
    var BattleScenePve = /** @class */ (function (_super) {
        __extends(BattleScenePve, _super);
        function BattleScenePve(type) {
            return _super.call(this, type) || this;
        }
        BattleScenePve.prototype.atkBarRank = function (a, b) {
            if (a.getAtkBar() !== b.getAtkBar()) {
                return b.getAtkBar() - a.getAtkBar();
            }
            if (a.atkSpd !== b.atkSpd) {
                return b.atkSpd - a.atkSpd;
            }
            if (a.camp !== b.camp) {
                return a.camp - b.camp; // pve里，我方先出手
            }
            return a.idx - b.idx; // 站位前的先出手
        };
        return BattleScenePve;
    }(battle.BattleScene));
    battle.BattleScenePve = BattleScenePve;
})(battle || (battle = {}));
