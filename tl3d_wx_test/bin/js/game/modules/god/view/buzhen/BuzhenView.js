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
    var BuzhenView = /** @class */ (function (_super) {
        __extends(BuzhenView, _super);
        function BuzhenView() {
            var _this = _super.call(this) || this;
            _this._uipos = [];
            _this._rolenum = 0;
            _this.guanghuanUI.on(Laya.Event.CLICK, _this, _this.showPanel);
            _this._buzhenRoles = [_this.ui_buzhenrole0, _this.ui_buzhenrole1,
                _this.ui_buzhenrole2, _this.ui_buzhenrole3, _this.ui_buzhenrole4, _this.ui_buzhenrole5];
            _this._buzhenRoles.forEach(function (vo, index) {
                vo.name = "ui_buzhenrole" + index;
                _this._uipos.push(new Laya.Point(vo.x, vo.y));
            });
            return _this;
        }
        BuzhenView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = false;
            this.closeByBlank.visible = this.isModelClose;
            this.itemRenderAry = [];
            for (var i = 0; i < 6; i++) {
                var uiitem = this["ui_buzhenItem" + i];
                uiitem.dataSource = new game.BuzhenItemVo();
                this.itemRenderAry.push(uiitem);
            }
            this.list_buzhenrole.mouseHandler = new Handler(this, this.onSelect);
            this.list_buzhenrole.renderHandler = new Handler(this, this.onRender);
            this.btn_return.on(Laya.Event.CLICK, this, this.onCommit);
            this.raceList.selectHandler = new Handler(this, this.onRaceSelect);
            this.raceList.selectedIndex = -1;
            this.imgBgSQ.on(Laya.Event.CLICK, this, this.showShenqi);
        };
        BuzhenView.prototype.close = function () {
            this._type = this.dataSource;
            if (this._type == iface.tb_prop.lineupTypeKey.attack && App.hero.getLineUpTeam(this._type).length <= 0) {
                showToast(LanMgr.getLan("", 10477));
                return;
            }
            _super.prototype.close.call(this);
        };
        BuzhenView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            delete this._tempTeamObj;
            this.list_buzhenrole.array = null;
            this.raceList.selectedIndex = -1;
            this._buzhenRoles.forEach(function (vo) { vo.offAll(); });
            this.guanghuanUI.onExit();
        };
        BuzhenView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            // 原因： 打远征成功之后的胜利界面点击下一关会弹出布阵界面，因为EffectList的层级问题，这边要比EffectList的层级高
            this.zOrder = UI_DEPATH_VALUE.TOP + 2;
            this.initView();
        };
        BuzhenView.prototype.initView = function () {
            var _this = this;
            this._buzhenGods = [];
            this._tempTeamObj = {};
            this._oldTeamObj = {};
            //布阵类型:1 攻击布阵 2 防守布阵 3 神秘宝藏 4远征
            this._type = this.dataSource;
            this.lab_shiluo.visible = this._type == iface.tb_prop.lineupTypeKey.expedition;
            //初始化布阵item数据
            var tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            for (var j = 0; j < this.itemRenderAry.length; j++) {
                var itemvo = this.itemRenderAry[j].dataSource;
                //  是否有已上阵英雄 或者是否解锁
                itemvo.openflag = tabgameset.lineup[j] <= App.hero.level;
                itemvo.msg = tabgameset.lineup[j] > App.hero.level ? LanMgr.getLan("", 10035, tabgameset.lineup[j]) : "";
                itemvo.data = null;
                itemvo.posDes = j < 2 ? LanMgr.getLan("", 10558) : LanMgr.getLan("", 10559);
                this.itemRenderAry[j].refreshData(true);
            }
            this.list_buzhenrole.spaceY = this._type == iface.tb_prop.lineupTypeKey.expedition ? 3 : -25;
            var arylist = App.hero.getGodAry(-1, this._type);
            if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                arylist = arylist.filter(function (vo) {
                    return vo.level >= game.YuanzhengModel.SHANGZHEN_LEVEL;
                });
            }
            for (var i = 0; i < arylist.length; i++) {
                var element = arylist[i];
                var key = -1;
                if (this._type == iface.tb_prop.lineupTypeKey.attack) {
                    if (!element.isAttackFight) {
                        break;
                    }
                    key = element.local[0];
                }
                else if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                    if (!element.isYuanzhengFight) {
                        break;
                    }
                    if (game.YuanzhengModel.getInstance().getGodHp(element.uuid) > 0) {
                        key = element.local[2];
                    }
                }
                if (key != -1) {
                    this._tempTeamObj[element.uuid] = key;
                    this.itemRenderAry[key].dataSource.data = element;
                    this.itemRenderAry[key].refreshData();
                }
            }
            //没有数组，浅拷贝一下
            for (var key in this._tempTeamObj) {
                this._oldTeamObj[key] = this._tempTeamObj[key];
            }
            this.setBoxData();
            if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                //援助阵容
                var myHireList = game.YuanzhengModel.getInstance().getMyHireList();
                // let myHireList = [arylist[0],arylist[1]];
                this._buzhenGods = myHireList.map(function (vo) {
                    // vo.isAid = true;
                    var buzhenVo = new game.BuzhenListItemVo(vo, _this._type);
                    buzhenVo.showBlood = true;
                    buzhenVo.hp = game.YuanzhengModel.getInstance().getGodHp(vo.uuid);
                    buzhenVo.totalHp = Math.ceil(vo.getPropertyValue(1));
                    buzhenVo.canGray = true;
                    return buzhenVo;
                });
            }
            //我自己符合需求的阵容
            this._buzhenGods = this._buzhenGods.concat(arylist.map(function (vo) {
                var buzhenVo = new game.BuzhenListItemVo(vo, _this._type);
                if (_this._type == iface.tb_prop.lineupTypeKey.expedition) {
                    buzhenVo.showBlood = true;
                    buzhenVo.hp = game.YuanzhengModel.getInstance().getGodHp(vo.uuid);
                    buzhenVo.totalHp = Math.ceil(vo.getPropertyValue(1));
                    buzhenVo.canGray = true;
                }
                return buzhenVo;
            }));
            this.raceList.array = [0, 1, 2, 3, 4, 5];
            this.raceList.selectedIndex = 0;
            this.updateShenqi();
        };
        /** 种族选择 */
        BuzhenView.prototype.onRaceSelect = function (index) {
            if (index == -1)
                return;
            var ary = index == 0 ? this._buzhenGods : this._buzhenGods.filter(function (vo) {
                return vo && vo.godVo && vo.godVo.getRaceType() == index;
            });
            this.list_buzhenrole.array = ary;
        };
        BuzhenView.prototype.onSelect = function (e, index) {
            if (e.type == Laya.Event.CLICK) {
                logdebug("当前选择", index);
                this._curIdx = index;
                var data = this.list_buzhenrole.array[index];
                if (!data || !data.godVo)
                    return;
                var godVo = data.godVo;
                if (this._tempTeamObj.hasOwnProperty(godVo.uuid)) {
                    if (this._buzhenRoles[this._tempTeamObj[godVo.uuid]]) {
                        this._buzhenRoles[this._tempTeamObj[godVo.uuid]].dataSource = null;
                        this._buzhenRoles[this._tempTeamObj[godVo.uuid]].visible = false;
                    }
                    this.delRole(godVo);
                }
                else {
                    var validflag = this.validationRole(godVo);
                    if (!validflag) {
                        return;
                    }
                    if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                        if (godVo.level < game.YuanzhengModel.SHANGZHEN_LEVEL) {
                            showToast(LanMgr.getLan("", 10113));
                            return;
                        }
                        if (game.YuanzhengModel.getInstance().getGodHp(godVo.uuid) <= 0) {
                            showToast(LanMgr.getLan("", 10112));
                            return;
                        }
                    }
                    var flag = this.insertRole(godVo);
                    if (!flag) {
                        showToast(LanMgr.getLan("", 10478));
                        return;
                    }
                }
                this.list_buzhenrole.refresh();
                this.changeGodData();
                dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_SELECT_ROLE));
            }
        };
        BuzhenView.prototype.validationRole = function (data) {
            var newtempId = data.templateId;
            //判重先
            for (var k = 0; k < this.itemRenderAry.length; k++) {
                var kkvo = this.itemRenderAry[k].dataSource;
                if (!kkvo.openflag || !kkvo.data) {
                    continue;
                }
                var lasttempId = kkvo.data.templateId;
                var godtab = tb.TB_god.get_TB_godById(lasttempId);
                if (lasttempId == newtempId) {
                    showToast(LanMgr.getLan("", 10353));
                    return false;
                }
                if (kkvo.data.isAid && data.isAid) {
                    showToast(LanMgr.getLan("", 10479));
                    return false;
                }
            }
            return true;
        };
        BuzhenView.prototype.insertRole = function (data) {
            for (var i = 0; i < this.itemRenderAry.length; i++) {
                var vo = this.itemRenderAry[i].dataSource;
                if (vo.openflag && !vo.data) {
                    vo.data = data;
                    this._tempTeamObj[data.uuid] = String(i);
                    this._buzhenRoles[i].dataSource = data;
                    this.itemRenderAry[i].refreshData();
                    this._buzhenRoles[i].visible = true;
                    return true;
                }
            }
            return false;
        };
        BuzhenView.prototype.delRole = function (data) {
            var idx = Number(this._tempTeamObj[data.uuid]);
            var vo = this.itemRenderAry[idx].dataSource;
            vo.data = null;
            delete this._tempTeamObj[data.uuid];
            this.itemRenderAry[idx].refreshData(true);
        };
        BuzhenView.prototype.getlist = function () {
            this._rolenum = 0;
            var ary = new Array;
            for (var i = 0; i < this.itemRenderAry.length; i++) {
                var element = this.itemRenderAry[i].dataSource;
                if (element.openflag) {
                    var uuid = null;
                    if (element.data) {
                        uuid = element.data.uuid;
                        this._rolenum++;
                        if (element.data.isAid) {
                            //记录下援助的使用情况
                            game.YuanzhengModel.getInstance().setAidTag(element.data);
                        }
                    }
                    ary.push(uuid);
                }
            }
            return ary;
        };
        BuzhenView.prototype.onCommit = function (e) {
            var _this = this;
            var listary = this.getlist();
            if (this._rolenum <= 0) {
                showToast(LanMgr.getLan("", 10477));
                return;
            }
            var args = {};
            args[Protocol.game_common_ajustLineup.args.type] = this._type;
            args[Protocol.game_common_ajustLineup.args.godIds] = listary;
            PLC.request(Protocol.game_common_ajustLineup, args, function ($data) {
                if (!$data) {
                    showToast(LanMgr.getLan("", 10352));
                    return;
                }
                if (_this._type != iface.tb_prop.lineupTypeKey.expedition) {
                    //判断阵容是否改变
                    var tempObj = _this._tempTeamObj ? _this._tempTeamObj : {};
                    var isChange = false;
                    var curLength = Object.getOwnPropertyNames(tempObj).length;
                    var oldLength = Object.getOwnPropertyNames(_this._oldTeamObj).length;
                    for (var key in (curLength > oldLength ? tempObj : _this._oldTeamObj)) {
                        if (tempObj[key] != _this._oldTeamObj[key])
                            isChange = true;
                    }
                    if (isChange) {
                        showToast(LanMgr.getLan("", 10480));
                    }
                }
                else {
                    // 远征
                    if (UIMgr.hasStage(UIConst.FightVictory)) {
                        var view = UIMgr.getUIByName(UIConst.FightVictory);
                        view.again = true;
                        UIMgr.hideUIByName(UIConst.FightVictory);
                        // Laya.timer.frameOnce(5,this,()=>{
                        dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.GUANQIA_CHALLENGE));
                        // });
                    }
                    else {
                        dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.GUANQIA_CHALLENGE));
                    }
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE), _this._type);
                dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE_ALL), _this._type);
                _this.close();
            });
        };
        BuzhenView.prototype.setBoxData = function () {
            var _this = this;
            this._buzhenRoles.forEach(function (headBox, index) {
                var data = _this.itemRenderAry[index].dataSource.data;
                headBox.visible = data ? true : false;
                var pos = _this._uipos[index];
                headBox.dataSource = data;
                headBox.pos(pos.x, pos.y);
                if (!headBox.hasListener(Laya.Event.MOUSE_UP))
                    headBox.on(Laya.Event.MOUSE_UP, _this, _this.onItemClick);
                if (!headBox.hasListener(Laya.Event.MOUSE_DOWN))
                    headBox.on(Laya.Event.MOUSE_DOWN, _this, _this.onItemClick);
            });
            this.changeGodData();
        };
        BuzhenView.prototype.onRender = function (itemRender, index) {
            if (index > this.list_buzhenrole.array.length)
                return;
            var data = this.list_buzhenrole.array[index];
            if (data && data.godVo) {
                var godVo = data.godVo;
                itemRender.redPoint.onDispose();
                itemRender.redPoint.setRedPointName("god_buzhen_" + godVo.uuid);
                itemRender.chk_select.visible = this._tempTeamObj.hasOwnProperty(godVo.uuid);
            }
            else {
                itemRender.redPoint.onDispose();
            }
        };
        BuzhenView.prototype.showPanel = function () {
            var obj = {};
            this._buzhenRoles.forEach(function (itemIR) {
                var info = itemIR.getDataSource();
                if (info) {
                    var race = info.getRaceType();
                    obj[race] = obj[race] || 0;
                    obj[race] += 1;
                }
            });
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_KEZHI_VIEW), obj);
        };
        BuzhenView.prototype.onItemClick = function (e) {
            var headBox = e.currentTarget;
            if (e.type == Laya.Event.MOUSE_DOWN) {
                this.setChildIndex(headBox, this._childs.length - 1);
                var pos = this.localToGlobal(new Laya.Point(0, 0));
                var width = Laya.stage.width - headBox.width * 0.5;
                var height = Laya.stage.height - headBox.height * 0.3;
                headBox.startDrag(new Laya.Rectangle(-pos.x, -pos.y, width, height));
            }
            else if (e.type == Laya.Event.MOUSE_UP) {
                e.currentTarget.stopDrag();
                var boxIndex = Number(headBox.name.replace(/[^0-9]/ig, ""));
                var startPos = this._uipos[boxIndex];
                var bx_1 = headBox.x;
                var by_1 = headBox.y;
                if (bx_1 == startPos.x && by_1 == startPos.y) { /**坐标没变，判断为点击事件 */
                    var render = this.itemRenderAry[boxIndex];
                    var itemdata = render.dataSource;
                    if (!itemdata.openflag) {
                        showToast(itemdata.msg);
                    }
                    else {
                        if (itemdata.data) {
                            this.delRole(itemdata.data);
                            this.list_buzhenrole.refresh();
                            this._buzhenRoles[boxIndex].dataSource = null;
                            this._buzhenRoles[boxIndex].visible = false;
                            this.changeGodData();
                        }
                    }
                    return;
                }
                var targetIndex = this.itemRenderAry.findIndex(function (itemIR) {
                    for (var i = 0; i <= 30;) {
                        var theX = bx_1 + i;
                        var theY = by_1 + i;
                        if ((theX >= itemIR.x && theX <= itemIR.x + itemIR.width) && (theY >= itemIR.y && theY <= itemIR.y + itemIR.height)) {
                            return true;
                        }
                        i += 5;
                    }
                    return false;
                    // return (bx >= itemIR.x && bx <= itemIR.x + itemIR.width) && (by >= itemIR.y && by <= itemIR.y + itemIR.height);
                });
                if (targetIndex != -1 && targetIndex != boxIndex) { /**落在其他盒子里 */
                    var godVo = new GodItemVo(this.itemRenderAry[boxIndex].dataSource.data);
                    godVo = this.itemRenderAry[boxIndex].dataSource.data;
                    var targetItem = this.itemRenderAry[targetIndex].dataSource;
                    if (targetItem.data && targetItem.openflag) { /**存在英雄，互调位置 */
                        this.setItemData(boxIndex, this.itemRenderAry[targetIndex].dataSource.data);
                        this.setItemData(targetIndex, godVo);
                    }
                    else { /**不存在英雄 */
                        if (!targetItem.openflag) {
                            showToast(targetItem.msg);
                        }
                        else {
                            this.delRole(this.itemRenderAry[boxIndex].dataSource.data);
                            this.setItemData(targetIndex, godVo);
                        }
                    }
                }
                // 下阵
                if ((bx_1 >= this.list_buzhenrole.x && bx_1 <= this.list_buzhenrole.x + this.list_buzhenrole.width) && (by_1 >= this.list_buzhenrole.y && by_1 <= this.list_buzhenrole.y + this.list_buzhenrole.height)) {
                    this.delRole(this.itemRenderAry[boxIndex].dataSource.data);
                    this.list_buzhenrole.refresh();
                }
                this.setBoxData();
            }
        };
        /**改变英雄位置 */
        BuzhenView.prototype.setItemData = function (index, data) {
            this.itemRenderAry[index].dataSource.data = data;
            this.itemRenderAry[index].refreshData();
            this._tempTeamObj[data.uuid] = index;
        };
        /** 是否已经布置上阵了 */
        BuzhenView.prototype.isExistLineupById = function (godId) {
            var flag = false;
            for (var _i = 0, _a = this.itemRenderAry; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.dataSource && item.dataSource.data) {
                    var godVo = item.dataSource.data;
                    if (godVo.templateId == godId) {
                        return true;
                    }
                }
            }
            return false;
        };
        /** 是否已经布置上阵了 */
        BuzhenView.prototype.isExistLineupByIdx = function (index) {
            var item = this.itemRenderAry[index];
            return item.dataSource && item.dataSource.data;
        };
        /** 布阵变化 */
        BuzhenView.prototype.changeGodData = function () {
            var posAry = [];
            var shenli = 0;
            this._buzhenRoles.forEach(function (itemIR) {
                var info = itemIR.getDataSource();
                if (info) {
                    shenli += info.isAid ? info.fightPower : info.getShenli();
                    posAry.push(info.tab_god.race_type);
                }
                else {
                    posAry.push(-1);
                }
            });
            this.guanghuanUI.initView(0, posAry);
            this.lbShenli.text = shenli + "";
        };
        /** 更新神器显示 */
        BuzhenView.prototype.updateShenqi = function () {
            var shenqiId = App.hero.getArtifactIDByLineType();
            this.imgShenqi.visible = shenqiId > 0;
            this.imgAddSQ.visible = shenqiId <= 0;
            if (shenqiId > 0) {
                var tbShenqi = tb.TB_artifact.get_TB_artifactById(shenqiId);
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(tbShenqi.icon);
            }
        };
        BuzhenView.prototype.showShenqi = function () {
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL));
        };
        return BuzhenView;
    }(ui.god.BuzhenUI));
    game.BuzhenView = BuzhenView;
})(game || (game = {}));
