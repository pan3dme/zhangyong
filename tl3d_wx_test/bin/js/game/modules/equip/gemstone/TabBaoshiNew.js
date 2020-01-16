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
    var TabBaoshiNew = /** @class */ (function (_super) {
        __extends(TabBaoshiNew, _super);
        // private _curEquipUUid : string; // 存uuid获取最新的EquipItemVo（EquipItemVo会变）
        function TabBaoshiNew() {
            var _this = _super.call(this) || this;
            _this._curIdx = -1; //当前选择的装备index
            _this._isplayEff = false;
            _this.equippos = [0, 0, 304, 0, 0, 242, 304, 242];
            _this.list_equip.selectedIndex = -1;
            _this.list_equip.mouseHandler = new Handler(_this, _this.onEquipMouseSelect);
            _this.list_equip.renderHandler = new Handler(_this, _this.onEquipItemRender);
            _this.btnOnekeyUnload.on(Laya.Event.CLICK, _this, _this.onUnload);
            _this.btnOnekeyWear.on(Laya.Event.CLICK, _this, _this.onWear);
            _this.btnComp.on(Laya.Event.CLICK, _this, _this.onComp);
            return _this;
        }
        Object.defineProperty(TabBaoshiNew.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
            },
            enumerable: true,
            configurable: true
        });
        TabBaoshiNew.prototype.close = function () {
            Laya.timer.clearAll(this);
            this.list_equip.array = null;
            this.list_equip.selectedIndex = -1;
            this._curIdx = -1;
            this.gemItem1.dataSource = null;
            this.gemItem2.dataSource = null;
            this.gemItem3.dataSource = null;
        };
        TabBaoshiNew.prototype.init = function () {
            var godVo = this.dataSource;
            var ary = [];
            for (var i = 1; i <= 4; i++) {
                var equipVo = godVo.getEquipmentBySlot(i);
                var uiVo = { equipVo: equipVo, godVo: godVo, position: i };
                ary.push(uiVo);
            }
            this.list_equip.array = ary;
            // 选择已有的装备
            this._curIdx = ary.findIndex(function (vo) {
                return vo ? true : false;
            });
            this._curIdx = this._curIdx < 0 ? 0 : this._curIdx;
            this.list_equip.selectedIndex = this._curIdx;
            this.onEquipMouseSelect(null, this._curIdx, false);
        };
        /**
         * 选择装备
         * @param idx
         */
        TabBaoshiNew.prototype.onEquipMouseSelect = function (event, idx, show) {
            if (show === void 0) { show = true; }
            if (event && event.type != Laya.Event.CLICK)
                return;
            var gemUIVo = this.list_equip.getItem(idx);
            if (!gemUIVo)
                return;
            this._curIdx = idx;
            this.renderEquipInfo();
            // if (!gemUIVo.equipVo && show) {
            // 	EquipModel.getInstance().showEquipByView = EquipType.SHENLING_BAOSHI_VIEW;
            // 	dispatchEvt(new EquipEvent(EquipEvent.OPEN_EQUIP_PANEL), [idx + 1, 1]);
            // }
        };
        /** 渲染装备的宝石信息 */
        TabBaoshiNew.prototype.renderEquipInfo = function () {
            if (this._curIdx < 0)
                return;
            var gemUIVo = this.list_equip.getItem(this._curIdx);
            var godVo = this.dataSource;
            if (!gemUIVo || !godVo)
                return;
            var equipVo = gemUIVo.equipVo;
            this.lbEquipName.text = equipVo ? equipVo.tab_item.name : "";
            var ary = [];
            var slot = this._curIdx * game.GemstoneModel.gemstone_type_count + game.GemstoneType.shengming;
            this.gemItem1.dataSource = { godVo: godVo, slot: slot, equipVo: equipVo, type: game.GemstoneType.shengming, gemVo: godVo.getGemsBySlot(slot) };
            slot = this._curIdx * game.GemstoneModel.gemstone_type_count + game.GemstoneType.gongji;
            this.gemItem2.dataSource = { godVo: godVo, slot: slot, equipVo: equipVo, type: game.GemstoneType.gongji, gemVo: godVo.getGemsBySlot(slot) };
            slot = this._curIdx * game.GemstoneModel.gemstone_type_count + game.GemstoneType.fangyu;
            this.gemItem3.dataSource = { godVo: godVo, slot: slot, equipVo: equipVo, type: game.GemstoneType.fangyu, gemVo: godVo.getGemsBySlot(slot) };
            var betterGems = Object.keys(game.GemstoneUtils.getCanWearGemList(godVo)).length > 0;
            this.btnOnekeyWear.visible = betterGems;
            this.btnOnekeyUnload.visible = !betterGems;
        };
        /** 选中装备 */
        TabBaoshiNew.prototype.selectedEquip = function (equipId) {
            var uiVoList = this.list_equip.array;
            var index = uiVoList.findIndex(function (vo) {
                return vo && vo.equipVo && vo.equipVo.uuid == equipId;
            });
            if (index != -1) {
                this.list_equip.selectedIndex = index;
                this.onEquipMouseSelect(null, index);
            }
        };
        /** 播放动画 */
        TabBaoshiNew.prototype.playAnim = function (types) {
            if (this.gemItem1.dataSource && types.indexOf(this.gemItem1.dataSource.type) != -1) {
                this.gemItem1.playAnim();
            }
            if (this.gemItem2.dataSource && types.indexOf(this.gemItem2.dataSource.type) != -1) {
                this.gemItem2.playAnim();
            }
            if (this.gemItem3.dataSource && types.indexOf(this.gemItem3.dataSource.type) != -1) {
                this.gemItem3.playAnim();
            }
        };
        /** 一键卸下 */
        TabBaoshiNew.prototype.onUnload = function () {
            var godVo = this.dataSource;
            if (!godVo)
                return;
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.ONE_KEY_UNLOAD), godVo);
        };
        /** 一键镶嵌 */
        TabBaoshiNew.prototype.onWear = function () {
            var godVo = this.dataSource;
            if (!godVo)
                return;
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.ONE_KEY_WEAR), godVo);
        };
        /** 合成 */
        TabBaoshiNew.prototype.onComp = function () {
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.SHOW_COMPOUND_VIEW));
        };
        TabBaoshiNew.prototype.playEquipEff = function (callback) {
            this._playCallback = callback;
            this.stopEquipEff();
            this._isplayEff = true;
            for (var i = 0; i < this.list_equip.cells.length; i++) {
                var cell = this.list_equip.cells[i];
                Laya.Tween.to(cell, { x: 152, y: 121 }, 160, null);
            }
            Laya.timer.once(260, this, this.fanEquipEff);
        };
        TabBaoshiNew.prototype.fanEquipEff = function () {
            for (var i = 0; i < this.list_equip.cells.length; i++) {
                var cell = this.list_equip.cells[i];
                Laya.Tween.to(cell, { x: this.equippos[i * 2], y: this.equippos[i * 2 + 1] }, 260, null);
            }
            Laya.timer.once(260, this, this.stopEquipEff);
        };
        TabBaoshiNew.prototype.stopEquipEff = function () {
            if (this._playCallback) {
                this._playCallback();
                this._playCallback = null;
            }
            this._isplayEff = false;
            Laya.timer.clear(this, this.fanEquipEff);
            Laya.timer.clear(this, this.stopEquipEff);
            for (var i = 0; i < this.list_equip.cells.length; i++) {
                var cell = this.list_equip.cells[i];
                cell.x = this.equippos[i * 2];
                cell.y = this.equippos[i * 2 + 1];
                Laya.Tween.clearAll(cell);
            }
        };
        /**
         * 装备渲染
         * @param item
         * @param index
         */
        TabBaoshiNew.prototype.onEquipItemRender = function (itemIR, index) {
            if (!itemIR)
                return;
            itemIR.x = this.equippos[index * 2];
            itemIR.y = this.equippos[index * 2 + 1];
            var equipBox = itemIR.equipBox;
            var selectBox = equipBox.getChildByName("selectBox");
            selectBox.visible = this._curIdx == index;
        };
        return TabBaoshiNew;
    }(ui.equip.gemstone.TabBaoshiNewUI));
    game.TabBaoshiNew = TabBaoshiNew;
})(game || (game = {}));
