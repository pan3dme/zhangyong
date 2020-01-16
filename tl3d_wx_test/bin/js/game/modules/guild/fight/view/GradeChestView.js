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
    /** 段位宝箱 */
    var GradeChestView = /** @class */ (function (_super) {
        __extends(GradeChestView, _super);
        function GradeChestView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GradeChestView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GradeChestView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GradeChestView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this.tabbar.selectedIndex = -1;
        };
        GradeChestView.prototype.initView = function () {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "段位宝箱" };
            this.itemList.array = null;
            this.tabbar.selectHandler = new Handler(this, this.selectTab);
            this.tabbar.selectedIndex = 0;
        };
        GradeChestView.prototype.selectTab = function (index) {
            var _this = this;
            if (index == -1)
                return;
            var grade = index == 0 ? game.GuildGrade.baiyin : (index == 1 ? game.GuildGrade.bojin : game.GuildGrade.wangzhe);
            if (game.GuildFightModel.getInstance().maxGuildGrade >= grade) {
                var args = {};
                args[Protocol.guild_guildWar_getBoxList.args.grade] = grade;
                PLC.request(Protocol.guild_guildWar_getBoxList, args, function ($data) {
                    if (!$data) {
                        _this.itemList.array = null;
                        return;
                    }
                    for (var i = 0; i < $data.boxList.length; i++) {
                        var svo = $data.boxList[i];
                        svo.index = i;
                        svo.grade = grade;
                    }
                    _this.itemList.array = $data.boxList;
                });
            }
            else {
                var tbGuild = tb.TB_guild.get_TB_guildById(game.GuildModel.getInstance().guildInfo.level);
                var num = tbGuild ? tbGuild.limit_num : 10;
                var ary = [];
                for (var i = 0; i < num; i++) {
                    ary.push({ index: i, grade: grade });
                }
                this.itemList.array = ary;
            }
        };
        return GradeChestView;
    }(ui.guild.fight.GradeChestUI));
    game.GradeChestView = GradeChestView;
})(game || (game = {}));
