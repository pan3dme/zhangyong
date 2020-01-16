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
var game;
(function (game) {
    var EntranceIR = /** @class */ (function (_super) {
        __extends(EntranceIR, _super);
        function EntranceIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EntranceIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        EntranceIR.prototype.refreshView = function () {
            var data = this._dataSource;
            if (data) {
                this.icon.skin = "shenjie/" + data.icon + ".png";
                this.redpoint.setRedPointName(tb.TB_function.FUNCTION_REDPOINT[data.ID]);
                this.on(Laya.Event.CLICK, this, this.onClick);
                var tbData = tb.TB_sys_open.get_TB_sys_openById(data.system_id);
                this.icon.gray = tbData && !App.IsSysOpen(data.system_id);
                this.box_condition.visible = this.icon.gray;
                if (this.box_condition.visible) {
                    this.lab_condition.text = LanMgr.getLan(tbData.prompt, -1);
                }
            }
            else {
                this.icon.skin = "";
                this.redpoint.setRedPointName("");
                this.off(Laya.Event.CLICK, this, this.onClick);
                Laya.Tween.clearTween(this);
            }
        };
        /**判断是否开启 */
        EntranceIR.prototype.isBtnOpen = function (fundId, isTip) {
            if (isTip === void 0) { isTip = false; }
            var tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
            if (tbData && !App.IsSysOpen(fundId)) {
                if (isTip)
                    showToast(tbData.prompt);
                return true;
            }
            return false;
        };
        EntranceIR.prototype.onClick = function () {
            var data = this._dataSource;
            if (data.system_id == ModuleConst.DIXIACHENG)
                return; //地下城目前没用，点击没反应
            if (this.isBtnOpen(data.system_id, true))
                return;
            switch (data.system_id) {
                case ModuleConst.SUMMON:
                    dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_ZHAOHUAN_PANEL));
                    break;
                case ModuleConst.GONGHUI:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
                    break;
                case ModuleConst.SHILIANTA:
                    dispatchEvt(new game.TowerEvent(game.TowerEvent.SHOW_SHILIANTA_PANEL));
                    break;
                case ModuleConst.TUJIAN:
                    dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_TUJIAN_PANEL));
                    break;
                case ModuleConst.JINGJI:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.JINGJI]);
                    break;
                case ModuleConst.MATCH_FIGHT:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.MATCH_FIGHT]);
                    break;
                // case ModuleConst.DIXIACHENG:
                // 	dispatchEvent(new moduledixiacheng.DixiachengEvent(moduledixiacheng.DixiachengEvent.SHOW_DIXIACHENG_PANEL));
                // 	break;
                case ModuleConst.DAILY_COPY:
                    dispatchEvt(new game.DailyEvent(game.DailyEvent.SHOW_DAILY_COPY_VIEW));
                    break;
                case ModuleConst.WORLD_BOSS:
                    dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_BOSS_VIEW));
                    break;
                case ModuleConst.EXPEDITION:
                    dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.Island:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.Island]);
                    break;
                case ModuleConst.QIRIKH:
                    dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SHOW_SEVENDAYS_PANEL));
                    break;
                case ModuleConst.SHENMEN:
                    dispatchEvt(new game.GodDoorEvent(game.GodDoorEvent.OPEN_SHEN_MEN_VIEW));
                    break;
                case ModuleConst.SHOP:
                    dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.shangcheng);
                    break;
                case ModuleConst.CARAVAN_ESCORT:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.CARAVAN_ESCORT]);
                    break;
                case ModuleConst.FOG_FOREST:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.FOG_FOREST]);
                    break;
                case ModuleConst.GOD_DOMAIN:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GOD_DOMAIN]);
                    break;
                case ModuleConst.GLORY_FIGHT:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GLORY_FIGHT]);
                    break;
                case ModuleConst.TEAM_COPY:
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.TEAM_COPY]);
                    break;
            }
            // UIMgr.hideUIByName(UIConst.EntranceList);
        };
        return EntranceIR;
    }(ui.hud.entrance.EntranceListIRUI));
    game.EntranceIR = EntranceIR;
})(game || (game = {}));
