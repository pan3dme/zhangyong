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
    var MatchRankVo = /** @class */ (function (_super) {
        __extends(MatchRankVo, _super);
        function MatchRankVo() {
            return _super.call(this) || this;
        }
        MatchRankVo.prototype.getValue = function () {
            return game.MatchModel.getInstance().getGradeName(this.score);
        };
        MatchRankVo.prototype.getValueDesc = function () {
            return LanMgr.getLan("", 12544);
        };
        MatchRankVo.prototype.isShowMid = function () {
            return true;
        };
        MatchRankVo.prototype.getMidDesc = function () {
            return LanMgr.getLan("", 12543);
        };
        MatchRankVo.prototype.getMid = function () {
            return this.score;
        };
        MatchRankVo.prototype.isShowBottom = function () {
            return true;
        };
        return MatchRankVo;
    }(common.RankVo));
    game.MatchRankVo = MatchRankVo;
})(game || (game = {}));
