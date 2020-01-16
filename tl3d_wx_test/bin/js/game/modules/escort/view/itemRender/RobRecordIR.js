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
    var RobRecordIR = /** @class */ (function (_super) {
        __extends(RobRecordIR, _super);
        function RobRecordIR() {
            var _this = _super.call(this) || this;
            _this.lbContent.autoSize = true;
            return _this;
        }
        Object.defineProperty(RobRecordIR.prototype, "dataSource", {
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
        RobRecordIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.lbContent.text = info.getContent();
                var ary = info.getLossList();
                if (ary.length > 0) {
                    this.itemList.y = this.lbContent.y + this.lbContent.height + 9;
                    this.itemList.array = ary;
                    this.bg.height = this.height = this.itemList.y + this.itemList.height + 18;
                }
                else {
                    this.itemList.array = null;
                    this.bg.height = this.height = this.lbContent.y + this.lbContent.height + 16;
                }
            }
            else {
                this.itemList.array = null;
            }
        };
        return RobRecordIR;
    }(ui.escort.itemRender.RobRecordIRenderUI));
    game.RobRecordIR = RobRecordIR;
})(game || (game = {}));
