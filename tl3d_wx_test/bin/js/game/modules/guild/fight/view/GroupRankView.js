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
    /** 赛区排名 */
    var GroupRankView = /** @class */ (function (_super) {
        __extends(GroupRankView, _super);
        function GroupRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GroupRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GroupRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GroupRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rankList.array = null;
        };
        GroupRankView.prototype.initView = function () {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "\u8D5B\u533A\u6392\u540D" };
            this.rankList.array = null;
            this.requestRank();
        };
        /** 请求排行 */
        GroupRankView.prototype.requestRank = function () {
            var _this = this;
            PLC.request(Protocol.guild_guildWar_getGroupList, null, function ($data) {
                if (!$data)
                    return;
                var model = game.GuildFightModel.getInstance();
                // 更新maxGuildGrade
                model.updateSeason($data);
                // let upGradeType = $data.upGradeType;
                var grade = $data.guildGrade;
                var resultList = [];
                for (var i = 0; i < $data.groupList.length; i++) {
                    var info = $data.groupList[i];
                    info.guildGrade = grade;
                    resultList.push(info);
                }
                // 排序
                resultList.sort(function (a, b) {
                    return b.score - a.score;
                });
                // let myRank = $data.myRank ? $data.myRank : 0;
                var tbDan = tb.TB_dan.get_TB_danById(grade);
                for (var i = 0; i < resultList.length; i++) {
                    var info = resultList[i];
                    info.rank = i + 1;
                    info.upType = model.getUpgradeType(tbDan, info.rank);
                }
                // let rankVo : IGroupRankVo = {groupList:resultList,upGradeType,guildGrade:grade,myRank};
                _this.bgPanel.updateTitle(game.GuildFightModel.GRADE_NAME[grade] + "\u7EC4\u6392\u540D");
                _this.rankList.array = resultList;
            });
        };
        return GroupRankView;
    }(ui.guild.fight.GroupRankUI));
    game.GroupRankView = GroupRankView;
})(game || (game = {}));
