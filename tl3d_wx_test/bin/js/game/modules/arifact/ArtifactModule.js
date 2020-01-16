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
    var ArtifactModule = /** @class */ (function (_super) {
        __extends(ArtifactModule, _super);
        function ArtifactModule() {
            return _super.call(this) || this;
        }
        ArtifactModule.prototype.getModuleName = function () {
            return "ArtifactModule";
        };
        ArtifactModule.prototype.listProcessors = function () {
            return [new game.ArtifactProcessor(),
            ];
        };
        return ArtifactModule;
    }(tl3d.Module));
    game.ArtifactModule = ArtifactModule;
    var ArtifactEvent = /** @class */ (function (_super) {
        __extends(ArtifactEvent, _super);
        function ArtifactEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**打开神器界面 */
        ArtifactEvent.SHOW_ARTIFACT_PANEL = 'SHOW_ARTIFACT_PANEL';
        /**打开神器选择界面 */
        ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL = 'SHOW_ARTIFACT_LIST_PANEL';
        /**神器操作 */
        ArtifactEvent.ARTIFACT_OPERATION = 'ARTIFACT_OPERATION';
        /**神器操作成功 */
        ArtifactEvent.ARTIFACT_OPERATION_SUCCESS = 'ARTIFACT_OPERATION_SUCCESS';
        /** 神器解锁成功 */
        ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS = "ARTIFACT_UNLOCK_SUCCESS";
        /** 神器强化成功 */
        ArtifactEvent.ARTIFACT_STRENGTH_SUCCESS = "ARTIFACT_STRENGTH_SUCCESS";
        /** 神器穿戴或者卸下成功 */
        ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS = "ADJUST_LINEUP_ARTIFACT_SUCCESS";
        /** 神器强化等级变化 */
        ArtifactEvent.ARTIFACT_STRENGTH_LV_CHANGE = "ARTIFACT_STRENGTH_LV_CHANGE";
        /** 神器技能等级变化 */
        ArtifactEvent.ARTIFACT_SKILL_LV_CHANGE = "ARTIFACT_SKILL_LV_CHANGE";
        /** 神器洗练属性变化 */
        ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE = "ARTIFACT_BAPTIZE_CHANGE";
        /** 神器星级属性变化 */
        ArtifactEvent.ARTIFACT_STAR_CHANGE = "ARTIFACT_STAR_CHANGE";
        /** 神器激活 */
        ArtifactEvent.ARTIFACT_ACTIVE = "ARTIFACT_ACTIVE";
        /** 切换神器 */
        ArtifactEvent.SWITCH_ARTIFACT = "SWITCH_ARTIFACT";
        /** 切换选项卡 */
        ArtifactEvent.SELECT_TABBAR = "SELECT_TABBAR";
        ArtifactEvent.SHOW_VISIBLE_TRUE = "SHOW_ARTIFACT_VISIBLE_TRUE";
        return ArtifactEvent;
    }(tl3d.BaseEvent));
    game.ArtifactEvent = ArtifactEvent;
})(game || (game = {}));
