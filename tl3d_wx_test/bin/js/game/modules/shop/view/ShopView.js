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
    var ShopView = /** @class */ (function (_super) {
        __extends(ShopView, _super);
        function ShopView() {
            var _this = _super.call(this) || this;
            _this._isOpen = false;
            _this._initShopType = 0;
            /** 刷新集市界面 */
            _this._onClickRefreshTime = 0;
            _this.isModelClose = true;
            _this.group = UIConst.hud_group;
            _this.tabList.selectHandler = new Handler(_this, _this.onTab);
            _this.tabList.renderHandler = new Handler(_this, _this.onTabRender);
            _this.raceList.selectHandler = new Handler(_this, _this.onSelect);
            _this._model = game.ShopModel.getInstance();
            return _this;
            // UIUtil.createHeadMask(this.img_icon, this.img_icon.width / 2);
        }
        ShopView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            // 顶部
            this.boxTop.width = w;
            this.boxTop.height = GameUtil.isFullScreen() ? (54 + game.HudModel.TOP_ADD_HEIGHT) : 54;
        };
        ShopView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this._shopDataList = this._model.getTabs();
            this._initShopType = this.dataSource ? this.dataSource : 0;
            this.initView(true);
            this.playSpeakEff();
            //滚动到指定商店
            this.tabList.scrollTo(this.getIndexByType(this.dataSource) - 2);
            // 打开
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                view.setVisible(false);
            }
        };
        ShopView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this._shopDataList = this._model.getTabs();
            this._initShopType = this.dataSource ? this.dataSource : 0;
            this.initView(true);
            this.playSpeakEff();
            //滚动到指定商店
            this.tabList.scrollTo(this.getIndexByType(this.dataSource) - 2);
            // 打开
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                view.setVisible(false);
            }
        };
        ShopView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabList.array = null;
            this.shopList.array = null;
            this.raceList.array = null;
            this.btn_refresh.off(Laya.Event.CLICK, this, this.onRefresh);
            Laya.timer.clear(this, this.updateTime);
            UIMgr.showUI(UIConst.Main3DView);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.onUpdateRes, this);
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            this.btn_add_zuanshi.off(Laya.Event.CLICK, this, this.onclick);
            this.btn_addgold.off(Laya.Event.CLICK, this, this.onclick);
            this.clearEff();
            this._marketSetTemp = null;
            // 优化操作，减少渲染
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                view.setVisible(true);
            }
            this._isOpen = false;
            this.clearTabEff();
            UIUtil.clearListEff(this.shopList.cells);
            this.stopSpeakEff();
            if (this._initShopType != 0) {
                switch (this._initShopType) {
                    case ShopType.guild: //公会商店
                        UIMgr.showUI(UIConst.GuildMainView);
                        break;
                    case ShopType.jingjichang: //竞技场
                        dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_ARENA_PANEL));
                        break;
                    case ShopType.shenjie: //神界之门
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.SHENMEN]);
                        break;
                    case ShopType.yuanzheng: //遗迹
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.EXPEDITION]);
                        break;
                    case ShopType.rongyao: //荣耀
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GLORY_FIGHT]);
                        break;
                    case ShopType.godDm: //神域
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GOD_DOMAIN]);
                        break;
                }
            }
        };
        ShopView.prototype.initView = function (init) {
            var _this = this;
            if (init === void 0) { init = false; }
            //商店类型
            var shopType = this.dataSource;
            this._index = this.getIndexByType(shopType);
            //商店Tab
            this.tabList.array = this._shopDataList;
            //Tab选择
            this.tabList.selectedIndex = this._index;
            //更新资源(商城和集市没有显示)
            this.onUpdateRes();
            //物品列表
            this.updateShopList(this._model.getShopListByType(this.getCurData().type));
            //种族列表(神界之门特有属性)
            this.onUpdateRace();
            //刷新(集市特有属性)
            this.onUpdateRefresh();
            //增添更新事件
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.onUpdateRes, this);
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.btn_refresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btn_add_zuanshi.on(Laya.Event.CLICK, this, this.onclick);
            this.btn_addgold.on(Laya.Event.CLICK, this, this.onclick);
            Laya.timer.loop(1000, this, this.updateTime);
            if (!this._isOpen) {
                this._isOpen = true;
                this.playEnterEff();
                Laya.timer.callLater(this, this.playTabEff);
            }
            // Laya.timer.callLater(this, this.playItemEff);
            Laya.timer.callLater(this, function () {
                UIUtil.playListEff(_this.shopList.cells);
            });
        };
        /** tab选择商店 */
        ShopView.prototype.onTab = function (index) {
            if (this._index == index) {
                return;
            }
            this._index = index;
            this.playSpeakEff();
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), this.getCurData().type);
        };
        ShopView.prototype.playSpeakEff = function () {
            this.stopSpeakEff();
            this.ani3.on(Laya.Event.COMPLETE, this, this.onAni3Complete);
            this.ani3.play(0, false);
            this.lab_speak.text = this.getCurData().speak;
        };
        ShopView.prototype.onAni3Complete = function () {
            this.ani4.play(0, false);
        };
        ShopView.prototype.stopSpeakEff = function () {
            this.ani4.gotoAndStop(0);
            this.ani3.gotoAndStop(0);
            this.ani3.off(Laya.Event.COMPLETE, this, this.onAni3Complete);
        };
        /** tab渲染 */
        ShopView.prototype.onTabRender = function (cell, index) {
            cell.setSelect(this._index == index);
        };
        /** 更新资源 (页面显示该商店所需要的资源图标 + 玩家拥有数目)*/
        ShopView.prototype.onUpdateRes = function () {
            //资源类型
            var resType = this._model.getResType(this.getCurData().type);
            //消耗的icon
            this.imgCost.skin = SkinUtil.getCostSkin(resType);
            this.box_cost.visible = true;
            this.boxRes.width = 471;
            //玩家拥有的币种数量(都进行容错判断下)
            switch (resType) {
                case iface.tb_prop.resTypeKey.arena:
                    if (App.hero.arena < 0)
                        this.lbNum.text = '' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.arena);
                    break;
                case iface.tb_prop.resTypeKey.guildDonate:
                    if (App.hero.guildDonate < 0)
                        this.lbNum.text = 'X' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.guildDonate);
                    break;
                case iface.tb_prop.resTypeKey.darkEssence:
                    if (App.hero.darkEssence < 0)
                        this.lbNum.text = '' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.darkEssence);
                    break;
                case iface.tb_prop.resTypeKey.godCrystal:
                    if (App.hero.godCrystal < 0)
                        this.lbNum.text = '' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.godCrystal);
                    break;
                case iface.tb_prop.resTypeKey.soulStone:
                    if (App.hero.soulStone < 0)
                        this.lbNum.text = '' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.soulStone);
                    break;
                case iface.tb_prop.resTypeKey.honour:
                    if (App.hero.honour < 0)
                        this.lbNum.text = '' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.honour);
                    break;
                case iface.tb_prop.resTypeKey.godDomain:
                    if (App.hero.godDomain < 0)
                        this.lbNum.text = '' + 0;
                    else
                        this.lbNum.text = '' + Snums(App.hero.godDomain);
                    break;
                default:
                    this.lbNum.text = '';
                    this.box_cost.visible = false;
                    this.boxRes.width = 312;
            }
            this.lab_zuanshi.text = Snums(App.hero.diamond);
            this.lab_money.text = Snums(App.hero.gold);
        };
        ShopView.prototype.onUpdateRefresh = function () {
            this.boxRefresh.visible = this.getCurData().type == ShopType.jishi ? true : false;
            //是否是集市界面
            if (this.boxRefresh.visible != true)
                return;
            if (!this._marketSetTemp)
                this._marketSetTemp = tb.TB_market_set.getItemById(1);
            var marketFreeInfo = App.hero.getMarketFreeInfo();
            this._marketFreeCount = marketFreeInfo[0];
            this._marketReplyTime = marketFreeInfo[1];
            var gemCount = App.hero.getMarkeyBuyRefreshCount();
            if (gemCount > this._marketSetTemp.max_num)
                gemCount = this._marketSetTemp.max_num;
            //在集市界面的话
            this.lab_gem_count.text = LanMgr.getLan("", 12170, gemCount, this._marketSetTemp.max_num);
            this.updateMarketRefreshBtn();
            this.updateTime();
        };
        ShopView.prototype.updateMarketRefreshBtn = function () {
            if (this._marketFreeCount > 0) {
                //免费次数
                this.img_marketGem.visible = false;
                this.lab_gem_num.visible = false;
            }
            else {
                this.lab_gem_num.text = this._marketSetTemp.cost_diamond + "";
                this.img_marketGem.visible = true;
                this.lab_gem_num.visible = true;
            }
            this.lab_free_num.text = LanMgr.getLan("", 12171, this._marketFreeCount, this._marketSetTemp.reply_num);
        };
        /** 集市更新时间 */
        ShopView.prototype.updateTime = function () {
            //更新时间
            if (this.boxRefresh.visible) {
                if (this._marketFreeCount < this._marketSetTemp.reply_num) {
                    this.lb_time.visible = true;
                    var time = this._marketReplyTime - App.serverTimeSecond;
                    if (time <= 0) {
                        this._marketFreeCount++;
                        this._marketReplyTime += this._marketSetTemp.reply_interval;
                        this.updateMarketRefreshBtn();
                        this.updateTime();
                        return;
                    }
                    this.lb_time.text = LanMgr.getLan("", 12172, GameUtil.toCountdown(time, "hh:mm:ss"));
                }
                else {
                    this.lb_time.visible = false;
                }
            }
        };
        /** 显示种族Tab (目前只有神界之门商店有用到) */
        ShopView.prototype.onUpdateRace = function () {
            this.raceList.array = [0, 1, 2, 3, 4, 5];
            this.raceList.selectedIndex = 0;
            this.box_race.visible = this.getCurData().type == ShopType.shenjie ? true : false;
        };
        /** 种族选择 */
        ShopView.prototype.onSelect = function (index) {
            this.shopList.array = null;
            this.updateShopList(this._model.getGoodsByRace(index, this.getCurData().type));
        };
        ShopView.prototype.updateShopList = function (items) {
            var threeItems = [];
            if (items && items.length > 0) {
                for (var i = 0; i < items.length; i += 4) {
                    var threeArr = [];
                    for (var j = 0; j < 4; j++) {
                        var idx = i + j;
                        if (idx >= items.length) {
                            break;
                        }
                        threeArr[j] = items[idx];
                    }
                    threeItems.push(threeArr);
                }
            }
            this.shopList.array = threeItems;
        };
        ShopView.prototype.onRefresh = function () {
            if (Laya.timer.currTimer < this._onClickRefreshTime)
                return;
            this._onClickRefreshTime = Laya.timer.currTimer + 500;
            if (this._marketFreeCount <= 0) {
                //钻石刷新
                var gemCount = App.hero.getMarkeyBuyRefreshCount();
                if (gemCount >= this._marketSetTemp.max_num) {
                    showToast(LanMgr.getLan('', 10451));
                    return;
                }
                if (game.RefreshView.IS_TIPS_TODAY) {
                    UIMgr.showUI(UIConst.Shop_RefreshView, this._marketSetTemp);
                }
                else {
                    if (App.hero.diamond < this._marketSetTemp.cost_diamond) {
                        showToast(LanMgr.getLan("", 10073));
                        return;
                    }
                    dispatchEvt(new game.ShopEvent(game.ShopEvent.REFRESH_JISHI_VIEW));
                }
            }
            else {
                //免费刷新
                dispatchEvt(new game.ShopEvent(game.ShopEvent.REFRESH_JISHI_VIEW));
            }
            // 
        };
        ShopView.prototype.getCurData = function () {
            return this._shopDataList[this._index];
        };
        ShopView.prototype.playEnterEff = function () {
            this.ani1.gotoAndStop(0);
            this.ani2.play(0, false);
            this.ani2.on(Laya.Event.COMPLETE, this, this.onFlyEffComplete);
        };
        ShopView.prototype.onFlyEffComplete = function () {
            this.ani1.play(0, true);
        };
        ShopView.prototype.clearEff = function () {
            this.ani2.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            this.ani2.off(Laya.Event.COMPLETE, this, this.onFlyEffComplete);
        };
        ShopView.prototype.playTabEff = function () {
            this.clearTabEff();
            var cells = this.tabList.cells;
            if (cells) {
                for (var i = 0; i < cells.length; i++) {
                    var cell = cells[i];
                    var targetPosx = cell.x;
                    cell.x = targetPosx + 900;
                    var time = i * 50;
                    Laya.timer.once(time, this, function (item, posx) {
                        Laya.Tween.to(item, { x: posx }, 300);
                    }, [cell, targetPosx]);
                }
            }
        };
        ShopView.prototype.clearTabEff = function () {
            var cells = this.tabList.cells;
            if (cells) {
                for (var i = 0; i < cells.length; i++) {
                    var cell = cells[i];
                    Laya.Tween.clearAll(cell);
                }
            }
            Laya.timer.clearAll(this);
        };
        ShopView.prototype.onclick = function (e) {
            switch (e.currentTarget) {
                case this.btn_add_zuanshi:
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
                case this.btn_addgold:
                    UIMgr.showUI(UIConst.ExchangeGoldView);
                    break;
            }
        };
        /**
         * 获得枚举类型对应的页签标识
         */
        ShopView.prototype.getIndexByType = function (type) {
            for (var i = 0; i < this._shopDataList.length; i++) {
                var vo = this._shopDataList[i];
                if (Number(vo.type) == type) {
                    return i;
                }
            }
            return 0;
        };
        return ShopView;
    }(ui.shop.ShopUI));
    game.ShopView = ShopView;
})(game || (game = {}));
