

module game {

    export class TowerView extends ui.tower.shiliantaViewUI {
        private uiScene: Base2dSceneLayer;
        private _tabBar: common.CustomTabBar;
        private _model: TowerModel;
        constructor() {
            super();
            this.group = UIConst.hud_group;
        }

        private _bossGuanqia: GuanqiaVo;
        private _curGuanqia: TowerGuanqiaIR;
        createChildren(): void {
            super.createChildren();
            this._model = TowerModel.getInstance();
            for (let i: number = 0; i < TowerModel.PAGE_NUM; i++) {
                let itemrender: TowerGuanqiaIR = this["gkitem_" + i];
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
            let putong = this._model.putongModel;
            this._tabBar.buttonsData = [null, { openTye: common.BtnOpenType.gray, openHandler: new Handler(putong, putong.isAllPass), prompt: LanMgr.getLan('', 10100) }];
            this._tabBar.selectHandler = new Handler(this, this.onTabSel);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHILIANTA);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        private initView(): void {
            let funList: BtnFuncVo[] = [
                { btnSkin: SkinUtil.btn_buzhen, callback: this.onBuzhen.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onPaiming.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onJiangli.bind(this) },
            ];
            let resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry, funList, closeCallback: this.onFanHui.bind(this) });
            this._curPage = -1;
            let index = this.dataSource ? parseInt(this.dataSource) : 0;
            this._tabBar.selectedIndex = index;
            this.uiScene.onShow();
            this.boxBaoxiang.on(Laya.Event.CLICK, this, this.onClickBaoxiang);
        }

        public onClosed(): void {
            super.onClosed();
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
        }

        /** 选择难度模式 */
        private onTabSel(index: number): void {
            if (index == -1) return;
            let model = this._model;
            if (index == 0) {
                this.pageList.array = new Array(model.putongModel.pageNum);
                this.selectPage(model.putongModel.curPage);
            } else {
                this.pageList.array = new Array(model.kunnanModel.pageNum);
                this.selectPage(model.kunnanModel.curPage);
            }
        }

        /** 渲染页数 */
        private renderPage(cell: Laya.Box, index: number): void {
            let lbNum = cell.getChildByName('lbNum') as Laya.Label;
            lbNum.text = String(index + 1);
        }
        private _curPage: number = 0;
        /** 选择页数 */
        private selectPage(page: number): void {
            if (this._curPage == page) return;
            let model = this._model;
            if (page > 0) {
                let selectedIndex = this._tabBar.selectedIndex;
                let isPass = selectedIndex == 0 ? model.putongModel.isPassByPage(page - 1) : model.kunnanModel.isPassByPage(page - 1);
                if (!isPass) {
                    showToast(LanMgr.getLan('', 10464));
                    this.pageList.selectedIndex = this._curPage;
                    return;
                }
                let guanqiaList = selectedIndex == 0 ? model.putongModel.getListByPage(page - 1) : model.kunnanModel.getListByPage(page - 1);
                if (!guanqiaList[9].isReward()) {
                    showToast(LanMgr.getLan('', 10465));
                    this.pageList.selectedIndex = this._curPage;
                    return;
                }
            }
            for (let i = 0, len = this.pageList.cells.length; i < len; i++) {
                let cell = this.pageList.cells[i];
                let imgBg = cell.getChildByName('imgBg') as Laya.Image;
                imgBg.skin = SkinUtil.getPageStateUrl(page == i ? 2 : 1);
            }
            this._curPage = page;
            this.pageList.selectedIndex = this._curPage;
            this.renderGuanqia();
        }
        /** 关卡渲染 */
        public renderGuanqia(): void {
            let selectedIndex = this._tabBar.selectedIndex;
            let model = this._model;
            let guanqiaList = selectedIndex == 0 ? model.putongModel.getListByPage(this._curPage) : model.kunnanModel.getListByPage(this._curPage);
            let isPass = selectedIndex == 0 ? model.putongModel.isPassByPage(this._curPage) : model.kunnanModel.isPassByPage(this._curPage);
            let curItem: TowerGuanqiaIR;
            for (let i = 0; i < TowerModel.PAGE_NUM; i++) {
                let itemRender = this["gkitem_" + i] as TowerGuanqiaIR;
                itemRender.dataSource = guanqiaList[i];
                if (guanqiaList[i].isCurrent()) {
                    curItem = itemRender;
                }
            }
            this.setIndexImage(curItem);
            this._curGuanqia = curItem;
            this._bossGuanqia = guanqiaList[9];
            let modelId = tb.TB_trial.get_TB_trialById(this._bossGuanqia.tbCopyInfo.ID).model;
            Laya.timer.frameOnce(3, this, () => {
                if (!this._bossGuanqia) return;
                this.refreshModel(modelId, isPass, this._bossGuanqia.isReward());
            });
        }
        /**
		 * 设置当前索引位置
		 * @param guanqia 
		 */
        private setIndexImage(item: TowerGuanqiaIR): void {
            if (item) {
                Laya.Tween.clearTween(this.imgArrow);
                this.imgArrow.x = item.x - 18;
                this.imgArrow.y = item.y - 80;
                this.imgArrow.visible = true;
                UIUtil.loop(this.imgArrow, this.imgArrow.x, this.imgArrow.y, 1000, 30, TweenDirection.down);
            } else {
                this.imgArrow.visible = false;
                Laya.Tween.clearTween(this.imgArrow);
            }
        }

        private loadSkill(): void {
            this.uiScene.scene.skillMgr.preLoadSkill(getSkillUrl("100001"));
        }

        private _skill: tl3d.Skill;
        /**
         * 刷新模型id
         * @param modeid 模型id
         */
        private refreshModel(modeid, isPass: boolean, isReward: boolean) {
            this.removeSkill();
            if (isPass) {
                this.uiScene.addModelChar(SkinUtil.baoxiangModelId, 261, 430, 180, 1);
                if (!isReward) {
                    this._skill = this.uiScene.scene.charPlaySkill(this.uiScene.sceneChar, "100001", tl3d.CharAction.STANAD);
                    this.boxBaoxiang.visible = true;
                } else {
                    this.uiScene.sceneChar.play(tl3d.CharAction.DEATH, 1);
                    this.boxBaoxiang.visible = false;
                }
                this.imgBoss.visible = false;
            } else {
                this.uiScene.addModelChar(modeid, 261, 430, 180, 1);
                this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
                this.imgBoss.visible = true;
                this.boxBaoxiang.visible = false;
            }
        }
        /** 布阵 */
        private onBuzhen(): void {
            dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        }
        /** 奖励 */
        private onJiangli(): void {
            let type = this._tabBar.selectedIndex == 0 ? ShiliantaType.jiandan : ShiliantaType.kunnan;
            dispatchEvt(new TowerEvent(TowerEvent.SHOW_TOWER_JIANGLI, type));
        }
        /** 排行榜 */
        private onPaiming(): void {
            let type = this._tabBar.selectedIndex == 0 ? ShiliantaType.jiandan : ShiliantaType.kunnan;
            dispatchEvt(new TowerEvent(TowerEvent.SHOW_TOWER_RANK, type));
        }

        private onFanHui(): void {
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_MAOXIAN));
        }
        /** 点击宝箱 */
        private onClickBaoxiang(): void {
            if (this._skill) {
                this.removeSkill();
                this._skill = this.uiScene.scene.charPlaySkill(this.uiScene.sceneChar, "100001", tl3d.CharAction.DEATH, () => {
                    if (this.uiScene.sceneChar) {
                        this.uiScene.sceneChar.play(tl3d.CharAction.DEATH, 1);
                    }
                });
            }
            if (this._bossGuanqia && this._bossGuanqia.isPass() && !this._bossGuanqia.isReward()) {
                dispatchEvt(new TowerEvent(TowerEvent.LINGQU_BOSS_JIANGLI, this._bossGuanqia));
                tl3d.ModuleEventManager.addEvent(common.GlobalEvent.DIALOG_CLOSED, this.onNextPage, this);
            }
        }
        /** 领取奖励完成跳到下一页 */
        private onNextPage(event: common.GlobalEvent): void {
            let dialog = event.data as DialogExt;
            if (dialog && (dialog.name == UIConst.ZH_ResultView || dialog.name == UIConst.CommonRewardView)) {
                tl3d.ModuleEventManager.removeEvent(common.GlobalEvent.DIALOG_CLOSED, this.onNextPage, this);
                let model = this._model;
                if (this._tabBar.selectedIndex == 0) {
                    if (model.putongModel.isAllFinish()) {
                        this._tabBar.selectedIndex = 1;
                        this._tabBar.updateLockState();
                    } else {
                        this.selectPage(model.putongModel.curPage);
                    }
                } else {
                    this.selectPage(model.kunnanModel.curPage);
                }
                UIMgr.showUI(UIConst.OpenChapterView, { type: OpenChapterView.TYPE_SHILIANTA });
            }
        }

        /** 移除技能 */
        private removeSkill(): void {
            if (this._skill) {
                this.uiScene.scene.removeCharSkill(this._skill);
                this._skill = null;
            }
        }
        /** 获取当前关卡 */
        public getCurGuanqia(): TowerGuanqiaIR {
            return this._curGuanqia ? this._curGuanqia : this.gkitem_0;
        }
    }
}