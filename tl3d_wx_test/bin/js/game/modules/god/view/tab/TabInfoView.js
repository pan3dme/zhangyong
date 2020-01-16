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
    var godTabInfoView = /** @class */ (function (_super) {
        __extends(godTabInfoView, _super);
        function godTabInfoView() {
            return _super.call(this) || this;
        }
        godTabInfoView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GodModel.getInstance();
            this.list_pinjie.renderHandler = new Handler(this, this.onDegreeRender);
            this.btn_shengjie.on(Laya.Event.CLICK, this, this.openShengjie);
            this.btn_upGrade.on(Laya.Event.CLICK, this, this.onMouseDown);
            this.btnLookAttr.on(Laya.Event.CLICK, this, this.onLookAttr);
            this.checkBox.on(Laya.Event.CHANGE, this, this.onCheckBox);
            this.skillBox.visible = false;
            this.skillBox.dataSource = null;
            this.skillList.array = null;
            this.skillList.mouseHandler = new Handler(this, this.onSkillClick);
            this.bombAnim.visible = false;
            this.bombAnim.stop();
        };
        godTabInfoView.prototype.close = function () {
            Laya.timer.clearAll(this);
            this.dataSource = null;
            this.dgupRedPoint.onDispose();
            this.lvupRedPoint.onDispose();
            this.list_pinjie.array = null;
            this.skillBox.visible = false;
            this.skillBox.dataSource = null;
            this.skillList.array = null;
            this.bombAnim.visible = false;
            this.bombAnim.stop();
            Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
        };
        Object.defineProperty(godTabInfoView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
            },
            enumerable: true,
            configurable: true
        });
        godTabInfoView.prototype.init = function () {
            this.initData();
            this.updateXinxi();
        };
        /** 初始化数据 */
        godTabInfoView.prototype.initData = function () {
            var godVo = this.dataSource;
            if (godVo) {
                var tbGod = godVo.tab_god;
                this.lbType.text = LanMgr.godTypeName[tbGod.type];
                this.skillBox.visible = false;
                this.skillBox.dataSource = null;
                this.bombAnim.visible = false;
                this.bombAnim.stop();
                Laya.stage.on(Laya.Event.CLICK, this, this.onClickStage);
                this.updateList();
            }
        };
        /** 更新信息 */
        godTabInfoView.prototype.updateXinxi = function () {
            var godVo = this.dataSource;
            if (godVo) {
                this.setCostText();
                this.setPinjieList();
                var starAndDegerr = godVo.degree >= tb.TB_god_set.get_TB_god_set().star_evolution ? godVo.starLevel : godVo.degree;
                var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(starAndDegerr);
                var maxLevel = evotab ? evotab.level : -1;
                // 是否能升阶
                var canUp = godVo.level == maxLevel && godVo.level < game.GodModel.getMaxLv(godVo.starLevel) ? true : false;
                this.lab_dengji.text = LanMgr.getLan("{0}/{1}", -1, godVo.level, maxLevel);
                this.lbMaxLv.visible = this.imgDi.visible = godVo.level >= godVo.maxTbLv;
                //判断是否满级 升级按钮还是升阶按钮
                this.btn_shengjie.label = LanMgr.getLan("", 12356);
                this.checkBox.visible = this.btn_upGrade.visible = godVo.level == maxLevel ? false : true;
                this.checkBox.selected = this._model.isOnekeyLvup;
                this.box_canup.visible = this.btn_upGrade.visible;
                this.btn_shengjie.visible = !this.btn_upGrade.visible && canUp;
                if (!this.btn_shengjie.visible && !this.btn_upGrade.visible && godVo.canStarUp()) {
                    this.btn_shengjie.label = LanMgr.getLan("", 12357);
                    this.btn_shengjie.visible = true;
                }
                this.lvupRedPoint.setRedPointName("god_lvup_" + godVo.uuid);
                this.dgupRedPoint.setRedPointName("god_dgup_" + godVo.uuid);
            }
        };
        /** 打开属性总览界面 */
        godTabInfoView.prototype.onLookAttr = function () {
            var godVo = this.dataSource;
            var basic = godVo.getProperty();
            var sumAttr = godVo.getAllAttr(iface.tb_prop.lineupTypeKey.attack);
            var godAttr = { basicAttr: basic, allAttr: sumAttr };
            UIMgr.showUI(UIConst.God_AttrView, godAttr);
        };
        /**设置品阶List */
        godTabInfoView.prototype.setPinjieList = function () {
            var godVo = this.dataSource;
            var degreeNum = godVo.starLevel < 6 ? godVo.starLevel : 6;
            var nowAry = new Array;
            for (var i = 0; i < degreeNum; i++) {
                nowAry.push(godVo.degree);
            }
            this.list_pinjie.repeatX = degreeNum;
            this.list_pinjie.dataSource = nowAry;
        };
        /** 显示拥有/消耗经验 */
        godTabInfoView.prototype.setCostText = function () {
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var allExp = App.hero.godExp;
            var godlevel = tb.TB_god_level.get_TB_god_levelnById(godVo.level);
            var needexp = godlevel.cost[0][1] - godVo.exp; //减掉已有的经验
            this.lab_allExp.text = Snums(allExp);
            this.lab_needExp.text = "/" + Snums(needexp);
            this.lab_allExp.color = allExp < needexp ? ColorConst.redFont : ColorConst.normalFont;
            this.lab_getGold.text = "/" + Snums(godlevel.cost[1][1]);
            this.lab_getGold.color = App.hero.gold < godlevel.cost[1][1] ? ColorConst.redFont : ColorConst.normalFont;
            this.lbAllGold.text = Snums(App.hero.gold);
            this.HBoxExp.refresh();
            this.hboxGold.refresh();
        };
        /** 英雄升级 */
        godTabInfoView.prototype.onMouseDown = function () {
            var godVo = this.dataSource;
            var Exppool = App.hero.godExp;
            var godlevel = tb.TB_god_level.get_TB_god_levelnById(godVo.level);
            var needexp = godlevel.cost[0][1] - godVo.exp;
            if (Exppool < needexp) { /**魂石不足 */
                showToast(LanMgr.getLan("", Lans.cost, 6));
            }
            else if (App.hero.gold < godlevel.cost[1][1]) { /**金币不足 */
                showToast(LanMgr.getLan("", Lans.glod));
            }
            else if (this.btn_shengjie.visible) {
                return; /**满级需要升阶 */
            }
            else { /**条件满足发送请求 */
                dispatchEvt(new game.GodEvent(game.GodEvent.USE_EXPPOOL), [godVo, this.checkBox.selected]);
            }
        };
        /**
         * 打开升阶面板
         */
        godTabInfoView.prototype.openShengjie = function () {
            if (this.btn_shengjie.label == LanMgr.getLan("", 12357))
                this.godView.list_tab.selectedIndex = 1;
            else {
                if (!App.IsSysOpen(ModuleConst.SHENGJIE)) {
                    var tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHENGJIE);
                    showToast(tbSys.prompt);
                }
                else {
                    UIMgr.showUI(UIConst.God_DgUpView, this.dataSource);
                }
            }
        };
        Object.defineProperty(godTabInfoView.prototype, "godView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.God_MainView);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 渲染阶级
         * @param itemRender
         * @param index
         */
        godTabInfoView.prototype.onDegreeRender = function (itemRender, index) {
            itemRender.gray = itemRender.dataSource - 1 < index;
        };
        /**
         * 渲染星星
         */
        godTabInfoView.prototype.onXingjiRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
                cell.width = 29;
                cell.height = 31;
            }
            else {
                cell.skin = SkinUtil.xingxing;
            }
        };
        godTabInfoView.prototype.onCheckBox = function () {
            this._model.isOnekeyLvup = this.checkBox.selected;
        };
        /** 更新技能 */
        godTabInfoView.prototype.updateList = function () {
            var godVo = this.dataSource;
            if (godVo) {
                var ary = godVo.getSkillList();
                var list = [];
                for (var i in ary) {
                    var skillT = tb.TB_skill.get_TB_skillById(ary[i][0]);
                    if (skillT && skillT.type != 1) {
                        var openDgLv = ary[i][1];
                        list.push({ skill: skillT, godId: godVo.tab_god.ID, openDgLv: openDgLv, dgLv: godVo.degree, index: i });
                    }
                }
                this.skillList.array = list;
                this.skillList.width = 95 * list.length + (list.length - 1) * this.skillList.spaceX;
            }
        };
        /** 点击技能 */
        godTabInfoView.prototype.onSkillClick = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var iRender = this.skillList.getCell(index);
                if (iRender && iRender.dataSource) {
                    this.skillBox.dataSource = iRender.dataSource;
                    var skillX = this.skillList.x + 48 + index * 96 + this.skillList.spaceX * index;
                    this.skillBox.x = (skillX + this.skillBox.width >= this.width) ? (this.width - this.skillBox.width) : skillX;
                    this.skillBox.y = this.skillList.y - this.skillBox.height;
                    this.skillBox.visible = true;
                }
                else {
                    this.skillBox.dataSource = null;
                    this.skillBox.visible = false;
                }
            }
            else if (event.type == Laya.Event.MOUSE_UP || event.type == Laya.Event.MOUSE_OUT) {
                // this.skillBox.dataSource = null;
                // this.skillBox.visible = false;
            }
        };
        godTabInfoView.prototype.onClickStage = function (e) {
            if (e.target instanceof game.GodSkillItemIR)
                return;
            this.skillBox.dataSource = null;
            this.skillBox.visible = false;
        };
        return godTabInfoView;
    }(ui.god.tab.TabInfoUI));
    game.godTabInfoView = godTabInfoView;
})(game || (game = {}));
