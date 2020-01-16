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
    var CommonRuleIR = /** @class */ (function (_super) {
        __extends(CommonRuleIR, _super);
        function CommonRuleIR() {
            var _this = _super.call(this) || this;
            _this.htmlText.style.align = 'left';
            _this.htmlText.style.fontSize = 22;
            _this.htmlText.style.wordWrap = true;
            _this.htmlText.style.leading = 10;
            _this.htmlText.autoSize = true;
            _this.htmlText.style.color = ColorConst.normalFont;
            return _this;
        }
        Object.defineProperty(CommonRuleIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        CommonRuleIR.prototype.refreshData = function () {
            var strArr = this.dataSource;
            if (strArr) {
                this.lbTitle.text = strArr[0];
                this.htmlText.width = this.width - 60;
                // 往右靠一点
                this.htmlText.x = this.width / 2 - this.htmlText.width / 2 + 8;
                var text = "";
                for (var i = 1; i < strArr.length; i++) {
                    text += (i == strArr.length - 1) ? strArr[i] : (strArr[i] + "<br/>");
                }
                this.htmlText.innerHTML = text;
                this.height = this.htmlText.y + this.htmlText.contextHeight + 10;
            }
            else {
            }
        };
        return CommonRuleIR;
    }(ui.box.CommonRuleIRUI));
    common.CommonRuleIR = CommonRuleIR;
})(common || (common = {}));
