module battle {
    export class BattleScene {

        public type;
        public campDatas;
        private atkInfos: Array<any>;
        private defInfos: Array<any>;
        public defType;
        private campWaves;
        public wave: number;
        private isNewWave: boolean;
        public round;
        public showRound;
        //最大回合
        private maxRound;
        // public atkBarMax;
        public winCamp;
        public lastObjId;
        private buffInstId;
        //自定义初始化血量百分比
        private initHpObjs;
        public battleReport;
        public curObj: any;
        // public wait: boolean;
        public isInit: boolean;
        public isBackAtk: boolean;
        // private _auto: boolean;
        public waveResults: Object = {};

        constructor(type) {
            this.type = type;
            this.campDatas = {};
            this.atkInfos = [];
            this.defInfos = [];
            this.defType = null;
            this.campWaves = {};
            this.wave = 1;
            this.isNewWave = true;
            this.round = 0;
            this.showRound = 0;
            // this.atkBarMax = 0;
            this.winCamp = 0;
            this.lastObjId = 0;
            this.buffInstId = 0;
            this.isInit = false;
            // this.wait = false;
            // this.auto = true;
            this.battleReport = {};
            this._atkList = [];
        }

        /**
         * 
         * @param atkInfos //进攻方
         * @param defInfos //防守方
         * @param defType //目标是怪物还是神灵
         * @param maxRound //最大回合数
         * @param initHpObjs 初始化血量设定（可选） < 1时 设定百分比 >1时，为固定值
         */
        public init(atkInfos, defInfos, defType, maxRound, initHpObjs?) {
            this.atkInfos = atkInfos || [];
            this.defInfos = defInfos || [];
            this.maxRound = maxRound;
            this.initHpObjs = initHpObjs || {};
            this.defType = defType;
            let i;
            let camp = BatteConsts.BATTLE_CAMPATK;
            for (i = 0; i < this.atkInfos.length; i++) {
                let atkResults = this.waveResults[camp] = this.waveResults[camp] || [];
                atkResults[i] = atkResults[i] || 0;
            }
            camp = BatteConsts.BATTLE_CAMPDEF;
            for (i = 0; i < this.defInfos.length; i++) {
                let defResults = this.waveResults[camp] = this.waveResults[camp] || [];
                defResults[i] = defResults[i] || 0;
            }
            logfight("battle init. waveResults %j", this.waveResults);
        }

        // set auto(val: boolean) {
        //     this._auto = val;
        // }

        // get auto(): boolean {
        //     return this._auto;
        // }

        getWave() {
            return this.defInfos.length;
        }

        getDefInfos() {
            return this.defInfos;
        }

        getAtkInfos() {
            return this.atkInfos;
        }

        public getLineupInfo(camp) {
            var lineupInfo = null;
            switch (camp) {
                case BatteConsts.BATTLE_CAMPATK:
                    lineupInfo = this.atkInfos[this.getCampWave(camp) - 1];
                    break;
                case BatteConsts.BATTLE_CAMPDEF:
                    lineupInfo = this.defInfos[this.getCampWave(camp) - 1];
                    break;
                default:
                    break;
            }
            return lineupInfo;
        }

        public getCampWave(camp) {
            return this.campWaves[camp] || 1;
        }

        public addWave() {
            if (this.winCamp === 0) {
                return;
            }
            var loseCamp = getOppoCamp(this.winCamp);
            this.campWaves[loseCamp] = this.campWaves[loseCamp] || 1;
            this.campWaves[loseCamp]++;
            this.wave++;
            this.isNewWave = true;
        }

        public createPlayerData(camp) {
            var lineupInfo = this.getLineupInfo(camp);
            if (!lineupInfo) {
                return;
            }
            var battleGods = this.createBattleGods(camp, lineupInfo[0], iface.tb_prop.battleObjTypeKey.god);
            var battleArtifact = this.createBattleArtifact(camp, lineupInfo[1]);
            var campData = {
                objs: battleGods,
                artifact: battleArtifact
            };
            this.campDatas[camp] = campData;
            for (var key in battleGods) {
                var god: BattleGod = battleGods[key];
                let id = god.idx;
                let hpkey = god.camp *100 + id;
                let inithpnum = isEmptyObject(this.initHpObjs) ? -1 : this.initHpObjs.hasOwnProperty(hpkey) ? this.initHpObjs[hpkey] : -1;
                god.afterCreate(inithpnum);
            }
        }

        public createBattleGods(camp, godsInfo, type: number) {
            if (!godsInfo || godsInfo.length <= 0) {
                return {};
            }
            var battleGods = {};
            for (var idx = 0; idx < godsInfo.length; idx++) {
                var info = godsInfo[idx];
                if (!info) {
                    continue;
                }

                let id = idx + 1;
                let key = camp *100 + id;
                let inithpnum = isEmptyObject(this.initHpObjs) ? -1 : this.initHpObjs.hasOwnProperty(key) ? this.initHpObjs[key] : -1;
                let god: BattleObj;
                if (type == iface.tb_prop.battleObjTypeKey.monster) {
                    god = new BattleMonster(camp, id, info);
                } else {
                    god = new BattleGod(camp, id, info);
                }
                god.onCreate(this, inithpnum);
                battleGods[idx] = god;
            }
            return battleGods;
        }

        public createBattleArtifact(camp, artifactInfo) {
            if (!artifactInfo || artifactInfo.length <= 0) {
                return null;
            }
            var artifact = new BattleArtifact(camp, artifactInfo);
            artifact.onCreate(this);
            return artifact;
        }

        public createMonsterData(camp) {
            var monsters = this.getLineupInfo(camp);
            if (!monsters || monsters.length <= 0) {
                return {};
            }
            var battleMonsters = this.createBattleGods(camp, monsters[0], iface.tb_prop.battleObjTypeKey.monster);
            var battleArtifact = this.createBattleArtifact(camp, monsters[1]);
            var campData = {
                objs: battleMonsters,
                artifact: battleArtifact
            };
            this.campDatas[camp] = campData;
            for (var key in battleMonsters) {
                let monster: BattleMonster = battleMonsters[key];
                let id = monster.idx;
                let hpkey = monster.camp *100 + id;
                let inithpnum = isEmptyObject(this.initHpObjs) ? -1 : this.initHpObjs.hasOwnProperty(hpkey) ? this.initHpObjs[hpkey] : -1;
                monster.afterCreate(inithpnum);
            }
        }

        public getCampData(camp) {
            return this.campDatas[camp];
        }

        public getCampObjs(camp) {
            var campData = this.campDatas[camp];
            return campData ? campData.objs : {};
        }

        //获得前排
        public getCampRowObjs(camp, row, needAlive?) {
            var tempobjs = {};
            var campData = this.campDatas[camp];
            if (campData) {
                var objs1 = campData.objs;
                for (var idx in objs1) {
                    var objvo: battle.BattleObj = objs1[idx];
                    if (objvo.row == row) {
                        if (!needAlive) {
                            tempobjs[idx] = objvo;
                        }else{
                            if(objvo.isAlive()){
                                tempobjs[idx] = objvo;
                            }
                        }
                    }
                }
            }
            return tempobjs;
        }

        public getCampArtifact(camp): BattleArtifact {
            var campData = this.campDatas[camp];
            return campData ? campData.artifact : null;
        }

        /**
         * 获得失去血量
         * @param type -1：全部 battle.BatteConsts.BATTLE_CAMPATK:进攻方 battle.BatteConsts.BATTLE_CAMPDEF:防守方
         */
        getLossHpObj(type: number = -1): any {
            let obj = {};
            if (type == -1) {
                let campDatas = this.campDatas;
                for (var camp in campDatas) {
                    var campData = campDatas[camp];
                    var objs1 = campData.objs;
                    for (var idx in objs1) {
                        var objvo: battle.BattleObj = objs1[idx];
                        obj[objvo.getObjId()] = Math.floor(objvo.getLossHp());
                    }
                }
            } else {
                var objs2 = this.getCampObjs(type);
                for (var idx in objs2) {
                    var objvo: battle.BattleObj = objs2[idx];
                    obj[objvo.getObjId()] = Math.floor(objvo.getLossHp());
                }
            }
            return obj;
        }



        getMaxHpObj(): any {
            let obj = {};
            let campDatas = this.campDatas;
            for (var camp in campDatas) {
                var campData = campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var objvo: battle.BattleObj = objs[idx];
                    obj[objvo.getObjId()] = objvo.hpMax;
                }
            }
            return obj;
        }

        // public clientStart() {
        //     this.onBattleStart();
        //     this.cbattleLoop();
        // }

        // cbattleLoop() {
        //     if (!this.checkBattleEnd()) {
        //         if (this.isNewWave) {
        //             this.isNewWave = false;
        //             this.onWaveStart();
        //         } else {
        //             this.cbWaveLoop();
        //         }
        //     } else {
        //         this.battleEnd();
        //     }
        // }

        // cbWaveLoop() {
        //     if (!this.checkWaveEnd()) {
        //         this.nextRound();
        //     } else {
        //         this.addWave();
        //         this.cbattleLoop();
        //     }
        // }

        // quickLoop() {
        //     if (this.wait) {
        //         let curObj = this.curObj;
        //         if (curObj && !curObj.isArtifact()) {
        //             curObj.aiStart();
        //         }
        //     }
        //     //强制设置为自动
        //     this.auto = true;
        //     this.waveLoop();
        //     this.addWave();

        //     while (!this.checkBattleEnd()) {
        //         this.nextWave();
        //     }
        //     this.battleEnd();
        // }

        public start() {
            this.onBattleStart();
            this.battleLoop();
        }

        public onBattleStart() {
            // logfight("onBattleStart!!!!");
            this.createAtkData();
            this.createDefData();
        }

        public battleLoop() {
            while (!this.checkBattleEnd()) {
                this.nextWave();
            }
            this.battleEnd();
        }

        public checkBattleEnd() {
            if (this.winCamp === 0) {
                return false;
            }
            var loseCamp = getOppoCamp(this.winCamp);
            var lineupInfo = this.getLineupInfo(loseCamp);
            return lineupInfo ? false : true;
        }

        public nextWave() {
            this.onWaveStart();
            this.waveLoop();
            this.addWave();
        }

        public onWaveStart() {
            this.round = 0;
            this.showRound = 0;
            if (this.winCamp > 0) {
                var loseCamp = getOppoCamp(this.winCamp);
                if (loseCamp === BatteConsts.BATTLE_CAMPATK) {
                    this.createAtkData();
                } else if (loseCamp === BatteConsts.BATTLE_CAMPDEF) {
                    this.createDefData();
                }
            }

            //进入新的一轮，要把胜负结果重置掉
            this.winCamp = 0;
            // logfight("onWaveStart!!!! %j", this.campWaves);
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    obj.onWaveStart();
                    // if (obj.atkSpd > this.atkBarMax) {
                    //     this.atkBarMax = obj.atkSpd;
                    // }
                }
                var artifact: BattleArtifact = campData.artifact;
                if (artifact) {
                    artifact.onWaveStart();
                }
            }
            // this.recordAtkBarMax();
        }

        public createAtkData() {
            logfight("createAtkData");
            this.createPlayerData(BatteConsts.BATTLE_CAMPATK);
        }

        public createDefData() {
            logfight("createDefData");
            if (this.defType === iface.tb_prop.battleObjTypeKey.monster) {
                this.createMonsterData(BatteConsts.BATTLE_CAMPDEF);
                return;
            }
            this.createPlayerData(BatteConsts.BATTLE_CAMPDEF);
        }

        public waveLoop() {
            while (!this.checkWaveEnd()) {
                // this.nextRound();
                this.roundLoop();
            }
            this.statWaveResults();
        }

        public roundLoop() {
            //回合开始触发
            this.roundStart();
            //轮询回合
            while (!this.checkRoundEnd() && !this.checkResult()) {
                this.nextRound();
            }

            //回合结束触发
            if (this.checkRoundEnd()) {
                logfight(" roundEnd ");
                this.roundEnd();
            }
        }

        /**
         * 大回合开始触发
         */
        private roundStart() {
            if (!this._atkList) {
                this._atkList = [];
            }
            if (this._atkList.length <= 0) {
                //新的回合开始
                this.showRound++;
                this._atkList = this.getAtkList();
                // logfight(" atkList  %s", this._atkList);
            }

            //大回合开始时触发
            this.roundStartTrigger();

        }

        private roundStartTrigger() {
            this.round++;
            this.recordStartRound();
            //先触发buff
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    obj.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.bigRoundBefore);
                }
            }

            //再触发被动
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    if (obj.isAlive()) {
                        obj.doPasvSkill(iface.tb_prop.triggerTypeKey.roundBefore);
                    }
                }
            }
        }

        /**
         * 大回合结束
         */
        private roundEnd() {
            // this.round++;
        }

        private checkRoundEnd(): boolean {
            //反击一个一个反
            var nextObj = this.getStrikeBackObj();
            if (nextObj) {
                return false;
            }
            //神器技能
            var artifact = this.getAngerFullAtft();
            if (artifact) {
                return false;
            }
            //追加一回合
            nextObj = this.getRampageObj();
            if (nextObj) {
                return false;
            }
            return this._atkList.length <= 0;
        }

        public statWaveResults() {
            var winResults = this.waveResults[this.winCamp];
            if (!winResults) {
                return;
            }
            var winIdx = this.getCampWave(this.winCamp) - 1;
            winResults[winIdx] = winResults[winIdx] || 0;
            winResults[winIdx]++;
        }

        public checkWaveEnd() {
            if (this.checkResult()) {
                return true;
            }
            if (this.checkMaxRound()) {
                this.winCamp = this.calWinCamp();
                return true;
            }
            return false;
        }

        public checkResult() {
            if (this.isAllDead(BatteConsts.BATTLE_CAMPATK)) {
                this.winCamp = BatteConsts.BATTLE_CAMPDEF;
                logfight("atk All Dead");
                return true;
            }
            if (this.isAllDead(BatteConsts.BATTLE_CAMPDEF)) {
                this.winCamp = BatteConsts.BATTLE_CAMPATK;
                logfight("def All Dead");
                return true;
            }
            return false;
        }

        public checkMaxRound() {
            return this.showRound >= this.maxRound;
            // switch (this.type) {
            //     case iface.tb_prop.battleTypeKey.common:
            //         let tb_copy_set = tb.TB_copy_set.getCopySet();
            //         return this.showRound >= tb_copy_set.round_max;
            //     case iface.tb_prop.battleTypeKey.guildBoss:
            //         let tb_guild_set = tb.TB_guild_set.getSet();
            //         return this.showRound >= tb_guild_set.round_max;
            //     case iface.tb_prop.battleTypeKey.worldBoss:
            //         let tb_boss_set = tb.TB_boss_set.getSet();
            //         return this.showRound >= tb_boss_set.round_max;
            //     case iface.tb_prop.battleTypeKey.arena:
            //         let tb_arena_new_set = tb.TB_arena_new_set.getArenaNewSet();
            //         return this.showRound >= tb_arena_new_set.round_max;
            //     case iface.tb_prop.battleTypeKey.honour:
            //         let tb_honour_set = tb.TB_honour_set.getSet();
            //         return this.showRound >= tb_honour_set.round_max;
            //     default:
            //         break;
            // }
            // return false;
        };

        public calWinCamp() {
            return BatteConsts.BATTLE_CAMPDEF;
        };

        public isAllDead(camp) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return true;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj: BattleObj = objs[idx];
                if (obj.isAlive()) {
                    return false;
                }
            }
            return true;
        }

        public nextRound() {
            this.round++;
            this.isBackAtk = false;
            // logfight("round %s", this.round);
            //反击一个一个反
            var nextObj = this.getStrikeBackObj();
            if (nextObj) {
                this.isBackAtk = true;
                this.curObj = nextObj;
                logfight("strikeBack %s", nextObj);
                nextObj.startStrikeBack();
                return;
            }
            var artifact = this.getAngerFullAtft();
            if (artifact) {
                this.curObj = artifact;
                logfight("artifact round %s", this.curObj);
                artifact.startRound();
                return;
            }

            //追加一回合
            nextObj = this.getRampageObj();
            if (nextObj) {
                this.curObj = nextObj;
                logfight("Rampage round %s", this.curObj);
                nextObj.startRound(true);
                return;
            }

            //正常回合
            nextObj = this.getNextAtk();
            if (nextObj) {
                this.curObj = nextObj;
                logfight("normal round %s", this.curObj);
                nextObj.startRound(false);
            }
        }

        public deadOpt() {
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    obj.onDeadEnd();
                }
            }
        }

        /**
         * 队友死亡时触发
         */
        public teamMateDeadOpt(deadRole: BattleObj, preskill) {
            var campData = this.campDatas[deadRole.camp];
            var objs = campData.objs;
            for (var idx in objs) {
                var obj: BattleObj = objs[idx];
                if (obj.isAlive() && deadRole.getObjId() !== obj.getObjId()) {
                    obj.doPasvSkill(iface.tb_prop.triggerTypeKey.ownDead, null, preskill);
                }
            }
        }

        private _atkList: Array<BattleObj>

        private getAtkList(): Array<BattleObj> {
            var godsArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    if (!obj.isAlive()) {
                        continue;
                    }
                    godsArr.push(obj);
                }
            }
            return godsArr;
        }

        private getNextAtk(): BattleObj {
            if (!this._atkList || this._atkList.length <= 0) {
                return null;
            }
            this._atkList.sort(this.speedRank);
            return this._atkList.shift();
        }

        public speedRank(a: BattleObj, b: BattleObj): number {
            if (a.atkSpd === b.atkSpd) {
                return a.idx - b.idx;//站位前的先出手
            }
            return b.atkSpd - a.atkSpd;    // 速度快的
        }

        /**
         * 死亡时剔除出手队列中的对应项
         */
        public removeAtkItem(deadItem: BattleObj) {
            logyhj("死亡选手：", deadItem);
            var idx = this._atkList.indexOf(deadItem);
            if (idx != -1) {
                logyhj("剔除死亡选手：", idx);
                this._atkList.splice(idx, 1);
            }
        }

        public getStrikeBackObj(): BattleObj {
            var godsArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    if (!obj.isAlive() || !obj.stBackTarget) {
                        continue;
                    }
                    godsArr.push(obj);
                }
            }
            if (godsArr.length <= 0) {
                return null;
            }
            godsArr.sort(this.strikeBackRank);
            var nextObj: BattleObj = godsArr[0];
            logfight("strikeBack!!!! %s", nextObj.getObjId());
            return nextObj;
        }

        public getAngerFullAtft(): BattleArtifact {
            var atftArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var artifact: BattleArtifact = campData.artifact;
                if (!artifact) {
                    continue;
                }
                if (artifact.isAngerFull()) {
                    atftArr.push(artifact);
                }
            }
            if (atftArr.length <= 0) {
                return null;
            }
            atftArr.sort(this.artifactRank);
            var atft: BattleArtifact = atftArr[0];
            logfight("atft Anger Full!!!! camp: %s", atft.camp);
            return atft;
        }

        public getRampageObj(): BattleObj {
            var godsArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    if (!obj.isAlive() || !obj.getRoundFlag) {
                        continue;
                    }
                    if (obj.getObjId() === this.lastObjId) {
                        return obj;
                    }
                    godsArr.push(obj);
                }
            }
            if (godsArr.length <= 0) {
                return null;
            }
            godsArr.sort(this.rampageRank);
            var nextObj: BattleObj = godsArr[0];
            logfight("rampage!!!! %s", nextObj.getObjId());
            return nextObj;
        }

        public atkBarRank(a, b) {
            return 0;
        }

        public strikeBackRank(a, b): number {
            return a.idx - b.idx;    // 站位前的先出手
        }

        public artifactRank(a, b): number {
            return b.camp === Number(this.lastObjId / 10) ? -1 : 1; // 怒气都满时，和技能释放者同阵营的神器先出手
        }

        public rampageRank(a, b): number {
            if (a.camp !== b.camp) {
                return b.camp === Number(this.lastObjId / 10) ? -1 : 1; // 都有暴走标记时，和技能释放者同阵营的先出手
            }
            return a.idx - b.idx;    // 站位前的先出手
        }

        // public recoverAllAtkBar(): BattleObj {
        //     var godsArr = [];
        //     var isAtkBarFull = false;
        //     for (var camp in this.campDatas) {
        //         var campData = this.campDatas[camp];
        //         var objs = campData.objs;
        //         for (var idx in objs) {
        //             var obj: BattleObj = objs[idx];
        //             if (!obj.isAlive()) {
        //                 continue;
        //             }
        //             obj.recoverAtkBar();
        //             godsArr.push(obj);
        //             if (obj.getAtkBar() >= this.atkBarMax) {
        //                 isAtkBarFull = true;
        //             }
        //         }
        //     }
        //     if (!isAtkBarFull || godsArr.length <= 0) {
        //         return null;
        //     }
        //     godsArr.sort(this.atkBarRank);
        //     return godsArr[0];
        // }

        // public recordAtkBar() {
        //     for (var camp in this.campDatas) {
        //         var campData = this.campDatas[camp];
        //         var objs = campData.objs;
        //         for (var idx in objs) {
        //             var obj: BattleObj = objs[idx];
        //             if (!obj.isAlive()) {
        //                 continue;
        //             }
        //             obj.recordAtkBar();
        //         }
        //     }
        // }

        // public recordAtkBarMax() {
        //     var operate = {
        //         type: iface.tb_prop.battleOpTypeKey.atkBarMax,
        //         atkBarMax: this.atkBarMax,
        //     };
        //     this.recordOperate(0, operate);
        // }

        public recordOperate(skillId, info) {
            var waveInfo = this.battleReport[this.wave] = this.battleReport[this.wave] || {};
            var roundInfo = waveInfo[this.round] = waveInfo[this.round] || {};
            skillId = skillId || 0;
            var skillInfo = roundInfo[skillId] = roundInfo[skillId] || [];
            skillInfo.push(info);
        }

        public checkPasvSkillRecord(skillId, prtSkillId): boolean {
            //如果父级id和当前技能id相同时，不记录，否则死循环
            if (skillId === prtSkillId) {
                return false;
            }
            var waveInfo = this.battleReport[this.wave];
            if (!waveInfo) {
                return false;
            }
            var roundInfo = waveInfo[this.round];
            if (!roundInfo) {
                return false;
            }
            //判断是否被动有记录下什么操作
            if (!roundInfo[skillId] || roundInfo[skillId].length <= 0) {
                return false;
            }
            //判断父级是否有记录过被动的触发
            var operateArr = roundInfo[prtSkillId];
            if (operateArr) {
                for (var i = 0; i < operateArr.length; i++) {
                    var operate = operateArr[i];
                    if (operate.type === iface.tb_prop.battleOpTypeKey.trigPasvSkill && operate.skillId === skillId) {
                        return false;
                    }
                }
            }
            return true;
        }

        public genBuffInstId(): number {
            return this.buffInstId++;
        }

        public doCampPasvSkill(camp, triggerType, extTarget: BattleObj, prtSkillId) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj: BattleObj = objs[idx];
                if (!obj.isAlive()) {
                    continue;
                }
                obj.doPasvSkill(triggerType, extTarget, prtSkillId);
            }
        }

        public clearCampShareBuffByCaster(camp, caster: BattleObj, skillId) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj: BattleObj = objs[idx];
                if (!obj.isAlive()) {
                    continue;
                }
                obj.clearShareBuffByCaster(caster, skillId);
            }
        }

        public clearCampSneerBuffByCaster(camp, caster: BattleObj, skillId) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj: BattleObj = objs[idx];
                if (!obj.isAlive()) {
                    continue;
                }
                obj.clearSneerBuffByCaster(caster, skillId);
            }
        };

        public battleEnd() {
            logfight("battle end. winCamp %d report %j", this.winCamp, this.battleReport);
        }

        public getObjById(targetId: number): BattleObj {
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    if (obj.getObjId() === targetId) {
                        return obj;
                    }
                }
            }
            return null;
        }

        public getCampByObjid(targetId: number) {
            let tag = this.getObjById(targetId);
            return tag ? tag.camp : BatteConsts.BATTLE_CAMPATK;
        }

        /**
         * 添加buff之前轮询需要触发的被动
         * @param buff_id 
         * @param bufftag buff拥有者
         * @param buffcaster buff施法者
         */
        public onAddBuffBefore(buff_id: number, bufftag: BattleObj, buffcaster: BattleObj, skillId: number) {
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj: BattleObj = objs[idx];
                    if (obj.isAlive()) {
                        obj.doPasvSkill(iface.tb_prop.triggerTypeKey.addBuff, bufftag, skillId, { tempBuff: buff_id });
                    }
                }
            }
        }

        public recordStartRound() {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.nextRound,
                round: this.showRound,
                // objId: this.getObjId(),
            };
            this.recordOperate(0, operate);
        }
    }
}