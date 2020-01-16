var game;
(function (game) {
    var FightPage = /** @class */ (function () {
        function FightPage() {
            this.isQuick = false;
            this.waveObj = {};
        }
        FightPage.prototype.initPage = function ($jsonOrobj) {
        };
        FightPage.prototype.initState = function () {
        };
        FightPage.prototype.addlist = function (ary, vo) {
            if (ary.indexOf(vo) == -1) {
                ary.push(vo);
            }
        };
        /**
         * 获得战报中需要预加载的模型和技能
         */
        FightPage.prototype.getPreloadIds = function () {
            return { roles: [], skills: [] };
        };
        //获得一共多少波
        FightPage.prototype.getWaveNum = function () {
            return 0;
        };
        FightPage.prototype.getWaveObj = function () {
            return this.waveObj[this.curwave];
        };
        FightPage.prototype.getTitle = function () {
            return "";
        };
        //获得下一回合的数据
        FightPage.prototype.getNextRound = function (newWave) {
            if (newWave === void 0) { newWave = false; }
            return null;
        };
        FightPage.prototype.setAuto = function (val) {
            this.auto = val;
        };
        FightPage.prototype.selectSkillFight = function (data) {
        };
        FightPage.prototype.getResult = function () {
            return playState.FAILURE;
        };
        FightPage.prototype.quickFight = function () {
            this.isQuick = true;
        };
        /**
         * 不支持多波怪物战斗后获取丢失血量
         * 只支持单波战斗
         */
        FightPage.prototype.getLossHpObj = function () {
            return {};
        };
        FightPage.prototype.getMaxHpObj = function () {
            return {};
        };
        FightPage.prototype.clonePage = function (parm) {
            return null;
        };
        //销毁
        FightPage.prototype.onDestroy = function () {
        };
        return FightPage;
    }());
    game.FightPage = FightPage;
})(game || (game = {}));
