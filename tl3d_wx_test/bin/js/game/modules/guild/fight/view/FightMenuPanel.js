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
    var FightMenuPanel = /** @class */ (function (_super) {
        __extends(FightMenuPanel, _super);
        function FightMenuPanel() {
            return _super.call(this) || this;
        }
        FightMenuPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.updateView();
        };
        FightMenuPanel.prototype.updateView = function () {
            var model = game.GuildFightModel.getInstance();
            var curDate = new Date(App.serverTime);
            var week = curDate.getDay();
            if (model.isJoin()) {
                // 默认选择当前段位
                var myTeamVo = model.myTeamVo.teamSvo;
                this.lbDesc.text = myTeamVo ? game.GuildFightModel.GRADE_NAME[myTeamVo.guildGrade] + "\u8D5B " + week + "/6" : "已报名";
            }
            else {
                this.lbDesc.text = "未报名";
            }
            this.lbTitle.text = LanMgr.getLan('S{0}赛季', -1, model.season);
        };
        return FightMenuPanel;
    }(ui.guild.fight.GuildFightMenuUI));
    game.FightMenuPanel = FightMenuPanel;
})(game || (game = {}));
