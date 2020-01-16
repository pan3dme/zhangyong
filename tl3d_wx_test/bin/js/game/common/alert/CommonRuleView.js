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
    var CommonRuleView = /** @class */ (function (_super) {
        __extends(CommonRuleView, _super);
        function CommonRuleView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.CommonRuleView, closeOnSide: _this.isModelClose, title: "提 示" };
            _this._ruleList = [];
            return _this;
        }
        CommonRuleView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.ctPanel.vScrollBarSkin = "";
        };
        CommonRuleView.prototype.show = function (closeOther, showEffect) {
            this.initView();
            _super.prototype.show.call(this, closeOther, showEffect);
        };
        CommonRuleView.prototype.popup = function (closeOther, showEffect) {
            // 必须先设置高度,打开时DialogManager才会根据宽高去居中
            this.initView();
            _super.prototype.popup.call(this, closeOther, showEffect);
        };
        CommonRuleView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.removeRules();
        };
        CommonRuleView.prototype.initView = function () {
            var info = this.dataSource;
            this.width = info.width;
            this.ctPanel.width = info.width - 40;
            var ctHeight = 0;
            this.removeRules();
            for (var i = 0; i < info.content.length; i++) {
                var ruleIr = Laya.Pool.getItemByClass("CommonRuleIR", common.CommonRuleIR);
                ruleIr.width = this.ctPanel.width;
                ruleIr.dataSource = info.content[i];
                ruleIr.y = ctHeight;
                ctHeight += ruleIr.height;
                this.ctPanel.addChild(ruleIr);
                this._ruleList.push(ruleIr);
            }
            if (info.height > 0) {
                this.height = info.height;
                this.ctPanel.height = this.height - this.ctPanel.y - 60;
            }
            else {
                var _h = this.ctPanel.y + ctHeight + 60;
                //最低高度，太窄了不好看
                if (_h < 350) {
                    _h = 350;
                }
                if (_h > 800) {
                    _h = 800;
                }
                this.height = _h;
                this.ctPanel.height = this.height - this.ctPanel.y - 60;
            }
        };
        CommonRuleView.prototype.removeRules = function () {
            for (var _i = 0, _a = this._ruleList; _i < _a.length; _i++) {
                var ruleIr = _a[_i];
                ruleIr.dataSource = null;
                Laya.Pool.recover("CommonRuleIR", ruleIr);
            }
            this._ruleList.length = 0;
            this.ctPanel.removeChildren();
        };
        return CommonRuleView;
    }(ui.component.CommonRuleUI));
    common.CommonRuleView = CommonRuleView;
})(common || (common = {}));
