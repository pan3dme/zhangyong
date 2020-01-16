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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
* name
*/
var game;
(function (game) {
    var GodAttrView = /** @class */ (function (_super) {
        __extends(GodAttrView, _super);
        function GodAttrView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.attrList.renderHandler = new Handler(_this, _this.onAttrRender);
            _this.greenList.renderHandler = new Handler(_this, _this.onGreenRender);
            _this.bgPanel.lbTitle.visible = _this.bgPanel.bgTitle.visible = false;
            _this.bgPanel.dataSource = { uiName: UIConst.God_AttrView, closeOnSide: _this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12121) };
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        Object.defineProperty(GodAttrView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                if (!!v)
                    this.initView();
            },
            enumerable: true,
            configurable: true
        });
        GodAttrView.prototype.initView = function () {
            // 绿色加成只显示基础属性前四个，后面的属性直接显示总值
            var basicAttr = this.dataSource.basicAttr || [];
            // 复制
            basicAttr = __spreadArrays(basicAttr);
            var allAttr = this.dataSource.allAttr;
            var greenAttr = new Array();
            for (var i = 0; i < 4; i++) {
                var num = Math.floor(allAttr[i][1]) - Math.floor(basicAttr[i][1]);
                if (num != 0)
                    greenAttr.push(num);
                else
                    greenAttr.push(0);
            }
            for (var i = 4; i < 8; i++) {
                basicAttr[i][1] = (Math.floor(allAttr[i][1] * 10000) / 100) + "%";
            }
            var ary = allAttr[iface.tb_prop.attrTypeKey.addDmg - 1] || [];
            var value = ary[1] || 0;
            value = (Math.floor(value * 10000) / 100);
            basicAttr.push([iface.tb_prop.attrTypeKey.addDmg, (value > 0 ? value + "%" : "0%")]);
            ary = allAttr[iface.tb_prop.attrTypeKey.subDmg - 1] || [];
            value = ary[1] || 0;
            value = (Math.floor(value * 10000) / 100);
            basicAttr.push([iface.tb_prop.attrTypeKey.subDmg, (value > 0 ? value + "%" : "0%")]);
            this.greenList.array = greenAttr;
            this.attrList.array = basicAttr;
        };
        /** 绿字属性渲染 */
        GodAttrView.prototype.onAttrRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                var name_1 = LanMgr.attrName[data[0]];
                var value = index < 4 ? String(Math.floor(data[1])) : data[1] + "";
                cell.text = name_1 + " : " + value;
            }
        };
        /** 绿字属性渲染 */
        GodAttrView.prototype.onGreenRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.text = "+" + data;
            }
            else {
                cell.text = "";
            }
        };
        GodAttrView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.attrList.array = null;
            this.greenList.array = null;
        };
        return GodAttrView;
    }(ui.god.GodAttrUI));
    game.GodAttrView = GodAttrView;
})(game || (game = {}));
