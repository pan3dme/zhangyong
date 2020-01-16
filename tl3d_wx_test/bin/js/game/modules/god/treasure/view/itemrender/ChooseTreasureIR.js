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
    var ChooseTreasureIR = /** @class */ (function (_super) {
        __extends(ChooseTreasureIR, _super);
        function ChooseTreasureIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChooseTreasureIR.prototype, "dataSource", {
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
        ChooseTreasureIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.itemBox.dataSource = info;
            }
            else {
                this.itemBox.dataSource = null;
            }
        };
        /** 更新数据 */
        ChooseTreasureIR.prototype.refreshData = function () {
            // let info = this.dataSource;
            // if(info){
            //     this.gray = info.isExsitGod();
            // }
        };
        return ChooseTreasureIR;
    }(ui.god.treasure.render.ChooseTreasureIRUI));
    game.ChooseTreasureIR = ChooseTreasureIR;
})(game || (game = {}));
