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
var common;
(function (common) {
    var WaitView = /** @class */ (function (_super) {
        __extends(WaitView, _super);
        function WaitView() {
            return _super.call(this) || this;
        }
        WaitView.prototype.onOpened = function () {
            this.lbl_progress.text = this.dataSource ? this.dataSource : LanMgr.getLan("加载中...", -1);
            if (this.ani_load)
                this.ani_load.play(0, true);
            _super.prototype.onOpened.call(this);
        };
        WaitView.prototype.onClosed = function () {
            if (this.ani_load)
                this.ani_load.stop();
            _super.prototype.onClosed.call(this);
        };
        //设置进度条
        WaitView.prototype.setProgress = function (value) {
            this._progress = Math.ceil(value * 100);
            this.lbl_progress.text = this._progress + "%";
        };
        return WaitView;
    }(ui.login.WaitUI));
    common.WaitView = WaitView;
})(common || (common = {}));
