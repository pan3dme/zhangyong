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
var common;
(function (common) {
    var SkillBox = /** @class */ (function (_super) {
        __extends(SkillBox, _super);
        function SkillBox() {
            var _this = _super.call(this) || this;
            _this._array = new Array;
            return _this;
        }
        Object.defineProperty(SkillBox.prototype, "dataSource", {
            set: function ($data) {
                if ($data) {
                    this._dataSource = $data.skill;
                    this._array = this.getSkillInfo($data.skill);
                    this.img_icon.skin = $data.skill.getIconUrl();
                    this.lab_dengji.text = "Lv " + $data.skill.getLevel().toString();
                    this.gray = $data.dgLv < $data.openDgLv;
                    if ($data.isShow) {
                        this.on(Laya.Event.CLICK, this, this.onOut, [true, $data.isShowlist]);
                        // this.on(Laya.Event.MOUSE_MOVE, this, this.onOut, [true,$data.miaoshutype]);
                        // this.on(Laya.Event.MOUSE_OUT, this, this.onOut, [false,$data.miaoshutype]);
                        // this.on(Laya.Event.MOUSE_UP, this, this.onOut, [false,$data.miaoshutype]);
                    }
                }
                else {
                    this.off(Laya.Event.CLICK, this, this.onOut);
                    // this.off(Laya.Event.MOUSE_MOVE, this, this.onOut);
                    // this.off(Laya.Event.MOUSE_OUT, this, this.onOut);
                    // this.off(Laya.Event.MOUSE_UP, this, this.onOut);
                    this.img_icon.skin = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        SkillBox.prototype.onOut = function (visibel, type) {
            // if (this.seleted.visible === visibel) return;
            // this.seleted.visible = visibel;
            var pos = this.localToGlobal(new Laya.Point(0, 0));
            if (this._array.length === 0) {
                UIUtil.isShowInfoBox(null, false, pos.x + this.width / 2, pos.y);
                return;
            }
            ;
            var data = { skilldata: this._array.concat([]), isShowlist: type };
            UIUtil.isShowInfoBox(data, visibel, pos.x + this.width / 2, pos.y);
        };
        /**获得技能的全部等级信息
         * @param $skill 玩家英雄的某个技能
         * @return 相同且经过等级排序的全部技能
         */
        SkillBox.prototype.getSkillInfo = function ($skill) {
            var _arrskills = [];
            var temp = $skill;
            while (temp) {
                _arrskills.push(temp);
                temp = tb.TB_skill.get_TB_skillById(temp.ID + 1);
            }
            temp = tb.TB_skill.get_TB_skillById($skill.ID - 1);
            while (temp) {
                _arrskills.push(temp);
                temp = tb.TB_skill.get_TB_skillById(temp.ID - 1);
            }
            _arrskills.sort(function (itema, itemb) {
                return itema.level - itemb.level;
            });
            return _arrskills;
        };
        return SkillBox;
    }(ui.box.SkillBoxUI));
    common.SkillBox = SkillBox;
})(common || (common = {}));
