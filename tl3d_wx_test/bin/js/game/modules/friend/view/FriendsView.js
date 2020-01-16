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
    var FriendsView = /** @class */ (function (_super) {
        __extends(FriendsView, _super);
        function FriendsView() {
            var _this = _super.call(this) || this;
            _this.list_friend.array = null;
            _this.btnPrivateChat.on(Laya.Event.CLICK, _this, _this.showPrivateChat);
            _this.btn_allgift.on(Laya.Event.CLICK, _this, _this.onOneKey, [null]);
            _this._model = game.FriendModel.getInstance();
            return _this;
        }
        Object.defineProperty(FriendsView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (show) {
                this._dataSource = show;
                if (show) {
                    this.show();
                }
                else {
                    this.onClosed();
                }
            },
            enumerable: true,
            configurable: true
        });
        FriendsView.prototype.onClosed = function () {
        };
        FriendsView.prototype.show = function (closeOther, showEffect) {
            game.FriendModel.getInstance().queryList(Protocol.friend_friend_list, this.initView.bind(this));
        };
        /**初始化列表 */
        FriendsView.prototype.initView = function () {
            var list = game.FriendModel.getInstance().getFriendList(true);
            if (list && list.length != 0) {
                this.list_friend.visible = true;
                this.lab_notfriend.visible = false;
            }
            else {
                this.list_friend.visible = false;
                this.lab_notfriend.visible = true;
            }
            var date = new Date(App.serverTimeSecond * 1000);
            date.setHours(0, 0, 0, 0);
            this._model.dateTime = date.getTime() / 1000;
            this.list_friend.array = list;
            this.lab_friendship.text = "X" + App.hero.friend.toString();
            this.lab_friendsNum.text = list.length.toString() + "/" + tb.TB_game_set.getMaxfriendNum();
            this.lab_gain.text = "X" + (tb.TB_game_set.getMaxFriendPonit() - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.friendPoint)).toString();
            if (list.length > 4)
                this.img_side.visible = true;
            else
                this.img_side.visible = false;
        };
        /** 一键领取并赠送 */
        FriendsView.prototype.onOneKey = function () {
            var _this = this;
            var arrdata = new Array();
            if (this.list_friend.array.length > 0) {
                arrdata = this.list_friend.array;
            }
            else {
                showToast(LanMgr.getLan("", 10329));
                return;
            }
            var allfriendgift = true;
            var allfriendreceive = true;
            for (var i in arrdata) {
                if (arrdata[i].giveTime < this._model.dateTime) {
                    allfriendgift = false;
                }
                if (arrdata[i].pointNum > 0) {
                    allfriendreceive = false;
                }
            }
            if (allfriendgift && allfriendreceive) {
                //所有都赠送和领取了
                showToast(LanMgr.getLan("", 10330));
                return;
            }
            if (!allfriendgift) {
                PLC.request(Protocol.friend_friend_give, null, function ($data, msg) {
                    if (!$data)
                        return;
                    game.FriendModel.getInstance().setGiveTime($data['giveId'], $data['giveTime']);
                    showToast(LanMgr.getLan("", 10331));
                    _this.initView();
                });
            }
            if (!allfriendreceive) {
                PLC.request(Protocol.friend_friend_pointGet, null, function ($data, msg) {
                    if (!$data)
                        return;
                    game.FriendModel.getInstance().delPoint($data['delPoint']);
                    showToast(LanMgr.getLan("", 10332));
                    _this.initView();
                });
            }
        };
        /** 展示私聊列表 */
        FriendsView.prototype.showPrivateChat = function () {
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_PRIVATE_CHAT_VIEW));
        };
        return FriendsView;
    }(ui.friend.FriendListUI));
    game.FriendsView = FriendsView;
})(game || (game = {}));
