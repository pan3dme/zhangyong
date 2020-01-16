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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    /** 英雄介绍界面 */
    var GodIntroduceView = /** @class */ (function (_super) {
        __extends(GodIntroduceView, _super);
        function GodIntroduceView() {
            var _this = _super.call(this) || this;
            /**
             * 刷新模型id
             * @param modeid 模型id
             */
            _this._lastmodel = 0;
            _this._pyGodId = 0;
            _this._pySoundUrl = "";
            return _this;
        }
        GodIntroduceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GodModel.getInstance();
            this.uiScene = new Base2dSceneLayer();
            this.roleBox.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.hbox, this.roleBox);
            this.list_shuxingup.renderHandler = new Handler(this, this.onUpRender);
            this.starList.renderHandler = new Handler(this, this.onXingjiRender);
            this.btnZiliao.on(Laya.Event.CLICK, this, this.onLookInfo);
            this.btnChange.on(Laya.Event.CLICK, this, this.onChange);
            this.box_model.on(Laya.Event.CLICK, this, this.onClickModel);
            this.btn_gh.on(Laya.Event.CLICK, this, this.onClickGH);
            this.btn_peiyin.on(Laya.Event.CLICK, this, this.onClickPeiYin);
            this.btn_lihui.on(Laya.Event.CLICK, this, this.onClickLiHui);
            this.btnSkin.on(Laya.Event.CLICK, this, this.onSkin);
            this.btnBuzhen.on(Laya.Event.CLICK, this, this.onBuzhen);
            this.list_attr.renderHandler = new Handler(this, this.onAttrRender);
            this.tabList.renderHandler = new Handler(this, this.onRenderIndex);
            this.tabList.selectedIndex = -1;
            var model = this._model;
            this.tabList.array = __spreadArrays(model.tabTypes);
            var tabTypes = model.tabTypes;
            this._tabInfoList = [];
            for (var i = 0; i < tabTypes.length; i++) {
                this._tabInfoList.push(this.buildTabInfo(tabTypes[i]));
            }
            this._tabOperate = new common.TabListOperate(this.tabList, this.viewStack);
            this._tabOperate.setTabItemist(this._tabInfoList);
        };
        GodIntroduceView.prototype.buildTabInfo = function (type) {
            var model = this._model;
            var viewData = model.getTabViewDatas(type);
            return {
                viewName: viewData.viewName,
                viewClz: viewData.viewClz,
                onSelectVerify: function () {
                    var sysId = viewData.sysId;
                    var tbData = tb.TB_sys_open.get_TB_sys_openById(sysId);
                    if (tbData && !App.IsSysOpen(sysId)) {
                        showToast(tbData.prompt);
                        return false;
                    }
                    return true;
                },
                onSelectAfter: function () {
                    dispatchEvt(new game.GodEvent(game.GodEvent.SWITCH_TAB_SUCCESS));
                },
                onShow: function (view) {
                    if (view && GameUtil.isFunction(view['init'])) {
                        view['init']();
                    }
                },
                onHide: function (view) {
                    // 切换界面,界面隐藏
                    if (view && GameUtil.isFunction(view['close'])) {
                        view['close']();
                    }
                },
                onClosed: function (view) {
                    // 界面释放
                    if (view && GameUtil.isFunction(view['close'])) {
                        view['close']();
                    }
                },
                dataSource: null
            };
        };
        /** 打开面板 */
        GodIntroduceView.prototype.toOpen = function () {
            tl3d.ModuleEventManager.addEvent(game.TreasureEvent.TREASURE_OPERATION, this.treasureOpt, this);
        };
        /** 关闭面板 */
        GodIntroduceView.prototype.toClose = function () {
            tl3d.ModuleEventManager.removeEvent(game.TreasureEvent.TREASURE_OPERATION, this.treasureOpt, this);
            this._curVo = null;
            Laya.timer.clearAll(this);
            this._lastmodel = 0;
            this.uiScene.onExit();
            this.starList.array = null;
            this.list_shuxingup.array = null;
            this.godSkinRP.onDispose();
            // this.stopPySound();
            this._tabOperate.viewDispose();
        };
        /**
         * 圣物穿戴变化
         */
        GodIntroduceView.prototype.treasureOpt = function () {
            this.timer.frameOnce(5, this, this.changeAttr);
        };
        Object.defineProperty(GodIntroduceView.prototype, "curVo", {
            get: function () {
                return this._curVo;
            },
            set: function (value) {
                // 用于创建界面的数据源
                for (var _i = 0, _a = this._tabInfoList; _i < _a.length; _i++) {
                    var info = _a[_i];
                    info.dataSource = value;
                }
                var isNew = !this._curVo || this.curVo.uuid != value.uuid;
                this._curVo = value;
                this.playPySound(this._curVo.templateId);
                game.EquipModel.getInstance().curShowGod = this._curVo;
                // 重置渲染：设置红点等数据
                this.tabList.refresh();
                var godtemp = tb.TB_god.get_TB_godById(this._curVo.templateId);
                this.btn_lihui.visible = godtemp && godtemp.paint != 0;
                // 切换英雄
                if (isNew) {
                    this.initView();
                }
                else {
                    this.updateView();
                }
            },
            enumerable: true,
            configurable: true
        });
        GodIntroduceView.prototype.initView = function () {
            this.uiScene.onShow();
            this.initData();
            this.updateView();
            game.TreasureTipsView.HideTip();
        };
        /** 初始化数据 */
        GodIntroduceView.prototype.initData = function () {
            var godVo = this._curVo;
            if (godVo) {
                this.updateView();
                var tbGod = godVo.tab_god;
                this.refreshModel();
                this.imgRace.skin = SkinUtil.getGodRaceSkin(godVo.getRaceType());
                this.lab_name.text = tbGod.name;
                this.lab_name.event(Laya.Event.RESIZE);
                this.hbox.refresh();
            }
        };
        /** 更新信息 */
        GodIntroduceView.prototype.updateView = function () {
            var godVo = this._curVo;
            if (godVo) {
                this.lbShenli.text = godVo.getShenli().toString();
                var star = godVo.isMoreThanSix() ? godVo.getStar() - 5 : godVo.getStar();
                var tempStararry = new Array;
                for (var i = 0; i < star; i++) {
                    tempStararry[i] = godVo.starLevel >= 6 ? true : false;
                }
                this.starList.repeatX = star;
                this.starList.array = tempStararry;
                this.starList.x = (this.width - this.starList.width) / 2 - 20;
                this.refreshModel();
                // 圣物
                this.treasureUI.dataSource = godVo;
                this.godSkinRP.setRedPointName("god_skin_" + godVo.uuid);
                this.changeAttr();
            }
        };
        /** 英雄页切换 */
        GodIntroduceView.prototype.onSetIndex = function (index) {
            if (index == -1)
                return;
            if (this.tabList.selectedIndex == index) {
                var viewName = this._tabOperate.getViewName(index);
                this._tabOperate.updateItemByName(viewName, this._curVo);
            }
            else {
                this.tabList.selectedIndex = index;
            }
        };
        /** 更新模型 */
        GodIntroduceView.prototype.refreshModel = function () {
            var godVo = this._curVo;
            if (godVo) {
                var tbGod = godVo.tab_god;
                var modelId = game.GodUtils.getGodModel(godVo.skinId, tbGod);
                // 模型
                if (this._lastmodel != modelId) {
                    Laya.timer.once(200, this, this.showModel, [modelId]);
                }
            }
        };
        /** 刷新当前神灵 */
        GodIntroduceView.prototype.refreshCurRole = function () {
            var index = this.tabList.selectedIndex;
            if (index == ShenlingTabType.info) {
                this.viewInfo && this.viewInfo.updateXinxi();
            }
            else if (index == ShenlingTabType.shengxin) {
                this.viewStarup && this.viewStarup.init();
            }
            else if (index == ShenlingTabType.ronghun) {
                this.viewRonghun && this.viewRonghun.init();
            }
            else if (index == ShenlingTabType.awaken) {
                this.viewJuexing && this.viewJuexing.refreshJuexing();
            }
        };
        /** 弹出的属性列表渲染*/
        GodIntroduceView.prototype.onUpRender = function (cell, index) {
            if (this.list_shuxingup && this.list_shuxingup.dataSource && this.list_shuxingup.dataSource[index] && this.list_shuxingup.dataSource[index].length == 2)
                cell.text = this.list_shuxingup.dataSource[index][0] + "+" + this.list_shuxingup.dataSource[index][1];
        };
        /**
         * 渲染星星
         */
        GodIntroduceView.prototype.onXingjiRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
                cell.width = 29;
                cell.height = 31;
            }
            else {
                cell.skin = SkinUtil.xingxing;
            }
        };
        GodIntroduceView.prototype.onLookInfo = function () {
            if (this._curVo) {
                dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_EVALUATION_PANEL), this._curVo.tab_god);
            }
        };
        GodIntroduceView.prototype.onClickModel = function () {
            if (this.uiScene.sceneChar) {
                this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
                if (this._curVo) {
                    this.playPySound(this._curVo.templateId);
                }
            }
        };
        /** 更换英雄 */
        GodIntroduceView.prototype.onChange = function () {
            var godVo = this._curVo;
            if (!godVo)
                return;
            var index = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack, true).findIndex(function (uuid) {
                return uuid == godVo.uuid;
            });
            if (index != -1) {
                // 其他位置的id数组
                var ids_1 = this._model.getLinuepGodTbid(iface.tb_prop.lineupTypeKey.attack);
                var idIdx = ids_1.indexOf(godVo.templateId);
                if (idIdx != -1) {
                    ids_1.splice(idIdx, 1);
                }
                var gods = App.hero.getGodArr();
                var isExist = gods.some(function (vo) {
                    // 排除其他位置的同种英雄 并且 不是当前英雄
                    return ids_1.indexOf(vo.templateId) == -1 && vo.uuid != godVo.uuid;
                });
                if (!isExist) {
                    showToast(LanMgr.getLan("", 10372));
                    return;
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_REPLACE_VIEW), [godVo, index]);
            }
        };
        /** 渲染tabbar */
        GodIntroduceView.prototype.onRenderIndex = function (item, index) {
            if (!this._curVo)
                return;
            item.img_suo.visible = false;
            var type = item.dataSource;
            if (type == ShenlingTabType.ronghun) {
                item.btn_name.label = LanMgr.getLan("", 12344);
                item.img_suo.visible = !App.IsSysOpen(ModuleConst.RONGHUN);
                item.img_suo.dataSource = ModuleConst.RONGHUN;
            }
            else if (type == ShenlingTabType.awaken) {
                item.btn_name.label = LanMgr.getLan("", 12345);
                item.img_suo.visible = !App.IsSysOpen(ModuleConst.JUEXING);
                item.img_suo.dataSource = ModuleConst.JUEXING;
            }
            else if (type == ShenlingTabType.shengxin) {
                item.btn_name.label = LanMgr.getLan("", 12346);
                item.img_suo.visible = !App.IsSysOpen(ModuleConst.SHENGXING);
                item.img_suo.dataSource = ModuleConst.SHENGXING;
            }
            else {
                item.btn_name.label = LanMgr.getLan("", 12347);
            }
            item.btn_name.selected = index == this.tabList.selectedIndex && !item.img_suo.visible ? true : false;
            item.tabRedPoint.onDispose();
            if (!item.img_suo.visible) {
                var redName = this._model.tabredName[index];
                item.tabRedPoint.setRedPointName(redName + "_" + this._curVo.uuid);
            }
            item.btn_name.labelSize = this.tabList.selectedIndex == index ? 24 : 22;
            item.btn_name.labelColors = this.tabList.selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
        };
        //点击光环
        GodIntroduceView.prototype.onClickGH = function () {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_KEZHI_VIEW));
        };
        GodIntroduceView.prototype.showModel = function (modeid) {
            //因模型和特效的关系，切换模型时，必须重新new 一个scenechar
            this._lastmodel = modeid;
            // this.uiScene.clearSceneChar();
            var point = this.roleBox.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(modeid, point.x + this.roleBox.width / 2 - Launch.offsetX, point.y + 10 - Launch.offsetY);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
        };
        /**
         * 升级增加属性
         */
        GodIntroduceView.prototype.sendShuxingEvent = function () {
            var godVo = this._curVo;
            if (!godVo)
                return;
            AudioMgr.playSound("sound/goduplevel.mp3");
            var evotab;
            if (godVo.starLevel <= 6 || godVo.degree <= 6)
                evotab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.degree); //阶级
            else
                evotab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel);
            var growth = new Array();
            for (var i = 0; i < 3; i++) {
                growth.push([LanMgr.attrName[i + 1], Math.floor(godVo.tab_god.attr_grow[i][1] * evotab.star_growth[i][1])]);
            }
            this.showShuxing(growth);
        };
        /** 增加的属性弹出 */
        GodIntroduceView.prototype.showShuxing = function (now) {
            var _this = this;
            this.list_shuxingup.zOrder = 9999;
            this.list_shuxingup.dataSource = now;
            this.list_shuxingup.x = 290;
            this.list_shuxingup.y = 456;
            this.list_shuxingup.alpha = 1;
            this.list_shuxingup.visible = true;
            Laya.Tween.clearAll(this.list_shuxingup);
            var point = this.roleBox.localToGlobal(new Laya.Point(0, 0));
            var v3d = this.uiScene.get3dPos(point.x + this.roleBox.width / 2 - Launch.offsetX, point.y + this.roleBox.height - Launch.offsetY);
            this.uiScene.addEffect(this, 1000004, v3d, 4, 20, null, 0, 0, true);
            // this.uiScene.scene.playLyf(getEffectUrl("1000004"), new tl3d.Vector3D(180, 0, -440), 20, 4);
            Laya.Tween.to(this.list_shuxingup, { x: 320 }, 100, null, Handler.create(this, function () {
                Laya.Tween.to(_this.list_shuxingup, { y: 370, alpha: 0.2 }, 500, null, Handler.create(_this, function () {
                    _this.list_shuxingup.visible = false;
                }));
            }));
        };
        /**
         * 觉醒属性增加弹出
         */
        GodIntroduceView.prototype.showJuexingEffect = function (attrToast) {
            var _this = this;
            this.list_shuxingup.zOrder = 9999;
            this.list_shuxingup.array = attrToast;
            this.list_shuxingup.x = 290;
            this.list_shuxingup.y = 456;
            this.list_shuxingup.alpha = 1;
            this.list_shuxingup.visible = true;
            Laya.Tween.clearAll(this.list_shuxingup);
            this.uiScene.scene.playLyf(getEffectUrl("1000004"), new tl3d.Vector3D(160, 0, -440), 20, 4);
            Laya.Tween.to(this.list_shuxingup, { x: 320 }, 100, null, Handler.create(this, function () {
                Laya.Tween.to(_this.list_shuxingup, { y: 370, alpha: 0.2 }, 500, null, Handler.create(_this, function () {
                    _this.list_shuxingup.visible = false;
                }));
            }));
        };
        GodIntroduceView.prototype.onSkin = function () {
            if (this._curVo) {
                UIMgr.getInstance().showUI(UIConst.GodSkinView, [this._curVo]);
            }
        };
        /** 布阵 */
        GodIntroduceView.prototype.onBuzhen = function () {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        };
        //配音和立绘
        GodIntroduceView.prototype.onClickLiHui = function () {
            if (!this._curVo)
                return;
            var godtemp = tb.TB_god.get_TB_godById(this._curVo.templateId);
            if (godtemp && godtemp.paint != 0)
                UIMgr.showUI(UIConst.GodLiHuiView, godtemp);
        };
        GodIntroduceView.prototype.onClickPeiYin = function () {
            if (this._curVo) {
                this.playPySound(this._curVo.templateId, "", true);
                if (this.uiScene.sceneChar) {
                    this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
                }
            }
        };
        GodIntroduceView.prototype.playPySound = function (godid, url, force) {
            if (url === void 0) { url = ""; }
            if (force === void 0) { force = true; }
            if (!force && this._pyGodId == godid)
                return;
            this.stopPySound();
            this._pyGodId = godid;
            var filetype = Laya.Render.isConchApp ? "ogg" : "mp3";
            url = LanMgr.getLan("sound/god_peiyin/{0}/voice_{1}_dub.{2}", -1, filetype, godid, filetype);
            this._pySoundUrl = !url || url == "" ? "sound/godpeiyin.mp3" : url;
            AudioMgr.playSound(this._pySoundUrl);
        };
        GodIntroduceView.prototype.stopPySound = function (godid) {
            if (godid === void 0) { godid = 0; }
            if (godid == 0 || this._pyGodId == godid) {
                AudioMgr.StopSound(this._pySoundUrl);
                this._pyGodId = 0;
            }
        };
        /** 属性数组渲染 */
        GodIntroduceView.prototype.onAttrRender = function (cell, index) {
            if (!cell.dataSource)
                return;
            var attr = cell.dataSource;
            cell.imgAttr.skin = SkinUtil.getAttrSkin(attr[0]);
            cell.lbvalue.text = ~~attr[1] + "";
        };
        /** 显示属性 */
        GodIntroduceView.prototype.changeAttr = function () {
            var godVo = this._curVo;
            if (godVo) {
                var allshuxing = godVo.getAllAttr(iface.tb_prop.lineupTypeKey.attack); //总属性
                this.list_attr.array = allshuxing.filter(function (v) { return v[0] <= 4; });
                this.lbShenli.text = godVo.getShenli().toString();
            }
        };
        GodIntroduceView.prototype.getView = function (viewName) {
            return this._tabOperate.getViewByName(viewName);
        };
        Object.defineProperty(GodIntroduceView.prototype, "viewInfo", {
            get: function () {
                return this.getView(game.GodModel.tabInfo);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodIntroduceView.prototype, "viewJuexing", {
            get: function () {
                return this.getView(game.GodModel.tabAwaken);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodIntroduceView.prototype, "viewStarup", {
            get: function () {
                return this.getView(game.GodModel.tabStarup);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodIntroduceView.prototype, "viewRonghun", {
            get: function () {
                return this.getView(game.GodModel.tabRonghun);
            },
            enumerable: true,
            configurable: true
        });
        return GodIntroduceView;
    }(ui.god.GodIntroduceUI));
    game.GodIntroduceView = GodIntroduceView;
})(game || (game = {}));
