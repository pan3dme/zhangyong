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
    var GuildRankIRender = /** @class */ (function (_super) {
        __extends(GuildRankIRender, _super);
        function GuildRankIRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildRankIRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        GuildRankIRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = new GuildHeadVo(info.guildHead, info.guildLevel);
                this.lbForce.text = LanMgr.getLan('', 10117, info.force);
                this.lbName.text = info.guildName;
                this.lbScore.text = "积分：" + info.score.toString();
                this.ui_view.dataSource = { rank: info.rank };
                if (info.hasOwnProperty('upType') && info.upType != game.GuildUpGradeType.none) {
                    this.imgtype.visible = true;
                    this.lbJifen.visible = false;
                    this.imgtype.skin = SkinUtil.getGuildUpGradeUrl(info.upType);
                }
                else {
                    this.imgtype.visible = false;
                    this.lbJifen.visible = true;
                }
            }
            else {
                this.headBox.dataSource = null;
            }
        };
        return GuildRankIRender;
    }(ui.guild.fight.render.GuildSaiQuRenderUI));
    game.GuildRankIRender = GuildRankIRender;
})(game || (game = {}));
