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
    var BagView = /** @class */ (function (_super) {
        __extends(BagView, _super);
        function BagView() {
            var _this = _super.call(this) || this;
            _this.recycleVisible = false;
            _this.group = UIConst.hud_group;
            _this._model = game.BagModel.getInstance();
            _this.initUi();
            return _this;
        }
        BagView.prototype.initUi = function () {
            this.bagItemList = new common.BagRenderList(600, 598);
            this.bagItemList.itemRender = game.BagIR;
            this.bagItemList.spaceY = 1;
            this.bagItemList.x = 47;
            this.bagItemList.y = 158;
            this.bagItemList.max = 1000000;
            this.boxContent.addChildAt(this.bagItemList, 5);
            this.list_buttons.selectHandler = new Handler(this, this.onSelect);
            this.list_buttons.renderHandler = new Handler(this, this.onRender);
            this.btn_decomposition.on(Laya.Event.CLICK, this, this.onDecomposition);
            this.raceList.selectHandler = new Handler(this, this.onRaceSelect);
            this.raceList.selectedIndex = -1;
            this.godList.array = null;
            this.godList.mouseHandler = new Handler(this, this.onMouseHandler);
            this.raceList.array = [0, 1, 2, 3, 4, 5];
            this.btnFenjie.on(Laya.Event.CLICK, this, this.onFenjie);
            this.treasureList.array = null;
            this.treasureList.mouseHandler = new Handler(this, this.onClickTreasure);
            this.btnTreasureRebirth.on(Laya.Event.CLICK, this, this.onTreasureRebirth);
            this.btnTreasureTujian.on(Laya.Event.CLICK, this, this.onTreasureTujian);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.BEIBAO);
        };
        BagView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.list_buttons.dataSource = SkinUtil.bagButtons;
            this.list_buttons.selectedIndex = this.dataSource == -1 ? 0 : this.dataSource;
            UIUtil.boxScaleTween(this.boxContent, 0.5, 1, 310, 0.05);
        };
        BagView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            this.delayListSetData(index);
            this.img_racebg.visible = index == 0;
        };
        /**
         * 装备删除或增加时，变化
         */
        BagView.prototype.equchange = function () {
            var curtab = this.list_buttons.selectedIndex;
            if (curtab == game.TABTYPE.HERO || curtab == game.TABTYPE.EQU) {
                this.delayListSetData(curtab);
            }
        };
        /** 材料tab变化 */
        BagView.prototype.materialChange = function () {
            var curtab = this.list_buttons.selectedIndex;
            if (curtab == game.TABTYPE.CAILIAO) {
                this.delayListSetData(curtab);
            }
        };
        /** 分解 */
        BagView.prototype.onFenjie = function () {
            dispatchEvt(new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW));
        };
        /** 延迟渲染，防止同帧渲染多次 */
        BagView.prototype.delayListSetData = function (tabid) {
            Laya.timer.frameOnce(2, this, this.updateData, [tabid]);
        };
        BagView.prototype.updateData = function (tabid) {
            var id = tabid == undefined ? this.list_buttons.selectedIndex : tabid;
            var isGod = id == game.TABTYPE.HERO;
            var isTreasure = id == game.TABTYPE.TREASURE;
            this.lbGodCount.visible = this.godList.visible = this.raceList.visible = isGod;
            this.treasureList.visible = this.btnTreasureRebirth.visible = this.btnTreasureTujian.visible = isTreasure;
            this.bagItemList.visible = !isGod && !isTreasure;
            this.btn_decomposition.visible = id == game.TABTYPE.EQU;
            this.btnFenjie.visible = id == game.TABTYPE.HERO;
            if (isGod) {
                this.raceList.selectedIndex = this.raceList.selectedIndex != -1 ? this.raceList.selectedIndex : 0;
            }
            else if (isTreasure) {
                this.raceList.selectedIndex = -1;
                var ary = game.TreasureModel.getInstance().getBagViewList();
                this.treasureList.array = ary;
                this.lab_empty.visible = ary.length == 0;
            }
            else {
                this.raceList.selectedIndex = -1;
                this.bagItemList.dataSource = this._model.getListByType(id);
                this.lab_empty.visible = !this.bagItemList.dataSource || this.bagItemList.dataSource.length == 0;
            }
        };
        /** 种族选择 */
        BagView.prototype.onRaceSelect = function (index) {
            if (index == -1)
                return;
            var gods = App.hero.getGodArr().filter(function (vo) {
                return !vo.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            });
            gods = index == 0 ? gods : gods.filter(function (vo) {
                return vo.getRaceType() == index;
            });
            gods.forEach(function (vo) {
                // 星级-》等级-》稀有度-》阵营
                vo.sortNum = -vo.starLevel * 100000 - vo.level * 100 - vo.tab_god.quality * 10 + vo.tab_god.race_type;
            });
            gods.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            // 背包 等级前面要加上 LV.只能重新构造vo对象
            var tempGods = gods.map(function (vo) {
                var newVo = GodItemVo.getData(vo, vo.uuid);
                newVo.levelStr = "" + newVo.level;
                return newVo;
            });
            this.godList.array = tempGods;
            this.updateCount();
            if (this.list_buttons.selectedIndex == game.TABTYPE.HERO) {
                this.lab_empty.visible = tempGods.length == 0;
            }
        };
        BagView.prototype.updateCount = function () {
            var index = this.list_buttons.selectedIndex;
            if (index == game.TABTYPE.HERO) {
                var maxNum = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) - App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack, false).length;
                this.lbGodCount.text = LanMgr.getLan("", 12350) + ("\uFF1A" + this.godList.array.length + "/" + maxNum);
            }
            else if (index == game.TABTYPE.TREASURE) {
            }
        };
        /** 选中英雄 */
        BagView.prototype.onMouseHandler = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                // let godVo = this.godList.getItem(index) as GodItemVo;
                var ids = this.godList.array.map(function (vo) {
                    return vo.uuid;
                });
                dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_GOD_CULTURE_VIEW), [index, ids]);
            }
        };
        /** 选中圣物 */
        BagView.prototype.onClickTreasure = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var treasureVo = this.treasureList.getItem(index);
                if (treasureVo) {
                    game.TreasureTipsView.popupTip(treasureVo, null, false, { "showStrengthBtn": true, "showStarBtn": true });
                }
            }
        };
        /** 圣物重生 */
        BagView.prototype.onTreasureRebirth = function () {
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_REBIRTH_VIEW));
        };
        /** 圣物图鉴 */
        BagView.prototype.onTreasureTujian = function () {
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_TUJIAN_VIEW));
        };
        BagView.prototype.onRender = function (item, index) {
            if (!item.dataSource)
                return;
            item.btn_type.skin = item.dataSource;
            item.btn_zhuobu.selected = index == this.list_buttons.selectedIndex;
            var redname = game.BagModel.bagTypeName[index];
            if (item.redPoint.redpointName != redname) {
                item.redPoint.setRedPointName(redname);
            }
        };
        BagView.prototype.stopScroll = function () {
            if (this.bagItemList) {
                this.bagItemList.stopScroll();
            }
        };
        /**
         * 刷新某个item
         * @param ndata
         */
        BagView.prototype.updateItem = function (ndata) {
            //需刷新的数据，是否为当前页签下的合法数据
            if (!this.belongTab(ndata)) {
                return;
            }
            var slist = this.bagItemList.dataSource;
            if (!slist)
                return;
            for (var v = 0; v < slist.length; v++) {
                var vlist = slist[v];
                for (var l = 0; l < vlist.length; l++) {
                    var element = vlist[l];
                    if (element instanceof ItemVo && ndata instanceof ItemVo) {
                        if (ndata.id == element.id) {
                            if (ndata.count <= 0) {
                                //如果物品已经使用完，则重置数据源
                                this.delayListSetData();
                                return;
                            }
                            ndata.selectid = element.selectid;
                            ndata.indexid = element.indexid;
                            ndata.countFromBag = true;
                            vlist.splice(l, 1, ndata);
                            var line = Math.floor(element.indexid / 6);
                            var item = this.bagItemList.getCell(line);
                            if (item) {
                                item.updataItem(l);
                            }
                            return;
                        }
                    }
                    else if (element instanceof EquipItemVo && ndata instanceof EquipItemVo) {
                        if (ndata.uuid == element.uuid) {
                            //如果找到当前变化的符文
                            ndata.selectid = element.selectid;
                            ndata.indexid = element.indexid;
                            vlist.splice(l, 1, ndata);
                            var line = Math.floor(element.indexid / 6);
                            var item = this.bagItemList.getCell(line);
                            if (item) {
                                item.updataItem(l);
                            }
                            return;
                        }
                    }
                }
            }
            //新item变化，直接给list重新赋值
            this.delayListSetData();
        };
        /**
         * 某数据源是否属于当前页签
         * @param vo
         */
        BagView.prototype.belongTab = function (vo) {
            var curtab = this.list_buttons.selectedIndex;
            if (curtab == game.TABTYPE.HERO) {
                return true;
            }
            if (vo instanceof ItemVo && curtab == game.TABTYPE.SUIPIAN && vo.type == iface.tb_prop.itemTypeKey.chip) {
                return true;
            }
            if (vo instanceof ItemVo && curtab == game.TABTYPE.CAILIAO && vo.type == iface.tb_prop.itemTypeKey.materials) {
                return true;
            }
            if (vo instanceof ItemVo && curtab == game.TABTYPE.CAILIAO && vo.type == iface.tb_prop.itemTypeKey.gift) {
                return true;
            }
            if (vo instanceof ItemVo && curtab == game.TABTYPE.CAILIAO && vo.type == iface.tb_prop.itemTypeKey.optionalCard) {
                return true;
            }
            if (vo instanceof EquipItemVo && curtab == game.TABTYPE.EQU) {
                return true;
            }
            if (vo instanceof LimitItemVo && curtab == game.TABTYPE.CAILIAO) {
                return true;
            }
            if (vo.type == iface.tb_prop.itemTypeKey.optionalCard && curtab == game.TABTYPE.CAILIAO) {
                return true;
            }
            return false;
        };
        /**
         * 点击出售
         */
        BagView.prototype.onDecomposition = function () {
            dispatchEvt(new game.BagEvent(game.BagEvent.OPEN_SELL_VIEW));
        };
        /** 刷新神灵 */
        BagView.prototype.refreshGod = function () {
            var index = this.raceList.selectedIndex;
            this.raceList.selectedIndex = -1;
            this.raceList.selectedIndex = index;
        };
        /** 刷新圣物 */
        BagView.prototype.refreshTreasure = function (reset) {
            if (reset === void 0) { reset = false; }
            if (this.list_buttons.selectedIndex != game.TABTYPE.TREASURE)
                return;
            if (reset) {
                var ary = game.TreasureModel.getInstance().getBagViewList();
                this.treasureList.array = ary;
                this.lab_empty.visible = ary.length == 0;
            }
            else {
                this.treasureList.refresh();
            }
        };
        BagView.prototype.close = function () {
            _super.prototype.close.call(this, null, false);
            this.list_buttons.selectedIndex = -1;
            this.raceList.selectedIndex = -1;
            this.godList.array = null;
            this.bagItemList.dataSource = null;
            this.treasureList.array = null;
            Laya.timer.clearAll(this);
        };
        return BagView;
    }(ui.bag.BagUI));
    game.BagView = BagView;
})(game || (game = {}));
