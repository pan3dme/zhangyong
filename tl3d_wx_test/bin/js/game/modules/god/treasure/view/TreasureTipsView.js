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
    var TreasureTipsView = /** @class */ (function (_super) {
        __extends(TreasureTipsView, _super);
        function TreasureTipsView() {
            var _this = _super.call(this) || this;
            /** 是否显示所有按钮 */
            _this._isShowAllBtn = true;
            _this.isModelClose = true;
            _this.mouseEnabled = true;
            _this.mouseThrough = false;
            _this.zOrder = UI_DEPATH_VALUE.TOP + 9;
            _this.name = UIConst.TreasureTipsView;
            return _this;
        }
        /** 神灵界面tips */
        TreasureTipsView.showTip = function (target, itemVo, godVo) {
            if (target == this._target && this._tips)
                return;
            this._target = target;
            if (!this._tips) {
                this._tips = new TreasureTipsView();
            }
            this._tips.isModal = false;
            this._tips.popupCenter = false;
            this._tips.dataSource = [itemVo, godVo, true];
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
        /** 通用tips弹框 */
        TreasureTipsView.popupTip = function (itemVo, godVo, showAllBtn, args) {
            if (godVo === void 0) { godVo = null; }
            if (showAllBtn === void 0) { showAllBtn = false; }
            if (!this._tips) {
                this._tips = new TreasureTipsView();
            }
            this._tips.isModal = true;
            this._tips.popupCenter = true;
            this._tips.dataSource = [itemVo, godVo, showAllBtn, args];
            if (this._tips.parent) {
                this._tips.initView();
            }
            else {
                this._tips.popup(false, true);
            }
            return this._tips;
        };
        TreasureTipsView.getTipsUI = function () {
            return this._tips;
        };
        TreasureTipsView.onClickStage = function (e) {
            if (this._tips && this._tips.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY))
                return;
            if (this._target && this._target.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY))
                return;
            this.HideTip();
        };
        TreasureTipsView.HideTip = function () {
            this._target = null;
            if (this._tips) {
                this._tips.close();
                this._tips.removeSelf();
                this._tips.destroy(true);
                this._tips = null;
            }
            Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
        };
        TreasureTipsView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TreasureTipsView.prototype.popup = function (closeOther, showEffect) {
            // 先initView居中
            this.initView();
            _super.prototype.popup.call(this, closeOther, showEffect);
        };
        TreasureTipsView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        TreasureTipsView.prototype.initView = function () {
            this.clear();
            this._treasureVo = this.dataSource[0];
            this._godVo = this.dataSource[1];
            this._isShowAllBtn = this.dataSource[2];
            this._args = this.dataSource[3];
            this._spiltArr = [];
            this.updateData();
        };
        //刷新数据
        TreasureTipsView.prototype.updateData = function () {
            this.updateTop();
            this.updateBase();
            if (this._treasureVo && !this._treasureVo.isForbitStarup()) {
                this.updateStarup();
            }
            this.updateSuit();
            this.layout();
        };
        TreasureTipsView.prototype.updateTop = function () {
            if (!this._treasureVo)
                return;
            this.lab_name.text = this._treasureVo.tbItem.name;
            this.lab_quality.text = LanMgr.getLan("", 12374, LanMgr.qualityName[this._treasureVo.quality]);
            this.ui_item_icon.dataSource = this._treasureVo;
            this.img_bg_quality.skin = LanMgr.getLan("zhaungbei/zhaungbeipinzhi0{0}.png", -1, this._treasureVo.quality);
        };
        //基础属性
        TreasureTipsView.prototype.updateBase = function () {
            if (!this._treasureVo)
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
            var allAttr = game.TreasureUtil.getTbAttrStrAry(this._treasureVo.getTbStrength());
            for (var i = 0; i < allAttr.length; i++) {
                var lab = new Laya.Label();
                lab.color = "#ffeecc";
                lab.fontSize = 20;
                lab.text = allAttr[i][0] + allAttr[i][1];
                this.addChild(lab);
                this._baseArr.push(lab);
            }
        };
        //升星属性
        TreasureTipsView.prototype.updateStarup = function () {
            if (!this._treasureVo)
                return;
            //升星属性
            this.addSplit();
            this._starTitle = new Laya.Label(LanMgr.getLan("", 12376));
            this._starTitle.color = "#e8c859";
            this._starTitle.fontSize = 22;
            this.addChild(this._starTitle);
            this._starBtn = new Laya.Button("comp/button/btn_qianwang.png");
            this._starBtn.stateNum = 2;
            this._starBtn.width = 97;
            this._starBtn.height = 40;
            this._starBtn.label = LanMgr.getLan("", 12377);
            this._starBtn.labelSize = 22;
            this._starBtn.labelColors = "#ffffff,#ffffff,#ffffff";
            this._starBtn.labelStroke = 4;
            this._starBtn.labelStrokeColor = "#538901";
            this._starBtn.on(Laya.Event.CLICK, this, this.onClickStarup);
            this.addChild(this._starBtn);
            this._starArr = [];
            if (this._treasureVo.starLv <= 0) {
                var lab = new Laya.Label();
                lab.color = "#ffeecc";
                lab.fontSize = 20;
                lab.text = LanMgr.getLan("", 12084);
                this.addChild(lab);
                this._starArr.push(lab);
            }
            else {
                var arrAttr = game.TreasureUtil.getTbAttrStrAry(this._treasureVo.getTbStarup());
                for (var i = 0; i < arrAttr.length; i++) {
                    var lab = new Laya.Label();
                    lab.color = "#ffeecc";
                    lab.fontSize = 20;
                    lab.text = arrAttr[i][0] + arrAttr[i][1];
                    this.addChild(lab);
                    this._starArr.push(lab);
                }
            }
        };
        //套装属性
        TreasureTipsView.prototype.updateSuit = function () {
            if (!this._treasureVo)
                return;
            //套装属性
            this.addSplit();
            this._itemTitle = new Laya.Label(LanMgr.getLan("", 12378));
            this._itemTitle.color = "#e8c859";
            this._itemTitle.fontSize = 22;
            this.addChild(this._itemTitle);
            this._itemDesc = new Laya.Label(this._treasureVo.tbItem.desc);
            this._itemDesc.width = 270;
            this._itemDesc.leading = 5;
            this._itemDesc.autoSize = true;
            this._itemDesc.wordWrap = true;
            this._itemDesc.color = "#ffeecc";
            this._itemDesc.fontSize = 20;
            this.addChild(this._itemDesc);
            this._btnChange = new Laya.Button("comp/button/button.png");
            this._btnChange.stateNum = 2;
            this._btnChange.label = LanMgr.getLan("", 12379);
            this._btnChange.labelSize = 22;
            this._btnChange.labelColors = "#ffffff,#ffffff,#ffffff";
            this._btnChange.labelStroke = 4;
            this._btnChange.labelStrokeColor = "#ca7005";
            this.addChild(this._btnChange);
            this._btnChange.on(Laya.Event.CLICK, this, this.onClickTH);
            this._btnTakeoff = new Laya.Button("comp/button/btn_quxiao.png");
            this._btnTakeoff.stateNum = 2;
            this._btnTakeoff.label = LanMgr.getLan("", 12380);
            this._btnTakeoff.labelSize = 22;
            this._btnTakeoff.labelColors = "#ffffff,#ffffff,#ffffff";
            this._btnTakeoff.labelStroke = 4;
            this._btnTakeoff.labelStrokeColor = "#e6360d";
            this.addChild(this._btnTakeoff);
            this._btnTakeoff.on(Laya.Event.CLICK, this, this.onClickTZ);
            this._btnWear = new Laya.Button("comp/button/button.png");
            this._btnWear.stateNum = 2;
            this._btnWear.label = LanMgr.getLan("", 12366);
            this._btnWear.labelSize = 22;
            this._btnWear.labelColors = "#ffffff,#ffffff,#ffffff";
            this._btnWear.labelStroke = 4;
            this._btnWear.labelStrokeColor = "#ca7005";
            this.addChild(this._btnWear);
            this._btnWear.on(Laya.Event.CLICK, this, this.onClickWear);
        };
        //添加分割线
        TreasureTipsView.prototype.addSplit = function () {
            var img = new Laya.Image("comp/image/zhaungbeixingxi02.png");
            this.addChild(img);
            this._spiltArr.push(img);
        };
        //布局
        TreasureTipsView.prototype.layout = function () {
            var posx = 24;
            var posy = 150;
            var splitIndex = 0;
            //基础属性
            if (this._baseTitle) {
                this._baseTitle.x = posx;
                this._baseTitle.y = posy + 5;
                if (this._baseBtn) {
                    this._baseBtn.x = this.width - 15 - this._baseBtn.width; //  * this._baseBtn.anchorX
                    this._baseBtn.y = posy + 5; // this._baseBtn.height * this._baseBtn.anchorY
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
            //升星属性
            if (this._starTitle) {
                this._spiltArr[splitIndex].x = posx + 0;
                this._spiltArr[splitIndex].y = posy;
                splitIndex++;
                posy += 10;
                this._starTitle.x = posx;
                this._starTitle.y = posy + 5;
                if (this._starBtn) {
                    this._starBtn.x = this.width - 15 - this._starBtn.width; //  * this._starBtn.anchorX
                    this._starBtn.y = posy + 5; //  this._starBtn.height * this._starBtn.anchorY
                }
                posy = this._starTitle.y + this._starTitle.height + 10;
            }
            if (this._starArr) {
                for (var i = 0; i < this._starArr.length; i++) {
                    var lab = this._starArr[i];
                    if (lab) {
                        lab.x = posx;
                        lab.y = posy;
                        posy += lab.height + 10;
                    }
                }
            }
            //套装属性
            if (this._itemTitle) {
                this._spiltArr[splitIndex].x = posx + 0;
                this._spiltArr[splitIndex].y = posy;
                splitIndex++;
                posy += 10;
                this._itemTitle.x = posx;
                this._itemTitle.y = posy + 5;
                posy = this._itemTitle.y + this._itemTitle.height + 10;
            }
            if (this._itemDesc) {
                this._itemDesc.x = posx;
                this._itemDesc.y = posy + 5;
                posy = this._itemDesc.y + this._itemDesc.height + 10;
            }
            this._btnWear.centerX = 0;
            this._btnWear.y = posy;
            this._btnTakeoff.x = posx - 9;
            this._btnTakeoff.y = posy;
            this._btnChange.x = posx + this._btnTakeoff.width + 0;
            this._btnChange.y = posy;
            posy += this._btnChange.height + 20;
            this._btnWear.label = LanMgr.getLan("", 12366);
            // 按钮显示规则 : 通用情况下显示tips，隐藏全部按钮；个别界面需要显示个别按钮
            this._baseBtn.visible = this._btnChange.visible = this._btnTakeoff.visible = this._btnWear.visible = this._isShowAllBtn;
            if (this._starBtn) {
                this._starBtn.visible = this._isShowAllBtn;
            }
            // 在需要显示按钮的情况下：
            // 通用情况下： 强化、升星、替换、脱下按钮需要在该圣物有拥有者时显示； 穿戴按钮需要在其没有拥有者，并且需要有传入的要穿戴的神灵时显示
            if (this._isShowAllBtn) {
                var isExistGod = this._treasureVo && this._treasureVo.isExsitGod();
                // 强化、升星、替换、脱下需要在有拥有者上操作
                this._baseBtn.visible = this._btnChange.visible = this._btnTakeoff.visible = isExistGod;
                if (this._starBtn) {
                    this._starBtn.visible = isExistGod && !this._treasureVo.isForbitStarup();
                }
                // 穿戴需要其没有拥有者，并且需要有传入的要穿戴的神灵
                this._btnWear.visible = !isExistGod && (this._godVo ? true : false);
            }
            // 额外参数：强制控制按钮的显示
            // 显示强化按钮
            if (this._args && this._args.hasOwnProperty("showStrengthBtn")) {
                this._baseBtn.visible = this._args["showStrengthBtn"];
            }
            // 显示升星按钮
            if (this._starBtn && this._args && this._args.hasOwnProperty("showStarBtn")) {
                this._starBtn.visible = this._args["showStarBtn"] && !this._treasureVo.isForbitStarup();
            }
            // 显示穿戴按钮，显示lable文字选择
            if (this._args && this._args.hasOwnProperty("chooseFlag")) {
                this._btnWear.visible = true;
                this._btnWear.label = LanMgr.getLan("", 12381);
            }
            // 是否显示了底部的按钮
            var isShowBottomBtns = this._btnChange.visible || this._btnTakeoff.visible || this._btnWear.visible;
            this.img_bg.height = isShowBottomBtns ? posy : posy - 60;
            this.height = isShowBottomBtns ? posy : posy - 60;
        };
        TreasureTipsView.prototype.clear = function () {
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
            //升星属性
            this.clearLabel(this._starTitle);
            this.clearButton(this._starBtn, this.onClickStarup);
            this.clearLabelArr(this._starArr);
            this._starTitle = null;
            this._starBtn = null;
            this._starArr = null;
            //套装属性
            this.clearLabel(this._itemTitle);
            this.clearLabel(this._itemDesc);
            this.clearButton(this._btnTakeoff, this.onClickTZ);
            this.clearButton(this._btnChange, this.onClickTH);
            this.clearButton(this._btnWear, this.onClickWear);
            this._itemTitle = null;
            this._btnChange = null;
            this._btnTakeoff = null;
            this._btnWear = null;
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
        TreasureTipsView.prototype.clearLabel = function (lab) {
            if (!lab)
                return;
            lab.removeSelf();
            lab.destroy(true);
            lab = null;
        };
        TreasureTipsView.prototype.clearButton = function (btn, fun) {
            if (!btn)
                return;
            if (fun)
                btn.off(Laya.Event.CLICK, this, fun);
            btn.removeSelf();
            btn.destroy(true);
            btn = null;
        };
        TreasureTipsView.prototype.clearLabelArr = function (labArr) {
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
        /** 强化 */
        TreasureTipsView.prototype.onClickBase = function () {
            if (this._treasureVo) {
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_STRENGTH_VIEW), this._treasureVo);
                TreasureTipsView.HideTip();
            }
        };
        /** 升星 */
        TreasureTipsView.prototype.onClickStarup = function () {
            if (this._treasureVo) {
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_STARUP_VIEW), this._treasureVo);
                TreasureTipsView.HideTip();
            }
        };
        //替换
        TreasureTipsView.prototype.onClickTH = function () {
            if (!this._treasureVo)
                return;
            var godVo = App.hero.getGodVoById(this._treasureVo.godId);
            if (godVo) {
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW), [game.ChooseTreasureOpenType.change, this._treasureVo, godVo]);
                TreasureTipsView.HideTip();
            }
        };
        //脱装
        TreasureTipsView.prototype.onClickTZ = function () {
            if (this._treasureVo) {
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.TREASURE_OPERATION), [game.TreasureOperation.takeoff, [this._treasureVo]]);
                TreasureTipsView.HideTip();
            }
        };
        // 穿戴
        TreasureTipsView.prototype.onClickWear = function () {
            var isChoose = this._args && this._args["chooseFlag"];
            if (isChoose) {
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.CHOOSE_TREASURE), this._treasureVo);
                TreasureTipsView.HideTip();
            }
            else {
                if (this._godVo && this._treasureVo) {
                    dispatchEvt(new game.TreasureEvent(game.TreasureEvent.TREASURE_OPERATION), [game.TreasureOperation.wear, [this._godVo, this._treasureVo]]);
                    TreasureTipsView.HideTip();
                }
            }
        };
        TreasureTipsView.prototype.getBtnWear = function () {
            return this._btnWear;
        };
        TreasureTipsView.prototype.getBtnStreng = function () {
            return this._baseBtn;
        };
        TreasureTipsView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.clear();
            this._godVo = null;
            this._treasureVo = null;
            this._isShowAllBtn = false;
            this._args = null;
        };
        return TreasureTipsView;
    }(ui.equip.EquipTipsUI));
    game.TreasureTipsView = TreasureTipsView;
})(game || (game = {}));
