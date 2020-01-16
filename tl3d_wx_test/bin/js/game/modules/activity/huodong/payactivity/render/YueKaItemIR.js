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
    var YueKaItemIR = /** @class */ (function (_super) {
        __extends(YueKaItemIR, _super);
        function YueKaItemIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(YueKaItemIR.prototype, "dataSource", {
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
        YueKaItemIR.prototype.refresh = function () {
            if (this.dataSource) {
                this.img_receivebg.visible = this.dataSource.show;
                this.ui_item.dataSource = this.dataSource.item;
                this.gray = this.dataSource.show;
            }
            else {
            }
        };
        return YueKaItemIR;
    }(ui.activity.huodong.welfare.render.YueKaItemIRUI));
    game.YueKaItemIR = YueKaItemIR;
})(game || (game = {}));
