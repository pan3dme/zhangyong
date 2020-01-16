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
    var GuildGuanqiaItemRender = /** @class */ (function (_super) {
        __extends(GuildGuanqiaItemRender, _super);
        function GuildGuanqiaItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildGuanqiaItemRender.prototype, "dataSource", {
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
        GuildGuanqiaItemRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.lab_title.text = data.getName();
                this.img_icon.skin = SkinUtil.getHeadIcon(data.monster.icon);
                var isLock = !data.isPass() && !data.isCurrent();
                this.box_icon.gray = isLock;
                this.imgSuo.visible = isLock;
            }
            else {
                this.ani_select.gotoAndStop(0);
                this.ani1.gotoAndStop(0);
            }
        };
        GuildGuanqiaItemRender.prototype.setSelected = function (flag) {
            this.ani_select.visible = flag;
            if (flag) {
                this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                    this.ani_select.play();
                    this.ani1.play(0, true);
                }), ResConst.atlas_circle_select);
            }
            else {
                this.ani_select.gotoAndStop(0);
                this.ani1.gotoAndStop(0);
            }
        };
        return GuildGuanqiaItemRender;
    }(ui.guild.copy.GuildGuanqiaUI));
    game.GuildGuanqiaItemRender = GuildGuanqiaItemRender;
})(game || (game = {}));
