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
    var BossRankView = /** @class */ (function (_super) {
        __extends(BossRankView, _super);
        function BossRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        BossRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        BossRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        BossRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listRank.array = null;
            this.bgPanel.dataSource = null;
        };
        BossRankView.prototype.initView = function () {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12505) };
            this.listRank.array = null;
            this.lbDamage.text = "";
            this.requestRank();
        };
        BossRankView.prototype.requestRank = function () {
            var _this = this;
            var info = this.dataSource;
            var arg = {};
            arg[Protocol.center_boss_getRankList.args.id] = info.tbBoss.ID;
            PLC.request(Protocol.center_boss_getRankList, arg, function (data) {
                if (!data)
                    return;
                var rlist = data.WorldBossRankList;
                var rankLists = [];
                for (var i = 0; i < rlist.length; i++) {
                    rankLists.push(new game.BossRankInfo(rlist[i], (i + 1)));
                }
                var myRank = data.myRank;
                var rankText = myRank == 0 ? LanMgr.getLan('', 10028) : LanMgr.getLan('', 10029, myRank);
                _this.lbDamage.text = LanMgr.getLan("", 10080, data.rankValue) + "    " + rankText;
                _this.listRank.array = rankLists;
                _this.empty.visible = rankLists.length == 0;
            });
        };
        return BossRankView;
    }(ui.boss.RankUI));
    game.BossRankView = BossRankView;
})(game || (game = {}));
