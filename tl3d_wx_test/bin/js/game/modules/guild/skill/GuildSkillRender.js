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
    var GuildSkillRender = /** @class */ (function (_super) {
        __extends(GuildSkillRender, _super);
        function GuildSkillRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildSkillRender.prototype, "dataSource", {
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
        GuildSkillRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lb_dengji.text = info.lv + "/" + info.getMaxLv();
                this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                    this.ani_select.play();
                }), ResConst.atlas_circle_select);
            }
            else {
                this.ani_select.gotoAndStop(0);
            }
        };
        return GuildSkillRender;
    }(ui.guild.skill.GuildSkillRenderUI));
    game.GuildSkillRender = GuildSkillRender;
})(game || (game = {}));
