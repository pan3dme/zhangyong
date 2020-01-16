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
    var PropretyIR = /** @class */ (function (_super) {
        __extends(PropretyIR, _super);
        function PropretyIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PropretyIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        PropretyIR.prototype.refreshData = function (data) {
            this.text = data;
        };
        return PropretyIR;
    }(Laya.Label));
    game.PropretyIR = PropretyIR;
    var strengthAttriRender = /** @class */ (function (_super) {
        __extends(strengthAttriRender, _super);
        function strengthAttriRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(strengthAttriRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        strengthAttriRender.prototype.refreshData = function (data) {
            if (data) {
                var lab_attr1 = this.getChildByName('lab_attriName');
                var lab_nowAttriPro = this.getChildByName('lab_nowAttriPro');
                var lab_nextAttriPro = this.getChildByName('lab_nextAttriPro');
                var imgArrow = this.getChildByName('imgArrow');
                imgArrow.visible = lab_nextAttriPro.visible = data.nextValue ? true : false;
                lab_attr1.text = data.name;
                lab_nowAttriPro.text = "+" + data.value;
                lab_nextAttriPro.text = "+" + data.nextValue;
            }
        };
        return strengthAttriRender;
    }(Laya.Box));
    game.strengthAttriRender = strengthAttriRender;
})(game || (game = {}));
