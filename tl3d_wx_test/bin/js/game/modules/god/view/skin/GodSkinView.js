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
    var GodSkinView = /** @class */ (function (_super) {
        __extends(GodSkinView, _super);
        function GodSkinView() {
            return _super.call(this) || this;
        }
        GodSkinView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12220) };
            this.lbAttr.text = "";
            this.skinList.array = null;
            this.skinList.selectedIndex = -1;
            this.skinList.selectEnable = true;
            this.skinList.renderHandler = new Handler(this, this.onSkinRender);
            this.skinList.selectHandler = new Handler(this, this.selectHandler);
            this.btnWear.on(Laya.Event.CLICK, this, this.onWear);
            if (this.skinList.scrollBar) {
                this.skinList.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange);
            }
            this._uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this._uiScene);
            this._uiScene.setModelBox(this, this.lbName, this.lbDesc);
            this._listUIScene = new Base2dSceneLayerExt();
            this.skinPanel.addChild(this._listUIScene);
            this.skinPanel.mouseEnabled = false;
            this.skinPanel.hScrollBarSkin = "";
            this.bgPanel.box_Content.addChild(this.img_bg);
            this.bgPanel.box_Content.addChild(this.skinList);
            this.btn_rotateleft.on(Laya.Event.CLICK, this, this.rotateModel, [1]);
            this.btn_rotateright.on(Laya.Event.CLICK, this, this.rotateModel, [2]);
        };
        GodSkinView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        GodSkinView.prototype.show = function () {
            _super.prototype.show.call(this);
            this.initView();
        };
        GodSkinView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.renderSkinPanel();
        };
        GodSkinView.prototype.close = function () {
            _super.prototype.close.call(this);
            this._uiScene.onExit();
            this._listUIScene.onExit();
            this.skinList.array = null;
            this.skinList.selectedIndex = -1;
            Laya.timer.clearAll(this);
            this._godVo = null;
            this._tbGod = null;
        };
        GodSkinView.prototype.initView = function () {
            var _this = this;
            this._uiScene.onShow();
            this._listUIScene.onShow();
            this._isOpenByTujian = UIMgr.hasStage(UIConst.TujianView);
            var dataAry = this.dataSource;
            if (dataAry[0] instanceof GodItemVo) {
                this._godVo = dataAry[0];
            }
            else if (dataAry[0] instanceof tb.TB_god) {
                this._tbGod = dataAry[0];
            }
            var tbGod = this._godVo ? this._godVo.tab_god : this._tbGod;
            var skinList = tbGod.getSkinList();
            var ary = skinList.map(function (skinVo) {
                return { godVo: _this._godVo, skinVo: skinVo };
            });
            this.skinList.array = ary;
            if (this.skinList.scrollBar) {
                this.skinList.scrollBar.touchScrollEnable = ary.length > 3;
            }
            var index = 0;
            var skinId = 0;
            if (dataAry.length >= 2) {
                skinId = dataAry[1];
            }
            else {
                skinId = this._godVo ? this._godVo.skinId : 0;
            }
            index = skinList.findIndex(function (vo) {
                return vo.skinId == skinId;
            });
            index = index == -1 ? 0 : index;
            this.skinList.selectedIndex = index;
        };
        /** 选择 */
        GodSkinView.prototype.selectHandler = function (index) {
            if (index == -1)
                return;
            this.updateView();
        };
        GodSkinView.prototype.onSkinRender = function (cell, index) {
            if (!cell)
                return;
            var isSelect = this.skinList.selectedIndex == index;
            cell.imgDi.visible = isSelect;
            if (isSelect) {
                cell.ani1.play(0, true);
            }
            else {
                cell.ani1.gotoAndStop(0);
            }
        };
        GodSkinView.prototype.updateView = function (refreshModel) {
            if (refreshModel === void 0) { refreshModel = true; }
            var index = this.skinList.selectedIndex;
            if (index == -1)
                return;
            var info = this.skinList.array[index];
            var skinVo = info ? info['skinVo'] : null;
            if (!info || !skinVo)
                return;
            this.lbName.text = skinVo.getName();
            var tbGod = this._godVo ? this._godVo.tab_god : this._tbGod;
            var isActivity = this._godVo ? skinVo.isActivity(this._godVo.awakenLv) : false;
            this.costItem.visible = this.lbCost.visible = this.lbHas.visible = false;
            this.lbAttr.text = "";
            var attrAry = skinVo.getTbAttrStrAry();
            if (attrAry) {
                for (var i = 0; i < attrAry.length; i++) {
                    this.lbAttr.text += (attrAry[i][0] + " " + attrAry[i][1]) + (i == attrAry.length - 1 ? "" : "      ");
                }
            }
            if (refreshModel) {
                Laya.timer.once(300, this, this.delayShow, [skinVo.getModelId()]);
            }
            if (this._isOpenByTujian) {
                this.btnWear.visible = false;
                this.lbDesc.visible = true;
                this.lbDesc.text = skinVo.getCondition();
                return;
            }
            this.canActivityRP.visible = skinVo.isCanActivity();
            if (isActivity) {
                var isWear = skinVo.isWear(this._godVo.skinId);
                this.lbDesc.visible = isWear;
                this.lbDesc.text = LanMgr.getLan("", 12365);
                this.btnWear.visible = !isWear;
                this.btnWear.label = LanMgr.getLan("", 12366);
            }
            else {
                if (skinVo.skinId == game.GodSkinType.awaken) {
                    this.btnWear.visible = false;
                    this.lbDesc.visible = true;
                    this.lbDesc.text = LanMgr.getLan("", 12361, tb.TB_god_set.get_TB_god_set().awake_section);
                }
                else {
                    // 付费
                    var isNeedCost = skinVo.isNeedCost();
                    if (isNeedCost) {
                        this.btnWear.visible = true;
                        this.btnWear.label = LanMgr.getLan("", 12367);
                        this.lbDesc.visible = false;
                        this.costItem.visible = this.lbCost.visible = this.lbHas.visible = true;
                        this.costItem.dataSource = skinVo.costVo;
                        this.lbCost.text = "/" + skinVo.costVo.count;
                        var has = App.hero.getBagItemNum(skinVo.costVo.id);
                        this.lbHas.text = has + "";
                        this.lbHas.color = has >= skinVo.costVo.count ? ColorConst.normalFont : ColorConst.RED;
                    }
                    else {
                        this.btnWear.visible = false;
                        this.lbDesc.visible = true;
                        this.lbDesc.text = LanMgr.getLan("", 12362);
                    }
                }
            }
        };
        /** 穿戴 */
        GodSkinView.prototype.onWear = function () {
            var _this = this;
            if (!this._godVo)
                return;
            var godVo = this._godVo;
            var info = this.skinList.array[this.skinList.selectedIndex];
            var skinVo = info ? info['skinVo'] : null;
            if (!godVo || !info || !skinVo)
                return;
            // 穿戴
            if (skinVo.isActivity(godVo.awakenLv) && !skinVo.isWear(godVo.skinId)) {
                var arg = {};
                arg[Protocol.game_god_setGodSkinId.args.godId] = godVo.uuid;
                arg[Protocol.game_god_setGodSkinId.args.skinId] = skinVo.skinId;
                PLC.request(Protocol.game_god_setGodSkinId, arg, function (data) {
                    if (!data)
                        return;
                    _this.updateView(false);
                    _this.skinList.refresh();
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        var view = UIMgr.getUIByName(UIConst.God_MainView);
                        view.godView.refreshModel();
                    }
                    dispatchEvt(new game.GodEvent(game.GodEvent.WEAR_SUCCESS));
                });
            }
            else if (!skinVo.isActivity(godVo.awakenLv) && skinVo.isNeedCost()) {
                if (!App.isEnough(skinVo.costVo.id, skinVo.costVo.count)) {
                    showToast(LanMgr.getLan("", 10373));
                    return;
                }
                // 激活
                var arg = {};
                arg[Protocol.game_god_activeGodSkin.args.godId] = godVo.uuid;
                arg[Protocol.game_god_activeGodSkin.args.skinId] = skinVo.skinId;
                PLC.request(Protocol.game_god_activeGodSkin, arg, function (data) {
                    if (!data)
                        return;
                    _this.updateView(false);
                    _this.skinList.refresh();
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        var view = UIMgr.getUIByName(UIConst.God_MainView);
                        view.godView.refreshModel();
                    }
                    dispatchEvt(new game.GodEvent(game.GodEvent.WEAR_SUCCESS));
                });
            }
        };
        /** 延迟展示模型（延迟主要为了定位） */
        GodSkinView.prototype.delayShow = function (modeid) {
            var point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            this._uiScene.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, point.y - Launch.offsetY - 50, 180, 2.7);
            this._uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        //向右 2 向左 1
        GodSkinView.prototype.rotateModel = function (dir) {
            this._uiScene.sceneChar.rotationY = dir == 1 ? this._uiScene.sceneChar.rotationY - 15 : this._uiScene.sceneChar.rotationY + 15;
        };
        /** 渲染所有皮肤模型 */
        GodSkinView.prototype.renderSkinPanel = function () {
            var _this = this;
            var ary = [];
            for (var i = 0; i < this.skinList.array.length; i++) {
                var obj = this.skinList.array[i];
                if (obj && obj.skinVo) {
                    ary.push(obj.skinVo);
                }
            }
            for (var i = 0; i < ary.length; i++) {
                Laya.timer.once(i * 50, this, function (modeid, index) {
                    _this.skinPanelShow(modeid, index);
                }, [game.GodUtils.getGodModel(ary[i].skinId, ary[i].tbGod), i]);
            }
        };
        GodSkinView.prototype.skinPanelShow = function (modeid, index) {
            if (!modeid)
                return;
            var point = this.skinPanel.localToGlobal(new Laya.Point(0, 0));
            var px = point.x + index * 204 + this.skinList.spaceX * index + 102 - Launch.offsetX;
            var py = point.y + 220 - Launch.offsetY;
            this._listUIScene.addModelChar(modeid, px, py, 180, 1.3);
        };
        GodSkinView.prototype.onScrollChange = function () {
            if (this.skinList.scrollBar) {
                this._listUIScene.x = -this.skinList.scrollBar.value;
            }
        };
        return GodSkinView;
    }(ui.god.GodSkinUI));
    game.GodSkinView = GodSkinView;
})(game || (game = {}));
