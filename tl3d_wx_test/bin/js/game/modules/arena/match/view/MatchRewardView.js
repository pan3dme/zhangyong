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
    var MatchRewardView = /** @class */ (function (_super) {
        __extends(MatchRewardView, _super);
        function MatchRewardView() {
            return _super.call(this) || this;
        }
        MatchRewardView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12261) };
            this.tabBar.selectHandler = Handler.create(this, this.onSelected, null, false);
        };
        MatchRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        MatchRewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabBar.selectedIndex = -1;
            this.benfuList.array = null;
            this.kuafuList.array = null;
        };
        MatchRewardView.prototype.initView = function () {
            this.tabBar.selectedIndex = 0;
            var model = game.MatchModel.getInstance();
            this.lbScore.text = model.score + "";
            this.lbRank.text = model.benfuRank + "";
            this.lbGrade.text = model.getGradeName(model.score);
        };
        MatchRewardView.prototype.onSelected = function (index) {
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            var model = game.MatchModel.getInstance();
            var isBenfu = index == 0;
            if (isBenfu) {
                this.benfuList.array = tb.TB_match.getItemList();
            }
            else {
                this.kuafuList.array = tb.TB_match_score.getItemList();
            }
            // this.lbRankDesc.text = isBenfu ? "   本服排名：" : "   跨服排名：";
            // this.lbRank.text = isBenfu ? (model.benfuRank+"") : (model.kuafuRank+"");
            // this.lbGrade.text = model.getGradeName(model.score);
            // this.lbRank.event(Laya.Event.RESIZE);
        };
        return MatchRewardView;
    }(ui.arena.match.MatchRewardUI));
    game.MatchRewardView = MatchRewardView;
})(game || (game = {}));
