var battle;
(function (battle) {
    var BattleArtifact = /** @class */ (function () {
        function BattleArtifact(camp, arr) {
            this.scene = null;
            var id = arr[0];
            var skillLv = arr[1];
            var skillUpId = getArtifactSkillId(id, skillLv);
            var tb_artifact_skill = tb.TB_artifact_skill.get_TB_artifact_skillById(skillUpId);
            if (!tb_artifact_skill) {
                logfight("tb_artifact_skill %d is null", skillUpId);
                return;
            }
            this.templateId = id;
            this.camp = camp;
            this.skillLv = skillLv;
            this.skillData = new battle.AtftSkillData(tb_artifact_skill.skill);
            this.anger = 0;
            // logfight("BattleArtifact %j", this);
        }
        BattleArtifact.prototype.onCreate = function (scene) {
            this.scene = scene;
        };
        BattleArtifact.prototype.isArtifact = function () {
            return true;
        };
        BattleArtifact.prototype.getObjId = function () {
            return 100 + this.camp;
        };
        BattleArtifact.prototype.onWaveStart = function () {
            this.recordAtftInit();
        };
        BattleArtifact.prototype.isAngerFull = function () {
            return this.anger >= tb.TB_artifact_set.get_TB_artifact_setById().anger[0];
        };
        BattleArtifact.prototype.addAngerOnAtk = function (skillId) {
            this.anger += tb.TB_artifact_set.get_TB_artifact_setById().anger[1];
            this.recordAngerChange(skillId);
        };
        BattleArtifact.prototype.addAngerOnBeAtk = function (skillId) {
            this.anger += tb.TB_artifact_set.get_TB_artifact_setById().anger[2];
            this.recordAngerChange(skillId);
        };
        BattleArtifact.prototype.getOwnObjs = function () {
            return this.scene.getCampObjs(this.camp);
        };
        BattleArtifact.prototype.getEnemyObjs = function () {
            var enemyCamp = getOppoCamp(this.camp);
            return this.scene.getCampObjs(enemyCamp);
        };
        BattleArtifact.prototype.startRound = function () {
            this.useSkill();
            this.recordAngerChange();
        };
        BattleArtifact.prototype.useSkill = function () {
            this.skillData.useSkill(this);
            var targets = this.skillData.getMainTargetIds();
            if (targets.length > 0) {
                //对友方施法不处理
                if (this.camp == this.scene.getCampByObjid(targets[0]))
                    return;
                //被攻击时判断
                this.onBeAtkEnd(targets, this.skillData.skillId);
                //死亡相关判断
                // this.onDeadEnd(targets, this.skillData.skillId);
            }
            this.scene.deadOpt();
            this.anger = 0;
        };
        /**
         * 伤害帧结束后，被打击判断
         * @param targets
         * @param skillId
         */
        BattleArtifact.prototype.onBeAtkEnd = function (targets, skillId) {
            var tagCamp = this.camp;
            for (var k = 0; k < targets.length; k++) {
                var tag = this.scene.getObjById(targets[k]);
                tagCamp = tag.camp;
                tag.doPasvSkill(iface.tb_prop.triggerTypeKey.selfBeAtk, this, skillId);
                tag.doBuffTrigger(iface.tb_prop.buffTrigTypeKey.beAtk, null, skillId);
                if (k == targets.length - 1) {
                    //最后再执行队友被打击被动触发  目标传入最后一个被打的目标
                    this.scene.doCampPasvSkill(tagCamp, iface.tb_prop.triggerTypeKey.ownBeAtk, tag, skillId);
                }
            }
        };
        /**
         * 伤害帧结束后，死亡判断
         * @param targets
         * @param skillId
         */
        BattleArtifact.prototype.onDeadEnd = function (targets, skillId) {
            //先结算所有非复活类的被动和buff
            this.settlementOpt(false, targets, skillId);
            //再结算所有复活类的被动和buff
            this.settlementOpt(true, targets, skillId);
        };
        BattleArtifact.prototype.settlementOpt = function (rebornTrigger, targets, skillId) {
            for (var q = 0; q < targets.length; q++) {
                var tag = this.scene.getObjById(targets[q]);
                if (!tag.isAlive()) {
                    tag.doPasvSkillEnd(rebornTrigger, skillId);
                    tag.doBuffTriggerEnd(rebornTrigger, skillId);
                }
            }
        };
        BattleArtifact.prototype.recordAtftInit = function () {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.atftInit,
                camp: this.camp,
                templateId: this.templateId,
                anger: this.anger,
                skillId: this.skillData.skillId,
            };
            this.scene.recordOperate(0, operate);
        };
        BattleArtifact.prototype.recordAngerChange = function (skillId) {
            var operate = {
                type: iface.tb_prop.battleOpTypeKey.angerChange,
                camp: this.camp,
                anger: this.anger,
            };
            this.scene.recordOperate(skillId, operate);
        };
        BattleArtifact.prototype.recordUseSkill = function (skillId, targetIds) {
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
        };
        return BattleArtifact;
    }());
    battle.BattleArtifact = BattleArtifact;
})(battle || (battle = {}));
