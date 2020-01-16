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
    var GodTreasureView = /** @class */ (function (_super) {
        __extends(GodTreasureView, _super);
        function GodTreasureView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodTreasureView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        GodTreasureView.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                var isOpen = App.IsSysOpen(ModuleConst.TREASURE);
                var isHas = info.getCurTreasure() ? true : false;
                this.imgSuo.visible = !isOpen;
                this.btnAdd.visible = isOpen && !isHas;
                this.itemBox.visible = isHas;
                if (isHas) {
                    var vo = info.getCurTreasure();
                    this.itemBox.dataSource = vo;
                }
                else {
                    this.itemBox.dataSource = null;
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
                this.redpoint.setRedPointName("god_treasure_wear_" + info.uuid);
            }
            else {
                this.itemBox.dataSource = null;
                this.imgSuo.visible = this.btnAdd.visible = this.itemBox.visible = false;
                this.off(Laya.Event.CLICK, this, this.onClick);
                this.redpoint.onDispose();
            }
        };
        GodTreasureView.prototype.onClick = function () {
            if (!App.IsSysOpen(ModuleConst.TREASURE)) {
                var tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.TREASURE);
                showToast(tbSys.prompt);
                return;
            }
            var info = this.dataSource;
            if (!info)
                return;
            var treasureVo = info.getCurTreasure();
            if (treasureVo) {
                game.TreasureTipsView.showTip(this, treasureVo, info);
            }
            else {
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW), [game.ChooseTreasureOpenType.wear, null, info]);
            }
        };
        return GodTreasureView;
    }(ui.god.treasure.GodTreasureUI));
    game.GodTreasureView = GodTreasureView;
})(game || (game = {}));
