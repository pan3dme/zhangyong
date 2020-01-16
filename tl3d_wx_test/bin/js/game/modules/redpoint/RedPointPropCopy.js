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
    var RedPointPropCopy = /** @class */ (function (_super) {
        __extends(RedPointPropCopy, _super);
        function RedPointPropCopy() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = false;
            _this.visible = false;
            //自定义的脚本会有时序问题，所以在此添加一个延时
            _this.frameOnce(2, _this, _this.onDelay);
            return _this;
        }
        RedPointPropCopy.prototype.onDelay = function () {
            this.updateRule();
        };
        /** 设置红点名称 */
        RedPointPropCopy.prototype.setRedPointName = function (sname) {
            this.redpointName = sname;
            this.updateRule();
        };
        /** 更新规则 */
        RedPointPropCopy.prototype.updateRule = function () {
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
        RedPointPropCopy.prototype.updateState = function () {
            this.visible = this._redPoint ? this._redPoint.visible : false;
            if (this.visible) {
                this.ani1.play(0, true);
            }
            else {
                this.ani1.stop();
            }
        };
        /** 清除红点规则 */
        RedPointPropCopy.prototype.onDispose = function () {
            if (this._redPoint) {
                this._redPoint.removeHandler(this.updateState, this);
            }
            this._redPoint = null;
            this.redpointName = "";
            this.visible = false;
        };
        return RedPointPropCopy;
    }(ui.component.RedPointCopyUI));
    game.RedPointPropCopy = RedPointPropCopy;
})(game || (game = {}));
