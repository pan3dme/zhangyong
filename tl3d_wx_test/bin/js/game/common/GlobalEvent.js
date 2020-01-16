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
var common;
(function (common) {
    var GlobalEvent = /** @class */ (function (_super) {
        __extends(GlobalEvent, _super);
        function GlobalEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** dialog被创建 */
        GlobalEvent.DIALOG_CREATED = "DIALOG_CREATED";
        /** dialog被打开了(有弹窗效果时,等效果结束触发) */
        GlobalEvent.DIALOG_OPENED = "DIALOG_OPENED";
        /** dialog被关闭了 */
        GlobalEvent.DIALOG_CLOSED = "DIALOG_CLOSED";
        return GlobalEvent;
    }(tl3d.BaseEvent));
    common.GlobalEvent = GlobalEvent;
})(common || (common = {}));
