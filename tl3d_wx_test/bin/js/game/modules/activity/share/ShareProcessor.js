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
    * ShareProcessor
    */
    var ShareProcessor = /** @class */ (function (_super) {
        __extends(ShareProcessor, _super);
        function ShareProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.ShareModel.getInstance();
            return _this;
        }
        ShareProcessor.prototype.getName = function () {
            return "ShareProcessor";
        };
        //监听事件
        ShareProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ShareEvent(game.ShareEvent.SEND_RECIVE_REWARD),
            ];
        };
        //处理事件
        ShareProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.ShareEvent) {
                switch (event.type) {
                    case game.ShareEvent.SEND_RECIVE_REWARD:
                        this.sendrecivereward(event.data);
                        break;
                }
            }
        };
        ShareProcessor.prototype.sendrecivereward = function (cdata) {
            var _this = this;
            var args = {};
            args[Protocol.game_activity_getShareAward.args.id] = cdata.tabid;
            PLC.request(Protocol.game_activity_getShareAward, args, function ($data, $msg) {
                if (!$data)
                    return;
                App.hero.welfare.doneShares = $data.doneShares;
                UIUtil.showRewardView($data.commonData);
                dispatchEvt(new game.ShareEvent(game.ShareEvent.RED_POINT_CHANGE));
                if (_this.viewHasStage) {
                    _this.view.updateItem(cdata.id);
                }
            });
        };
        Object.defineProperty(ShareProcessor.prototype, "view", {
            get: function () {
                return UIMgr.getUIByName(UIConst.MainShare);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareProcessor.prototype, "viewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.MainShare);
            },
            enumerable: true,
            configurable: true
        });
        return ShareProcessor;
    }(tl3d.Processor));
    game.ShareProcessor = ShareProcessor;
})(game || (game = {}));
