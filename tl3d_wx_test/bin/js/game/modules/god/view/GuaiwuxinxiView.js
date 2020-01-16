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
    var GuaiwuxinxiView = /** @class */ (function (_super) {
        __extends(GuaiwuxinxiView, _super);
        function GuaiwuxinxiView() {
            var _this = _super.call(this) || this;
            _this._sdsx = 0;
            _this._sdsy = 0;
            _this._arrskilldata = [];
            _this.isModelClose = true;
            _this.list_skill.selectHandler = new Handler(_this, _this.onSelectSkill);
            _this.list_skill.selectedIndex = -1;
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        GuaiwuxinxiView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, true);
            var data = this.dataSource;
            this.headBox.dataSource = data;
            this._arrskilldata = [];
            var skills = this.dataSource.getSkillList();
            for (var i in skills) {
                var skillT = tb.TB_skill.get_TB_skillById(skills[i][0]);
                if (skillT && skillT.type != 1) {
                    var openDgLv = skills[i][1];
                    this._arrskilldata.push({ skill: skillT, isShow: false, isShowlist: false, openDgLv: openDgLv, dgLv: this.dataSource.degree });
                }
            }
            this.list_skill.array = this._arrskilldata;
            this.list_skill.selectedIndex = 0;
            this.list_skill.selectEnable = true;
            this.list_skill.width = this._arrskilldata.length * 90 + (this._arrskilldata.length - 1) * this.list_skill.spaceX;
            this.lab_name.text = data.getName();
            var attrType = data.getAttrType ? data.getAttrType() : 0;
            this.lab_type.text = LanMgr.godTypeName[attrType];
            var arrGodProperty = data.getProperty();
            this.lab_hp.text = Math.floor(arrGodProperty[0][1]).toString();
            this.lab_ack.text = Math.floor(arrGodProperty[1][1]).toString();
            this.lab_def.text = Math.floor(arrGodProperty[2] ? arrGodProperty[2][1] : 0).toString();
            this.lab_spd.text = Math.floor(arrGodProperty[3] ? arrGodProperty[3][1] : 0).toString();
            this.onSelectSkill(this.list_skill.selectedIndex);
            this.bgPanel.dataSource = { uiName: UIConst.GuaiwuxinxiView, closeOnSide: this.isModelClose };
        };
        GuaiwuxinxiView.prototype.onSelectSkill = function (index) {
            if (index == -1)
                return;
            var tbSkill = this._arrskilldata[index].skill;
            this.lab_skill.text = tbSkill.name + "  Lv." + tbSkill.level;
            this.lab_open.text = LanMgr.getLan("", 12343, this._arrskilldata[index].openDgLv);
            // let cd = tbSkill.cd > 0 ? `（冷却时间：${tbSkill.cd}回合）` : '';
            this.lab_skilldescription.text = "" + tbSkill.info;
            this.lab_open.visible = this.dataSource.degree < this._arrskilldata[index].openDgLv;
            this.lab_skill_type.text = LanMgr.getLan("", 12342) + ":" + (tbSkill.type == 3 ? LanMgr.getLan("", 12340) : LanMgr.getLan("", 12341));
            this.lab_open.x = this.lab_skill.x + this.lab_skill.width;
            this.updateSelect();
        };
        GuaiwuxinxiView.prototype.updateSelect = function () {
            var index = this.list_skill.selectedIndex;
            for (var i = 0; i < this.list_skill.cells.length; i++) {
                var item = this.list_skill.cells[i];
                var isCur = i == index;
                item.selectBox.visible = isCur;
                if (isCur) {
                    item.selectBox.play();
                }
                else {
                    item.selectBox.gotoAndStop(0);
                }
            }
        };
        /**返回 */
        GuaiwuxinxiView.prototype.close = function () {
            _super.prototype.close.call(this, "", true);
            this.bgPanel.dataSource = null;
            this.list_skill.array = null;
            this.list_skill.selectedIndex = -1;
        };
        return GuaiwuxinxiView;
    }(ui.god.GuaiwuxinxiUI));
    game.GuaiwuxinxiView = GuaiwuxinxiView;
})(game || (game = {}));
