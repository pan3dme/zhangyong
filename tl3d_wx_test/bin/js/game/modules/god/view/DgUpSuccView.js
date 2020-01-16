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
    var DgUpSuccView = /** @class */ (function (_super) {
        __extends(DgUpSuccView, _super);
        function DgUpSuccView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list_new.renderHandler = new Handler(_this, _this.onDegreeRender);
            _this.list_old.renderHandler = new Handler(_this, _this.onDegreeRender1);
            _this.list_newattr.renderHandler = new Handler(_this, _this.jichuRender);
            _this.list_oldattr.renderHandler = new Handler(_this, _this.jichuRender);
            return _this;
        }
        DgUpSuccView.prototype.popup = function () {
            // 先initView下，需要设置宽高
            this.initView();
            _super.prototype.popup.call(this);
            this.bgPanel.dataSource = { title: "comp/title/jinjiechenggong.png" };
        };
        DgUpSuccView.prototype.initView = function () {
            var uuid = this.dataSource;
            var godvo = App.hero.getGodVoById(uuid);
            this.setPinjieList(godvo);
        };
        /**设置品阶List */
        DgUpSuccView.prototype.setPinjieList = function (godvo) {
            var degreeNum = godvo.starLevel < 6 ? godvo.starLevel : 6;
            var nowAry = new Array;
            var oldAry = new Array;
            for (var i = 0; i < degreeNum; i++) {
                nowAry.push(godvo.degree);
                oldAry.push(godvo.degree - 1);
            }
            this.list_old.repeatX = degreeNum;
            this.list_old.dataSource = oldAry;
            this.list_new.repeatX = degreeNum;
            this.list_new.dataSource = nowAry;
            var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(godvo.degree - 1);
            var nextevotab = tb.TB_god_evolution.get_TB_god_evolutionById(godvo.degree);
            this.lab_old.text = LanMgr.getLan("", 12355) + "： " + evotab.level;
            this.lab_new.text = LanMgr.getLan("", 12355) + "： " + nextevotab.level;
            var nowAttr = godvo.jisuanchushi(godvo.degree - 1);
            var nextAttr = godvo.jisuanchushi(godvo.degree);
            this.list_oldattr.dataSource = nowAttr;
            this.list_newattr.dataSource = nextAttr;
            var skillId = godvo.getSkillIdByDegree(godvo.degree);
            var tbSkill = tb.TB_skill.get_TB_skillById(skillId);
            if (tbSkill) {
                this.skillBox.visible = true;
                this.lbName.text = tbSkill.name;
                // let cd = tbSkill.cd > 0 ? `（冷却时间：${tbSkill.cd}回合）` : '';
                this.lab_info.text = "" + tbSkill.info;
                this.height = this.bgPanel.height = 600;
                this._skillVo = { skill: tbSkill, openDgLv: tbSkill.level, dgLv: godvo.degree };
                this.skillIR.dataSource = this._skillVo;
            }
            else {
                this.skillBox.visible = false;
                this.skillIR.dataSource = null;
                this.height = this.bgPanel.height = 420;
            }
        };
        /**基础属性加成list */
        DgUpSuccView.prototype.jichuRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                var img_jichu = cell.getChildByName("box_img").getChildByName("img_jichu");
                var lab_value = cell.getChildByName("lab_value");
                img_jichu.skin = SkinUtil.getAttrSkin(data[0]);
                lab_value.text = "" + Math.floor(data[1]);
                cell.refresh();
            }
        };
        /**
         * 渲染阶级
         * @param itemRender
         * @param index
         */
        DgUpSuccView.prototype.onDegreeRender = function (itemRender, index) {
            itemRender.gray = itemRender.dataSource - 1 < index;
            if (itemRender.dataSource - 1 == index) {
                this.img_eff.x = this.list_new.x + index * 37 + 14;
                this.img_eff.y = this.list_new.y + 16;
                this.ani1.play();
            }
        };
        /**
         * 渲染阶级
         * @param itemRender
         * @param index
         */
        DgUpSuccView.prototype.onDegreeRender1 = function (itemRender, index) {
            itemRender.gray = itemRender.dataSource - 1 < index;
        };
        DgUpSuccView.prototype.close = function () {
            var _this = this;
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
            this.ani1.stop();
            // 技能开启特效播放
            if (this._skillVo && (UIMgr.hasStage(UIConst.God_MainView) || UIMgr.hasStage(UIConst.God_GodCultureView))) {
                var godView_1 = UIMgr.hasStage(UIConst.God_MainView) ? UIMgr.getUIByName(UIConst.God_MainView).godView : UIMgr.getUIByName(UIConst.God_GodCultureView).godView;
                if (!godView_1)
                    return;
                var viewInfo_1 = godView_1.viewInfo;
                if (!viewInfo_1)
                    return;
                var index_1 = viewInfo_1.skillList.cells.findIndex(function (cell) {
                    return cell && cell.dataSource && cell.dataSource.skill && cell.dataSource.skill.ID == _this._skillVo.skill.ID;
                });
                var targetSkillIR = viewInfo_1.skillList.getCell(index_1);
                if (!targetSkillIR)
                    return;
                var targetPos = targetSkillIR.localToGlobal(new Laya.Point(0, 0));
                var skillIR_1 = new game.GodSkillItemIR();
                skillIR_1.dataSource = this._skillVo;
                var curPos = this.skillIR.localToGlobal(new Laya.Point(0, 0));
                skillIR_1.x = curPos.x;
                skillIR_1.y = curPos.y;
                Laya.stage.addChild(skillIR_1);
                Laya.Tween.to(skillIR_1, { x: targetPos.x, y: targetPos.y, alpha: 0.3 }, 500, Laya.Ease.linearIn, new Handler(this, function () {
                    if (godView_1 && (UIMgr.hasStage(UIConst.God_MainView) || UIMgr.hasStage(UIConst.God_GodCultureView))) {
                        viewInfo_1.bombAnim.x = viewInfo_1.skillList.x + 50 + 100 * index_1 + viewInfo_1.skillList.spaceX * index_1;
                        viewInfo_1.bombAnim.y = viewInfo_1.skillList.y + 55;
                        viewInfo_1.bombAnim.visible = true;
                        viewInfo_1.bombAnim.play(0, false);
                        viewInfo_1.updateList();
                    }
                    Laya.stage.removeChild(skillIR_1);
                    Laya.Tween.clearTween(skillIR_1);
                }), 100);
            }
            this._skillVo = null;
        };
        DgUpSuccView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return DgUpSuccView;
    }(ui.god.UplevelsuccUI));
    game.DgUpSuccView = DgUpSuccView;
})(game || (game = {}));
