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
    var PayActivityTabIR = /** @class */ (function (_super) {
        __extends(PayActivityTabIR, _super);
        function PayActivityTabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PayActivityTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        PayActivityTabIR.prototype.refresh = function () {
            var dataAry = this.dataSource;
            if (dataAry) {
                this.btn_tab.skin = SkinUtil.getTabBtnSkin(dataAry[2]);
                if (dataAry[1] && dataAry[1] != "") {
                    this.redpoint.setRedPointName(dataAry[1]);
                }
                else {
                    this.redpoint.onDispose();
                }
            }
            else {
                this.redpoint.onDispose();
            }
        };
        return PayActivityTabIR;
    }(ui.box.TabIR2UI));
    game.PayActivityTabIR = PayActivityTabIR;
})(game || (game = {}));
