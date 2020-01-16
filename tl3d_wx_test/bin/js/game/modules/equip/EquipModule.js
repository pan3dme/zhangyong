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
    var EquipModule = /** @class */ (function (_super) {
        __extends(EquipModule, _super);
        function EquipModule() {
            return _super.call(this) || this;
        }
        EquipModule.prototype.getModuleName = function () {
            return "EquipModule";
        };
        EquipModule.prototype.listProcessors = function () {
            return [new game.EquipProcessor(), new game.GemstoneProcessor()];
        };
        EquipModule.prototype.onRegister = function () {
        };
        return EquipModule;
    }(tl3d.Module));
    game.EquipModule = EquipModule;
    var EquipEvent = /** @class */ (function (_super) {
        __extends(EquipEvent, _super);
        function EquipEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**装备的一系列操作 */
        EquipEvent.EQUIP_OPERATION = "EQUIP_WEAR_ORCHANGE";
        /** 装备强化成功 */
        EquipEvent.EQUIP_STRENGTH_SUCCESS = "EQUIP_STRENGTH_SUCCESS";
        /** 穿点装备成功 */
        EquipEvent.WEAR_EQUIPMENT_SUCCESS = "WEAR_EQUIPMENT_SUCCESS";
        /** 一键穿戴成功 */
        EquipEvent.ONEKE_WEAR_SUCCESS = "ONEKE_WEAR_SUCCESS";
        /** 一键强化成功 */
        EquipEvent.ONEKE_STRENGTH_SUCCESS = "ONEKE_STRENGTH_SUCCESS";
        /** 一键精炼成功 */
        EquipEvent.ONEKE_REFINE_SUCCESS = "ONEKE_REFINE_SUCCESS";
        /** 精炼成功 */
        EquipEvent.DEFINE_EQUIPMENT_SUCCESS = "DEFINE_EQUIPMENT_SUCCESS";
        EquipEvent.CHANGE_EQUIP_ITEM = "CHANGE_EQUIP_ITEM";
        EquipEvent.SHOW_EQUIP_PANEL = "SHOW_EQUIP_PANEL";
        EquipEvent.SWITCH_TAB_SUCCESS = "SWITCH_TAB_SUCCESS";
        EquipEvent.CLOSE_JUMP_VIEW = "CLOSE_JUMP_VIEW";
        EquipEvent.SHOW_EQUIPREFINE_PANEL = "SHOW_EQUIPREFINE_PANEL";
        EquipEvent.SHOW_EQUIP_STH_PANEL = "SHOW_EQUIP_STH_PANEL";
        EquipEvent.OPEN_EQUIP_PANEL = "OPEN_EQUIP_PANEL";
        return EquipEvent;
    }(tl3d.BaseEvent));
    game.EquipEvent = EquipEvent;
})(game || (game = {}));
