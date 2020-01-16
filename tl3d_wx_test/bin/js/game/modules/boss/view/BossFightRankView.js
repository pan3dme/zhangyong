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
    var BossFightRankView = /** @class */ (function (_super) {
        __extends(BossFightRankView, _super);
        function BossFightRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            // this.mouseEnabled = false;
            _this.mouseThrough = true;
            _this.isModal = false;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            return _this;
        }
        BossFightRankView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            var isFull = GameUtil.isFullScreen();
            this.lbTitle.y = isFull ? (241 + game.HudModel.TOP_ADD_HEIGHT) : 241;
            this.rankList.y = isFull ? (258 + game.HudModel.TOP_ADD_HEIGHT) : 258;
        };
        BossFightRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        BossFightRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        BossFightRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rankList.array = null;
        };
        BossFightRankView.prototype.initView = function () {
            this.rankList.array = this.dataSource;
        };
        return BossFightRankView;
    }(ui.boss.FightRankUI));
    game.BossFightRankView = BossFightRankView;
})(game || (game = {}));
