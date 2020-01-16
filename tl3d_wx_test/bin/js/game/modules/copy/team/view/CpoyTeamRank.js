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
    var CopyTeamRank = /** @class */ (function (_super) {
        __extends(CopyTeamRank, _super);
        function CopyTeamRank() {
            var _this = _super.call(this) || this;
            _this._rank = 0;
            return _this;
        }
        CopyTeamRank.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12475) };
        };
        CopyTeamRank.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamRank.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listteam.array = null;
        };
        CopyTeamRank.prototype.initView = function () {
            var _this = this;
            this.lab_empty.visible = !this.listteam.array || this.listteam.array.length <= 0;
            GameUtil.requestRankList(iface.tb_prop.rankTypeKey.groupCopyFloor, common.RankVo)
                .then(function (data) {
                _this._listDatas = data.rankList;
                var len = _this._listDatas.length;
                if (len < 6) {
                    for (var i = 0; i < 6 - len; i++) {
                        var temp = new common.RankVo;
                        temp.rank = len + i + 1;
                        temp.playerId = null;
                        _this._listDatas.push(temp);
                    }
                }
                _this._rank = data.myRank;
                _this.setlistteam();
            });
        };
        /** 设置排行列表数据 */
        CopyTeamRank.prototype.setlistteam = function () {
            this.listteam.array = this._listDatas;
            this.listteam.scrollTo(0);
            this.lbRank.text = this._rank == 0 ? LanMgr.getLan("", 12187) : this._rank + "";
            this.lbRank.event(Laya.Event.RESIZE);
            this.lbPass.text = LanMgr.getLan("", 12476);
            if (game.CopyTeamModel.getInstance().myFloor > 0) {
                var tab = tb.TB_team_copy.getTB_team_copyById(game.CopyTeamModel.getInstance().myFloor);
                if (tab) {
                    this.lbPass.text = Math.floor(tab.copy / 10) + "-" + tab.copy % 10;
                }
            }
            this.lbPass.event(Laya.Event.RESIZE);
            this.lab_empty.visible = !this.listteam.array || this.listteam.array.length <= 0;
        };
        return CopyTeamRank;
    }(ui.teamcopy.TeamCopyRankUI));
    game.CopyTeamRank = CopyTeamRank;
})(game || (game = {}));
