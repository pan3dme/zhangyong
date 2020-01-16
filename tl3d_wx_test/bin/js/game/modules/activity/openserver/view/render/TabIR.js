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
    var TabIR = /** @class */ (function (_super) {
        __extends(TabIR, _super);
        function TabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        TabIR.prototype.refreshData = function (item) {
            if (item) {
                this.btn_tab.label = LanMgr.getLan("", 12624, num2ChiNum(item.tab.ID));
                this.img_lock.visible = !item.isopen();
                this.redpoint.setRedPointName("openRewardActivity" + item.id);
            }
            else {
                this.redpoint.onDispose();
            }
        };
        return TabIR;
    }(ui.box.TabIR1UI));
    game.TabIR = TabIR;
})(game || (game = {}));
