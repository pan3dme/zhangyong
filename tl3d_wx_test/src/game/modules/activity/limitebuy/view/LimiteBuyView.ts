
module game {
    export class LimiteBuyView extends ui.activity.limitebuy.LimiteBuyUI {

        private _tabTypes: number[];
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "限时热购" };
            this.list_tab.selectHandler = new Handler(this, this.onTabSelect);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public close(type?: string, showEffect?: boolean, sound?: boolean): void {
            this.list_tab.array = null;

            if (this._view_summon) {
                this._view_summon.uiScene.onExit();
                this._view_summon.dataSource = null;
                Laya.timer.clearAll(this._view_summon);
            }

            if (this._view_group) {
                Laya.timer.clearAll(this._view_group);
                this._view_group.dataSource = null;
            }

            super.close(type, showEffect, sound);
        }

        public initView(): void {
            this._tabTypes = [];
            let model = LimiteBuyModel.getInstance();
            //这个判断是判断哪些活动开启，冗余
            if (model.isOpenLimiteSummon()) {
                if (model.isOpenLimiteGroup()) {
                    // 两个切换图标
                    this._tabTypes = [LimiteBuyType.summon, LimiteBuyType.group];
                    this.list_tab.array = this._tabTypes;
                    // this.list_tab.repeatX = 2;
                } else {
                    this._tabTypes = [LimiteBuyType.summon];
                    this.list_tab.array = this._tabTypes;
                    // this.list_tab.repeatX = 1;
                }
            } else {
                if (model.isOpenLimiteGroup()) {
                    this._tabTypes = [LimiteBuyType.group];
                    this.list_tab.array = this._tabTypes;
                    // this.list_tab.repeatX = 1;
                } else {
                    this.list_tab.array = null;
                    if (UIMgr.getUIByName(UIConst.LimiteBuyView)) {
                        UIMgr.hideUIByName(UIConst.LimiteBuyView);
                        showToast(LanMgr.getLan('', 10223));
                    }
                }
            }
            this.list_tab.selectedIndex = 0;
            this.onTabSelect(0);
        }

        private _view_summon: game.TabSummon;
        private _view_group: game.TabGroup;
        //限时活动切换
        private onTabSelect(index: number) {
            if (index == -1) return;
            if (!this._tabTypes || this._tabTypes.length == 0) return;
            let type = this._tabTypes[index];
            //构建页面数据
            let model = LimiteBuyModel.getInstance();
            if (this._view_summon) {
                this._view_summon.removeSelf();
            }
            if (this._view_group) {
                this._view_group.removeSelf();
            }
            if (type == LimiteBuyType.summon) {
                if (!this._view_summon) {
                    this._view_summon = new game.TabSummon();
                    this._view_summon.x = 31;
                    this._view_summon.y = 228;
                }
                this.setViewSummonData(model.getCurSummonList());
                this.addChild(this._view_summon);
                model.Lim_Summon_Rp = false;
            } else if (type == LimiteBuyType.group) {
                if (!this._view_group) {
                    this._view_group = new game.TabGroup();
                    this._view_group.x = 19;
                    this._view_group.y = 229;
                }
                this.setViewGroupData(model.getCurGroupList());
                this.addChild(this._view_group);
                model.Lim_Group_Rp = false;
            } else {
                UIMgr.hideUIByName(UIConst.LimiteBuyView);
            }
            this.list_tab.refresh();
            dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.UPDATE_RP));
        }

        public setViewGroupData(data){
            if(this._view_group){
                this._view_group.dataSource = data;
            }
        }

        public setViewSummonData(data){
            if(this._view_summon){
                this._view_summon.dataSource = data;
            }
        }
    }
} 