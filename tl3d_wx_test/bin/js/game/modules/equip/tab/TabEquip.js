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
    var EquipRoot;
    (function (EquipRoot) {
        /**一键装备 */
        EquipRoot[EquipRoot["Wear"] = 1] = "Wear";
        /**一键强化 */
        EquipRoot[EquipRoot["Strength"] = 2] = "Strength";
        /**一键精炼 */
        EquipRoot[EquipRoot["Refine"] = 3] = "Refine";
        /**一键卸下 */
        EquipRoot[EquipRoot["TakeOff"] = 4] = "TakeOff";
    })(EquipRoot = game.EquipRoot || (game.EquipRoot = {}));
    var TabEquip = /** @class */ (function (_super) {
        __extends(TabEquip, _super);
        function TabEquip() {
            var _this = _super.call(this) || this;
            _this.equippos = [0, 0, 304, 0, 0, 244, 304, 244];
            _this._isplayEff = false;
            _this.list_attr.renderHandler = new Handler(_this, _this.onAttrRender);
            _this.list_equips.mouseHandler = new Handler(_this, _this.onEquipMouse);
            _this.list_equips.renderHandler = new Handler(_this, _this.onEquipAccsItemRender);
            _this.list_equips.selectEnable = false;
            _this.btn_strengthMaster.on(Laya.Event.CLICK, _this, _this.openMasterView);
            _this.btn_getRefine.on(Laya.Event.CLICK, _this, _this.openJumpView, [CostTypeKey.jinglianshi]);
            _this.btn_getStrengh.on(Laya.Event.CLICK, _this, _this.openJumpView, [CostTypeKey.qianghuashi]);
            _this.btn_wear.on(Laya.Event.CLICK, _this, _this.quick, [EquipRoot.Wear]);
            _this.btn_takeoff.on(Laya.Event.CLICK, _this, _this.quick, [EquipRoot.TakeOff]);
            _this.btn_strength.on(Laya.Event.CLICK, _this, _this.quick, [EquipRoot.Strength]);
            _this.btn_rootRefine.on(Laya.Event.CLICK, _this, _this.quick, [EquipRoot.Refine]);
            _this.refineCkbox.selected = _this.strengCkbox.selected = false;
            _this.btnSuit.on(Laya.Event.CLICK, _this, _this.onSuit);
            return _this;
        }
        TabEquip.prototype.setSize = function () {
            // let listY = this.height/2 - this.list_equips.height/2 + this.list_equips.centerY;
            // let listX = this.width/2 - this.list_equips.width/2 + this.list_equips.centerX;
        };
        Object.defineProperty(TabEquip.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
            },
            enumerable: true,
            configurable: true
        });
        TabEquip.prototype.init = function (type) {
            this.curType = type;
            this.setResEvent(true);
            this.setEquipAccsItemData();
            this.box_refine.visible = type == EquipTabType.refine;
            this.box_strength.visible = type == EquipTabType.strength;
            this.strengCkbox.visible = this.btn_strength.visible = this.btn_getStrengh.visible = App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
            if (!this.dataSource.isAllEquipLvTop(EquipTabType.strength)) {
                this.list_attr.array = this.dataSource.getCurLvAttriAndNext(type == EquipTabType.strength ? 1 : 0);
                this.img_arrow.visible = true;
                this.list_attr.x = 145;
            }
            else {
                var arr = this.dataSource.getCurLvAttriAndNext(type == EquipTabType.strength ? 1 : 0);
                arr[1] = arr[3] = arr[5] = null;
                this.list_attr.array = arr;
                this.img_arrow.visible = false;
                this.list_attr.x = 265;
            }
            var godVo = this.dataSource;
            this.strengthRP.setRedPointName("god_onekey_strength_" + godVo.uuid);
            this.equipRP.setRedPointName("god_onekey_equip_" + godVo.uuid);
            this.redpointRefine.setRedPointName("god_onekey_refine_" + godVo.uuid);
            type == EquipTabType.strength ? this.setStrengthView() : this.setRefineView();
            this.refreshGod();
        };
        TabEquip.prototype.refreshGod = function () {
            this.updateSuit();
            this.updateDaShi();
        };
        TabEquip.prototype.updateDaShi = function () {
            var godVo = this.dataSource;
            if (this.curType == EquipTabType.strength) {
                var qhlv = godVo.countMasterLevel();
                this.lab_dashi.text = qhlv == 0 ? LanMgr.getLan("", 12448) : LanMgr.getLan("", 12435, qhlv);
            }
            else {
                var jllv = godVo.refineMasterLevel();
                this.lab_dashi.text = jllv == 0 ? LanMgr.getLan("", 12449) : LanMgr.getLan("", 12436, jllv);
            }
        };
        TabEquip.prototype.updateSuit = function () {
            var godVo = this.dataSource;
            var ary = godVo.getMaxQualityAnNum();
            if (ary.length > 0) {
                var num = ary[1];
                switch (ary[0]) {
                    case QualityConst.RED:
                        //红装"
                        this.lab_suit.text = LanMgr.getLan("", 12601, LanMgr.getLan("", 12445), LanMgr.numChinese[num]);
                        this.lab_suit.color = ColorConst.RED;
                        break;
                    case QualityConst.ORANGE:
                        //橙装"
                        this.lab_suit.text = LanMgr.getLan("", 12601, LanMgr.getLan("", 12446), LanMgr.numChinese[num]);
                        this.lab_suit.color = "#de8a0b";
                        break;
                    case QualityConst.PURPLE:
                        //紫装
                        this.lab_suit.text = LanMgr.getLan("", 12601, LanMgr.getLan("", 12447), LanMgr.numChinese[num]);
                        this.lab_suit.color = "#ca1fe2";
                        break;
                    default:
                        this.lab_suit.text = LanMgr.getLan("", 12600);
                        this.lab_suit.color = ColorConst.normalFont;
                        break;
                }
            }
            else {
                this.lab_suit.text = LanMgr.getLan("", 12600);
                this.lab_suit.color = ColorConst.normalFont;
            }
        };
        TabEquip.prototype.onSuit = function () {
            var godVo = this._dataSource;
            if (!godVo)
                return;
            var ary = godVo.getMaxQualityAnNum();
            if (ary.length <= 0) {
                showToast(LanMgr.getLan('', 10300));
                return;
            }
            UIMgr.showUI(UIConst.Equip_SuitView, ary);
        };
        TabEquip.prototype.setCostText = function () {
            this.curType == EquipTabType.strength ? this.setStrengthView() : this.setRefineView();
        };
        TabEquip.prototype.setStrengthView = function () {
            var data = this._dataSource;
            var onceCost = data.getStrengthCost();
            this.costList.array = CostVo.createCostVos(onceCost);
            this.box_cost.visible = this.costList.array && this.costList.array.length > 0 && App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
            var isMax = data.isAllEquipLvTop(EquipTabType.strength);
            this.boxMaxLv.visible = isMax;
            this.box_strength.visible = !isMax;
        };
        TabEquip.prototype.setRefineView = function () {
            var data = this._dataSource;
            var onceCost = data.getRefineCost();
            this.costList.array = CostVo.createCostVos(onceCost);
            this.box_cost.visible = this.costList.array && this.costList.array.length > 0;
            // && !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.oneKeyRefine)
            this.btn_rootRefine.selected = this.btn_rootRefine.gray = !App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN);
            var isMax = data.isAllEquipLvTop(EquipTabType.refine);
            this.boxMaxLv.visible = isMax;
            this.box_refine.visible = !isMax;
        };
        /**
         * 设置装备饰品
         * @param data
         */
        TabEquip.prototype.setEquipAccsItemData = function (data) {
            if (!data) {
                data = this._dataSource;
            }
            var ary = [null, null, null, null];
            for (var i = 0; i < data.equipKeys.length; i++) {
                var element = data.equipKeys[i];
                element.type = this.curType;
                ary.splice(element.slot - 1, 1, element);
            }
            this.list_equips.array = ary;
        };
        TabEquip.prototype.updateView = function (data) {
            this.setEquipAccsItemData(data);
            this.curType == EquipTabType.strength ? this.setStrengthView() : this.setRefineView();
        };
        TabEquip.prototype.onAttrRender = function (cell, index) {
            if (!cell.dataSource) {
                cell.lab_attr.text = "";
                cell.img_attrname.skin = "";
                return;
            }
            cell.img_attrname.skin = SkinUtil.getAttrSkin(cell.dataSource[0]);
            cell.lab_attr.text = '+' + cell.dataSource[1];
            cell.lab_attr.color = index % 2 == 0 ? "#7e5336" : "#319c28";
        };
        /** 选择装备或饰品格子 */
        TabEquip.prototype.onEquipMouse = function (e, idx) {
            var model = game.EquipModel.getInstance();
            if (e.type == Laya.Event.CLICK) {
                var itemdata = this.list_equips.array[idx];
                if (itemdata) {
                    model.curPointEquipData = itemdata;
                    game.EquipTipsView.showTip(this.list_equips.cells[idx], itemdata);
                }
                else {
                    var hasData = App.hero.getEquips(idx + 1, true);
                    if (hasData && hasData.length > 0) {
                        model.showEquipByView = EquipType.SHENLING_VIEW;
                        dispatchEvt(new game.EquipEvent(game.EquipEvent.OPEN_EQUIP_PANEL), [idx + 1, 1]);
                    }
                    else {
                        var needId = idx == 3 ? 21013 : (idx == 2 ? 21012 : (idx == 1 ? 21011 : 21010));
                        this.openJumpView(needId);
                    }
                }
                this.list_equips.selectedIndex = -1;
            }
        };
        TabEquip.prototype.playEquipEff = function (callback) {
            this._playCallback = callback;
            this.stopEquipEff();
            this._isplayEff = true;
            for (var i = 0; i < this.list_equips.cells.length; i++) {
                var cell = this.list_equips.cells[i];
                Laya.Tween.to(cell, { x: 152, y: 122 }, 160, null);
            }
            Laya.timer.once(260, this, this.fanEquipEff);
        };
        TabEquip.prototype.fanEquipEff = function () {
            for (var i = 0; i < this.list_equips.cells.length; i++) {
                var cell = this.list_equips.cells[i];
                Laya.Tween.to(cell, { x: this.equippos[i * 2], y: this.equippos[i * 2 + 1] }, 260, null);
            }
            Laya.timer.once(260, this, this.stopEquipEff);
        };
        TabEquip.prototype.stopEquipEff = function () {
            if (this._playCallback) {
                this._playCallback();
                this._playCallback = null;
            }
            this._isplayEff = false;
            Laya.timer.clear(this, this.fanEquipEff);
            Laya.timer.clear(this, this.stopEquipEff);
            for (var i = 0; i < this.list_equips.cells.length; i++) {
                var cell = this.list_equips.cells[i];
                cell.x = this.equippos[i * 2];
                cell.y = this.equippos[i * 2 + 1];
                Laya.Tween.clearAll(cell);
            }
        };
        /**
         * 装备饰品渲染
         * @param item
         * @param index
         */
        TabEquip.prototype.onEquipAccsItemRender = function (item, index) {
            if (!this.list_equips.array)
                return;
            item.x = this.equippos[index * 2];
            item.y = this.equippos[index * 2 + 1];
            var itemData = this.list_equips.array[index];
            item.itemBox.dataSource = itemData;
            item.itemBox.visible = itemData ? true : false;
            if (itemData) {
            }
            else {
                item.ani_succ.gotoAndStop(0);
            }
            item.btn_add.visible = !itemData;
            item.img_suo.visible = false;
            item.redpoint.onDispose();
            if (this.dataSource) {
                item.redpoint.setRedPointName("god_equip_" + this.dataSource.uuid + "_" + (index + 1));
            }
        };
        /** 播放特效 */
        TabEquip.prototype.playEffect = function () {
            var slots = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                slots[_i] = arguments[_i];
            }
            var cells = this.list_equips.cells;
            var _loop_1 = function (i) {
                var item = cells[i];
                var equipVo = item.dataSource;
                if (!equipVo)
                    return "continue";
                if (slots.indexOf(equipVo.slot) != -1) {
                    item.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(null, function () {
                        item.ani_succ.play(0, false);
                        item.ani_succ.visible = true;
                    }), ResConst.atlas_strength_effect);
                }
            };
            for (var i = 0; i < cells.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * 刷新装备或饰品格子
         * @param ndata
         */
        TabEquip.prototype.updateItem = function (ndata) {
            var slist = this.list_equips.array;
            for (var i = 0; i < slist.length; i++) {
                if (slist[i]) {
                    var element = slist[i];
                    if (ndata.uuid == element.uuid) {
                        //如果找到当前变化的符文
                        this.list_equips.array[i] = ndata;
                        this.list_equips.refresh();
                    }
                }
            }
        };
        /**打开/关闭材料更新监听 */
        TabEquip.prototype.setResEvent = function (bool) {
            if (bool) {
                tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateResoure, this);
                tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateResoure, this);
            }
            else {
                tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateResoure, this);
                tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateResoure, this);
            }
        };
        TabEquip.prototype.updateResoure = function () {
            this.callLater(this.setCostText);
        };
        /**快捷操作：强化/装备 */
        TabEquip.prototype.quick = function (type) {
            var model = game.EquipModel.getInstance();
            if (type == EquipRoot.Strength && !App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
                var tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
                showToast(tbSys.prompt);
                return;
            }
            if (type == EquipRoot.Refine && !App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
                showToast(model.getRefineOpenData().prompt);
                return;
            }
            // if (type == EquipRoot.Refine && !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.oneKeyRefine)) {
            //     let data = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.oneKeyRefine);
            //     showToast(LanMgr.getLan(`一键精炼需要VIP${data.vip_level}级或者玩家等级${data.general_level}级开启`, -1));
            //     return;
            // }
            var equips = this.dataSource.equipKeys;
            if (type == EquipRoot.TakeOff || type == EquipRoot.Refine || type == EquipRoot.Strength) { /**一键卸下拦截 */
                if (equips.length == 0) {
                    showToast(LanMgr.getLan("", 10301));
                    return;
                }
            }
            if (type == EquipRoot.Wear) { /**一键装备拦截 */
                var arrQiuck = model.equipQiuck(this._dataSource);
                if (arrQiuck.length == 0) {
                    showToast(LanMgr.getLan("", 10302));
                    return;
                }
            }
            var isFiveSelect = type == EquipRoot.Strength ? this.strengCkbox.selected : this.refineCkbox.selected;
            dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION), [type, EquipOperation.ROOT_EQUIP_CHANGE, isFiveSelect]);
        };
        /**
         * 打开强化大师界面
         */
        TabEquip.prototype.openMasterView = function (event) {
            var godVo = this.dataSource;
            if (godVo.equipKeys.length < game.EquipModel.EQUIP_COUNT) {
                var str = this.curType == 0 ? LanMgr.getLan("", 10304) : LanMgr.getLan("", 10305);
                showToast(LanMgr.getLan("", 10303, str));
            }
            else {
                UIMgr.showUI(UIConst.Equip_MasterView, [godVo, this.curType]);
            }
        };
        /**刷新装备List */
        TabEquip.prototype.resfresh = function () {
            this.list_equips.refresh();
        };
        TabEquip.prototype.openJumpView = function (type) {
            UIUtil.showJumpPanle(type);
        };
        TabEquip.prototype.close = function () {
            this.setResEvent(false);
            this.list_equips.array = null;
            game.EquipTipsView.HideTip();
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.setCostText, this);
        };
        return TabEquip;
    }(ui.equip.tab.TabEquipUI));
    game.TabEquip = TabEquip;
})(game || (game = {}));
