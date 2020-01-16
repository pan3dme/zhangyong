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
    var PrivateChatIR = /** @class */ (function (_super) {
        __extends(PrivateChatIR, _super);
        function PrivateChatIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PrivateChatIR.prototype, "dataSource", {
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
        PrivateChatIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                var friend = game.FriendModel.getInstance().getFriendById(data.playerId);
                if (friend) {
                    this.headBox.dataSource = new UserHeadVo(friend.head, friend.level, friend.headFrame);
                    this.lab_name.text = friend.name;
                }
                this.updateRedPoint();
                this.btnDel.on(Laya.Event.CLICK, this, this.onDel);
            }
            else {
                this.btnDel.off(Laya.Event.CLICK, this, this.onDel);
            }
        };
        /** 更新红点，是否有新消息 */
        PrivateChatIR.prototype.updateRedPoint = function () {
            var data = this.dataSource;
            if (data) {
                this.redpoint.visible = data.newNum > 0;
            }
        };
        PrivateChatIR.prototype.onDel = function () {
            dispatchEvt(new game.ChatEvent(game.ChatEvent.DEL_PRIVATE_CHAT, this));
        };
        return PrivateChatIR;
    }(ui.chat.PrivateChatIRUI));
    game.PrivateChatIR = PrivateChatIR;
})(game || (game = {}));
