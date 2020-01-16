module game {
    /**
     * 用于标注当前战斗的类型--播放战报
     */
    export class NewClientPage extends ServerPage {
        clonePage(vo: FightVo) {
            let serverPage = new NewClientPage();
            serverPage.defType = this.defType;
            var battleScene = new battle.BattleScenePve(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), this.defType, vo.getAllRound(), vo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);

            serverPage.result = isWin ? playState.VICTORY : playState.FAILURE;
            serverPage.initPage(battleScene.battleReport);

            return serverPage;
        }
    }
}