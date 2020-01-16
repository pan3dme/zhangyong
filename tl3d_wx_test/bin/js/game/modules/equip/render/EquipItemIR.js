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
    var EquipItemIR = /** @class */ (function (_super) {
        __extends(EquipItemIR, _super);
        function EquipItemIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EquipItemIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        EquipItemIR.prototype.refreshData = function () {
            // let info = this.dataSource;
            // if(info){
            //     this.ani_select.play();
            // }else{
            //     this.ani_select.gotoAndStop(0);
            // }
        };
        return EquipItemIR;
    }(ui.box.EquipItemBoxUI));
    game.EquipItemIR = EquipItemIR;
})(game || (game = {}));
