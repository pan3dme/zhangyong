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
    var GodRaceAddIR = /** @class */ (function (_super) {
        __extends(GodRaceAddIR, _super);
        function GodRaceAddIR() {
            var _this = _super.call(this) || this;
            _this._autoCheck = true;
            return _this;
        }
        Object.defineProperty(GodRaceAddIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        GodRaceAddIR.prototype.autoCheckActive = function (val) {
            this._autoCheck = val;
        };
        GodRaceAddIR.prototype.refresh = function () {
            var info = this.dataSource;
            if (info) {
                var temp = info.tbData;
                this.lab_title.text = temp.conditionStr + ":";
                this.lab_content.text = temp.desc;
                this.lab_content.color = this.lab_title.color = info.isActive ? "#008f07" : "#656565";
                this.lab_content.x = this.lab_title.x + this.lab_title.width + 5;
            }
        };
        return GodRaceAddIR;
    }(ui.box.GodRaceAddUI));
    common.GodRaceAddIR = GodRaceAddIR;
})(common || (common = {}));
