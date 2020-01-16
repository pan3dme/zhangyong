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
    /**
     * 用于标注当前战斗的类型--播放战报
     */
    var NewClientPage = /** @class */ (function (_super) {
        __extends(NewClientPage, _super);
        function NewClientPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewClientPage.prototype.clonePage = function (vo) {
            var serverPage = new NewClientPage();
            serverPage.defType = this.defType;
            var battleScene = new battle.BattleScenePve(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), this.defType, vo.getAllRound(), vo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            serverPage.result = isWin ? playState.VICTORY : playState.FAILURE;
            serverPage.initPage(battleScene.battleReport);
            return serverPage;
        };
        return NewClientPage;
    }(game.ServerPage));
    game.NewClientPage = NewClientPage;
})(game || (game = {}));
