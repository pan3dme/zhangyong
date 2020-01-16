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
    var SingleSelectTreasureIR = /** @class */ (function (_super) {
        __extends(SingleSelectTreasureIR, _super);
        function SingleSelectTreasureIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SingleSelectTreasureIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        SingleSelectTreasureIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.itemBox.dataSource = info;
                this.animSelect.play(0, true);
            }
            else {
                this.itemBox.dataSource = null;
                this.animSelect.stop();
            }
        };
        return SingleSelectTreasureIR;
    }(ui.god.treasure.render.SingleSelectTreasureIRUI));
    game.SingleSelectTreasureIR = SingleSelectTreasureIR;
})(game || (game = {}));
