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
    var RankModule = /** @class */ (function (_super) {
        __extends(RankModule, _super);
        function RankModule() {
            return _super.call(this) || this;
        }
        RankModule.prototype.getModuleName = function () {
            return "RankModule";
        };
        RankModule.prototype.listProcessors = function () {
            return [new game.RankProcessor()];
        };
        return RankModule;
    }(tl3d.Module));
    game.RankModule = RankModule;
    var RankingListEvent = /** @class */ (function (_super) {
        __extends(RankingListEvent, _super);
        function RankingListEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankingListEvent.SHOW_RANKINGLIST_PANEL = "SHOW_RANKINGLIST_PANEL";
        RankingListEvent.RANKINGLIST_IS_WORKSHIP = "RANKINGLIST_IS_WORKSHIP";
        RankingListEvent.RED_EVENT_RANKLIST = "RED_EVENT_RANKLIST";
        //排行榜数据改变
        RankingListEvent.RANK_DATA_CHANGE = "RANK_DATA_CHANGE";
        //请求排行榜数据
        RankingListEvent.REQUEST_RANK_DATA = "REQUEST_RANK_DATA";
        //排行榜膜拜改变
        RankingListEvent.RANK_MOBAI_CHANGE = "RANK_MOBAI_CHANGE";
        return RankingListEvent;
    }(tl3d.BaseEvent));
    game.RankingListEvent = RankingListEvent;
})(game || (game = {}));
