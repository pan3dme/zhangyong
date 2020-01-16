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
    var GodDomainModule = /** @class */ (function (_super) {
        __extends(GodDomainModule, _super);
        function GodDomainModule() {
            return _super.call(this) || this;
        }
        GodDomainModule.prototype.getModuleName = function () {
            return "GodDomainModule";
        };
        GodDomainModule.prototype.listProcessors = function () {
            return [new game.GodDomainProcessor()];
        };
        /**
         * 初始化数据
         */
        GodDomainModule.prototype.onRegister = function () {
            game.GodDomainModel.getInstance().initModel();
        };
        return GodDomainModule;
    }(tl3d.Module));
    game.GodDomainModule = GodDomainModule;
    var GodDomainEvent = /** @class */ (function (_super) {
        __extends(GodDomainEvent, _super);
        function GodDomainEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        GodDomainEvent.SHOW_GODDOMAIN_VIEW = "SHOW_GODDOMAIN_VIEW";
        /** 打开自动匹配界面 */
        GodDomainEvent.SHOW_AUTO_MATCH_VIEW = "SHOW_AUTO_MATCH_VIEW";
        /** 打开商城界面 */
        GodDomainEvent.SHOW_SHOP_VIEW = "SHOW_SHOP_VIEW";
        /** 打开排行界面 */
        GodDomainEvent.SHOW_RANK_VIEW = "SHOW_RANK_VIEW";
        /** 打开队伍列表界面 */
        GodDomainEvent.SHOW_TEAM_LIST = "SHOW_TEAM_LIST";
        /** 打开规则界面 */
        GodDomainEvent.SHOW_RULE_VIEW = "SHOW_RULE_VIEW";
        /** 打开购买界面 */
        GodDomainEvent.SHOW_BUY_VIEW = "SHOW_BUY_VIEW";
        /** 创建队伍界面 */
        GodDomainEvent.CREATE_TEAM_VIEW = "CREATE_TEAM_VIEW";
        /** 打开加成规则 */
        GodDomainEvent.SHOW_BONUS_RULE = "SHOW_BONUS_RULE";
        /** 打开聊天界面 */
        GodDomainEvent.SHOW_CHAT_VIEW = "SHOW_CHAT_VIEW";
        /** 打开邀请界面 */
        GodDomainEvent.SHOW_INVITE_VIEW = "SHOW_INVITE_VIEW";
        /** 打开玩家界面 */
        GodDomainEvent.SHOW_PLAYER_INFO = "SHOW_PLAYER_INFO";
        /** 加入队伍 */
        GodDomainEvent.JOIN_TEAM = "JOIN_TEAM";
        /** 开始战斗 */
        GodDomainEvent.START_BATTLE = "START_BATTLE";
        /** 一键邀请 */
        GodDomainEvent.ONEKEY_INVITE = "ONEKEY_INVITE";
        /** 离开队伍 */
        GodDomainEvent.LEAVE_TEAM = "LEAVE_TEAM";
        return GodDomainEvent;
    }(tl3d.BaseEvent));
    game.GodDomainEvent = GodDomainEvent;
    var PoolConst;
    (function (PoolConst) {
        PoolConst["TeamListVo"] = "TeamListVo";
        PoolConst["InviteInfoVo"] = "InviteInfoVo";
    })(PoolConst = game.PoolConst || (game.PoolConst = {}));
})(game || (game = {}));
