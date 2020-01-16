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
    var EquipView = /** @class */ (function (_super) {
        __extends(EquipView, _super);
        function EquipView() {
            var _this = _super.call(this) || this;
            _this._initIndex = -1;
            //分页切换
            _this._oldIndex = -1;
            _this._isplayTurnPan = false;
            /**
             * 选择英雄
             * @param index
             */
            _this._oldGodSelect = -1;
            _this._model = game.EquipModel.getInstance();
            _this.group = UIConst.hud_group;
            _this.list_tab.array = _this._model.equipTabName;
            _this.list_roles.renderHandler = new Handler(_this, _this.onRender);
            _this.list_tab.mouseHandler = new Handler(_this, _this.onMouseIndex);
            _this.list_tab.renderHandler = new Handler(_this, _this.onRenderIndex);
            _this.list_roles.selectHandler = new Handler(_this, _this.onGodSelect);
            _this.btnFenjie.on(Laya.Event.CLICK, _this, _this.onFenjie);
            return _this;
        }
        EquipView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.EQUIPMENT);
        };
        EquipView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.view_list.height = h;
            this.viewBaoshi.height = h - this.view_list.y;
            this.viewEquip.height = h - this.view_list.y;
            this.boxTop.y = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
        };
        //打开面板
        EquipView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this._oldIndex = -1;
            this.initView();
            var topy = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
            UIUtil.boxUpDownTween(this.boxTop, -this.boxTop.height, topy, false, 310, 0.1);
            var targetY = this.height - this.boxTab.height - 90;
            UIUtil.boxUpDownTween(this.boxTab, targetY + this.boxTab.height, targetY, true, 310, 0.05);
            // 注意：因为每次打开装备界面都是定位装备的tab界面，所以用viewEquip
            var boxY = this.viewEquip.height - this.viewEquip.boxBottom.height - 89;
            UIUtil.boxUpDownTween(this.viewEquip.boxBottom, boxY + this.viewEquip.boxBottom.height, boxY, true, 310, 0.05);
            ResUseMgr.loadRes([ResConst.atlas_strength_effect]);
        };
        Object.defineProperty(EquipView.prototype, "curVo", {
            get: function () {
                return this.list_roles.array[this.list_roles.selectedIndex];
            },
            enumerable: true,
            configurable: true
        });
        EquipView.prototype.initView = function () {
            this._initIndex = Array.isArray(this.dataSource) ? this.dataSource[0] : -1;
            // 引导也是使用getGodAry去定位英雄，有更改需通知
            this.list_roles.array = App.hero.getGodAry().concat(null);
            this.list_roles.selectedIndex = 0;
        };
        EquipView.prototype.onMouseIndex = function (evt, index, play) {
            if (play === void 0) { play = false; }
            var data;
            if (!evt || evt.type == Laya.Event.CLICK) {
                if (this._isplayTurnPan && evt) {
                    if (this._oldIndex == -1) {
                        this.onMouseIndex(evt, 0, play);
                    }
                    else {
                        this.list_tab.selectedIndex = this._oldIndex;
                    }
                    return;
                }
                if (evt) {
                    data = this.list_tab.selection;
                }
                if (data && data.img_suo.dataSource) {
                    var sysId = data.img_suo.dataSource;
                    var tbData = tb.TB_sys_open.get_TB_sys_openById(sysId);
                    if (tbData && !App.IsSysOpen(sysId)) {
                        showToast(tbData.prompt);
                        if (this._oldIndex == -1) {
                            this.onMouseIndex(evt, 0, play);
                        }
                        else {
                            this.list_tab.selectedIndex = this._oldIndex;
                        }
                        return;
                    }
                }
                var type = index;
                // if (type == EquipTabType.baoshi && this.curVo.equipKeys.length == 0) {
                //     showToast("穿戴装备后才能进行宝石相关操作");
                //     if (this._oldIndex == -1){
                //         this.onMouseIndex(evt, 0, play);
                //     }else{
                //         this.list_tab.selectedIndex = this._oldIndex;
                //     }
                //     return;
                // }
                this.btnFenjie.visible = type != EquipTabType.baoshi;
                this.list_tab.selectedIndex = index;
                var playTurn = play || (evt && index >= 0 && index != this._oldIndex);
                this._oldIndex = index;
                this.list_tab.cells.forEach(function (element, idx) {
                    var irender = element;
                    irender.btn_name.labelSize = index == idx ? 24 : 22;
                    irender.btn_name.labelColors = index == idx ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
                });
                if (index >= 1)
                    index = index - 1;
                var oldSelection = this.view_list.selection;
                if (oldSelection) {
                    oldSelection['close']();
                }
                this.view_list.selectedIndex = index;
                this.view_list.items[index].dataSource = this.curVo;
                var curSelection = this.view_list.selection;
                if (curSelection) {
                    curSelection['init'](type);
                    dispatchEvt(new game.EquipEvent(game.EquipEvent.SWITCH_TAB_SUCCESS), type);
                }
                if (playTurn) {
                    this.playTurnPan();
                }
            }
        };
        EquipView.prototype.playTurnPan = function () {
            var curSelection = this.view_list.selection;
            if (curSelection) {
                this._isplayTurnPan = true;
                curSelection["playEquipEff"](this.stopTurnPan.bind(this));
            }
            else {
                this._isplayTurnPan = false;
            }
        };
        EquipView.prototype.stopTurnPan = function () {
            this._isplayTurnPan = false;
        };
        EquipView.prototype.onGodSelect = function (index) {
            if (!this.list_roles.array[index]) {
                dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_ZHAOHUAN_PANEL));
                return;
            }
            // if (this.list_tab.selectedIndex == 2 && this.list_roles.array[index].equipKeys.length == 0) {
            //     showToast("穿戴装备后才能进行宝石相关操作");
            //     this.list_roles.selectedIndex = this._oldGodSelect;
            //     return;
            // }
            this._oldGodSelect = this.list_roles.selectedIndex;
            this._model.curShowGod = this.list_roles.array[index];
            dispatchEvt(new game.GodEvent(game.GodEvent.SELECT_GOD_EVENT));
            this.list_tab.refresh();
            var curTabIndex = this.list_tab.selectedIndex;
            if (this._initIndex >= 0) {
                this.onMouseIndex(null, this._initIndex, true);
                this._initIndex = -1;
            }
            else if (curTabIndex != -1) {
                this.onMouseIndex(null, curTabIndex, true);
            }
            else {
                this.onMouseIndex(null, 0, true);
            }
        };
        /** 刷新列表中的某一个数据 */
        EquipView.prototype.refreshData = function (modifyGod) {
            var _this = this;
            if (modifyGod) {
                var godVo = App.hero.getGodAry().find(function (vo) {
                    return vo.uuid == _this.curVo.uuid;
                });
                if (godVo)
                    this.curVo.equipKeys = godVo.equipKeys;
            }
            this.onMouseIndex(null, this.list_tab.selectedIndex);
            if (this.viewEquip.visible) {
                this.viewEquip.refreshGod();
            }
        };
        EquipView.prototype.onFenjie = function () {
            dispatchEvt(new game.BagEvent(game.BagEvent.OPEN_SELL_VIEW));
        };
        EquipView.prototype.onRenderIndex = function (item, index) {
            if (!this.curVo || !item.dataSource)
                return;
            item.img_suo.visible = false;
            if (item.dataSource[1] != 0) {
                item.img_suo.visible = !App.IsSysOpen(item.dataSource[1]);
                item.img_suo.dataSource = item.dataSource[1];
            }
            item.btn_name.selected = index == this.list_tab.selectedIndex && !item.img_suo.visible ? true : false;
            if (!item.img_suo.visible)
                item.tabRedPoint.setRedPointName(this._model.equiptabredName[index] + "_" + this.curVo.uuid);
            else
                item.tabRedPoint.onDispose();
        };
        /**
         * 渲染英雄列表
         * @param itemRender
         * @param index
         */
        EquipView.prototype.onRender = function (itemRender, index) {
            var headBox = itemRender.headBox;
            headBox.visible = itemRender.dataSource ? true : false;
            itemRender.box_null.visible = !headBox.visible;
            var data = this.list_roles.array[index];
            if (!data)
                return;
            headBox.img_shangzhen.visible = data.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            itemRender.redPoint.onDispose();
            if (itemRender.dataSource && App.hero.isInLineup(itemRender.dataSource.uuid, iface.tb_prop.lineupTypeKey.attack)) {
                itemRender.redPoint.setRedPointName("attack_linuep_god_equip_" + itemRender.dataSource.uuid);
            }
        };
        /** 关闭面板 */
        EquipView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.viewBaoshi.stopEquipEff();
            this.viewEquip.stopEquipEff();
            this.viewEquip.close();
            this.viewBaoshi.close();
            this.list_roles.array = null;
            this.list_tab.selectedIndex = -1;
            this.stopTurnPan();
        };
        return EquipView;
    }(ui.equip.EquipViewUI));
    game.EquipView = EquipView;
})(game || (game = {}));
