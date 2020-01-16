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
    /** 红点扩展脚本 */
    var RedPointProp = /** @class */ (function (_super) {
        __extends(RedPointProp, _super);
        function RedPointProp() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = false;
            _this.visible = false;
            //自定义的脚本会有时序问题，所以在此添加一个延时
            _this.frameOnce(2, _this, _this.onDelay);
            return _this;
        }
        RedPointProp.prototype.onDelay = function () {
            this.updateRule();
        };
        /** 设置红点名称 */
        RedPointProp.prototype.setRedPointName = function (sname) {
            this.redpointName = sname;
            this.updateRule();
        };
        /** 更新规则 */
        RedPointProp.prototype.updateRule = function () {
            if (this._redPoint) {
                this._redPoint.removeHandler(this.updateState, this);
            }
            this._redPoint = game.RedPointManager.getRule(this.redpointName);
            if (this._redPoint) {
                this._redPoint.addHandler(new Handler(this, this.updateState));
            }
            this.updateState();
        };
        /** 更新状态 */
        RedPointProp.prototype.updateState = function () {
            this.visible = this._redPoint ? this._redPoint.visible : false;
        };
        /** 清除红点规则 */
        RedPointProp.prototype.onDispose = function () {
            if (this._redPoint) {
                this._redPoint.removeHandler(this.updateState, this);
            }
            this._redPoint = null;
            this.redpointName = "";
            this.visible = false;
        };
        return RedPointProp;
    }(ui.component.RedPointUI));
    game.RedPointProp = RedPointProp;
})(game || (game = {}));
