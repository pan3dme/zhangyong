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
    var UpRoadView = /** @class */ (function (_super) {
        __extends(UpRoadView, _super);
        function UpRoadView() {
            var _this = _super.call(this) || this;
            _this._maxURLv = 0;
            _this._curURLv = 0;
            _this._curURIdx = -1;
            _this._modelpos = {
                1: [0, 520, 180, 2.25, 0],
                2: [125, 565, 180, 2, 45],
                3: [150, 600, 180, 2, 45],
                4: [125, 560, 180, 1.8, 45],
                6: [125, 560, 180, 1.62, 45],
            };
            _this.isModelClose = true;
            _this.uiScene = new Base2dSceneLayer();
            _this.addChildAt(_this.uiScene, 8);
            return _this;
        }
        UpRoadView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        UpRoadView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        UpRoadView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        UpRoadView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            tl3d.ModuleEventManager.removeEvent(game.UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
            tl3d.ModuleEventManager.removeEvent(game.UpRoadEvent.UR_COUNT_CHANGE, this.onConditionChange, this);
            tl3d.ModuleEventManager.removeEvent(game.UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            if (this.list_UR.selectHandler) {
                this.list_UR.selectHandler.recover();
                this.list_UR.selectHandler = null;
            }
            this.uiScene.onExit();
            this.stopTaskEff();
            this.list_UR.array = null;
            this.list_URReward.array = null;
            this.list_URTask.array = null;
            this.ui_showitem.dataSource = null;
            this._allAdvanceRoadTs = [];
            this._curAdvanceRoadT = null;
            this._curURIdx = -1;
            this._lastmodel = -1;
        };
        UpRoadView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this);
        };
        UpRoadView.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_COUNT_CHANGE, this.onConditionChange, this);
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
            this.list_UR.selectHandler = Handler.create(this, this.onURSelect, null, false);
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this._allAdvanceRoadTs = this.getAllAdvanceRoadT();
            this._maxURLv = this._allAdvanceRoadTs.length;
            this._curURLv = App.hero.tasks.advanceLevel;
            var idx = this.dataSource ? this.dataSource : this._curURLv;
            this.updateURList();
            this.onURSelect(idx, true);
            this.list_UR.scrollTo(idx - 1);
        };
        //获取模板
        UpRoadView.prototype.getAllAdvanceRoadT = function () {
            var arr = [];
            var data = TableData.getInstance().getTableByName(TableData.tb_advance_road).data;
            if (data) {
                for (var key in data) {
                    arr.push(data[key]);
                }
            }
            return arr;
        };
        //阶数变化
        UpRoadView.prototype.onUpRoadChange = function () {
            this._curURLv = App.hero.tasks.advanceLevel;
            this.list_UR.refresh();
            this.onURSelect(this._curURLv, true);
            this.list_UR.scrollTo(this._curURLv);
        };
        //任务变化
        UpRoadView.prototype.onConditionChange = function () {
            this.list_URTask.refresh();
        };
        UpRoadView.prototype.updateURList = function () {
            this.list_UR.array = this._allAdvanceRoadTs;
        };
        UpRoadView.prototype.onURSelect = function (index, force) {
            if (force === void 0) { force = false; }
            if (index >= this._maxURLv)
                index = this._maxURLv - 1;
            if (index == this._curURIdx && !force)
                return;
            this._curURIdx = index;
            this._curAdvanceRoadT = this._allAdvanceRoadTs[index];
            this.list_UR.selectedIndex = index;
            this.showUR();
        };
        UpRoadView.prototype.showUR = function () {
            this.updateURReward();
            // this.updateActiveBtn();
            this.updateShow();
            this.updateURTaskList();
            Laya.timer.callLater(this, this.playTaskEff);
        };
        //当前奖励
        UpRoadView.prototype.updateURReward = function () {
            if (this._curAdvanceRoadT) {
                this.list_URReward.array = ary2prop(this._curAdvanceRoadT.reward);
                this.list_URReward.repeatX = this.list_URReward.array.length;
                this.list_URReward.x = (this.width - this.list_URReward.width) / 2;
            }
        };
        UpRoadView.prototype.updateShow = function () {
            this.lab_propname.visible = this.lab_artifaceinfo.visible = this.lab_artifacename.visible = false;
            if (this._curAdvanceRoadT) {
                var data = this._curAdvanceRoadT.show.split(',');
                if (data.length > 1) {
                    var id = parseInt(data[1]);
                    if (data[0] == "1") {
                        //模型
                        var tabArtiface = tb.TB_artifact.get_TB_artifactById(id);
                        this.uiScene.onShow();
                        this.refreshModel(tabArtiface.model);
                        this.box_showitem.visible = false;
                        this.ui_showitem.dataSource = null;
                        this.lab_artifaceinfo.visible = this.lab_artifacename.visible = true;
                        this.lab_artifacename.text = tabArtiface.name;
                        this.lab_artifaceinfo.text = tabArtiface.desc;
                    }
                    else {
                        this.uiScene.onExit();
                        this._lastmodel = -1;
                        this.box_showitem.visible = true;
                        var item = tb.TB_item.get_TB_itemById(id);
                        this.ui_showitem.dataSource = new ItemVo(id, 1);
                        if (item.type == iface.tb_prop.itemTypeKey.treasure) {
                            this.lab_propname.visible = true;
                            this.lab_propname.text = "" + LanMgr.qualityColor[item.quality] + LanMgr.getLan("", 12113) + "-" + item.name;
                        }
                    }
                }
            }
        };
        UpRoadView.prototype.refreshModel = function (modelid) {
            //因模型和特效的关系，切换模型时，必须重新new 一个scenechar
            if (this._lastmodel == modelid) {
                return;
            }
            var locations = this._modelpos[modelid] ? this._modelpos[modelid] : [0, 520, 180, 2.25, 0];
            this.uiScene.addModelChar(modelid + "", 360 + Number(locations[0]), Number(locations[1]) + 120, Number(locations[2]), Number(locations[3]) * 0.8, Number(locations[4]));
            this._lastmodel = modelid;
        };
        //更新任务
        UpRoadView.prototype.updateURTaskList = function () {
            if (this._curAdvanceRoadT && this._curAdvanceRoadT.ID <= this._curURLv + 1) {
                this.list_URTask.array = this._curAdvanceRoadT.getCondition();
                this.box_lock.visible = false;
                this.list_URTask.visible = true;
            }
            else {
                this.list_URTask.array = null;
                this.list_URTask.visible = false;
                this.box_lock.visible = true;
            }
        };
        //
        UpRoadView.prototype.playTaskEff = function () {
            this.stopTaskEff();
            if (this.list_URTask.cells) {
                var wc = (Laya.stage.width - this.width) / 2;
                for (var i = 0; i < this.list_URTask.cells.length; i++) {
                    var cell = this.list_URTask.cells[i];
                    var targetpos = 0;
                    cell.x = -wc - this.width;
                    var delatTime = 0;
                    if (i % 2 == 0) {
                        delatTime = 100;
                    }
                    else {
                        targetpos = cell.width + this.list_URTask.spaceX;
                        this.PlayTaskTween(cell, targetpos);
                    }
                    delatTime += Math.floor(i / 2) * 50;
                    Laya.timer.once(delatTime, cell, this.PlayTaskTween, [cell, targetpos]);
                }
            }
        };
        UpRoadView.prototype.PlayTaskTween = function (cell, targetpos) {
            Laya.Tween.to(cell, { "x": targetpos }, 350, Laya.Ease.sineInOut);
        };
        UpRoadView.prototype.stopTaskEff = function () {
            if (this.list_URTask.cells) {
                for (var i = 0; i < this.list_URTask.cells.length; i++) {
                    var cell = this.list_URTask.cells[i];
                    Laya.Tween.clearAll(cell);
                    Laya.timer.clear(cell, this.PlayTaskTween);
                }
            }
        };
        return UpRoadView;
    }(ui.uproad.UpRoadViewUI));
    game.UpRoadView = UpRoadView;
})(game || (game = {}));
