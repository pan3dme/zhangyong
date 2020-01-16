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
    var ChatTabIR = /** @class */ (function (_super) {
        __extends(ChatTabIR, _super);
        function ChatTabIR() {
            var _this = _super.call(this) || this;
            _this._model = game.ChatModel.getInstance();
            return _this;
        }
        Object.defineProperty(ChatTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        ChatTabIR.prototype.refreshView = function () {
            var channel = this.dataSource;
            if (channel) {
                this.btnChannel.label = LanMgr.channelNames[channel];
                var newNum = this._model.getNewNum(channel);
                this.lbNum.visible = this.imgNum.visible = newNum > 0;
                this.lbNum.text = newNum > game.ChatModel.MAX_COUNT ? game.ChatModel.MAX_COUNT + "+" : "" + newNum;
            }
            else {
                this.lbNum.visible = this.imgNum.visible = false;
            }
        };
        return ChatTabIR;
    }(ui.chat.ChatTabIRUI));
    game.ChatTabIR = ChatTabIR;
})(game || (game = {}));
