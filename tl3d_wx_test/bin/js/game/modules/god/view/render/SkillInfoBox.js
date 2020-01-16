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
    var SkillInfoBox = /** @class */ (function (_super) {
        __extends(SkillInfoBox, _super);
        function SkillInfoBox() {
            var _this = _super.call(this) || this;
            _this._buffList = [];
            _this.lbName.autoSize = true;
            return _this;
        }
        Object.defineProperty(SkillInfoBox.prototype, "dataSource", {
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
        SkillInfoBox.prototype.refreshData = function () {
            var info = this._dataSource;
            if (info) {
                var maxStarLv = 10;
                var tbGod = tb.TB_god.get_TB_godById(info.godId);
                if (tbGod) {
                    maxStarLv = tbGod.star[1];
                }
                this.ui_icon.dataSource = { skill: info.skill, openDgLv: info.openDgLv, dgLv: 10 };
                var skill = info.skill;
                this.lbName.text = skill.name + "  Lv." + skill.level;
                this.lab_type.text = LanMgr.getLan("", 12342) + ":" + (skill.type == 3 ? LanMgr.getLan("", 12340) : LanMgr.getLan("", 12341));
                this.clearBuffList();
                if (skill.effect_desc && skill.effect_desc.length > 0) {
                    var img = new Laya.Image(SkinUtil.fengexian);
                    img.width = 344;
                    img.x = 28;
                    this.addChildAt(img, 1);
                    this._buffList.push(img);
                    for (var i = 0, len = skill.effect_desc.length; i < len; i++) {
                        var buffDesc = tb.TB_skill_desc.getTbSkillDesc(skill.effect_desc[i]);
                        if (buffDesc) {
                            var lbName = new Laya.Label();
                            lbName.fontSize = 22;
                            lbName.color = ColorConst.LIGHT;
                            lbName.x = 28;
                            lbName.text = "\u3010" + buffDesc.name + "\u3011";
                            this.addChild(lbName);
                            this._buffList.push(lbName);
                            var lbDesc = new Laya.Label();
                            lbDesc.autoSize = true;
                            lbDesc.width = 344;
                            lbDesc.wordWrap = true;
                            lbDesc.leading = 5;
                            lbDesc.fontSize = 20;
                            lbDesc.color = "#b59c7e";
                            lbDesc.x = 28;
                            lbDesc.text = buffDesc.desc;
                            this.addChild(lbDesc);
                            this._buffList.push(lbDesc);
                        }
                    }
                }
                // let cd = skill.cd > 0 ? `（冷却时间：${skill.cd}回合）` : '';
                this.lab_info.text = "" + skill.info;
                if (info.openDgLv > 0 && info.dgLv < info.openDgLv) {
                    //未解锁
                    this.lab_condition.text = LanMgr.getLan("", 12368, info.openDgLv);
                }
                else {
                    var nextLv = game.GodUtils.getSkillUpLvCondition(info.index, skill.level, maxStarLv);
                    if (nextLv == 0) {
                        this.lab_condition.text = LanMgr.getLan("", 12369);
                    }
                    else {
                        this.lab_condition.text = LanMgr.getLan("", 12370, nextLv);
                    }
                }
                this.layoutView();
            }
            else {
                this.clearBuffList();
                this.lab_info.text = this.lbName.text = "";
                this.ui_icon.dataSource = null;
            }
        };
        SkillInfoBox.prototype.layoutView = function () {
            var posy = this.lab_info.y + this.lab_info.height + 5;
            if (this._buffList.length > 0) {
                for (var i = 0, len = this._buffList.length; i < len; i++) {
                    var comp = this._buffList[i];
                    comp.y = posy;
                    // 分割线之后要加10
                    posy += comp.height + (i == 0 ? 10 : 5);
                }
            }
            this.img_split.y = posy;
            posy += 15;
            this.lab_condition.y = posy;
            this.height = posy + this.lab_condition.height + 20;
        };
        SkillInfoBox.prototype.clearBuffList = function () {
            for (var _i = 0, _a = this._buffList; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp.removeSelf();
            }
            this._buffList.length = 0;
        };
        return SkillInfoBox;
    }(ui.god.render.SkillInfoBoxUI));
    game.SkillInfoBox = SkillInfoBox;
})(game || (game = {}));
