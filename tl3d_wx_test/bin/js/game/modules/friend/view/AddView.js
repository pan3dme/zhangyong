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
    var AddView = /** @class */ (function (_super) {
        __extends(AddView, _super);
        function AddView() {
            var _this = _super.call(this) || this;
            /**已申请playerId */
            _this._playerIds = {};
            _this.list_friend.array = null;
            _this.list_friend.renderHandler = new Handler(_this, _this.onRender);
            _this.btn_update.on(Laya.Event.CLICK, _this, _this.update);
            _this.btn_lookup.on(Laya.Event.CLICK, _this, _this.lookup);
            _this.btnOneKeyApply.on(Laya.Event.CLICK, _this, _this.onOneKeyAdd);
            return _this;
        }
        Object.defineProperty(AddView.prototype, "dataSource", {
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
        /**退出 */
        AddView.prototype.onClosed = function () {
            this._playerIds = {};
            this.list_friend.array = null;
            this.lab_notfriend.visible = false;
        };
        AddView.prototype.show = function (closeOther, showEffect) {
            game.FriendModel.getInstance().queryList(Protocol.friend_friend_recommend, this.initFriendsList.bind(this));
        };
        /**初始化列表 */
        AddView.prototype.initFriendsList = function (list) {
            this.list_friend.array = list;
            this.updateState();
        };
        AddView.prototype.updateState = function () {
            var len = this.list_friend.array.length;
            this.are_putin.text = "";
            this.img_side.visible = len > 4;
            this.lab_notfriend.visible = len == 0;
        };
        /**list 渲染 */
        AddView.prototype.onRender = function (itemRender, index) {
            var data = itemRender.dataSource;
            if (data) {
                var Vo = new UserHeadVo(data.head, data.level, data.headFrame);
                itemRender.headbox.dataSource = Vo;
                itemRender.lab_name.text = data.name;
                itemRender.lab_jifen.text = "" + data.force;
                itemRender.lab_type.text = LanMgr.getLan("", 12248);
                itemRender.lab_type.color = ColorConst.TASK_GREEN;
                itemRender.btn_add.visible = !this.isapplyfriend(data.playerId);
                itemRender.lab_isapply.visible = !itemRender.btn_add.visible;
                itemRender.btn_add.on(Laya.Event.CLICK, this, this.addfriend, [data.playerId]);
                itemRender.headbox.on(Laya.Event.CLICK, this, this.onClickFriend, [data]);
            }
            else {
                itemRender.btn_add.off(Laya.Event.CLICK, this, this.addfriend);
                itemRender.headbox.off(Laya.Event.CLICK, this, this.onClickFriend);
            }
        };
        /**查找好友 */
        AddView.prototype.lookup = function () {
            var _this = this;
            if (this.are_putin.text.length === 0) {
                showToast(LanMgr.getLan("", 10321));
                return;
            }
            var args = {};
            args[Protocol.friend_friend_find.args.name] = this.are_putin.text;
            PLC.request(Protocol.friend_friend_find, args, function ($data, msg) {
                if (!$data) {
                    _this.initFriendsList(new Array());
                    return;
                }
                var array = new Array();
                array.push($data.targetData);
                _this.initFriendsList(array);
            });
        };
        /**刷新推荐还好友列表 */
        AddView.prototype.update = function () {
            var _this = this;
            /**推荐好友 */
            PLC.request(Protocol.friend_friend_recommend, null, function ($data, msg) {
                if (!$data)
                    return;
                var list = [];
                if ($data.recommondList) {
                    while ($data.recommondList.length > 0) {
                        var index = Math.floor(Math.random() * $data.recommondList.length);
                        list.push($data.recommondList[index]);
                        $data.recommondList.splice(index, 1);
                    }
                }
                _this.initFriendsList(list);
            });
        };
        /** 添加好友 */
        AddView.prototype.addfriend = function (playerId) {
            var _this = this;
            if (game.FriendModel.getInstance().getFriendList().length >= tb.TB_game_set.getMaxfriendNum()) {
                showToast(LanMgr.getLan('', 10322));
                return;
            }
            if (game.FriendModel.getInstance().isMyFriend(playerId)) {
                showToast(LanMgr.getLan('', 10133));
                return;
            }
            if (App.hero.playerId == playerId) {
                showToast(LanMgr.getLan('', 10320));
                return;
            }
            /**申请好友 */
            var args = {};
            args[Protocol.friend_friend_apply.args.playerId] = playerId;
            PLC.request(Protocol.friend_friend_apply, args, function ($data, msg, msgid) {
                // 申请成功列表 -- 单独申请之后,没有成功时不会下发$data
                var applyList = $data ? ($data['applyList']) || [] : [];
                for (var _i = 0, applyList_1 = applyList; _i < applyList_1.length; _i++) {
                    var id = applyList_1[_i];
                    _this._playerIds[id] = 1;
                }
                // 单独申请之后,没有成功列表时移除该项
                if (applyList.length <= 0) {
                    var index = _this.list_friend.array.findIndex(function (info, index) {
                        return info && playerId == info.playerId;
                    });
                    if (index != -1) {
                        _this.list_friend.deleteItem(index);
                    }
                }
                _this.list_friend.refresh();
                _this.updateState();
            });
        };
        /** 一键申请 */
        AddView.prototype.onOneKeyAdd = function () {
            var _this = this;
            var ids = [];
            this.list_friend.array.forEach(function (vo) {
                if (vo && vo.playerId) {
                    ids.push(vo.playerId);
                }
            });
            if (ids.length <= 0) {
                showToast(LanMgr.getLan('', 10323));
                return;
            }
            if (game.FriendModel.getInstance().getFriendList().length >= tb.TB_game_set.getMaxfriendNum()) {
                showToast(LanMgr.getLan('', 10322));
                return;
            }
            /**申请好友 */
            var args = {};
            args[Protocol.friend_friend_oneKeyApply.args.playerIds] = ids;
            PLC.request(Protocol.friend_friend_oneKeyApply, args, function ($data, msg, msgid) {
                // 申请成功列表
                var applyList = $data ? ($data['applyList']) || [] : [];
                for (var _i = 0, applyList_2 = applyList; _i < applyList_2.length; _i++) {
                    var id = applyList_2[_i];
                    _this._playerIds[id] = 1;
                }
                // 一键申请之后，成功的列表显示已申请状态，不成功(对方好友满了)的移除
                for (var _a = 0, applyList_3 = applyList; _a < applyList_3.length; _a++) {
                    var id = applyList_3[_a];
                    var index = _this.list_friend.array.findIndex(function (info, index) {
                        if (!info)
                            return true;
                        return info ? applyList.indexOf(info.playerId) == -1 : true;
                    });
                    if (index != -1) {
                        _this.list_friend.deleteItem(index);
                    }
                }
                _this.list_friend.refresh();
                _this.updateState();
            });
        };
        /**该Id是否已申请 */
        AddView.prototype.isapplyfriend = function (playerId) {
            return this._playerIds.hasOwnProperty(playerId);
        };
        AddView.prototype.onClickFriend = function (info) {
            var event = new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW), { playerId: info.playerId, event: event });
        };
        return AddView;
    }(ui.friend.AddFriendUI));
    game.AddView = AddView;
})(game || (game = {}));
