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
    var FriendModule = /** @class */ (function (_super) {
        __extends(FriendModule, _super);
        function FriendModule() {
            return _super.call(this) || this;
        }
        FriendModule.prototype.getModuleName = function () {
            return "FriendModule";
        };
        FriendModule.prototype.listProcessors = function () {
            return [new game.FriendProcessor()];
        };
        /**
         * 初始化数据
         */
        FriendModule.prototype.onRegister = function () {
            game.FriendModel.getInstance().queryList(Protocol.friend_friend_list, function () {
                game.ChatModel.getInstance().initModel();
            });
        };
        return FriendModule;
    }(tl3d.Module));
    game.FriendModule = FriendModule;
    var FriendEvent = /** @class */ (function (_super) {
        __extends(FriendEvent, _super);
        function FriendEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**好友界面 */
        FriendEvent.SHOW_FRIEND_PANEL = "SHOW_FRIEND_PANEL";
        /**申请好友 */
        FriendEvent.FRIEND_PANAEL_ADDFRIEND = "FRIEND_PANAEL_ADDFRIEND";
        /**好友切磋 */
        FriendEvent.FRIEND_QIECUO = "FRIEND_QIECUO";
        /** 更新好友申请列表 */
        FriendEvent.UPDATE_FRIEND_APPLY = "UPDATE_FRIEND_APPLY";
        return FriendEvent;
    }(tl3d.BaseEvent));
    game.FriendEvent = FriendEvent;
    var IFriendInfoVo = /** @class */ (function () {
        function IFriendInfoVo() {
        }
        return IFriendInfoVo;
    }());
    game.IFriendInfoVo = IFriendInfoVo;
    /** 好友推荐vo */
    var IFriendRecommendSvo = /** @class */ (function () {
        function IFriendRecommendSvo() {
        }
        return IFriendRecommendSvo;
    }());
    game.IFriendRecommendSvo = IFriendRecommendSvo;
    /** 好友申请vo */
    var IFriendApplySvo = /** @class */ (function () {
        function IFriendApplySvo() {
        }
        return IFriendApplySvo;
    }());
    game.IFriendApplySvo = IFriendApplySvo;
})(game || (game = {}));
