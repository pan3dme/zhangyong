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
    var IslandModule = /** @class */ (function (_super) {
        __extends(IslandModule, _super);
        function IslandModule() {
            return _super.call(this) || this;
        }
        IslandModule.prototype.getModuleName = function () {
            return "IslandModule";
        };
        IslandModule.prototype.listProcessors = function () {
            return [new game.IslandProcessor()];
        };
        IslandModule.prototype.onRegister = function () {
            game.IslandModel.getInstance().initModel();
        };
        return IslandModule;
    }(tl3d.Module));
    game.IslandModule = IslandModule;
    var IslandsEvent = /** @class */ (function (_super) {
        __extends(IslandsEvent, _super);
        function IslandsEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        IslandsEvent.SHOW_MAIN_VIEW = "SHOW_MAIN_VIEW";
        /** 进入岛屿 */
        IslandsEvent.SHOW_ORE_MAP = "SHOW_ORE_MAP";
        /** 打开规则界面 */
        IslandsEvent.SHOW_RULE_VIEW = "SHOW_RULE_VIEW";
        /** 打开记录界面 */
        IslandsEvent.SHOW_RESCORD_VIEW = "SHOW_RESCORD_VIEW";
        /** 打开购买界面 */
        IslandsEvent.SHOW_BUY_VIEW = "SHOW_BUY_VIEW";
        /** 打开矿产信息界面 */
        IslandsEvent.OPEN_ORE_INFO = "OPEN_ORE_INFO";
        /** 打开矿产说明 */
        IslandsEvent.OPEN_ORE_EXPLAIN = "OPEN_ORE_EXPLAIN";
        /** 占领矿产 */
        IslandsEvent.OCCUPY_ORE = "OCCUPY_ORE";
        /** 掠夺矿产 */
        IslandsEvent.ROB_ORE = "ROB_ORE";
        /** 更新岛屿的矿点列表 */
        IslandsEvent.UPDATE_ORE_LIST = "UPDATE_ORE_LIST";
        /** 更新记录信息 */
        IslandsEvent.UPDATE_RECORD_INFO = "UPDATE_RECORD_INFO";
        return IslandsEvent;
    }(tl3d.BaseEvent));
    game.IslandsEvent = IslandsEvent;
})(game || (game = {}));
