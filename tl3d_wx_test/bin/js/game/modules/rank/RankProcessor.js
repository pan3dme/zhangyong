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
    var RankProcessor = /** @class */ (function (_super) {
        __extends(RankProcessor, _super);
        function RankProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.RankModel.getInstance();
            return _this;
        }
        RankProcessor.prototype.getName = function () {
            return "RankProcessor";
        };
        RankProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.RankingListEvent(game.RankingListEvent.SHOW_RANKINGLIST_PANEL),
                new game.RankingListEvent(game.RankingListEvent.RANKINGLIST_IS_WORKSHIP),
                new game.RankingListEvent(game.RankingListEvent.RED_EVENT_RANKLIST),
                new game.RankingListEvent(game.RankingListEvent.REQUEST_RANK_DATA),
            ];
        };
        RankProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.RankingListEvent) {
                switch (event.type) {
                    case game.RankingListEvent.SHOW_RANKINGLIST_PANEL:
                        this.onProtocolRankingList(event.data);
                        break;
                    case game.RankingListEvent.RANKINGLIST_IS_WORKSHIP:
                        this.onProtocolWorkShip(event.data);
                        break;
                    case game.RankingListEvent.REQUEST_RANK_DATA:
                        this.requestRankData(event.data);
                        break;
                }
            }
        };
        /**获取排行榜 */
        RankProcessor.prototype.onProtocolRankingList = function (type) {
            var _this = this;
            var model = this._model;
            model.curRankType = type;
            if (UIMgr.hasStage(UIConst.RankView)) {
                if (model.rankingList.hasOwnProperty(type)) {
                    this.rankingListView.initView(model.rankingList[type]);
                    return;
                }
            }
            if (type == RankListType.Guild) { /**公会 */
                PLC.request(Protocol.guild_guild_levelRankList, null, function ($data, msg) {
                    if (!$data)
                        return;
                    App.hero.guildLv = $data.rankValue;
                    // model.rankingList[type] = $data;
                    model.setRankData(type, $data);
                    if (UIMgr.hasStage(UIConst.RankView))
                        _this.rankingListView.initView(model.rankingList[type]);
                    else
                        UIMgr.showUI(UIConst.RankView, model.rankingList[type]);
                });
            }
            else {
                var arg = {};
                arg[Protocol.game_rank_getRankList.args.rankType] = type;
                PLC.request(Protocol.game_rank_getRankList, arg, function (data) {
                    if (!data)
                        return;
                    // model.rankingList[type] = data;
                    model.setRankData(type, data);
                    if (UIMgr.hasStage(UIConst.RankView))
                        _this.rankingListView.initView(model.rankingList[type]);
                    else
                        UIMgr.showUI(UIConst.RankView, model.rankingList[type]);
                });
            }
        };
        RankProcessor.prototype.requestRankData = function (type) {
            var model = this._model;
            if (type == RankListType.Guild) {
                //公会
                PLC.request(Protocol.guild_guild_levelRankList, null, function ($data, msg) {
                    if (!$data)
                        return;
                    App.hero.guildLv = $data.rankValue;
                    model.setRankData(type, $data);
                });
            }
            else {
                var arg = {};
                arg[Protocol.game_rank_getRankList.args.rankType] = type;
                PLC.request(Protocol.game_rank_getRankList, arg, function (data) {
                    if (!data)
                        return;
                    model.setRankData(type, data);
                });
            }
        };
        //膜拜
        RankProcessor.prototype.onProtocolWorkShip = function (type) {
            var _this = this;
            var model = this._model;
            var arg = {};
            arg[Protocol.game_rank_worship.args.rankType] = type ? type : model.curRankType;
            PLC.request(Protocol.game_rank_worship, arg, function (data) {
                if (!data)
                    return;
                var tabNames = game.RankModel.getInstance().arrRankListName;
                var idx = tabNames.findIndex(function (vo) { return vo[2] == model.curRankType; });
                var type = Math.min(tabNames.length - 1, idx + 1);
                dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RED_EVENT_RANKLIST));
                UIUtil.showRewardView(data.commonData);
                if (_this.rankingListView)
                    _this.rankingListView.updateBtn();
                // this.rankingListView.listsetScroll('right');
                // 不自动切换
                // this.onProtocolRankingList(tabNames[type][2]);
            });
        };
        Object.defineProperty(RankProcessor.prototype, "rankingListView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.RankView);
            },
            enumerable: true,
            configurable: true
        });
        return RankProcessor;
    }(tl3d.Processor));
    game.RankProcessor = RankProcessor;
})(game || (game = {}));
