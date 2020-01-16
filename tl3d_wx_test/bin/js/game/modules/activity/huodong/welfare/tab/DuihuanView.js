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
    var DuihuanView = /** @class */ (function (_super) {
        __extends(DuihuanView, _super);
        function DuihuanView() {
            var _this = _super.call(this) || this;
            _this.btn_duihuan.on(Laya.Event.CLICK, _this, _this.duiHuang);
            return _this;
        }
        DuihuanView.prototype.onAdd = function () {
        };
        DuihuanView.prototype.onExit = function () {
            this.close();
        };
        /**兑换请求 */
        DuihuanView.prototype.duiHuang = function () {
            if (this.input_duihuanma.text == "") {
                showToast(LanMgr.getLan("", 10221));
                return;
            }
            var args = {};
            args[Protocol.game_welfare_activationCode.args.code] = this.input_duihuanma.text;
            PLC.request(Protocol.game_welfare_activationCode, args, function ($data, msg) {
                logdebug($data);
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
            });
        };
        return DuihuanView;
    }(ui.activity.huodong.welfare.tab.DuihuanUI));
    game.DuihuanView = DuihuanView;
})(game || (game = {}));
