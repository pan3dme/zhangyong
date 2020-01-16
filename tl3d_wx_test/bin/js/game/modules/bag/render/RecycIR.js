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
    var RecycIR = /** @class */ (function (_super) {
        __extends(RecycIR, _super);
        function RecycIR() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        RecycIR.prototype.onClick = function () {
            if (this._dataSource) {
                this._dataSource.selected = !this._dataSource.selected;
                this.boxGouxuan.visible = this._dataSource.selected;
                if (this._dataSource.quality >= QualityConst.WHITE && this._dataSource.quality <= QualityConst.PURPLE) {
                    dispatchEvt(new game.BagEvent(game.BagEvent.SELECT_RECYCLE_ITEM));
                }
            }
        };
        Object.defineProperty(RecycIR.prototype, "dataSource", {
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
        RecycIR.prototype.refreshData = function (item) {
            if (item) {
                this.ui_base.dataSource = item;
                this.boxGouxuan.visible = item.selected;
                this.ui_base.anim_select.visible = false;
            }
            else {
                this.ui_base.dataSource = null;
            }
        };
        return RecycIR;
    }(ui.bag.RecycBoxUI));
    game.RecycIR = RecycIR;
})(game || (game = {}));
