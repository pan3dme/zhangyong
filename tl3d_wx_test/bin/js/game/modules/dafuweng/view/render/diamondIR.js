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
    var diamondIR = /** @class */ (function (_super) {
        __extends(diamondIR, _super);
        function diamondIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(diamondIR.prototype, "dataSource", {
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
        diamondIR.prototype.initView = function () {
            if (this.dataSource) {
                this.img.skin = this.dataSource.para[0][0] == iface.tb_prop.resTypeKey.gold ? "tanxian/jinqian.png" : "tanxian/zuanshi.png";
                this.lab_num.text = Snums(this.dataSource.para[0][1]);
            }
        };
        return diamondIR;
    }(ui.dafuweng.diamondIRUI));
    game.diamondIR = diamondIR;
})(game || (game = {}));
