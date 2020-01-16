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
    var GodDmRankVo = /** @class */ (function (_super) {
        __extends(GodDmRankVo, _super);
        function GodDmRankVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GodDmRankVo.prototype.getValueDesc = function () {
            return "积分";
        };
        GodDmRankVo.prototype.isShowMid = function () {
            return false;
        };
        GodDmRankVo.prototype.getBottom = function () {
            return this.force;
        };
        GodDmRankVo.prototype.getBottomDesc = function () {
            return "神力：";
        };
        GodDmRankVo.prototype.isShowBottom = function () {
            return true;
        };
        return GodDmRankVo;
    }(common.RankVo));
    game.GodDmRankVo = GodDmRankVo;
})(game || (game = {}));
