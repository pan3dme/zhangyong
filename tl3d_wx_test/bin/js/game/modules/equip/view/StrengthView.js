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
    var StrengthView = /** @class */ (function (_super) {
        __extends(StrengthView, _super);
        function StrengthView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_next.on(Laya.Event.CLICK, _this, _this.switch, [1]);
            _this.btn_last.on(Laya.Event.CLICK, _this, _this.switch, [-1]);
            _this.btn_once.on(Laya.Event.CLICK, _this, _this.equipStrength, [iface.tb_prop.equipStthTypeKey.one]);
            _this.btn_five.on(Laya.Event.CLICK, _this, _this.equipStrength, [iface.tb_prop.equipStthTypeKey.five]);
            return _this;
        }
        StrengthView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView(this.dataSource);
        };
        StrengthView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView(this.dataSource);
        };
        StrengthView.prototype.initView = function (data) {
            this.dataSource = data;
            this.ui_itemBox.dataSource = data;
            this.btn_last.disabled = data.slot == 1;
            this.btn_next.disabled = data.slot == 4;
            var level = data.getStrengthLv();
            var isMaxLv = level == tb.TB_equip_set.get_TB_equip_setById().strength_maxlevel;
            this.lab_nextLevel.visible = this.imgArrow.visible = !isMaxLv;
            this.lab_name.changeText(data.tab_item.name);
            this.lab_nowLevel.changeText(level.toString());
            this.lab_nextLevel.changeText((level + 1).toString());
            this.list_proprety.array = this.getCurLvAndNextLvAttri(data);
            this.oneList.array = isMaxLv ? null : CostVo.createCostVos(data.strengthCost());
            this.fiveList.array = isMaxLv ? null : CostVo.createCostVos(data.strengthCost(5));
            var model = game.EquipModel.getInstance();
            this.btn_last.visible = model.showEquipByView != EquipType.BAG_VIEW;
            this.btn_next.visible = model.showEquipByView != EquipType.BAG_VIEW;
            this.btn_once.gray = this.btn_five.gray = !App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
            this.bgPanel.dataSource = { uiName: UIConst.Equip_StrengthView, closeOnSide: this.isModelClose };
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateView, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateView, this);
        };
        StrengthView.prototype.updateView = function () {
            this.initView(this.dataSource);
        };
        /**当前等级和下一等级的属性 */
        StrengthView.prototype.getCurLvAndNextLvAttri = function (equipVo) {
            var curAttri = equipVo.getStrengthAttr();
            var nextAttri = equipVo.getStrengthAttr(1);
            var arrAttstr = game.EquipModel.getInstance().arrLongAttriName;
            var equipAttri = new Array();
            for (var i in curAttri) {
                var attri = {};
                attri['name'] = arrAttstr[Number(i)];
                attri['value'] = curAttri[i];
                attri['nextValue'] = nextAttri[i] || 0;
                equipAttri.push(attri);
            }
            return equipAttri;
        };
        /**强化 */
        StrengthView.prototype.equipStrength = function (type) {
            if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
                showToast(tbData.prompt);
                return;
            }
            var data = this.dataSource;
            if (data.getStrengthLv() >= game.EquipModel.getInstance().tbEquipSet.strength_maxlevel) {
                showToast(LanMgr.getLan("", 10306));
                return;
            }
            var godVo = App.hero.getGodVoById(data.godId);
            // if(godVo && !godVo.isHaveLowEquip(EquipTabType.strength)){
            // 	showToast("装备强化等级不能超过英雄等级");
            //     return;
            // }
            var cost = type == iface.tb_prop.equipStthTypeKey.one ? this.oneList.array : this.fiveList.array;
            var notCost = cost.find(function (vo) { return vo.isNotHaveCost(); });
            if (notCost) {
                showToast(LanMgr.getLan("", Lans.cost, notCost.itemId));
                return;
            }
            var obj = { type: type, uuid: data.uuid, godId: godVo.uuid };
            dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.STRENGTH]);
        };
        /**切换装备 */
        StrengthView.prototype.switch = function (type) {
            var obj = { equip: this.dataSource, type: type };
            dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.SWITCH]);
        };
        StrengthView.prototype.playeff = function () {
            this.ani_succ.play(0, false);
        };
        StrengthView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.list_proprety.array = null;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateView, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateView, this);
        };
        return StrengthView;
    }(ui.equip.EquipStrengthenUI));
    game.StrengthView = StrengthView;
})(game || (game = {}));
