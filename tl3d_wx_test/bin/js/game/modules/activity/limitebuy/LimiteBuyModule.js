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
    var LimiteBuyModule = /** @class */ (function (_super) {
        __extends(LimiteBuyModule, _super);
        function LimiteBuyModule() {
            return _super.call(this) || this;
        }
        LimiteBuyModule.prototype.getModuleName = function () {
            return "LimiteBuyModule";
        };
        LimiteBuyModule.prototype.listProcessors = function () {
            return [new game.LimiteBuyProcessor()];
        };
        LimiteBuyModule.prototype.onRegister = function () {
            game.LimiteBuyModel.getInstance().initModel();
        };
        return LimiteBuyModule;
    }(tl3d.Module));
    game.LimiteBuyModule = LimiteBuyModule;
    var LimiteBuyEvent = /** @class */ (function (_super) {
        __extends(LimiteBuyEvent, _super);
        function LimiteBuyEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 初始化限时团购 */
        LimiteBuyEvent.UPDATE_RP = "UPDATE_RP";
        /** 打开限时购买主界面 */
        LimiteBuyEvent.SHOW_LIMITEBUY_VIEW = "SHOW_SUMMON_VIEW";
        /** 限时团购购买请求 */
        LimiteBuyEvent.LIMITEGROUP_BUY = "LIMITEGROUP_BUY";
        /** 更新限时团购数据 */
        LimiteBuyEvent.UPDATE_LIMITEGROUPDATA = "UPDATE_LIMITEGROUPDATA";
        /** 限时召唤召唤请求 */
        LimiteBuyEvent.LIMITESUMMON_BUY = "LIMITESUMMON_BUY";
        /** 限时召唤领取宝箱请求 */
        LimiteBuyEvent.LIMITESUMMON_REWARD = "LIMITESUMMON_REWARD";
        /** 限时召唤排名奖励界面 */
        LimiteBuyEvent.SHOW_RANK_VIEW = "SHOW_RANK_VIEW";
        return LimiteBuyEvent;
    }(tl3d.BaseEvent));
    game.LimiteBuyEvent = LimiteBuyEvent;
    var TabType;
    (function (TabType) {
        TabType[TabType["summon"] = 0] = "summon";
        TabType[TabType["group"] = 1] = "group";
    })(TabType = game.TabType || (game.TabType = {}));
})(game || (game = {}));
