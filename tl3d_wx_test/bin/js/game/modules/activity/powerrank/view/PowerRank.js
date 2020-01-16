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
    var PowerRank = /** @class */ (function (_super) {
        __extends(PowerRank, _super);
        function PowerRank() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        PowerRank.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        PowerRank.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        PowerRank.prototype.close = function (type, showEffect, sound) {
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        PowerRank.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        PowerRank.prototype.initView = function () {
            var data = this.dataSource;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: data.getTitle() + LanMgr.getLan("", 12631) };
            this.list_rank.array = data.forceRankList;
            this.lab_title.text = data.getTitle();
            this.lb_myrank.text = data.getMyValueDesc() + "   " + data.getMyRankDesc();
        };
        return PowerRank;
    }(ui.activity.powerrank.powerRankUI));
    game.PowerRank = PowerRank;
})(game || (game = {}));
