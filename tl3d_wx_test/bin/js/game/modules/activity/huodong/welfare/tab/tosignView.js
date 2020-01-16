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
/*
* name;
*/
var game;
(function (game) {
    var ToSignView = /** @class */ (function (_super) {
        __extends(ToSignView, _super);
        function ToSignView() {
            return _super.call(this) || this;
        }
        ToSignView.prototype.onAdd = function () {
            // this.fontClip.value = buquan(App.hero.welfare.totalLoginDay,2);
            this.lab_totalday.text = LanMgr.getLan("累计登入{0}天", -1, App.hero.welfare.totalLoginDay);
            var vo = game.HuodongModel.getInstance().getSignTb();
            this.itemList.array = vo.rewardArr;
        };
        ToSignView.prototype.onExit = function () {
            this.close();
        };
        ToSignView.prototype.refresh = function () {
            this.itemList.refresh();
        };
        ToSignView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
        };
        return ToSignView;
    }(ui.activity.huodong.welfare.tab.toSignUI));
    game.ToSignView = ToSignView;
})(game || (game = {}));
