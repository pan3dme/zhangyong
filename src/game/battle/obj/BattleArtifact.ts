module battle {
    export class BattleArtifact {

        public templateId;
        public camp;
        public skillLv;
        public skillData:AtftSkillData;
        public anger:number;
        public scene:BattleScene;

        constructor(camp, arr) {
            this.scene = null;
            var id = arr[0];
            var skillLv = arr[1];
            var skillUpId = getArtifactSkillId(id, skillLv);
            let tb_artifact_skill = tb.TB_artifact_skill.get_TB_artifact_skillById(skillUpId);
            if (!tb_artifact_skill) {
                logfight("tb_artifact_skill %d is null", skillUpId);
                return;
            }
            this.templateId = id;
            this.camp = camp;
            this.skillLv = skillLv;
            this.skillData = new AtftSkillData(tb_artifact_skill.skill);
            this.anger = 0;
            // logfight("BattleArtifact %j", this);
        }

        public onCreate(scene) {
            this.scene = scene;
        }

        public isArtifact() {
            return true;
        }

        public getObjId() {
            return 100 + this.camp;
        }

        public onWaveStart() {
            this.recordAtftInit();
        }

        public isAngerFull() {
            return this.anger >= tb.TB_artifact_set.get_TB_artifact_setById().anger[0];
        }

        public addAngerOnAtk(skillId) {
            this.anger += tb.TB_artifact_set.get_TB_artifact_setById().anger[1];
            this.recordAngerChange(skillId);
        }

        public addAngerOnBeAtk(skillId) {
            this.anger += tb.TB_artifact_set.get_TB_artifact_setById().anger[2];
            this.recordAngerChange(skillId);
        }

        public getOwnObjs() {
            return this.scene.getCampObjs(this.camp);
        }

        public getEnemyObjs() {
            var enemyCamp = getOppoCamp(this.camp);
            return this.scene.getCampObjs(enemyCamp);
        }

        public startRound() {
            this.useSkill();
            this.recordAngerChange();
        }

        public useSkill() {
            this.skillData.useSkill(this);

            let targets: Array<number> = this.skillData.getMainTargetIds();
            if (targets.length > 0) {
                //对友方施法不处理
                if (this.camp == this.scene.getCampByObjid(targets[0])) return;
                //被攻击时判断
                this.onBeAtkEnd(targets, this.skillData.skillId);
                //死亡相关判断
                // this.onDeadEnd(targets, this.skillData.skillId);
            }

            this.scene.deadOpt();
            this.anger = 0;
        }


        /**
         * 伤害帧结束后，被打击判断
         * @param targets 
         * @param skillId 
         */
        public onBeAtkEnd(targets: Array<number>, skillId: number) {
            let tagCamp = this.camp;
            for (let k = 0; k < targets.length; k++) {
                let tag = this.scene.getObjById(targets[k]);
                tagCamp = tag.camp;
                tag.doPasvSkill(iface.tb_prop.triggerTypeKey.selfBeAtk, this, skillId);
                tag.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.beAtk,null, skillId);

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
        public onDeadEnd(targets: Array<number>, skillId: number) {
            //先结算所有非复活类的被动和buff
            this.settlementOpt(false, targets, skillId);
            //再结算所有复活类的被动和buff
            this.settlementOpt(true, targets, skillId);
        }

        private settlementOpt(rebornTrigger: boolean, targets: Array<number>, skillId: number) {
            for (let q = 0; q < targets.length; q++) {
                let tag = this.scene.getObjById(targets[q]);
                if (!tag.isAlive()) {
                    tag.doPasvSkillEnd(rebornTrigger, skillId);
                    tag.doBuffTriggerEnd(rebornTrigger, skillId);
                }
            }
        }


        public recordAtftInit() {
            let operate = {
                type: iface.tb_prop.battleOpTypeKey.atftInit,
                camp: this.camp,
                templateId: this.templateId,
                anger: this.anger,
                skillId: this.skillData.skillId,
            };
            this.scene.recordOperate(0, operate);
        }

        public recordAngerChange(skillId?) {
            let operate = {
                type: iface.tb_prop.battleOpTypeKey.angerChange,
                camp: this.camp,
                anger: this.anger,
            };
            this.scene.recordOperate(skillId, operate);
        }

        public recordUseSkill(skillId, targetIds) {
            if (!targetIds) {
                return;
            }
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.atftUseSkill,
                skillId: skillId,
                camp: this.camp,
                targetIds: targetIds,
            };
            this.scene.recordOperate(0, operate);
        }
    }
}