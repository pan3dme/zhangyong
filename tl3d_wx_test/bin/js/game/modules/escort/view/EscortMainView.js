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
    /** 商队护送主界面 */
    var EscortMainView = /** @class */ (function (_super) {
        __extends(EscortMainView, _super);
        function EscortMainView() {
            var _this = _super.call(this) || this;
            _this._ringNum = 0;
            _this._time = 50;
            _this._inAnim = false;
            _this.isModelClose = true;
            _this.group = UIConst.hud_group;
            return _this;
        }
        EscortMainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.EscortModel.getInstance();
            this.itemPanel.hScrollBarSkin = "";
            this.bgImg.skin = SkinUtil.getSysMapSkin(ModuleConst.CARAVAN_ESCORT);
        };
        EscortMainView.prototype.show = function (closeOther, showEffect) {
            var _this = this;
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
            this._model.requestCaravanList().then(function () {
                _this.startRun();
            });
        };
        EscortMainView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.timer.clearAll(this);
            this.list_quality.array = null;
            this._model.caravanList.length = 0;
            for (var _i = 0, _a = this.bgImg._childs; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item instanceof game.CaravanIR) {
                    item.onRemove();
                }
            }
            this.btnEscort.off(Laya.Event.CLICK, this, this.onEscort);
            this.lbFinish.off(Laya.Event.CLICK, this, this.onFinish);
            this.btn_orange.off(Laya.Event.CLICK, this, this.onOnekey);
            this.btn_refresh.off(Laya.Event.CLICK, this, this.onRefresh);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        EscortMainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        EscortMainView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_record, redpointName: "escort_record", callback: this.onRecord.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onReward.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            this.btnEscort.on(Laya.Event.CLICK, this, this.onEscort);
            this.lbFinish.on(Laya.Event.CLICK, this, this.onFinish);
            this.btn_orange.on(Laya.Event.CLICK, this, this.onOnekey);
            this.btn_refresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.updateCount();
            this.refreshInterval();
            this.showReward();
        };
        /** 请求商队列表 */
        EscortMainView.prototype.requestList = function () {
            var _this = this;
            var model = this._model;
            model.requestCaravanList().then(function () {
                if (model.caravanList.length > 0) {
                    _this.startRun();
                }
                else {
                    Laya.timer.once(20000, _this, _this.requestList);
                }
            });
        };
        /** 开始动画 */
        EscortMainView.prototype.startRun = function () {
            var list = this._model.getCaravanList();
            if (list.length > 0) {
                this.intetvalAnim(list);
            }
            else {
                Laya.timer.once(20000, this, this.requestList);
            }
        };
        /** 间隔运动 */
        EscortMainView.prototype.intetvalAnim = function (list) {
            if (list.length > 0) {
                var info = list.shift();
                this.addCaravan(info);
                Laya.timer.once(800, this, this.intetvalAnim, [list]);
            }
            else {
                // 8秒之后差不多走完开始下一批
                Laya.timer.once(8000, this, this.startRun);
            }
        };
        /** 添加商队 */
        EscortMainView.prototype.addCaravan = function (info) {
            var index = this.bgImg._childs.findIndex(function (item) {
                return item instanceof game.CaravanIR && item.dataSource && item.dataSource.svo.playerId == info.svo.playerId;
            });
            if (index == -1) {
                var item = this._model.getItemRender();
                var miny = this.height - 845;
                var maxy = this.box_husong.visible ? this.box_husong.y : this.box_husonging.y;
                item.setStartPositon(maxy, miny);
                item.dataSource = info;
                this.bgImg.addChild(item);
            }
        };
        /** 显示护送奖励界面 */
        EscortMainView.prototype.showReward = function () {
            var model = this._model;
            if (model.endTime <= 0) {
                Laya.timer.clear(this, this.showReward);
                return;
            }
            if (model.endTime <= App.serverTimeSecond) {
                Laya.timer.clear(this, this.showReward);
                UIMgr.showUI(UIConst.EscortRewardView, model.escortId);
                // 移除自己
                var selfItem = this.bgImg._childs.find(function (item) {
                    return item instanceof game.CaravanIR && item.dataSource && item.dataSource.svo.playerId == App.hero.playerId;
                });
                if (selfItem) {
                    selfItem.onRemove();
                }
            }
            else {
                Laya.timer.loop(1000, this, this.showReward);
            }
        };
        /** 更新数量 */
        EscortMainView.prototype.updateCount = function () {
            var model = this._model;
            this.lbEscortCnt.text = LanMgr.getLan('', 12432, model.getEscortCount());
            this.lbRobCnt.text = LanMgr.getLan('', 12433, model.getRobCount());
        };
        /** 更新护送剩余时间 */
        EscortMainView.prototype.refreshInterval = function () {
            var model = this._model;
            if (model.endTime > App.serverTimeSecond) {
                this.box_husonging.visible = true;
                this.box_husong.visible = false;
                Laya.timer.loop(1000, this, this.updateTime);
                this.updateTime();
                this.list_quality.array = null;
                Laya.timer.clear(this, this.loopSelecteGoods);
            }
            else {
                this.box_husonging.visible = false;
                this.box_husong.visible = true;
                this._inAnim = false;
                Laya.timer.clear(this, this.updateTime);
                this.list_quality.array = model.getGoodsList();
                this.updateCost();
            }
        };
        //护送中---------------------------------------------------------------
        EscortMainView.prototype.updateTime = function () {
            var time = this._model.endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = GameUtil.toCountdown(time, "mm:ss");
                this.pro_husong.value = time / tb.TB_escort_set.getSet().escort_time;
            }
            else {
                this.refreshInterval();
            }
        };
        //还未护送---------------------------------------------------------------
        /** 更新消耗 */
        EscortMainView.prototype.updateCost = function () {
            var model = this._model;
            if (!this.box_husong.visible)
                return;
            var cost1 = model.getRefreshCost();
            this.img_refresh_cost.skin = SkinUtil.getCostSkin(cost1[0]);
            var cost2 = model.getOneKeyCost();
            this.img_orange_cost.skin = SkinUtil.getCostSkin(cost2[0]);
            //判断总数
            if (cost1[0] == iface.tb_prop.resTypeKey.diamond) {
                this.lab_refresh_cost.text = cost1[1];
            }
            else {
                this.lab_refresh_cost.text = App.hero.getBagItemNum(cost1[0]) + "/" + cost1[1];
            }
            if (cost2[0] == iface.tb_prop.resTypeKey.diamond) {
                this.lab_orange_cost.text = cost2[1];
            }
            else {
                this.lab_orange_cost.text = App.hero.getBagItemNum(cost2[0]) + "/" + cost2[1];
            }
        };
        EscortMainView.prototype.startAnim = function (escortId) {
            if (!this.box_husong.visible)
                return;
            this._curIdx = this.list_quality.cells.findIndex(function (item) {
                return !item.img_select.visible;
            });
            this._curIdx = this._curIdx < 0 ? 0 : this._curIdx;
            this._toIdx = this.list_quality.cells.findIndex(function (item) {
                return item && item.dataSource && item.dataSource.tbEscort.ID == escortId;
            });
            if (this._toIdx < 0)
                return;
            this._ringNum = 0;
            this._time = 60;
            this._inAnim = true;
            this.startInterval();
        };
        EscortMainView.prototype.startInterval = function () {
            Laya.timer.clear(this, this.loopSelecteGoods);
            Laya.timer.loop(this._time, this, this.loopSelecteGoods);
        };
        EscortMainView.prototype.loopSelecteGoods = function () {
            var lastIdx = this._curIdx;
            this._curIdx++;
            var len = this.list_quality.array.length;
            if (this._curIdx >= len) {
                lastIdx = len - 1;
                this._curIdx = 0;
            }
            // 七圈之后停止
            if (this._ringNum == 4 && this._curIdx == this._toIdx) {
                this._inAnim = false;
                Laya.timer.clear(this, this.loopSelecteGoods);
                dispatchEvt(new game.EscortEvent(game.EscortEvent.ANIMATION_END));
            }
            this.list_quality.getCell(lastIdx).img_select.visible = true;
            this.list_quality.getCell(this._curIdx).img_select.visible = false;
            if (this._curIdx >= len - 1) {
                this._ringNum++;
            }
            if (this._ringNum == 2 && this._curIdx == len - 1) {
                this._time = 60;
                this.startInterval();
                return;
            }
            if (this._ringNum == 3 && this._curIdx == len - 1) {
                this._time = 125;
                this.startInterval();
                return;
            }
        };
        /** 选中获取 */
        EscortMainView.prototype.selectItem = function (escortId) {
            if (!this.box_husong.visible)
                return;
            var curItem = this.list_quality.cells.find(function (item) {
                return !item.img_select.visible;
            });
            if (curItem) {
                curItem.img_select.visible = true;
            }
            var toItem = this.list_quality.cells.find(function (item) {
                return item.dataSource && item.dataSource.tbEscort.ID == escortId;
            });
            if (toItem) {
                toItem.img_select.visible = false;
            }
        };
        /** 刷新品质 */
        EscortMainView.prototype.onRefresh = function () {
            if (this._inAnim) {
                showToast(LanMgr.getLan('', 10170));
                return;
            }
            dispatchEvt(new game.EscortEvent(game.EscortEvent.REFRESH_GOODS));
        };
        /** 一键刷橙 */
        EscortMainView.prototype.onOnekey = function () {
            if (this._inAnim) {
                showToast(LanMgr.getLan('', 10170));
                return;
            }
            dispatchEvt(new game.EscortEvent(game.EscortEvent.ONEKEY_REFRESH_GOODS));
        };
        /** 护送 */
        EscortMainView.prototype.onEscort = function () {
            if (this._inAnim) {
                showToast(LanMgr.getLan('', 10170));
                return;
            }
            dispatchEvt(new game.EscortEvent(game.EscortEvent.ESCORT_GOODS));
        };
        /** 快速完成 */
        EscortMainView.prototype.onFinish = function () {
            var cost = tb.TB_escort_set.getSet().complete_cost;
            var text = LanMgr.getLan('', 10307, cost[1]) + ("<img style='padding:10px 3px 3px 3px;' src='" + SkinUtil.getCostSkin(cost[0]) + "' ></img>") + LanMgr.getLan('', 10308);
            common.AlertBox.showAlert({
                text: text, confirmCb: function () {
                    dispatchEvt(new game.EscortEvent(game.EscortEvent.QUICK_FINISH));
                }, parm: null
            });
        };
        /** 规则 */
        EscortMainView.prototype.onRule = function () {
            dispatchEvt(new game.EscortEvent(game.EscortEvent.SHOW_RULE_VIEW));
        };
        /** 记录 */
        EscortMainView.prototype.onRecord = function () {
            dispatchEvt(new game.EscortEvent(game.EscortEvent.SHOW_RECORD_VIEW));
        };
        /** 奖励 */
        EscortMainView.prototype.onReward = function () {
            UIMgr.showUI(UIConst.EscortView);
        };
        EscortMainView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_LILIAN));
        };
        return EscortMainView;
    }(ui.escort.EscortMainUI));
    game.EscortMainView = EscortMainView;
})(game || (game = {}));
