module game {

    export class TreasureEvent extends tl3d.BaseEvent {

        // ----------- 界面显示 -----------
        /** 打开圣物选择界面 */
        public static SHOW_CHOOSE_TREASURE_VIEW : string = "SHOW_CHOOSE_TREASURE_VIEW";
        /** 打开强化界面 */
        public static SHOW_STRENGTH_VIEW : string = "SHOW_STRENGTH_VIEW";
        /** 打开升星界面 */
        public static SHOW_STARUP_VIEW : string = "SHOW_STARUP_VIEW";
        /** 星级预览 */
        public static SHOW_STAR_ATTR_PREVIEW : string = "SHOW_STAR_ATTR_PREVIEW";
        /** 圣物图鉴 */
        public static SHOW_TUJIAN_VIEW : string = "SHOW_TUJIAN_VIEW";
        /** 重生界面 */
        public static SHOW_REBIRTH_VIEW : string = "SHOW_REBIRTH_VIEW";

        // ----------- 后端数据更新 -----------
        /** 更新圣物数据 */
        public static UPDATE_TREASURE_DATA : string = "UPDATE_TREASURE_DATA";
        /** 新增圣物 */
        public static ADD_TREASURE : string = "ADD_TREASURE";   
        /** 删除圣物 */
        public static DEL_TREASURE : string = "DEL_TREASURE";              
        /** 修改圣物 */
        public static MODIFY_TREASURE : string = "MODIFY_TREASURE";
        /** 修改神灵穿戴的圣物 */
        public static MODIFY_GOD_TREASURE : string = "MODIFY_GOD_TREASURE";
        /** 更新圣物数据 */
        public static MODIFY_TARGET_TREASURE : string = "MODIFY_TARGET_TREASURE";

        // ----------- 前端操作 -----------
        /** 圣物操作 */
        public static TREASURE_OPERATION : string = "TREASURE_OPERATION";
        /**　选择圣物 -- 选择重生的圣物 */
        public static CHOOSE_TREASURE : string = "CHOOSE_TREASURE";
        /** 穿戴成功 */
        public static WEAR_SUCCESS : string = "WEAR_TREASURE_SUCCESS";
        /** 强化成功 */
        public static STRENGTH_SUCCESS : string = "STRENGTH_TREASURE_SUCCESS";
        /** 选择强化材料圣物 */
        public static SELECT_STRENGTH_TREASURE : string = "SELECT_STRENGTH_TREASURE";
        public data: any;

    }

    export enum TreasureOperation {
        wear = 1,           // 穿戴
        takeoff = 2,        //　脱下
        strength = 3,       // 强化
        starup = 4,         // 升星
        rebirth = 5,        // 重生
    }

    export class TreasureProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "TreasureProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TreasureEvent(TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_STRENGTH_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_STARUP_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_STAR_ATTR_PREVIEW),
                new TreasureEvent(TreasureEvent.SHOW_TUJIAN_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_REBIRTH_VIEW),

                new TreasureEvent(TreasureEvent.MODIFY_GOD_TREASURE),
                new TreasureEvent(TreasureEvent.MODIFY_TARGET_TREASURE),
                new TreasureEvent(TreasureEvent.DEL_TREASURE),
                new TreasureEvent(TreasureEvent.ADD_TREASURE),

                new TreasureEvent(TreasureEvent.TREASURE_OPERATION),
                new TreasureEvent(TreasureEvent.CHOOSE_TREASURE),
               
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof TreasureEvent) {
                switch ($event.type) {
                    case TreasureEvent.SHOW_STRENGTH_VIEW:
                        this.showStrengthView($event.data);
                        break;
                    case TreasureEvent.SHOW_STARUP_VIEW:
                        this.showStarupView($event.data);
                        break;
                    case TreasureEvent.SHOW_STAR_ATTR_PREVIEW:
                        this.showStarAttrPreview($event.data);
                        break;
                    case TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW:
                        this.showChooseTreasure($event.data);
                        break;
                    case TreasureEvent.SHOW_TUJIAN_VIEW:
                        this.showTujianView();
                        break;
                    case TreasureEvent.SHOW_REBIRTH_VIEW:
                        this.showRebirthView();
                        break;
                    case TreasureEvent.MODIFY_GOD_TREASURE:
                    case TreasureEvent.MODIFY_TARGET_TREASURE:
                        this.refreshGodTreasure($event.data);
                        break;
                    case TreasureEvent.ADD_TREASURE:
                    case TreasureEvent.DEL_TREASURE:
                        this.delTreasure();
                        break;

                    case TreasureEvent.TREASURE_OPERATION:
                        this.treasureOperation($event.data);
                        break;
                    case TreasureEvent.CHOOSE_TREASURE:
                        this.chooseTreasure($event.data);
                        break;
                }
            }
        }

        /** 打开强化界面 */
        private showStrengthView(vo:TreasureItemVo):void {
            if(vo.isTopStrengthLv()) {
                showToast(LanMgr.getLan("", 10345));
                return;
            }
            UIMgr.showUI(UIConst.TreasureStrengthView,vo);
        }
        /**打开升星界面 */
        private showStarupView(vo:TreasureItemVo):void {
            if(vo.isForbitStarup()) {
                showToast(LanMgr.getLan("", 10362));
                return;
            }
            if(vo.isTopStarLv()) {
                showToast(LanMgr.getLan("", 10345));
                return;
            }
            UIMgr.showUI(UIConst.TreasureStarupView,vo);
        }
        /** 显示星级属性预览 */
        private showStarAttrPreview(vo:TreasureItemVo):void {
            if(vo){
                UIMgr.showUI(UIConst.TreasureStarAttrPreview,vo);
            }
        }
        /** 显示图鉴界面 */
        private showTujianView():void {
            UIMgr.showUI(UIConst.TreasureTujianView);
        }
        /** 显示重生界面 */
        private showRebirthView():void {
            UIMgr.showUI(UIConst.TreasureRebirthView);
        }

        /** 显示选择圣物界面 */
        private showChooseTreasure(args:any[]):void {
            let openType : number = args[0];
            let treasureVo : TreasureItemVo = args[1];
            let godVo : GodItemVo = args[2];
            // 选择圣物穿戴或者替换
            if(openType == ChooseTreasureOpenType.wear || openType == ChooseTreasureOpenType.change){
                if(!TreasureUtil.hasNotWearTreasures()){
                    showToast(LanMgr.getLan("", 10363));
                    return;
                }
            }
            // 选择圣物重生
            if(openType == ChooseTreasureOpenType.rebirth) {
                if(TreasureModel.getInstance().getRebirthTreasureList().length == 0) {
                    showToast(LanMgr.getLan("", 10364));
                    return;
                }
            }
            UIMgr.showUI(UIConst.ChooseTreasureView,args);
        }

        /** 更新神灵的圣物 */
        private refreshGodTreasure(godIds:string[]):void {
            if(UIMgr.hasStage(UIConst.God_MainView)){
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                view.godView.treasureUI.refreshView();
                // 更新信息界面属性
                if(godIds && view.list_tab.selectedIndex == ShenlingTabType.info && view.curVo && godIds.indexOf(view.curVo.uuid) != -1) {
                    view.godView.refreshCurRole();
                }
            }
            if(UIMgr.hasStage(UIConst.God_GodCultureView)){
                let view = UIMgr.getUIByName(UIConst.God_GodCultureView) as GodCultureView;
                view.godView.treasureUI.refreshView();
            }
            if(UIMgr.hasStage(UIConst.BagView)) {
                let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
                view.refreshTreasure(false);
            }
        }
        /** 删除圣物 */
        private delTreasure():void {
            if(UIMgr.hasStage(UIConst.BagView)) {
                let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
                view.refreshTreasure(true);
            }
        }

        /** 圣物tips上选择该圣物 */
        private chooseTreasure(vo:TreasureItemVo):void {
            UIMgr.hideUIByName(UIConst.ChooseTreasureView);
            if(UIMgr.hasStage(UIConst.TreasureRebirthView)){
                let view = UIMgr.getUIByName(UIConst.TreasureRebirthView) as TreasureRebirthView;
                view.setTreasureItem(vo);
            }
        }

        /** 圣物操作 */
        private treasureOperation(params:any[]):void {
            let type = params[0];
            let dataAry : any[] = params[1];
            if(type == TreasureOperation.wear) {
                this.wearTreasure(dataAry);
            }else if(type == TreasureOperation.takeoff){
                this.takeoff(dataAry);
            }else if(type == TreasureOperation.strength){
                this.strength(dataAry);
            }else if(type == TreasureOperation.starup){
                this.starup(dataAry);
            }else if(type == TreasureOperation.rebirth){
                this.rebirth(dataAry);
            }
        }

        /** 穿戴圣物 */
        private wearTreasure(ary:any[]):void {
            let godVo : GodItemVo = ary[0];
            let treasureVo : TreasureItemVo = ary[1];
            let args = {};
            args[Protocol.game_treasure_wearTreasure.args.godId] = godVo.uuid;
            args[Protocol.game_treasure_wearTreasure.args.treasureKey] = treasureVo.uuid;
            PLC.request(Protocol.game_treasure_wearTreasure,args,(rdata)=>{
                if(!rdata) return;
                UIMgr.hideUIByName(UIConst.ChooseTreasureView);
                dispatchEvt(new TreasureEvent(TreasureEvent.WEAR_SUCCESS));
            });
        }
        /** 脱下圣物 */
        private takeoff(ary:any[]):void {
            let treasureVo : TreasureItemVo = ary[0];
            let args = {};
            args[Protocol.game_treasure_dischargeTreasure.args.treasureKey] = treasureVo.uuid;
            PLC.request(Protocol.game_treasure_dischargeTreasure,args,(rdata)=>{
                if(!rdata) return;
            });
        }
        /** 强化 */
        private strength(ary:any[]):void {
            let treasureVo : TreasureItemVo = ary[0];
            let chooseList : Array<TreasureItemVo|ItemVo> = ary[1];
            let bagIds = [];
            let treasureIds = [];
            for(let i = 0 ; i < chooseList.length ; i++) {
                let vo = chooseList[i];
                if(vo instanceof TreasureItemVo) {
                    treasureIds.push(vo.uuid);
                }else if(vo instanceof ItemVo){
                    bagIds.push(vo.id);
                }
            }
            let args = {};
            args[Protocol.game_treasure_strengthTreasure.args.treasureKey] = treasureVo.uuid;
            args[Protocol.game_treasure_strengthTreasure.args.materialArrs] = treasureIds;
            args[Protocol.game_treasure_strengthTreasure.args.itemIds] = bagIds;
            PLC.request(Protocol.game_treasure_strengthTreasure,args,(rdata)=>{
                if(!rdata) return;
                if(UIMgr.hasStage(UIConst.TreasureStrengthView)) {
                    let view = UIMgr.getUIByName(UIConst.TreasureStrengthView) as TreasureStrengthView;
                    view.updateView();
                }
                dispatchEvt(new TreasureEvent(TreasureEvent.STRENGTH_SUCCESS));
            });
        }
        /** 升星 */
        private starup(ary:any[]):void {
            let treasureVo : TreasureItemVo = ary[0];
            let chooseList : TreasureMaterialVo[] = ary[1];
            if(treasureVo.isForbitStarup()) {
                showToast(LanMgr.getLan("", 10362));
                return;
            }
            if(treasureVo.isTopStarLv()){
                showToast(LanMgr.getLan("", 10345));
                return 
            }

            let materialArrs = [];
            let isEnough = chooseList.every((vo)=>{
                return vo.isEnough();
            });
            if(!isEnough){
                showToast(LanMgr.getLan("", 12000));
                return;
            }
            for(let i = 0 ; i < chooseList.length ; i++) {
                materialArrs.push(chooseList[i].getFormatData());
            }
            let args = {};
            args[Protocol.game_treasure_riseStarTreasure.args.treasureKey] = treasureVo.uuid;
            args[Protocol.game_treasure_riseStarTreasure.args.materialArrs] = materialArrs;
            PLC.request(Protocol.game_treasure_riseStarTreasure, args, ($data: any, $msg) => {
                if (!$data) return;
                if (UIMgr.hasStage(UIConst.TreasureStarupView)) {
                    let view = UIMgr.getUIByName(UIConst.TreasureStarupView) as TreasureStarupView;
                    view.initView();
                }
            });
        }
        /** 重生 */
        private rebirth(ary:any[]):void {
            let treasureVo : TreasureItemVo = ary[0];
            if(!treasureVo.isCanRebirth()) {
                showToast(LanMgr.getLan("", 10364));
                return;
            }
            let cost = tb.TB_treasure_set.getSet().recast_cost;
            for(let ary of cost) {
                if (UIUtil.checkNotEnough(ary[0], ary[1])) {
                    return;
                }
            }
            let args = {};
            args[Protocol.game_treasure_recastTreasure.args.treasureKey] = treasureVo.uuid;
            PLC.request(Protocol.game_treasure_recastTreasure, args, ($data: any, $msg) => {
                if (!$data) return;
                UIUtil.showRewardView($data.commonData);
                if (UIMgr.hasStage(UIConst.TreasureRebirthView)) {
                    let view = UIMgr.getUIByName(UIConst.TreasureRebirthView) as TreasureRebirthView;
                    view.initView();
                }
                if (UIMgr.hasStage(UIConst.BagView)) {
                    let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
                    view.refreshTreasure(true);
                }
            });
        }


    }
}