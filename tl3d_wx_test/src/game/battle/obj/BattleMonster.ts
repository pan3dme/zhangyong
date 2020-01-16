module battle {
    export class BattleMonster extends BattleObj {

        private _isImmuneCtrl: boolean;
        private _isImmunePoison: boolean;

        constructor(camp, idx, arr) {
            var monsterId = arr[0];
            let tb_monster = tb.TB_monster.get_TB_monsterById(monsterId);
            if (!tb_monster) {
                logfight("tb_monster %d is null", monsterId);
                return;
            }
            // var tbAttr = arr[3];
            // var attrs = {};
            // for (var i = 0; i < tbAttr.length; i++) {
            //     var attr = tbAttr[i];
            //     attrs = addPropertyMapValue(attrs, attr[0], attr[1]);
            // }
            super(camp, idx, arr[3], tb_monster.attr_type, tb_monster.skill);
            this.degree = 999;
            this.awakenLv = 999;
            this.starLev = 999;
            this.skinId = 0;
            this.uuid = arr[7];
            this.type = iface.tb_prop.battleObjTypeKey.monster;
            this.templateId = monsterId;
            this.race = tb_monster.race_type;
            this.level = tb_monster.level;
            this._isImmuneCtrl = tb_monster.is_immune;
            this._isImmunePoison = tb_monster.is_immune_poison;
            // logfight("BattleMonster %j", this);
        }

        isImmuneCtrl() {
            return this._isImmuneCtrl;
        }

        isImmunePoison() {
            return this._isImmunePoison;
        }
    }
}