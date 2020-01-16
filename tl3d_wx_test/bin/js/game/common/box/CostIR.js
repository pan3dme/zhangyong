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
var CostVo = /** @class */ (function () {
    function CostVo(data) {
        /**显示的物品id */
        this.itemId = 0;
        /**需要数量 */
        this.needNum = 0;
        this.itemId = data[0];
        this.needNum = data[1];
    }
    /**玩家拥有此材料数量 */
    CostVo.prototype.gethasCostNum = function () {
        return App.hero.getBagItemNum(this.itemId);
    };
    /**此物品不够 */
    CostVo.prototype.isNotHaveCost = function () {
        return this.gethasCostNum() < this.needNum;
    };
    /**List赋值的时候使用这个方法，方便判断不足 */
    CostVo.createCostVos = function (data) {
        if (!isArrayFn(data))
            data = map2ary(data);
        return data.map(function (vo) { return new CostVo(vo); });
    };
    return CostVo;
}());
var common;
(function (common) {
    var CostIR = /** @class */ (function (_super) {
        __extends(CostIR, _super);
        function CostIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CostIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                if (!!v) {
                    this.refresh();
                    this.resSizeEvent();
                }
            },
            enumerable: true,
            configurable: true
        });
        CostIR.prototype.refresh = function () {
            var costVo = this.dataSource;
            this.lbNeed.text = "/" + Snums(costVo.needNum);
            this.lbHas.text = Snums(costVo.gethasCostNum());
            this.imgCost.skin = SkinUtil.getCostSkin(costVo.itemId);
            this.lbHas.color = costVo.isNotHaveCost() ? ColorConst.redFont : ColorConst.normalFont;
        };
        CostIR.prototype.resSizeEvent = function () {
            this.imgCost.event(Laya.Event.RESIZE);
            this.lbNeed.event(Laya.Event.RESIZE);
            this.lbHas.event(Laya.Event.RESIZE);
            this.hbox.event(Laya.Event.RESIZE);
        };
        return CostIR;
    }(ui.box.CostIRUI));
    common.CostIR = CostIR;
})(common || (common = {}));
