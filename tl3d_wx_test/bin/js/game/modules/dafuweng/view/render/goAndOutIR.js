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
    var goAndOutIR = /** @class */ (function (_super) {
        __extends(goAndOutIR, _super);
        function goAndOutIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(goAndOutIR.prototype, "dataSource", {
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
        goAndOutIR.prototype.initView = function () {
            if (this.dataSource) {
                this.lab_info.text = this.dataSource.para[0][0] > 0 ? "" + LanMgr.getLan("", 12460) + this.dataSource.para[0][0] : "" + LanMgr.getLan("", 12461) + Math.abs(this.dataSource.para[0][0]);
                this.ani1.play();
            }
            else {
                this.ani1.stop();
            }
        };
        return goAndOutIR;
    }(ui.dafuweng.goAndOutIRUI));
    game.goAndOutIR = goAndOutIR;
})(game || (game = {}));
