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
    var TreasureStarupView = /** @class */ (function (_super) {
        __extends(TreasureStarupView, _super);
        function TreasureStarupView() {
            var _this = _super.call(this) || this;
            _this._curStatLv = -1;
            return _this;
        }
        TreasureStarupView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.TreasureStarupView, closeOnButton: true, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12382) };
            this.btnStarup.on(Laya.Event.CLICK, this, this.onStarup);
            this.btnYulan.on(Laya.Event.CLICK, this, this.onYulan);
            this.materialList.mouseHandler = new Handler(this, this.onChooseSelect);
        };
        TreasureStarupView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this._curStatLv = -1;
            this.initView();
        };
        TreasureStarupView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.materialList.array = null;
            this.attrList.array = null;
        };
        TreasureStarupView.prototype.initView = function () {
            var treasureVo = this.dataSource;
            var isMaxLv = treasureVo.isTopStarLv();
            this.nextBox.visible = this.costBox.visible = this.btnStarup.visible = this.imgArrow.visible = !isMaxLv;
            this.maxLvBox.visible = isMaxLv;
            var curVo = game.TreasureUtil.createTreasureVo("", treasureVo);
            curVo.show = true;
            curVo.num = 0;
            this.curItem.dataSource = curVo;
            if (isMaxLv) {
                this.curBox.x = 268;
                var ary = this.getAttrList(curVo, null);
                this.attrList.array = ary;
                this.attrList.width = 130;
                this.attrList.height = ary.length * 26 + (ary.length - 1) * this.attrList.length;
            }
            else {
                this.curBox.x = 118;
                var nextVo = game.TreasureUtil.createTreasureVo("", curVo);
                nextVo.show = true;
                nextVo.num = 0;
                nextVo.starLv += 1;
                this.nextItem.dataSource = nextVo;
                var ary = this.getAttrList(curVo, nextVo);
                this.attrList.array = ary;
                this.attrList.width = 250;
                this.attrList.height = ary.length * 26 + (ary.length - 1) * this.attrList.length;
                var tbStar = treasureVo.getTbStarup();
                var materialList = tbStar.getMaterialList().map(function (vo) {
                    return new game.TreasureMaterialVo(vo, treasureVo);
                });
                this.materialList.array = materialList;
                Laya.timer.callLater(this, this.refreshChooseList);
                this.materialList.width = (100 * materialList.length) + (materialList.length - 1) * this.materialList.spaceX;
            }
            if (this._curStatLv != treasureVo.starLv) {
                if (this._curStatLv != -1) {
                    this.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                        this.ani_succ.play(0, false);
                        this.ani_succ.visible = true;
                    }), ResConst.atlas_strength_effect);
                    this.ani_succ_r.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                        this.ani_succ_r.play(0, false);
                        this.ani_succ_r.visible = true;
                    }), ResConst.atlas_strength_effect);
                }
                this._curStatLv = treasureVo.starLv;
            }
        };
        TreasureStarupView.prototype.onChooseSelect = function (event, index) {
            var treasureVo = this.dataSource;
            if (event.type == Laya.Event.CLICK) {
                var item = this.materialList.getCell(index);
                var info = item.dataSource;
                if (info) {
                    var ary = [];
                    var itemList = this.materialList.array;
                    for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
                        var vo = itemList_1[_i];
                        if (vo != info) {
                            ary.push.apply(ary, vo.choose);
                        }
                    }
                    var listdata = game.TreasureUtil.filterTreasures(info.tbVo, treasureVo, ary);
                    if (listdata.length > 0) {
                        var obj = { allList: listdata, curMaterail: info };
                        UIMgr.showUI(UIConst.ChooseTreasureMaterialView, obj);
                    }
                    else {
                        showToast(info.getWarn());
                        // UIUtil.showJumpPanle2(2);
                    }
                }
            }
        };
        /** 获取属性列表 */
        TreasureStarupView.prototype.getAttrList = function (curVo, nextVo) {
            var curList = game.TreasureUtil.getTbAttrStrAry(curVo.getTbStarup());
            var nextList = nextVo ? game.TreasureUtil.getTbAttrStrAry(nextVo.getTbStarup()) : [];
            var ary = [];
            if (curList.length > 0) {
                for (var i = 0; i < curList.length; i++) {
                    var str1 = curList[i][0] + " " + curList[i][1];
                    var str2 = nextList[i] ? "(" + nextList[i][1] + ")" : "";
                    ary.push([str1, str2]);
                }
            }
            else {
                if (nextList.length > 0) {
                    for (var i = 0; i < nextList.length; i++) {
                        var str1 = nextList[i][0] + " +0";
                        var str2 = nextList[i] ? "(" + nextList[i][1] + ")" : "";
                        ary.push([str1, str2]);
                    }
                }
            }
            return ary;
        };
        /** 刷新材料列表 */
        TreasureStarupView.prototype.refreshChooseList = function () {
            for (var _i = 0, _a = this.materialList.cells; _i < _a.length; _i++) {
                var item = _a[_i];
                item.refreshData(this.materialList.array);
            }
        };
        TreasureStarupView.prototype.onStarup = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.TREASURE_OPERATION), [game.TreasureOperation.starup, [this.dataSource, this.materialList.array]]);
        };
        TreasureStarupView.prototype.onYulan = function () {
            if (!this.dataSource)
                return;
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.SHOW_STAR_ATTR_PREVIEW), this.dataSource);
        };
        return TreasureStarupView;
    }(ui.god.treasure.TreasureStarupUI));
    game.TreasureStarupView = TreasureStarupView;
})(game || (game = {}));
