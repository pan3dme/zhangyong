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
    var ApplyView = /** @class */ (function (_super) {
        __extends(ApplyView, _super);
        function ApplyView() {
            var _this = _super.call(this) || this;
            _this._model = game.FriendModel.getInstance();
            _this.list_friend.array = null;
            _this.list_friend.renderHandler = new Handler(_this, _this.onRender);
            _this.btn_update.on(Laya.Event.CLICK, _this, _this.update);
            _this.btnOneKeyAgree.on(Laya.Event.CLICK, _this, _this.onOnekeyAgree);
            _this.btnOneKeyRefuse.on(Laya.Event.CLICK, _this, _this.onOnekeyRefuse);
            return _this;
        }
        Object.defineProperty(ApplyView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (show) {
                this._dataSource = show;
                if (show) {
                    this.show();
                }
                else {
                    this.exit();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**退出 */
        ApplyView.prototype.exit = function () {
            this.list_friend.array = null;
        };
        ApplyView.prototype.show = function (closeOther, showEffect) {
            this._model.queryList(Protocol.friend_friend_apply_list, this.initFriendsList.bind(this));
        };
        /**初始化列表 */
        ApplyView.prototype.initFriendsList = function (applyList) {
            this.list_friend.array = applyList;
            this.updateState();
        };
        ApplyView.prototype.updateState = function () {
            var num = this.list_friend.array.length;
            this._model.updateFriendApply(num > 0);
            this.img_side.visible = num > 5;
            this.lab_notfriend.visible = num == 0;
            this.lab_friendsNum.text = LanMgr.getLan("", -12411, num);
        };
        /**list 渲染 */
        ApplyView.prototype.onRender = function (itemRender, index) {
            var info = itemRender.dataSource;
            if (info) {
                var Vo = new UserHeadVo(info.head, info.level, info.headFrame);
                itemRender.headbox.dataSource = Vo;
                itemRender.lab_name.text = info.name;
                itemRender.lab_force.text = LanMgr.getLan("", 10117, info.force);
                itemRender.lab_online.text = info.online == 1 ? LanMgr.getLan("", 12248) : GameUtil.getOfflineTimeStr(info.outlineTime, App.serverTime / 1000);
                itemRender.lab_online.color = info.online == 1 ? "#17d745" : "#535353";
                itemRender.btn_agree.on(Laya.Event.CLICK, this, this.onFriendApply, [itemRender, 0]);
                itemRender.btn_refuse.on(Laya.Event.CLICK, this, this.onFriendApply, [itemRender, 1]);
                itemRender.headbox.on(Laya.Event.CLICK, this, this.onClickFriend, [info]);
            }
            else {
                itemRender.btn_agree.off(Laya.Event.CLICK, this, this.onFriendApply);
                itemRender.btn_refuse.off(Laya.Event.CLICK, this, this.onFriendApply);
                itemRender.headbox.off(Laya.Event.CLICK, this, this.onClickFriend);
            }
        };
        /** 好友申请操作*/
        ApplyView.prototype.onFriendApply = function (itemRender, opt_type) {
            if (itemRender.dataSource) {
                this.onApplyOperation(itemRender.dataSource, opt_type);
            }
        };
        /** 一键同意 */
        ApplyView.prototype.onOnekeyAgree = function () {
            this.onApplyOperation(null, 0);
        };
        /** 一键拒绝 */
        ApplyView.prototype.onOnekeyRefuse = function () {
            this.onApplyOperation(null, 1);
        };
        /** 同意或者拒绝 */
        ApplyView.prototype.onApplyOperation = function (info, opt_type) {
            var _this = this;
            var isOneKey = info ? false : true;
            var len = this.list_friend.array.length;
            var isAgree = opt_type == 0;
            // 一键操作时，判断是否有好友申请
            if (isOneKey && len <= 0) {
                showToast(LanMgr.getLan('', 10324));
                return;
            }
            // 同意操作时,需要判断好友是否满了
            if (isAgree && this._model.getFriendList().length >= tb.TB_game_set.getMaxfriendNum()) {
                showToast(LanMgr.getLan("", 10325));
                return;
            }
            var args = {};
            args[Protocol.friend_friend_apply_opt.args.playerId] = info ? info.playerId : null;
            args[Protocol.friend_friend_apply_opt.args.opt_type] = opt_type;
            PLC.request(Protocol.friend_friend_apply_opt, args, function ($data, msg) {
                if (!$data)
                    return;
                // 取消拉黑
                App.hero.removeBlockListById($data.delBlack);
                App.hero.removeBlackList($data.delBlackList);
                if (isOneKey) {
                    if (isAgree) {
                        // 一键同意成功有返回addfriendList列表
                        var len_1 = Array.isArray($data.addfriendList) ? $data.addfriendList.length : 0;
                        len_1 > 0 && showToast(LanMgr.getLan('', 10326, len_1));
                    }
                    else {
                        // 一键拒绝
                        _this.list_friend.array = null;
                    }
                }
                else {
                    // 单个同意成功有返回addfriend数据,失败表示对方好友满了等.
                    var isSucc = $data.addfriend ? true : false;
                    isAgree && isSucc && showToast(LanMgr.getLan('', 10327, info ? info.name : ""));
                    // 拒绝
                    !isAgree && showToast(LanMgr.getLan('', 10328, info ? info.name : ""));
                }
                // 删除同意或者对方好友满了 列表
                if ($data.delrequest) {
                    _this.delApplyItem([$data.delrequest]);
                }
                if ($data.delrequestList) {
                    _this.delApplyItem($data.delrequestList);
                }
                _this.updateState();
            });
        };
        /** 删除项 */
        ApplyView.prototype.delApplyItem = function (ids) {
            var _loop_1 = function (id) {
                var index = this_1.list_friend.array.findIndex(function (info, index) {
                    return info ? info.playerId == id : false;
                });
                if (index != -1) {
                    this_1.list_friend.deleteItem(index);
                }
            };
            var this_1 = this;
            for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                var id = ids_1[_i];
                _loop_1(id);
            }
        };
        /** 查看玩家详情 */
        ApplyView.prototype.onClickFriend = function (info) {
            if (!info)
                return;
            var event = new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW), { playerId: info.playerId, event: event });
        };
        /**刷新数据 */
        ApplyView.prototype.update = function () {
            this._model.queryList(Protocol.friend_friend_apply_list, this.initFriendsList.bind(this));
        };
        return ApplyView;
    }(ui.friend.ApplyfriendUI));
    game.ApplyView = ApplyView;
})(game || (game = {}));
