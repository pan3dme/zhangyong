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
    var TreasureRebirthView = /** @class */ (function (_super) {
        __extends(TreasureRebirthView, _super);
        function TreasureRebirthView() {
            return _super.call(this) || this;
        }
        TreasureRebirthView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12384) };
            this.btnRebirth.on(Laya.Event.CLICK, this, this.onRebirth);
            this.btnRule.on(Laya.Event.CLICK, this, this.onRule);
            this.listTreasure.selectHandler = new Handler(this, this.onSelect);
            this.listTreasure.array = null;
            this.listTreasure.selectedIndex = -1;
            this.lbTitle.visible = true;
        };
        TreasureRebirthView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TreasureRebirthView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listCost.array = null;
            this.listItem.array = null;
            this.itemBox.dataSource = null;
            this.listTreasure.array = null;
            this.listTreasure.selectedIndex = -1;
            this.lbTitle.visible = true;
        };
        TreasureRebirthView.prototype.initView = function () {
            var dataAry = [];
            var cost = tb.TB_treasure_set.getSet().recast_cost;
            for (var _i = 0, cost_1 = cost; _i < cost_1.length; _i++) {
                var ary = cost_1[_i];
                dataAry.push(new CostVo(ary));
            }
            this.listCost.array = dataAry;
            this.listCost.width = dataAry.length * 154 + (dataAry.length - 1) * this.listCost.spaceX;
            var treasures = game.TreasureModel.getInstance().getRebirthTreasureList();
            this.listTreasure.array = treasures;
            this.boxEmpty.visible = treasures.length == 0;
            this.setTreasureItem(null);
            this.listTreasure.selectedIndex = -1;
        };
        TreasureRebirthView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            var vo = this.listTreasure.getItem(index);
            this.setTreasureItem(vo);
        };
        /** 设置圣物 */
        TreasureRebirthView.prototype.setTreasureItem = function (item) {
            var _this = this;
            var isExist = item ? true : false;
            this.btnAdd.visible = !isExist;
            this.itemBox.visible = isExist;
            this.itemBox.dataSource = item;
            if (item) {
                var args = {};
                args[Protocol.game_treasure_recastReturnItems.args.treasureKey] = item.uuid;
                PLC.request(Protocol.game_treasure_recastReturnItems, args, function ($data, $msg) {
                    if (!$data) {
                        _this.listItem.array = null;
                        _this.lbTitle.visible = true;
                        return;
                    }
                    var items = [];
                    items.push(new ItemVo(item.templateId, item.num));
                    for (var _i = 0, _a = $data["returnItems"]; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        items.push(new ItemVo(ary[0], ary[1]));
                    }
                    _this.listItem.array = items;
                    _this.listItem.width = items.length > 5 ? 590 : (items.length * 100 + (items.length - 1) * _this.listItem.spaceX);
                    _this.lbTitle.visible = false;
                }, true);
            }
            else {
                this.listItem.array = null;
                this.lbTitle.visible = true;
            }
        };
        /** 重生 */
        TreasureRebirthView.prototype.onRebirth = function () {
            var treasureVo = this.itemBox.dataSource;
            if (!treasureVo) {
                showToast(LanMgr.getLan("", 10367));
                return;
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.TREASURE_OPERATION), [game.TreasureOperation.rebirth, [treasureVo]]);
        };
        TreasureRebirthView.prototype.onRule = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20018));
        };
        return TreasureRebirthView;
    }(ui.god.treasure.TreasureRebirthUI));
    game.TreasureRebirthView = TreasureRebirthView;
})(game || (game = {}));
