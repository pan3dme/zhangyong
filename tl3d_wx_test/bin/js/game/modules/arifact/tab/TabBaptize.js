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
    var TabBaptize = /** @class */ (function (_super) {
        __extends(TabBaptize, _super);
        function TabBaptize() {
            var _this = _super.call(this) || this;
            _this._attriLvSum = 0;
            _this._suodingNum = 0;
            _this._tmpAttriLvSum = 0;
            _this._tbs = tb.TB_baptize.get_TB_baptize();
            _this._curForce = 0;
            _this._nextForce = 0;
            _this._qualityColors = ["46a035", "21a1dc", "c23cf3", "f26b01", "ff1726"];
            _this.uiScenes = new Base2dSceneLayer();
            _this.addChild(_this.uiScenes);
            return _this;
        }
        TabBaptize.prototype.initRaceNum = function () {
            if (this._raceMap)
                return;
            this._raceMap = new game.TabBaptizeMap;
            var list = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
            for (var i = 0; i < list.length; i++) {
                this._raceMap.add(list[i]);
            }
        };
        TabBaptize.prototype.getTotalForce = function (baptizeAttrs) {
            var forceVal = 0;
            for (var key in baptizeAttrs) {
                var data = baptizeAttrs[key];
                forceVal += this.getForce(data[3], data[0], data[2]);
            }
            return Math.floor(forceVal);
        };
        TabBaptize.prototype.getForce = function (race, attrKey, attrVal) {
            var shenli = 0;
            var num = 0;
            var settab = tb.TB_game_set.get_TB_game_setById(1);
            if (attrKey > 4 || attrVal >= 1) {
                //固定值
                num = this._raceMap.getNumByRaceType(race);
            }
            else {
                //百分比
                num = this._raceMap.getValByRaceType(race, attrKey);
            }
            shenli = attrKey > 4 ? (num * attrVal) : Math.floor(num * attrVal);
            // logyhj("数量：", num, "计算值：", attrVal, "神力：", shenli);
            shenli = shenli * Number(settab.attr_para[attrKey - 1][1]);
            return shenli;
        };
        TabBaptize.prototype.show = function (temp) {
            if (!temp)
                return;
            this._clickflag = true;
            this.initRaceNum();
            this._curArtifactTemp = temp;
            this._tbSet = tb.TB_artifact_set.get_TB_artifact_setById();
            this._attriLvSum = this._tmpAttriLvSum = 0;
            this._maxAttriLv = null;
            this.btn_lookup.on(Laya.Event.CLICK, this, this.lookup);
            this.btn_change.on(Laya.Event.CLICK, this, this.change);
            this.btn_pBaptize.on(Laya.Event.CLICK, this, this.baptize, [Artifact.PBAPTIZE]);
            this.btn_gBaptize.on(Laya.Event.CLICK, this, this.baptize, [Artifact.GBAPTIZE]);
            this.list_attri.renderHandler = Handler.create(this, this.onRender, null, false);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.setCostText, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE, this.updateBaptize, this);
            this.updateView();
            //记录下打开面板时，临时属性是否有数据
            this._hasTempAttr = isEmptyObject(App.hero.artifactBaptizeTempAttr);
        };
        TabBaptize.prototype.updateBaptize = function ($evt) {
            var _this = this;
            if ($evt.data == Artifact.GBAPTIZE) {
                this._clickflag = false;
                var point = this.lab_nextforce.localToGlobal(new Laya.Point(0, 0));
                var v3d = this.uiScenes.get3dPos(point.x - 30 - Launch.offsetX, point.y + 80 - Launch.offsetY);
                this.uiScenes.addEffect(this, 10000029, v3d, 4, 30, function ($particle) {
                    _this._clickflag = true;
                }, 0, 0, true);
                // BaseSceneMgr.getInstance().showEffect(this, -1, 10000029, 220, -640, 4, 0, true, () => {
                // 	this._clickflag = true;
                // });
                clearTimeout(this.updateBaptizeTick);
                this.updateBaptizeTick = setTimeout(function () {
                    if (_this._hasTempAttr) {
                        // this.updateAttr();
                        _this.updateView();
                        _this._hasTempAttr = false;
                        return;
                    }
                    // this.baseUpdateAttr();
                    _this.updateView();
                }, 300);
            }
            else {
                this.updateView();
            }
        };
        TabBaptize.prototype.updateView = function () {
            var baptizeLv = App.hero.artifactBaptizeLv;
            this.lab_Lv.text = baptizeLv + LanMgr.getLan("", 10031);
            this.updateAttr();
            this.setCostText();
        };
        TabBaptize.prototype.updateAttr = function () {
            this.lab_isNull.visible = isEmptyObject(App.hero.artifactBaptizeTempAttr);
            this.baseUpdateAttr();
        };
        TabBaptize.prototype.baseUpdateAttr = function () {
            this.list_attri.dataSource = App.hero.artifactBaptizeAttrs ? [[], [], []] : null;
            var baptizeAttrs = App.hero.artifactBaptizeAttrs;
            //战力
            this._nextForce = 0;
            this._curForce = this.getTotalForce(baptizeAttrs);
            this.lab_force.text = LanMgr.getLan("", 10117, this._curForce);
            var vis = isEmptyObject(App.hero.artifactBaptizeTempAttr);
            this.lab_nextforce.visible = !vis;
            this.lab_arrow.visible = !vis;
            if (this.lab_nextforce.visible) {
                this._nextForce = this.getTotalForce(App.hero.artifactBaptizeTempAttr);
                this.lab_nextforce.text = LanMgr.getLan("", 10117, this._nextForce);
            }
            //箭头图标
            this.lab_arrow.text = this._curForce > this._nextForce ? " ↓" : this._curForce < this._nextForce ? " ↑" : "";
            this.lab_arrow.x = this.lab_nextforce.x + this.lab_nextforce.width / 2 + 5;
            this.lab_arrow.color = this._curForce > this._nextForce ? "#ff0000" : "#319c28";
        };
        TabBaptize.prototype.onRender = function (cell, index) {
            var _this = this;
            var model = game.ArtifactModel.getInstance();
            var idx = index + 1;
            var baptizeAttrs = App.hero.artifactBaptizeAttrs;
            var baptizeTempAttrs = App.hero.artifactBaptizeTempAttr;
            if (baptizeAttrs.hasOwnProperty(idx)) {
                cell.lab_curValue.text = baptizeAttrs[idx][2] >= 1 ? "+" + baptizeAttrs[idx][2] : "+" + baptizeAttrs[idx][2] * 100 + "%";
                cell.lab_curAttri.text = LanMgr.GOD_RACE_NAME[baptizeAttrs[idx][3]] + LanMgr.attrName[baptizeAttrs[idx][0]];
                var quality = this._tbs.findIndex(function (vo) { return vo.isOnScope(baptizeAttrs[idx]); });
                cell.lab_curValue.color = "#" + this._qualityColors[quality];
                this._attriLvSum += quality;
            }
            else {
                cell.lab_curValue.text = "";
                cell.lab_curAttri.text = "";
            }
            if (baptizeTempAttrs && baptizeTempAttrs.hasOwnProperty(idx)) {
                cell.lab_nextValue.text = baptizeTempAttrs[idx][2] >= 1 ? "+" + baptizeTempAttrs[idx][2] : "+" + baptizeTempAttrs[idx][2] * 100 + "%";
                cell.lab_nextAttri.text = LanMgr.GOD_RACE_NAME[baptizeTempAttrs[idx][3]] + LanMgr.attrName[baptizeTempAttrs[idx][0]];
                var isMaxAttr = this._tbs[this._tbs.length - 1].isMaxAttr(baptizeTempAttrs[idx]);
                var quality = this._tbs.findIndex(function (vo) { return vo.isOnScope(baptizeTempAttrs[idx]); });
                this.maxArrtiLv = { Lv: quality + 2, index: idx, isMaxAttr: ~~isMaxAttr };
                cell.lab_nextValue.color = "#" + this._qualityColors[quality];
                this._tmpAttriLvSum += quality;
            }
            else {
                cell.lab_nextValue.text = "";
                cell.lab_nextAttri.text = "";
            }
            if (!cell.img_false.hasListener(Laya.Event.CLICK))
                cell.img_false.on(Laya.Event.CLICK, this, function () {
                    var baptizeAttrs = App.hero.artifactBaptizeAttrs;
                    if (_this._suodingNum >= 2) {
                        showToast(LanMgr.getLan('', 10238));
                        return;
                    }
                    else if (!baptizeAttrs.hasOwnProperty(idx)) {
                        showToast(LanMgr.getLan('', 10239));
                        return;
                    }
                    else {
                        _this.setsuodingNum(true);
                    }
                    cell.img_false.visible = !cell.img_false.visible;
                    cell.img_true.visible = !cell.img_false.visible;
                });
            if (!cell.img_true.hasListener(Laya.Event.CLICK))
                cell.img_true.on(Laya.Event.CLICK, this, function () {
                    if (_this._suodingNum > 0)
                        _this.setsuodingNum(false);
                    cell.img_true.visible = !cell.img_true.visible;
                    cell.img_false.visible = !cell.img_true.visible;
                });
            cell.lab_nextAttri.event(Laya.Event.RESIZE);
            cell.lab_curAttri.event(Laya.Event.RESIZE);
        };
        TabBaptize.prototype.setsuodingNum = function (type) {
            var _this = this;
            if (type)
                this._suodingNum++;
            else
                this._suodingNum--;
            if (this._suodingNum > 0) {
                var index = this._tbSet.lock_cost.findIndex(function (vo) { return vo[0] == _this._suodingNum; });
                if (index != -1)
                    this.lab_suo.text = LanMgr.getLan("", 12537, this._suodingNum, this._tbSet.lock_cost[index][2]);
            }
            else {
                this.lab_suo.text = LanMgr.getLan("", 12536);
            }
        };
        TabBaptize.prototype.setCostText = function () {
            var pbaptizeNum = App.hero.getBagItemNum(this._tbSet.general_baptize[0][0]);
            var gbaptizeNum = App.hero.getBagItemNum(this._tbSet.rare_baptize[0][0]);
            this._ispBaptize = pbaptizeNum >= this._tbSet.general_baptize[0][1];
            this._isgBaptize = gbaptizeNum >= this._tbSet.rare_baptize[0][1];
            this.lab_pHas.color = this._ispBaptize ? ColorConst.normalFont : "#f62e08";
            this.lab_gHas.color = this._isgBaptize ? ColorConst.normalFont : "#f62e08";
            this.lab_pNeed.text = "/" + this._tbSet.general_baptize[0][1];
            this.lab_gNeed.text = "/" + this._tbSet.rare_baptize[0][1];
            this.lab_pHas.stroke = this._ispBaptize ? 0 : 2;
            this.lab_gHas.stroke = this._isgBaptize ? 0 : 2;
            this.lab_pHas.text = "" + pbaptizeNum;
            this.lab_gHas.text = "" + gbaptizeNum;
            this.lab_pHas.event(Laya.Event.RESIZE);
            this.lab_gHas.event(Laya.Event.RESIZE);
        };
        Object.defineProperty(TabBaptize.prototype, "maxArrtiLv", {
            set: function (data) {
                if (!this._maxAttriLv || data.Lv > this._maxAttriLv['Lv'])
                    this._maxAttriLv = { Lv: data.Lv, index: data.index };
                if (!this._maxAttriLv['isMaxAttr'])
                    this._maxAttriLv['isMaxAttr'] = 0;
                this._maxAttriLv['isMaxAttr'] += data.isMaxAttr;
            },
            enumerable: true,
            configurable: true
        });
        TabBaptize.prototype.lookup = function () {
            UIMgr.showUI(UIConst.Artifact_BaptizeTip, this.dataSource);
        };
        TabBaptize.prototype.change = function () {
            var _this = this;
            if (!this._clickflag) {
                return;
            }
            if (isEmptyObject(App.hero.artifactBaptizeTempAttr)) {
                showToast(LanMgr.getLan("", 10240));
                return;
            }
            if (this._nextForce < this._curForce) {
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10241), confirmCb: function () {
                        dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [_this._curArtifactTemp.ID, Artifact.CHANGE]);
                    }, parm: null
                });
                return;
            }
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [this._curArtifactTemp.ID, Artifact.CHANGE]);
        };
        TabBaptize.prototype.baptize = function (type) {
            if (!this._clickflag) {
                return;
            }
            if (type == Artifact.PBAPTIZE && !this._ispBaptize) {
                showToast(LanMgr.getLan("", Lans.cost, this._tbSet.general_baptize[0][0]));
                return;
            }
            else if (type == Artifact.GBAPTIZE && !this._isgBaptize) {
                showToast(LanMgr.getLan('', Lans.cost, this._tbSet.rare_baptize[0][0]));
                return;
            }
            if (this._nextForce > this._curForce) {
                var self_1 = this;
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10495), confirmCb: function () {
                        self_1.onSurebaptize(type);
                    }, parm: null
                });
                return;
            }
            this.onSurebaptize(type);
        };
        TabBaptize.prototype.onSurebaptize = function (type) {
            var _this = this;
            var arr = [];
            type = type == Artifact.PBAPTIZE ? iface.tb_prop.baptizeTypeKey.normal : iface.tb_prop.baptizeTypeKey.advanced;
            this.list_attri.cells.forEach(function (vo, index) { if (vo.img_true.visible)
                arr.push(index + 1); });
            if (arr.length > 0) {
                var index = this._tbSet.lock_cost.findIndex(function (vo) { return vo[0] == _this._suodingNum; });
                if (index != -1 && App.hero.diamond < this._tbSet.lock_cost[index][2]) {
                    showToast(LanMgr.getLan('', 10005));
                    return;
                }
            }
            if (!isEmptyObject(this._maxAttriLv) && !arr.some(function (vo) { return vo == _this._maxAttriLv['index']; }) && this._maxAttriLv['Lv'] >= 5 && !game.ArtifactModel.getInstance().hint) {
                common.TishiView.showTishi({
                    text: LanMgr.getLan("", 12538), confirmCb: function (hint) {
                        _this.startOperation();
                        dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [{ id: _this._curArtifactTemp.ID, type: type, hint: hint, lockFlag: arr }, Artifact.PBAPTIZE]);
                    }, parm: null
                });
                return;
            }
            if (!ExtConfig.RELEASE && ExtConfig.LOG_LEVEL == 123) {
                if (!isEmptyObject(this._maxAttriLv) && this._maxAttriLv['isMaxAttr'] - this._suodingNum > 0 && this._maxAttriLv['Lv'] == 6) {
                    this._maxAttriLv['isMaxAttr'] = 0;
                    return;
                }
                else {
                    Laya.timer.frameOnce(5, this, this.baptize, [Artifact.GBAPTIZE]);
                }
            }
            this.startOperation();
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [{ id: this._curArtifactTemp.ID, type: type, lockFlag: arr }, Artifact.PBAPTIZE]);
        };
        TabBaptize.prototype.startOperation = function () {
            App.hero.artifactBaptizeTempAttr = {};
            this.lab_isNull.visible = false;
            this.baseUpdateAttr();
        };
        TabBaptize.prototype.close = function () {
            this._raceMap = null;
            this.pxilianRP.onDispose();
            this.gxilianRP.onDispose();
            this.btn_lookup.off(Laya.Event.CLICK, this, this.lookup);
            this.btn_change.off(Laya.Event.CLICK, this, this.change);
            this.btn_pBaptize.off(Laya.Event.CLICK, this, this.baptize);
            this.btn_gBaptize.off(Laya.Event.CLICK, this, this.baptize);
            if (this.list_attri.renderHandler) {
                this.list_attri.renderHandler.recover();
                this.list_attri.renderHandler = null;
            }
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.setCostText, this);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE, this.updateBaptize, this);
            clearTimeout(this.updateBaptizeTick);
            this.uiScenes.onExit();
        };
        return TabBaptize;
    }(ui.artifact.tab.ArtifactBaptizeUI));
    game.TabBaptize = TabBaptize;
})(game || (game = {}));
