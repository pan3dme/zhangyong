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
    var SignInIR = /** @class */ (function (_super) {
        __extends(SignInIR, _super);
        function SignInIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SignInIR.prototype, "dataSource", {
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
        SignInIR.prototype.refreshData = function () {
            var data = this._dataSource;
            if (data) {
                this.img_repair.visible = game.HuodongModel.getInstance().canBuqianDate == data.ID;
                var item = new ItemVo(data.reward[0], data.reward[1]);
                item.show = true;
                var isAlready = data.ID in App.hero.welfare.dailySignIn;
                this.img_already.visible = isAlready;
                this.box_item.dataSource = item;
                this.lbday.text = data.ID + "\u5929";
            }
        };
        return SignInIR;
    }(ui.activity.huodong.welfare.render.QiandaoRenderUI));
    game.SignInIR = SignInIR;
})(game || (game = {}));
