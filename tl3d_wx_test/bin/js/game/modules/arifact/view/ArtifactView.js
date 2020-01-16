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
    var ArtifactView = /** @class */ (function (_super) {
        __extends(ArtifactView, _super);
        function ArtifactView() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this._curArtifactID = 0;
            //显示已激活--------------------------------------
            _this._curTabIdx = -1;
            _this.initHtmlText();
            _this.uiScene = new Base2dSceneLayer();
            _this.addChildAt(_this.uiScene, 1);
            _this.group = UIConst.hud_group;
            _this.tab.array = [[LanMgr.getLan("", 10304)], [LanMgr.getLan("", 12513)], [LanMgr.getLan("", 12514)], [LanMgr.getLan("", 12346)]];
            _this._showFun = [];
            _this._closeFun = [];
            _this._showFun[ArtifactView.TAB_SHENGJI] = _this.showStrength;
            _this._closeFun[ArtifactView.TAB_SHENGJI] = _this.closeStrength;
            _this._showFun[ArtifactView.TAB_JINENG] = _this.showSkill;
            _this._closeFun[ArtifactView.TAB_JINENG] = _this.closeSkill;
            _this._showFun[ArtifactView.TAB_XILIAN] = _this.showBaptize;
            _this._closeFun[ArtifactView.TAB_XILIAN] = _this.closeBaptize;
            _this._showFun[ArtifactView.TAB_SHENGXING] = _this.showStar;
            _this._closeFun[ArtifactView.TAB_SHENGXING] = _this.closeStar;
            _this._model = game.ArtifactModel.getInstance();
            _this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.ARTIFACT);
            return _this;
        }
        ArtifactView.prototype.initHtmlText = function () {
            this._htmlText.style.fontSize = this.lab_skilldesc.fontSize;
            this._htmlText.style.leading = this.lab_skilldesc.leading;
            this._htmlText.style.height = this.lab_skilldesc.height;
            this._htmlText.style.width = this.lab_skilldesc.width;
            this._htmlText.style.color = this.lab_skilldesc.color;
            this._htmlText.style.font = this.lab_skilldesc.font;
            this._htmlText.x = this.lab_skilldesc.x;
            this._htmlText.y = this.lab_skilldesc.y;
            this._htmlText.style.wordWrap = true;
            this.jineng.addChild(this._htmlText);
        };
        ArtifactView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.boxTop.y = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
        };
        ArtifactView.prototype.show = function () {
            this.uiScene.onShow();
            _super.prototype.show.call(this, false, false);
            this._artifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
            if (this.dataSource) {
                if (this.dataSource.id) {
                    this._curArtifactID = this.dataSource.id;
                }
                else {
                    this._curArtifactID = App.hero.getArtifactIDByLineType();
                }
                if (this.dataSource.index) {
                    this._curTabIdx = this.dataSource.index;
                    //检测解锁条件
                    var num = this._model.getUnlockArtifactNum();
                    var conditions = this._artifactSet.artifact_unlock;
                    if (this._curTabIdx < conditions.length && num < conditions[this._curTabIdx]) {
                        this._curTabIdx = 0;
                    }
                }
            }
            this.showShenQiList();
            this.updateArtifactNum();
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_ACTIVE, this.onArtifactActive, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS, this.onArtifactWearChange, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_STRENGTH_LV_CHANGE, this.onArtifactStrengthChange, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_SKILL_LV_CHANGE, this.onArtifactSkillChange, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE, this.onArtifactBaptizeChange, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_STAR_CHANGE, this.onArtifactStarChange, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.onResoureChange, this);
            this.btn_lookup.on(Laya.Event.CLICK, this, this.lookup);
            this.btnObatin.on(Laya.Event.CLICK, this, this.showObtain);
            this.btn_artifact.on(Laya.Event.CLICK, this, this.artifact);
            var topy = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
            UIUtil.boxUpDownTween(this.boxTop, -this.boxTop.height, topy, false, 310, 0.1);
            var boxY = this.height - this.boxBottom.height - 82;
            UIUtil.boxUpDownTween(this.boxBottom, boxY + this.boxBottom.height, boxY, true, 310, 0.05);
        };
        //神器激活
        ArtifactView.prototype.onArtifactActive = function () {
            this.updateArtifactNum();
            this.updateShenQiList();
            if (this.viewStack.visible) {
                this.updateTab();
                switch (this._curTabIdx) {
                    case ArtifactView.TAB_SHENGJI:
                        this.updateStrengthCost();
                        break;
                    case ArtifactView.TAB_JINENG:
                        this.updateSkillCost();
                        break;
                }
            }
        };
        //神器穿戴
        ArtifactView.prototype.onArtifactWearChange = function () {
            this.list_shenqi.refresh();
            if (this.btn_artifact.visible) {
                this.updateXiexiaBtn();
            }
        };
        //强化等级变化
        ArtifactView.prototype.onArtifactStrengthChange = function () {
            if (this.viewStack.visible) {
                this.updateStrengthCommon();
                switch (this._curTabIdx) {
                    case ArtifactView.TAB_SHENGJI:
                        this.updateStrength();
                        break;
                    case ArtifactView.TAB_JINENG:
                        this.updateSkill();
                        break;
                }
            }
        };
        //技能等级变化
        ArtifactView.prototype.onArtifactSkillChange = function () {
            if (this.viewStack.visible) {
                this.updateSkillCommon();
                switch (this._curTabIdx) {
                    case ArtifactView.TAB_JINENG:
                        this.updateSkill();
                        break;
                }
            }
        };
        //洗练变化
        ArtifactView.prototype.onArtifactBaptizeChange = function () {
        };
        //星级变化
        ArtifactView.prototype.onArtifactStarChange = function () {
            if (this.viewStack.visible) {
                if (App.hero.artifactStarLv > this._starLv) {
                    this.addStartAction(App.hero.artifactStarLv);
                }
                this.updateStarCommon();
            }
        };
        //资源变化
        ArtifactView.prototype.onResoureChange = function () {
            if (this.viewStack.visible) {
                switch (this._curTabIdx) {
                    case ArtifactView.TAB_SHENGJI:
                        this.updateStrengthCost();
                        break;
                    case ArtifactView.TAB_JINENG:
                        this.updateSkillCost();
                        break;
                }
            }
            else {
                this.updateNoActiveCost();
            }
        };
        //神器解锁数量
        ArtifactView.prototype.updateArtifactNum = function () {
            this.lab_unlock.text = LanMgr.getLan("", 12515, this._model.getUnlockArtifactNum());
        };
        ArtifactView.prototype.showShenQiList = function () {
            this.list_shenqi.renderHandler = Handler.create(this, this.shenqilistRender, null, false);
            this.list_shenqi.selectHandler = Handler.create(this, this.shenqilistselect, null, false);
            this._artifactTempArr = tb.TB_artifact.get_TB_artifact();
            this.updateShenQiList();
        };
        ArtifactView.prototype.selectShenQiById = function (shenqiid) {
            var idx = -1;
            for (var i = 0; i < this._artifactTempArr.length; i++) {
                if (this._artifactTempArr[i].ID == shenqiid) {
                    idx = i;
                    break;
                }
            }
            if (idx != -1) {
                this.shenqilistselect(idx);
            }
        };
        ArtifactView.prototype.updateShenQiList = function () {
            if (this._artifactTempArr && this._artifactTempArr.length > 0) {
                this._artifactTempArr.sort(function (a, b) {
                    var sorta = a.ID * 100;
                    var sortb = b.ID * 100;
                    if (App.hero.isActiveArtifact(a.ID)) {
                        sorta = a.ID * 10;
                    }
                    if (App.hero.isWearArtifact(b.ID)) {
                        sortb = b.ID;
                    }
                    else if (App.hero.isActiveArtifact(b.ID)) {
                        sortb = b.ID * 10;
                    }
                    return sorta - sortb;
                });
                if (this._curArtifactID == 0) {
                    this._curArtifactID = this._artifactTempArr[0].ID;
                    this.showShenQi(this._artifactTempArr[0]);
                }
                else {
                    this.showShenQi(this._curArtifactT);
                }
                this.list_shenqi.dataSource = this._artifactTempArr;
            }
            else {
                this.list_shenqi.dataSource = null;
                this._curArtifactID = 0;
            }
        };
        ArtifactView.prototype.shenqilistRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.img_icon.skin = SkinUtil.getEquipIcon(data.icon);
                cell.img_quality.skin = SkinUtil.getBoxQulityIcon(5);
                cell.img_shangzhen.visible = App.hero.isWearArtifact(data.ID);
                cell.redPoint.setRedPointName("artifact_activate_" + data.ID);
                cell.img_icon.gray = !App.hero.isActiveArtifact(data.ID);
                if (data.ID == this._curArtifactID && index != this.list_shenqi.selectedIndex) {
                    this.list_shenqi.selectedIndex = index;
                }
                cell.anim_select.play();
            }
            else {
                cell.redPoint.onDispose();
                cell.anim_select.gotoAndStop(0);
            }
        };
        ArtifactView.prototype.shenqilistselect = function (index) {
            var temp = this.list_shenqi.dataSource[index];
            if (!temp || temp.ID == this._curArtifactID)
                return;
            this._curArtifactID = temp.ID;
            this.showShenQi(temp);
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.SWITCH_ARTIFACT));
        };
        ArtifactView.prototype.clearShenQiList = function () {
            if (this.list_shenqi.renderHandler) {
                this.list_shenqi.renderHandler.recover();
                this.list_shenqi.renderHandler = null;
            }
            if (this.list_shenqi.selectHandler) {
                this.list_shenqi.selectHandler.recover();
                this.list_shenqi.selectHandler = null;
            }
            this.list_shenqi.dataSource = null;
            this._artifactTempArr = null;
            this._curArtifactID = 0;
        };
        ArtifactView.prototype.showShenQi = function (temp) {
            if (!temp) {
                temp = tb.TB_artifact.get_TB_artifactById(this._curArtifactID);
            }
            if (!temp)
                return;
            this._curArtifactT = temp;
            this.refreshModel(temp);
            var isActive = App.hero.isActiveArtifact(temp.ID);
            if (isActive) {
                this.clearArtifactNoActive();
                this.showArtifactActive();
            }
            else {
                this.clearArtifactActive();
                this.showArtifactNoActive();
            }
        };
        ArtifactView.prototype.refreshModel = function (tbArtifact) {
            if (this._lastmodel == tbArtifact.model)
                return;
            var locations = tbArtifact.location;
            this.uiScene.addModelChar(tbArtifact.model + "", 360 + Number(locations[0]), Number(locations[1]) + 80, Number(locations[2]), Number(locations[3]), Number(locations[4]));
            this._lastmodel = tbArtifact.model;
        };
        ArtifactView.prototype.showArtifactActive = function () {
            if (!this._curArtifactT)
                return;
            this.box_star.visible = true;
            this.viewStack.visible = true;
            this.btn_artifact.visible = true;
            this.lab_share.visible = true;
            this.tab.selectHandler = Handler.create(this, this.onTab, null, false);
            this.btn_strength.on(Laya.Event.CLICK, this, this.artifactOperation, [Artifact.STRENGTH]);
            this.btn_skillUp.on(Laya.Event.CLICK, this, this.artifactOperation, [Artifact.SKILLUPGRADE]);
            this.lab_unlock_unlock.on(Laya.Event.CLICK, this, this.onClickUnlock);
            var tabRedName = ["artifact_shengjiGroup_" + this._curArtifactT.ID, "artifact_jinengGroup_" + this._curArtifactT.ID, "artifact_baptizeGroup_" + this._curArtifactT.ID, "artifact_enchantGroup_" + this._curArtifactT.ID];
            for (var i = 0; i < this.tab.cells.length; i++) {
                var tabir = this.tab.cells[i];
                if (tabir)
                    tabir.tabRedPoint.setRedPointName(tabRedName[i]);
            }
            this.lab_name.text = "" + this._curArtifactT.name;
            this.lab_name.event(Laya.Event.RESIZE);
            this.updateTab();
            this.updateXiexiaBtn();
            this.updateStrengthCommon();
            this.updateSkillCommon();
            this.updateStarCommon();
            this._curTabIdx = this._curTabIdx < 0 ? 0 : this._curTabIdx;
            this.tab.selectedIndex = this._curTabIdx;
            this.onTab(this.tab.selectedIndex, true);
        };
        //tab按钮
        ArtifactView.prototype.updateTab = function () {
            var num = this._model.getUnlockArtifactNum();
            var conditions = this._artifactSet.artifact_unlock;
            for (var i = 0; i < this.tab.cells.length; i++) {
                var lock = false;
                if (i > 1 && i < conditions.length) {
                    lock = num < conditions[i];
                }
                var tabir = this.tab.cells[i];
                if (tabir)
                    tabir.img_suo.visible = lock;
            }
        };
        //卸下按钮
        ArtifactView.prototype.updateXiexiaBtn = function () {
            if (App.hero.isWearArtifact(this._curArtifactID, iface.tb_prop.lineupTypeKey.attack)) {
                this.btn_artifact.skin = "shenqi/xiexia.png";
            }
            else {
                this.btn_artifact.skin = "shenqi/peidai.png";
            }
        };
        //更新
        ArtifactView.prototype.updateStrengthCommon = function () {
            var strengthLv = App.hero.artifactStrengthLv;
            this.lab_Lv.text = "Lv\uFF1A" + strengthLv;
            this.lab_Lv.event(Laya.Event.RESIZE);
        };
        ArtifactView.prototype.updateSkillCommon = function () {
            var skillLv = App.hero.artifactSkillLv;
            this.lab_skillLv.text = "+" + skillLv;
            this.lab_skillLv.event(Laya.Event.RESIZE);
        };
        ArtifactView.prototype.updateStarCommon = function () {
            this._starLv = App.hero.artifactStarLv;
            this.list_star.repeatX = this._starLv;
            this.list_star.visible = this._starLv > 0;
        };
        ArtifactView.prototype.onTab = function (index, force) {
            if (force === void 0) { force = false; }
            if (index == -1 || (this._curTabIdx == index && !force))
                return;
            if (index > 1) {
                //检测解锁条件
                var num = this._model.getUnlockArtifactNum();
                var conditions = this._artifactSet.artifact_unlock;
                if (index < conditions.length && num < conditions[index]) {
                    var typeStr = index == ArtifactView.TAB_XILIAN ? LanMgr.getLan("", 12514) : LanMgr.getLan("", 12346);
                    showToast(LanMgr.getLan("", 10244, conditions[index], typeStr));
                    this.tab.selectedIndex = this._curTabIdx;
                    return;
                }
            }
            this._curTabIdx = index;
            this.viewStack.selectedIndex = index;
            //先隐藏公用的满级ui
            this.img_maxLv.visible = this.lab_maxLv.visible = false;
            for (var i = 0; i < this._closeFun.length; i++) {
                if (i == index) {
                }
                else {
                    this._closeFun[i].call(this);
                }
            }
            //有一些资源共用，先处理关闭的再来处理显示，才不会冲突
            this._showFun[index] && this._showFun[index].call(this);
            this.tab.cells.forEach(function (element, idx) {
                var irender = element;
                irender.btn_name.labelSize = index == idx ? 24 : 22;
                irender.btn_name.selected = index == idx;
                irender.btn_name.labelColors = index == idx ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
            });
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.SELECT_TABBAR));
        };
        //强化---------------------
        ArtifactView.prototype.showStrength = function () {
            this.jichu.visible = true;
            this.list_sj_attr.renderHandler = Handler.create(this, this.jichuRender, null, false);
            this.strengthRP.setRedPointName("artifact_strength_" + this._curArtifactT.ID);
            // this.lab_share.text = "神器共享强化";
            this.updateStrength();
        };
        /**基础属性加成list */
        ArtifactView.prototype.jichuRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                var box_img = cell.getChildByName("box_img");
                var img_attr = box_img.getChildByName("img_jichu");
                var lab_value = cell.getChildByName("lab_value");
                lab_value.color = index % 2 == 0 ? "#7e5336" : "#058623";
                img_attr.skin = SkinUtil.getAttrSkin(data.key);
                lab_value.text = "" + data.value;
                cell.refresh();
            }
        };
        ArtifactView.prototype.updateStrength = function () {
            var strengthLV = App.hero.artifactStrengthLv;
            var attrs = this.getStrengthAttrDesc(strengthLV);
            var nextattrs = this.getStrengthAttrDesc(strengthLV + 1);
            for (var i = 0; i < 3; i++) {
                var item = i < nextattrs.length ? nextattrs[i] : null;
                attrs.splice(i * 2 + 1, 0, item);
            }
            this.list_sj_attr.dataSource = attrs;
            this.updateStrengthCost(strengthLV);
        };
        ArtifactView.prototype.updateStrengthCost = function (lv) {
            if (lv === void 0) { lv = -1; }
            if (lv == -1)
                lv = App.hero.artifactStrengthLv;
            var unlockNum = this._model.getUnlockArtifactNum();
            if (unlockNum < this._artifactSet.artifact_unlock[0]) {
                this.lab_maxLv.visible = false;
                this.img_maxLv.visible = false;
                this.box_cost_all.visible = false;
                this.btn_strength.visible = false;
                this.lab_unlock_guanqia.visible = true;
                this.lab_unlock_unlock.visible = true;
                this.lab_unlock_guanqia.text = LanMgr.getLan("", 12516, this._artifactSet.artifact_unlock[0]);
            }
            else if (lv >= this._artifactSet.max_strength_level) {
                //满级
                this.lab_maxLv.visible = true;
                this.img_maxLv.visible = true;
                this.box_cost_all.visible = false;
                this.btn_strength.visible = false;
                this.lab_unlock_guanqia.visible = false;
                this.lab_unlock_unlock.visible = false;
            }
            else {
                this.lab_maxLv.visible = false;
                this.img_maxLv.visible = false;
                this.box_cost_all.visible = true;
                this.lab_unlock_guanqia.visible = false;
                this.lab_unlock_unlock.visible = false;
                this.btn_strength.visible = true;
                this.img_cost.skin = SkinUtil.xingcheng;
                var strengthT = tb.TB_artifact_strength.get_TB_artifact_strengthById(lv);
                var itemId = strengthT.cost[0][0];
                var needNum = strengthT.cost[0][1];
                var hasNum = App.hero.getBagItemNum(itemId);
                this.lab_has.text = Snums(hasNum);
                this.lab_need.text = "/" + Snums(needNum);
                this._isHasCost = hasNum >= needNum;
                this.lab_has.event(Laya.Event.RESIZE);
                this.box_cost.event(Laya.Event.RESIZE);
                this.lab_has.stroke = this._isHasCost ? 0 : 2;
                this.lab_has.color = this._isHasCost ? ColorConst.normalFont : "#f62e08";
            }
        };
        ArtifactView.prototype.closeStrength = function () {
            this.box_cost_all.visible = false;
            this.lab_maxLv.visible = false;
            this.jichu.visible = false;
            this.lab_unlock_guanqia.visible = false;
            this.lab_unlock_unlock.visible = false;
            // this.lab_share.text = "";
            if (this.list_sj_attr.renderHandler) {
                this.list_sj_attr.renderHandler.recover();
                this.list_sj_attr.renderHandler = null;
            }
            this.list_sj_attr.dataSource = null;
            this.strengthRP.onDispose();
        };
        //技能--------------------------
        ArtifactView.prototype.showSkill = function () {
            this.jineng.visible = true;
            this.skillUpRP.setRedPointName("artifact_skillUp_" + this._curArtifactT.ID);
            this.updateSkill();
        };
        ArtifactView.prototype.updateSkill = function () {
            var skillLv = App.hero.artifactSkillLv;
            var skillid = this._curArtifactID * 1000 + skillLv;
            var artifactSkillT = tb.TB_artifact_skill.get_TB_artifact_skillById(skillid);
            var skillT = tb.TB_skill.get_TB_skillById(artifactSkillT.skill);
            this.ui_skillBox.dataSource = { skill: skillT, isShow: false, isShowlist: false, openDgLv: 0, dgLv: 0 };
            this.lab_skillName.text = skillT.name.replace(/[0-9+]/ig, "");
            this.lab_skillName.event(Laya.Event.RESIZE);
            this.lab_skillLevel.text = "+" + skillLv;
            var desc = artifactSkillT.next ? FormatStr(skillT.info, artifactSkillT.next).replace(/[\\]/ig, "") : skillT.info;
            this._htmlText.innerHTML = desc;
            //技能按钮
            var strengthLv = App.hero.artifactStrengthLv;
            var artifactSkillCostT = tb.TB_artifact_skillcost.get_TB_artifact_skillcostById(skillLv);
            this._isCanUp = strengthLv >= artifactSkillCostT.need_level;
            this.btn_skillUp.gray = !this._isCanUp;
            this.btn_skillUp.label = this._isCanUp ? LanMgr.getLan('', 12517) : LanMgr.getLan("", 12518, artifactSkillCostT.need_level);
            this.updateSkillCost(skillLv, artifactSkillCostT);
        };
        ArtifactView.prototype.updateSkillCost = function (lv, artifactSkillcostT) {
            if (lv === void 0) { lv = -1; }
            if (artifactSkillcostT === void 0) { artifactSkillcostT = null; }
            if (lv == -1)
                lv = App.hero.artifactSkillLv;
            var unlockNum = this._model.getUnlockArtifactNum();
            if (unlockNum < this._artifactSet.artifact_unlock[1]) {
                this.lab_maxLv.visible = false;
                this.img_maxLv.visible = false;
                this.box_cost_all.visible = false;
                this.btn_skillUp.visible = false;
                this.lab_unlock_guanqia.visible = true;
                this.lab_unlock_unlock.visible = true;
                this.lab_unlock_guanqia.text = LanMgr.getLan("", 12519, this._artifactSet.artifact_unlock[1]);
            }
            else if (lv >= this._artifactSet.max_skill_level) {
                //满级
                this.lab_maxLv.visible = true;
                this.img_maxLv.visible = true;
                this.box_cost_all.visible = false;
                this.btn_skillUp.visible = false;
                this.lab_unlock_guanqia.visible = false;
                this.lab_unlock_unlock.visible = false;
            }
            else {
                this.lab_maxLv.visible = false;
                this.img_maxLv.visible = false;
                this.box_cost_all.visible = true;
                this.lab_unlock_guanqia.visible = false;
                this.lab_unlock_unlock.visible = false;
                this.btn_skillUp.visible = true;
                this.img_cost.skin = SkinUtil.gang;
                if (!artifactSkillcostT) {
                    artifactSkillcostT = tb.TB_artifact_skillcost.get_TB_artifact_skillcostById(lv);
                }
                var itemId = artifactSkillcostT.cost[0][0];
                var needNum = artifactSkillcostT.cost[0][1];
                var hasNum = App.hero.getBagItemNum(itemId);
                this.lab_has.text = Snums(hasNum);
                this.lab_need.text = "/" + Snums(needNum);
                this._isHasCost = hasNum >= needNum;
                this.lab_has.event(Laya.Event.RESIZE);
                this.box_cost.event(Laya.Event.RESIZE);
                this.lab_has.stroke = this._isHasCost ? 0 : 2;
                this.lab_has.color = this._isHasCost ? ColorConst.normalFont : "#f62e08";
            }
        };
        ArtifactView.prototype.closeSkill = function () {
            this.box_cost_all.visible = false;
            this.lab_maxLv.visible = false;
            this.img_maxLv.visible = false;
            this.jineng.visible = false;
            this.lab_unlock_guanqia.visible = false;
            this.lab_unlock_unlock.visible = false;
            this.skillUpRP.onDispose();
            this.ui_skillBox.dataSource = null;
        };
        //洗练
        ArtifactView.prototype.showBaptize = function () {
            this.tab_baptize.show(this._curArtifactT);
        };
        ArtifactView.prototype.closeBaptize = function () {
            this.tab_baptize.close();
        };
        //星星
        ArtifactView.prototype.showStar = function () {
            this.tab_enchant.show(this._curArtifactT);
        };
        ArtifactView.prototype.closeStar = function () {
            this.tab_enchant.close();
        };
        //清除已激活
        ArtifactView.prototype.clearArtifactActive = function () {
            this.btn_artifact.visible = false;
            this.lab_Lv.text = "";
            this.lab_skillLv.text = "";
            this.lab_Lv.x = 0;
            this.lab_skillLv.x = 0;
            this.box_star.visible = false;
            this.viewStack.visible = false;
            this.lab_share.visible = false;
            for (var i = 0; i < this._closeFun.length; i++) {
                this._closeFun[i].call(this);
            }
            if (this.tab.selectHandler) {
                this.tab.selectHandler.recover();
                this.tab.selectHandler = null;
            }
            this.btn_strength.off(Laya.Event.CLICK, this, this.artifactOperation);
            this.btn_skillUp.off(Laya.Event.CLICK, this, this.artifactOperation);
            this.lab_unlock_unlock.off(Laya.Event.CLICK, this, this.onClickUnlock);
        };
        //显示未激活----------------------------------------------------------
        ArtifactView.prototype.showArtifactNoActive = function () {
            if (!this._curArtifactT)
                return;
            // this.img_bg.x = 43;
            this.img_weijiesuo.visible = true;
            this.box_jiesuo.visible = true;
            this.lab_artifaceinfo.text = "        " + this._curArtifactT.desc;
            this.btn_unlock.on(Laya.Event.CLICK, this, this.onClickUnlockBtn);
            this.attrList.renderHandler = Handler.create(this, this.jichuRender1, null, false);
            this.lab_name.text = "" + this._curArtifactT.name;
            this.lab_name.event(Laya.Event.RESIZE);
            this.lab_jiesuoname.text = LanMgr.getLan("", 10434);
            this.attrList.array = this.getStrengthAttrDesc();
            //技能
            var artifactSkillT = tb.TB_artifact_skill.get_TB_artifact_skillById(this._curArtifactID * 1000 + this._artifactSet.max_skill_level);
            var maxSkillT = tb.TB_skill.get_TB_skillById(artifactSkillT.skill);
            this.lbskill.text = maxSkillT.name;
            this.lbskilldesc.text = maxSkillT.info;
            this.ui_maxskill.dataSource = { skill: maxSkillT, isShow: false, isShowlist: false, openDgLv: 0, dgLv: 0 };
            // //解锁任务
            // let copyT:tb.TB_copy_info = tb.TB_copy_info.get_TB_copy_infoById(this._curArtifactT.copy_id);
            // let nandu:string = copyT.desc.substr(0, copyT.desc.length-2);
            // this.lab_guanqia.text = LanMgr.getLan("通关{0}{1}解锁", -1, copyT.name, nandu);
            this.updateNoActiveCost();
            this.btn_unlock_red.setRedPointName("artifact_activate_" + this._curArtifactT.ID);
        };
        ArtifactView.prototype.updateNoActiveCost = function () {
            //解锁消耗
            var costid = this._curArtifactT.cost[0][0];
            var costnum = this._curArtifactT.cost[0][1];
            var hasnum = App.hero.getBagItemNum(costid);
            this.ui_item_cost.dataSource = this._curArtifactT.getConstItems()[0];
            var color = hasnum >= costnum ? ColorConst.normalFont : ColorConst.redFont;
            this.lab_cost_has.text = "" + Snums(hasnum);
            this.lab_cost_has.color = color;
            this.lab_cost_has.event(Laya.Event.RESIZE);
            this.lab_cost_need.text = "/" + costnum;
            this.btn_unlock.gray = hasnum < costnum;
        };
        /**基础属性加成list */
        ArtifactView.prototype.jichuRender1 = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                var img_jichu = cell.getChildByName("box_img").getChildByName("img_jichu");
                var lab_value = cell.getChildByName("lab_value");
                img_jichu.skin = SkinUtil.getAttrSkin(data.key);
                lab_value.text = "" + data.value;
                cell.refresh();
            }
        };
        //清除未激活
        ArtifactView.prototype.clearArtifactNoActive = function () {
            // this.img_bg.x = 21;
            this.img_weijiesuo.visible = false;
            this.box_jiesuo.visible = false;
            this.btn_unlock.off(Laya.Event.CLICK, this, this.onClickUnlockBtn);
            if (this.attrList.renderHandler) {
                this.attrList.renderHandler.recover();
                this.attrList.renderHandler = null;
            }
            this.attrList.array = null;
            this.ui_maxskill.dataSource = null;
            this.ui_item_cost.dataSource = null;
            this.btn_unlock_red.onDispose();
        };
        //点击事件--------------------------------------
        //去解锁
        ArtifactView.prototype.onClickUnlock = function () {
            UIMgr.showUI(UIConst.GuajiView);
            UIMgr.showUI(UIConst.UpRoadView);
        };
        //解锁
        ArtifactView.prototype.onClickUnlockBtn = function () {
            this.artifactOperation(Artifact.ACTIVATE);
        };
        /**查看介绍 */
        ArtifactView.prototype.lookup = function () {
            if (this._curArtifactT) {
                UIUtil.showCommonTipView([[LanMgr.getLan("", 12520), this._curArtifactT.desc]]);
            }
        };
        ArtifactView.prototype.showObtain = function () {
            UIMgr.showUI(UIConst.Artifact_ObtainTip);
        };
        ArtifactView.prototype.artifact = function () {
            if (!this._curArtifactT)
                return;
            var wearid = App.hero.isWearArtifact(this._curArtifactT.ID, iface.tb_prop.lineupTypeKey.attack) ? 0 : this._curArtifactT.ID;
            var obj = { id: wearid, type: iface.tb_prop.lineupTypeKey.attack };
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [obj, Artifact.WEAR_OR_TAKEOFF]);
        };
        //获取强化加成属性
        ArtifactView.prototype.getStrengthAttrDesc = function (Lv) {
            if (Lv === void 0) { Lv = -1; }
            var attrs = [];
            if (Lv == -1 || Lv > this._artifactSet.max_strength_level) {
                Lv = this._artifactSet.max_strength_level;
            }
            var attr = tb.TB_artifact_strength.get_TB_artifact_strengthById(Lv).strength_attr;
            for (var key in attr) {
                var obj = { key: 0, name: '', value: '' };
                obj.value = "+" + attr[key][1];
                obj.name = LanMgr.attrName[attr[key][0]];
                obj.key = attr[key][0];
                attrs.push(obj);
            }
            return attrs;
        };
        ArtifactView.prototype.artifactOperation = function (artifactEnum) {
            if (artifactEnum == Artifact.SKILLUPGRADE) { /**技能升级拦截 */
                if (!this._isCanUp) {
                    var artifactSkillCostT = tb.TB_artifact_skillcost.get_TB_artifact_skillcostById(App.hero.artifactSkillLv);
                    showToast(LanMgr.getLan("", 10245, artifactSkillCostT.need_level));
                    return;
                }
                if (!this._isHasCost) {
                    showToast(LanMgr.getLan('', Lans.cost, 406));
                    return;
                }
            }
            else if (artifactEnum == Artifact.RECYCLE) { /**重铸二次弹窗 */
                // let cost = `重铸需要花费${this._artifactSet.recast_cost[0][1]} `;
                // let img = HtmlUtil.convertHtmlText(`<img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img><br/><br/>`);
                // common.AlertBox.showAlert({
                // 	text: LanMgr.getLan(cost + img + `重铸后神器将回到初始状态，并返还金币外所有养成材料。（除洗练,附魔外）`), confirmCb: () => {
                // 		dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION), [this._curArtifactID, artifactEnum])
                // 	}, parm: null
                // });
                return;
            }
            else if (artifactEnum == Artifact.ACTIVATE) { /**解锁拦截 */
                var needCost = this._curArtifactT.cost;
                if (App.hero.getBagItemNum(needCost[0][0]) < needCost[0][1]) {
                    showToast(LanMgr.getLan('', 10246));
                    return;
                }
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.ARTIFACT);
                if (tbData && !App.IsSysOpen(ModuleConst.ARTIFACT)) {
                    showToast(tbData.prompt);
                    return;
                }
            }
            else if (artifactEnum == Artifact.STRENGTH) { /**强化拦截 */
                if (!this._isHasCost) {
                    showToast(LanMgr.getLan('', Lans.cost, 405));
                    return;
                }
            }
            if (artifactEnum != Artifact.ACTIVATE)
                this.uiScene.scene.playLyf(getEffectUrl("1000004"), new tl3d.Vector3D(180, 0, -440), 20, 4);
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [this._curArtifactID, artifactEnum]);
        };
        ArtifactView.prototype.addStartAction = function (starLv) {
            var _this = this;
            if (!this._imgStar) {
                this._imgStar = new Laya.Image(SkinUtil.xingxing);
                var pos = this.tab_enchant.startPos;
                var startPos = this.globalToLocal(pos);
                this._imgStar.pos(startPos.x, startPos.y);
                this._imgStar.anchorY = 0.5;
                this.addChild(this._imgStar);
                this._imgStar.scale(2, 2);
            }
            Laya.Tween.to(this._imgStar, { x: 218 + 48 * starLv, y: 702, scaleX: 0.5, scaleY: 0.5 }, 1500, Laya.Ease.quintInOut, Handler.create(this, function () {
                _this._imgStar.destroy();
                _this._imgStar = null;
            }));
        };
        ArtifactView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_ACTIVE, this.onArtifactActive, this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS, this.onArtifactWearChange, this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_STRENGTH_LV_CHANGE, this.onArtifactStrengthChange, this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_SKILL_LV_CHANGE, this.onArtifactSkillChange, this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE, this.onArtifactBaptizeChange, this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_STAR_CHANGE, this.onArtifactStarChange, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.onResoureChange, this);
            this.btn_lookup.off(Laya.Event.CLICK, this, this.lookup);
            this.btnObatin.off(Laya.Event.CLICK, this, this.showObtain);
            this.btn_artifact.off(Laya.Event.CLICK, this, this.artifact);
            this.clearShenQiList();
            this.clearArtifactActive();
            this.clearArtifactNoActive();
            this._curArtifactT = null;
            this._curTabIdx = -1;
            this._lastmodel = null;
            this.uiScene.onExit();
        };
        ArtifactView.TAB_SHENGJI = 0; //升级
        ArtifactView.TAB_JINENG = 1; //技能
        ArtifactView.TAB_XILIAN = 2; //洗练
        ArtifactView.TAB_SHENGXING = 3; //升星
        ArtifactView.TAB_NUM = 4;
        return ArtifactView;
    }(ui.artifact.ArtifactUI));
    game.ArtifactView = ArtifactView;
})(game || (game = {}));
