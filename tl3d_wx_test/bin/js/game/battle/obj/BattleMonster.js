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
    var BattleMonster = /** @class */ (function (_super) {
        __extends(BattleMonster, _super);
        function BattleMonster(camp, idx, arr) {
            var _this = this;
            var monsterId = arr[0];
            var tb_monster = tb.TB_monster.get_TB_monsterById(monsterId);
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
            _this = _super.call(this, camp, idx, arr[3], tb_monster.attr_type, tb_monster.skill) || this;
            _this.degree = 999;
            _this.awakenLv = 999;
            _this.starLev = 999;
            _this.skinId = 0;
            _this.uuid = arr[7];
            _this.type = iface.tb_prop.battleObjTypeKey.monster;
            _this.templateId = monsterId;
            _this.race = tb_monster.race_type;
            _this.level = tb_monster.level;
            _this._isImmuneCtrl = tb_monster.is_immune;
            _this._isImmunePoison = tb_monster.is_immune_poison;
            return _this;
            // logfight("BattleMonster %j", this);
        }
        BattleMonster.prototype.isImmuneCtrl = function () {
            return this._isImmuneCtrl;
        };
        BattleMonster.prototype.isImmunePoison = function () {
            return this._isImmunePoison;
        };
        return BattleMonster;
    }(battle.BattleObj));
    battle.BattleMonster = BattleMonster;
})(battle || (battle = {}));
