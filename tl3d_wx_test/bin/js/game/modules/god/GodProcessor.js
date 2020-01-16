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
    var GodProcessor = /** @class */ (function (_super) {
        __extends(GodProcessor, _super);
        function GodProcessor() {
            return _super.call(this) || this;
        }
        GodProcessor.prototype.getName = function () {
            return "GodProcessor";
        };
        GodProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GodEvent(game.GodEvent.SHOW_SHENGLING_PANEL),
                new game.GodEvent(game.GodEvent.SHOW_KEZHI_VIEW),
                new game.GodEvent(game.GodEvent.CLICK_JUEXING_EVENT),
                new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL),
                new game.GodEvent(game.GodEvent.USE_EXPPOOL),
                new game.GodEvent(game.GodEvent.CLICK_STAR_UP),
                new game.GodEvent(game.GodEvent.CHOOSE_LINEUP_GOD),
                new game.GodEvent(game.GodEvent.SHOW_SHENGJIE_ATTR),
                new game.GodEvent(game.GodEvent.GOD_PORP_CHANGE),
                new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE_ALL),
                new game.ResEvent(game.ResEvent.PROP_CHANGE),
                new game.ResEvent(game.ResEvent.GOD_EXP_CHANGE),
                new game.GodEvent(game.GodEvent.GOD_SHENGJIE_SUCCESS),
                new game.GodEvent(game.GodEvent.SHOW_REPLACE_VIEW),
                new game.GodEvent(game.GodEvent.SHOW_GOD_CULTURE_VIEW),
            ];
        };
        //处理事件
        GodProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GodEvent) {
                switch ($event.type) {
                    case game.GodEvent.SHOW_SHENGLING_PANEL:
                        this.showPanel($event.data);
                        break;
                    case game.GodEvent.SHOW_KEZHI_VIEW:
                        this.showKezhiPanel($event.data);
                        break;
                    case game.GodEvent.CLICK_JUEXING_EVENT:
                        this.onAwaken($event.data);
                        break;
                    case game.GodEvent.BUZHEN_COMPLETE_ALL:
                        this.buzhenComplete();
                        break;
                    case game.GodEvent.GOD_PORP_CHANGE:
                        this.godPropChange($event.data);
                        break;
                    case game.GodEvent.SHOW_BUZHEN_PANEL:
                        this.show_buzhenView($event.data);
                        break;
                    case game.GodEvent.USE_EXPPOOL:
                        this.expPoolLevelUp($event.data);
                        break;
                    case game.GodEvent.CLICK_STAR_UP:
                        this.starUpEvent($event.data);
                        break;
                    case game.GodEvent.CHOOSE_LINEUP_GOD:
                        this.downGods($event.data);
                        break;
                    case game.GodEvent.SHOW_SHENGJIE_ATTR:
                        this.countDegreeUp($event.data);
                        break;
                    case game.GodEvent.GOD_SHENGJIE_SUCCESS:
                        //升阶成功
                        this.shengjieSucc($event.data);
                        break;
                    case game.GodEvent.SHOW_REPLACE_VIEW:
                        this.showReplaceView($event.data);
                        break;
                    case game.GodEvent.SHOW_GOD_CULTURE_VIEW:
                        this.showGodInfoView($event.data);
                        break;
                }
            }
            if ($event instanceof game.ResEvent) {
                switch ($event.type) {
                    case game.ResEvent.PROP_CHANGE:
                        this.propChange();
                        break;
                    case game.ResEvent.GOD_EXP_CHANGE:
                        this.refreshResource();
                        break;
                }
            }
        };
        /** 升阶成功 */
        GodProcessor.prototype.shengjieSucc = function (uuid) {
            UIMgr.showUI(UIConst.God_DgUp_SUCCView, uuid);
            // if(UIMgr.hasStage(UIConst.God_MainView)){
            //     let tbInfo = this.godMainview.godView.viewInfo;
            //     tbInfo && tbInfo.updateList();
            // }
            // if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
            //     let tbInfo = this.godCultureView.godView.viewInfo;
            //     tbInfo && tbInfo.updateList();
            // }
        };
        /** 打开英雄更换界面 */
        GodProcessor.prototype.showReplaceView = function (dataAry) {
            var godVo = dataAry ? dataAry[0] : null;
            var pos = dataAry ? dataAry[1] : undefined;
            if (isNaN(pos) || pos == null || pos == undefined) {
                pos = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack, true).findIndex(function (uuid) {
                    return !uuid || uuid == "";
                });
            }
            if (pos >= 0 && pos < 6) {
                UIMgr.showUI(UIConst.God_ReplaceGodView, [godVo, pos]);
            }
        };
        /** 打开英雄养成界面 */
        GodProcessor.prototype.showGodInfoView = function (dataAry) {
            if (!dataAry || dataAry.length < 2)
                return;
            UIMgr.showUI(UIConst.God_GodCultureView, dataAry);
        };
        /** 刷新消耗资源 */
        GodProcessor.prototype.refreshResource = function () {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                if (this.godMainview.viewInfo) {
                    this.godMainview.viewInfo.setCostText();
                }
            }
        };
        /** 神灵属性数据变化更新界面 */
        GodProcessor.prototype.godPropChange = function (data) {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                this.godMainview.refreshRolesByGod(data, false);
            }
            if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                this.godCultureView.refreshCurRole(data);
            }
        };
        /**
         * 点击升星
         */
        GodProcessor.prototype.starUpEvent = function (dataAry) {
            var _this = this;
            var godVo = dataAry[0];
            var list = dataAry[1] ? dataAry[1] : [];
            if (!godVo.hasStarUpCost()) {
                showToast(LanMgr.getLan("", Lans.cost));
                return;
            }
            if (godVo.forbitStarUpTo7()) {
                showToast(LanMgr.getLan("", 10346));
                return;
            }
            var ID = game.GodUtils.getGodStarId(godVo.starLevel, godVo.templateId);
            var startab = tb.TB_god_star.get_TB_god_starById(ID);
            var materialArrs = [];
            if (startab && startab.material) {
                var isEnough = list.every(function (vo) {
                    return vo.isEnough();
                });
                if (!isEnough) {
                    showToast(LanMgr.getLan("", 10347));
                    return;
                }
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var vo = list_1[_i];
                    materialArrs.push(vo.getFormatData());
                }
            }
            var args = {};
            args[Protocol.game_god_raiseStar.args.godId] = godVo.uuid;
            args[Protocol.game_god_raiseStar.args.materialArrs] = materialArrs;
            PLC.request(Protocol.game_god_raiseStar, args, function ($data, $msg) {
                if ($data) {
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        _this.godMainview.list_tab.selectedIndex = 0;
                    }
                    godVo = App.hero.getGodVoById(godVo.uuid);
                    UIUtil.showRole(godVo, UI_FLYTEXT.UPSTART, $data.commonData);
                }
            });
        };
        /**
         * 道具消耗刷新觉醒道具列表
         */
        GodProcessor.prototype.propChange = function () {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                if (this.godMainview.viewJuexing) {
                    this.godMainview.viewJuexing.refereshItemList();
                }
            }
            if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                if (this.godCultureView.viewJuexing) {
                    this.godCultureView.viewJuexing.refereshItemList();
                }
            }
        };
        /**
          * 英雄排序
          * @param 英雄列表
          */
        GodProcessor.prototype.buzhenComplete = function () {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                this.godMainview.refreshRoles();
            }
        };
        /**
         * 觉醒
         * @param godVo
         */
        GodProcessor.prototype.onAwaken = function (dataAry) {
            var _this = this;
            var godVo = dataAry[0];
            var list = dataAry[1] ? dataAry[1] : [];
            if (godVo.awakenLv >= godVo.maxAwakenLv) {
                showToast(LanMgr.getLan("", 10348));
                return;
            }
            if (godVo.awakenLv >= godVo.getCurMaxAwakenLv()) {
                showToast(LanMgr.getLan("", 10349));
                return;
            }
            var tbCond = tb.TB_god_awaken.getTbById(godVo.awakenLv);
            var notEnough = App.isNotEnoughType(tbCond.material);
            if (notEnough != -1) {
                showToast(LanMgr.getLan("", Lans.awakenCost, notEnough));
                return;
            }
            var materialArrs = [];
            if (tbCond.god_material) {
                var isEnough = list.every(function (vo) {
                    return vo.isEnough();
                });
                if (!isEnough) {
                    showToast(LanMgr.getLan("", 10350));
                    return;
                }
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var vo = list_2[_i];
                    materialArrs.push(vo.getFormatData());
                }
            }
            var uuid = godVo.uuid;
            var args = {};
            args[Protocol.game_god_awaken.args.godId] = uuid;
            args[Protocol.game_god_awaken.args.materialArrs] = materialArrs;
            // loghgy("觉醒材料参数 ---- ",args);
            PLC.request(Protocol.game_god_awaken, args, function ($data, $msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    var ary = [];
                    if (_this.godMainview.viewJuexing) {
                        ary = _this.godMainview.viewJuexing.getAttrToast();
                    }
                    _this.godMainview.godView.showJuexingEffect(ary);
                    if (_this.godMainview.viewJuexing) {
                        _this.godMainview.viewJuexing.refreshJuexing();
                    }
                }
                if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                    var ary = [];
                    if (_this.godCultureView.viewJuexing) {
                        ary = _this.godCultureView.viewJuexing.getAttrToast();
                    }
                    _this.godCultureView.godView.showJuexingEffect(ary);
                }
                var godVo = App.hero.getGodVoById(uuid);
                if (godVo && godVo.awakenLv == tb.TB_god_set.get_TB_god_set().awake_section) {
                    UIUtil.showRole(godVo, UI_FLYTEXT.AWAKEN);
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.GOD_AWAKEN_SUCCESS));
            });
        };
        /**
         * 打开英雄面板
         */
        GodProcessor.prototype.showPanel = function (data) {
            var flag = UIMgr.hasStage(UIConst.God_MainView);
            if (!flag)
                UIMgr.showUI(UIConst.God_MainView, data);
        };
        // 打开克制界面
        GodProcessor.prototype.showKezhiPanel = function (data) {
            // 没有默认取自己的阵容
            if (!data) {
                data = game.GodModel.getInstance().getRaceNumObj();
            }
            UIMgr.showUI(UIConst.God_kezhiView, data);
        };
        /** 下阵英雄 */
        GodProcessor.prototype.downGods = function (data) {
            var _this = this;
            game.GodUtils.downGods(data).then(function () {
                if (_this.fenjieview)
                    _this.fenjieview.list_gods.refresh();
            });
        };
        /**
         * 打开布阵界面
         */
        GodProcessor.prototype.show_buzhenView = function (eventdata) {
            if (game.GodUtils.getGodsNum() <= 0) {
                showToast(LanMgr.getLan("", 10017));
                return;
            }
            UIMgr.showUI(UIConst.BuzhenView, eventdata);
        };
        Object.defineProperty(GodProcessor.prototype, "godMainview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.God_MainView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodProcessor.prototype, "fenjieview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.FenjieView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodProcessor.prototype, "godCultureView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.God_GodCultureView);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 使用经验池升级
         * @param num
         */
        GodProcessor.prototype.expPoolLevelUp = function (dataAry) {
            var _this = this;
            var data = dataAry[0];
            var isOneKey = dataAry[1];
            var args = {};
            args[Protocol.game_god_upgrade.args.godId] = data.uuid;
            args[Protocol.game_god_upgrade.args.count] = isOneKey ? 5 : 1;
            PLC.request(Protocol.game_god_upgrade, args, function ($data, $msg) {
                if (!$data)
                    return;
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    _this.godMainview.godView.sendShuxingEvent();
                }
                if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                    _this.godCultureView.godView.sendShuxingEvent();
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.USE_EXPPOOL_SUCCESS), data.uuid);
            });
        };
        GodProcessor.prototype.countDegreeUp = function (uuid) {
            var godVo = App.hero.getGodVoById(uuid);
            var nowDegree = godVo.degree;
            var nowAttr = godVo.jisuanchushi(nowDegree);
            var preAttr = godVo.jisuanchushi(nowDegree - 1);
            var growth = new Array();
            for (var i = 0; i < 3; i++) {
                growth.push([LanMgr.attrName[i + 1], Math.floor(nowAttr[i][1]) - Math.floor(preAttr[i][1])]);
            }
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                this.godMainview.godView.showShuxing(growth);
            }
        };
        return GodProcessor;
    }(tl3d.Processor));
    game.GodProcessor = GodProcessor;
})(game || (game = {}));
