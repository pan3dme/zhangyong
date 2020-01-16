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
    var propIR = /** @class */ (function (_super) {
        __extends(propIR, _super);
        function propIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(propIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        propIR.prototype.initView = function () {
            if (this.dataSource) {
                this.ui_item.dataSource = new ItemVo(this.dataSource.para[0][0], this.dataSource.para[0][1]);
            }
        };
        return propIR;
    }(ui.dafuweng.propIRUI));
    game.propIR = propIR;
})(game || (game = {}));
