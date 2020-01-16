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
    var AwardIRender = /** @class */ (function (_super) {
        __extends(AwardIRender, _super);
        function AwardIRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(AwardIRender.prototype, "dataSource", {
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
        AwardIRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var rank = info['rank'];
                this.imgRank.visible = rank <= 3;
                this.lbName.visible = rank > 3;
                if (rank <= 3) {
                    this.imgRank.skin = SkinUtil.getRankingSkin(rank - 1);
                }
                var tbSeason = info['tbSeason'];
                this.lbName.text = tbSeason.desc;
                this.itemList.array = tbSeason.getRewardList();
            }
            else {
                this.itemList.array = null;
            }
        };
        return AwardIRender;
    }(ui.guild.fight.render.SeasonAwardIRenderUI));
    game.AwardIRender = AwardIRender;
})(game || (game = {}));
