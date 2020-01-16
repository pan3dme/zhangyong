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
    var godTabStarupView = /** @class */ (function (_super) {
        __extends(godTabStarupView, _super);
        function godTabStarupView() {
            var _this = _super.call(this) || this;
            _this.list_nowstar.renderHandler = new Handler(_this, _this.onXingjiRender);
            _this.list_nextstar.renderHandler = new Handler(_this, _this.onXingjiRender);
            _this.list_maxstar.renderHandler = new Handler(_this, _this.onXingjiRender);
            _this.list_predegree.renderHandler = new Handler(_this, _this.onDegreeRender);
            _this.list_afterdegree.renderHandler = new Handler(_this, _this.onDegreeRender);
            _this.btn_starup.on(Laya.Event.CLICK, _this, _this.onStarUp);
            _this._needInit = true;
            _this.list_choose.mouseHandler = new Handler(_this, _this.onChooseSelect);
            return _this;
        }
        Object.defineProperty(godTabStarupView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                var oldVo = this._dataSource;
                if (oldVo && $value && oldVo.uuid == $value.uuid) {
                    this._needInit = false;
                }
                else {
                    this._needInit = true;
                }
                this._dataSource = $value;
            },
            enumerable: true,
            configurable: true
        });
        godTabStarupView.prototype.close = function () {
            this._needInit = true;
            this._dataSource = null;
            this.list_choose.array = null;
            this.list_maxstar.array = null;
            this.list_nextstar.array = null;
            this.list_nowstar.array = null;
            this.starupRp.onDispose();
            this.btn_tip.off(Laya.Event.CLICK, this, this.onClickTip);
        };
        godTabStarupView.prototype.init = function () {
            if (!this.dataSource || !this._needInit)
                return;
            var godVo = this.dataSource;
            var canstar = godVo.isStarupGod();
            this.lab_nostar.visible = !canstar;
            if (!canstar) {
                //无法升星英雄
                this.box_manxing.visible = this.box_shengxing.visible = this.list_choose.visible = false;
                this.imgDi.y = 263;
                return;
            }
            // 红点
            this.starupRp.onDispose();
            if (godVo.isInLinuep(iface.tb_prop.lineupTypeKey.attack)) {
                this.starupRp.setRedPointName("god_starup_" + godVo.uuid);
            }
            var nowtab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel);
            var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel + 1);
            var nowlv = godVo.isMoreThanSix() ? godVo.getStar() - 5 : godVo.getStar();
            var ismaxlev = godVo.tab_god.star[1] == godVo.starLevel;
            this.box_manxing.visible = ismaxlev;
            this.list_choose.visible = this.box_shengxing.visible = !ismaxlev;
            this.imgDi.y = ismaxlev ? 263 : 213;
            if (!ismaxlev) {
                if (!evotab) {
                    return;
                }
                this.box_shuxing.visible = godVo.starLevel >= 5;
                this.box_lvup.visible = godVo.starLevel >= 6;
                this.list_afterdegree.visible = this.list_predegree.visible = !this.box_lvup.visible;
                if (this.box_shuxing.visible) {
                    this.box_awaken.y = 36;
                    this.list_predegree.y = this.list_afterdegree.y = 72;
                }
                else {
                    this.box_awaken.y = 16;
                    this.list_predegree.y = this.list_afterdegree.y = 52;
                }
                //设置星星
                var nextlv = (nowlv + 1) >= 6 ? (nowlv + 1) - 5 : (nowlv + 1);
                this.list_nowstar.repeatX = godVo.starLevel;
                this.list_nextstar.repeatX = godVo.starLevel + 1;
                this.list_nowstar.spaceX = this.list_nextstar.spaceX = 5;
                this.starUp();
                this.setStarData(nowlv, godVo.starLevel, this.list_nowstar);
                this.setStarData(nextlv, godVo.starLevel + 1, this.list_nextstar);
                var cur = tb.TB_awaken_conditions.getTbById(godVo.starLevel);
                var next = tb.TB_awaken_conditions.getTbById(godVo.starLevel + 1);
                this.lab_nowattr.text = nowtab.multiple_show + "%";
                this.lab_nextattr.text = evotab.multiple_show + "%";
                this.lbNowAwaken.text = cur.awake_section_max + "";
                this.lbNextAwaken.text = next ? next.awake_section_max + "" : "0";
                if (this.box_lvup.visible) {
                    this.lab_nowmaxlv.text = String(nowtab.level);
                    this.lab_nextmaxlv.text = String(evotab.level);
                }
                else {
                    var degreeNum = godVo.starLevel < 6 ? godVo.starLevel : 6;
                    this.setDegreeData(degreeNum, this.list_predegree);
                    this.setDegreeData(degreeNum + 1, this.list_afterdegree);
                    this.list_predegree.repeatX = degreeNum;
                    this.list_afterdegree.repeatX = degreeNum + 1;
                }
            }
            else {
                this.list_maxstar.repeatX = godVo.starLevel;
                this.lab_maxlevel.text = String(nowtab.level);
                this.lbAwakenLimit.text = tb.TB_awaken_conditions.getTbById(godVo.starLevel).awake_section_max + "";
                this.lab_maxattr.text = nowtab.multiple_show + "%";
                this.setStarData(nowlv, godVo.starLevel, this.list_maxstar);
                this.list_maxstar.width = 30 * nowlv + this.list_maxstar.spaceX * (nowlv - 1);
            }
            this.btn_tip.on(Laya.Event.CLICK, this, this.onClickTip);
        };
        /**
         * 升星选择格子数据
         */
        godTabStarupView.prototype.starUp = function () {
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var ID = game.GodUtils.getGodStarId(godVo.starLevel, godVo.templateId);
            var startab = tb.TB_god_star.get_TB_god_starById(ID);
            if (!startab)
                return;
            var costtab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel);
            var godMaterial = startab.getGodMaterialList().map(function (vo) {
                return new game.GodMaterialVo(vo, godVo);
            });
            this.list_choose.array = godMaterial;
            Laya.timer.callLater(this, this.refreshChooseList);
            this.list_choose.width = (100 * godMaterial.length) + (godMaterial.length - 1) * this.list_choose.spaceX;
            if (godVo.starLevel < tb.TB_god_set.get_TB_god_set().star_evolution) {
                this.costContainer.visible = false;
            }
            else {
                var hasNum = App.hero.getBagItemNum(costtab.cost[0][0]);
                var isCan = hasNum >= costtab.cost[0][1];
                var color = isCan ? ColorConst.normalFont : ColorConst.RED;
                this.costContainer.visible = this.imgCost.visible = true;
                this.lab_cost.text = "/" + costtab.cost[0][1];
                this.lbhas.text = "" + hasNum;
                this.lbhas.color = color;
                this.lbhas.event(Laya.Event.RESIZE);
                this.boxCost.refresh();
            }
            this.btn_starup.centerX = this.costContainer.visible ? 160 : 0;
        };
        godTabStarupView.prototype.onChooseSelect = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var item = this.list_choose.getCell(index);
                var info = item.dataSource;
                if (info) {
                    var ary = [];
                    var godList = this.list_choose.array;
                    for (var _i = 0, godList_1 = godList; _i < godList_1.length; _i++) {
                        var vo = godList_1[_i];
                        if (vo != info) {
                            ary.push.apply(ary, vo.choose);
                        }
                    }
                    var listdata = game.GodUtils.filterGods(info.tbVo, info.curGod, ary);
                    // info.tbVo.count
                    if (listdata.length > 0) {
                        var obj = { allList: listdata, curMaterail: info, openType: ChooseOpenType.starUp };
                        UIMgr.showUI(UIConst.God_ChooseGodView, obj);
                    }
                    else {
                        showToast(LanMgr.getLan("", 10368));
                        UIUtil.showJumpPanle2(1);
                    }
                }
            }
        };
        /** 刷新神灵材料列表 */
        godTabStarupView.prototype.refreshChooseList = function () {
            for (var _i = 0, _a = this.list_choose.cells; _i < _a.length; _i++) {
                var item = _a[_i];
                item.refreshData(this.list_choose.array);
            }
        };
        godTabStarupView.prototype.onStarUp = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.GodEvent(game.GodEvent.CLICK_STAR_UP), [this.dataSource, this.list_choose.array]);
        };
        godTabStarupView.prototype.onClickTip = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(40001));
        };
        /**
         * 星星数据
         * @param star
         * @param list
         */
        godTabStarupView.prototype.setStarData = function (realStar, starNum, list) {
            var tempStararry = new Array;
            for (var i = 0; i < realStar; i++) {
                tempStararry[i] = starNum >= 6 ? true : false;
            }
            list.array = tempStararry;
        };
        /**
         * 阶级数据
         * @param realDegree
         * @param list
         */
        godTabStarupView.prototype.setDegreeData = function (realDegree, list) {
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var tempStararry = new Array;
            for (var i = 0; i < realDegree; i++) {
                tempStararry.push(godVo.degree);
            }
            list.array = tempStararry;
        };
        /**
         * 渲染星星
         * @param cell
         * @param index
         */
        godTabStarupView.prototype.onXingjiRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
                cell.width = 29;
                cell.height = 31;
            }
            else
                cell.skin = SkinUtil.xingxing;
        };
        /**
         * 渲染阶级
         * @param itemRender
         * @param index
         */
        godTabStarupView.prototype.onDegreeRender = function (itemRender, index) {
            itemRender.gray = itemRender.dataSource - 1 < index;
        };
        return godTabStarupView;
    }(ui.god.tab.TabStarupUI));
    game.godTabStarupView = godTabStarupView;
})(game || (game = {}));
