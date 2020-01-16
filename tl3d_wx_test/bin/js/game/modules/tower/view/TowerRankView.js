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
    var TowerRankView = /** @class */ (function (_super) {
        __extends(TowerRankView, _super);
        function TowerRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12124) };
            return _this;
        }
        TowerRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list_rank.array = null;
        };
        TowerRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerRankView.prototype.initView = function () {
            this.list_rank.itemRender = game.TowerRankIR;
            if (this.dataSource) {
                this.list_rank.array = this.dataSource.getList();
                this.lb_myrank.text = this.dataSource.getRankDesc();
            }
            else {
                this.list_rank.array = game.TowerModel.getInstance().getRankListVo().getList();
                this.lb_myrank.text = game.TowerModel.getInstance().getRankListVo().getRankDesc();
            }
        };
        return TowerRankView;
    }(ui.tower.RankUI));
    game.TowerRankView = TowerRankView;
})(game || (game = {}));
