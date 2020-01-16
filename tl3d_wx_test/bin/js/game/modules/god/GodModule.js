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
    var GodModule = /** @class */ (function (_super) {
        __extends(GodModule, _super);
        function GodModule() {
            return _super.call(this) || this;
        }
        GodModule.prototype.getModuleName = function () {
            return "GodModule";
        };
        GodModule.prototype.listProcessors = function () {
            return [new game.GodProcessor(), new game.TreasureProcessor()];
        };
        /**
        * 初始化数据
        */
        GodModule.prototype.onRegister = function () {
            game.GodModel.getInstance();
        };
        return GodModule;
    }(tl3d.Module));
    game.GodModule = GodModule;
    var GodEvent = /** @class */ (function (_super) {
        __extends(GodEvent, _super);
        function GodEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        GodEvent.SHOW_SHENGLING_PANEL = "SHOW_SHENGLING_PANEL";
        //点击觉醒
        GodEvent.CLICK_JUEXING_EVENT = "CLICK_JUEXING_EVENT";
        //选择英雄
        GodEvent.SELECT_GOD_EVENT = "SELECT_GOD_EVENT";
        //某英雄变化
        GodEvent.CHANGE_GOD_ITEM = "CHANGE_GOD_ITEM";
        // 显示克制界面
        GodEvent.SHOW_KEZHI_VIEW = "SHOW_KEZHI_VIEW";
        //布阵成功
        GodEvent.BUZHEN_COMPLETE = "BUZHEN_COMPLETE";
        /** 布阵成功 -- 通过布阵界面 */
        GodEvent.BUZHEN_COMPLETE_ALL = "BUZHEN_COMPLETE_ALL";
        /** 布阵成功 -- 通过单只英雄的上阵下针 */
        GodEvent.BUZHEN_COMPLETE_ONE = "BUZHEN_COMPLETE_ONE";
        /** 打开布阵界面 */
        GodEvent.SHOW_BUZHEN_PANEL = "SHOW_BUZHEN_PANEL";
        /** 打开英雄更换界面 */
        GodEvent.SHOW_REPLACE_VIEW = "SHOW_REPLACE_VIEW";
        /** 打开英雄养成界面 */
        GodEvent.SHOW_GOD_CULTURE_VIEW = "SHOW_GOD_CULTURE_VIEW";
        //布阵选择英雄
        GodEvent.BUZHEN_SELECT_ROLE = "BUZHEN_SELECT_ROLE";
        //使用经验池升级
        GodEvent.USE_EXPPOOL = "USE_EXPPOOL";
        //穿戴成功
        GodEvent.WEAR_SUCCESS = "WEAR_SUCCESS";
        //点击升星
        GodEvent.CLICK_STAR_UP = "CLICK_STAR_UP";
        GodEvent.CHOOSE_LINEUP_GOD = "CHOOSE_LINEUP_GOD";
        GodEvent.SHOW_SHENGJIE_ATTR = "SHOW_SHENGJIE_ATTR";
        /**神灵属性改变 */
        GodEvent.GOD_PORP_CHANGE = "GOD_LEVEL_UP_SUC";
        GodEvent.RONGHUN_SUCCESS = "RONGHUN_SUCCESS";
        GodEvent.EQUIP_LEVELUP_SUCCESS = "EQUIP_LEVELUP_SUCCESS";
        /** 切换tab界面成功 */
        GodEvent.SWITCH_TAB_SUCCESS = "SWITCH_TAB_SUCCESS";
        //英雄变化
        GodEvent.GOD_CHANGE = "GOD_CHANGE";
        /** 添加神灵 */
        GodEvent.ADD_GODS = "ADD_GODS";
        // 使用经验池升级成功
        GodEvent.USE_EXPPOOL_SUCCESS = "USE_EXPPOOL_SUCCESS";
        // 英雄升阶成功
        GodEvent.GOD_SHENGJIE_SUCCESS = "GOD_SHENGJIE_SUCCESS";
        /** 觉醒成功 */
        GodEvent.GOD_AWAKEN_SUCCESS = "GOD_AWAKEN_SUCCESS";
        /** 选中融魂 */
        GodEvent.SELECT_RONGHUN_ITEM = "SELECT_RONGHUN_ITEM";
        /** 上阵一只神灵，加号上阵的 */
        GodEvent.SHANGZHEN_ONE_GOD = "SHANGZHEN_ONE_GOD";
        /** 上阵阵营英雄数量改变 */
        // public static LINE_RACE_GOD_NUM_CHANGE : string = "LINE_RACE_GOD_NUM_CHANGE";
        /** 激活添加皮肤ID */
        GodEvent.ADD_SKINID = "ADD_SKINID";
        /** 神灵最高星级改变 */
        GodEvent.GOD_MAX_STAR_LV_CHANGE = "GOD_MAX_STAR_LV_CHANGE";
        return GodEvent;
    }(tl3d.BaseEvent));
    game.GodEvent = GodEvent;
})(game || (game = {}));
