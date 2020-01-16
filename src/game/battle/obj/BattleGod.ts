module battle {
    export class BattleGod extends BattleObj {

        private captainSkill: SkillData;
        private captainEffected: boolean;

        constructor(camp, idx, arr) {
            var templateId = arr[0];
            let tb_god = tb.TB_god.get_TB_godById(templateId);
            if (!tb_god) {
                logfight("tb_god %d is null", templateId);
                return;
            }

            //技能筛选
            let _degree = arr[4];
            let _startLev = arr[1];

            let skilllist = getSkillList(tb_god.skill,_degree,_startLev);
            let skillIds = [];
            for (let i = 0; i < skilllist.length; i++) {
                let skillInfo = skilllist[i];
                if (_degree >= skillInfo[1]) {
                    //等级技能
                    skillIds.push(skillInfo[0]);
                }
            }


            super(camp, idx, arr[3], tb_god.type, skillIds);
            this.degree = _degree;
            this.starLev = _startLev;
            this.awakenLv = arr[5];
            this.skinId = arr[6] || 0;
            this.uuid = arr[7];

            this.type = iface.tb_prop.battleObjTypeKey.god;
            this.templateId = templateId;
            this.race = tb_god.race_type;
            this.level = arr[2];
            // logfight("BattleGod %j", this);
        }


        isSkillEft(skillId) {
            // let tb_skill = tb.TB_skill.get_TB_skillById(skillId);
            // if (!tb_skill) {
            //     return false;
            // }
            // var skillEftType = tb_skill.effective_type;
            // var battleType = this.scene.type;
            // switch (skillEftType) {
            //     case iface.tb_prop.skillEftTypeKey.all:
            //         return true;
            //     case iface.tb_prop.skillEftTypeKey.arena:
            //         return [CopyType.jingji_npc, CopyType.jingji_pve, CopyType.jingji_record, CopyType.arenaMatch].indexOf(battleType) != -1;
            //     case iface.tb_prop.skillEftTypeKey.ground:
            //         return battleType === iface.tb_prop.copyTypeKey.underground;
            //     case iface.tb_prop.skillEftTypeKey.tower:
            //         return battleType === iface.tb_prop.copyTypeKey.tower;
            //     default:
            //         break;
            // }
            return true;
        }

        public doCaptainSkill() {
            if (this.captainEffected || !this.captainSkill) {
                return;
            }
            this.captainSkill.doPasvSkill(iface.tb_prop.triggerTypeKey.leader, this, null);
            this.captainEffected = true;
        }
    }
}