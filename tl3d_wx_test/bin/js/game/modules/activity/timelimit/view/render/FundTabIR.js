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
    var FundTabIR = /** @class */ (function (_super) {
        __extends(FundTabIR, _super);
        function FundTabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(FundTabIR.prototype, "dataSource", {
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
        FundTabIR.prototype.refreshData = function (item) {
            if (item) {
                // this.btn_tab.stateNum = 1;
                this.redpoint.setRedPointName("FundActivity" + item.ID);
                // this.btn_tab.skin = SkinUtil.getActivityTabSkin(item.ID);
                this.btn_tab.label = item.recharge_num + LanMgr.getLan("", 12609);
            }
            else {
                this.redpoint.onDispose();
            }
        };
        return FundTabIR;
    }(ui.box.TabIR1UI));
    game.FundTabIR = FundTabIR;
})(game || (game = {}));
