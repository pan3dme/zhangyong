/**
* name 
*/
module game {
    export enum EquipRoot {
        /**一键装备 */
        Wear = 1,
        /**一键强化 */
        Strength = 2,
        /**一键精炼 */
        Refine = 3,
        /**一键卸下 */
        TakeOff = 4,
    }

    export class TabEquip extends ui.equip.tab.TabEquipUI {
        public curType: number;
        private _canOnceStone: boolean;
        private _canOnceMoney: boolean;
        constructor() {
            super();
            this.list_attr.renderHandler = new Handler(this, this.onAttrRender);
            this.list_equips.mouseHandler = new Handler(this, this.onEquipMouse);
            this.list_equips.renderHandler = new Handler(this, this.onEquipAccsItemRender);
            this.list_equips.selectEnable = false;
            this.btn_strengthMaster.on(Laya.Event.CLICK, this, this.openMasterView);
            this.btn_getRefine.on(Laya.Event.CLICK, this, this.openJumpView, [CostTypeKey.jinglianshi]);
            this.btn_getStrengh.on(Laya.Event.CLICK, this, this.openJumpView, [CostTypeKey.qianghuashi]);
            this.btn_wear.on(Laya.Event.CLICK, this, this.quick, [EquipRoot.Wear]);
            this.btn_takeoff.on(Laya.Event.CLICK, this, this.quick, [EquipRoot.TakeOff]);
            this.btn_strength.on(Laya.Event.CLICK, this, this.quick, [EquipRoot.Strength]);
            this.btn_rootRefine.on(Laya.Event.CLICK, this, this.quick, [EquipRoot.Refine]);
            this.refineCkbox.selected = this.strengCkbox.selected = false;
            this.btnSuit.on(Laya.Event.CLICK, this, this.onSuit);
        }

        public equippos: number[] = [0, 0, 304, 0, 0, 244, 304, 244];
        setSize():void {
            // let listY = this.height/2 - this.list_equips.height/2 + this.list_equips.centerY;
            // let listX = this.width/2 - this.list_equips.width/2 + this.list_equips.centerX;
        }

        public set dataSource($value: GodItemVo) {
            this._dataSource = $value;
        }

        public get dataSource() {
            return this._dataSource;
        }

        public init(type: number) {
            this.curType = type;
            this.setResEvent(true);
            this.setEquipAccsItemData();
            this.box_refine.visible = type == EquipTabType.refine;
            this.box_strength.visible = type == EquipTabType.strength;
            this.strengCkbox.visible = this.btn_strength.visible = this.btn_getStrengh.visible = App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
            if (!this.dataSource.isAllEquipLvTop(EquipTabType.strength)) {
                this.list_attr.array = this.dataSource.getCurLvAttriAndNext(type == EquipTabType.strength ? 1 : 0);
                this.img_arrow.visible = true;
                this.list_attr.x = 145;
            } else {
                let arr: number[][] = this.dataSource.getCurLvAttriAndNext(type == EquipTabType.strength ? 1 : 0);
                arr[1] = arr[3] = arr[5] = null;
                this.list_attr.array = arr;
                this.img_arrow.visible = false;
                this.list_attr.x = 265;
            }

            let godVo = this.dataSource;
            this.strengthRP.setRedPointName(`god_onekey_strength_${godVo.uuid}`);
            this.equipRP.setRedPointName(`god_onekey_equip_${godVo.uuid}`);
            this.redpointRefine.setRedPointName(`god_onekey_refine_${godVo.uuid}`);
            type == EquipTabType.strength ? this.setStrengthView() : this.setRefineView();
            this.refreshGod();
        }

        public refreshGod(): void {

            this.updateSuit();
            this.updateDaShi();
        }

        private updateDaShi(): void {
            let godVo = this.dataSource;
            if (this.curType == EquipTabType.strength) {
                let qhlv: number = godVo.countMasterLevel();
                this.lab_dashi.text = qhlv == 0 ? LanMgr.getLan("", 12448) : LanMgr.getLan("", 12435, qhlv);
            } else {
                let jllv: number = godVo.refineMasterLevel();
                this.lab_dashi.text = jllv == 0 ? LanMgr.getLan("", 12449) : LanMgr.getLan("", 12436, jllv);
            }
        }

        private updateSuit(): void {
            let godVo = this.dataSource;
            let ary = godVo.getMaxQualityAnNum();
            if (ary.length > 0) {
                let num: number = ary[1];
                switch (ary[0]) {
                    case QualityConst.RED:
                        //红装"
                        this.lab_suit.text = LanMgr.getLan("", 12601, LanMgr.getLan("",12445), LanMgr.numChinese[num]);
                        this.lab_suit.color = ColorConst.RED;
                        break;
                    case QualityConst.ORANGE:
                        //橙装"
                        this.lab_suit.text = LanMgr.getLan("", 12601, LanMgr.getLan("",12446), LanMgr.numChinese[num]);
                        this.lab_suit.color = "#de8a0b";
                        break;
                    case QualityConst.PURPLE:
                        //紫装
                        this.lab_suit.text = LanMgr.getLan("", 12601, LanMgr.getLan("",12447), LanMgr.numChinese[num]);
                        this.lab_suit.color = "#ca1fe2";
                        break;
                    default:
                        this.lab_suit.text = LanMgr.getLan("",12600);
                        this.lab_suit.color = ColorConst.normalFont;
                        break;
                }
            } else {
                this.lab_suit.text = LanMgr.getLan("",12600);
                this.lab_suit.color = ColorConst.normalFont;
            }
        }

        private onSuit(): void {
            let godVo = this._dataSource;
            if (!godVo) return;
            let ary = godVo.getMaxQualityAnNum();
            if (ary.length <= 0) {
                showToast(LanMgr.getLan('', 10300));
                return;
            }
            UIMgr.showUI(UIConst.Equip_SuitView, ary);
        }

        private setCostText(): void {
            this.curType == EquipTabType.strength ? this.setStrengthView() : this.setRefineView();
        }

        private setStrengthView(): void {
            let data: GodItemVo = this._dataSource;
            let onceCost = data.getStrengthCost();
            this.costList.array = CostVo.createCostVos(onceCost);
            this.box_cost.visible = this.costList.array && this.costList.array.length > 0 && App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
            let isMax = data.isAllEquipLvTop(EquipTabType.strength);
            this.boxMaxLv.visible = isMax;
            this.box_strength.visible = !isMax;
        }

        private setRefineView(): void {
            let data: GodItemVo = this._dataSource;
            let onceCost = data.getRefineCost();
            this.costList.array = CostVo.createCostVos(onceCost);
            this.box_cost.visible = this.costList.array && this.costList.array.length > 0;
            // && !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.oneKeyRefine)
            this.btn_rootRefine.selected = this.btn_rootRefine.gray = !App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN);
            let isMax = data.isAllEquipLvTop(EquipTabType.refine);
            this.boxMaxLv.visible = isMax;
            this.box_refine.visible = !isMax;
        }

		/**
         * 设置装备饰品
         * @param data 
         */
        public setEquipAccsItemData(data?: GodItemVo) {
            if (!data) {
                data = this._dataSource;
            }
            let ary: Array<any> = [null, null, null, null];
            for (let i = 0; i < data.equipKeys.length; i++) {
                let element: EquipItemVo = data.equipKeys[i];
                element.type = this.curType;
                ary.splice(element.slot - 1, 1, element);
            }
            this.list_equips.array = ary;
        }

        public updateView(data?: GodItemVo) {
            this.setEquipAccsItemData(data);
            this.curType == EquipTabType.strength ? this.setStrengthView() : this.setRefineView();
        }

        private onAttrRender(cell: ui.god.render.AttrBoxUI, index: number) {
            if (!cell.dataSource) {
                cell.lab_attr.text = "";
                cell.img_attrname.skin = "";
                return;
            }
            cell.img_attrname.skin = SkinUtil.getAttrSkin(cell.dataSource[0]);
            cell.lab_attr.text = '+' + cell.dataSource[1];
            cell.lab_attr.color = index % 2 == 0 ? "#7e5336" : "#319c28";
        }


        /** 选择装备或饰品格子 */
        private onEquipMouse(e: Laya.Event, idx: number) {
            let model = EquipModel.getInstance();
            if (e.type == Laya.Event.CLICK) {
                let itemdata: EquipItemVo = this.list_equips.array[idx];
                if (itemdata) {
                    model.curPointEquipData = itemdata;
                    EquipTipsView.showTip(this.list_equips.cells[idx], itemdata);
                } else {
                    let hasData = App.hero.getEquips(idx + 1, true);
                    if (hasData && hasData.length > 0) {
                        model.showEquipByView = EquipType.SHENLING_VIEW;
                        dispatchEvt(new EquipEvent(EquipEvent.OPEN_EQUIP_PANEL), [idx + 1, 1]);
                    }else{
                        let needId = idx == 3?21013:(idx==2?21012:(idx == 1?21011:21010))
                        this.openJumpView(needId);       
                    }
                }
                this.list_equips.selectedIndex = -1;
            }
        }

        private _isplayEff: boolean = false;
        private _playCallback: Function;
        public playEquipEff(callback: Function): void {
            this._playCallback = callback;
            this.stopEquipEff();
            this._isplayEff = true;
            for (let i: number = 0; i < this.list_equips.cells.length; i++) {
                let cell = this.list_equips.cells[i];
                Laya.Tween.to(cell, { x: 152, y: 122 }, 160, null);
            }
            Laya.timer.once(260, this, this.fanEquipEff);
        }

        private fanEquipEff(): void {
            for (let i: number = 0; i < this.list_equips.cells.length; i++) {
                let cell = this.list_equips.cells[i];
                Laya.Tween.to(cell, { x: this.equippos[i * 2], y: this.equippos[i * 2 + 1] }, 260, null);
            }
            Laya.timer.once(260, this, this.stopEquipEff);
        }

        public stopEquipEff(): void {
            if (this._playCallback) {
                this._playCallback();
                this._playCallback = null;
            }
            this._isplayEff = false;
            Laya.timer.clear(this, this.fanEquipEff);
            Laya.timer.clear(this, this.stopEquipEff);
            for (let i: number = 0; i < this.list_equips.cells.length; i++) {
                let cell = this.list_equips.cells[i];
                cell.x = this.equippos[i * 2];
                cell.y = this.equippos[i * 2 + 1];
                Laya.Tween.clearAll(cell);
            }
        }

        /**
         * 装备饰品渲染
         * @param item 
         * @param index 
         */
        
        private onEquipAccsItemRender(item: EquipItemIR, index: number): void {
            if (!this.list_equips.array) return;
            item.x = this.equippos[index * 2];
            item.y = this.equippos[index * 2 + 1];
            let itemData = this.list_equips.array[index] as EquipItemVo;
            item.itemBox.dataSource = itemData;
            item.itemBox.visible = itemData ? true : false;
            if (itemData) {
            } else {
                item.ani_succ.gotoAndStop(0);
            }
            item.btn_add.visible = !itemData;
            item.img_suo.visible = false;
            item.redpoint.onDispose();
            if (this.dataSource) {
                item.redpoint.setRedPointName(`god_equip_${this.dataSource.uuid}_${index + 1}`);
            }
        }
        /** 播放特效 */
        public playEffect(...slots: number[]): void {
            let cells = this.list_equips.cells;
            for (let i = 0; i < cells.length; i++) {
                let item = cells[i] as EquipItemIR;
                let equipVo = item.dataSource as EquipItemVo;
                if (!equipVo) continue;
                if (slots.indexOf(equipVo.slot) != -1) {
                    item.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(null, () => {
                        item.ani_succ.play(0, false);
                        item.ani_succ.visible = true;
                    }), ResConst.atlas_strength_effect);
                }
            }
        }

        /**
         * 刷新装备或饰品格子
         * @param ndata 
         */
        public updateItem(ndata: EquipItemVo) {
            let slist = this.list_equips.array;
            for (var i = 0; i < slist.length; i++) {
                if (slist[i]) {
                    var element: EquipItemVo = slist[i];
                    if (ndata.uuid == element.uuid) {
                        //如果找到当前变化的符文
                        this.list_equips.array[i] = ndata;
                        this.list_equips.refresh();
                    }
                }
            }
        }

        /**打开/关闭材料更新监听 */
        private setResEvent(bool: boolean) {
            if (bool) {
                tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateResoure, this)
                tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateResoure, this)
            }
            else {
                tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.updateResoure, this)
                tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateResoure, this)
            }
        }

        private updateResoure(): void {
            this.callLater(this.setCostText);
        }

        /**快捷操作：强化/装备 */
        private quick(type: number): void {
            let model = EquipModel.getInstance();
            if (type == EquipRoot.Strength && !App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
                let tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
                showToast(tbSys.prompt);
                return;
            }
            if (type == EquipRoot.Refine && !App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
                showToast(model.getRefineOpenData().prompt);
                return;
            }
            // if (type == EquipRoot.Refine && !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.oneKeyRefine)) {
            //     let data = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.oneKeyRefine);
            //     showToast(LanMgr.getLan(`一键精炼需要VIP${data.vip_level}级或者玩家等级${data.general_level}级开启`, -1));
            //     return;
            // }
            let equips: Array<EquipItemVo> = this.dataSource.equipKeys;
            if (type == EquipRoot.TakeOff || type == EquipRoot.Refine || type == EquipRoot.Strength) {/**一键卸下拦截 */
                if (equips.length == 0) {
                    showToast(LanMgr.getLan("",10301))
                    return;
                }
            }

            if (type == EquipRoot.Wear) {/**一键装备拦截 */
                let arrQiuck = model.equipQiuck(this._dataSource);
                if (arrQiuck.length == 0) {
                    showToast(LanMgr.getLan("", 10302))
                    return;
                }
            }
            let isFiveSelect: boolean = type == EquipRoot.Strength ? this.strengCkbox.selected : this.refineCkbox.selected;
            dispatchEvt(new EquipEvent(EquipEvent.EQUIP_OPERATION), [type, EquipOperation.ROOT_EQUIP_CHANGE, isFiveSelect])
        }

		/**
         * 打开强化大师界面
         */
        private openMasterView(event: Event) {
            let godVo = this.dataSource;
            if (godVo.equipKeys.length < EquipModel.EQUIP_COUNT) {
                let str = this.curType == 0 ? LanMgr.getLan("", 10304) : LanMgr.getLan("", 10305);
                showToast(LanMgr.getLan("", 10303, str));
            }
            else {
                UIMgr.showUI(UIConst.Equip_MasterView, [godVo, this.curType]);
            }
        }

        /**刷新装备List */
        public resfresh(): void {
            this.list_equips.refresh();
        }

        private openJumpView(type: number) {
            UIUtil.showJumpPanle(type);
        }

        public close() {
            this.setResEvent(false);
            this.list_equips.array = null;
            EquipTipsView.HideTip();
            tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.setCostText, this)
        }
    }
}