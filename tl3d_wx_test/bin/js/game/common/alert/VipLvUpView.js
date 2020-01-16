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
/*
* name;
*/
var common;
(function (common) {
    var VipLvUpView = /** @class */ (function (_super) {
        __extends(VipLvUpView, _super);
        function VipLvUpView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.btnComfirnm.on(Laya.Event.CLICK, _this, _this.close);
            return _this;
        }
        VipLvUpView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        VipLvUpView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.eff_guang.play();
        };
        VipLvUpView.prototype.initView = function () {
            var data = this.dataSource;
            this.lbScore.text = "积分x" + (data.newScore - data.oldScore);
            this.oldClip.value = data.oldVip;
            this.newClip.value = data.newVip;
        };
        VipLvUpView.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.dataSource && this.dataSource.callback) {
                this.dataSource.callback.call(null);
            }
            this.eff_guang.stop();
        };
        VipLvUpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return VipLvUpView;
    }(ui.hud.view.VipLvUpUI));
    common.VipLvUpView = VipLvUpView;
})(common || (common = {}));
