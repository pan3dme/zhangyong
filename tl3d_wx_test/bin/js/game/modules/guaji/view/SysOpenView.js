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
    var GuaJiSysOpenView = /** @class */ (function (_super) {
        __extends(GuaJiSysOpenView, _super);
        function GuaJiSysOpenView() {
            return _super.call(this) || this;
        }
        /** 设置引导数据 */
        GuaJiSysOpenView.prototype.setGuideView = function (sysid) {
            var tbSys = tb.TB_sys_open.get_TB_sys_openById(sysid);
            this.imgIcon.skin = tbSys ? SkinUtil.getSysOpenSkin(tbSys.ID) : null;
        };
        /** 设置引导状态 */
        GuaJiSysOpenView.prototype.setGuideStatus = function (flag) {
            var _this = this;
            if (flag) {
                this.stage.on(Laya.Event.CLICK, this, this.onConfirm);
                Laya.timer.once(1500, this, function () {
                    _this.stage.off(Laya.Event.CLICK, _this, _this.onConfirm);
                    Laya.timer.clearAll(_this);
                    _this.onConfirm();
                });
            }
            else {
                this.stage.off(Laya.Event.CLICK, this, this.onConfirm);
                Laya.timer.clearAll(this);
            }
        };
        GuaJiSysOpenView.prototype.onConfirm = function () {
            dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CONFIRM_SYS_OPEN_BUTTON));
        };
        return GuaJiSysOpenView;
    }(ui.guaji.SysOpenUI));
    game.GuaJiSysOpenView = GuaJiSysOpenView;
})(game || (game = {}));
