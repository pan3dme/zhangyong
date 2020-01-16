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
    var IconRender = /** @class */ (function (_super) {
        __extends(IconRender, _super);
        function IconRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(IconRender.prototype, "dataSource", {
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
        IconRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info && info instanceof game.IconVo) {
                this.img_icon.skin = SkinUtil.getGuildHeadIcon(info.tbHead.icon);
            }
        };
        return IconRender;
    }(ui.guild.init.IconRenderUI));
    game.IconRender = IconRender;
})(game || (game = {}));
