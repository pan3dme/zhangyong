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
    /** 觉醒 */
    var godTabAwakeView = /** @class */ (function (_super) {
        __extends(godTabAwakeView, _super);
        function godTabAwakeView() {
            var _this = _super.call(this) || this;
            _this.godList.mouseHandler = new Handler(_this, _this.openChoose);
            _this.attrList.renderHandler = new Handler(_this, _this.attrRenderHandler);
            _this.btn_juexing.on(Laya.Event.CLICK, _this, _this.onAwaken);
            _this.btnLook.on(Laya.Event.CLICK, _this, _this.onLook);
            _this._needInit = true;
            return _this;
        }
        Object.defineProperty(godTabAwakeView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                var oldVo = this._dataSource;
                if (oldVo && $value && oldVo.uuid == $value.uuid) {
                    this._needInit = false;
                }
                else {
                    this._needInit = true;
                }
                this._dataSource = $value;
            },
            enumerable: true,
            configurable: true
        });
        /** 初始化 */
        godTabAwakeView.prototype.init = function () {
            if (!this._dataSource)
                return;
            this.initView();
        };
        godTabAwakeView.prototype.close = function () {
            Laya.timer.clearAll(this);
            this._dataSource = null;
            this._needInit = true;
            this.itemList.array = null;
            this.godList.array = null;
            this.attrList.array = null;
            this.redpoint.onDispose();
        };
        godTabAwakeView.prototype.initView = function () {
            var godVo = this.dataSource;
            if (!godVo || !this._needInit)
                return;
            this._needInit = false;
            this.redpoint.onDispose();
            if (godVo.isInLinuep(iface.tb_prop.lineupTypeKey.attack)) {
                this.redpoint.setRedPointName("god_awaken_" + godVo.uuid);
            }
            this.lbUnlock.visible = this.btnLook.visible = godVo.tab_god.isCanAwaken();
            this.lbUnlock.text = LanMgr.getLan("", 12360, tb.TB_god_set.get_TB_god_set().awake_section);
            this.refreshJuexing();
        };
        /** 刷新觉醒加成属性及材料 */
        godTabAwakeView.prototype.refreshJuexing = function () {
            var _this = this;
            var godItem = this.dataSource;
            if (!godItem)
                return;
            var tbCondi = tb.TB_awaken_conditions.getTbById(godItem.starLevel);
            this.lbCurLv.text = "" + godItem.awakenLv;
            this.lbMaxLv.text = "/" + tbCondi.awake_section_max;
            this.awakenHbox.refresh();
            var curAwaken = tb.TB_god_awaken.getTbById(godItem.awakenLv);
            var nextAwaken = tb.TB_god_awaken.getTbById(godItem.awakenLv + 1);
            var items = curAwaken.getMaterialList();
            var gods = curAwaken.getGodMaterialList().map(function (vo) {
                return new game.GodMaterialVo(vo, _this.dataSource);
            });
            var spaceAry = [0, 50, 40, 30, 20, 20, 20, 20, 20];
            var space = spaceAry[items.length + gods.length];
            space = space <= 20 ? 20 : space;
            this.itemList.array = items;
            this.itemList.spaceX = space;
            this.itemList.repeatX = items.length;
            this.itemList.width = items.length * 100 + (items.length - 1) * this.itemList.spaceX;
            this.godList.array = gods;
            Laya.timer.callLater(this, this.refreshGodList);
            this.godList.spaceX = space;
            this.godList.repeatX = gods.length;
            this.godList.width = gods.length == 0 ? 1 : gods.length * 100 + (gods.length - 1) * this.godList.spaceX;
            var jiange = gods.length == 0 ? 0 : space;
            this.itemList.x = this.width / 2 - (this.godList.width + this.itemList.width + jiange) / 2;
            this.godList.x = this.itemList.x + this.itemList.width + jiange;
            this._attrToast = [];
            // 属性数组 -- 默认
            var resultAry = [];
            for (var i = 0; i < curAwaken.attr.length; i++) {
                var ary = curAwaken.attr[i];
                var type = ary[0];
                var val = ary[1];
                var nextVal = nextAwaken ? nextAwaken.getAttrValue(type) : 0;
                // 加成值：未达到最大值时显示加成，达到最大值时不显示（-1表示）
                var addVal = godItem.awakenLv < godItem.maxAwakenLv ? (nextVal - val) : -1;
                resultAry.push([type, val, addVal]);
                if (addVal > 0) {
                    this._attrToast.push(iface.tb_prop.attrType[type] + "+" + addVal);
                }
            }
            this.attrList.array = resultAry;
            var isMax = godItem.awakenLv >= godItem.maxAwakenLv;
            this.btn_juexing.visible = this.itemList.visible = this.godList.visible = !isMax;
            this.maxLvNoticeBox.visible = isMax;
            this.imgDi.y = isMax ? 255 : 205;
        };
        /** 属性渲染 */
        godTabAwakeView.prototype.attrRenderHandler = function (box, index) {
            var imgAttr = box.getChildByName("imgAttr");
            var lbAttrVal = box.getChildByName("lbAttrVal");
            lbAttrVal.autoSize = true;
            var lbNextAdd = box.getChildByName("lbNextAdd");
            lbNextAdd.autoSize = true;
            var data = box.dataSource;
            if (data) {
                imgAttr.skin = SkinUtil.getAttrSkin(data[0]);
                lbAttrVal.text = data[1];
                lbNextAdd.text = "(+" + data[2] + ")";
                lbNextAdd.visible = data[2] != -1;
                if (lbNextAdd.visible) {
                    var textWth = lbAttrVal.width + lbNextAdd.width + 34 + 10;
                    imgAttr.x = 152 / 2 - textWth / 2 + 17;
                    lbAttrVal.x = imgAttr.x + 17 + 5;
                    lbNextAdd.x = lbAttrVal.x + lbAttrVal.width + 5;
                }
                else {
                    var textWth = lbAttrVal.width + 34 + 5;
                    imgAttr.x = 152 / 2 - textWth / 2 + 17;
                    lbAttrVal.x = imgAttr.x + 17 + 5;
                }
            }
        };
        /** 刷新道具材料列表 */
        godTabAwakeView.prototype.refereshItemList = function () {
            this.itemList.refresh();
        };
        /** 刷新神灵材料列表 */
        godTabAwakeView.prototype.refreshGodList = function () {
            for (var _i = 0, _a = this.godList.cells; _i < _a.length; _i++) {
                var item = _a[_i];
                item.refreshData(this.godList.array);
            }
        };
        /**  点击觉醒 */
        godTabAwakeView.prototype.onAwaken = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.GodEvent(game.GodEvent.CLICK_JUEXING_EVENT), [this.dataSource, this.godList.array]);
        };
        /** 查看觉醒模型 */
        godTabAwakeView.prototype.onLook = function () {
            if (!this.dataSource)
                return;
            UIMgr.showUI(UIConst.GodSkinView, [this.dataSource, -1]);
        };
        godTabAwakeView.prototype.openChoose = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var item = this.godList.getCell(index);
                var info = item.dataSource;
                if (info) {
                    var ary = [];
                    var godList = this.godList.array;
                    for (var _i = 0, godList_1 = godList; _i < godList_1.length; _i++) {
                        var vo = godList_1[_i];
                        if (vo != info) {
                            ary.push.apply(ary, vo.choose);
                        }
                    }
                    var listdata = game.GodUtils.filterGods(info.tbVo, info.curGod, ary);
                    if (listdata.length > 0) {
                        var obj = { allList: listdata, curMaterail: info, openType: ChooseOpenType.awaken };
                        UIMgr.showUI(UIConst.God_ChooseGodView, obj);
                    }
                    else {
                        showToast(LanMgr.getLan("", 10368));
                    }
                }
            }
        };
        godTabAwakeView.prototype.getAttrToast = function () {
            return this._attrToast;
        };
        /**
         * 渲染星星
         */
        godTabAwakeView.prototype.onXingjiRender = function (cell, index) {
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
        return godTabAwakeView;
    }(ui.god.tab.TabJuexingUI));
    game.godTabAwakeView = godTabAwakeView;
})(game || (game = {}));
