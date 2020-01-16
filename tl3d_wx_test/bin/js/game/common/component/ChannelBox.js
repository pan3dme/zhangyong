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
    var ChannelBox = /** @class */ (function (_super) {
        __extends(ChannelBox, _super);
        function ChannelBox() {
            var _this = _super.call(this) || this;
            _this.btn_god.on(Laya.Event.CLICK, _this, _this.onJump, [ModuleConst.SHENLING]);
            _this.btn_equip.on(Laya.Event.CLICK, _this, _this.onJump, [ModuleConst.EQUIPMENT]);
            _this.btn_artifact.on(Laya.Event.CLICK, _this, _this.onJump, [ModuleConst.ARTIFACT]);
            _this.btn_buzhen.on(Laya.Event.CLICK, _this, _this.onJump, [ModuleConst.SHENLING, 1]);
            _this.btn_firstrecharge.on(Laya.Event.CLICK, _this, _this.onJump, [ModuleConst.SHOUCHONG]);
            return _this;
        }
        Object.defineProperty(ChannelBox.prototype, "callback", {
            set: function (call) {
                this._callback = call;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        ChannelBox.prototype.initView = function () {
            var firstRechage = game.ChongzhiModel.getInstance().isAllReward();
            if (firstRechage && this.btn_firstrecharge) {
                this.btn_firstrecharge.visible = false;
            }
            var isChargeHide = this.btn_firstrecharge.visible == false;
            var oneWidth = isChargeHide ? this.width / 4 : this.width / 5;
            this.btn_god.x = oneWidth / 2;
            this.btn_buzhen.x = oneWidth + oneWidth / 2;
            this.btn_firstrecharge.x = oneWidth * 2 + oneWidth / 2;
            this.btn_equip.x = isChargeHide ? (oneWidth * 2 + oneWidth / 2) : (oneWidth * 3 + oneWidth / 2);
            this.btn_artifact.x = isChargeHide ? (oneWidth * 3 + oneWidth / 2) : (oneWidth * 4 + oneWidth / 2);
        };
        ChannelBox.prototype.onJump = function () {
            var link = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                link[_i] = arguments[_i];
            }
            /** 判断系统是否开启 */
            var tbSys = tb.TB_sys_open.get_TB_sys_openById(link[0]);
            if (tbSys && !App.IsSysOpen(link[0])) {
                showToast(tbSys.prompt);
                if (this._callback) {
                    this._callback(false);
                }
                return;
            }
            // 跳转的时候
            if (this._callback) {
                this._callback(true);
            }
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), link);
        };
        return ChannelBox;
    }(ui.component.ChannelBoxUI));
    common.ChannelBox = ChannelBox;
})(common || (common = {}));
