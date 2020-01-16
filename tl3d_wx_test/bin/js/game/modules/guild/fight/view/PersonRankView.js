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
    /** 会员排名 */
    var PersonRankView = /** @class */ (function (_super) {
        __extends(PersonRankView, _super);
        function PersonRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        PersonRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        PersonRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        PersonRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.awardList.array = null;
            this.rankList.array = null;
            this.lbDesc.text = "";
            this._rankList = null;
            this.combo.selectedIndex = -1;
            this.tabBar.selectedIndex = -1;
        };
        PersonRankView.prototype.initView = function () {
            this.awardList.array = null;
            this.rankList.array = null;
            this.tabBar.selectHandler = new Handler(this, this.selectTab);
            this.combo.selectHandler = new Handler(this, this.selectTCombo);
            this.tabBar.selectedIndex = 0;
            this.lbDesc.visible = false;
            this.empty.visible = false;
            this.requestRank();
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "\u4F1A\u5458\u6392\u540D" };
        };
        PersonRankView.prototype.selectTab = function (index) {
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            if (index == 0) {
                if (this.combo.selectedIndex == -1) {
                    // 默认选择当前段位
                    var myTeamVo = game.GuildFightModel.getInstance().myTeamVo.teamSvo;
                    var grade = myTeamVo ? myTeamVo.guildGrade : game.GuildGrade.wangzhe;
                    this.combo.selectedIndex = grade - 1;
                }
            }
            else {
                this.rankList.array = this._rankList;
            }
        };
        /** 选择段位 */
        PersonRankView.prototype.selectTCombo = function (index) {
            if (index == -1)
                return;
            var list = [];
            var ary = tb.TB_person_season.get_TB_person_season("dan", index + 1);
            for (var i = 0; i < ary.length; i++) {
                list.push(ary[i]);
            }
            this.awardList.array = list;
        };
        /** 请求排行榜 */
        PersonRankView.prototype.requestRank = function () {
            var _this = this;
            if (!game.GuildFightModel.getInstance().isJoin()) {
                this.empty.visible = true;
                this.lbDesc.visible = false;
                return;
            }
            PLC.request(Protocol.guild_guildWar_getMemberRankList, null, function ($data) {
                if (!$data) {
                    _this.empty.visible = true;
                    _this.lbDesc.visible = false;
                    return;
                }
                _this._rankList = [];
                for (var _i = 0, _a = $data.memberRankList; _i < _a.length; _i++) {
                    var svo = _a[_i];
                    _this._rankList.push(svo);
                }
                _this._rankList.sort(function (a, b) {
                    return b.score - a.score;
                });
                for (var i = 0; i < _this._rankList.length; i++) {
                    var info = _this._rankList[i];
                    info.rank = i + 1;
                }
                if (_this.tabBar.selectedIndex == 1) {
                    _this.rankList.array = _this._rankList;
                }
                _this.empty.visible = false;
                _this.lbDesc.visible = true;
                if ($data.myRank > 0) {
                    _this.lbDesc.text = "\u6211\u7684\u8D5B\u5B63\u79EF\u5206:" + $data.rankValue + "  \u6211\u7684\u6392\u540D:" + $data.myRank;
                }
                else {
                    _this.lbDesc.text = "\u6211\u7684\u8D5B\u5B63\u79EF\u5206:" + $data.rankValue + "  \u6211\u7684\u6392\u540D:\u672A\u4E0A\u699C";
                }
            });
        };
        return PersonRankView;
    }(ui.guild.fight.PersonRankUI));
    game.PersonRankView = PersonRankView;
})(game || (game = {}));
