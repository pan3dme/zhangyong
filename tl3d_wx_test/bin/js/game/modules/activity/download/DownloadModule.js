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
    /*
    * OnlineModule
    */
    var DownloadModule = /** @class */ (function (_super) {
        __extends(DownloadModule, _super);
        function DownloadModule() {
            return _super.call(this) || this;
        }
        DownloadModule.prototype.getModuleName = function () {
            return "DownloadModule";
        };
        DownloadModule.prototype.listProcessors = function () {
            return [new game.DownloadProcessor()];
        };
        /**
         * 模块入口
         */
        DownloadModule.prototype.onRegister = function () {
        };
        return DownloadModule;
    }(tl3d.Module));
    game.DownloadModule = DownloadModule;
    var DownloadeEvent = /** @class */ (function (_super) {
        __extends(DownloadeEvent, _super);
        function DownloadeEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DownloadeEvent.SEND_RECEIVE_EVENT = "SEND_RECEIVE_EVENT";
        DownloadeEvent.RED_CHANGE_EVENT = "RED_CHANGE_EVENT";
        DownloadeEvent.SHOW_WDXZ_VIEW = "SHOW_WDXZ_VIEW";
        DownloadeEvent.DOWNLOAD_WEIDUAN = "DOWNLOAD_WEIDUAN";
        return DownloadeEvent;
    }(tl3d.BaseEvent));
    game.DownloadeEvent = DownloadeEvent;
})(game || (game = {}));
