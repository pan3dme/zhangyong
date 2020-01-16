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
    var RankTabView = /** @class */ (function (_super) {
        __extends(RankTabView, _super);
        function RankTabView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        RankTabView.prototype.close = function () {
            _super.prototype.close.call(this);
            game.RankModel.getInstance().rankingList = {};
            this.list_tab.array = null;
            this.bgPanel.dataSource = null;
        };
        RankTabView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        RankTabView.prototype.initView = function () {
            var info = this.dataSource || [];
            this.bgPanel.dataSource = { uiName: UIConst.RankTabView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12186) };
            var dataAry = game.RankModel.getInstance().arrRankListName.map(function (ary, index) {
                return { typeList: ary, svo: info[index] };
            });
            this.list_tab.array = dataAry;
        };
        return RankTabView;
    }(ui.rank.RankTabViewUI));
    game.RankTabView = RankTabView;
})(game || (game = {}));
