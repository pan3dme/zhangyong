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
    var BuySuccView = /** @class */ (function (_super) {
        __extends(BuySuccView, _super);
        function BuySuccView() {
            return _super.call(this) || this;
        }
        BuySuccView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        BuySuccView.prototype.initView = function () {
            var rechargeId = this.dataSource;
            var data = tb.TB_recharge.get_TB_rechargeById(rechargeId);
        };
        BuySuccView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            game.ChongzhiModel.getInstance().arrPop();
        };
        return BuySuccView;
    }(ui.activity.chongzhi.BuySuccUI));
    game.BuySuccView = BuySuccView;
})(game || (game = {}));
