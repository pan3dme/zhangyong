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
    var ArenaIR = /** @class */ (function (_super) {
        __extends(ArenaIR, _super);
        function ArenaIR() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.CLICK, _this, _this.onLinueUp);
            return _this;
        }
        Object.defineProperty(ArenaIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                if (!!value)
                    this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        ArenaIR.prototype.refreshView = function () {
            this.setForceLabel();
            var data = this.dataSource;
            this.lbname.text = data.name;
            this.lbguild.text = data.guildName;
            this.lbrank.text = data.rank + '';
            this.imgmyself.visible = data.isMySelf();
            this.imgRank.skin = SkinUtil.getArenaRankBg(data.rank);
            this.lbrank.fontSize = game.ArenaModel.getClgRankLbSize(data.rank);
        };
        /**设置神力Label */
        ArenaIR.prototype.setForceLabel = function () {
            this.lbshenli.text = this.dataSource.force + '';
        };
        ArenaIR.prototype.onLinueUp = function () {
            if (this.dataSource.isMySelf()) {
                showToast(LanMgr.getLan('', 10208));
                return;
            }
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_LINUEUP_PANLE), this.dataSource);
        };
        return ArenaIR;
    }(ui.arena.arena.render.ArenaIRUI));
    game.ArenaIR = ArenaIR;
})(game || (game = {}));
