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
    var ArenaRankView = /** @class */ (function (_super) {
        __extends(ArenaRankView, _super);
        function ArenaRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.rewardList.array = tb.TB_arena_new.get_TB_arena_new();
            _this.tab.selectHandler = new Handler(_this, _this.onTabSelect);
            var rewardTime = tb.TB_arena_new_set.getArenaNewSet().daily_reward;
            _this._rewardTime = rewardTime[0] + ":" + buquan(rewardTime[1], 2);
            _this.bgPanel.dataSource = { uiName: UIConst.ArenaRankView, closeOnSide: true, closeOnButton: true, title: LanMgr.getLan("", 12551) };
            return _this;
        }
        ArenaRankView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        ArenaRankView.prototype.initView = function () {
            var data = this.dataSource;
            this._myRank = data.rank;
            this.tab.selectedIndex = 0;
            this.rankList.array = data.rankInfoList;
            this.onTabSelect(0);
        };
        ArenaRankView.prototype.onTabSelect = function (index) {
            this.viewstack.selectedIndex = index;
            this.lbtime.text = index == 1 ? LanMgr.getLan("", 12552, this._rewardTime) : "" + LanMgr.getLan("", 12265) + this._myRank;
        };
        ArenaRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rankList.array = null;
        };
        return ArenaRankView;
    }(ui.arena.arena.ArenaRankUI));
    game.ArenaRankView = ArenaRankView;
})(game || (game = {}));
