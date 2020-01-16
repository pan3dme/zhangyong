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
    var MatchIR = /** @class */ (function (_super) {
        __extends(MatchIR, _super);
        function MatchIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MatchIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        MatchIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                this.headBox.dataSource = data.headVo;
                this.lbName.text = data.name;
                this.lbForce.text = LanMgr.getLan("", 10117, data.force);
                this.lbScore.text = LanMgr.getLan("", 12543) + "：" + data.score;
                this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
                this.headBox.on(Laya.Event.CLICK, this, this.onCheck);
            }
            else {
                this.headBox.dataSource = null;
                this.btnChallenge.off(Laya.Event.CLICK, this, this.onChallenge);
                this.headBox.off(Laya.Event.CLICK, this, this.onCheck);
            }
        };
        /** 挑战 */
        MatchIR.prototype.onChallenge = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.MATCH_CHALLENGE), this.dataSource);
        };
        /** 查看阵容 */
        MatchIR.prototype.onCheck = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_PLAYER_LINEUP), this.dataSource);
        };
        return MatchIR;
    }(ui.arena.match.render.MatchIRUI));
    game.MatchIR = MatchIR;
})(game || (game = {}));
