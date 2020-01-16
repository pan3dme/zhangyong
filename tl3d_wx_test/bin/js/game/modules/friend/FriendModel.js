/**
* name
*/
var game;
(function (game) {
    var FriendModel = /** @class */ (function () {
        function FriendModel() {
            /** 登录时是否显示好友申请红点 */
            this.loginApplyRp = false;
            /** 是否有好友申请 */
            this.hasFriendApply = false;
            this._friendList = new Array();
            this.recommendList = new Array();
        }
        FriendModel.getInstance = function () {
            if (!FriendModel._instance) {
                FriendModel._instance = new FriendModel();
            }
            return FriendModel._instance;
        };
        FriendModel.prototype.updateFriendApply = function (flag) {
            this.hasFriendApply = flag;
            dispatchEvt(new game.FriendEvent(game.FriendEvent.UPDATE_FRIEND_APPLY));
        };
        /** 好友请求红点 */
        FriendModel.prototype.friendApplyRp = function () {
            return this.loginApplyRp || this.hasFriendApply;
        };
        /**
         * 查询好友数据
         * @param type
         * @param callBack
         */
        FriendModel.prototype.queryList = function (type, callBack) {
            var _this = this;
            if (callBack === void 0) { callBack = null; }
            PLC.request(type, null, function (sdata, msg) {
                if (!sdata)
                    return;
                switch (type.name) {
                    case Protocol.friend_friend_list.name:
                        var flist = sdata.friendList || [];
                        _this.checkFriend(_this._friendList, flist);
                        _this._friendList = flist;
                        if (callBack) {
                            callBack(flist);
                        }
                        break;
                    case Protocol.friend_friend_apply_list.name:
                        var applyList = sdata.requestList || [];
                        _this.loginApplyRp = false;
                        _this.updateFriendApply(applyList.length > 0);
                        if (callBack) {
                            callBack(applyList);
                        }
                        break;
                    case Protocol.friend_friend_recommend.name:
                        _this.recommendList = sdata.recommondList;
                        if (callBack) {
                            callBack(sdata.recommondList);
                        }
                        break;
                }
            });
        };
        /** 获取好友列表 */
        FriendModel.prototype.getFriendList = function (sort) {
            if (sort === void 0) { sort = false; }
            if (sort) {
                this._friendList.sort(function (a, b) {
                    if (a.logoutTime == 0 && b.logoutTime == 0) {
                        return b.force - a.force;
                    }
                    else if (a.logoutTime == 0) {
                        return 1;
                    }
                    else if (b.logoutTime == 0) {
                        return 1;
                    }
                    else {
                        return b.logoutTime - a.logoutTime;
                    }
                });
            }
            return this._friendList;
        };
        /** 检测出 删除自己的好友 及 添加自己的好友*/
        FriendModel.prototype.checkFriend = function (curList, changeList) {
            var newAry = [];
            for (var _i = 0, changeList_1 = changeList; _i < changeList_1.length; _i++) {
                var info = changeList_1[_i];
                newAry.push(info.playerId);
            }
            for (var _a = 0, curList_1 = curList; _a < curList_1.length; _a++) {
                var info = curList_1[_a];
                // 被删除了
                if (newAry.indexOf(info.playerId) == -1) {
                    game.ChatModel.getInstance().delPrivateChat(info.playerId);
                }
            }
        };
        /** 是否是好友 */
        FriendModel.prototype.isMyFriend = function (playerId) {
            return this._friendList.some(function (vo) {
                return vo.playerId == playerId;
            });
        };
        /** 删除好友 */
        FriendModel.prototype.delFriend = function (playerId) {
            var index = this._friendList.findIndex(function (vo) {
                return vo.playerId == playerId;
            });
            if (index != -1) {
                this._friendList.splice(index, 1);
            }
            game.PrivateChatStorage.getInstance().delStorage(playerId);
            game.ChatModel.getInstance().delPrivateChat(playerId);
        };
        /** 领取友情点之后置空 */
        FriendModel.prototype.delPoint = function (ids) {
            ids = ids || [];
            var friends = this.getFriendList();
            friends.forEach(function (vo) {
                if (ids.indexOf(vo.playerId) != -1) {
                    vo.pointNum = 0;
                }
            });
        };
        /** 设置赠送时间 */
        FriendModel.prototype.setGiveTime = function (ids, time) {
            ids = ids || [];
            var friends = this.getFriendList();
            friends.forEach(function (vo) {
                if (ids.indexOf(vo.playerId) != -1) {
                    vo.giveTime = time;
                }
            });
        };
        /** 获取好友 */
        FriendModel.prototype.getFriendById = function (playerId) {
            return this._friendList.find(function (vo) {
                return vo.playerId == playerId;
            });
        };
        return FriendModel;
    }());
    game.FriendModel = FriendModel;
})(game || (game = {}));
