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
var game;
(function (game) {
    var ShopProcessor = /** @class */ (function (_super) {
        __extends(ShopProcessor, _super);
        function ShopProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.ShopModel.getInstance();
            return _this;
        }
        ShopProcessor.prototype.getName = function () {
            return "ShopProcessor";
        };
        ShopProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW),
                new game.ShopEvent(game.ShopEvent.REFRESH_JISHI_VIEW),
                new game.ShopEvent(game.ShopEvent.REFRESH_SHOP_CROSSDAY),
                new game.ShopEvent(game.ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL),
                new game.ShopEvent(game.ShopEvent.SHOW_GOUMAI_PANEL),
                new game.ShopEvent(game.ShopEvent.SHOW_RONGYUSHANGDIAN_PANEL)
            ];
        };
        //处理事件
        ShopProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.ShopEvent) {
                switch ($event.type) {
                    case game.ShopEvent.SHOW_SHOP_VIEW:
                        this.showMainView($event.data);
                        break;
                    case game.ShopEvent.REFRESH_JISHI_VIEW:
                        this.refreshJiShiList();
                        break;
                    case game.ShopEvent.REFRESH_SHOP_CROSSDAY:
                        this.refreshShopData();
                        break;
                    case game.ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL:
                        this.updateShopData($event.data);
                        break;
                    case game.ShopEvent.SHOW_GOUMAI_PANEL:
                        this.showGoumaiView($event.data);
                        break;
                    case game.ShopEvent.SHOW_RONGYUSHANGDIAN_PANEL:
                        this.showShopData();
                        break;
                }
            }
        };
        /** 显示商店主界面 */
        ShopProcessor.prototype.showMainView = function (shopType) {
            var modle = this._model;
            //先判断系统开放没
            if (!modle.isOpenByType(shopType)) {
                showToast(LanMgr.getLan('', 10448));
                return;
            }
            var ShopView = UIMgr.getUIByName(UIConst.ShopView);
            if (shopType == ShopType.jishi) {
                modle.requestJishiList()
                    .then(function () {
                    if (UIMgr.hasStage(UIConst.ShopView)) {
                        ShopView.dataSource = shopType;
                        ShopView.initView();
                    }
                    else {
                        UIMgr.showUI(UIConst.ShopView, shopType);
                    }
                });
            }
            else {
                modle.requestShopList(shopType)
                    .then(function () {
                    if (UIMgr.hasStage(UIConst.ShopView)) {
                        ShopView.dataSource = shopType;
                        ShopView.initView();
                    }
                    else {
                        UIMgr.showUI(UIConst.ShopView, shopType);
                    }
                });
            }
        };
        /** 刷新集市列表 */
        ShopProcessor.prototype.refreshJiShiList = function () {
            var modle = this._model;
            PLC.request(Protocol.game_market_refresh, {}, function ($data) {
                if (!$data)
                    return;
                //更新集市刷新时间
                //更新数据
                modle._jishiList = [];
                for (var i = 0; i < $data.marketList.length; i++) {
                    modle._jishiList.push(new game.JishiItemVo(i, $data.marketList[i].id, $data.marketList[i].count, $data.marketList[i].price, $data.marketList[i].itemInfo));
                }
                //更新界面
                if (UIMgr.hasStage(UIConst.ShopView)) {
                    var ShopView_1 = UIMgr.getUIByName(UIConst.ShopView);
                    ShopView_1.initView();
                }
                if (UIMgr.hasStage(UIConst.Shop_RefreshView)) {
                    UIMgr.hideUIByName(UIConst.Shop_RefreshView);
                }
            });
        };
        /** 跨天更新数据 */
        ShopProcessor.prototype.refreshShopData = function () {
            this._model.shopMap.clear();
            if (UIMgr.hasStage(UIConst.ShopView)) {
                var ShopView_2 = UIMgr.getUIByName(UIConst.ShopView);
                dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopView_2.getCurData().type);
            }
        };
        /**购买并刷新荣誉商店界面 */
        ShopProcessor.prototype.updateShopData = function ($eventdata) {
            var _this = this;
            //购买逻辑 + 玩家数据更新           
            var args = {};
            args[Protocol.game_shop_buy.args.id] = $eventdata.id;
            args[Protocol.game_shop_buy.args.num] = $eventdata.num;
            PLC.request(Protocol.game_shop_buy, args, function ($data, msg) {
                if (!$data)
                    return;
                var item = tb.TB_goods.get_TB_goodsById($data.buyId);
                var name = tb.TB_item.get_TB_itemById(item.item_id[0]).name;
                showToast(LanMgr.getLan("", 10449, name, $eventdata.num * item.item_id[1]));
                var shopVo = _this._model.getGoodsById($eventdata.id, $eventdata.type);
                //是否是限购物品,是的话增加限购次数
                if (shopVo.tbGoods.buy_type != 0) {
                    shopVo.count += $eventdata.num;
                }
                //刷新商城界面
                if (UIMgr.getUIByName(UIConst.ShopView)) {
                    var shopView = UIMgr.getUIByName(UIConst.ShopView);
                    shopView.shopList.refresh();
                }
            });
        };
        /**购买界面 */
        ShopProcessor.prototype.showGoumaiView = function ($eventdata) {
            UIMgr.showUI(UIConst.Shop_BuyView, $eventdata);
        };
        /**商店 */
        ShopProcessor.prototype.showShopData = function () {
            UIMgr.showUI(UIConst.ShopView, ShopType.jingjichang);
        };
        return ShopProcessor;
    }(tl3d.Processor));
    game.ShopProcessor = ShopProcessor;
})(game || (game = {}));
