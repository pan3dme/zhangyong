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
    * OnlineProcessor
    */
    var OnlineProcessor = /** @class */ (function (_super) {
        __extends(OnlineProcessor, _super);
        function OnlineProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.OnlineModel.getInstance();
            return _this;
        }
        OnlineProcessor.prototype.getName = function () {
            return "OnlineProcessor";
        };
        //监听事件
        OnlineProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.OnlineEvent(game.OnlineEvent.SEND_RECEIVE_EVENT),
            ];
        };
        //处理事件
        OnlineProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.OnlineEvent) {
                switch (event.type) {
                    case game.OnlineEvent.SEND_RECEIVE_EVENT:
                        this.sendReceiveEvent(event.data);
                        break;
                }
            }
        };
        OnlineProcessor.prototype.sendReceiveEvent = function (data) {
            var _this = this;
            var args = {};
            args[Protocol.game_welfare_getOnlineAward.args.id] = data.tabid;
            PLC.request(Protocol.game_welfare_getOnlineAward, args, function ($data, msg) {
                if (!$data)
                    return;
                var _welfare = App.hero.welfare;
                if ($data.onlineTimeAward) {
                    if (!_welfare.hasOwnProperty("onlineTimeAward"))
                        _welfare.onlineTimeAward = {};
                    for (var key in $data.onlineTimeAward) {
                        _welfare.onlineTimeAward[key] = $data.onlineTimeAward[key];
                    }
                }
                if ($data.commonData) {
                    UIUtil.showRewardView($data.commonData);
                }
                if (_this.viewHasStage) {
                    _this.view.updateItem(data.id);
                }
                dispatchEvt(new game.OnlineEvent(game.OnlineEvent.RED_CHANGE_EVENT));
            });
        };
        Object.defineProperty(OnlineProcessor.prototype, "view", {
            get: function () {
                return UIMgr.getUIByName(UIConst.OnLineReward);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OnlineProcessor.prototype, "viewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.OnLineReward);
            },
            enumerable: true,
            configurable: true
        });
        return OnlineProcessor;
    }(tl3d.Processor));
    game.OnlineProcessor = OnlineProcessor;
})(game || (game = {}));
