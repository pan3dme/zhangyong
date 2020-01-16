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
    /** 赛季奖励 */
    var SeasonAwardView = /** @class */ (function (_super) {
        __extends(SeasonAwardView, _super);
        function SeasonAwardView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        SeasonAwardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        SeasonAwardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        SeasonAwardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabbar.selectedIndex = -1;
            this.awardList.array = null;
            this.rankList.array = null;
            this._rankList = null;
        };
        SeasonAwardView.prototype.initView = function () {
            this.awardList.array = null;
            this.rankList.array = null;
            this.lbDesc.text = "\u6682\u65E0\u516C\u4F1A\u8FBE\u5230\u738B\u8005\u6BB5\u4F4D";
            this.tabbar.selectHandler = new Handler(this, this.selectTab);
            this.tabbar.selectedIndex = 0;
            this.requestRank();
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "\u8D5B\u5B63\u6392\u540D" };
        };
        SeasonAwardView.prototype.selectTab = function (index) {
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            if (index == 0) {
                var list = [];
                var ary = tb.TB_guild_season.get_TB_guild_season();
                for (var i = 0; i < ary.length; i++) {
                    list.push({ rank: (i + 1), tbSeason: ary[i] });
                }
                this.awardList.array = list;
            }
            else {
                this.rankList.array = this._rankList;
            }
        };
        /** 请求排行榜 */
        SeasonAwardView.prototype.requestRank = function () {
            var _this = this;
            PLC.request(Protocol.guild_guildWar_getGradeList, null, function ($data) {
                if (!$data) {
                    _this.lbDesc.text = "\u6682\u65E0\u516C\u4F1A\u8FBE\u5230\u738B\u8005\u6BB5\u4F4D";
                    return;
                }
                _this._rankList = [];
                for (var _i = 0, _a = $data.gradeList; _i < _a.length; _i++) {
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
                if (_this.tabbar.selectedIndex == 1) {
                    _this.rankList.array = _this._rankList;
                }
                if ($data.myRank > 0) {
                    _this.lbDesc.text = "\u6211\u7684\u8D5B\u5B63\u79EF\u5206:" + $data.rankValue + "  \u6211\u7684\u6392\u540D:" + $data.myRank;
                }
                else {
                    _this.lbDesc.text = "\u6211\u7684\u8D5B\u5B63\u79EF\u5206:" + $data.rankValue + "  \u6211\u7684\u6392\u540D:\u672A\u5165\u738B\u8005";
                }
            });
        };
        return SeasonAwardView;
    }(ui.guild.fight.SeasonAwardUI));
    game.SeasonAwardView = SeasonAwardView;
})(game || (game = {}));
