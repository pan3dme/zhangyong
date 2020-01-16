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
    var Combobox = /** @class */ (function (_super) {
        __extends(Combobox, _super);
        function Combobox() {
            var _this = _super.call(this) || this;
            _this.boxContent.visible = false;
            _this.boxContent.y = _this.height + 4;
            _this._labelList = [];
            _this.mouseThrough = false;
            return _this;
        }
        Object.defineProperty(Combobox.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (labels) {
                this._dataSource = labels;
                this.renderView();
            },
            enumerable: true,
            configurable: true
        });
        Combobox.prototype.renderView = function () {
            var strList = this.dataSource;
            if (strList && strList.length > 0) {
                this.removeLabels();
                this._labelList.length = 0;
                var boxY = 4;
                for (var i = 0; i < strList.length; i++) {
                    var boxLabel = new Laya.Box();
                    boxLabel.x = 0;
                    boxLabel.height = this.lbValue.fontSize + 8;
                    boxLabel.width = this.boxContent.width;
                    boxLabel.y = boxY;
                    boxY += boxLabel.height;
                    this.boxContent.addChild(boxLabel);
                    var label = new Laya.Label(strList[i]);
                    label.bold = this.lbValue.bold;
                    label.fontSize = this.lbValue.fontSize;
                    label.color = this.lbValue.color;
                    label.stroke = this.lbValue.stroke;
                    label.strokeColor = this.lbValue.strokeColor;
                    label.x = this.lbValue.x;
                    label.centerY = 0;
                    boxLabel.addChild(label);
                    boxLabel.on(Laya.Event.CLICK, this, this.onSelect, [i]);
                    this._labelList.push(boxLabel);
                }
                this.boxContent.height = boxY;
                this.height = this.boxContent.y + this.boxContent.height;
                this.boxContent.visible = false;
                this.btnShow.on(Laya.Event.CLICK, this, this.onOpenOrHide);
                this.imgBg.on(Laya.Event.CLICK, this, this.onOpenOrHide);
            }
            else {
                this.removeLabels();
                this.boxContent.visible = false;
                this.btnShow.off(Laya.Event.CLICK, this, this.onOpenOrHide);
                this.imgBg.off(Laya.Event.CLICK, this, this.onOpenOrHide);
            }
        };
        Combobox.prototype.removeLabels = function () {
            for (var _i = 0, _a = this._labelList; _i < _a.length; _i++) {
                var label = _a[_i];
                label.offAll();
                label.removeSelf();
            }
            this._labelList.length = 0;
        };
        Combobox.prototype.onOpenOrHide = function () {
            var _this = this;
            this.boxContent.visible = !this.boxContent.visible;
            if (this.showHandler) {
                this.showHandler.runWith(this.boxContent.visible);
            }
            if (this.boxContent.visible) {
                Laya.timer.callLater(this, function () {
                    _this.stage.on(Laya.Event.CLICK, _this, _this.onClickView);
                });
            }
            else {
                this.stage.off(Laya.Event.CLICK, this, this.onClickView);
            }
        };
        Combobox.prototype.onClickView = function (event) {
            var target = event.target;
            if (target != this) {
                this.onOpenOrHide();
            }
        };
        Combobox.prototype.onSelect = function (index) {
            this.selectedIndex = index;
        };
        Object.defineProperty(Combobox.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (index) {
                if (this._selectedIndex != index) {
                    this._selectedIndex = index;
                    var strList = this.dataSource;
                    this.lbValue.text = strList ? strList[index] : "无";
                    if (this.selectHandler) {
                        this.selectHandler.runWith(index);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return Combobox;
    }(ui.component.ComboboxUI));
    common.Combobox = Combobox;
})(common || (common = {}));
