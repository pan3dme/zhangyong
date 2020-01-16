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
    var StarupAttrIR = /** @class */ (function (_super) {
        __extends(StarupAttrIR, _super);
        function StarupAttrIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(StarupAttrIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        StarupAttrIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info[0];
                this.lbValue.text = info[1];
            }
            else {
            }
        };
        return StarupAttrIR;
    }(ui.god.treasure.render.StarupAttrIrUI));
    game.StarupAttrIR = StarupAttrIR;
})(game || (game = {}));
