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
    var GuajiModule = /** @class */ (function (_super) {
        __extends(GuajiModule, _super);
        function GuajiModule() {
            return _super.call(this) || this;
        }
        GuajiModule.prototype.getModuleName = function () {
            return "GuajiModule";
        };
        GuajiModule.prototype.listProcessors = function () {
            return [new game.GuajiProcessor()];
        };
        /**
         * 初始化数据
         */
        GuajiModule.prototype.onRegister = function () {
            tb.TB_copy.initAllCopy();
            game.GuajiModel.getInstance().initModel();
        };
        return GuajiModule;
    }(tl3d.Module));
    game.GuajiModule = GuajiModule;
    var GuajiEvent = /** @class */ (function (_super) {
        __extends(GuajiEvent, _super);
        function GuajiEvent(type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开挂机界面 */
        GuajiEvent.SHOW_GUAJI_PANEL = "SHOW_GUAJI_PANEL";
        /** 关卡一波完成 进行下一波或者下一关 */
        GuajiEvent.GUANQIA_STEP_COMPLETE = "GUANQIA_STEP_COMPLETE";
        /** 打开挂机收益 */
        GuajiEvent.SHOW_GUAJISHOUYI = "SHOW_GUAJISHOUYI";
        /** 打开挂机收益提升界面 */
        GuajiEvent.SHOW_SHOUYI_UP_VIEW = "SHOW_SHOUYI_UP_VIEW";
        /** 打开快速战斗 */
        GuajiEvent.SHOW_FAST_BATTLE = 'SHOW_FAST_BATTLE';
        /** 快速战斗成功 */
        GuajiEvent.FAST_BATTLE_SUCCESS = 'FAST_BATTLE_SUCCESS';
        /** 领取挂机收益 */
        GuajiEvent.LINGQU_GUAJI_JIANGLI = "LINGQU_GUAJI_JIANGLI";
        GuajiEvent.LINGQU_GUAJI_JIANGLI_SUCC = "LINGQU_GUAJI_JIANGLI_SUCC";
        /** 更新上次领取挂机收益的时间 */
        GuajiEvent.UPDATE_LASTGET_AFKTIME = "UPDATE_LASTGET_AFKTIME";
        /** 领取挂机宝箱奖励 关卡上的宝箱*/
        GuajiEvent.REWARD_BAOXIANG_SUCC = "UPDATE_LASTGET_AFKTIME";
        /** 点击扫荡 */
        GuajiEvent.CLICK_SAODANG = "CLICK_SAODANG";
        //进入战斗副本
        GuajiEvent.ENTER_FIGHT_EVENT = "ENTER_FIGHT_EVENT";
        //更新挂机章节
        GuajiEvent.UPDATE_ZHANGJIE_EVENT = "UPDATE_ZHANGJIE_EVENT";
        //符文通关奖励
        GuajiEvent.SHOW_JINAGLI_PANEL = "SHOW_JINAGLI_PANEL";
        //符文通关奖励
        GuajiEvent.FUBEN_REWARD_CHANGE = "FUBEN_REWARD_CHANGE";
        //掉落物品
        GuajiEvent.GUAJI_DROP_ITEM = "GUAJI_DROP_ITEM";
        // 更新历练副本信息
        GuajiEvent.UPDATE_FUWEN_COPY_INFO = "UPDATE_FUWEN_COPY_INFO";
        // // 出站英雄变化
        // public static CHANGE_GOD_EVENT : string = "CHANGE_GOD_EVENT";
        // 红点变化
        GuajiEvent.RED_CHANGE = "RED_CHANGE";
        /** 移动到目标关卡完成 */
        GuajiEvent.MOVE_TO_TARGET_GK = "MOVE_TO_TARGET_GK";
        /** 显示对话 */
        GuajiEvent.PLAYER_TALK_SHOW = "PLAYER_TALK_SHOW";
        /** 系统开启按钮：点击确定按钮 */
        GuajiEvent.CONFIRM_SYS_OPEN_BUTTON = "CONFIRM_SYS_OPEN_BUTTON";
        /** 关闭首充提示 */
        GuajiEvent.CLOSE_SHOUCHONG_TIPS = "CLOSE_SHOUCHONG_TIPS";
        /** 挂机按钮变化 */
        GuajiEvent.CHANGE_GUAJI_BTN = "CHANGE_GUAJI_BTN";
        /** 进入挂机开始战斗 */
        GuajiEvent.ENTER_FIGHT = "ENTER_FIGHT";
        /** 角色创建完成 */
        GuajiEvent.CREATE_ROLE_SUCC = "CREATE_ROLE_SUCC";
        /** 挂机战斗完成 */
        GuajiEvent.GUAJI_FIGHT_END = "GUAJI_FIGHT_END";
        /** 挂机战斗对话结束 */
        GuajiEvent.GUAJI_TALK_END = "GUAJI_TALK_END";
        /** 挑战副本成功 */
        GuajiEvent.BATTLE_COPY_SUCCESS = "BATTLE_COPY_SUCCESS";
        /** 更新回合 */
        GuajiEvent.CHANGE_ROUND = "CHANGE_ROUND";
        /** 设置战斗头部信息 */
        GuajiEvent.REFRESH_TITLE_EVENT = "REFRESH_TITLE_EVENT";
        /** 设置战斗头部信息 */
        GuajiEvent.INIT_ARTIFACE = "INIT_ARTIFACE";
        GuajiEvent.SET_ANGER = "SET_ANGER";
        GuajiEvent.CLEAR_ARTIFACE = "CLEAR_ARTIFACE";
        GuajiEvent.GET_PROP_EFF = "GET_PROP_EFF";
        GuajiEvent.SET_FIGHT_BLACK_BG = "SET_FIGHT_BLACK_BG";
        GuajiEvent.PLAY_SKILL_EFF = "PLAY_SKILL_EFF";
        return GuajiEvent;
    }(tl3d.BaseEvent));
    game.GuajiEvent = GuajiEvent;
})(game || (game = {}));
