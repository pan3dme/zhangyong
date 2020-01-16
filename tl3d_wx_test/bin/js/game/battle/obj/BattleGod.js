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
var battle;
(function (battle) {
    var BattleGod = /** @class */ (function (_super) {
        __extends(BattleGod, _super);
        function BattleGod(camp, idx, arr) {
            var _this = this;
            var templateId = arr[0];
            var tb_god = tb.TB_god.get_TB_godById(templateId);
            if (!tb_god) {
                logfight("tb_god %d is null", templateId);
                return;
            }
            //技能筛选
            var _degree = arr[4];
            var _startLev = arr[1];
            var skilllist = getSkillList(tb_god.skill, _degree, _startLev);
            var skillIds = [];
            for (var i = 0; i < skilllist.length; i++) {
                var skillInfo = skilllist[i];
                if (_degree >= skillInfo[1]) {
                    //等级技能
                    skillIds.push(skillInfo[0]);
                }
            }
            _this = _super.call(this, camp, idx, arr[3], tb_god.type, skillIds) || this;
            _this.degree = _degree;
            _this.starLev = _startLev;
            _this.awakenLv = arr[5];
            _this.skinId = arr[6] || 0;
            _this.uuid = arr[7];
            _this.type = iface.tb_prop.battleObjTypeKey.god;
            _this.templateId = templateId;
            _this.race = tb_god.race_type;
            _this.level = arr[2];
            return _this;
            // logfight("BattleGod %j", this);
        }
        BattleGod.prototype.isSkillEft = function (skillId) {
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
        };
        BattleGod.prototype.doCaptainSkill = function () {
            if (this.captainEffected || !this.captainSkill) {
                return;
            }
            this.captainSkill.doPasvSkill(iface.tb_prop.triggerTypeKey.leader, this, null);
            this.captainEffected = true;
        };
        return BattleGod;
    }(battle.BattleObj));
    battle.BattleGod = BattleGod;
})(battle || (battle = {}));
