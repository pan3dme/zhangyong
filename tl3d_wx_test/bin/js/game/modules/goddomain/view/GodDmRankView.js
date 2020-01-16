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
    var GodDmRankView = /** @class */ (function (_super) {
        __extends(GodDmRankView, _super);
        function GodDmRankView() {
            var _this = _super.call(this) || this;
            _this._rank = 0;
            return _this;
        }
        GodDmRankView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12324) };
            this.tabBar.selectHandler = Handler.create(this, this.onSelected, null, false);
        };
        GodDmRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GodDmRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabBar.selectedIndex = -1;
            this.rankList.array = null;
            this._rankList = null;
        };
        GodDmRankView.prototype.initView = function () {
            this.tabBar.selectedIndex = 0;
        };
        GodDmRankView.prototype.onSelected = function (index) {
            var _this = this;
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            if (index == 0) {
                if (!this._rankList) {
                    this._rankList = [];
                    this.rankList.array = null;
                    this.lab_empty.visible = !this.rankList.array || this.rankList.array.length == 0;
                    GameUtil.requestRankList(iface.tb_prop.rankTypeKey.godDmLocal, game.GodDmRankVo)
                        .then(function (data) {
                        _this._rankList = data.rankList;
                        _this._rank = data.myRank;
                        _this.setRankList();
                    });
                }
                else {
                    this.setRankList();
                }
            }
            else {
                this.rewardList.array = tb.TB_fight_goddomain_reward.getItemList();
                this.lab_empty.visible = false;
            }
        };
        /** 设置排行列表数据 */
        GodDmRankView.prototype.setRankList = function () {
            if (this.tabBar.selectedIndex == 0) {
                this.rankList.array = this._rankList;
                this.rankList.scrollTo(0);
                this.lbScore.text = game.GodDomainModel.getInstance().score + "";
                this.lbRank.text = this._rank == 0 ? LanMgr.getLan("", 12187) : this._rank + "";
                this.lbScore.event(Laya.Event.RESIZE);
                this.lbRank.event(Laya.Event.RESIZE);
                this.lab_empty.visible = !this.rankList.array || this.rankList.array.length == 0;
            }
        };
        return GodDmRankView;
    }(ui.goddomain.RankViewUI));
    game.GodDmRankView = GodDmRankView;
})(game || (game = {}));
