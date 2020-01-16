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
    var GloryModule = /** @class */ (function (_super) {
        __extends(GloryModule, _super);
        function GloryModule() {
            return _super.call(this) || this;
        }
        GloryModule.prototype.getModuleName = function () {
            return "GloryModule";
        };
        GloryModule.prototype.listProcessors = function () {
            return [new game.GloryProcessor()];
        };
        /**
         * 初始化数据
         */
        GloryModule.prototype.onRegister = function () {
            game.GloryModel.getInstance().initModel();
        };
        return GloryModule;
    }(tl3d.Module));
    game.GloryModule = GloryModule;
    var GloryEvent = /** @class */ (function (_super) {
        __extends(GloryEvent, _super);
        function GloryEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        GloryEvent.SHOW_MAIN_VIEW = "SHOW_MAIN_VIEW";
        /** 上届回顾 */
        GloryEvent.SHOW_LAST_REVIEW = "SHOW_LAST_REVIEW";
        /** 奖励界面 */
        GloryEvent.SHOW_AWARD_VIEW = "SHOW_AWARD_VIEW";
        /** 规则界面 */
        GloryEvent.SHOW_RULE_VIEW = "SHOW_RULE_VIEW";
        /** 记录界面 */
        GloryEvent.SHOW_RECORD_VIEW = "SHOW_RECORD_VIEW";
        GloryEvent.SHOW_RECORD_BACK_VIEW = "SHOW_RECORD_BACK_VIEW";
        /** 商店 */
        GloryEvent.SHOW_SHOP_VIEW = "SHOW_SHOP_VIEW";
        /** 显示回放 */
        GloryEvent.SHOW_PLAYBACK = "SHOW_PLAYBACK";
        /** 押注 */
        GloryEvent.BET_PLAYER = "BET_PLAYER";
        /** 押注成功 */
        GloryEvent.BET_SUCCESS = "BET_SUCCESS";
        /** 报名成功 */
        GloryEvent.JOIN_SUCCESS = "JOIN_SUCCESS";
        GloryEvent.SHOW_REDPOINT = "SHOW_REDPOINT";
        return GloryEvent;
    }(tl3d.BaseEvent));
    game.GloryEvent = GloryEvent;
    var GroupType;
    (function (GroupType) {
        GroupType[GroupType["benfu"] = 1] = "benfu";
        GroupType[GroupType["kuafu"] = 2] = "kuafu";
    })(GroupType = game.GroupType || (game.GroupType = {}));
    var GloryId;
    (function (GloryId) {
        GloryId[GloryId["benfu_haixuan"] = 1] = "benfu_haixuan";
        GloryId[GloryId["benfu_16t8"] = 2] = "benfu_16t8";
        GloryId[GloryId["benfu_8t4"] = 3] = "benfu_8t4";
        GloryId[GloryId["benfu_4t2"] = 4] = "benfu_4t2";
        GloryId[GloryId["benfu_juesai"] = 5] = "benfu_juesai";
        GloryId[GloryId["kuafu_haixuan"] = 6] = "kuafu_haixuan";
        GloryId[GloryId["kuafu_16t8"] = 7] = "kuafu_16t8";
        GloryId[GloryId["kuafu_8t4"] = 8] = "kuafu_8t4";
        GloryId[GloryId["kuafu_4t2"] = 9] = "kuafu_4t2";
        GloryId[GloryId["kuafu_juesai"] = 10] = "kuafu_juesai";
    })(GloryId = game.GloryId || (game.GloryId = {}));
})(game || (game = {}));
