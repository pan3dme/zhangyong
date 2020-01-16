

module game {
    export class ShopProcessor extends tl3d.Processor {

        private _model: ShopModel;
        constructor() {
            super();
            this._model = ShopModel.getInstance();
        }

        public getName(): string {
            return "ShopProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new ShopEvent(ShopEvent.SHOW_SHOP_VIEW),
                new ShopEvent(ShopEvent.REFRESH_JISHI_VIEW),
                new ShopEvent(ShopEvent.REFRESH_SHOP_CROSSDAY),
                new ShopEvent(ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL),
                new ShopEvent(ShopEvent.SHOW_GOUMAI_PANEL),
                new ShopEvent(ShopEvent.SHOW_RONGYUSHANGDIAN_PANEL)
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof ShopEvent) {
                switch ($event.type) {
                    case ShopEvent.SHOW_SHOP_VIEW:
                        this.showMainView($event.data);
                        break;
                    case ShopEvent.REFRESH_JISHI_VIEW:
                        this.refreshJiShiList();
                        break;
                    case ShopEvent.REFRESH_SHOP_CROSSDAY:
                        this.refreshShopData();
                        break;
                    case ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL:
                        this.updateShopData($event.data);
                        break;
                    case ShopEvent.SHOW_GOUMAI_PANEL:
                        this.showGoumaiView($event.data);
                        break;
                    case ShopEvent.SHOW_RONGYUSHANGDIAN_PANEL:
                        this.showShopData();
                        break;
                }
            }
        }

        /** 显示商店主界面 */
        private showMainView(shopType: number): void {
            let modle = this._model;
            //先判断系统开放没
            if (!modle.isOpenByType(shopType)) {
                showToast(LanMgr.getLan('', 10448));
                return;
            }

            let ShopView = UIMgr.getUIByName(UIConst.ShopView) as ShopView;
            if (shopType == ShopType.jishi) {
                modle.requestJishiList()
                    .then(() => {
                        if (UIMgr.hasStage(UIConst.ShopView)) {
                            ShopView.dataSource = shopType;
                            ShopView.initView();
                        } else {
                            UIMgr.showUI(UIConst.ShopView, shopType);
                        }
                    });
            } else {
                modle.requestShopList(shopType)
                    .then(() => {
                        if (UIMgr.hasStage(UIConst.ShopView)) {
                            ShopView.dataSource = shopType;
                            ShopView.initView();
                        } else {
                            UIMgr.showUI(UIConst.ShopView, shopType);
                        }
                    });
            }
        }

        /** 刷新集市列表 */
        private refreshJiShiList(): void {
            let modle = this._model;
            PLC.request(Protocol.game_market_refresh, {}, ($data) => {
                if (!$data) return;
                //更新集市刷新时间
                //更新数据
                modle._jishiList = [];
                for (let i = 0; i < $data.marketList.length; i++) {
                    modle._jishiList.push(new JishiItemVo(i, $data.marketList[i].id, $data.marketList[i].count, $data.marketList[i].price, $data.marketList[i].itemInfo));
                }
                //更新界面
                if (UIMgr.hasStage(UIConst.ShopView)) {
                    let ShopView = UIMgr.getUIByName(UIConst.ShopView) as ShopView;
                    ShopView.initView();
                }
                if (UIMgr.hasStage(UIConst.Shop_RefreshView)) {
                    UIMgr.hideUIByName(UIConst.Shop_RefreshView);
                }
            });
        }

        /** 跨天更新数据 */
        private refreshShopData(): void {
            this._model.shopMap.clear();
            if (UIMgr.hasStage(UIConst.ShopView)) {
                let ShopView = UIMgr.getUIByName(UIConst.ShopView) as ShopView;
                dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopView.getCurData().type);
            }
        }

        /**购买并刷新荣誉商店界面 */
        private updateShopData($eventdata): void {
            //购买逻辑 + 玩家数据更新           
            let args = {};
            args[Protocol.game_shop_buy.args.id] = $eventdata.id;
            args[Protocol.game_shop_buy.args.num] = $eventdata.num;
            PLC.request(Protocol.game_shop_buy, args, ($data: any, msg: any) => {
                if (!$data) return;
                let item = tb.TB_goods.get_TB_goodsById($data.buyId);
                let name = tb.TB_item.get_TB_itemById(item.item_id[0]).name;
                showToast(LanMgr.getLan("", 10449, name, $eventdata.num * item.item_id[1]));
                let shopVo = this._model.getGoodsById($eventdata.id, $eventdata.type);
                //是否是限购物品,是的话增加限购次数
                if (shopVo.tbGoods.buy_type != 0) {
                    shopVo.count += $eventdata.num;
                }
                //刷新商城界面
                if (UIMgr.getUIByName(UIConst.ShopView)) {
                    let shopView = UIMgr.getUIByName(UIConst.ShopView) as ShopView;
                    shopView.shopList.refresh();
                }
            })
        }

        /**购买界面 */
        private showGoumaiView($eventdata): void {
            UIMgr.showUI(UIConst.Shop_BuyView, $eventdata);
        }

        /**商店 */
        private showShopData(): void {
            UIMgr.showUI(UIConst.ShopView, ShopType.jingjichang);
        }

    }
}