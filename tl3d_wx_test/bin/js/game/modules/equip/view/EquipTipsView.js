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
    var EquipTipsView = /** @class */ (function (_super) {
        __extends(EquipTipsView, _super);
        function EquipTipsView() {
            var _this = _super.call(this) || this;
            _this._isHideBtn = false;
            _this.isModelClose = true;
            _this.mouseEnabled = true;
            _this.mouseThrough = false;
            _this._model = game.EquipModel.getInstance();
            return _this;
        }
        EquipTipsView.showTip = function (target, data) {
            if (target == this._target && this._tips)
                return;
            this._target = target;
            if (!this._tips) {
                this._tips = new EquipTipsView();
            }
            this._tips.dataSource = data;
            if (this._tips.parent) {
                this._tips.initView();
            }
            else {
                this._tips.show(false, false);
            }
            this._tips.x = Laya.stage.mouseX + this._tips.width > Laya.stage.width ? Laya.stage.width - this._tips.width : Laya.stage.mouseX;
            this._tips.y = Laya.stage.mouseY + this._tips.height > Laya.stage.height ? Laya.stage.height - this._tips.height : Laya.stage.mouseY;
            ;
            Laya.stage.on(Laya.Event.CLICK, this, this.onClickStage);
        };
        EquipTipsView.onClickStage = function (e) {
            if (this._tips && this._tips.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY))
                return;
            if (this._target && this._target.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY))
                return;
            this.HideTip();
        };
        EquipTipsView.HideTip = function () {
            this._target = null;
            if (this._tips) {
                this._tips.close();
                this._tips.removeSelf();
                this._tips.destroy(true);
                this._tips = null;
            }
            Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
        };
        EquipTipsView.prototype.show = function (closeOther, showEffect) {
            this.popupCenter = false;
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        EquipTipsView.prototype.popup = function (closeOther, showEffect) {
            // 先initView居中
            this.initView(true);
            this.popupCenter = true;
            _super.prototype.popup.call(this, closeOther, showEffect);
        };
        EquipTipsView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        EquipTipsView.prototype.initView = function (hideBtn) {
            if (hideBtn === void 0) { hideBtn = false; }
            this._isHideBtn = hideBtn;
            this.clear();
            this._equipData = this.dataSource;
            this._spiltArr = [];
            this.updateData();
        };
        //刷新数据
        EquipTipsView.prototype.updateData = function () {
            this.updateTop();
            this.updateBase();
            this.updateJingLian();
            // this.updateGem();
            this.updateSuit();
            this.layout();
        };
        EquipTipsView.prototype.updateTop = function () {
            if (!this._equipData)
                return;
            this.lab_name.text = this._equipData.tab_item.name + "+" + this._equipData.strengthLv;
            this.lab_quality.text = LanMgr.getLan("", 12374, LanMgr.qualityName[this._equipData.quality]);
            this.ui_item_icon.dataSource = this._equipData;
            this.img_bg_quality.skin = LanMgr.getLan("zhaungbei/zhaungbeipinzhi0{0}.png", -1, this._equipData.quality);
        };
        //基础属性
        EquipTipsView.prototype.updateBase = function () {
            if (!this._equipData)
                return;
            //基础属性
            this._baseTitle = new Laya.Label(LanMgr.getLan("", 12373));
            this._baseTitle.color = "#e8c859";
            this._baseTitle.fontSize = 22;
            this.addChild(this._baseTitle);
            this._baseBtn = new Laya.Button("comp/button/btn_qianwang.png");
            this._baseBtn.stateNum = 2;
            this._baseBtn.width = 97;
            this._baseBtn.height = 40;
            this._baseBtn.label = LanMgr.getLan("", 12375);
            this._baseBtn.labelSize = 22;
            this._baseBtn.labelColors = "#ffffff,#ffffff,#ffffff";
            this._baseBtn.labelStroke = 4;
            this._baseBtn.labelStrokeColor = "#538901";
            this._baseBtn.on(Laya.Event.CLICK, this, this.onClickBase);
            this.addChild(this._baseBtn);
            this._baseArr = [];
            var strenObj = this._equipData.getStrengthAttr();
            var arrAttstr = LanMgr.attrName;
            var allAttr = [];
            for (var i in strenObj) {
                if (strenObj[i] != 0) {
                    var attri = {};
                    attri['name'] = LanMgr.getLan(arrAttstr[Number(i)], -1);
                    attri['value'] = strenObj[i];
                    allAttr.push(attri);
                }
            }
            for (var i = 0; i < allAttr.length; i++) {
                var lab = new Laya.Label();
                lab.color = "#ffeecc";
                lab.fontSize = 20;
                lab.text = LanMgr.getLan("{0}:{1}", -1, allAttr[i].name, allAttr[i].value);
                this.addChild(lab);
                this._baseArr.push(lab);
            }
        };
        //精炼属性
        EquipTipsView.prototype.updateJingLian = function () {
            if (!this._equipData)
                return;
            //精炼属性
            this.addSplit();
            this._jingLianTitle = new Laya.Label(LanMgr.getLan("", 12441));
            this._jingLianTitle.color = "#e8c859";
            this._jingLianTitle.fontSize = 22;
            this.addChild(this._jingLianTitle);
            this._jingLianBtn = new Laya.Button("comp/button/btn_qianwang.png");
            this._jingLianBtn.stateNum = 2;
            this._jingLianBtn.width = 97;
            this._jingLianBtn.height = 40;
            this._jingLianBtn.label = LanMgr.getLan("", 12442);
            this._jingLianBtn.labelSize = 22;
            this._jingLianBtn.labelColors = "#ffffff,#ffffff,#ffffff";
            this._jingLianBtn.labelStroke = 4;
            this._jingLianBtn.labelStrokeColor = "#538901";
            this._jingLianBtn.on(Laya.Event.CLICK, this, this.onClickJingLian);
            this.addChild(this._jingLianBtn);
            this._jingLianArr = [];
            if (this._equipData.refineLv <= 0) {
                var lab = new Laya.Label();
                lab.color = "#ffeecc";
                lab.fontSize = 20;
                lab.text = LanMgr.getLan("", 12084);
                this.addChild(lab);
                this._jingLianArr.push(lab);
            }
            else {
                var arrAttr = this._equipData.getAttributeByValue(0, 0);
                for (var i = 0; i < arrAttr.length; i++) {
                    var lab = new Laya.Label();
                    lab.color = "#ffeecc";
                    lab.fontSize = 20;
                    lab.text = "\u3010Lv." + this._equipData.refineLv + "\u3011" + arrAttr[i];
                    this.addChild(lab);
                    this._jingLianArr.push(lab);
                }
            }
        };
        //宝石属性
        // private updateGem():void{
        // 	if (!this._equipData) return;
        // 	//宝石属性
        // 	this.addSplit();
        // 	this._gemTitle = new Laya.Label("宝石属性");
        // 	this._gemTitle.color = "#e8c859";
        // 	this._gemTitle.fontSize = 22;
        // 	this.addChild(this._gemTitle);
        // 	this._gemBtn = new Laya.Button("comp/button/btn_qianwang.png");
        // 	this._gemBtn.stateNum = 2;
        // 	this._gemBtn.width = 97;
        // 	this._gemBtn.height = 40;
        // 	this._gemBtn.label = "提 升";
        // 	this._gemBtn.labelSize = 22;
        // 	this._gemBtn.labelColors = "#ffffff,#ffffff,#ffffff";
        // 	this._gemBtn.labelStroke = 4;
        // 	this._gemBtn.labelStrokeColor = "#538901";
        // 	this._gemBtn.on(Laya.Event.CLICK, this, this.onClickGem);
        // 	this.addChild(this._gemBtn);
        // 	this._gemIcon = [];
        // 	this._gemArr = [];
        // 	for(let i = 0 ; i < this._equipData.gemsList.length ; i++) {
        // 		let gemVo = this._equipData.gemsList[i];
        // 		if (!gemVo) continue;
        // 		let icon = new common.ItemBox();
        // 		icon.dataSource = App.hero.createItemVo(0, gemVo.templateId);
        // 		icon.scale(0.45, 0.45);
        // 		this.addChild(icon);
        // 		this._gemIcon.push(icon);
        // 		let lab:Laya.Label = new Laya.Label();
        // 		lab.color = "#ffeecc";
        // 		lab.fontSize = 20;
        // 		lab.text = `${gemVo.tbItem.name}   ${this._model.arrAttriName[gemVo.tbGem.getAttrType()]}+${gemVo.tbGem.getAttrVal()}`
        // 		this.addChild(lab);
        // 		this._gemArr.push(lab);
        // 	}
        // 	if (this._gemArr.length == 0){
        // 		this._gemEmpty = new Laya.Label();
        // 		this._gemEmpty.color = "#ffeecc";
        // 		this._gemEmpty.fontSize = 20;
        // 		this._gemEmpty.text = "无"
        // 		this.addChild(this._gemEmpty);
        // 	}
        // }
        //套装属性
        EquipTipsView.prototype.updateSuit = function () {
            if (!this._equipData)
                return;
            var model = this._model;
            //套装属性
            var allSuit = this._equipData.getEquipAllSuitArray();
            if (allSuit && allSuit.length > 0) {
                this.addSplit();
                this._suitTitle = new Laya.Label(LanMgr.getLan("", 12443));
                this._suitTitle.color = "#e8c859";
                this._suitTitle.fontSize = 22;
                this.addChild(this._suitTitle);
                this._suitArr = [];
                var arrAtt = LanMgr.attrName;
                for (var i = 0; i < allSuit.length; i++) {
                    var quality = allSuit[i].getQuality();
                    var count = allSuit[i].getCount();
                    var lab = new Laya.Label();
                    lab.fontSize = 20;
                    if (model.getEquipQualityNum(this._equipData.godId, quality) >= count) {
                        lab.color = "#2aff00";
                    }
                    else {
                        //未激活套装
                        lab.color = "#ffeecc";
                    }
                    lab.text = LanMgr.getLan("", 12444, arrAtt[allSuit[i].suit_percent[0]], allSuit[i].suit_percent[2] * 100, count);
                    this.addChild(lab);
                    this._suitArr.push(lab);
                }
            }
            this._suitTHBtn = new Laya.Button("comp/button/button.png");
            this._suitTHBtn.stateNum = 2;
            this._suitTHBtn.label = LanMgr.getLan("", 12379);
            this._suitTHBtn.labelSize = 22;
            this._suitTHBtn.labelColors = "#ffffff,#ffffff,#ffffff";
            this._suitTHBtn.labelStroke = 4;
            this._suitTHBtn.labelStrokeColor = "#ca7005";
            this.addChild(this._suitTHBtn);
            this._suitTHBtn.on(Laya.Event.CLICK, this, this.onClickTH);
            this._suitTZBtn = new Laya.Button("comp/button/btn_quxiao.png");
            this._suitTZBtn.stateNum = 2;
            this._suitTZBtn.label = LanMgr.getLan("", 12380);
            this._suitTZBtn.labelSize = 22;
            this._suitTZBtn.labelColors = "#ffffff,#ffffff,#ffffff";
            this._suitTZBtn.labelStroke = 4;
            this._suitTZBtn.labelStrokeColor = "#e6360d";
            this.addChild(this._suitTZBtn);
            this._suitTZBtn.on(Laya.Event.CLICK, this, this.onClickTZ);
        };
        //添加分割线
        EquipTipsView.prototype.addSplit = function () {
            var img = new Laya.Image("comp/image/zhaungbeixingxi02.png");
            this.addChild(img);
            this._spiltArr.push(img);
        };
        //布局
        EquipTipsView.prototype.layout = function () {
            var posx = 24;
            var posy = 150;
            var splitIndex = 0;
            //基础属性
            if (this._baseTitle) {
                this._baseTitle.x = posx;
                this._baseTitle.y = posy + 5;
                if (this._baseBtn) {
                    this._baseBtn.x = this.width - 15 - this._baseBtn.width;
                    this._baseBtn.y = posy;
                }
                posy = this._baseTitle.y + this._baseTitle.height + 10;
            }
            if (this._baseArr) {
                for (var i = 0; i < this._baseArr.length; i++) {
                    var lab = this._baseArr[i];
                    if (lab) {
                        lab.x = posx;
                        lab.y = posy;
                        posy += lab.height + 10;
                    }
                }
            }
            //精炼属性
            if (this._jingLianTitle) {
                this._spiltArr[splitIndex].x = posx + 0;
                this._spiltArr[splitIndex].y = posy;
                splitIndex++;
                posy += 10;
                this._jingLianTitle.x = posx;
                this._jingLianTitle.y = posy + 5;
                if (this._jingLianBtn) {
                    this._jingLianBtn.x = this.width - 15 - this._jingLianBtn.width;
                    this._jingLianBtn.y = posy;
                }
                posy = this._jingLianTitle.y + this._jingLianTitle.height + 10;
            }
            if (this._jingLianArr) {
                for (var i = 0; i < this._jingLianArr.length; i++) {
                    var lab = this._jingLianArr[i];
                    if (lab) {
                        lab.x = posx;
                        lab.y = posy;
                        posy += lab.height + 10;
                    }
                }
            }
            //宝石属性
            if (this._gemTitle) {
                this._spiltArr[splitIndex].x = posx + 0;
                this._spiltArr[splitIndex].y = posy;
                splitIndex++;
                posy += 10;
                this._gemTitle.x = posx;
                this._gemTitle.y = posy + 5;
                if (this._gemBtn) {
                    this._gemBtn.x = this.width - 15 - this._gemBtn.width;
                    this._gemBtn.y = posy;
                }
                posy = this._gemTitle.y + this._gemTitle.height + 10;
            }
            if (this._gemIcon) {
                for (var i = 0; i < this._gemIcon.length; i++) {
                    var icon = this._gemIcon[i];
                    if (icon) {
                        icon.x = posx;
                        icon.y = posy;
                        var lab = this._gemArr[i];
                        if (lab) {
                            lab.x = posx + icon.width * icon.scaleX + 5;
                            lab.y = posy + (icon.height * icon.scaleX - lab.height) / 2;
                        }
                        posy = posy + icon.height * icon.scaleX + 10;
                    }
                }
            }
            if (this._gemEmpty) {
                this._gemEmpty.x = posx;
                this._gemEmpty.y = posy + 5;
                posy = this._gemEmpty.y + this._gemEmpty.height + 10;
            }
            //套装属性
            if (this._suitTitle) {
                this._spiltArr[splitIndex].x = posx + 0;
                this._spiltArr[splitIndex].y = posy;
                splitIndex++;
                posy += 10;
                this._suitTitle.x = posx;
                this._suitTitle.y = posy + 5;
                posy = this._suitTitle.y + this._suitTitle.height + 10;
            }
            if (this._suitArr) {
                for (var i = 0; i < this._suitArr.length; i++) {
                    var lab = this._suitArr[i];
                    if (lab) {
                        lab.x = posx;
                        lab.y = posy;
                        posy += lab.height + 10;
                    }
                }
            }
            this._suitTZBtn.x = posx - 9;
            this._suitTZBtn.y = posy;
            this._suitTHBtn.x = posx + this._suitTZBtn.width + 0;
            this._suitTHBtn.y = posy;
            posy += this._suitTHBtn.height + 20;
            this.img_bg.height = this._isHideBtn ? posy - 60 : posy;
            this.height = this._isHideBtn ? posy - 60 : posy;
            this._baseBtn.visible = this._jingLianBtn.visible = this._suitTHBtn.visible = this._suitTZBtn.visible = !this._isHideBtn;
            if (this._gemBtn) {
                this._gemBtn.visible = !this._isHideBtn;
            }
        };
        EquipTipsView.prototype.onClickBase = function () {
            this.strengthen();
        };
        EquipTipsView.prototype.onClickJingLian = function () {
            this.refine();
        };
        EquipTipsView.prototype.onClickGem = function () {
            if (!App.IsSysOpen(ModuleConst.EQUIP_BAOSHI)) {
                var tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_BAOSHI);
                showToast(tbSys.prompt);
                return;
            }
            var euqipView = UIMgr.getUIByName(UIConst.EquipView);
            if (euqipView) {
                euqipView.onMouseIndex(null, 2);
            }
            EquipTipsView.HideTip();
        };
        //替换
        EquipTipsView.prototype.onClickTH = function () {
            this.replace();
        };
        //脱装
        EquipTipsView.prototype.onClickTZ = function () {
            this.unLoad();
        };
        EquipTipsView.prototype.clear = function () {
            this.ui_item_icon.dataSource = null;
            this.lab_name.text = "";
            this.lab_quality.text = "";
            this.img_bg_quality.skin = "";
            //基础属性
            this.clearLabel(this._baseTitle);
            this.clearButton(this._baseBtn, this.onClickBase);
            this.clearLabelArr(this._baseArr);
            this._baseTitle = null;
            this._baseBtn = null;
            this._baseArr = null;
            //精炼属性
            this.clearLabel(this._jingLianTitle);
            this.clearButton(this._jingLianBtn, this.onClickJingLian);
            this.clearLabelArr(this._jingLianArr);
            this._jingLianTitle = null;
            this._jingLianBtn = null;
            this._jingLianArr = null;
            //宝石属性
            this.clearLabel(this._gemTitle);
            this.clearButton(this._gemBtn, this.onClickGem);
            this.clearLabelArr(this._gemArr);
            if (this._gemIcon) {
                for (var i = 0; i < this._gemIcon.length; i++) {
                    var icon = this._gemIcon[i];
                    if (icon) {
                        icon.dataSource = null;
                        icon.removeSelf();
                        icon.destroy(true);
                        icon = null;
                    }
                }
                this._gemIcon = null;
            }
            this.clearLabel(this._gemEmpty);
            this._gemTitle = null;
            this._gemBtn = null;
            this._gemArr = null;
            this._gemEmpty = null;
            //套装属性
            this.clearLabel(this._suitTitle);
            this.clearButton(this._suitTZBtn, this.onClickTZ);
            this.clearButton(this._suitTHBtn, this.onClickTH);
            this.clearLabelArr(this._suitArr);
            this._suitTitle = null;
            this._suitTHBtn = null;
            this._suitTZBtn = null;
            this._suitArr = null;
            //分隔线
            if (this._spiltArr) {
                for (var i = 0; i < this._spiltArr.length; i++) {
                    var img = this._spiltArr[i];
                    if (img) {
                        img.removeSelf();
                        img.destroy(true);
                        img = null;
                    }
                }
                this._spiltArr = null;
            }
            this.img_bg.height = 200;
            this.height = 200;
        };
        EquipTipsView.prototype.clearLabel = function (lab) {
            if (!lab)
                return;
            lab.removeSelf();
            lab.destroy(true);
            lab = null;
        };
        EquipTipsView.prototype.clearButton = function (btn, fun) {
            if (!btn)
                return;
            if (fun)
                btn.off(Laya.Event.CLICK, this, fun);
            btn.removeSelf();
            btn.destroy(true);
            btn = null;
        };
        EquipTipsView.prototype.clearLabelArr = function (labArr) {
            if (!labArr)
                return;
            for (var i = 0; i < labArr.length; i++) {
                var lab = labArr[i];
                if (lab) {
                    lab.removeSelf();
                    lab.destroy(true);
                    lab = null;
                }
            }
            labArr = null;
        };
        /**更换 */
        EquipTipsView.prototype.replace = function () {
            var equipData = this.dataSource;
            this._model.showEquipByView = EquipType.EQUIP_VIEW;
            dispatchEvt(new game.EquipEvent(game.EquipEvent.OPEN_EQUIP_PANEL), [equipData.slot, 1, equipData]);
            EquipTipsView.HideTip();
        };
        /**精炼 */
        EquipTipsView.prototype.refine = function () {
            if (!App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
                showToast(this._model.getRefineOpenData().prompt);
                return;
            }
            dispatchEvt(new game.EquipEvent(game.EquipEvent.SHOW_EQUIPREFINE_PANEL), this._dataSource);
            EquipTipsView.HideTip();
        };
        /**强化 */
        EquipTipsView.prototype.strengthen = function () {
            if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
                var tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
                showToast(tbSys.prompt);
                return;
            }
            dispatchEvt(new game.EquipEvent(game.EquipEvent.SHOW_EQUIP_STH_PANEL), this._dataSource);
            EquipTipsView.HideTip();
        };
        /**卸下 */
        EquipTipsView.prototype.unLoad = function () {
            dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION), [this.dataSource, EquipOperation.DISCHARGE]);
        };
        EquipTipsView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.clear();
            this._equipData = null;
            this._isHideBtn = false;
        };
        return EquipTipsView;
    }(ui.equip.EquipTipsUI));
    game.EquipTipsView = EquipTipsView;
})(game || (game = {}));
