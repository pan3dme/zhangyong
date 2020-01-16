module game {
    export class GodProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "GodProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GodEvent(GodEvent.SHOW_SHENGLING_PANEL),
                new GodEvent(GodEvent.SHOW_KEZHI_VIEW),
                new GodEvent(GodEvent.CLICK_JUEXING_EVENT),
                new GodEvent(GodEvent.SHOW_BUZHEN_PANEL),
                new GodEvent(GodEvent.USE_EXPPOOL),
                new GodEvent(GodEvent.CLICK_STAR_UP),
                new GodEvent(GodEvent.CHOOSE_LINEUP_GOD),
                new GodEvent(GodEvent.SHOW_SHENGJIE_ATTR),
                new GodEvent(GodEvent.GOD_PORP_CHANGE),
                new GodEvent(GodEvent.BUZHEN_COMPLETE_ALL),
                new ResEvent(ResEvent.PROP_CHANGE),
                new ResEvent(ResEvent.GOD_EXP_CHANGE),
                new GodEvent(GodEvent.GOD_SHENGJIE_SUCCESS),
                new GodEvent(GodEvent.SHOW_REPLACE_VIEW),
                new GodEvent(GodEvent.SHOW_GOD_CULTURE_VIEW),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof GodEvent) {
                switch ($event.type) {
                    case GodEvent.SHOW_SHENGLING_PANEL:
                        this.showPanel($event.data);
                        break;
                    case GodEvent.SHOW_KEZHI_VIEW:
                        this.showKezhiPanel($event.data);
                        break;
                    case GodEvent.CLICK_JUEXING_EVENT:
                        this.onAwaken($event.data);
                        break;
                    case GodEvent.BUZHEN_COMPLETE_ALL:
                        this.buzhenComplete();
                        break;
                    case GodEvent.GOD_PORP_CHANGE:
                        this.godPropChange($event.data);
                        break;
                    case GodEvent.SHOW_BUZHEN_PANEL:
                        this.show_buzhenView($event.data);
                        break;
                    case GodEvent.USE_EXPPOOL:
                        this.expPoolLevelUp($event.data);
                        break;
                    case GodEvent.CLICK_STAR_UP:
                        this.starUpEvent($event.data);
                        break;
                    case GodEvent.CHOOSE_LINEUP_GOD:
                        this.downGods($event.data);
                        break;
                    case GodEvent.SHOW_SHENGJIE_ATTR:
                        this.countDegreeUp($event.data);
                        break;
                    case GodEvent.GOD_SHENGJIE_SUCCESS:
                        //升阶成功
                        this.shengjieSucc($event.data);
                        break;
                    case GodEvent.SHOW_REPLACE_VIEW:
                        this.showReplaceView($event.data);
                        break;
                    case GodEvent.SHOW_GOD_CULTURE_VIEW:
                        this.showGodInfoView($event.data);
                        break;
                }
            }
            if ($event instanceof ResEvent) {
                switch ($event.type) {
                    case ResEvent.PROP_CHANGE:
                        this.propChange();
                        break;
                    case ResEvent.GOD_EXP_CHANGE:
                        this.refreshResource();
                        break;
                }
            }
        }

        /** 升阶成功 */
        private shengjieSucc(uuid):void{
            UIMgr.showUI(UIConst.God_DgUp_SUCCView,uuid);
            // if(UIMgr.hasStage(UIConst.God_MainView)){
            //     let tbInfo = this.godMainview.godView.viewInfo;
            //     tbInfo && tbInfo.updateList();
            // }
            // if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
            //     let tbInfo = this.godCultureView.godView.viewInfo;
            //     tbInfo && tbInfo.updateList();
            // }
        }
        /** 打开英雄更换界面 */
        private showReplaceView(dataAry:any[]):void {
            let godVo = dataAry ? dataAry[0] : null;
            let pos = dataAry ? dataAry[1] : undefined;
            if(isNaN(pos) || pos == null || pos == undefined){
                pos = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack,true).findIndex((uuid)=>{
                    return !uuid || uuid == "";
                });
            }
            if(pos >= 0 && pos < 6){
                UIMgr.showUI(UIConst.God_ReplaceGodView,[godVo,pos]);
            }
        }
        /** 打开英雄养成界面 */
        private showGodInfoView(dataAry:any[]):void {
            if(!dataAry || dataAry.length < 2) return;
            UIMgr.showUI(UIConst.God_GodCultureView,dataAry);
        }

        /** 刷新消耗资源 */
        private refreshResource() {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                if(this.godMainview.viewInfo){
                    this.godMainview.viewInfo.setCostText();
                }
            }
        }

        /** 神灵属性数据变化更新界面 */
        private godPropChange(data: GodItemVo): void {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                this.godMainview.refreshRolesByGod(data,false);
            }
            if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                this.godCultureView.refreshCurRole(data);
            }
        }

        /**
         * 点击升星
         */
        private starUpEvent(dataAry:any[]) {
            let godVo: GodItemVo = dataAry[0];
            let list : GodMaterialVo[] = dataAry[1] ?  dataAry[1] : [];
            if(!godVo.hasStarUpCost()){
                showToast(LanMgr.getLan("",Lans.cost));
                return;
            }
            if (godVo.forbitStarUpTo7()) {
                showToast(LanMgr.getLan("", 10346));
                return;
            }
            let ID = GodUtils.getGodStarId(godVo.starLevel,godVo.templateId);
			let startab: tb.TB_god_star = tb.TB_god_star.get_TB_god_starById(ID);
            let materialArrs = [];
            if(startab && startab.material){
                let isEnough = list.every((vo)=>{
                    return vo.isEnough();
                });
                if(!isEnough){
                    showToast(LanMgr.getLan("", 10347));
                    return;
                }
                for(let vo of list){
                    materialArrs.push(vo.getFormatData());
                }
            }
            var args = {};
            args[Protocol.game_god_raiseStar.args.godId] = godVo.uuid;
            args[Protocol.game_god_raiseStar.args.materialArrs] = materialArrs;
            PLC.request(Protocol.game_god_raiseStar, args, ($data: any, $msg) => {
                if ($data) {
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        this.godMainview.list_tab.selectedIndex = 0;
                    }
                    godVo = App.hero.getGodVoById(godVo.uuid);
                    UIUtil.showRole(godVo, UI_FLYTEXT.UPSTART, $data.commonData);
                }
            });
        }

        /**
         * 道具消耗刷新觉醒道具列表
         */
        private propChange() {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                if(this.godMainview.viewJuexing){
                    this.godMainview.viewJuexing.refereshItemList();
                }
            }
            if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                if(this.godCultureView.viewJuexing){
                    this.godCultureView.viewJuexing.refereshItemList();
                }
            }
        }

        /**
          * 英雄排序
          * @param 英雄列表 
          */
        private buzhenComplete() {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                this.godMainview.refreshRoles();
            }
        }

        /**
         * 觉醒
         * @param godVo 
         */
        private onAwaken(dataAry:any[]) {
            let godVo: GodItemVo = dataAry[0];
            let list : GodMaterialVo[] = dataAry[1] ?  dataAry[1] : [];
            if(godVo.awakenLv >= godVo.maxAwakenLv) {
                showToast(LanMgr.getLan("", 10348));
                return;
            }
            if(godVo.awakenLv >= godVo.getCurMaxAwakenLv()) {
                showToast(LanMgr.getLan("", 10349));
                return;
            }
            let tbCond = tb.TB_god_awaken.getTbById(godVo.awakenLv);
            let notEnough = App.isNotEnoughType(tbCond.material);
            if( notEnough != -1){
                showToast(LanMgr.getLan("",Lans.awakenCost,notEnough));
                return;
            }
            let materialArrs = [];
            if(tbCond.god_material){
                let isEnough = list.every((vo)=>{
                    return vo.isEnough();
                });
                if(!isEnough){
                    showToast(LanMgr.getLan("", 10350));
                    return;
                }
                for(let vo of list){
                    materialArrs.push(vo.getFormatData());
                }
            }
            let uuid = godVo.uuid;
            let args = {};
            args[Protocol.game_god_awaken.args.godId] = uuid;
            args[Protocol.game_god_awaken.args.materialArrs] = materialArrs;
            // loghgy("觉醒材料参数 ---- ",args);
            PLC.request(Protocol.game_god_awaken, args, ($data: any, $msg) => {
                if (!$data) return;
                UIUtil.showRewardView($data.commonData);
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    let ary = [];
                    if(this.godMainview.viewJuexing){
                        ary = this.godMainview.viewJuexing.getAttrToast();
                    }
                    this.godMainview.godView.showJuexingEffect(ary);
                    if( this.godMainview.viewJuexing){
                        this.godMainview.viewJuexing.refreshJuexing();
                    }
                }
                if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                    let ary = [];
                    if(this.godCultureView.viewJuexing){
                        ary = this.godCultureView.viewJuexing.getAttrToast();
                    }
                    this.godCultureView.godView.showJuexingEffect(ary);
                }
                let godVo = App.hero.getGodVoById(uuid);
                if(godVo && godVo.awakenLv == tb.TB_god_set.get_TB_god_set().awake_section){
                    UIUtil.showRole(godVo, UI_FLYTEXT.AWAKEN);
                }
                dispatchEvt(new GodEvent(GodEvent.GOD_AWAKEN_SUCCESS));
            });
        }

        /**
         * 打开英雄面板
         */
        private showPanel(data: number) {
            let flag = UIMgr.hasStage(UIConst.God_MainView);
            if (!flag)
                UIMgr.showUI(UIConst.God_MainView, data);
        }
        // 打开克制界面
        private showKezhiPanel(data: any) {
            // 没有默认取自己的阵容
            if(!data){
                data = GodModel.getInstance().getRaceNumObj();
            }
            UIMgr.showUI(UIConst.God_kezhiView, data);
        }
        /** 下阵英雄 */
        private downGods(data: GodItemVo) {
            GodUtils.downGods(data).then(()=>{
                if(this.fenjieview)  this.fenjieview.list_gods.refresh();
            })
        }

        /**
         * 打开布阵界面 
         */
        private show_buzhenView(eventdata): void {
            if (GodUtils.getGodsNum() <= 0) {
                showToast(LanMgr.getLan("", 10017));
                return;
            }
            UIMgr.showUI(UIConst.BuzhenView, eventdata);
        }

        public get godMainview(): GodMainView {
            return UIMgr.getUIByName(UIConst.God_MainView);
        }

        public get fenjieview(): FenjieView {
            return UIMgr.getUIByName(UIConst.FenjieView);
        }

        public get godCultureView():GodCultureView {
            return UIMgr.getUIByName(UIConst.God_GodCultureView);
        }

        /**
         * 使用经验池升级
         * @param num 
         */
        private expPoolLevelUp(dataAry:any[]) {
            let data: GodItemVo = dataAry[0];
            let isOneKey = dataAry[1];
            let args = {};
            args[Protocol.game_god_upgrade.args.godId] = data.uuid;
            args[Protocol.game_god_upgrade.args.count] = isOneKey ? 5 : 1;
            PLC.request(Protocol.game_god_upgrade, args, ($data: any, $msg) => {
                if (!$data) return;
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    this.godMainview.godView.sendShuxingEvent();
                }
                if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                    this.godCultureView.godView.sendShuxingEvent();
                }
                dispatchEvt(new GodEvent(GodEvent.USE_EXPPOOL_SUCCESS), data.uuid);
            });
        }

        private countDegreeUp(uuid:string) {
            let godVo = App.hero.getGodVoById(uuid);
            let nowDegree: number = godVo.degree;
            let nowAttr = godVo.jisuanchushi(nowDegree);
            let preAttr = godVo.jisuanchushi(nowDegree - 1);
            let growth: Array<any> = new Array();
            for (let i = 0; i < 3; i++) {
                growth.push([LanMgr.attrName[i+1], Math.floor(nowAttr[i][1]) - Math.floor(preAttr[i][1])]);
            }
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                this.godMainview.godView.showShuxing(growth);
            }
        }
    }
}