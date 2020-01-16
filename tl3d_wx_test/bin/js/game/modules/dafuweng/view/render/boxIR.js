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
    var boxIR = /** @class */ (function (_super) {
        __extends(boxIR, _super);
        function boxIR() {
            var _this = _super.call(this) || this;
            _this.img_box.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        Object.defineProperty(boxIR.prototype, "dataSource", {
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
        boxIR.prototype.initView = function () {
        };
        boxIR.prototype.onClick = function () {
            UIMgr.showUI((UIConst.ManyItemsTip), { data: ary2prop(this.dataSource.box_preview), info: LanMgr.getLan("", 12465) });
        };
        return boxIR;
    }(ui.dafuweng.boxIRUI));
    game.boxIR = boxIR;
})(game || (game = {}));
