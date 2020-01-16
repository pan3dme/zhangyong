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
    var TurnRewardView = /** @class */ (function (_super) {
        __extends(TurnRewardView, _super);
        // private _luckyView: LuckyTurnView;
        function TurnRewardView() {
            var _this = _super.call(this) || this;
            _this._isFree = false;
            _this._isCanOne = false;
            _this._isCanTen = false;
            _this.isModelClose = true;
            return _this;
            // this._luckyView = UIMgr.getUIByName(UIConst.LuckyTurnView);
        }
        TurnRewardView.prototype.popup = function () {
            this.btnBuy.offAll();
            this.initView();
            _super.prototype.popup.call(this);
        };
        TurnRewardView.prototype.initView = function () {
            this.bgPanel.dataSource = { title: "comp/title/huodejiangli.png" };
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.setCostText, this);
            this.btnBuy.on(Laya.Event.CLICK, this, this.onClickBuy);
            this._curType = this.dataSource.type;
            this._count = this.dataSource.items.length;
            this._costdiamong = 0;
            var id;
            switch (this._curType) {
                case TURNTABLE.GOD: //神灵
                    id = App.hero.welfare.luckGodId;
                    this._curTimeTemp = tb.TB_luck_god_time.get_TB_luck_god_timeById(id);
                    this._costdiamong = this._count == 1 ? this._curTimeTemp.buy_cost[0] : this._curTimeTemp.buy_cost[1];
                    break;
                case TURNTABLE.EQUIP: //装备
                    id = App.hero.welfare.luckEquipId;
                    this._curTimeTemp = tb.TB_luck_equip_time.get_TB_luck_equip_timeById(id);
                    this._costdiamong = this._count == 1 ? this._curTimeTemp.buy_cost[0] : this._curTimeTemp.buy_cost[1];
                    break;
                case TURNTABLE.TREASURE: //圣物
                    id = App.hero.welfare.luckTreasureId;
                    this._curTimeTemp = tb.TB_luck_treasure_time.getTempById(id);
                    this._costdiamong = this._count == 1 ? this._curTimeTemp.buy_cost[0] : this._curTimeTemp.buy_cost[1];
                    break;
                case TURNTABLE.WISH: //许愿
                    this._curTimeTemp = tb.TB_wish_set.get_TB_wish_set();
                    if (this._count > 1) {
                        //纠正次数
                        this._count = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum);
                        this._count = Math.min(this._count, 10);
                    }
                    this._costdiamong = this._count * this._curTimeTemp.cost_diamond;
                    break;
            }
            this.setCostText();
            this.itemList.array = this.dataSource.items;
        };
        TurnRewardView.prototype.setCostText = function () {
            // if (!this._curTimeTemp) return;
            this.btn_close.x = this._count != 0 ? 144 : 280;
            this.btnBuy.visible = this.box_cost.visible = this._count != 0;
            var freeCount = game.HuodongModel.getLuckFreeCount(this._curType);
            var diamond = App.hero.diamond;
            this._isFree = false;
            this._isCanOne = false;
            this._isCanTen = false;
            if (this._count == 1) {
                //一次
                if (freeCount > 0) {
                    this.btnBuy.label = "\u514D\u8D39";
                    this.lbCost.text = 0 + "";
                    this.lbCost.color = ColorConst.normalFont;
                    this._isFree = true;
                }
                else {
                    this.btnBuy.label = "\u8D2D\u4E701\u6B21";
                    this.lbCost.text = String(this._costdiamong);
                    if (diamond < this._costdiamong) {
                        this.lbCost.color = ColorConst.RED;
                    }
                    else {
                        this.lbCost.color = ColorConst.normalFont;
                        this._isCanOne = true;
                    }
                }
            }
            else {
                this.btnBuy.label = "\u8D2D\u4E70" + this._count + "\u6B21";
                this.lbCost.text = String(this._costdiamong);
                if (diamond < this._costdiamong) {
                    this.lbCost.color = ColorConst.RED;
                }
                else {
                    this.lbCost.color = ColorConst.normalFont;
                    this._isCanTen = true;
                }
            }
        };
        TurnRewardView.prototype.onClickBuy = function () {
            if (this._count == 1) {
                //一次
                if (!this._isFree && !this._isCanOne) {
                    showToast(LanMgr.getLan("", 10005));
                    return;
                }
            }
            else {
                if (!this._isCanTen) {
                    showToast(LanMgr.getLan("", 10005));
                    return;
                }
            }
            if (this._curType == TURNTABLE.WISH) {
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.MAKE_PROMISE_SUCCESS), { count: this._count });
                return;
            }
            var args = {
                "_0": this._curTimeTemp.ID,
                "_1": this._count
            };
            var protocol;
            switch (this._curType) {
                case TURNTABLE.GOD:
                    protocol = Protocol.game_luck_buyluckGod;
                    break;
                case TURNTABLE.EQUIP:
                    protocol = Protocol.game_luck_buyluckEquip;
                    break;
                case TURNTABLE.TREASURE:
                    protocol = Protocol.game_luck_buyluckTreasure;
                    break;
            }
            PLC.request(protocol, args, function ($data, $msg) {
                if (!$data)
                    return;
                if ($msg && $msg.length > 0) {
                    showToast($msg);
                }
                else {
                    var pageview = UIMgr.getUIByName(UIConst.LuckyTurnView);
                    pageview.startAction($data, $msg);
                    // this.close();
                }
            });
        };
        TurnRewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this.bgPanel.dataSource = null;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.setCostText, this);
            this.btnBuy.off(Laya.Event.CLICK, this, this.onClickBuy);
        };
        return TurnRewardView;
    }(ui.activity.huodong.luckyturn.Tip.TurnRewardUI));
    game.TurnRewardView = TurnRewardView;
})(game || (game = {}));
