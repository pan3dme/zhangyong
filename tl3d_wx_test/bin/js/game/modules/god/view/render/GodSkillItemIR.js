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
/**
* name
*/
var game;
(function (game) {
    var GodSkillItemIR = /** @class */ (function (_super) {
        __extends(GodSkillItemIR, _super);
        function GodSkillItemIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodSkillItemIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        GodSkillItemIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info && info.skill) {
                var skill = info.skill;
                this.icon.skin = skill.getIconUrl();
                var isOpen = info.dgLv >= info.openDgLv;
                this.icon.gray = this.imgSuo.visible = !isOpen;
                this.lab_lv.visible = isOpen;
                this.lab_lv.text = "Lv." + skill.level;
            }
            else {
                this.icon.skin = null;
                this.icon.gray = false;
                this.imgSuo.visible = false;
                this.lab_lv.visible = false;
            }
        };
        return GodSkillItemIR;
    }(ui.god.render.SkillItemIRUI));
    game.GodSkillItemIR = GodSkillItemIR;
})(game || (game = {}));
