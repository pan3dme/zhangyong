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
    var BtnFuncId;
    (function (BtnFuncId) {
        BtnFuncId[BtnFuncId["reviveHero"] = 1] = "reviveHero";
        BtnFuncId[BtnFuncId["recoverHero"] = 2] = "recoverHero";
    })(BtnFuncId = game.BtnFuncId || (game.BtnFuncId = {}));
    var SysTopView = /** @class */ (function (_super) {
        __extends(SysTopView, _super);
        function SysTopView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.mouseThrough = true;
            return _this;
        }
        SysTopView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnClose.on(Laya.Event.CLICK, this, this.onClick);
            this.boxFogforest.visible = false;
            this.box_island.visible = false;
            this._resList = [];
        };
        SysTopView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            // 顶部
            this.boxTop.height = GameUtil.isFullScreen() ? (134 + game.HudModel.TOP_ADD_HEIGHT) : 134;
        };
        SysTopView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        SysTopView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        SysTopView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.btnList.array = null;
            this.imgSys.skin = null;
            Laya.timer.clear(this, this.updateIslandTime);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateRes, this);
            tl3d.ModuleEventManager.removeEvent(game.HudEvent.UPDATE_SYS_TOP_BTN_INFO, this.updateBtnIr, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateIslandCount, this);
            this.btnOneKey.off(Laya.Event.CLICK, this, this.onOnekey);
            this.clearResList();
            // 打开
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                view.setVisible(true);
            }
        };
        SysTopView.prototype.initView = function () {
            // 优化操作，减少渲染
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                view.setVisible(false);
            }
            var info = this.dataSource;
            this.btnList.array = info.funList;
            var skin = SkinUtil.getSysTitle(info.viewName);
            if (skin && skin != "") {
                this.imgSys.skin = SkinUtil.getSysTitle(info.viewName);
                this.imgSys.visible = this.bgTitle.visible = true;
            }
            else {
                this.imgSys.visible = this.bgTitle.visible = false;
            }
            info.resAry = info.resAry || [];
            var len = info.resAry.length;
            this.clearResList();
            for (var i = 0; i < len; i++) {
                var itemIr = new game.SysTopResIR();
                itemIr.y = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
                itemIr.dataSource = info.resAry[i];
                this.boxTop.addChild(itemIr);
                this._resList.push(itemIr);
            }
            this.layoutList();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateRes, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_SYS_TOP_BTN_INFO, this.updateBtnIr, this);
            this.updateRes();
            this.boxFogforest.visible = false;
            this.box_island.visible = false;
            if (info.viewName == UIConst.FogForestView) {
                this.boxFogforest.visible = true;
                this.btnOneKey.on(Laya.Event.CLICK, this, this.onOnekey);
                this.updateFogforest();
            }
            else if (info.viewName == UIConst.IslandView || info.viewName == UIConst.OreMapView) {
                this.box_island.visible = true;
                this.btn_island_add.on(Laya.Event.CLICK, this, this.onClickIslandBtn);
                tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateIslandCount, this);
                Laya.timer.loop(1000, this, this.updateIslandTime);
                this.updateIsland();
            }
        };
        /** 布局 */
        SysTopView.prototype.layoutList = function () {
            var allWidth = 0;
            var len = this._resList.length;
            for (var _i = 0, _a = this._resList; _i < _a.length; _i++) {
                var itemir = _a[_i];
                allWidth += itemir.width;
            }
            // 前后间距算间隔
            // let spaceX = (this.width - allWidth - 60)/(len-1);
            // spaceX = spaceX < 0 ? 0 : spaceX;
            // 固定间隔20
            var spaceX = 20;
            if (spaceX > 0) {
                allWidth += spaceX * (len - 1);
            }
            var startX = (this.width - allWidth) / 2;
            for (var i = 0; i < len; i++) {
                var itemir = this._resList[i];
                itemir.x = startX;
                startX = itemir.x + itemir.width + spaceX;
            }
        };
        /** 更新资源 */
        SysTopView.prototype.updateRes = function () {
            for (var _i = 0, _a = this._resList; _i < _a.length; _i++) {
                var itemir = _a[_i];
                itemir.refreshView();
            }
        };
        /** 更新按钮信息 支持更新多个*/
        SysTopView.prototype.updateBtnIr = function (event) {
            var ary = event.data || [];
            for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                var info = ary_1[_i];
                var btnIr = this.getSysTopBtnIR(info.btnId);
                if (btnIr) {
                    var btnInfo = btnIr.dataSource;
                    for (var key in info) {
                        btnInfo[key] = info[key];
                    }
                    btnIr.refreshView();
                }
            }
        };
        /** 获取按钮 */
        SysTopView.prototype.getSysTopBtnIR = function (id) {
            if (!id)
                return null;
            var ary = this.btnList.cells || [];
            return ary.find(function (item) {
                return item && item.dataSource && item.dataSource.btnId == id;
            });
        };
        SysTopView.prototype.onClick = function () {
            var info = this.dataSource;
            if (info) {
                if (GameUtil.isFunction(info.closeCallback)) {
                    info.closeCallback();
                }
            }
        };
        SysTopView.prototype.clearResList = function () {
            for (var _i = 0, _a = this._resList; _i < _a.length; _i++) {
                var itemir = _a[_i];
                itemir.dataSource = null;
                itemir.removeSelf();
            }
            this._resList.length = 0;
        };
        // =============== 迷雾森林 ==================
        /** 迷雾森林 */
        SysTopView.prototype.updateFogforest = function () {
            this.lbGuanqia.text = LanMgr.getLan('', 10184, App.hero.forestMaxFloor);
        };
        SysTopView.prototype.onOnekey = function () {
            dispatchEvt(new game.FogForestEvent(game.FogForestEvent.ONE_KEY_PASS));
        };
        // =============== 神秘岛屿 ==================
        SysTopView.prototype.updateIsland = function () {
            this.updateIslandCount();
            this.updateIslandTime();
        };
        /** 更新时间 */
        SysTopView.prototype.updateIslandTime = function () {
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum);
            var maxCnt = tb.TB_island_set.getSet().plunder_max;
            if (count >= maxCnt) {
                this.lab_island_refresh.visible = false;
            }
            else {
                this.lab_island_refresh.visible = true;
                var replyTime = tb.TB_island_set.getSet().reply_time;
                var time = replyTime - (App.serverTimeSecond - App.hero.mineRobReplyTime);
                this.lab_island_refresh.text = LanMgr.getLan('', 10186, GameUtil.toCountdown(time, "mm:ss", 2));
            }
            this.lab_island_rob.text = "\u53EF\u63A0\u593A:" + count + "\u6B21";
        };
        /** 更新数量 */
        SysTopView.prototype.updateIslandCount = function () {
            this.lab_island_rob.text = "\u53EF\u63A0\u593A:" + App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum) + "\u6B21";
            this.lab_island_occupy.text = "\u53EF\u5360\u9886:" + game.IslandModel.getInstance().getOccupyCount() + "\u6B21";
        };
        SysTopView.prototype.onClickIslandBtn = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_BUY_VIEW));
        };
        return SysTopView;
    }(ui.hud.view.SysTopUI));
    game.SysTopView = SysTopView;
})(game || (game = {}));
