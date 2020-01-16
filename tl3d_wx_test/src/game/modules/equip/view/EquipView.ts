/**
* name 
*/
module game {
    export class EquipView extends ui.equip.EquipViewUI {

        private _initIndex: number = -1;
        private _model : EquipModel;
        constructor() {
            super();
            this._model = EquipModel.getInstance();
            this.group = UIConst.hud_group;
            this.list_tab.array = this._model.equipTabName;
            this.list_roles.renderHandler = new Handler(this, this.onRender);
            this.list_tab.mouseHandler = new Handler(this, this.onMouseIndex);
            this.list_tab.renderHandler = new Handler(this, this.onRenderIndex);
            this.list_roles.selectHandler = new Handler(this, this.onGodSelect);
            this.btnFenjie.on(Laya.Event.CLICK, this, this.onFenjie);
        }

        createChildren():void {
            super.createChildren();
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.EQUIPMENT);
        }
        
        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.view_list.height = h;
            this.viewBaoshi.height = h - this.view_list.y;
            this.viewEquip.height = h - this.view_list.y;
            this.boxTop.y = GameUtil.isFullScreen() ? (5+HudModel.TOP_ADD_HEIGHT) : 5;
        }

        //打开面板
        public onOpened(): void {
            super.onOpened();
            this._oldIndex = -1;
            this.initView();
            let topy = GameUtil.isFullScreen() ? (5+HudModel.TOP_ADD_HEIGHT) : 5;
            UIUtil.boxUpDownTween(this.boxTop,-this.boxTop.height,topy,false,310,0.1);
            let targetY = this.height - this.boxTab.height - 90;
            UIUtil.boxUpDownTween(this.boxTab,targetY+this.boxTab.height,targetY,true,310,0.05);
            // 注意：因为每次打开装备界面都是定位装备的tab界面，所以用viewEquip
            let boxY = this.viewEquip.height - this.viewEquip.boxBottom.height - 89;
            UIUtil.boxUpDownTween(this.viewEquip.boxBottom,boxY+this.viewEquip.boxBottom.height,boxY,true,310,0.05);
            ResUseMgr.loadRes([ResConst.atlas_strength_effect]);
        }

        get curVo(): GodItemVo { 
            return this.list_roles.array[this.list_roles.selectedIndex] 
        }

        private initView() {
            this._initIndex = Array.isArray(this.dataSource) ? this.dataSource[0] : -1;
            // 引导也是使用getGodAry去定位英雄，有更改需通知
            this.list_roles.array = App.hero.getGodAry().concat(null);
            this.list_roles.selectedIndex = 0;
        }

        //分页切换
        private _oldIndex:number = -1;
        public onMouseIndex(evt: Laya.Event, index: number, play:boolean = false) {
            let data: godTabIR;
            if (!evt || evt.type == Laya.Event.CLICK) {
                if (this._isplayTurnPan && evt) {
                    if (this._oldIndex == -1){
                        this.onMouseIndex(evt, 0, play);
                    }else{
                        this.list_tab.selectedIndex = this._oldIndex;
                    }
                    return;
                }
                if (evt) {
                    data = <godTabIR>this.list_tab.selection;
                }
                if (data && data.img_suo.dataSource) {
                    let sysId = data.img_suo.dataSource;
                    let tbData = tb.TB_sys_open.get_TB_sys_openById(sysId);
                    if (tbData && !App.IsSysOpen(sysId)) {
                        showToast(tbData.prompt);
                        if (this._oldIndex == -1){
                            this.onMouseIndex(evt, 0, play);
                        }else{
                            this.list_tab.selectedIndex = this._oldIndex;
                        }
                        return;
                    }
                }
                let type = index;
                // if (type == EquipTabType.baoshi && this.curVo.equipKeys.length == 0) {
                //     showToast("穿戴装备后才能进行宝石相关操作");
                //     if (this._oldIndex == -1){
                //         this.onMouseIndex(evt, 0, play);
                //     }else{
                //         this.list_tab.selectedIndex = this._oldIndex;
                //     }
                //     return;
                // }
                this.btnFenjie.visible = type != EquipTabType.baoshi;
                this.list_tab.selectedIndex = index;
                let playTurn:boolean = play || (evt && index >= 0 && index != this._oldIndex);
                this._oldIndex = index;
                this.list_tab.cells.forEach((element,idx) => {
				    let irender = element as ui.god.render.TabItemRenderUI;
				    irender.btn_name.labelSize = index == idx ? 24 : 22;
				    irender.btn_name.labelColors = index == idx ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
                });
                if (index >= 1)
                    index = index - 1;
                let oldSelection = this.view_list.selection;
                if (oldSelection) {
                    oldSelection['close']();
                }
                this.view_list.selectedIndex = index;
                this.view_list.items[index].dataSource = this.curVo
                let curSelection = this.view_list.selection;
                if (curSelection) {
                    curSelection['init'](type);
                    dispatchEvt(new EquipEvent(EquipEvent.SWITCH_TAB_SUCCESS), type);
                }

                if (playTurn){
                    this.playTurnPan();
                }
            }
        }

        private _isplayTurnPan:boolean = false;
        private playTurnPan():void{
            let curSelection = this.view_list.selection;
            if (curSelection){
                this._isplayTurnPan = true;
                curSelection["playEquipEff"](this.stopTurnPan.bind(this));
            }else{
                this._isplayTurnPan = false;
            }
        }
        private stopTurnPan():void {
            this._isplayTurnPan = false;
        }


        /**
         * 选择英雄
         * @param index 
         */
        private _oldGodSelect:number = -1;
        private onGodSelect(index: number) {
            if (!this.list_roles.array[index]) {
                dispatchEvt(new SummonEvent(SummonEvent.SHOW_ZHAOHUAN_PANEL));
                return;
            }
            // if (this.list_tab.selectedIndex == 2 && this.list_roles.array[index].equipKeys.length == 0) {
            //     showToast("穿戴装备后才能进行宝石相关操作");
            //     this.list_roles.selectedIndex = this._oldGodSelect;
            //     return;
            // }
            this._oldGodSelect = this.list_roles.selectedIndex;
            this._model.curShowGod = this.list_roles.array[index];
            dispatchEvt(new GodEvent(GodEvent.SELECT_GOD_EVENT));
            this.list_tab.refresh();
            let curTabIndex = this.list_tab.selectedIndex;
            if (this._initIndex >= 0) {
                this.onMouseIndex(null, this._initIndex, true);
                this._initIndex = -1;
            } else if (curTabIndex != -1) {
                this.onMouseIndex(null, curTabIndex, true);
            } 
            else {
                this.onMouseIndex(null, 0, true);
            }
        }

        /** 刷新列表中的某一个数据 */
        public refreshData(modifyGod?: boolean) {
            if (modifyGod) {
                let godVo = App.hero.getGodAry().find((vo) => {
                    return vo.uuid == this.curVo.uuid;
                })
                if (godVo) this.curVo.equipKeys = godVo.equipKeys;
            }
            this.onMouseIndex(null, this.list_tab.selectedIndex)
            if (this.viewEquip.visible){
                this.viewEquip.refreshGod();
            }
        }

        private onFenjie():void {
            dispatchEvt(new BagEvent(BagEvent.OPEN_SELL_VIEW)); 
        }

        private onRenderIndex(item: godTabIR, index: number) {
            if (!this.curVo || !item.dataSource) return;
            item.img_suo.visible = false;
            if (item.dataSource[1] != 0) {
                item.img_suo.visible = !App.IsSysOpen(item.dataSource[1]);
                item.img_suo.dataSource = item.dataSource[1];
            }
            item.btn_name.selected = index == this.list_tab.selectedIndex && !item.img_suo.visible ? true : false;
            if (!item.img_suo.visible)
                item.tabRedPoint.setRedPointName(`${this._model.equiptabredName[index]}_${this.curVo.uuid}`);
            else
                item.tabRedPoint.onDispose();

        }

        /**
         * 渲染英雄列表
         * @param itemRender 
         * @param index 
         */
        private onRender(itemRender: EquipGodIR, index: number) {
            let headBox = itemRender.headBox;
            headBox.visible = itemRender.dataSource ? true : false;
            itemRender.box_null.visible = !headBox.visible;
            let data: GodItemVo = this.list_roles.array[index];
            if (!data) return;
            headBox.img_shangzhen.visible = data.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            itemRender.redPoint.onDispose();
            if (itemRender.dataSource && App.hero.isInLineup(itemRender.dataSource.uuid, iface.tb_prop.lineupTypeKey.attack)) {
                itemRender.redPoint.setRedPointName(`attack_linuep_god_equip_${itemRender.dataSource.uuid}`);
            }
        }

        /** 关闭面板 */
        public onClosed(): void {
            super.onClosed();
            this.viewBaoshi.stopEquipEff();
            this.viewEquip.stopEquipEff();
            this.viewEquip.close();
            this.viewBaoshi.close();
            this.list_roles.array = null;
            this.list_tab.selectedIndex = -1;
            this.stopTurnPan();
        }
    }
}