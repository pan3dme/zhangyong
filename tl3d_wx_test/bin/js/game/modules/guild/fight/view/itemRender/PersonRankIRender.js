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
    var PersonRankIRender = /** @class */ (function (_super) {
        __extends(PersonRankIRender, _super);
        function PersonRankIRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PersonRankIRender.prototype, "dataSource", {
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
        PersonRankIRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = new UserHeadVo(info.head, info.level, info.headFrame);
                this.lbForce.text = LanMgr.getLan('', 10117, info.force);
                this.lbName.text = info.name;
                this.lbScore.text = info.score.toString();
                this.lbJifen.visible = true;
                this.imgtype.visible = false;
                this.ui_view.dataSource = { rank: info.rank };
            }
            else {
                this.headBox.dataSource = null;
            }
        };
        return PersonRankIRender;
    }(ui.guild.fight.render.GuildSaiQuRenderUI));
    game.PersonRankIRender = PersonRankIRender;
})(game || (game = {}));
