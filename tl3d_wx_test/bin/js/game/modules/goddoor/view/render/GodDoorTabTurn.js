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
    var GodDoorTabTurn = /** @class */ (function (_super) {
        __extends(GodDoorTabTurn, _super);
        function GodDoorTabTurn() {
            var _this = _super.call(this) || this;
            _this.curRaceIdx = 0;
            _this._hasLeftEff = false;
            _this._hasRightEff = false;
            _this._hasRewardEff = false;
            _this.uiScene = new Base2dSceneLayerExt();
            _this.addChildAt(_this.uiScene, 2);
            return _this;
        }
        GodDoorTabTurn.prototype.init = function () {
            this.onstage = true;
            this.removeMask();
            this.list_god.mouseHandler = Handler.create(this, this.onGodMouse, null, false);
            this.list_god.renderHandler = Handler.create(this, this.onGodRender, null, false);
            this.list_race.selectHandler = Handler.create(this, this.onRaceSelect, null, false);
            this.list_race.renderHandler = Handler.create(this, this.onRaceRender, null, false);
            this.btn_cancel.on(Laya.Event.CLICK, this, this.onCancel);
            this.btn_save.on(Laya.Event.CLICK, this, this.onSave);
            this.btn_zhuanhuan.on(Laya.Event.CLICK, this, this.onTurn);
            this.btn_xiangxi.on(Laya.Event.CLICK, this, this.onDetailed);
            this.curRaceIdx = 0;
            this.list_race.dataSource = [0, 1, 2, 3];
            this.list_race.selectedIndex = 0;
            this.setBtn(true);
            this.selectGod = null;
            game.GodModel.getInstance().showItemsByView = ChooseOpenType.TURN_VIEW;
        };
        GodDoorTabTurn.prototype.close = function () {
            this.onstage = false;
            Laya.timer.clearAll(this);
            if (this.list_god.renderHandler) {
                this.list_god.renderHandler.recover();
                this.list_god.renderHandler = null;
            }
            if (this.list_god.mouseHandler) {
                this.list_god.mouseHandler.recover();
                this.list_god.mouseHandler = null;
            }
            if (this.list_race.renderHandler) {
                this.list_race.renderHandler.recover();
                this.list_race.renderHandler = null;
            }
            if (this.list_race.selectHandler) {
                this.list_race.selectHandler.recover();
                this.list_race.selectHandler = null;
            }
            this.list_race.dataSource = [];
            this.list_god.dataSource = [];
            this.btn_cancel.off(Laya.Event.CLICK, this, this.onCancel);
            this.btn_save.off(Laya.Event.CLICK, this, this.onSave);
            this.btn_zhuanhuan.off(Laya.Event.CLICK, this, this.onTurn);
            this.btn_xiangxi.off(Laya.Event.CLICK, this, this.onDetailed);
            this.removeLeftEff();
            this.removeRightEff();
            this.uiScene.onExit();
            this.mainChar = null;
            this.resultChar = null;
            this.ani1.stop();
            this.removeMask();
            this._godDoorMain = null;
            this.removeRewardEff();
        };
        GodDoorTabTurn.prototype.onRaceRender = function (itemRender, index) {
            var selected = itemRender.img_selected;
            selected.visible = index == this.curRaceIdx;
        };
        GodDoorTabTurn.prototype.onRaceSelect = function (index) {
            if (index == -1)
                return;
            this.curRaceIdx = index;
            var tempAry = game.GodDoorModel.getInstance().getGodList(index);
            this.list_god.dataSource = tempAry;
        };
        GodDoorTabTurn.prototype.onGodRender = function (cell, index) {
            var goditemvo = cell.dataSource;
            cell.img_gouxuan.visible = cell.dataSource.selected = this._selectGod == goditemvo;
        };
        GodDoorTabTurn.prototype.onGodMouse = function (e, $index) {
            var _this = this;
            if (e.type != Laya.Event.CLICK)
                return;
            if ($index == -1 || this._selectGod == this.list_god.dataSource[$index]) {
                //取消
                this.selectGod = null;
                this.list_god.selectedIndex = -1;
            }
            else {
                //选中
                var sgod_1 = this.list_god.array[$index];
                if (!sgod_1.isInLinuep()) {
                    this.selectGod = sgod_1;
                    this.list_god.selectedIndex = $index;
                }
                else {
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan("", 10501), confirmCb: function () {
                            game.GodUtils.downGods(sgod_1).then(function () {
                                _this.list_god.refresh();
                            });
                        }
                    });
                }
            }
        };
        Object.defineProperty(GodDoorTabTurn.prototype, "selectGod", {
            get: function () {
                return this._selectGod;
            },
            set: function ($val) {
                this._selectGod = $val;
                this.showLeftInfo(this._selectGod);
                this.drawCost();
                this.showRightInfo(this.selectGod);
            },
            enumerable: true,
            configurable: true
        });
        GodDoorTabTurn.prototype.drawCost = function () {
            if (this.selectGod) {
                //有消耗
                this.img_cost1.visible = false;
                this.img_cost2.visible = false;
                var tabkey = this.selectGod.tab_god.race_type * 100 + this.selectGod.starLevel * 10 + this.selectGod.tab_god.quality;
                var replacetab = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
                for (var i = 0; i < replacetab.cost.length; i++) {
                    var idx = i + 1;
                    var img = this["img_cost" + idx];
                    img.visible = true;
                    img.skin = SkinUtil.getCostSkin(replacetab.cost[i][0]);
                    this["lab_cost" + idx].text = "x " + Snums(replacetab.cost[i][1]);
                }
                this.img_cost_bg.visible = true;
            }
            else {
                this.img_cost_bg.visible = false;
                this.img_cost1.visible = false;
                this.img_cost2.visible = false;
            }
        };
        GodDoorTabTurn.prototype.onDetailed = function () {
            this.removeMask();
            var tab = tb.TB_god.get_TB_godById(this._resultId);
            var tabevolution = tb.TB_god_evolution.get_TB_god_evolutionById(this.selectGod.starLevel);
            var realDegree = this.selectGod.starLevel <= 5 ? this.selectGod.starLevel : 5;
            var obj = { templateId: tab.ID, starLevel: this.selectGod.starLevel, level: tabevolution.level, skill: tab.skill, degree: realDegree };
            var godData = new GodItemVo(obj);
            godData.tab_god = tab;
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
        };
        GodDoorTabTurn.prototype.onCancel = function () {
            this.setResult();
        };
        GodDoorTabTurn.prototype.onSave = function () {
            dispatchEvt(new game.GodDoorEvent(game.GodDoorEvent.TURN_GOD_OK), this.selectGod);
        };
        GodDoorTabTurn.prototype.refreshResult = function ($targetGod) {
            for (var key in $targetGod) {
                if (this.selectGod.uuid == key) {
                    this.selectGod.templateId = $targetGod[key].templateId;
                    this.selectGod.tab_god = tb.TB_god.get_TB_godById(this.selectGod.templateId);
                    this.showLeftInfo(this.selectGod);
                    this.list_god.refresh();
                }
            }
            this.setResult();
        };
        GodDoorTabTurn.prototype.setResult = function () {
            this.removeMask();
            this.setBtn(true);
            this.drawCost();
            this.showRightInfo(this.selectGod);
        };
        GodDoorTabTurn.prototype.removeMask = function () {
            var view = this.getGodDoorMain();
            if (view) {
                view.removeBoxMask();
            }
        };
        GodDoorTabTurn.prototype.getGodDoorMain = function () {
            if (!this._godDoorMain) {
                this._godDoorMain = UIMgr.getUIByName(UIConst.GodDoorView);
            }
            return this._godDoorMain;
        };
        GodDoorTabTurn.prototype.addMask = function () {
            var view = this.getGodDoorMain();
            if (view) {
                view.addBoxMask(Laya.Handler.create(this, this.onClickMask, null, false));
                view.addBoxMaskUnit(this.btn_cancel);
                view.addBoxMaskUnit(this.btn_save);
                view.addBoxMaskUnit(this.btn_xiangxi);
            }
        };
        GodDoorTabTurn.prototype.onClickMask = function () {
            showToast(LanMgr.getLan("", 10108));
        };
        GodDoorTabTurn.prototype.onTurn = function () {
            if (this._hasRewardEff)
                return;
            if (!this.selectGod) {
                showToast(LanMgr.getLan("", 10109));
                return;
            }
            //发送转换请求
            // sendDispatchEvent(new GodDoorEvent(GodDoorEvent.TURN_GOD_EVENT), this.selectGod);
            this.turnGodEvent(this.selectGod);
        };
        GodDoorTabTurn.prototype.turnGodEvent = function ($data) {
            var _this = this;
            var tabkey = $data.tab_god.race_type * 100 + $data.starLevel * 10 + $data.tab_god.quality;
            var replacetab = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
            var flag = true;
            for (var i = 0; i < replacetab.cost.length; i++) {
                if (replacetab.cost[i][0] == iface.tb_prop.resTypeKey.convertDust) {
                    if (replacetab.cost[i][1] > App.hero.convertDust) {
                        flag = false;
                        showToast(LanMgr.getLan("", 10120));
                        break;
                    }
                }
                else if (replacetab.cost[i][0] == iface.tb_prop.resTypeKey.gold) {
                    if (replacetab.cost[i][1] > App.hero.gold) {
                        flag = false;
                        showToast(LanMgr.getLan("", 10120));
                        break;
                    }
                }
                else {
                    logdebug("新增道具没加判断！");
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var args = {};
                args[Protocol.game_god_doorConvert.args.godId] = $data.uuid;
                PLC.request(Protocol.game_god_doorConvert, args, function ($sdata) {
                    if ($sdata && $sdata.convertTpltId) {
                        if (_this.onstage) {
                            _this.addRewardEff();
                            Laya.timer.once(600, _this, function () {
                                _this.removeRewardEff();
                                _this.turnResult($sdata.convertTpltId);
                            });
                        }
                    }
                });
            }
        };
        GodDoorTabTurn.prototype.turnResult = function ($newId) {
            if (!this.onstage)
                return;
            this._resultId = $newId;
            var god = tb.TB_god.get_TB_godById(this._resultId); //英雄
            this.showRightInfo(this.selectGod, god);
            this.setBtn(false);
            this.addMask();
        };
        GodDoorTabTurn.prototype.setBtn = function (turnbefore) {
            this.img_cost1.visible = this.img_cost2.visible = this.img_cost_bg.visible = turnbefore;
            this.btn_xiangxi.visible = this.btn_cancel.visible = this.btn_save.visible = !turnbefore;
            this.btn_zhuanhuan.visible = turnbefore;
        };
        //显示右边信息
        GodDoorTabTurn.prototype.showRightInfo = function (leftGod, godTemp) {
            if (godTemp === void 0) { godTemp = null; }
            if (leftGod) {
                this.box_new.visible = true;
                this.img_new_flag.skin = SkinUtil.getGodRaceSkin(leftGod.tab_god.race_type);
                this.star_new.setStarNum(leftGod.starLevel);
                this.addRightEff();
                if (godTemp) {
                    this.lab_new_name.text = LanMgr.getLan("Lv.{0} {1}", -1, leftGod.level, godTemp.name);
                    this.resultChar = this.uiScene.addModelChar(String(godTemp.model), 530, 630, 190, 2.2);
                    this.img_wh.visible = false;
                    this.ani1.stop();
                }
                else {
                    this.lab_new_name.text = LanMgr.getLan("Lv.{0} {1}", -1, leftGod.level, "??");
                    if (this.resultChar) {
                        this.uiScene.removeModelChar(this.resultChar);
                    }
                    this.img_wh.visible = true;
                    this.ani1.play();
                }
            }
            else {
                //左边都没有的话，右边肯定也没有
                this.box_new.visible = false;
                this.removeRightEff();
                if (this.resultChar) {
                    this.uiScene.removeModelChar(this.resultChar);
                }
                this.img_wh.visible = false;
                this.ani1.stop();
            }
        };
        //显示左边信息
        GodDoorTabTurn.prototype.showLeftInfo = function (god) {
            if (god === void 0) { god = null; }
            if (god) {
                this.removeLeftEff();
                this.box_old.visible = true;
                this.setMainChar(god);
                this.img_old_flag.skin = SkinUtil.getGodRaceSkin(god.tab_god.race_type);
                this.star_old.setStarNum(this.selectGod.starLevel);
                this.lab_old_name.text = LanMgr.getLan("Lv.{0} {1}", -1, this.selectGod.level, this.selectGod.tab_god.name);
                var tabkey = this.selectGod.tab_god.race_type * 100 + this.selectGod.starLevel * 10 + this.selectGod.tab_god.quality;
                var replacetab = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
                for (var i = 0; i < replacetab.cost.length; i++) {
                    var idx = i + 1;
                    var img = this["img_cost" + idx];
                    img.visible = true;
                    img.skin = SkinUtil.getCostSkin(replacetab.cost[i][0]);
                    this["lab_cost" + idx].text = "x " + Snums(replacetab.cost[i][1]);
                }
                this.img_cost_bg.visible = true;
            }
            else {
                this.addLeftEff();
                this.box_old.visible = false;
                if (this.mainChar) {
                    this.uiScene.removeModelChar(this.mainChar);
                }
            }
        };
        GodDoorTabTurn.prototype.setMainChar = function (god) {
            if (this.mainChar) {
                this.uiScene.removeModelChar(this.mainChar);
            }
            if (god) {
                this.mainChar = this.uiScene.addModelChar(String(god.tab_god.model), 170, 630, 170, 2.2);
            }
        };
        GodDoorTabTurn.prototype.addLeftEff = function () {
            var _this = this;
            if (this._hasLeftEff)
                return;
            this._hasLeftEff = true;
            this.uiScene.addEffect(this, 10000023, new tl3d.Vector3D(85, 0, -450), 2, 10, function ($particle) {
                _this._leftEff = $particle;
                if (!_this._hasLeftEff) {
                    _this.removeLeftEff();
                }
            });
        };
        //移除左边特效
        GodDoorTabTurn.prototype.removeLeftEff = function () {
            this._hasLeftEff = false;
            if (this._leftEff) {
                this.uiScene.removeEffect(this._leftEff);
                this._leftEff = null;
            }
        };
        GodDoorTabTurn.prototype.addRightEff = function () {
            var _this = this;
            if (this._hasRightEff)
                return;
            this._hasRightEff = true;
            this.uiScene.addEffect(this, 10000022, new tl3d.Vector3D(270, 0, -450), 2, 30, function ($particle) {
                _this._rightEff = $particle;
                if (!_this._hasRightEff) {
                    _this.removeRightEff();
                }
            });
        };
        //移除左边特效
        GodDoorTabTurn.prototype.removeRightEff = function () {
            this._hasRightEff = false;
            if (this._rightEff) {
                this.uiScene.removeEffect(this._rightEff);
                this._rightEff = null;
            }
        };
        GodDoorTabTurn.prototype.addRewardEff = function () {
            var _this = this;
            if (this._hasRewardEff)
                return;
            this._hasRewardEff = true;
            this.uiScene.addEffect(this, 10000021, new tl3d.Vector3D(270, 0, -450), 2, 30, function ($particle) {
                _this._rewardEff = $particle;
                if (!_this._hasRewardEff) {
                    _this.removeRewardEff();
                }
            });
        };
        //移除奖励特效
        GodDoorTabTurn.prototype.removeRewardEff = function () {
            this._hasRewardEff = false;
            if (this._rewardEff) {
                this.uiScene.removeEffect(this._rewardEff);
                this._rewardEff = null;
            }
        };
        return GodDoorTabTurn;
    }(ui.goddoor.render.TabTurnUI));
    game.GodDoorTabTurn = GodDoorTabTurn;
})(game || (game = {}));
