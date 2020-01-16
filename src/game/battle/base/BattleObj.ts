module battle {
    export class BattleObj {

        public scene: BattleScene;
        public camp;
        public idx;
        private attrs;
        private buffs;
        private skills;
        private skillpt: SkillData;//普通攻击
        private skillag: SkillData;//怒气技能
        private pasvSkills;
        // public atkBar;
        public hp: number;
        public hpMax: number;
        public atk;
        public def;
        public atkSpd;
        public crit;
        public critDmg;
        public effectHit;
        public effectResist;
        private suckBlood;
        private strikeBack;
        private rampage;
        private dizzy;
        public dmgRate;
        private healRate;
        public addDmg;//增伤
        public delDmg;//减伤
        public immeDizzy;//免疫控制系数
        private attrMask;
        private tmpAmends;
        private buffAmends;
        private targetTmpAmends;
        public stBackTarget: BattleObj;
        public getRoundFlag: boolean;
        public skipRound;
        private _bAlive;
        private bNewObj;
        public bCreateDone: boolean;

        protected type;
        protected degree: number;
        protected starLev: number;
        protected awakenLv: number;
        protected templateId;
        public race;
        public beCrit: boolean;
        protected level;
        protected oldMaxHp: number;
        protected initHp: number;
        public skinId: number;
        public anger: number;//怒气
        public uuid: number;
        public profession: number;
        public immuneDmg: boolean;//免疫本次伤害
        public row: number;//1为前排，2为后排

        constructor(camp, idx, attrs, profession, skills?) {
            this.scene = null;
            this.camp = camp;
            this.idx = idx;
            this.attrs = attrs || {};
            this.buffs = {};
            this.skills = {};
            this.pasvSkills = {};
            // this.atkBar = 0;
            this.hp = 0;
            this.hpMax = 0;
            this.oldMaxHp = 0;
            this.initHp = 0;
            this.atk = 0;
            this.def = 0;
            this.atkSpd = 0;
            this.crit = 0;
            this.critDmg = 1;
            this.effectHit = 0;
            this.effectResist = 0;
            this.suckBlood = 0;
            this.strikeBack = 0;
            this.profession = profession;
            this.rampage = 0;
            this.dizzy = 0;
            this.dmgRate = 1;
            this.healRate = 1;
            this.addDmg = 0;
            this.delDmg = 0;
            this.immeDizzy = 0;
            this.attrMask = {};
            this.tmpAmends = {};
            this.targetTmpAmends = {};
            this.buffAmends = {};
            this.stBackTarget = null;
            this.getRoundFlag = false;
            this.immuneDmg = false;
            this.skipRound = false;
            // this.bAlive = true;
            this.bNewObj = true;
            this.bCreateDone = false;
            this.beCrit = false;
            this.uuid = 0;
            this.skillpt = null;
            this.skillag = null;
            this.row = idx <= 2 ? 1 : 2;

            this.anger = tb.TB_skill_set.getSkillSet().begin_anger;//初始值为表中配置的值。只有角色刚创建出来才会有初始值

            // logyhj("技能替换前：", JSON.parse(JSON.stringify(skills)));

            replaceSkill(skills);

            // logyhj("技能替换后：", JSON.parse(JSON.stringify(skills)));

            this.initSkillDatas(skills);
        }

        private initSkillDatas(skillArr) {
            if (!skillArr || skillArr.length <= 0) {
                return null;
            }
            for (var i = 0; i < skillArr.length; i++) {
                var skillId = skillArr[i];
                var skillData = new SkillData(skillId);
                if (skillData.isPassive()) {
                    this.pasvSkills[skillId] = skillData;
                } else {
                    this.skills[skillId] = skillData;
                    if (skillData.isAnger()) {
                        this.skillag = skillData;
                    } else {
                        this.skillpt = skillData;
                    }
                }
            }
        }

        public getObjId(): number {
            return this.camp * 10 + this.idx;
        }

        public isArtifact() {
            return false;
        }

        public onCreate(scene, hpnum: number) {
            this.scene = scene;
            // this.initCaptainSkill();//没有队长技了
            this.updateAttrs(0, true, true);
            //修正怒气值
            this.anger += this.getBaseAttr(iface.tb_prop.attrTypeKey.anger);
            this.setInitHp(hpnum);
            this.recordObjInit();
        }

        initCaptainSkill() {

        }

        //状态变化

        public setbAlive(val: boolean, preskill?) {
            if (val !== this._bAlive) {
                this._bAlive = val;
                //状态变化
                this.doPasvSkill(iface.tb_prop.triggerTypeKey.inScene, null, preskill);
            }
        }

        public get bAlive(): boolean {
            return this._bAlive;
        }

        /**
         * 此方法用于初始化设置血量
         * @param hpnum 
         */
        private setInitHp(hpnum: number) {
            // logfight("位置：",this.camp+"_"+this.idx," 初始化血量:",hpnum,this.hpMax);
            if (hpnum === -1) {
                this.hp = this.hpMax;
            } else {
                if (hpnum <= 1) {
                    this.hp = hpnum * this.hpMax;
                } else {
                    this.hp = hpnum;
                }
            }
            // this._bAlive = this.hp > 0;
            this.initHp = this.hp;
            this.oldMaxHp = this.hpMax;
        }

        public afterCreate(hpnum: number) {
            this.doPasvSkill(iface.tb_prop.triggerTypeKey.enterScene);
            this.doCaptainSkill();
            if (this.oldMaxHp !== this.hpMax) {
                this.setInitHp(hpnum);
                this.recordHpMaxChange();
            }
            this.bCreateDone = true;

            logfight("objId:%d ,生命 %f,攻击 %f,防御 %f,攻速 %f,暴击率 %f,暴击伤害 %f,效果命中 %f,效果抵抗 %f,吸血 %f,反击 %f,再次出手 %f,晕眩 %f,伤害加成 %f,治疗加成 %f,增伤 %f,减伤 %f,免疫控制 %f", this.getObjId(), this.hpMax, this.atk, this.def, this.atkSpd, this.crit, this.critDmg, this.effectHit, this.effectResist, this.suckBlood, this.strikeBack, this.rampage, this.dizzy, this.dmgRate, this.healRate, this.addDmg, this.delDmg, this.immeDizzy);
        }

        getLossHp(): number {
            return (this.initHp - this.hp);
        }

        public onWaveStart() {
            // this.clearAtkBar();
            this.clearBuff();
            this.updateAttrs(0, true, true);
            if (!this.bNewObj) {
                this.recordObjInit();
            }
            else {
                this.bNewObj = false;
            }
            this.setbAlive(this.hp > 0);
        }

        public doCaptainSkill() {

        }

        public updateAttrs(skillId, force?, notNotify?) {
            if (!force && Object.keys(this.attrMask).length <= 0) {
                return;
            }
            for (var key in iface.tb_prop.attrTypeKey) {
                this.calAttr(iface.tb_prop.attrTypeKey[key], skillId, force, notNotify);
            }
        }

        public calAttr(type, skillId, force, notNotify) {
            if (!force && !this.getAttrMask(type)) {
                return;
            }
            this.clearAttrMask(type);
            var base = this.getBaseAttr(type);
            var tmpAmendfiexd = this.getTmpAmend(type, iface.tb_prop.addAttrTypeKey.fixedVal);
            var tmpAmendpercent = this.getTmpAmend(type, iface.tb_prop.addAttrTypeKey.percentVal);
            var buffAmend = this.getBuffAmend(type);
            var value = 0;
            switch (type) {
                case iface.tb_prop.attrTypeKey.hpMax:
                case iface.tb_prop.attrTypeKey.atk:
                case iface.tb_prop.attrTypeKey.def:
                case iface.tb_prop.attrTypeKey.atkSpd:
                    value = base * Math.max(1 + tmpAmendpercent + buffAmend, 0) + tmpAmendfiexd;
                    break;
                case iface.tb_prop.attrTypeKey.crit:
                case iface.tb_prop.attrTypeKey.effectHit:
                case iface.tb_prop.attrTypeKey.effectResist:
                case iface.tb_prop.attrTypeKey.suckBlood:
                case iface.tb_prop.attrTypeKey.strikeBack:
                case iface.tb_prop.attrTypeKey.rampage:
                case iface.tb_prop.attrTypeKey.dizzy:
                case iface.tb_prop.attrTypeKey.immuDizzy:
                    value = Math.max(base + tmpAmendpercent + buffAmend + tmpAmendfiexd, 0);
                    break;
                case iface.tb_prop.attrTypeKey.addDmg:
                case iface.tb_prop.attrTypeKey.subDmg:
                    value = base + tmpAmendpercent + buffAmend + tmpAmendfiexd;
                    break;
                case iface.tb_prop.attrTypeKey.critDmg:
                case iface.tb_prop.attrTypeKey.dmgRate:
                case iface.tb_prop.attrTypeKey.healRate:
                    value = Math.max(1 + base + tmpAmendpercent + buffAmend + tmpAmendfiexd, 0);
                    break;
                default:
                    break;
            }
            if (!force) {
                logfight("calAttr type %d value %s base %s tmpAmendpercent %s tmpAmendfiexd %s buffAmend %s", type, value, base, tmpAmendpercent, tmpAmendfiexd, buffAmend);
            }
            this.setAttr(type, skillId, value, notNotify);
        }

        public setAttr(type, skillId, value, notNotify) {
            switch (type) {
                case iface.tb_prop.attrTypeKey.hpMax:
                    if (this.hpMax !== value) {
                        this.hpMax = value;
                        if (this.hp > this.hpMax) {
                            this.hp = this.hpMax;
                        }
                        if (!notNotify && this.bCreateDone) {
                            this.recordHpMaxChange(skillId);
                        }
                    }
                    break;
                case iface.tb_prop.attrTypeKey.atk: this.atk = value; break;
                case iface.tb_prop.attrTypeKey.def: this.def = value; break;
                case iface.tb_prop.attrTypeKey.atkSpd:
                    if (this.atkSpd !== value) {
                        // logfight("atkspd change %s-->%s", this.atkSpd, value);
                        this.atkSpd = value;
                        if (!notNotify) {
                            this.recordAtkSpdChange(skillId);
                        }
                    }
                    break;
                case iface.tb_prop.attrTypeKey.crit: this.crit = value; break;
                case iface.tb_prop.attrTypeKey.critDmg: this.critDmg = value; break;
                case iface.tb_prop.attrTypeKey.effectHit: this.effectHit = value; break;
                case iface.tb_prop.attrTypeKey.effectResist: this.effectResist = value; break;
                case iface.tb_prop.attrTypeKey.suckBlood: this.suckBlood = value; break;
                case iface.tb_prop.attrTypeKey.strikeBack: this.strikeBack = value; break;
                case iface.tb_prop.attrTypeKey.rampage: this.rampage = value; break;
                case iface.tb_prop.attrTypeKey.dizzy: this.dizzy = value; break;
                case iface.tb_prop.attrTypeKey.dmgRate: this.dmgRate = value; break;
                case iface.tb_prop.attrTypeKey.healRate: this.healRate = value; break;
                case iface.tb_prop.attrTypeKey.addDmg: this.addDmg = value; break;
                case iface.tb_prop.attrTypeKey.subDmg: this.delDmg = value; break;
                case iface.tb_prop.attrTypeKey.immuDizzy: this.immeDizzy = value; break;
                default: break;
            }
        }

        public getAttr(type, tagid?) {
            let base = 0;
            let value = 0;
            switch (type) {
                case iface.tb_prop.attrTypeKey.hpMax:
                    base = this.hpMax;
                    break;
                case iface.tb_prop.attrTypeKey.atk:
                    base = this.atk;
                    break;
                case iface.tb_prop.attrTypeKey.def:
                    base = this.def;
                    break;
                case iface.tb_prop.attrTypeKey.atkSpd:
                    base = this.atkSpd;
                    break;
                case iface.tb_prop.attrTypeKey.crit:
                    base = this.crit;
                    break;
                case iface.tb_prop.attrTypeKey.effectHit:
                    base = this.effectHit;
                    break;
                case iface.tb_prop.attrTypeKey.effectResist:
                    base = this.effectResist;
                    break;
                case iface.tb_prop.attrTypeKey.suckBlood:
                    base = this.suckBlood;
                    break;
                case iface.tb_prop.attrTypeKey.strikeBack:
                    base = this.strikeBack;
                    break;
                case iface.tb_prop.attrTypeKey.rampage:
                    base = this.rampage;
                    break;
                case iface.tb_prop.attrTypeKey.dizzy:
                    base = this.dizzy;
                    break;
                case iface.tb_prop.attrTypeKey.critDmg:
                    base = this.critDmg;
                    break;
                case iface.tb_prop.attrTypeKey.dmgRate:
                    base = this.dmgRate;
                    break;
                case iface.tb_prop.attrTypeKey.healRate:
                    base = this.healRate;
                    break;
                case iface.tb_prop.attrTypeKey.addDmg:
                    base = this.addDmg;
                    break;
                case iface.tb_prop.attrTypeKey.subDmg:
                    base = this.delDmg;
                    break;
                case iface.tb_prop.attrTypeKey.immuDizzy:
                    base = this.immeDizzy;
                    break;
                default: break;
            }

            if (!tagid) {
                return base;
            }

            let tagTmp = this.getTagTmpAmend(tagid);
            if (!tagTmp) {
                return base;
            }

            let tmpAmendpercent = tagTmp[String(type * 10000 + iface.tb_prop.addAttrTypeKey.percentVal)] || 0;
            let tmpAmendfiexd = tagTmp[String(type * 10000 + iface.tb_prop.addAttrTypeKey.fixedVal)] || 0;
            switch (type) {
                case iface.tb_prop.attrTypeKey.hpMax:
                case iface.tb_prop.attrTypeKey.atk:
                case iface.tb_prop.attrTypeKey.def:
                case iface.tb_prop.attrTypeKey.atkSpd:
                    value = base * Math.max(1 + tmpAmendpercent, 0) + tmpAmendfiexd;
                    break;
                case iface.tb_prop.attrTypeKey.crit:
                case iface.tb_prop.attrTypeKey.effectHit:
                case iface.tb_prop.attrTypeKey.effectResist:
                case iface.tb_prop.attrTypeKey.suckBlood:
                case iface.tb_prop.attrTypeKey.strikeBack:
                case iface.tb_prop.attrTypeKey.rampage:
                case iface.tb_prop.attrTypeKey.dizzy:
                case iface.tb_prop.attrTypeKey.immuDizzy:
                case iface.tb_prop.attrTypeKey.critDmg:
                case iface.tb_prop.attrTypeKey.dmgRate:
                case iface.tb_prop.attrTypeKey.healRate:
                    value = Math.max(base + tmpAmendpercent + tmpAmendfiexd, 0);
                    break;
                case iface.tb_prop.attrTypeKey.addDmg:
                case iface.tb_prop.attrTypeKey.subDmg:
                    value = base + tmpAmendpercent + tmpAmendfiexd;
                    break;
                default:
                    break;
            }

            return value;
        }

        public getBaseAttr(type) {
            return this.attrs[type] || 0;
        }

        public getTmpAmend(type, valtype) {
            return this.tmpAmends[type * 10000 + valtype] || 0;
        }

        public getTagTmpAmend(tagid) {
            if (!this.targetTmpAmends || !this.targetTmpAmends.hasOwnProperty(tagid)) {
                return null;
            }

            return this.targetTmpAmends[tagid];
        }

        public getBuffAmend(type) {
            return this.buffAmends[type] || 0;
        }

        // public recoverAtkBar() {
        //     this.atkBar += (this.atkSpd / 10);
        // }

        // public clearAtkBar() {
        //     this.atkBar = 0;
        // }

        // public getAtkBar(): number {
        //     return Math.round(Number(this.atkBar) * 1000000) / 1000000;
        // }

        // public changeAtkBar(percent, skillId) {
        //     var oldValue = this.atkBar;
        //     if (percent > 0) {
        //         this.atkBar += (this.scene.atkBarMax * percent);
        //     }
        //     else {
        //         if (this.hasBuff(iface.tb_prop.buffTypeKey.immune)) {
        //             this.recordFlyText(iface.tb_prop.flyTextTypeKey.resist, false, skillId);
        //             return 0;
        //         }
        //         this.atkBar *= Math.max(1 + percent, 0);
        //     }
        //     // this.recordAtkBar(skillId);
        //     return this.atkBar - oldValue;
        // }

        // public addAtkBar(value, skillId) {
        //     if (value <= 0) {
        //         return;
        //     }
        //     logfight("addAtkBar %s", value);
        //     this.atkBar += value;
        //     // this.recordAtkBar(skillId);
        // }

        public suckHp(totalDmg: number, skillId: number) {
            if (totalDmg <= 0) {
                return;
            }
            let tb_skill = tb.TB_skill.get_TB_skillById(skillId);
            var skillSuckRate = tb_skill ? tb_skill.recover_percent / 100 : 0;
            var percent = skillSuckRate + this.suckBlood;
            if (percent <= 0) {
                return;
            }

            if (this.hasBuff(iface.tb_prop.buffTypeKey.banRecover)) {
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.banRecover, false, skillId);
                return;
            }
            var value = totalDmg * percent;
            logfight("suckHp rate %s", value);
            this.updateHp(this, value, skillId);
        }

        public getOwnObjs() {
            return this.scene.getCampObjs(this.camp);
        }

        public getEnemyObjs() {
            var enemyCamp = getOppoCamp(this.camp);
            return this.scene.getCampObjs(enemyCamp);
        }

        public getEnemyRowObjs(row: number) {
            var enemyCamp = getOppoCamp(this.camp);
            return this.scene.getCampRowObjs(enemyCamp, row);
        }

        public getEnemyRowObjsByAlive(row: number) {
            var enemyCamp = getOppoCamp(this.camp);
            return this.scene.getCampRowObjs(enemyCamp, row, true);
        }

        public getOwnRowObjs(row: number) {
            return this.scene.getCampRowObjs(this.camp, row);
        }

        public startRound(bRampage: boolean) {
            logfight("camp %d idx %d atkSpd %d", this.camp, this.idx, this.atkSpd);
            if (bRampage) {
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.rampage);
            }
            this.beforeRound();
            if (!this.isAlive()) return;
            if (this.skipRound) {
                this.skipRound = false;
                logfight("skipRound!!!");
                return;
            }

            this.aiStart();
        }


        aiStart() {
            let curSkill = this.selectSkill();
            this.useSkill(curSkill, true);
            this.afterRound(curSkill);
        }

        public beforeRound() {
            this.getRoundFlag = false;
            // this.clearAtkBar();
            // this.decAllSkillCd(1);
            this.updateBuff(true);
            this.updateAttrs(0, true);
            this.recordNextRound();
            // this.scene.recordAtkBar();
        }

        public afterRound(curSkill: SkillData) {
            this.updateBuff(false);
            if (!this.getRoundFlag && this.rampage > 0 && Math.random() < this.rampage) {
                this.getRoundFlag = true;
            }
            this.scene.lastObjId = this.getObjId();
            this.stBackTarget = null;

            //清空怒气
            if (curSkill.isAnger()) {
                this.setAnger(0, curSkill.skillId);
            }
        }

        public setAnger(val, prtSkillId) {
            if (val == this.anger) {
                return;
            }
            this.anger = val;
            this.recordAddAnger(prtSkillId);
        }

        public chgAnger(param, val, preskill) {
            let resultval = 0;
            if (param == iface.tb_prop.addAttrTypeKey.fixedVal) {
                resultval += val
            } else if (param == iface.tb_prop.addAttrTypeKey.percentVal) {
                resultval += this.anger * val / 100
            }

            if (resultval < 0) {
                //减怒气飘字
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.angerDown, false, preskill);
            }
            resultval = Math.max(this.anger + resultval, 0);
            this.setAnger(resultval, preskill);
        }

        public startStrikeBack() {
            // var skillKey = Object.keys(this.skills);
            // if (skillKey.length <= 0) {
            //     return;
            // }
            this.recordFlyText(iface.tb_prop.flyTextTypeKey.strikeBack);
            // var selectId = Number(skillKey[0]);
            this.useSkill(this.skillpt);
            this.stBackTarget = null;
        }

        // public addSkillCd(skillId, num) {
        //     if (skillId === 0) {
        //         this.addAllSkillCd(num);
        //         return;
        //     }
        //     var skillData: SkillData = this.skills[skillId];
        //     if (!skillData) {
        //         return;
        //     }
        //     skillData.addCd(num);
        // }

        // public addAllSkillCd(num) {
        //     for (var skillId in this.skills) {
        //         var skillData: SkillData = this.skills[skillId];
        //         skillData.addCd(num);
        //     }
        // }

        // public decSkillCd(skillId, num) {
        //     if (skillId === 0) {
        //         this.decAllSkillCd(num);
        //         return;
        //     }
        //     var skillData: SkillData = this.skills[skillId];
        //     if (!skillData) {
        //         return;
        //     }
        //     skillData.decCd(num);
        // }

        // public decAllSkillCd(num: number) {
        //     for (var skillId in this.skills) {
        //         var skillData: SkillData = this.skills[skillId];
        //         skillData.decCd(num);
        //     }
        // }

        // public addPasvUseNum(skillId, subSkillId) {
        //     let tb_skill = tb.TB_skill.get_TB_skillById(skillId);
        //     var type = tb_skill ? tb_skill.type : null;
        //     if (type !== iface.tb_prop.skillTypeKey.passive) {
        //         return;
        //     }
        //     var skillData: SkillData = this.pasvSkills[skillId];
        //     if (!skillData) {
        //         logfight("skillData %d is null", skillId);
        //         return;
        //     }
        //     var subData: SubSkillData = skillData.subSkills[subSkillId];
        //     if (!subData) {
        //         logfight("subData %d is null", subSkillId);
        //         return;
        //     }
        //     subData.addUseNum();
        // }

        public selectSkill(): SkillData {
            var bSilence = this.hasBuff(iface.tb_prop.buffTypeKey.silence);
            var bSneer = this.hasBuff(iface.tb_prop.buffTypeKey.sneer);
            // var skillArr = [];
            // let skillData: SkillData;
            // for (var skillId in this.skills) {
            //     skillData = this.skills[skillId];
            //     if (!skillData) {
            //         continue;
            //     }
            //     if ((bSilence || bSneer) && skillData.isAnger()) {
            //         continue;
            //     }
            // if (Number(skillId) > 0 && !skillData.checkInCd() && skillData.checkUseConditions(this)) {
            //     skillArr.push(skillData);
            // }
            // }
            // if (skillArr.length <= 0) {
            //     return 0;
            // }
            // skillArr.sort(this.skillSort);
            // for (var i = 0; i < skillArr.length; i++) {
            //     skillData = skillArr[i];
            //     if (this.checkSkillUse(skillData)) {
            //         return skillData.skillId;
            //     }
            // }
            // return 0;

            if (!bSilence && !bSneer && this.anger >= tb.TB_skill_set.getSkillSet().spell_anger) {
                return this.skillag;
            }
            return this.skillpt;
        }

        //获取技能列表
        // public manualSkill(): Array<SelectSkillData> {
        //     var bSilence = this.hasBuff(iface.tb_prop.buffTypeKey.silence);
        //     var bSneer = this.hasBuff(iface.tb_prop.buffTypeKey.sneer);
        //     var skillArr = [];
        //     for (var skillId in this.skills) {
        //         let skillData: SkillData = this.skills[skillId];
        //         let selskill = new SelectSkillData(skillData, bSilence, bSneer, this);
        //         skillArr.push(selskill);
        //     }
        //     return skillArr;
        // }

        // public skillSort(a: SkillData, b: SkillData): number {
        //     if (a.priority !== b.priority) {
        //         return a.priority - b.priority;
        //     }
        //     if (a.cdMax !== b.cdMax) {
        //         return b.cdMax - a.cdMax;
        //     }
        //     return Math.random() < 0.5 ? -1 : 1;
        // }

        // public checkSkillUse(skillData: SkillData): boolean {
        //     var targets = [];
        //     switch (skillData.priority) {
        //         case iface.tb_prop.skillPriorityTypeKey.reborn:
        //             pushDeadTarget(targets, this.getOwnObjs(), BatteConsts.MAX_BATTLE_TARGET);
        //             return targets.length > 0;
        //         case iface.tb_prop.skillPriorityTypeKey.rebornAndGuard:
        //             if (this.hp / this.hpMax < BatteConsts.GUARD_HP_PERCENT) {
        //                 return true;
        //             }
        //             pushDeadTarget(targets, this.getOwnObjs(), BatteConsts.MAX_BATTLE_TARGET);
        //             return targets.length > 0;
        //         case iface.tb_prop.skillPriorityTypeKey.recover:
        //             var targetType = skillData.getMainTargetType();
        //             if (targetType === iface.tb_prop.targetTypeKey.self) {
        //                 return this.hp / this.hpMax < BatteConsts.RECOVER_HP_PERCENT;
        //             }
        //             if (targetType === iface.tb_prop.targetTypeKey.ownMinHp || targetType === iface.tb_prop.targetTypeKey.ownRandom) {
        //                 pushRecoverTarget(targets, this.getOwnObjs(), BatteConsts.MAX_BATTLE_TARGET);
        //                 return targets.length > 0;
        //             }
        //             return false;
        //         default:
        //             return true;
        //     }
        // }

        public useSkill(skilldata: SkillData, bAddAnger?: boolean) {
            // logfight("camp %d idx %d useSkill %d", this.camp, this.idx, skillId);
            // var skillData: SkillData = this.skills[skillId];
            var skillInfo = {
                totalDmg: 0,    // 总伤害
                robAtkBar: 0,   // 吸收的行动条总值
                tagDmg: {},
                critAnyEnemy: false,    //对任一敌方造成暴击
                eftAnyObj: false,    //效果对任一目标生效
                eftObj: {},//哪个子技能触发了
                hasFixedVal: false,    //是否有固定伤害
            };

            if (!skilldata) {
                logfight("skillData is null");
                return;
            }
            skilldata.useSkill(this, bAddAnger, skillInfo);

            let targets: Array<number> = skilldata.getMainTargetIds();
            if (targets.length > 0) {
                //对友方施法不处理
                if (this.camp == this.scene.getCampByObjid(targets[0])) return;
                //被攻击时判断
                this.onBeAtkEnd(targets, skilldata.skillId, skillInfo);
                //死亡相关判断
                // this.onDeadEnd(targets, skilldata.skillId);
            }

            //本回合死亡的队列进行死亡后处理
            this.scene.deadOpt();
        }

        /**
         * 伤害帧结束后，被打击判断
         * @param targets 
         * @param skillId 
         */
        public onBeAtkEnd(targets: Array<number>, skillId: number, skillInfo) {
            let tagCamp = this.camp;
            for (let k = 0; k < targets.length; k++) {
                let tag = this.scene.getObjById(targets[k]);
                tagCamp = tag.camp;
                tag.doPasvSkill(iface.tb_prop.triggerTypeKey.selfBeAtk, this, skillId, skillInfo);
                tag.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.beAtk, null, skillId);

                if (k == targets.length - 1) {
                    //最后再执行队友被打击被动触发  目标传入最后一个被打的目标
                    this.scene.doCampPasvSkill(tagCamp, iface.tb_prop.triggerTypeKey.ownBeAtk, tag, skillId);
                }
            }
        }

        /**
         * 伤害帧结束后，死亡判断
         * @param targets 
         * @param skillId 
         */
        public onDeadEnd() {
            if (isEmptyObject(this._deadObj)) {
                return;
            }
            if (this.isAlive()) {
                this._deadObj = null;
                return;
            }

            logfight(`${this.getObjId()}触发死亡被动和buff判断`);
            let sid = this._deadObj.skillid;

            //队友死亡时触发
            this.scene.teamMateDeadOpt(this, sid);

            //先结算所有非复活类的被动和buff
            this.settlementOpt(false, sid);
            //再结算所有复活类的被动和buff
            this.settlementOpt(true, sid);
            this._deadObj = null;
        }

        private settlementOpt(rebornTrigger: boolean, skillId: number) {
            // for (let q = 0; q < targets.length; q++) {
            // let tag = this.scene.getObjById(targets[q]);
            if (!this.isAlive()) {
                this.doPasvSkillEnd(rebornTrigger, skillId);
                this.doBuffTriggerEnd(rebornTrigger, skillId);
            }
            // }
        }

        /**
         * 伤害帧结束后，死亡类型被动触发
         * @param rebornTrigger 是否触发复活类效果被动
         * @param prtSkillId 
         */
        public doPasvSkillEnd(rebornTrigger: boolean, prtSkillId?) {
            for (var skillId in this.pasvSkills) {
                var skillData: SkillData = this.pasvSkills[skillId];
                if (rebornTrigger == skillData.hasRebornInSubSkill()) {
                    skillData.doPasvSkill(iface.tb_prop.triggerTypeKey.selfDead, this, this, prtSkillId);
                }
            }
        }

        /**
         * 伤害帧结束后，死亡类型buff触发
         * @param rebornTrigger 是否触发复活类效果被动
         * @param prtSkillId 
         */
        public doBuffTriggerEnd(rebornTrigger: boolean, prtSkillId?) {
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (rebornTrigger == buff.hasRebornEffect() && buff.canTrigger(iface.tb_prop.buffTrigTypeKey.dead)) {
                        buff.trigger(false, prtSkillId);
                        if (!buff.checkAlive()) {
                            //自然移除
                            this.rmBuff(buff, prtSkillId);
                        }
                    }
                }
            }
        }

        public useSkillFast(skillId, prtSkillId) {
            var skillInfo = {
                totalDmg: 0,    // 总伤害
                robAtkBar: 0,   // 吸收的行动条总值
                tagDmg: {},
                critAnyEnemy: false,    //对任一敌方造成暴击
                eftAnyObj: false,    //效果对任一目标生效
                eftObj: {},//哪个子技能触发了
                hasFixedVal: false,    //是否有固定伤害
            };
            var skillData = new SkillData(skillId);
            skillData.useSkillFast(this, skillInfo, prtSkillId);
        }

        public doPasvSkill(triggerType, extTarget?, prtSkillId?, extParam?) {
            for (var skillId in this.pasvSkills) {
                var skillData: SkillData = this.pasvSkills[skillId];
                skillData.doPasvSkill(triggerType, this, extTarget, prtSkillId, extParam);
            }
        }

        // public doCampPasvSkill(triggerType, extTarget: BattleObj, prtSkillId) {
        //     this.scene.doCampPasvSkill(this.camp, triggerType, extTarget, prtSkillId);
        // }

        public shareBuffTrigger(dmgInfo, atker: BattleObj, target, skillId, bCrit, triggerDeadly?: boolean) {
            var buffObjs = this.buffs[iface.tb_prop.buffTypeKey.shareDmg];
            if (!buffObjs) {
                updateObjHp(atker, target, -dmgInfo.value, skillId, bCrit, triggerDeadly);
            } else {
                var sharedmg: number = 0;
                var tempdmg = dmgInfo.value;
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    var _sharedmg = Math.floor(tempdmg * (buff.tplt.effect_percent / 100));
                    buff.caster.recordFlyText(iface.tb_prop.flyTextTypeKey.share, false, skillId);
                    updateObjHp(atker, buff.caster, -_sharedmg, skillId, bCrit, triggerDeadly);
                    sharedmg += _sharedmg;
                    logfight(`${buff.caster.getObjId()}分摊了${_sharedmg}伤害`);
                }
                dmgInfo.value -= sharedmg;
                updateObjHp(atker, target, -dmgInfo.value, skillId, bCrit, triggerDeadly);
            }
        }

        public modifyDmg(dmgInfo, skillId): boolean {
            var typeArr = [iface.tb_prop.buffTypeKey.attr, iface.tb_prop.buffTypeKey.god, iface.tb_prop.buffTypeKey.shield];
            for (var i = 0; i < typeArr.length; i++) {
                var buffObjs = this.buffs[typeArr[i]];
                if (!buffObjs) {
                    continue;
                }
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (buff.modifyDmg(dmgInfo, skillId)) {
                        //非自然移除
                        this.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.buffDefAndCasterTriggerSkill, null, skillId);
                        this.rmBuff(buff, skillId);
                    }
                }
            }
            return dmgInfo.value > 0;
        }

        public onBeAtk(atker: BattleObj, skillId) {
            this.rmBuffByType(iface.tb_prop.buffTypeKey.sleep, skillId);
            // if (!atker.stBackTarget && !this.stBackTarget && this.strikeBack > 0 && Math.random() < this.strikeBack) {
            //     this.stBackTarget = atker;
            // }
            // this.doPasvSkill(iface.tb_prop.triggerTypeKey.selfBeAtk, this, skillId);
            // this.doCampPasvSkill(iface.tb_prop.triggerTypeKey.ownBeAtk, this, skillId);
            // this.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.beAtk, skillId);
        }

        public onBeCrit(atker: BattleObj, skillId) {
            this.doPasvSkill(iface.tb_prop.triggerTypeKey.beCrit, this, skillId);
        }

        public onAtkObj(skillId, tags: BattleObj[]) {
            //攻击时触发的buff
            this.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.atking, null, skillId);
        }

        public onCritObj(skillInfo, skillId, subSkillId) {
            this.doPasvSkill(iface.tb_prop.triggerTypeKey.crit);
            this.doSubSkillEffects(skillInfo, skillId, subSkillId, iface.tb_prop.triggerTypeKey.crit);
        }

        public doSubSkillEffects(skillInfo, skillId, subSkillId, triggerType) {
            var skillData: SkillData = this.skills[skillId];
            if (!skillData) {
                logfight("skillData %d is null", skillId);
                return;
            }
            var subData: SubSkillData = skillData.subSkills[subSkillId];
            if (!subData) {
                logfight("subData %d is null", subSkillId);
                return;
            }
            subData.doEffects(skillInfo, triggerType, this);
        }

        public onCritAnyEnemy(skillInfo, skillId, prtSkillId) {
            this.doPasvSkill(iface.tb_prop.triggerTypeKey.critAnyEnemy, null, prtSkillId);
            this.doSkillEffects(skillInfo, skillId, iface.tb_prop.triggerTypeKey.critAnyEnemy);
        }

        public onEftAnyObj(skillInfo, skillId, prtSkillId) {
            this.doPasvSkill(iface.tb_prop.triggerTypeKey.eftAnyObj, null, prtSkillId);
            this.doSkillEffects(skillInfo, skillId, iface.tb_prop.triggerTypeKey.eftAnyObj);
        }

        public doSkillEffects(skillInfo, skillId, triggerType) {
            var skillData = this.skills[skillId];
            if (!skillData) {
                logfight("skillData %d is null", skillId);
                return;
            }
            for (var subSkillId in skillData.subSkills) {
                var subData = skillData.subSkills[subSkillId];
                if (!subData) {
                    logfight("subData %d is null", subSkillId);
                    continue;
                }
                subData.doEffects(skillInfo, triggerType, this);
            }
        }

        // public doCritAnyEnemyEffects(skillInfo, skillId) {
        //     var skillData = this.skills[skillId];
        //     if (!skillData) {
        //         logfight("skillData %d is null", skillId);
        //         return;
        //     }
        //     for (var subSkillId in skillData.subSkills) {
        //         var subData = skillData.subSkills[subSkillId];
        //         if (!subData) {
        //             logfight("subData %d is null", subSkillId);
        //             continue;
        //         }
        //         subData.doEffects(skillInfo, iface.tb_prop.triggerTypeKey.critAnyEnemy, this);
        //     }
        // }

        /**
         * 接收伤害入口
         * @param atker 
         * @param value 
         * @param skillId 
         * @param after 
         * @param bCrit 
         */
        public updateHp(atker, value: number, skillId: number, after: boolean = false, bCrit?: boolean, triggerDeadly?: boolean, showeff?: boolean) {

            var temphp = Math.max(this.hp + value, 0);
            //致命一击的触发
            if (triggerDeadly && temphp == 0) {
                this.doPasvSkill(iface.tb_prop.triggerTypeKey.enterSceneFirst, this, skillId);
            }

            if (this.immuneDmg) {
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.immune, false, skillId);
                this.immuneDmg = false;
                return;
            }

            this.hp = Math.min(temphp, this.hpMax);
            // logfight("updateHp!! skillId %d value %d hp %d", skillId, value, this.hp);
            this.recordHpChange(bCrit, value, skillId, after, showeff);
            if (this.hp <= 0) {
                if (!this.hasBuff(iface.tb_prop.buffTypeKey.noDeath)) {
                    this.dead(atker, skillId);
                    return;
                }
                this.hp = 1;
                logfight("noDeath %s", skillId);
            }
            // this.recordHpChange(bCrit, value, skillId, after);

            //受到伤害的被动触发
            this.doPasvSkill(iface.tb_prop.triggerTypeKey.addDamage, null, skillId);
        }

        public isAlive() {
            return this.bAlive;
        }

        private _deadObj;
        public dead(atker: BattleObj, skillId: number) {
            logfight("Dead!! objId %d atkerObjId %d skillId %d", this.getObjId(), atker.getObjId(), skillId);
            this.setbAlive(false, skillId);
            // this.doPasvSkill(iface.tb_prop.triggerTypeKey.selfDead, this, skillId);
            if (!atker.isArtifact()) {
                //攻击者如果不是神器。
                atker.doPasvSkill(iface.tb_prop.triggerTypeKey.enemyDead, this, skillId);
                var skillInfo = {};
                atker.doSkillEffects(skillInfo, skillId, iface.tb_prop.triggerTypeKey.enemyDead);
            }
            // this.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.dead, skillId);
            this.clearEnemySneerBuff(skillId);
            //死亡时，清空队友身上的分摊buff
            this.clearOwnShareBuff(skillId);

            //清空怒气
            this.setAnger(0, skillId);

            //死亡时从攻击队列中剔除
            this.scene.removeAtkItem(this);

            this._deadObj = { isdead: true, skillid: skillId };
        }

        public reborn(atker: BattleObj, hpPer: number, skillId) {
            this.setbAlive(true, skillId);
            this.stBackTarget = null;
            this.getRoundFlag = false;
            this.skipRound = false;
            this.recordFlyText(iface.tb_prop.flyTextTypeKey.reborn, false, skillId);
            // this.clearAtkBar();
            this.clearBuff();
            this.updateAttrs(skillId, true);
            this.setHpPer(atker, hpPer, skillId);
        }

        public setHpPer(atker: BattleObj, percent: number, skillId) {
            var chgHp: number = this.hpMax * percent - this.hp;
            this.updateHp(atker, chgHp, skillId);
        }

        public setHp(atker, hp, skillId) {
            var chgHp = hp - this.hp;
            this.updateHp(atker, chgHp, skillId);
        }

        public chgHpPer(atker, val, after: boolean = false, skillId?, bNotDead?, showeff = false) {
            if (!val) {
                return;
            }
            // var chgHp = this.hpMax * percent;
            if (val > 0) {
                if (this.hasBuff(iface.tb_prop.buffTypeKey.banRecover)) {
                    this.recordFlyText(iface.tb_prop.flyTextTypeKey.banRecover, after, skillId);
                    return;
                }
                val *= this.healRate;
            }
            if (bNotDead && this.hp + val <= 0) {
                val = -(this.hp - 1);
            }
            this.updateHp(atker, val, skillId, after, false, false, val > 0 && showeff);
        }

        public isSameCamp(obj) {
            return this.camp === obj.camp;
        }

        public setAttrMask(type) {
            this.attrMask[type] = true;
        }

        public clearAttrMask(type) {
            delete this.attrMask[type];
        }

        public getAttrMask(type) {
            return this.attrMask[type];
        }

        /**
         * 
         * @param type 属性类型
         * @param valtype 固定值或者百分比
         * @param val 
         * @param skillId 
         */
        public modifyTmpAmend(type, valtype, val, skillId) {
            this.setAttrMask(type);
            var key = type * 10000 + valtype;
            this.tmpAmends[key] = this.tmpAmends[key] || 0;
            this.tmpAmends[key] += val;
            this.updateAttrs(skillId);
        }

        /**
         * 
         * @param type 属性类型
         * @param valtype 固定值或者百分比
         * @param val 
         * @param skillId 
         */
        public modifyTagTmpAmend(tagid, type, valtype, val) {
            if (!this.targetTmpAmends) {
                this.targetTmpAmends = {};
            }
            if (!this.targetTmpAmends.hasOwnProperty(tagid)) {
                this.targetTmpAmends[tagid] = {};
            }
            let tmp = this.targetTmpAmends[tagid];
            let key = type * 10000 + valtype;
            tmp[key] = tmp[key] || 0;
            tmp[key] += val;
        }

        public clearTmpAmend(skillId) {
            for (var type in this.tmpAmends) {
                this.setAttrMask(Math.floor(Number(type) / 10000));
            }
            this.tmpAmends = {};
            this.updateAttrs(skillId);

            this.targetTmpAmends = {};
        }

        /**
         * 添加buff
         * @param buffId 
         * @param caster 
         * @param skillId 
         * @param round 
         * @param stackCnt 
         */
        public addBuff(buffId, caster: BattleObj, skillId, round?, stackCnt?) {
            //角色要活着
            // if (!this.isAlive()) {
            //     return;
            // }
            var tplt: tb.TB_buff = tb.TB_buff.get_TB_buffById(buffId);
            if (!tplt) {
                logerror("addBuff tb_buff[%s] is null", buffId);
                return;
            }
            if (!this.checkAddBuff(tplt, skillId)) {
                return;
            }

            //上buff前需要触发的被动
            this.scene.onAddBuffBefore(tplt.ID, this, caster, skillId);

            if (this.checkBuffReact(tplt, caster, skillId, round, stackCnt)) {
                return;
            }

            var buff: BuffObj = this.createBuff(caster, tplt, this.scene.genBuffInstId(), skillId, round, stackCnt);
            this.buffs[tplt.type] = this.buffs[tplt.type] || {};
            this.buffs[tplt.type][buff.buffInstId] = buff;
            this.recordAddBuff(buff, true);

            // this.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.buffAllCasterTriggerEff, null, skillId);
        }

        public checkAddBuff(tplt: tb.TB_buff, skillId) {
            switch (tplt.status_type) {
                case iface.tb_prop.buffStatTypeKey.positive:
                    if (this.hasBuff(iface.tb_prop.buffTypeKey.disablePositive)) {
                        // logfight("disablePositive!!! can't addbuff %d", tplt.ID);
                        return false;
                    }
                    break;
                case iface.tb_prop.buffStatTypeKey.negative:
                    if (this.hasBuff(iface.tb_prop.buffTypeKey.immune)) {
                        this.recordFlyText(iface.tb_prop.flyTextTypeKey.resist, false, skillId);
                        return false;
                    }
                    break;
                default:
                    break;
            }
            var type = tplt.type;
            if (type === iface.tb_prop.buffTypeKey.bleed && (this.isImmunePoison() || this.hasBuff(iface.tb_prop.buffTypeKey.immuBleed))) {
                //免疫流血
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.resist, false, skillId);
                return false;
            }
            if (type === iface.tb_prop.buffTypeKey.dizzy && (this.isImmuneCtrl() || this.hasBuff(iface.tb_prop.buffTypeKey.immuDizzy))) {
                //免疫晕眩
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.resist, false, skillId);
                return false;
            }

            if (type === iface.tb_prop.buffTypeKey.sleep && (this.isImmuneCtrl() || this.hasBuff(iface.tb_prop.buffTypeKey.immuSleep))) {
                //免疫睡眠
                this.recordFlyText(iface.tb_prop.flyTextTypeKey.resist, false, skillId);
                return false;
            }
            return true;
        }

        public checkBuffReact(tplt: tb.TB_buff, caster, skillId, round, stackCnt) {
            var buffs = this.getBuffsById(tplt.ID);
            if (tplt.stack_type === iface.tb_prop.buffStackTypeKey.coexistStack || tplt.stack_type === iface.tb_prop.buffStackTypeKey.coexistCover) {
                if (Object.keys(buffs).length < tplt.stack_max) {
                    return false;
                }
            }
            for (var key in buffs) {
                var buff: BuffObj = buffs[key];
                if (buff.getStackType() === iface.tb_prop.buffStackTypeKey.stack || buff.getStackType() === iface.tb_prop.buffStackTypeKey.coexistStack) {
                    buff.onStack(skillId, stackCnt);
                    return true;
                }
                if (buff.getStackType() === iface.tb_prop.buffStackTypeKey.cover || buff.getStackType() === iface.tb_prop.buffStackTypeKey.coexistCover) {
                    buff.onCover(caster, skillId, round, stackCnt);
                    return true;
                }
            }
            return false;
        }

        public createBuff(caster, tplt, buffInstId, skillId, round, stackCnt): BuffObj {
            return new BuffObj(this, caster, tplt, buffInstId, skillId, round, stackCnt);
        }

        public clearBuff() {
            var exists = [], buff: BuffObj;
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    buff = buffObjs[key];
                    if (buff.isDeadExist()) {
                        exists.push(buff);
                    } else {
                        buff.onRemove(true);
                    }
                }
            }
            this.buffs = {};
            for (var i = 0; i < exists.length; i++) {
                buff = exists[i];
                if (buff) {
                    this.buffs[buff.getType()] = this.buffs[buff.getType()] || {};
                    this.buffs[buff.getType()][buff.buffInstId] = buff;
                }
            }
        }

        public rmBuff(buff: BuffObj, skillId?) {
            var buffObjs = this.buffs[buff.getType()];
            if (!buffObjs) {
                return;
            }
            if (!buffObjs[buff.buffInstId]) {
                return;
            }
            if (!buff.checkRemove(this.scene.round)) {
                return;
            }
            delete buffObjs[buff.buffInstId];
            buff.onRemove();
            this.recordRmBuff(buff, skillId);
        }

        public rmBuffById(buffId: number, skillId) {
            var tplt = tb.TB_buff.get_TB_buffById(buffId);
            if (!tplt) {
                logfight("rmBuffById tb_buff[%s] is null", buffId);
                return;
            }
            var buffObjs = this.buffs[tplt.type];
            if (!buffObjs) {
                return;
            }
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                if (buff.getTpltId() === buffId) {
                    this.rmBuff(buff, skillId);
                }
            }
        }

        public rmBuffByType(type, skillId) {
            var buffObjs = this.buffs[type];
            if (!buffObjs) {
                return;
            }
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                this.rmBuff(buff, skillId);
            }
        }

        public rmBuffByStatType(statType: number, num: number, skillId: number) {
            var rmBuffs = [];
            num = num || 0;
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (buff.getStatType() === statType) {
                        this.rmBuff(buff, skillId);
                        rmBuffs.push(buff);
                        if (num > 0 && --num <= 0) {
                            return rmBuffs;
                        }
                    }
                }
            }
            return rmBuffs;
        }

        public getBuffs(type) {
            return this.buffs[type];
        }

        public getBuffsById(buffId) {
            var tplt = tb.TB_buff.get_TB_buffById(buffId);
            if (!tplt) {
                logerror("getBuffsById tb_buff[%s] is null", buffId);
                return {};
            }
            var buffObjs = this.buffs[tplt.type];
            if (!buffObjs) {
                return {};
            }
            var buffs = {};
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                if (buff.getTpltId() === buffId) {
                    buffs[key] = buff;
                }
            }
            return buffs;
        }

        public hasBuff(type) {
            var buffObjs = this.buffs[type];
            return buffObjs && Object.keys(buffObjs).length > 0 ? true : false;
        }

        public hasBuffById(buffId) {
            var tplt = tb.TB_buff.get_TB_buffById(buffId);;
            if (!tplt) {
                logfight("hasBuffById tb_buff[%s] is null", buffId);
                return false;
            }
            var buffObjs = this.buffs[tplt.type];
            if (!buffObjs) {
                return false;
            }
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                if (buff.getTpltId() === buffId) {
                    return true;
                }
            }
            return false;
        }

        public hasBuffByStatType(statType) {
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (buff.getStatType() === statType) {
                        return true;
                    }
                }
            }
            return false;
        }

        public getBuffNumByStatType(statType) {
            var num = 0;
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (buff.getStatType() === statType) {
                        num++;
                    }
                }
            }
            return num;
        }

        public doBuffTrigger(buffTrigType, extParam?, skillId?) {
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (buff.canTrigger(buffTrigType, extParam)) {
                        buff.trigger(false, skillId);
                        if (!buff.checkAlive()) {
                            this.rmBuff(buff, skillId);
                        }
                    }
                }
            }
        }

        public getStBackTarget(): BattleObj {
            if (this.stBackTarget && this.stBackTarget.isAlive()) {
                return this.stBackTarget;
            }
            return null;
        };

        public getSneerTarget(): BattleObj {
            var buffObjs = this.buffs[iface.tb_prop.buffTypeKey.sneer];
            if (!buffObjs) {
                return null;
            }
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                if (buff) {
                    var caster = buff.caster;
                    if (caster && !caster.isArtifact() && caster.isAlive()) {
                        return caster;
                    }
                }
            }
            return null;
        };

        /**
         * 清楚嘲讽buff
         * @param skillId 
         */
        public clearEnemySneerBuff(skillId) {
            var oppoCamp = getOppoCamp(this.camp);
            this.scene.clearCampSneerBuffByCaster(oppoCamp, this, skillId);
        };

        public clearOwnShareBuff(skillId) {
            this.scene.clearCampShareBuffByCaster(this.camp, this, skillId);
        }

        public clearSneerBuffByCaster(caster: BattleObj, skillId: number) {
            if (!caster) {
                return;
            }
            var buffObjs = this.buffs[iface.tb_prop.buffTypeKey.sneer];
            if (!buffObjs) {
                return;
            }
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                if (buff && buff.caster && buff.caster.getObjId() === caster.getObjId()) {
                    this.rmBuff(buff, skillId);
                }
            }
        };

        public clearShareBuffByCaster(caster: BattleObj, skillId: number) {
            if (!caster) {
                return;
            }
            var buffObjs = this.buffs[iface.tb_prop.buffTypeKey.shareDmg];
            if (!buffObjs) {
                return;
            }
            for (var key in buffObjs) {
                var buff: BuffObj = buffObjs[key];
                if (buff && buff.caster && buff.caster.getObjId() === caster.getObjId()) {
                    this.rmBuff(buff, skillId);
                }
            }
        };

        public transNegativeBuff(target, num, skillId) {
            var rmBuffs = this.rmBuffByStatType(iface.tb_prop.buffStatTypeKey.negative, num, skillId);
            for (var i = 0; i < rmBuffs.length; i++) {
                var buff = rmBuffs[i];
                if (!buff) {
                    continue;
                }
                logfight("transNegativeBuff %d round %d stackCnt %d", buff.getTpltId(), buff.round, buff.stackCnt);
                target.addBuff(buff.getTpltId(), this, skillId, buff.round, buff.stackCnt);
            }
        }

        public transPositiveBuff(target: BattleObj, num, skillId) {
            var rmBuffs = target.rmBuffByStatType(iface.tb_prop.buffStatTypeKey.positive, num, skillId);
            for (var i = 0; i < rmBuffs.length; i++) {
                var buff = rmBuffs[i];
                if (!buff) {
                    continue;
                }
                logfight("transPositiveBuff %d round %d stackCnt %d", buff.getTpltId(), buff.round, buff.stackCnt);
                this.addBuff(buff.getTpltId(), this, skillId, buff.round, buff.stackCnt);
            }
        }

        public updateBuff(isBefore: boolean) {
            for (var type in this.buffs) {
                var buffObjs = this.buffs[type];
                for (var key in buffObjs) {
                    var buff: BuffObj = buffObjs[key];
                    if (buff.canDoEffect(isBefore)) {
                        buff.doEffect(isBefore);
                        if (!buff.checkAlive()) {
                            this.rmBuff(buff, isBefore ? 0 : -1);
                        }
                    }
                }
            }
        }

        public modifyBuffAmend(type, percent, skillId, notNotify) {
            this.setAttrMask(type);
            this.buffAmends[type] = this.buffAmends[type] || 0;
            this.buffAmends[type] += percent;
            this.updateAttrs(skillId, false, notNotify);
        }

        public getRaceGrade(target: BattleObj) {
            return getRaceGrade(this.race, target.race);
        }

        public recordNextRound() {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.nextRound,
                objId: this.getObjId(),
            };
            this.scene.recordOperate(0, operate);
        }

        public recordObjInit() {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.objInit,
                objId: this.getObjId(),
                objType: this.type,
                templateId: this.templateId,
                hp: Number(this.hp),
                hpMax: Number(this.hpMax),
                atkSpd: Math.round(this.atkSpd * 100) / 100,
                level: this.level,
                degree: this.degree,
                starLev: this.starLev,
                awakenLv: this.awakenLv,
                skinId: this.skinId,
                anger: this.anger,
                uuid: this.uuid
            };
            this.scene.recordOperate(0, operate);
        }

        public recordHpMaxChange(skillId?) {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.hpMaxChange,
                objId: this.getObjId(),
                hp: Number(this.hp),
                hpMax: Number(this.hpMax),
            };
            this.scene.recordOperate(skillId, operate);
        }

        // public recordAtkBar(skillId?) {
        //     var operate = {
        //         type: iface.tb_prop.battleOpTypeKey.atkBar,
        //         objId: this.getObjId(),
        //         atkBar: this.getAtkBar(),
        //     };
        //     this.scene.recordOperate(skillId, operate);
        // }

        public recordAtkSpdChange(skillId) {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.atkSpdChange,
                objId: this.getObjId(),
                atkSpd: Math.round(this.atkSpd * 100) / 100,
            };
            this.scene.recordOperate(skillId, operate);
        }

        public recordUseSkill(skillId, targetIds, prtSkillId) {
            if (!targetIds) {
                return;
            }
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.useSkill,
                skillId: skillId,
                objId: this.getObjId(),
                targetIds: targetIds,
            };
            this.scene.recordOperate(prtSkillId > 0 ? prtSkillId : 0, operate);
        }

        public recordAddAnger(prtSkillId) {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.roleAngerChange,
                anger: this.anger,
                objId: this.getObjId(),
            };
            this.scene.recordOperate(prtSkillId > 0 ? prtSkillId : 0, operate);
        }

        public recordTrigPasvSkill(skillId, prtSkillId, mainTagers) {
            if (!this.scene.checkPasvSkillRecord(skillId, prtSkillId)) {
                return;
            }

            if (!mainTagers) {
                return;
            }
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.trigPasvSkill,
                skillId: skillId,
                objId: this.getObjId(),
                targetIds: mainTagers,
            };
            this.scene.recordOperate(prtSkillId > 0 ? prtSkillId : 0, operate);
        }

        public recordHpChange(bCrit: boolean, value: number, skillId: number, after: boolean, showeff: boolean) {
            this.recordFlyText(bCrit ? iface.tb_prop.flyTextTypeKey.crit : iface.tb_prop.flyTextTypeKey.hpChange, after, skillId, value, showeff);
            let tb_skill = tb.TB_skill.get_TB_skillById(skillId);
            if (!skillId || !tb_skill.isSkillDmgMultiSection()) {
                var operate = {
                    type: iface.tb_prop.battleOpTypeKey.hpChange,
                    objId: this.getObjId(),
                    hp: Number(this.hp),
                };
                this.scene.recordOperate(after ? -1 : skillId, operate);
            }
        }

        public recordFlyText(flyTextType, after: boolean = false, skillId?, value?, showeff?) {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.flyText,
                objId: this.getObjId(),
                flyTextType: flyTextType,
            };
            if (value) {
                operate["value"] = parseInt(value);
            }
            if (showeff) {
                operate["showeff"] = 1;
            }
            this.scene.recordOperate(after ? -1 : skillId, operate);
        }

        public recordAddBuff(buff, isNew) {
            this.recordBuff(iface.tb_prop.battleOpTypeKey.addBuff, buff, buff.skillId, false, isNew);
        }

        public recordBuffChange(buff, skillId, bAdd, isNew) {
            this.recordBuff(iface.tb_prop.battleOpTypeKey.buffChange, buff, skillId, bAdd, isNew);
        }

        public recordRmBuff(buff, skillId) {
            this.recordBuff(iface.tb_prop.battleOpTypeKey.rmBuff, buff, skillId);
        }

        public recordBuff(type, buff: BuffObj, skillId, bAdd: boolean = false, isNew?: boolean) {
            if (!buff.isShow()) {
                return;
            }
            skillId = skillId || 0;
            let operate: any;
            operate = {
                type: type,
                objId: this.getObjId(),
                casterId: buff.caster.getObjId(),
                skillId: buff.skillId,
                buffId: buff.getTpltId(),
                buffInstId: buff.buffInstId,
                round: buff.round,
                stackCnt: buff.stackCnt,
            };
            if (isNew) {
                operate.showeff = 1;
            }
            if (type === iface.tb_prop.battleOpTypeKey.rmBuff) {
                operate = { type: type, buffInstId: buff.buffInstId };
            }
            if (type === iface.tb_prop.battleOpTypeKey.buffChange && bAdd) {
                operate.bAdd = true;
            }
            this.scene.recordOperate(skillId, operate);
        }

        public addSelfAnger(skillId) {
            var selfAtft = this.scene.getCampArtifact(this.camp);
            if (!selfAtft) {
                return;
            }
            selfAtft.addAngerOnAtk(skillId);
        }

        public addEnemyAnger(skillId) {
            var oppoCamp = getOppoCamp(this.camp);
            var oppoAtft = this.scene.getCampArtifact(oppoCamp);
            if (!oppoAtft) {
                return;
            }
            oppoAtft.addAngerOnBeAtk(skillId);
        }

        isImmunePoison() {
            return false;
        }

        isImmuneCtrl() {
            return false;
        }

        isBeCrit() {
            return this.beCrit;
        }

        setBeCrit() {
            this.beCrit = true;
        }

        clearBeCrit() {
            this.beCrit = false;
        }
    }
}