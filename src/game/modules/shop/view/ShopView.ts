

module game {
    export class ShopView extends ui.shop.ShopUI {
        private _model: ShopModel;
        private _shopDataList: Array<any>;
        private _isOpen:boolean = false;
        private _initShopType:number = 0;
        constructor() {
            super();
            this.isModelClose = true;
            this.group = UIConst.hud_group;
            this.tabList.selectHandler = new Handler(this, this.onTab);
            this.tabList.renderHandler = new Handler(this, this.onTabRender);
            this.raceList.selectHandler = new Handler(this, this.onSelect);
            this._model = ShopModel.getInstance();
            // UIUtil.createHeadMask(this.img_icon, this.img_icon.width / 2);
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
			// 顶部
			this.boxTop.width = w;
			this.boxTop.height = GameUtil.isFullScreen() ? (54+HudModel.TOP_ADD_HEIGHT) : 54;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this._shopDataList = this._model.getTabs();
            this._initShopType = this.dataSource ? this.dataSource : 0;
            this.initView(true);
            this.playSpeakEff();
            //滚动到指定商店
            this.tabList.scrollTo(this.getIndexByType(this.dataSource)-2);
            // 打开
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if(view){
                view.setVisible(false);
            }
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this._shopDataList = this._model.getTabs();
            this._initShopType = this.dataSource ? this.dataSource : 0;
            this.initView(true);
            this.playSpeakEff();
            //滚动到指定商店
            this.tabList.scrollTo(this.getIndexByType(this.dataSource)-2);
            // 打开
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if(view){
                view.setVisible(false);
            }
        }

        public onClosed(): void {
            super.onClosed();
            this.tabList.array = null;
            this.shopList.array = null;
            this.raceList.array = null;
            this.btn_refresh.off(Laya.Event.CLICK, this, this.onRefresh);
            Laya.timer.clear(this, this.updateTime);
            UIMgr.showUI(UIConst.Main3DView);
            tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
            tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.onUpdateRes, this);
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            this.btn_add_zuanshi.off(Laya.Event.CLICK, this, this.onclick);
			this.btn_addgold.off(Laya.Event.CLICK, this, this.onclick);
            this.clearEff();
            this._marketSetTemp = null;
            // 优化操作，减少渲染
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if(view){
                 view.setVisible(true);
            }
            this._isOpen = false;
            this.clearTabEff();
            UIUtil.clearListEff(this.shopList.cells);
            this.stopSpeakEff();
            if (this._initShopType != 0){
                switch(this._initShopType){
                    case ShopType.guild://公会商店
                        UIMgr.showUI(UIConst.GuildMainView);
                        break;
                    case ShopType.jingjichang://竞技场
                        dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_ARENA_PANEL));
                        break;
                    case ShopType.shenjie://神界之门
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.SHENMEN]);
                        break;
                    case ShopType.yuanzheng://遗迹
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.EXPEDITION]);
                        break;
                    case ShopType.rongyao://荣耀
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GLORY_FIGHT]);
                        break;
                    case ShopType.godDm://神域
                        dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GOD_DOMAIN]);
                        break;
                }
            }
        }

        //当前选中标识
        private _index: number;
        public initView(init:boolean = false): void {
            //商店类型
            let shopType: number = this.dataSource;
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
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.onUpdateRes, this);
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.btn_refresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btn_add_zuanshi.on(Laya.Event.CLICK, this, this.onclick);
			this.btn_addgold.on(Laya.Event.CLICK, this, this.onclick);
            Laya.timer.loop(1000, this, this.updateTime);
            if (!this._isOpen){
                this._isOpen = true;
                this.playEnterEff();
                Laya.timer.callLater(this, this.playTabEff);
            }
            // Laya.timer.callLater(this, this.playItemEff);
            Laya.timer.callLater(this, ()=>{
                UIUtil.playListEff(this.shopList.cells);
            });

        }

        /** tab选择商店 */
        private onTab(index: number): void {
            if (this._index == index) {
                return;
            }
            this._index = index;
            
            this.playSpeakEff();
            dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), this.getCurData().type);
        }

        private playSpeakEff():void{
            this.stopSpeakEff();
            this.ani3.on(Laya.Event.COMPLETE, this, this.onAni3Complete);
            this.ani3.play(0, false);
            this.lab_speak.text = this.getCurData().speak;
        }

        private onAni3Complete():void{
            this.ani4.play(0, false);
        }

        private stopSpeakEff():void{
            this.ani4.gotoAndStop(0);
            this.ani3.gotoAndStop(0);
            this.ani3.off(Laya.Event.COMPLETE, this, this.onAni3Complete);
        }


        /** tab渲染 */
        private onTabRender(cell: ShopTabIR, index: number): void {
            cell.setSelect(this._index == index);
        }

        /** 更新资源 (页面显示该商店所需要的资源图标 + 玩家拥有数目)*/
        private onUpdateRes(): void {
            //资源类型
            let resType: number = this._model.getResType(this.getCurData().type);
            //消耗的icon
            this.imgCost.skin = SkinUtil.getCostSkin(resType);
            this.box_cost.visible = true;
            this.boxRes.width = 471;
            //玩家拥有的币种数量(都进行容错判断下)
            switch (resType) {
                case iface.tb_prop.resTypeKey.arena:
                    if (App.hero.arena < 0) this.lbNum.text = '' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.arena);
                    break;
                case iface.tb_prop.resTypeKey.guildDonate:
                    if (App.hero.guildDonate < 0) this.lbNum.text = 'X' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.guildDonate);
                    break;
                case iface.tb_prop.resTypeKey.darkEssence:
                    if (App.hero.darkEssence < 0) this.lbNum.text = '' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.darkEssence);
                    break;
                case iface.tb_prop.resTypeKey.godCrystal:
                    if (App.hero.godCrystal < 0) this.lbNum.text = '' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.godCrystal);
                    break;
                case iface.tb_prop.resTypeKey.soulStone:
                    if (App.hero.soulStone < 0) this.lbNum.text = '' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.soulStone);
                    break;
                case iface.tb_prop.resTypeKey.honour:
                    if (App.hero.honour < 0) this.lbNum.text = '' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.honour);
                    break;
                case iface.tb_prop.resTypeKey.godDomain:
                    if (App.hero.godDomain < 0) this.lbNum.text = '' + 0;
                    else this.lbNum.text = '' + Snums(App.hero.godDomain);
                    break;
                default:
                    this.lbNum.text = '';
                    this.box_cost.visible = false;
                    this.boxRes.width = 312;
            }

            this.lab_zuanshi.text = Snums(App.hero.diamond);
            this.lab_money.text = Snums(App.hero.gold);
        }

        /** 显示刷新时间 (目前集市用到) */
        private _marketSetTemp:tb.TB_market_set;
        private _marketFreeCount:number;
        private _marketReplyTime:number;
        private onUpdateRefresh(): void {
            this.boxRefresh.visible = this.getCurData().type == ShopType.jishi ? true : false;
            //是否是集市界面
            if (this.boxRefresh.visible != true) return;
            if (!this._marketSetTemp) this._marketSetTemp = tb.TB_market_set.getItemById(1);
            let marketFreeInfo:number[] = App.hero.getMarketFreeInfo();
            this._marketFreeCount = marketFreeInfo[0];
            this._marketReplyTime = marketFreeInfo[1];
            let gemCount:number = App.hero.getMarkeyBuyRefreshCount();
            if (gemCount > this._marketSetTemp.max_num) gemCount = this._marketSetTemp.max_num;

            //在集市界面的话
            this.lab_gem_count.text = LanMgr.getLan("", 12170, gemCount, this._marketSetTemp.max_num);
            this.updateMarketRefreshBtn();
            this.updateTime();
        }

        private updateMarketRefreshBtn():void{
            if (this._marketFreeCount > 0){
                //免费次数
                this.img_marketGem.visible = false;
                this.lab_gem_num.visible = false;
            }else{
                this.lab_gem_num.text = this._marketSetTemp.cost_diamond +"";
                this.img_marketGem.visible = true;
                this.lab_gem_num.visible = true;
            }
            this.lab_free_num.text = LanMgr.getLan("", 12171, this._marketFreeCount, this._marketSetTemp.reply_num);
        }
        /** 集市更新时间 */
        private updateTime(): void {
            //更新时间
            if (this.boxRefresh.visible){
                if (this._marketFreeCount < this._marketSetTemp.reply_num){
                    this.lb_time.visible = true;
                    let time = this._marketReplyTime - App.serverTimeSecond;
                    if (time <= 0){
                        this._marketFreeCount++;
                        this._marketReplyTime += this._marketSetTemp.reply_interval;
                        this.updateMarketRefreshBtn();
                        this.updateTime();
                        return;
                    }
                    this.lb_time.text = LanMgr.getLan("", 12172, GameUtil.toCountdown(time, "hh:mm:ss"));
                }else{
                    this.lb_time.visible = false;
                }
            }
        }

        /** 显示种族Tab (目前只有神界之门商店有用到) */
        private onUpdateRace(): void {
            this.raceList.array = [0, 1, 2, 3, 4,5];
            this.raceList.selectedIndex = 0;
            this.box_race.visible = this.getCurData().type == ShopType.shenjie ? true : false;
        }
        /** 种族选择 */
        private onSelect(index: number): void {
            this.shopList.array = null;
            this.updateShopList(this._model.getGoodsByRace(index, this.getCurData().type));
        }

        private updateShopList(items:any[]):void{
            let threeItems:any[] = [];
            if (items && items.length > 0){
                for (let i:number = 0; i < items.length; i+=4){
                    let threeArr:any[] = [];
                    for (let j:number = 0; j < 4; j++){
                        let idx:number = i+j;
                        if (idx >= items.length){
                            break;
                        }
                        threeArr[j]=items[idx];
                    }
                    threeItems.push(threeArr);
                }
            }
            this.shopList.array = threeItems;
        }

        /** 刷新集市界面 */
        private _onClickRefreshTime:number = 0;
        private onRefresh(): void {
            if (Laya.timer.currTimer < this._onClickRefreshTime) return;
            this._onClickRefreshTime = Laya.timer.currTimer + 500;

            if (this._marketFreeCount <= 0){
                //钻石刷新
                let gemCount:number = App.hero.getMarkeyBuyRefreshCount();
                if (gemCount >= this._marketSetTemp.max_num){
                    showToast(LanMgr.getLan('', 10451));
                    return;
                }
                if (RefreshView.IS_TIPS_TODAY){
                    UIMgr.showUI(UIConst.Shop_RefreshView, this._marketSetTemp);
                }else{
                    if (App.hero.diamond < this._marketSetTemp.cost_diamond){
                        showToast(LanMgr.getLan("", 10073));
                        return;
                    }
                    dispatchEvt(new ShopEvent(ShopEvent.REFRESH_JISHI_VIEW));
                }
            }else{
                //免费刷新
                dispatchEvt(new ShopEvent(ShopEvent.REFRESH_JISHI_VIEW));
            }

            // 
        }

        getCurData() {
            return this._shopDataList[this._index];
        }

        private playEnterEff():void{
            this.ani1.gotoAndStop(0);
            this.ani2.play(0, false);
            this.ani2.on(Laya.Event.COMPLETE, this, this.onFlyEffComplete);
        }

        private onFlyEffComplete():void{
            this.ani1.play(0, true);
        }

        private clearEff():void{
            this.ani2.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            this.ani2.off(Laya.Event.COMPLETE, this, this.onFlyEffComplete);
        }

        private playTabEff():void{
            this.clearTabEff();
            let cells = this.tabList.cells;
            if (cells){
                for (let i:number = 0; i < cells.length; i++){
                    let cell = cells[i];
                    let targetPosx:number = cell.x;
                    cell.x = targetPosx + 900;
                    let time:number = i*50;
                    Laya.timer.once(time, this, (item, posx)=>{
                        Laya.Tween.to(item, {x:posx}, 300);
                    },[cell, targetPosx])
                }
            }
        }

        private clearTabEff():void{
            let cells = this.tabList.cells;
            if (cells){
                for (let i:number = 0; i < cells.length; i++){
                    let cell = cells[i];
                    Laya.Tween.clearAll(cell);
                }
            }
            Laya.timer.clearAll(this);
        }

        private onclick(e:Laya.Event):void{
            switch(e.currentTarget){
                case this.btn_add_zuanshi:
                    dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
                case this.btn_addgold:
                    UIMgr.showUI(UIConst.ExchangeGoldView);
                    break;
            }
        }

        /**
         * 获得枚举类型对应的页签标识
         */
        getIndexByType(type: number): number {
            for (let i = 0; i < this._shopDataList.length; i++) {
                let vo = this._shopDataList[i];
                if (Number(vo.type) == type) {
                    return i;
                }
            }
            return 0;
        }
    }

}