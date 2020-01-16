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
    var ServerPage = /** @class */ (function (_super) {
        __extends(ServerPage, _super);
        function ServerPage() {
            return _super.call(this) || this;
        }
        ServerPage.prototype.initPage = function ($json) {
            this.pagejson = $json;
            this.waveKey = Object.keys(this.pagejson);
            this.curwave = 0;
            this.curround = 0;
        };
        ServerPage.prototype.initState = function () {
            this.curwave = 0;
            this.curround = 0;
            this.isQuick = false;
        };
        /**
         * 获得战报中需要预加载的模型和技能
         */
        ServerPage.prototype.getPreloadIds = function () {
            var roleary = [];
            var skillary = [];
            var tempTeam;
            var tempLocal;
            for (var wave in this.pagejson) {
                var infoRound = this.pagejson[wave]["0"];
                if (infoRound) {
                    var tempWaveObj = { "1": { god: {}, monster: {} }, "2": { god: {}, monster: {} } };
                    var normalopt = infoRound[game.StepKeyConst.START];
                    for (var i = 0; normalopt && i < normalopt.length; i++) {
                        var step = normalopt[i];
                        if (step.type !== undefined && step.type == iface.tb_prop.battleOpTypeKey.objInit) {
                            tempTeam = Math.floor(step.objId / 10);
                            tempLocal = step.objId % 10 - 1;
                            if (step.templateId && step.objType) {
                                var _skills = [];
                                var tab = void 0;
                                if (step.objType == iface.tb_prop.battleObjTypeKey.god) {
                                    tempWaveObj[tempTeam].god[tempLocal] = step.templateId;
                                    tab = tb.TB_god.get_TB_godById(step.templateId);
                                    for (var h = 0; h < tab.skill.length; h++) {
                                        if (tab.skill[h][1] <= step.degree) {
                                            _skills.push(tab.skill[h][0]);
                                        }
                                    }
                                }
                                else {
                                    tempWaveObj[tempTeam].monster[tempLocal] = step.templateId;
                                    tab = tb.TB_monster.get_TB_monsterById(step.templateId);
                                    _skills = tab.skill;
                                }
                                //角色模型
                                this.addlist(roleary, tab.model);
                                //技能
                                for (var k = 0; k < _skills.length; k++) {
                                    var tabskill = tb.TB_skill.get_TB_skillById(_skills[k]);
                                    if (tabskill.effect > 0) {
                                        var skilleff = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect).effect_id;
                                        this.addlist(skillary, skilleff);
                                        break;
                                    }
                                }
                            }
                        }
                        //神器初资源
                        if (step.type !== undefined && step.type == iface.tb_prop.battleOpTypeKey.atftInit) {
                            if (step.templateId) {
                                this.addlist(roleary, tb.TB_artifact.get_TB_artifactById(step.templateId).model);
                            }
                            if (step.skillId) {
                                //技能
                                var tabskill = tb.TB_skill.get_TB_skillById(step.skillId);
                                if (tabskill.effect > 0) {
                                    var skilleff = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect).effect_id;
                                    this.addlist(skillary, skilleff);
                                }
                            }
                        }
                    }
                    this.waveObj[wave] = tempWaveObj;
                }
            }
            return { roles: roleary, skills: skillary };
        };
        //获得一共多少波
        ServerPage.prototype.getWaveNum = function () {
            return this.waveKey.length;
        };
        ServerPage.prototype.getTitle = function () {
            return this.curwave + "/" + this.getWaveNum();
        };
        ServerPage.prototype.resetWave = function (wave) {
            this.curwave = wave;
            this.curround = -1;
        };
        //获得下一回合的数据
        ServerPage.prototype.getNextRound = function (newWave) {
            if (newWave === void 0) { newWave = false; }
            if (this.curwave == 0) {
                this.resetWave(1);
            }
            if (this.curwave > this.getWaveNum()) {
                //结束
                this.resetWave(0);
                return null;
            }
            //取下一回合的数据
            this.curround++;
            var waveDate = this.pagejson[String(this.curwave)];
            var scurround = String(this.curround);
            if (waveDate.hasOwnProperty(scurround)) {
                //重设数据结构
                var ary = [];
                var roundObj = waveDate[scurround];
                if (roundObj[game.StepKeyConst.START]) {
                    ary.push(roundObj[game.StepKeyConst.START]);
                }
                if (roundObj[game.StepKeyConst.END]) {
                    ary.push(roundObj[game.StepKeyConst.END]);
                }
                return [{ roundary: ary, roundmap: roundObj, newWave: newWave, succOpt: [] }];
            }
            else {
                //这波数据结束。下一波
                this.resetWave(this.curwave + 1);
                return this.getNextRound(true);
            }
        };
        /**
         * 不支持多波怪物战斗后获取丢失血量
         * 只支持单波战斗
         */
        ServerPage.prototype.getLossHpObj = function () {
            return this.lossHpObj || {};
        };
        ServerPage.prototype.getMaxHpObj = function () {
            return this.maxHpObj || {};
        };
        ServerPage.prototype.getResult = function () {
            return this.result;
        };
        ServerPage.prototype.clonePage = function (vo) {
            var serverPage = new ServerPage();
            serverPage.initPage(this.pagejson);
            serverPage.result = this.getResult();
            return serverPage;
        };
        return ServerPage;
    }(game.FightPage));
    game.ServerPage = ServerPage;
})(game || (game = {}));
