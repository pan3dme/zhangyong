

module game {
    /**
     * 用于标注当前战斗的类型--播放战报
     */
    export class ServerPage extends FightPage {

        private pagejson;
        private waveKey: Array<string>;
        public curround: number;

        constructor() {
            super();
        }

        initPage($json) {
            this.pagejson = $json;
            this.waveKey = Object.keys(this.pagejson);
            this.curwave = 0;
            this.curround = 0;
        }

        initState(){
            this.curwave = 0;
            this.curround = 0;
            this.isQuick = false;
        }

        /**
         * 获得战报中需要预加载的模型和技能
         */
        getPreloadIds() {
            let roleary = [];
            let skillary = [];
            let tempTeam;
            let tempLocal;
            for (var wave in this.pagejson) {
                let infoRound = this.pagejson[wave]["0"];
                if (infoRound) {
                    let tempWaveObj = {"1":{god:{},monster:{}},"2":{god:{},monster:{}}};
                    let normalopt = infoRound[StepKeyConst.START];
                    for (var i = 0; normalopt && i < normalopt.length; i++) {
                        var step: StepVo = normalopt[i];
                        if (step.type !== undefined && step.type == iface.tb_prop.battleOpTypeKey.objInit) {
                            tempTeam = Math.floor(step.objId / 10);
                            tempLocal = step.objId % 10 - 1;
                            if (step.templateId && step.objType) {
                                let _skills = [];
                                let tab
                                if (step.objType == iface.tb_prop.battleObjTypeKey.god) {
                                    tempWaveObj[tempTeam].god[tempLocal] = step.templateId;
                                    tab = tb.TB_god.get_TB_godById(step.templateId);
                                    for (var h = 0; h < tab.skill.length; h++) {
                                        if (tab.skill[h][1] <= step.degree) {
                                            _skills.push(tab.skill[h][0]);
                                        }
                                    }
                                } else {
                                    tempWaveObj[tempTeam].monster[tempLocal] = step.templateId;
                                    tab = tb.TB_monster.get_TB_monsterById(step.templateId);
                                    _skills = tab.skill;
                                }
                                //角色模型
                                this.addlist(roleary, tab.model);
                                //技能
                                for (var k = 0; k < _skills.length; k++) {
                                    let tabskill = tb.TB_skill.get_TB_skillById(_skills[k]);
                                    if (tabskill.effect > 0) {
                                        let skilleff = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect).effect_id;
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
                                let tabskill = tb.TB_skill.get_TB_skillById(step.skillId);
                                if (tabskill.effect > 0) {
                                    let skilleff = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect).effect_id;
                                    this.addlist(skillary, skilleff);
                                }
                            }
                        }
                    }
                    this.waveObj[wave] = tempWaveObj;
                }
            }
            return { roles: roleary, skills: skillary };
        }

        //获得一共多少波
        getWaveNum(): number {
            return this.waveKey.length;
        }

        getTitle(): string {
            return this.curwave + "/" + this.getWaveNum();
        }

        private resetWave(wave: number) {
            this.curwave = wave;
            this.curround = -1;
        }

        //获得下一回合的数据
        getNextRound(newWave: boolean = false) {
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
            let waveDate = this.pagejson[String(this.curwave)];
            let scurround = String(this.curround);
            if (waveDate.hasOwnProperty(scurround)) {
                //重设数据结构
                let ary = [];
                let roundObj = waveDate[scurround];
                if (roundObj[StepKeyConst.START]) {
                    ary.push(roundObj[StepKeyConst.START]);
                }
                if (roundObj[StepKeyConst.END]) {
                    ary.push(roundObj[StepKeyConst.END]);
                }
                return [{ roundary: ary, roundmap: roundObj, newWave: newWave, succOpt:[] }];
            } else {
                //这波数据结束。下一波
                this.resetWave(this.curwave + 1);
                return this.getNextRound(true);
            }
        }

        /**
         * 不支持多波怪物战斗后获取丢失血量
         * 只支持单波战斗
         */
        getLossHpObj(): any {
            return this.lossHpObj || {};
        }

        getMaxHpObj(): any {
            return this.maxHpObj || {};
        }


        getResult(): number {
            return this.result;
        }

        clonePage(vo: FightVo) {
            let serverPage = new ServerPage();
			serverPage.initPage(this.pagejson);
			serverPage.result = this.getResult();
            return serverPage;
        }
    }
}


