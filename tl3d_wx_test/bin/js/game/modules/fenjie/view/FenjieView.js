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
    var FenjieView = /** @class */ (function (_super) {
        __extends(FenjieView, _super);
        function FenjieView() {
            var _this = _super.call(this) || this;
            _this._curSelectGods = [];
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12575) };
            _this.bgPanel.box_Content.addChild(_this.img_bg);
            _this._curSelectGods = [];
            _this.list_race.selectHandler = new Handler(_this, _this.onRaceSelect);
            _this.list_race.renderHandler = new Handler(_this, _this.onRaceRender);
            _this.list_race.selectedIndex = -1;
            _this.list_gods.mouseHandler = new Handler(_this, _this.onMouseHandler);
            _this.list_gods.renderHandler = new Handler(_this, _this.onGodRender);
            _this._model = game.FenjieModel.getInstance();
            return _this;
        }
        FenjieView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            this._model.tempReturnData = {};
            this.list_gods.array = null;
            this.list_race.array = null;
            this.list_race.selectedIndex = -1;
            this._curSelectGods.length = 0;
            this.btn_fast.off(Laya.Event.CLICK, this, this.onFast);
            this.btn_fenjie.off(Laya.Event.CLICK, this, this.onFenjie);
        };
        FenjieView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        FenjieView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, false, false);
            this.initView();
        };
        /** 初始化界面 */
        FenjieView.prototype.initView = function () {
            this._model.tempReturnData = {};
            this.btn_fast.on(Laya.Event.CLICK, this, this.onFast);
            this.btn_fenjie.on(Laya.Event.CLICK, this, this.onFenjie);
            this.btnNext.on(Laya.Event.CLICK, this, this.onScroll, [true]);
            this.btnPrev.on(Laya.Event.CLICK, this, this.onScroll, [false]);
            //种族数据
            this.list_race.array = [0, 1, 2, 3, 4, 5];
            this.list_race.selectedIndex = 0;
            //展示已拥有神灵数目/总神灵数目
            this.showHaveGod();
            this.refreshItemList();
        };
        /** 展示现有英雄数/最大可拥有英雄数 */
        FenjieView.prototype.showHaveGod = function () {
            //获取到vip所拥有的最大英雄数量
            var maxGods = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum);
            //展示现有英雄数/最大可拥有英雄数
            this.lab_godnum.text = LanMgr.getLan("", 12578, game.GodUtils.getGodsNum(), maxGods);
        };
        /** 刷新返还材料 */
        FenjieView.prototype.refreshItemList = function () {
            var _this = this;
            var len = this._curSelectGods.length;
            this.lbSelect.text = len > 0 ? LanMgr.getLan("", 12576) : LanMgr.getLan("", 12577);
            this._model.requestReturnList(this._curSelectGods).then(function (itemList) {
                itemList = itemList || [];
                var len = itemList.length;
                _this.btnPrev.visible = _this.btnNext.visible = itemList.length > 5;
                var listWidth = 100 * len + (len - 1) * _this.itemList.spaceX;
                listWidth = listWidth > 556 ? 556 : listWidth;
                _this.itemList.array = itemList;
                _this.itemList.width = listWidth;
            });
        };
        /** 刷新界面 */
        FenjieView.prototype.refreshView = function () {
            this.onRaceSelect(this.list_race.selectedIndex);
        };
        FenjieView.prototype.onRaceRender = function (cell, index) {
            if (!cell)
                return;
            cell.img_selected.visible = index == this.list_race.selectedIndex;
        };
        /**
         * 选择的英雄种族
         * @param index
         */
        FenjieView.prototype.onRaceSelect = function (index) {
            if (index == -1)
                return;
            var gods = App.hero.getGodAry().filter(function (vo) {
                return index == 0 ? true : vo.getRaceType() == index;
            });
            this.sortGods(gods);
            this.list_gods.array = gods;
            this.clearSelect();
        };
        FenjieView.prototype.sortGods = function (gods) {
            //排序 分解排列规则按照 未上阵（按照星级、再按照等级从低到高排）、已上阵排列
            gods.forEach(function (vo) {
                vo.sortNum = 0;
                if (vo.isInLinuep()) {
                    vo.sortNum = 100000;
                    vo.sortNum += (vo.isInLinuep(iface.tb_prop.lineupTypeKey.attack) ? 1 : 2);
                }
                else {
                    vo.sortNum += (vo.starLevel * 1000 + vo.level);
                }
            });
            gods.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
        };
        /** 选择英雄 */
        FenjieView.prototype.onMouseHandler = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var cell = this.list_gods.getCell(index);
                var godVo_1 = cell.dataSource;
                if (!godVo_1)
                    return;
                if (cell.img_gouxuan.visible) {
                    cell.img_gouxuan.visible = false;
                    var index_1 = this._curSelectGods.findIndex(function (vo) {
                        return vo.uuid == godVo_1.uuid;
                    });
                    if (index_1 != -1) {
                        this._curSelectGods.splice(index_1, 1);
                    }
                }
                else {
                    if (this._curSelectGods.length >= 10) {
                        showToast(LanMgr.getLan('', 10309));
                        return;
                    }
                    if (godVo_1.isInLinuep()) {
                        common.AlertBox.showAlert({
                            text: LanMgr.getLan("", 10501), confirmCb: function () {
                                dispatchEvt(new game.GodEvent(game.GodEvent.CHOOSE_LINEUP_GOD), godVo_1);
                            }
                        });
                        return;
                    }
                    if (godVo_1.starLevel >= 6) {
                        showToast(LanMgr.getLan("", 10310));
                        return;
                    }
                    cell.img_gouxuan.visible = true;
                    this._curSelectGods.push(godVo_1);
                }
                this.refreshItemList();
            }
        };
        FenjieView.prototype.onGodRender = function (cell, index) {
            var item = cell.dataSource;
            if (item) {
                cell.god_icon.dataSource = item;
                cell.item_icon.dataSource = null;
                cell.item_icon.visible = false;
                cell.god_icon.visible = true;
                cell.img_gouxuan.visible = this._curSelectGods.some(function (vo) { return vo.uuid == item.uuid; });
                cell.gray = item.isInLinuep();
            }
            else {
                cell.god_icon.dataSource = null;
                cell.item_icon.dataSource = null;
                cell.gray = false;
                cell.img_gouxuan.visible = false;
            }
        };
        //按钮事件
        /** 快速选择 */
        FenjieView.prototype.onFast = function () {
            var ary = [];
            var godsAry = this.list_gods.array;
            //开始快速选择十个英雄
            for (var i = 0; i < 10; i++) {
                if (!godsAry[i] || godsAry[i].isInLinuep() || godsAry[i].starLevel >= 6)
                    continue;
                ary.push(godsAry[i]);
            }
            this.fastSelect(ary);
        };
        /** 快速选择 */
        FenjieView.prototype.fastSelect = function (selectAry) {
            var ids = selectAry.map(function (vo) {
                return vo.uuid;
            });
            for (var i = 0; i < this.list_gods.cells.length; i++) {
                var cell = this.list_gods.cells[i];
                var godVo = cell.dataSource;
                cell.img_gouxuan.visible = godVo && ids.indexOf(godVo.uuid) != -1;
            }
            this._curSelectGods = selectAry;
            this.refreshItemList();
        };
        /** 清除选中 */
        FenjieView.prototype.clearSelect = function () {
            for (var i = 0; i < this.list_gods.cells.length; i++) {
                var cell = this.list_gods.cells[i];
                cell.img_gouxuan.visible = false;
            }
            this._curSelectGods.length = 0;
        };
        /** 点击分解 */
        FenjieView.prototype.onFenjie = function () {
            dispatchEvt(new game.FenjieEvent(game.FenjieEvent.CLICK_BTN_FENJIE), this._curSelectGods);
        };
        FenjieView.prototype.onScroll = function (next) {
            if (next) {
                this.itemList.scrollBar.value += 300;
            }
            else {
                this.itemList.scrollBar.value -= 300;
            }
        };
        return FenjieView;
    }(ui.fenjie.FenjieUI));
    game.FenjieView = FenjieView;
})(game || (game = {}));
