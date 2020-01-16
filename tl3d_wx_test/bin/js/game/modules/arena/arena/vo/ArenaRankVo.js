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
    var ArenaRankVo = /** @class */ (function (_super) {
        __extends(ArenaRankVo, _super);
        function ArenaRankVo() {
            return _super.call(this) || this;
        }
        ArenaRankVo.prototype.getValue = function () {
            return this.force + "";
        };
        ArenaRankVo.prototype.getValueDesc = function () {
            return "神力";
        };
        ArenaRankVo.prototype.isShowMid = function () {
            return false;
        };
        ArenaRankVo.prototype.isShowBottom = function () {
            return true;
        };
        /** 初始化数据 */
        ArenaRankVo.prototype.initNpcData = function () {
            if (this.isNpc()) {
                var data = tb.TB_arena_new_npc.getTB_arena_newById(this.rank);
                this.force = data.power;
                this.level = data.level;
                this.name = data.name;
                this.head = data.head == 1 ? -1 : -2;
            }
        };
        /**是否是机器人 */
        ArenaRankVo.prototype.isNpc = function () {
            return !this.playerId ? true : false;
        };
        return ArenaRankVo;
    }(common.RankVo));
    game.ArenaRankVo = ArenaRankVo;
})(game || (game = {}));
