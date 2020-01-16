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
    var TreasureStrengthView = /** @class */ (function (_super) {
        __extends(TreasureStrengthView, _super);
        function TreasureStrengthView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        TreasureStrengthView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._chooseList = [];
            this._curExp = 0;
            this.itemList.selectEnable = false;
            this.itemList.mouseHandler = new Handler(this, this.onTreasureClick);
            this.itemList.renderHandler = new Handler(this, this.onTrasureRender);
            this.btnQuick.on(Laya.Event.CLICK, this, this.onQuick);
            this.btnRule.on(Laya.Event.CLICK, this, this.onRule);
            this.btnStrength.on(Laya.Event.CLICK, this, this.onStrength);
        };
        TreasureStrengthView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TreasureStrengthView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TreasureStrengthView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this._chooseList.length = 0;
            this._curExp = 0;
            Laya.timer.clearAll(this);
        };
        TreasureStrengthView.prototype.initView = function () {
            var treasureVo = this.dataSource;
            var list = game.TreasureModel.getInstance().getStrengthTreasureList([treasureVo.uuid]);
            this.itemList.array = list;
            this.imgEmpty.visible = list.length == 0;
            var isMaxLv = treasureVo.isTopStrengthLv();
            this.nextBox.visible = this.imgTopArrow.visible = this.btnQuick.visible = this.btnStrength.visible = this.pgBar.visible = !isMaxLv;
            this.imgAttrArrow.visible = this.nextAttrList.visible = !isMaxLv;
            this.maxLvBox.visible = isMaxLv;
            var curVo = game.TreasureUtil.createTreasureVo("", treasureVo);
            curVo.show = true;
            curVo.num = 0;
            this.curItem.dataSource = curVo;
            var curAttrs = game.TreasureUtil.getTbAttrStrAry(curVo.getTbStrength());
            this.curAttrList.array = curAttrs;
            this.curAttrList.height = 24 * curAttrs.length + (curAttrs.length - 1) * this.curAttrList.spaceY;
            if (isMaxLv) {
                this.curBox.x = 268;
                this.curAttrList.x = 210;
                // 设置高度
            }
            else {
                this.curBox.x = 118;
                this.curAttrList.x = 70;
                var nextVo = game.TreasureUtil.createTreasureVo("", curVo);
                nextVo.show = true;
                nextVo.num = 0;
                nextVo.strengthLv += 1;
                this.nextItem.dataSource = nextVo;
                var nextAttrs = game.TreasureUtil.getTbAttrStrAry(nextVo.getTbStrength()).map(function (ary) {
                    // 添加值颜色
                    ary[2] = ColorConst.TASK_GREEN;
                    return ary;
                });
                this.nextAttrList.array = nextAttrs;
                this.nextAttrList.height = 24 * nextAttrs.length + (nextAttrs.length - 1) * this.nextAttrList.spaceY;
            }
            this.updateProgress();
        };
        /** 强化后不会取消圣物的选择，并且需要刷新圣物强化石数量以及下一级信息 */
        TreasureStrengthView.prototype.updateView = function () {
            var treasureVo = this.dataSource;
            if (!treasureVo)
                return;
            // 剩余的圣物
            var list = game.TreasureModel.getInstance().getStrengthTreasureList([treasureVo.uuid]);
            var bagIds = [];
            var bagV0 = [];
            var treasureIds = [];
            for (var i = 0; i < list.length; i++) {
                var vo = list[i];
                if (vo instanceof TreasureItemVo) {
                    treasureIds.push(vo.uuid);
                }
                else if (vo instanceof ItemVo) {
                    bagIds.push(vo.id);
                    bagV0.push(vo);
                }
            }
            // 更新选中的圣物
            for (var i = this._chooseList.length - 1; i >= 0; i--) {
                var vo = this._chooseList[i];
                if (vo instanceof TreasureItemVo && treasureIds.indexOf(vo.uuid) == -1) {
                    this._chooseList.splice(i, 1);
                }
                else if (vo instanceof ItemVo) {
                    var idx = bagIds.indexOf(vo.id);
                    if (idx == -1) {
                        this._chooseList.splice(i, 1);
                    }
                    else {
                        this._chooseList[i] = bagV0[idx];
                    }
                }
            }
            this.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                this.ani_succ.play(0, false);
                this.ani_succ.visible = true;
            }), ResConst.atlas_strength_effect);
            this.ani_succ_r.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                this.ani_succ_r.play(0, false);
                this.ani_succ_r.visible = true;
            }), ResConst.atlas_strength_effect);
            this.initView();
        };
        /** 更新经验条 */
        TreasureStrengthView.prototype.updateProgress = function () {
            var treasureVo = this.dataSource;
            var tbStrength = treasureVo ? treasureVo.getTbStrength() : null;
            if (!treasureVo || !tbStrength)
                return;
            var exp = 0;
            for (var _i = 0, _a = this._chooseList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo instanceof TreasureItemVo) {
                    exp += vo.getTbStrength().return_exp * vo.num + tb.TB_treasure_set.getSet().getQualityExp(vo.quality) * vo.num;
                }
                else if (vo instanceof ItemVo) {
                    exp += (vo.count * tb.TB_treasure_set.getSet().getTreasureExp(vo.id));
                }
            }
            this._curExp = exp;
            this.pgBar.value = exp / tbStrength.exp;
            this.lbValue.text = exp + "/" + tbStrength.exp;
        };
        /** 选择圣物 */
        TreasureStrengthView.prototype.onTreasureClick = function (evt, index) {
            if (index == -1)
                return;
            if (evt.type == Laya.Event.CLICK) {
                var uiRender = evt.currentTarget;
                var treasureVo = uiRender.dataSource;
                var listIdx = this.getExistChooseIdx(treasureVo);
                // 是否已选中
                var isSelected = listIdx != -1;
                if (isSelected) {
                    this._chooseList.splice(listIdx, 1);
                    uiRender.imgGouxuan.visible = false;
                }
                else {
                    this._chooseList.push(treasureVo);
                    uiRender.imgGouxuan.visible = true;
                }
                this.updateProgress();
                dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SELECT_STRENGTH_TREASURE));
            }
        };
        TreasureStrengthView.prototype.onTrasureRender = function (uiRender, index) {
            var vo = uiRender.dataSource;
            if (vo) {
                var isSelected = this.isExistChoose(uiRender.dataSource);
                uiRender.imgGouxuan.visible = isSelected;
            }
        };
        /** 快速选择前10个圣物加上当前选中 */
        TreasureStrengthView.prototype.onQuick = function () {
            var len = this.itemList.cells.length;
            for (var i = 0; i < len; i++) {
                if (i < 10) {
                    var uiRender = this.itemList.getCell(i);
                    if (uiRender && uiRender.dataSource) {
                        if (!this.isExistChoose(uiRender.dataSource)) {
                            this._chooseList.push(uiRender.dataSource);
                        }
                        uiRender.imgGouxuan.visible = true;
                    }
                }
            }
            this.updateProgress();
        };
        /** 是否存在选中列表 */
        TreasureStrengthView.prototype.getExistChooseIdx = function (target) {
            if (!target)
                return -1;
            return this._chooseList.findIndex(function (vo) {
                return (vo instanceof TreasureItemVo && target instanceof TreasureItemVo && vo.uuid == target.uuid) || (vo instanceof ItemVo && target instanceof ItemVo && vo.id == target.id);
            });
        };
        /** 是否存在选中列表 */
        TreasureStrengthView.prototype.isExistChoose = function (target) {
            return this.getExistChooseIdx(target) != -1;
        };
        TreasureStrengthView.prototype.onRule = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20019));
        };
        /** 强化 */
        TreasureStrengthView.prototype.onStrength = function () {
            var treasureVo = this.dataSource;
            if (!treasureVo)
                return;
            var needExp = treasureVo.getTbStrength() ? treasureVo.getTbStrength().exp : 0;
            if (this._curExp < needExp) {
                showToast(LanMgr.getLan("", 10371));
                return;
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.TREASURE_OPERATION), [game.TreasureOperation.strength, [treasureVo, this._chooseList]]);
        };
        return TreasureStrengthView;
    }(ui.god.treasure.TreasureStrengthUI));
    game.TreasureStrengthView = TreasureStrengthView;
})(game || (game = {}));
