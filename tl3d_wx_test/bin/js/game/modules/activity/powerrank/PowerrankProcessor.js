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
    /*
    * PowerrankProcessor
    */
    var PowerrankProcessor = /** @class */ (function (_super) {
        __extends(PowerrankProcessor, _super);
        function PowerrankProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.PowerrankModel.getInstance();
            return _this;
        }
        PowerrankProcessor.prototype.getName = function () {
            return "PowerrankProcessor";
        };
        //监听事件
        PowerrankProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.PowerrankEvent(game.PowerrankEvent.SHOW_VIEW_EVENT),
                new game.PowerrankEvent(game.PowerrankEvent.OPEN_DETAIL_PANEL),
                new game.PowerrankEvent(game.PowerrankEvent.SHOW_RANKVIEW_EVENT),
            ];
        };
        //处理事件
        PowerrankProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.PowerrankEvent) {
                switch (event.type) {
                    case game.PowerrankEvent.SHOW_VIEW_EVENT:
                        this.showview(event.data);
                        break;
                    case game.PowerrankEvent.OPEN_DETAIL_PANEL:
                        this.opendetail();
                        break;
                    case game.PowerrankEvent.SHOW_RANKVIEW_EVENT:
                        this.openRankView(event.data);
                        break;
                }
            }
        };
        PowerrankProcessor.prototype.opendetail = function () {
            var model = this._model;
            var rankList = model.rankingList[model.curRankID];
            this.openRankView(rankList);
        };
        PowerrankProcessor.prototype.showview = function (id) {
            var _this = this;
            var model = this._model;
            if (!model.visiableView()) {
                showToast(LanMgr.getLan("", 10095));
                return;
            }
            id = id ? id : this.getFirstRankId();
            model.curRankID = id;
            if (this.viewHasStage && model.rankingList.hasOwnProperty(id)) {
                //已有数据刷新
                this.view.updateData(model.rankingList[id]);
            }
            else {
                var arg = {};
                arg[Protocol.center_global_getRankList.args.id] = id;
                PLC.request(Protocol.center_global_getRankList, arg, function ($data, msg) {
                    if (!$data)
                        return;
                    model.firstLogin = false;
                    if (!model.rankingList.hasOwnProperty(id)) {
                        model.rankingList[id] = new game.RankListVo(id);
                    }
                    model.rankingList[id].syncData($data);
                    dispatchEvt(new game.PowerrankEvent(game.PowerrankEvent.UPDATE_REDPOINT));
                    if (_this.viewHasStage) {
                        _this.view.updateData(model.rankingList[id]);
                    }
                    else {
                        UIMgr.showUI(UIConst.PowerRank, model.rankingList[id]);
                    }
                });
            }
        };
        PowerrankProcessor.prototype.getFirstRankId = function () {
            var tempData = TableData.getInstance().getTableByName(TableData.tb_rank_type).data;
            var lastID = 1;
            for (var key in tempData) {
                if (tempData[key]) {
                    var temp = tempData[key];
                    var time = App.getServerTime() - App.getOpenServerTime();
                    if (temp.isShowActivityBtn(time)) {
                        return temp.ID;
                    }
                    lastID = temp.ID;
                }
            }
            return lastID;
        };
        PowerrankProcessor.prototype.openRankView = function (data) {
            UIMgr.showUI(UIConst.Pow_List, data);
        };
        Object.defineProperty(PowerrankProcessor.prototype, "view", {
            get: function () {
                return UIMgr.getUIByName(UIConst.PowerRank);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PowerrankProcessor.prototype, "viewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.PowerRank);
            },
            enumerable: true,
            configurable: true
        });
        return PowerrankProcessor;
    }(tl3d.Processor));
    game.PowerrankProcessor = PowerrankProcessor;
})(game || (game = {}));
