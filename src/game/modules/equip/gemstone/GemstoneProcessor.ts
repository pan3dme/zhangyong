module game {

    export class GemstoneEvent extends tl3d.BaseEvent {

        // ---------- 后端数据响应更新 ------------
		/** 初始化宝石数据 */
		public static INIT_GEM_DATA : string = "INIT_GEM_DATE";	
		/** 新增宝石 */
		public static ADD_GEMTONE : string = "ADD_GEMTONE";	
		/** 删除宝石 */
        public static DEL_GEMTONE : string = "DEL_GEMTONE";              
        /** 修改宝石 */
        public static MODIFY_GEMTONE : string = "MODIFY_GEMTONE";
        /** 修改装备镶嵌的宝石 */
        public static MODIFY_GOD_GEMTONE : string = "MODIFY_EQUIP_GEMTONE";
        /** 更新宝石数据 */
        public static MODIFY_TARGET_GEMTONE : string = "MODIFY_TARGET_GEMTONE";

        // ---------- 界面操作 ------------
        /** 展示替换界面 */
        public static SHOW_REPLACE_GEM_VIEW : string = "SHOW_REPLACE_GEM_VIEW";
        /** 展示合成界面 */
        public static SHOW_COMPOUND_VIEW : string = "SHOW_COMPOUND_VIEW";

        // ---------- 客户端请求 ------------
        /** 镶嵌宝石 */
        public static WEAR_GEMSTONE : string = "WEAR_GEMSTONE";
        public static WEAR_SUCCESS : string = "WEAR_SUCCESS";
        /** 一键卸下 */
        public static ONE_KEY_UNLOAD : string = "ONE_KEY_UNLOAD";
        /** 一键镶嵌 */
        public static ONE_KEY_WEAR : string = "ONE_KEY_WEAR";
        public static ONE_KEY_WEAR_SUCCESS : string = "ONE_KEY_WEAR_SUCCESS";
        /** 合成宝石 */
        public static COMPOUND_GEMSTONE : string = "COMPOUND_GEMSTONE";
        /** 一键合成宝石 */
        public static ONEKEY_COMPOUND_GEM : string = "ONEKEY_COMPOUND_GEM";
		public data: any;

    }

    export class GemstoneProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "GemstoneProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GemstoneEvent(GemstoneEvent.SHOW_REPLACE_GEM_VIEW),
                new GemstoneEvent(GemstoneEvent.SHOW_COMPOUND_VIEW),

                new GemstoneEvent(GemstoneEvent.WEAR_GEMSTONE),
                new GemstoneEvent(GemstoneEvent.ONE_KEY_UNLOAD),
                new GemstoneEvent(GemstoneEvent.ONE_KEY_WEAR),
                new GemstoneEvent(GemstoneEvent.COMPOUND_GEMSTONE),
                new GemstoneEvent(GemstoneEvent.ONEKEY_COMPOUND_GEM),
                
                new GemstoneEvent(GemstoneEvent.MODIFY_GOD_GEMTONE),
                new GemstoneEvent(GemstoneEvent.MODIFY_TARGET_GEMTONE),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof GemstoneEvent) {
                switch (event.type) {
                    case GemstoneEvent.SHOW_REPLACE_GEM_VIEW:
                        this.showReplaceView(event.data);
                        break;
                    case GemstoneEvent.SHOW_COMPOUND_VIEW:
                        this.showCompoundView();
                        break;
                    case GemstoneEvent.WEAR_GEMSTONE:
                        this.wearGemstone(event.data);
                        break;
                    case GemstoneEvent.ONE_KEY_UNLOAD:
                        this.oneKeyUnload(event.data);
                        break;
                    case GemstoneEvent.ONE_KEY_WEAR:
                        this.oneKeyWear(event.data);
                        break;
                    case GemstoneEvent.COMPOUND_GEMSTONE:
                        this.compoundGem(event.data);
                        break;
                    case GemstoneEvent.ONEKEY_COMPOUND_GEM:
                        this.oneKeyCompound(event.data);
                        break;
                    case GemstoneEvent.MODIFY_GOD_GEMTONE:
                        this.modifyEquipGem(event.data);
                        break;
                    case GemstoneEvent.MODIFY_TARGET_GEMTONE:
                        this.modifyGemData(event.data);
                        break;
                }
            }
        }

        /** 展示替换界面 */
        private showReplaceView(info:BaoshiIRVo):void {
            if(info) {
                UIMgr.showUI(UIConst.GemstoneReplaceView,info);
            }
        }
        /** 展示合成界面 */
        private showCompoundView():void {
            UIMgr.showUI(UIConst.GemstoneCompoundView);
        }

        /** 更新装备身上的宝石 */
        private modifyEquipGem(info:any):void {
            if(UIMgr.hasStage(UIConst.EquipView)){
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                if(view.list_tab.selectedIndex == EquipTabType.baoshi) {
                    let baoshiUI = view.viewBaoshi;
                    baoshiUI.list_equip.refresh();
                    baoshiUI.renderEquipInfo();
                }
            }
        }

        /** 更新宝石数据 */
        private modifyGemData(info:any):void {
            if(UIMgr.hasStage(UIConst.EquipView)){
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                if(view.list_tab.selectedIndex == EquipTabType.baoshi) {
                    let baoshiUI = view.viewBaoshi;
                    baoshiUI.renderEquipInfo();
                }
            }
        }

        /** 镶嵌宝石 */
        private wearGemstone(info : GemstoneTipsVo):void {
            if(!info) return;
            let args = {};
            args[Protocol.game_gemstone_wearGemstone.args.godId] = Number(info.godVo.uuid);
            args[Protocol.game_gemstone_wearGemstone.args.gemKey] = info.gemVo.uuid;
            args[Protocol.game_gemstone_wearGemstone.args.slot] = info.slot;
            PLC.request(Protocol.game_gemstone_wearGemstone,args,(rdata)=>{
                if(!rdata) return;
                UIMgr.hideUIByName(UIConst.GemstoneReplaceView);
                if(UIMgr.hasStage(UIConst.EquipView)){
                    let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    if(view.list_tab.selectedIndex == EquipTabType.baoshi) {
                        let baoshiUI = view.viewBaoshi;
                        baoshiUI.playAnim([info.gemVo.gemType]);
                    }
                }
                dispatchEvt(new GemstoneEvent(GemstoneEvent.WEAR_SUCCESS));
            });
        }

        /** 一键卸下 */
        private oneKeyUnload(info : GodItemVo):void {
            if(!info) return;
            let args = {};
            args[Protocol.game_gemstone_oneKeyDischargeGemstone.args.godId] = Number(info.uuid);
            PLC.request(Protocol.game_gemstone_oneKeyDischargeGemstone,args,(rdata)=>{
                if(!rdata) return;
            });
        }
        /** 一键镶嵌 */
        private oneKeyWear(info : GodItemVo):void {
            if(!info) return;
            let gemDic = GemstoneUtils.getCanWearGemList(info);
            if(Object.keys(gemDic).length == 0) {
                showToast(LanMgr.getLan('', 10294));
                return;
            }
            let changeTypes = [];
            let gemKeys = {};
            for(let slot in gemDic){
                gemKeys[slot] = gemDic[slot].uuid;
            }
            let args = {};
            args[Protocol.game_gemstone_oneKeyWearGemstone.args.godId] = info.uuid;
            args[Protocol.game_gemstone_oneKeyWearGemstone.args.gemKeys] = gemKeys;
            PLC.request(Protocol.game_gemstone_oneKeyWearGemstone,args,(rdata)=>{
                if(!rdata) return;
                if(UIMgr.hasStage(UIConst.EquipView)){
                    let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    if(view.list_tab.selectedIndex == EquipTabType.baoshi) {
                        let baoshiUI = view.viewBaoshi;
                        baoshiUI.playAnim(changeTypes);
                    }
                }
                dispatchEvt(new GemstoneEvent(GemstoneEvent.ONE_KEY_WEAR_SUCCESS));
            });
        }
        /** 宝石合成 */
        private compoundGem(dataAry : number[]):void {
            if(!dataAry) return;
            let tbid = dataAry[0];
            let compNum = dataAry[1];
            let compoundObj = GemstoneUtils.getCompoundObjById(tbid);
            if(!compoundObj){
                showToast(LanMgr.getLan('', 10295,tbid));
                return;
            }
            let maxNum = GemstoneUtils.getCompoundNum(tbid);
            if(compNum > maxNum) {
                showToast(LanMgr.getLan('', 10296,compNum*compoundObj.materialNum));
                return;
            }
            let args = {};
            args[Protocol.game_gemstone_gemstoneCompound.args.id] = compoundObj.ID;
            args[Protocol.game_gemstone_gemstoneCompound.args.num] = compNum;
            PLC.request(Protocol.game_gemstone_gemstoneCompound,args,(rdata)=>{
                if(!rdata) return;
                UIMgr.hideUIByName(UIConst.SingleCompoundView);
                if(UIMgr.hasStage(UIConst.GemstoneCompoundView)) {
                    let view = UIMgr.getUIByName(UIConst.GemstoneCompoundView) as GemstoneCompoundView;
                    view.refreshView();
                }
                UIUtil.showRewardView(rdata.commonData);
            });
        }
        /** 一键合成 */
        private oneKeyCompound(dataAry:any[]):void {
            let level = dataAry[0] || GemstoneModel.max_gem_lv;
            let type = dataAry[1] || 0;
            let itemVoList = dataAry[2];
            if(!GemstoneUtils.isCanCompound(type,level)){
                showToast(LanMgr.getLan('', 10297));
                return;
            }
            let args = {};
            args[Protocol.game_gemstone_oneKeyGemstoneCompound.args.level] = level;
            args[Protocol.game_gemstone_oneKeyGemstoneCompound.args.type] = type;
            PLC.request(Protocol.game_gemstone_oneKeyGemstoneCompound,args,(rdata)=>{
                if(!rdata) return;
                if(UIMgr.hasStage(UIConst.GemstoneCompoundView)) {
                    let view = UIMgr.getUIByName(UIConst.GemstoneCompoundView) as GemstoneCompoundView;
                    view.refreshView();
                }
                UIUtil.showRewardView({"clientAddItemVoList":itemVoList});
            });
        }


    }
}