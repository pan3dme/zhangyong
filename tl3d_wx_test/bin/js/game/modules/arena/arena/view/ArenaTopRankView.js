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
    var ArenaTopRankView = /** @class */ (function (_super) {
        __extends(ArenaTopRankView, _super);
        function ArenaTopRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        ArenaTopRankView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.initView();
        };
        ArenaTopRankView.prototype.initView = function () {
            this.bgPanel.showTitle(true, "zhandoubiaoxian/lisizuigao.png");
            var data = this.dataSource;
            this.lbreward.changeText("+" + data.topRankDiamond);
            this.lbup.text = "(" + data.chgRank;
            this.lbmax.changeText("" + data.topRank);
            this.lbrank.text = "" + data.rank;
            this.lbrank.event(Laya.Event.RESIZE);
            this.lbup.event(Laya.Event.RESIZE);
            this.hbox.refresh();
        };
        ArenaTopRankView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
        };
        return ArenaTopRankView;
    }(ui.arena.arena.ArenaTopRankUI));
    game.ArenaTopRankView = ArenaTopRankView;
})(game || (game = {}));
