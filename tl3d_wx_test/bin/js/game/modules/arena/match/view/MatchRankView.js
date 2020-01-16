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
    var MatchRankView = /** @class */ (function (_super) {
        __extends(MatchRankView, _super);
        function MatchRankView() {
            return _super.call(this) || this;
        }
        MatchRankView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12324) };
            this.tabBar.selectHandler = Handler.create(this, this.onSelected, null, false);
            this.lbScore.autoSize = this.lbRank.autoSize = this.lbGrade.autoSize = true;
        };
        MatchRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        MatchRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabBar.selectedIndex = -1;
            this.rankList.array = null;
            this._benfuList = null;
            this._kuafuList = null;
        };
        MatchRankView.prototype.initView = function () {
            this.tabBar.selectedIndex = 0;
        };
        MatchRankView.prototype.onSelected = function (index) {
            var _this = this;
            if (index == -1)
                return;
            if (index == 0) {
                if (!this._benfuList) {
                    this._benfuList = [];
                    this.rankList.array = null;
                    game.MatchThread.getInsatnce().requestRankList(true).then(function (data) {
                        for (var key in data) {
                            var rankVo = new game.MatchRankVo();
                            rankVo.setSvo(data[key]);
                            rankVo.rank = Number(key);
                            rankVo.score = data[key]["score"];
                            _this._benfuList.push(rankVo);
                        }
                        _this.setBenfuList();
                    });
                }
                else {
                    this.setBenfuList();
                }
            }
            else {
                if (!this._kuafuList) {
                    this._kuafuList = [];
                    this.rankList.array = null;
                    game.MatchThread.getInsatnce().requestRankList(false).then(function (data) {
                        for (var key in data) {
                            var rankVo = new game.MatchRankVo();
                            rankVo.setSvo(data[key]);
                            rankVo.rank = Number(key);
                            rankVo.score = data[key]["score"];
                            rankVo.rankSvrType = common.RankSvrType.matchCrossSvr;
                            _this._kuafuList.push(rankVo);
                        }
                        _this.setKuafuList();
                    });
                }
                else {
                    this.setKuafuList();
                }
            }
        };
        /** 设置本服列表数据 */
        MatchRankView.prototype.setBenfuList = function () {
            if (this.tabBar.selectedIndex == 0) {
                this.rankList.array = this._benfuList;
                this.rankList.scrollTo(0);
                var model = game.MatchModel.getInstance();
                this.lbScore.text = model.score + "";
                this.lbRankDesc.text = "   " + LanMgr.getLan("", 12547);
                this.lbRank.text = model.benfuRank + "";
                this.lbGrade.text = model.getGradeName(model.score);
                this.lbRank.event(Laya.Event.RESIZE);
            }
        };
        /** 设置跨服列表数据 */
        MatchRankView.prototype.setKuafuList = function () {
            if (this.tabBar.selectedIndex == 1) {
                this.rankList.array = this._kuafuList;
                this.rankList.scrollTo(0);
                var model = game.MatchModel.getInstance();
                this.lbScore.text = model.score + "";
                this.lbRankDesc.text = "   " + LanMgr.getLan("", 12548);
                this.lbRank.text = model.kuafuRank + "";
                this.lbGrade.text = model.getGradeName(model.score);
                this.lbRank.event(Laya.Event.RESIZE);
            }
        };
        return MatchRankView;
    }(ui.arena.match.MatchRankUI));
    game.MatchRankView = MatchRankView;
})(game || (game = {}));
