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
    var FriendIR = /** @class */ (function (_super) {
        __extends(FriendIR, _super);
        function FriendIR() {
            var _this = _super.call(this) || this;
            _this.btn_gift.on(Laya.Event.CLICK, _this, _this.allgift);
            _this.headbox.on(Laya.Event.CLICK, _this, _this.onClickFriend);
            _this.btn_receive.on(Laya.Event.CLICK, _this, _this.onReceive);
            _this.btnFight.on(Laya.Event.CLICK, _this, _this.onQieCuo);
            return _this;
        }
        Object.defineProperty(FriendIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        FriendIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var Vo = new UserHeadVo(info.head, info.level, info.headFrame);
                this.headbox.dataSource = Vo;
                this.lab_name.text = info.name;
                this.lab_shenli.text = LanMgr.getLan("", 10117, info.force);
                this.lab_type.text = info.logoutTime == 0 ? LanMgr.getLan("", 12248) : GameUtil.getTimePrev(info.logoutTime);
                this.lab_type.color = info.logoutTime == 0 ? ColorConst.TASK_GREEN : ColorConst.GRAY;
                this.btn_gift.visible = false;
                this.btn_hasgift.visible = false;
                this.btn_receive.visible = false;
                if (info.pointNum > 0) {
                    //有友情值可以领
                    this.btn_receive.visible = true;
                }
                else if (info.giveTime < game.FriendModel.getInstance().dateTime) {
                    //今日未赠送
                    this.btn_gift.visible = true;
                }
                else {
                    this.btn_hasgift.visible = true;
                }
            }
        };
        /** 领取 */
        FriendIR.prototype.onReceive = function () {
            var _this = this;
            var info = this.dataSource;
            if (info && info.pointNum > 0) {
                var args = {};
                args[Protocol.friend_friend_pointGet.args.playerId] = info.playerId;
                PLC.request(Protocol.friend_friend_pointGet, args, function ($data, msg) {
                    if (!$data)
                        return;
                    game.FriendModel.getInstance().delPoint($data['delPoint']);
                    _this.refreshData();
                });
            }
        };
        FriendIR.prototype.onClickFriend = function () {
            var info = this.dataSource;
            if (info) {
                var event_1 = new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL);
                dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW), { playerId: info.playerId, event: event_1 });
            }
        };
        /** 切磋 */
        FriendIR.prototype.onQieCuo = function () {
            var info = this.dataSource;
            if (info) {
                var event_2 = new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL);
                dispatchEvt(new game.FriendEvent(game.FriendEvent.FRIEND_QIECUO), { playerId: info.playerId, event: event_2 });
            }
        };
        /** 赠送 */
        FriendIR.prototype.allgift = function () {
            var _this = this;
            var info = this.dataSource;
            if (info) {
                var args = {};
                args[Protocol.friend_friend_give.args.playerId] = info.playerId;
                PLC.request(Protocol.friend_friend_give, args, function ($data, msg) {
                    if (!$data)
                        return;
                    game.FriendModel.getInstance().setGiveTime($data['giveId'], $data['giveTime']);
                    _this.refreshData();
                });
            }
        };
        return FriendIR;
    }(ui.friend.FriendIRUI));
    game.FriendIR = FriendIR;
})(game || (game = {}));
