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
    var ArenaBrandIR = /** @class */ (function (_super) {
        __extends(ArenaBrandIR, _super);
        function ArenaBrandIR() {
            var _this = _super.call(this) || this;
            _this.btnbuy.on(Laya.Event.CLICK, _this, _this.onBuyArenaItem);
            return _this;
        }
        ArenaBrandIR.prototype.getIndex = function () {
            return this._index;
        };
        ArenaBrandIR.prototype.setVis = function (val) {
            this.box.visible = val;
        };
        /**设置子节点数据 */
        ArenaBrandIR.prototype.setChildData = function (data, index) {
            // this.box.visible = false;
            this._dataAry = data;
            this._index = index;
            var isCanBuy = data[1];
            this.setBuyNodeVisible(isCanBuy);
            var item = tb.TB_arena_draw.getDataById(data[0]);
            this.itemBox.dataSource = new ItemVo(item.item[0], item.item[1]);
            if (isCanBuy) {
                this.imgcost.skin = SkinUtil.getCostSkin(item.cost[0]);
                this.lbdiscount.text = LanMgr.getLan("", 12169, item.discount);
                this.lbcost.text = item.cost[1] + "";
            }
            this.setVis(true);
            // Laya.timer.frameOnce(30, this, () => { this.setVis(true) });
        };
        ArenaBrandIR.prototype.setBuyNodeVisible = function (visible) {
            this.lbdiscount.visible = this.imgdiscount.visible = this.btnbuy.visible = this.lbcost.visible = this.imgcost.visible = visible;
        };
        /**购买物品 */
        ArenaBrandIR.prototype.onBuyArenaItem = function () {
            if (!this._dataAry || this._dataAry.length < 2)
                return;
            var item = tb.TB_arena_draw.getDataById(this._dataAry[0]);
            if (UIUtil.checkNotEnough(item.cost[0], item.cost[1])) {
                return;
            }
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.ARENA_BUY_CARDITEM), this._index);
        };
        return ArenaBrandIR;
    }(ui.arena.arena.render.ArenaBrandIRUI));
    game.ArenaBrandIR = ArenaBrandIR;
})(game || (game = {}));
