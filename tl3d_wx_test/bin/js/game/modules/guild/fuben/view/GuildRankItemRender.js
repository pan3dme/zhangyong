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
    var GuildRankItemRender = /** @class */ (function (_super) {
        __extends(GuildRankItemRender, _super);
        function GuildRankItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildRankItemRender.prototype, "dataSource", {
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
        GuildRankItemRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.ui_view.dataSource = { rank: data.rank };
                if (data.type == 'DamageRank') {
                    this.headBox.dataSource = new UserHeadVo(data.head, data.level, data.headFrame);
                    this.lbName.text = data.name;
                    this.boxMid.visible = false;
                    this.lbBottomDesc.text = "\u795E\u529B: ";
                    this.lbBottom.text = data.force;
                    this.lbValueDesc.text = "\u4F24\u5BB3";
                    this.lbValue.text = String(Math.round(data.value));
                }
                else if (data.type == 'GuildRank') {
                    this.lbName.text = data.name;
                    this.boxMid.visible = false;
                    this.lbBottomDesc.text = "\u4F1A\u957F: ";
                    this.lbBottom.text = data.leaderName;
                    this.lbValueDesc.text = "\u6700\u9AD8\u5173\u5361";
                    this.lbValue.text = data.desc;
                    var info = new UserHeadVo(data.head, data.level, data.headFrame, true);
                    this.headBox.dataSource = info;
                }
            }
            else {
                this.headBox.dataSource = null;
            }
        };
        return GuildRankItemRender;
    }(ui.box.RankIRUI));
    game.GuildRankItemRender = GuildRankItemRender;
})(game || (game = {}));
