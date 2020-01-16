var battle;
(function (battle) {
    var BatteConsts = /** @class */ (function () {
        function BatteConsts() {
        }
        BatteConsts.RECOVER_HP_PERCENT = 0.7; // 回血类技能血量百分比限制
        BatteConsts.MAX_ARTIFACT_LEVEL = 1000; // 最大神器等级
        // 战斗阵营
        BatteConsts.BATTLE_CAMPATK = 1; // 进攻方
        BatteConsts.BATTLE_CAMPDEF = 2; // 防守方
        BatteConsts.MAX_BATTLE_TARGET = 5; // 战斗最大目标数
        BatteConsts.GUARD_HP_PERCENT = 0.3; // 守护类技能血量百分比限制
        return BatteConsts;
    }());
    battle.BatteConsts = BatteConsts;
})(battle || (battle = {}));
