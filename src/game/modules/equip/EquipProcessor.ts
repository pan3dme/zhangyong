/**
* name 
*/
module game {
    export class EquipProcessor extends tl3d.Processor {

        constructor() {
            super();
            this._model = EquipModel.getInstance();
        }

        private _model : EquipModel;
        public getName(): string {
            return "EquipProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new EquipEvent(EquipEvent.EQUIP_OPERATION),
                new EquipEvent(EquipEvent.SHOW_EQUIPREFINE_PANEL),
                new EquipEvent(EquipEvent.SHOW_EQUIP_STH_PANEL),
                new EquipEvent(EquipEvent.CHANGE_EQUIP_ITEM),
                new EquipEvent(EquipEvent.SHOW_EQUIP_PANEL),
                new EquipEvent(EquipEvent.SWITCH_TAB_SUCCESS),
                new EquipEvent(EquipEvent.CLOSE_JUMP_VIEW),
                new EquipEvent(EquipEvent.OPEN_EQUIP_PANEL),
                new GodEvent(GodEvent.BUZHEN_COMPLETE),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof EquipEvent) {
                switch ($event.type) {
                    case EquipEvent.EQUIP_OPERATION:
                        this.equipOperation($event.data);
                        break;
                    case EquipEvent.SHOW_EQUIPREFINE_PANEL:
                        this.showRefinePanel($event.data);
                        break;
                    case EquipEvent.SHOW_EQUIP_STH_PANEL:
                        this.showStrengthPanel($event.data);
                        break;
                    case EquipEvent.SHOW_EQUIP_PANEL:
                        this.showPanel($event.data);
                        break;
                    case EquipEvent.CLOSE_JUMP_VIEW:
                        this.jumpview.close();
                        break;
                    case EquipEvent.CHANGE_EQUIP_ITEM:
                        if(UIMgr.hasStage(UIConst.EquipView))
                        this.equipview.refreshData($event.data);
                        break;
                    case EquipEvent.OPEN_EQUIP_PANEL:
                        this.openShipin($event.data);
                        break;
                }
            }
        }

        //装备一系列操作
        private equipOperation(data: any): void {
            switch (data[1]) {
                case EquipOperation.RESOLVE:/**分解 */
                    this.onProtocolRecycle(data[0]);
                    break;
                case EquipOperation.WEAR:/**更换 */
                case EquipOperation.CHANGE:/**穿戴 */
                    this.onProtocolWearOrChange(data[0]);
                    break;
                case EquipOperation.DISCHARGE:/**卸下 */
                    this.onProtocolDischarge(data[0]);
                    break;
                case EquipOperation.STRENGTH:/**强化 */
                    this.onProtocolStrength(data[0]);
                    break;
                case EquipOperation.REFINE:/**精炼 */
                    this.onProtocolRefine(data[0]);
                    break;
                case EquipOperation.ROOT_EQUIP_CHANGE:/**一键操作 */
                    this.onProtocolQuick(data[0],data[2]);
                    break;
                case EquipOperation.SWITCH:/**切换显示装备 */
                    this.switch(data[0]);
                    break;
            }
        }
          
        private openShipin(pos: number){
            UIMgr.showUI(UIConst.EquipChangeView, pos);
        }

        /**打开精炼界面 */
        private showRefinePanel(data: EquipItemVo): void {
            if (!App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
                showToast(this._model.getRefineOpenData().prompt);
                return;
            }
            if(!data.isExsitGod()) {
                showToast(LanMgr.getLan("", 10293));
                return;
            }
            UIMgr.showUI(UIConst.Equip_Refine, data);
        }
        /**打开强化界面 */
        private showStrengthPanel(data: EquipItemVo): void {
            if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
				let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
				showToast(tbData.prompt);
				return;
			}
            if(!data.isExsitGod()) {
                showToast(LanMgr.getLan("", 10290));
                return;
            }
            UIMgr.showUI(UIConst.Equip_StrengthView, data);
        }

        /**装备卸下 */
        private onProtocolDischarge(data: EquipItemVo): void {
            let args = {};
            args[Protocol.game_equip_discharge.args.equipKey] = data.uuid;
            PLC.request(Protocol.game_equip_discharge, args, ($data: any, msg: any) => {
                if (!$data) return;
                if (this.viewIsShow(UIConst.EquipChangeView)) this.shipinview.updateItem(data);
            })
        }

        /**装备分解 */
        private onProtocolRecycle(data: EquipItemVo): void {
            UIMgr.showUI(UIConst.Equip_Recycle, [data]);
        }

        /**穿戴/更换装备 */
        private onProtocolWearOrChange(data: EquipItemVo): void {
            let god = this._model.curShowGod;
            let lastSuit = god.getMaxQualityAnNum();
            let args = {};
            args[Protocol.game_equip_wear.args.godId] = god.uuid;
            args[Protocol.game_equip_wear.args.equipKey] = data.uuid;
            PLC.request(Protocol.game_equip_wear, args, ($data: any, msg: any) => {
                if (!$data) return;
                UIMgr.hideUIByName(UIConst.EquipChangeView);
                UIMgr.hideUIByName(UIConst.Equip_Recycle);
                UIUtil.checkEquipSuitLvup(lastSuit,god.getMaxQualityAnNum());
                dispatchEvt(new EquipEvent(EquipEvent.WEAR_EQUIPMENT_SUCCESS));
                if(UIMgr.hasStage(UIConst.EquipView)) {
                    let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    if(view.list_tab.selectedIndex == EquipTabType.baoshi) {
                        view.viewBaoshi.selectedEquip(data.uuid);
                    }
                }
            });
        }

        /**装备强化 */
        private onProtocolStrength(info: any): void {
            let equipVo = App.hero.getEquipByuuid(info.uuid);
            let godVo = App.hero.getGodVoById(equipVo.godId);
            if(!godVo){
                showToast(LanMgr.getLan('', 10290));
                return;
            }
            let lastStnLv = godVo.countMasterLevel();
            if(this._model.isCanSth(equipVo,null,true)){
                let args = {};
                args[Protocol.game_equip_strength.args.type] = info.type;
                args[Protocol.game_equip_strength.args.equipKey] = info.uuid;
                PLC.request(Protocol.game_equip_strength, args, ($data: any, msg: any) => {
                    if (!$data) return;
                    let curLv = godVo.countMasterLevel();
                    if(curLv > lastStnLv){
                        UIUtil.showEquipLvupView(0,curLv);
                    }
                    this.setView($data.targetEquips);
                    AudioMgr.playSound("sound/equstrength.mp3");
                    dispatchEvt(new EquipEvent(EquipEvent.EQUIP_STRENGTH_SUCCESS));
                });
            }
        }

        /**装备精炼 */
        private onProtocolRefine(info: any): void {
            let equipVo = App.hero.getEquipByuuid(info.uuid);
            let godVo = App.hero.getGodVoById(equipVo.godId);
            if(!godVo){
                showToast(LanMgr.getLan('', 10293));
                return;
            }
            if(this._model.isCanRefine(equipVo,null,true)){
                let lastRefLv = godVo.refineMasterLevel();
                let args = {};
                args[Protocol.game_equip_refine.args.equipKey] = info.uuid;
                args[Protocol.game_equip_refine.args.refNum] = info.refNum;
                PLC.request(Protocol.game_equip_refine, args, ($data: any, msg: any) => {
                    if (!$data) return;
                    let curLv = godVo.refineMasterLevel();
                    if(curLv > lastRefLv){
                        UIUtil.showEquipLvupView(1,curLv);
                    }
                    this.setView($data.targetEquips);
                    dispatchEvt(new EquipEvent(EquipEvent.DEFINE_EQUIPMENT_SUCCESS))
                });
            }
        }

        /**一键装备/强化 */
        private onProtocolQuick(type: number,isFive:boolean): void {
            let model = this._model;
            let args = {};
            let godVo = model.curShowGod;
            if (type == EquipRoot.TakeOff) {
                args[Protocol.game_equip_quickDischarge.args.godId] = godVo.uuid;
                PLC.request(Protocol.game_equip_quickDischarge, args, ($data: any, msg: any) => {
                })
            } else if (type == EquipRoot.Refine) {
                if(model.isCanRefine(null,godVo,true)){
                    let lastRefLv = godVo.refineMasterLevel();
                    let lowSlot = godVo.getLowestEquipSlots(EquipTabType.refine);
                    args[Protocol.game_equip_quickRefine.args.godId] = godVo.uuid;
                    args[Protocol.game_equip_quickRefine.args.type] = isFive ? iface.tb_prop.equipUpgradeTypeKey.five : iface.tb_prop.equipUpgradeTypeKey.one;
                    PLC.request(Protocol.game_equip_quickRefine, args, ($data: any, msg: any) => {
                        if ($data) {
                            this.equipview.viewEquip.list_equips.refresh();
                            this.equipview.viewEquip.playEffect(...lowSlot);
                            let curLv = godVo.refineMasterLevel();
                            if(curLv > lastRefLv){
                                UIUtil.showEquipLvupView(1,curLv);
                            }
                            dispatchEvt(new EquipEvent(EquipEvent.ONEKE_REFINE_SUCCESS));
                        }
                    });
                }
            } else if (type == EquipRoot.Strength) {
                if(model.isCanSth(null,godVo,true)){
                    let lastStnLv = godVo.countMasterLevel();
                    let lowSlot = godVo.getLowestEquipSlots(EquipTabType.strength);
                    args[Protocol.game_equip_quickStth.args.godId] = godVo.uuid;
                    args[Protocol.game_equip_quickStth.args.type] = isFive ? iface.tb_prop.equipUpgradeTypeKey.five : iface.tb_prop.equipUpgradeTypeKey.one;
                    PLC.request(Protocol.game_equip_quickStth, args, ($data: any, msg: any) => {
                        if ($data) {
                            this.equipview.viewEquip.list_equips.refresh();
                            this.equipview.viewEquip.playEffect(...lowSlot);
                            let curLv = godVo.countMasterLevel();
                            if(curLv > lastStnLv){
                                UIUtil.showEquipLvupView(0,curLv);
                            }
                            dispatchEvt(new EquipEvent(EquipEvent.ONEKE_STRENGTH_SUCCESS));
                        }
                    });
                }
            } else if (type == EquipRoot.Wear){
                let lastSuit = godVo.getMaxQualityAnNum();
                let equips = model.equipQiuck(godVo);
                let uuids = equips.map( vo => vo ? vo.uuid : "" );
                args[Protocol.game_equip_quickWear.args.godId] = godVo.uuid;
                args[Protocol.game_equip_quickWear.args.equipKeys] = uuids;
                PLC.request(Protocol.game_equip_quickWear, args, ($data: any, msg: any) => {
                    if (!$data) return;
                    UIUtil.checkEquipSuitLvup(lastSuit,godVo.getMaxQualityAnNum());
                    dispatchEvt(new EquipEvent(EquipEvent.ONEKE_WEAR_SUCCESS));
                });
            }
        }

        /**切换显示的装备 */
        private switch(data: any): void {
            let model = this._model;
            let listdata = this.equipview.viewEquip.list_equips.array;
            if (data.type == -1) {
                for (let i = Number(data.equip.slot - 1); i >= 0; i--) {
                    if (listdata[i] && listdata[i].slot != data.equip.slot) {
                        model.curPointEquipData = listdata[i];
                        this.setView(listdata[i], 1);
                        break;
                    }
                }
            } else {
                for (let i = Number(data.equip.slot - 1); i < 6; i++) {
                    if (listdata[i] && listdata[i].slot != data.equip.slot) {
                        model.curPointEquipData = listdata[i];
                        this.setView(listdata[i], 1);
                        break;
                    }
                }
            }
        }

        private setView(data: any, type: number = 0): void {
            let vo = data;
            if (type == 0) {
                let key = getobjectFirstAttribute(data);
                vo = new EquipItemVo(data[key]);
                vo.uuid = key;
            } 
            if (this.viewIsShow(UIConst.EquipChangeView)) this.shipinview.updateItem(vo);
            if (this.viewIsShow(UIConst.Equip_Refine)) this.EquipRefine.initView(vo);
            if (this.viewIsShow(UIConst.Equip_StrengthView)) this.EquipStrengthen.initView(vo);
        }

        /**
         * 打开面板
         */
        private showPanel(data: number) {
            if(!App.IsSysOpen(ModuleConst.EQUIPMENT)) {
                let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIPMENT);
                showToast(tbData.prompt);
                return;
            }
            let flag = UIMgr.hasStage(UIConst.EquipView);
            if (!flag)
                UIMgr.showUI(UIConst.EquipView, data);
        }

        /**界面是否处于显示状态 */
        private viewIsShow(uiConst: string): boolean {
            return UIMgr.hasStage(uiConst)
        }

        public get EquipStrengthen(): StrengthView {
            return UIMgr.getUIByName(UIConst.Equip_StrengthView);
        }

        public get EquipRefine(): RefineView {
            return UIMgr.getUIByName(UIConst.Equip_Refine);
        }

        public get shipinview(): EquipChangeView {
            return UIMgr.getUIByName(UIConst.EquipChangeView);
        }

        public get shenlingview(): GodMainView {
            return UIMgr.getUIByName(UIConst.God_MainView);
        }

        public get equipview(): EquipView {
            return UIMgr.getUIByName(UIConst.EquipView);
        }

        public get jumpview(): JumpView {
            return UIMgr.getUIByName(UIConst.Equip_JumpView);
        }


    }
}