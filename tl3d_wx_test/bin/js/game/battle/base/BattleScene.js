var battle;
(function (battle) {
    var BattleScene = /** @class */ (function () {
        function BattleScene(type) {
            // private _auto: boolean;
            this.waveResults = {};
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
        BattleScene.prototype.init = function (atkInfos, defInfos, defType, maxRound, initHpObjs) {
            this.atkInfos = atkInfos || [];
            this.defInfos = defInfos || [];
            this.maxRound = maxRound;
            this.initHpObjs = initHpObjs || {};
            this.defType = defType;
            var i;
            var camp = battle.BatteConsts.BATTLE_CAMPATK;
            for (i = 0; i < this.atkInfos.length; i++) {
                var atkResults = this.waveResults[camp] = this.waveResults[camp] || [];
                atkResults[i] = atkResults[i] || 0;
            }
            camp = battle.BatteConsts.BATTLE_CAMPDEF;
            for (i = 0; i < this.defInfos.length; i++) {
                var defResults = this.waveResults[camp] = this.waveResults[camp] || [];
                defResults[i] = defResults[i] || 0;
            }
            logfight("battle init. waveResults %j", this.waveResults);
        };
        // set auto(val: boolean) {
        //     this._auto = val;
        // }
        // get auto(): boolean {
        //     return this._auto;
        // }
        BattleScene.prototype.getWave = function () {
            return this.defInfos.length;
        };
        BattleScene.prototype.getDefInfos = function () {
            return this.defInfos;
        };
        BattleScene.prototype.getAtkInfos = function () {
            return this.atkInfos;
        };
        BattleScene.prototype.getLineupInfo = function (camp) {
            var lineupInfo = null;
            switch (camp) {
                case battle.BatteConsts.BATTLE_CAMPATK:
                    lineupInfo = this.atkInfos[this.getCampWave(camp) - 1];
                    break;
                case battle.BatteConsts.BATTLE_CAMPDEF:
                    lineupInfo = this.defInfos[this.getCampWave(camp) - 1];
                    break;
                default:
                    break;
            }
            return lineupInfo;
        };
        BattleScene.prototype.getCampWave = function (camp) {
            return this.campWaves[camp] || 1;
        };
        BattleScene.prototype.addWave = function () {
            if (this.winCamp === 0) {
                return;
            }
            var loseCamp = getOppoCamp(this.winCamp);
            this.campWaves[loseCamp] = this.campWaves[loseCamp] || 1;
            this.campWaves[loseCamp]++;
            this.wave++;
            this.isNewWave = true;
        };
        BattleScene.prototype.createPlayerData = function (camp) {
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
                var god = battleGods[key];
                var id = god.idx;
                var hpkey = god.camp * 100 + id;
                var inithpnum = isEmptyObject(this.initHpObjs) ? -1 : this.initHpObjs.hasOwnProperty(hpkey) ? this.initHpObjs[hpkey] : -1;
                god.afterCreate(inithpnum);
            }
        };
        BattleScene.prototype.createBattleGods = function (camp, godsInfo, type) {
            if (!godsInfo || godsInfo.length <= 0) {
                return {};
            }
            var battleGods = {};
            for (var idx = 0; idx < godsInfo.length; idx++) {
                var info = godsInfo[idx];
                if (!info) {
                    continue;
                }
                var id = idx + 1;
                var key = camp * 100 + id;
                var inithpnum = isEmptyObject(this.initHpObjs) ? -1 : this.initHpObjs.hasOwnProperty(key) ? this.initHpObjs[key] : -1;
                var god = void 0;
                if (type == iface.tb_prop.battleObjTypeKey.monster) {
                    god = new battle.BattleMonster(camp, id, info);
                }
                else {
                    god = new battle.BattleGod(camp, id, info);
                }
                god.onCreate(this, inithpnum);
                battleGods[idx] = god;
            }
            return battleGods;
        };
        BattleScene.prototype.createBattleArtifact = function (camp, artifactInfo) {
            if (!artifactInfo || artifactInfo.length <= 0) {
                return null;
            }
            var artifact = new battle.BattleArtifact(camp, artifactInfo);
            artifact.onCreate(this);
            return artifact;
        };
        BattleScene.prototype.createMonsterData = function (camp) {
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
                var monster = battleMonsters[key];
                var id = monster.idx;
                var hpkey = monster.camp * 100 + id;
                var inithpnum = isEmptyObject(this.initHpObjs) ? -1 : this.initHpObjs.hasOwnProperty(hpkey) ? this.initHpObjs[hpkey] : -1;
                monster.afterCreate(inithpnum);
            }
        };
        BattleScene.prototype.getCampData = function (camp) {
            return this.campDatas[camp];
        };
        BattleScene.prototype.getCampObjs = function (camp) {
            var campData = this.campDatas[camp];
            return campData ? campData.objs : {};
        };
        //获得前排
        BattleScene.prototype.getCampRowObjs = function (camp, row, needAlive) {
            var tempobjs = {};
            var campData = this.campDatas[camp];
            if (campData) {
                var objs1 = campData.objs;
                for (var idx in objs1) {
                    var objvo = objs1[idx];
                    if (objvo.row == row) {
                        if (!needAlive) {
                            tempobjs[idx] = objvo;
                        }
                        else {
                            if (objvo.isAlive()) {
                                tempobjs[idx] = objvo;
                            }
                        }
                    }
                }
            }
            return tempobjs;
        };
        BattleScene.prototype.getCampArtifact = function (camp) {
            var campData = this.campDatas[camp];
            return campData ? campData.artifact : null;
        };
        /**
         * 获得失去血量
         * @param type -1：全部 battle.BatteConsts.BATTLE_CAMPATK:进攻方 battle.BatteConsts.BATTLE_CAMPDEF:防守方
         */
        BattleScene.prototype.getLossHpObj = function (type) {
            if (type === void 0) { type = -1; }
            var obj = {};
            if (type == -1) {
                var campDatas = this.campDatas;
                for (var camp in campDatas) {
                    var campData = campDatas[camp];
                    var objs1 = campData.objs;
                    for (var idx in objs1) {
                        var objvo = objs1[idx];
                        obj[objvo.getObjId()] = Math.floor(objvo.getLossHp());
                    }
                }
            }
            else {
                var objs2 = this.getCampObjs(type);
                for (var idx in objs2) {
                    var objvo = objs2[idx];
                    obj[objvo.getObjId()] = Math.floor(objvo.getLossHp());
                }
            }
            return obj;
        };
        BattleScene.prototype.getMaxHpObj = function () {
            var obj = {};
            var campDatas = this.campDatas;
            for (var camp in campDatas) {
                var campData = campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var objvo = objs[idx];
                    obj[objvo.getObjId()] = objvo.hpMax;
                }
            }
            return obj;
        };
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
        BattleScene.prototype.start = function () {
            this.onBattleStart();
            this.battleLoop();
        };
        BattleScene.prototype.onBattleStart = function () {
            // logfight("onBattleStart!!!!");
            this.createAtkData();
            this.createDefData();
        };
        BattleScene.prototype.battleLoop = function () {
            while (!this.checkBattleEnd()) {
                this.nextWave();
            }
            this.battleEnd();
        };
        BattleScene.prototype.checkBattleEnd = function () {
            if (this.winCamp === 0) {
                return false;
            }
            var loseCamp = getOppoCamp(this.winCamp);
            var lineupInfo = this.getLineupInfo(loseCamp);
            return lineupInfo ? false : true;
        };
        BattleScene.prototype.nextWave = function () {
            this.onWaveStart();
            this.waveLoop();
            this.addWave();
        };
        BattleScene.prototype.onWaveStart = function () {
            this.round = 0;
            this.showRound = 0;
            if (this.winCamp > 0) {
                var loseCamp = getOppoCamp(this.winCamp);
                if (loseCamp === battle.BatteConsts.BATTLE_CAMPATK) {
                    this.createAtkData();
                }
                else if (loseCamp === battle.BatteConsts.BATTLE_CAMPDEF) {
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
                    var obj = objs[idx];
                    obj.onWaveStart();
                    // if (obj.atkSpd > this.atkBarMax) {
                    //     this.atkBarMax = obj.atkSpd;
                    // }
                }
                var artifact = campData.artifact;
                if (artifact) {
                    artifact.onWaveStart();
                }
            }
            // this.recordAtkBarMax();
        };
        BattleScene.prototype.createAtkData = function () {
            logfight("createAtkData");
            this.createPlayerData(battle.BatteConsts.BATTLE_CAMPATK);
        };
        BattleScene.prototype.createDefData = function () {
            logfight("createDefData");
            if (this.defType === iface.tb_prop.battleObjTypeKey.monster) {
                this.createMonsterData(battle.BatteConsts.BATTLE_CAMPDEF);
                return;
            }
            this.createPlayerData(battle.BatteConsts.BATTLE_CAMPDEF);
        };
        BattleScene.prototype.waveLoop = function () {
            while (!this.checkWaveEnd()) {
                // this.nextRound();
                this.roundLoop();
            }
            this.statWaveResults();
        };
        BattleScene.prototype.roundLoop = function () {
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
        };
        /**
         * 大回合开始触发
         */
        BattleScene.prototype.roundStart = function () {
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
        };
        BattleScene.prototype.roundStartTrigger = function () {
            this.round++;
            this.recordStartRound();
            //先触发buff
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
                    obj.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.bigRoundBefore);
                }
            }
            //再触发被动
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
                    if (obj.isAlive()) {
                        obj.doPasvSkill(iface.tb_prop.triggerTypeKey.roundBefore);
                    }
                }
            }
        };
        /**
         * 大回合结束
         */
        BattleScene.prototype.roundEnd = function () {
            // this.round++;
        };
        BattleScene.prototype.checkRoundEnd = function () {
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
        };
        BattleScene.prototype.statWaveResults = function () {
            var winResults = this.waveResults[this.winCamp];
            if (!winResults) {
                return;
            }
            var winIdx = this.getCampWave(this.winCamp) - 1;
            winResults[winIdx] = winResults[winIdx] || 0;
            winResults[winIdx]++;
        };
        BattleScene.prototype.checkWaveEnd = function () {
            if (this.checkResult()) {
                return true;
            }
            if (this.checkMaxRound()) {
                this.winCamp = this.calWinCamp();
                return true;
            }
            return false;
        };
        BattleScene.prototype.checkResult = function () {
            if (this.isAllDead(battle.BatteConsts.BATTLE_CAMPATK)) {
                this.winCamp = battle.BatteConsts.BATTLE_CAMPDEF;
                logfight("atk All Dead");
                return true;
            }
            if (this.isAllDead(battle.BatteConsts.BATTLE_CAMPDEF)) {
                this.winCamp = battle.BatteConsts.BATTLE_CAMPATK;
                logfight("def All Dead");
                return true;
            }
            return false;
        };
        BattleScene.prototype.checkMaxRound = function () {
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
        ;
        BattleScene.prototype.calWinCamp = function () {
            return battle.BatteConsts.BATTLE_CAMPDEF;
        };
        ;
        BattleScene.prototype.isAllDead = function (camp) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return true;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj = objs[idx];
                if (obj.isAlive()) {
                    return false;
                }
            }
            return true;
        };
        BattleScene.prototype.nextRound = function () {
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
        };
        BattleScene.prototype.deadOpt = function () {
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
                    obj.onDeadEnd();
                }
            }
        };
        /**
         * 队友死亡时触发
         */
        BattleScene.prototype.teamMateDeadOpt = function (deadRole, preskill) {
            var campData = this.campDatas[deadRole.camp];
            var objs = campData.objs;
            for (var idx in objs) {
                var obj = objs[idx];
                if (obj.isAlive() && deadRole.getObjId() !== obj.getObjId()) {
                    obj.doPasvSkill(iface.tb_prop.triggerTypeKey.ownDead, null, preskill);
                }
            }
        };
        BattleScene.prototype.getAtkList = function () {
            var godsArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
                    if (!obj.isAlive()) {
                        continue;
                    }
                    godsArr.push(obj);
                }
            }
            return godsArr;
        };
        BattleScene.prototype.getNextAtk = function () {
            if (!this._atkList || this._atkList.length <= 0) {
                return null;
            }
            this._atkList.sort(this.speedRank);
            return this._atkList.shift();
        };
        BattleScene.prototype.speedRank = function (a, b) {
            if (a.atkSpd === b.atkSpd) {
                return a.idx - b.idx; //站位前的先出手
            }
            return b.atkSpd - a.atkSpd; // 速度快的
        };
        /**
         * 死亡时剔除出手队列中的对应项
         */
        BattleScene.prototype.removeAtkItem = function (deadItem) {
            logyhj("死亡选手：", deadItem);
            var idx = this._atkList.indexOf(deadItem);
            if (idx != -1) {
                logyhj("剔除死亡选手：", idx);
                this._atkList.splice(idx, 1);
            }
        };
        BattleScene.prototype.getStrikeBackObj = function () {
            var godsArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
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
            var nextObj = godsArr[0];
            logfight("strikeBack!!!! %s", nextObj.getObjId());
            return nextObj;
        };
        BattleScene.prototype.getAngerFullAtft = function () {
            var atftArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var artifact = campData.artifact;
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
            var atft = atftArr[0];
            logfight("atft Anger Full!!!! camp: %s", atft.camp);
            return atft;
        };
        BattleScene.prototype.getRampageObj = function () {
            var godsArr = [];
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
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
            var nextObj = godsArr[0];
            logfight("rampage!!!! %s", nextObj.getObjId());
            return nextObj;
        };
        BattleScene.prototype.atkBarRank = function (a, b) {
            return 0;
        };
        BattleScene.prototype.strikeBackRank = function (a, b) {
            return a.idx - b.idx; // 站位前的先出手
        };
        BattleScene.prototype.artifactRank = function (a, b) {
            return b.camp === Number(this.lastObjId / 10) ? -1 : 1; // 怒气都满时，和技能释放者同阵营的神器先出手
        };
        BattleScene.prototype.rampageRank = function (a, b) {
            if (a.camp !== b.camp) {
                return b.camp === Number(this.lastObjId / 10) ? -1 : 1; // 都有暴走标记时，和技能释放者同阵营的先出手
            }
            return a.idx - b.idx; // 站位前的先出手
        };
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
        BattleScene.prototype.recordOperate = function (skillId, info) {
            var waveInfo = this.battleReport[this.wave] = this.battleReport[this.wave] || {};
            var roundInfo = waveInfo[this.round] = waveInfo[this.round] || {};
            skillId = skillId || 0;
            var skillInfo = roundInfo[skillId] = roundInfo[skillId] || [];
            skillInfo.push(info);
        };
        BattleScene.prototype.checkPasvSkillRecord = function (skillId, prtSkillId) {
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
        };
        BattleScene.prototype.genBuffInstId = function () {
            return this.buffInstId++;
        };
        BattleScene.prototype.doCampPasvSkill = function (camp, triggerType, extTarget, prtSkillId) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj = objs[idx];
                if (!obj.isAlive()) {
                    continue;
                }
                obj.doPasvSkill(triggerType, extTarget, prtSkillId);
            }
        };
        BattleScene.prototype.clearCampShareBuffByCaster = function (camp, caster, skillId) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj = objs[idx];
                if (!obj.isAlive()) {
                    continue;
                }
                obj.clearShareBuffByCaster(caster, skillId);
            }
        };
        BattleScene.prototype.clearCampSneerBuffByCaster = function (camp, caster, skillId) {
            var campData = this.campDatas[camp];
            if (!campData) {
                return;
            }
            var objs = campData.objs;
            for (var idx in objs) {
                var obj = objs[idx];
                if (!obj.isAlive()) {
                    continue;
                }
                obj.clearSneerBuffByCaster(caster, skillId);
            }
        };
        ;
        BattleScene.prototype.battleEnd = function () {
            logfight("battle end. winCamp %d report %j", this.winCamp, this.battleReport);
        };
        BattleScene.prototype.getObjById = function (targetId) {
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
                    if (obj.getObjId() === targetId) {
                        return obj;
                    }
                }
            }
            return null;
        };
        BattleScene.prototype.getCampByObjid = function (targetId) {
            var tag = this.getObjById(targetId);
            return tag ? tag.camp : battle.BatteConsts.BATTLE_CAMPATK;
        };
        /**
         * 添加buff之前轮询需要触发的被动
         * @param buff_id
         * @param bufftag buff拥有者
         * @param buffcaster buff施法者
         */
        BattleScene.prototype.onAddBuffBefore = function (buff_id, bufftag, buffcaster, skillId) {
            for (var camp in this.campDatas) {
                var campData = this.campDatas[camp];
                var objs = campData.objs;
                for (var idx in objs) {
                    var obj = objs[idx];
                    if (obj.isAlive()) {
                        obj.doPasvSkill(iface.tb_prop.triggerTypeKey.addBuff, bufftag, skillId, { tempBuff: buff_id });
                    }
                }
            }
        };
        BattleScene.prototype.recordStartRound = function () {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.nextRound,
                round: this.showRound,
            };
            this.recordOperate(0, operate);
        };
        return BattleScene;
    }());
    battle.BattleScene = BattleScene;
})(battle || (battle = {}));
