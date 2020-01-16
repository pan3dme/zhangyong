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
    var TowerView = /** @class */ (function (_super) {
        __extends(TowerView, _super);
        function TowerView() {
            var _this = _super.call(this) || this;
            _this._curPage = 0;
            _this.group = UIConst.hud_group;
            return _this;
        }
        TowerView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.TowerModel.getInstance();
            for (var i = 0; i < game.TowerModel.PAGE_NUM; i++) {
                var itemrender = this["gkitem_" + i];
                itemrender.index = i;
            }
            this.uiScene = new Base2dSceneLayer();
            this.boxContent.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.btn_lev0, this.imgBoss);
            this.boxContent.addChild(this.imgBoss);
            this.boxContent.addChild(this.imgArrow);
            this.loadSkill();
            this.pageList.selectEnable = true;
            this.pageList.renderHandler = new Handler(this, this.renderPage);
            this.pageList.selectHandler = new Handler(this, this.selectPage);
            this._tabBar = new common.CustomTabBar();
            this._tabBar.buttons = [this.btn_lev0, this.btn_lev1];
            var putong = this._model.putongModel;
            this._tabBar.buttonsData = [null, { openTye: common.BtnOpenType.gray, openHandler: new Handler(putong, putong.isAllPass), prompt: LanMgr.getLan('', 10100) }];
            this._tabBar.selectHandler = new Handler(this, this.onTabSel);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHILIANTA);
        };
        TowerView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_buzhen, callback: this.onBuzhen.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onPaiming.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onJiangli.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            this._curPage = -1;
            var index = this.dataSource ? parseInt(this.dataSource) : 0;
            this._tabBar.selectedIndex = index;
            this.uiScene.onShow();
            this.boxBaoxiang.on(Laya.Event.CLICK, this, this.onClickBaoxiang);
        };
        TowerView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._bossGuanqia = null;
            this._curGuanqia = null;
            this.removeSkill();
            this.uiScene.onExit();
            Laya.Tween.clearTween(this.imgArrow);
            Laya.timer.clearAll(this);
            this._tabBar.selectedIndex = -1;
            this.boxBaoxiang.off(Laya.Event.CLICK, this, this.onClickBaoxiang);
            tl3d.ModuleEventManager.removeEvent(common.GlobalEvent.DIALOG_CLOSED, this.onNextPage, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        /** 选择难度模式 */
        TowerView.prototype.onTabSel = function (index) {
            if (index == -1)
                return;
            var model = this._model;
            if (index == 0) {
                this.pageList.array = new Array(model.putongModel.pageNum);
                this.selectPage(model.putongModel.curPage);
            }
            else {
                this.pageList.array = new Array(model.kunnanModel.pageNum);
                this.selectPage(model.kunnanModel.curPage);
            }
        };
        /** 渲染页数 */
        TowerView.prototype.renderPage = function (cell, index) {
            var lbNum = cell.getChildByName('lbNum');
            lbNum.text = String(index + 1);
        };
        /** 选择页数 */
        TowerView.prototype.selectPage = function (page) {
            if (this._curPage == page)
                return;
            var model = this._model;
            if (page > 0) {
                var selectedIndex = this._tabBar.selectedIndex;
                var isPass = selectedIndex == 0 ? model.putongModel.isPassByPage(page - 1) : model.kunnanModel.isPassByPage(page - 1);
                if (!isPass) {
                    showToast(LanMgr.getLan('', 10464));
                    this.pageList.selectedIndex = this._curPage;
                    return;
                }
                var guanqiaList = selectedIndex == 0 ? model.putongModel.getListByPage(page - 1) : model.kunnanModel.getListByPage(page - 1);
                if (!guanqiaList[9].isReward()) {
                    showToast(LanMgr.getLan('', 10465));
                    this.pageList.selectedIndex = this._curPage;
                    return;
                }
            }
            for (var i = 0, len = this.pageList.cells.length; i < len; i++) {
                var cell = this.pageList.cells[i];
                var imgBg = cell.getChildByName('imgBg');
                imgBg.skin = SkinUtil.getPageStateUrl(page == i ? 2 : 1);
            }
            this._curPage = page;
            this.pageList.selectedIndex = this._curPage;
            this.renderGuanqia();
        };
        /** 关卡渲染 */
        TowerView.prototype.renderGuanqia = function () {
            var _this = this;
            var selectedIndex = this._tabBar.selectedIndex;
            var model = this._model;
            var guanqiaList = selectedIndex == 0 ? model.putongModel.getListByPage(this._curPage) : model.kunnanModel.getListByPage(this._curPage);
            var isPass = selectedIndex == 0 ? model.putongModel.isPassByPage(this._curPage) : model.kunnanModel.isPassByPage(this._curPage);
            var curItem;
            for (var i = 0; i < game.TowerModel.PAGE_NUM; i++) {
                var itemRender = this["gkitem_" + i];
                itemRender.dataSource = guanqiaList[i];
                if (guanqiaList[i].isCurrent()) {
                    curItem = itemRender;
                }
            }
            this.setIndexImage(curItem);
            this._curGuanqia = curItem;
            this._bossGuanqia = guanqiaList[9];
            var modelId = tb.TB_trial.get_TB_trialById(this._bossGuanqia.tbCopyInfo.ID).model;
            Laya.timer.frameOnce(3, this, function () {
                if (!_this._bossGuanqia)
                    return;
                _this.refreshModel(modelId, isPass, _this._bossGuanqia.isReward());
            });
        };
        /**
         * 设置当前索引位置
         * @param guanqia
         */
        TowerView.prototype.setIndexImage = function (item) {
            if (item) {
                Laya.Tween.clearTween(this.imgArrow);
                this.imgArrow.x = item.x - 18;
                this.imgArrow.y = item.y - 80;
                this.imgArrow.visible = true;
                UIUtil.loop(this.imgArrow, this.imgArrow.x, this.imgArrow.y, 1000, 30, TweenDirection.down);
            }
            else {
                this.imgArrow.visible = false;
                Laya.Tween.clearTween(this.imgArrow);
            }
        };
        TowerView.prototype.loadSkill = function () {
            this.uiScene.scene.skillMgr.preLoadSkill(getSkillUrl("100001"));
        };
        /**
         * 刷新模型id
         * @param modeid 模型id
         */
        TowerView.prototype.refreshModel = function (modeid, isPass, isReward) {
            this.removeSkill();
            if (isPass) {
                this.uiScene.addModelChar(SkinUtil.baoxiangModelId, 261, 430, 180, 1);
                if (!isReward) {
                    this._skill = this.uiScene.scene.charPlaySkill(this.uiScene.sceneChar, "100001", tl3d.CharAction.STANAD);
                    this.boxBaoxiang.visible = true;
                }
                else {
                    this.uiScene.sceneChar.play(tl3d.CharAction.DEATH, 1);
                    this.boxBaoxiang.visible = false;
                }
                this.imgBoss.visible = false;
            }
            else {
                this.uiScene.addModelChar(modeid, 261, 430, 180, 1);
                this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
                this.imgBoss.visible = true;
                this.boxBaoxiang.visible = false;
            }
        };
        /** 布阵 */
        TowerView.prototype.onBuzhen = function () {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        };
        /** 奖励 */
        TowerView.prototype.onJiangli = function () {
            var type = this._tabBar.selectedIndex == 0 ? game.ShiliantaType.jiandan : game.ShiliantaType.kunnan;
            dispatchEvt(new game.TowerEvent(game.TowerEvent.SHOW_TOWER_JIANGLI, type));
        };
        /** 排行榜 */
        TowerView.prototype.onPaiming = function () {
            var type = this._tabBar.selectedIndex == 0 ? game.ShiliantaType.jiandan : game.ShiliantaType.kunnan;
            dispatchEvt(new game.TowerEvent(game.TowerEvent.SHOW_TOWER_RANK, type));
        };
        TowerView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_MAOXIAN));
        };
        /** 点击宝箱 */
        TowerView.prototype.onClickBaoxiang = function () {
            var _this = this;
            if (this._skill) {
                this.removeSkill();
                this._skill = this.uiScene.scene.charPlaySkill(this.uiScene.sceneChar, "100001", tl3d.CharAction.DEATH, function () {
                    if (_this.uiScene.sceneChar) {
                        _this.uiScene.sceneChar.play(tl3d.CharAction.DEATH, 1);
                    }
                });
            }
            if (this._bossGuanqia && this._bossGuanqia.isPass() && !this._bossGuanqia.isReward()) {
                dispatchEvt(new game.TowerEvent(game.TowerEvent.LINGQU_BOSS_JIANGLI, this._bossGuanqia));
                tl3d.ModuleEventManager.addEvent(common.GlobalEvent.DIALOG_CLOSED, this.onNextPage, this);
            }
        };
        /** 领取奖励完成跳到下一页 */
        TowerView.prototype.onNextPage = function (event) {
            var dialog = event.data;
            if (dialog && (dialog.name == UIConst.ZH_ResultView || dialog.name == UIConst.CommonRewardView)) {
                tl3d.ModuleEventManager.removeEvent(common.GlobalEvent.DIALOG_CLOSED, this.onNextPage, this);
                var model = this._model;
                if (this._tabBar.selectedIndex == 0) {
                    if (model.putongModel.isAllFinish()) {
                        this._tabBar.selectedIndex = 1;
                        this._tabBar.updateLockState();
                    }
                    else {
                        this.selectPage(model.putongModel.curPage);
                    }
                }
                else {
                    this.selectPage(model.kunnanModel.curPage);
                }
                UIMgr.showUI(UIConst.OpenChapterView, { type: game.OpenChapterView.TYPE_SHILIANTA });
            }
        };
        /** 移除技能 */
        TowerView.prototype.removeSkill = function () {
            if (this._skill) {
                this.uiScene.scene.removeCharSkill(this._skill);
                this._skill = null;
            }
        };
        /** 获取当前关卡 */
        TowerView.prototype.getCurGuanqia = function () {
            return this._curGuanqia ? this._curGuanqia : this.gkitem_0;
        };
        return TowerView;
    }(ui.tower.shiliantaViewUI));
    game.TowerView = TowerView;
})(game || (game = {}));
