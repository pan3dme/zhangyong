

module game {

    export class GloryProcessor extends tl3d.Processor {

        private _model : GloryModel;
        constructor() {
            super();
            this._model = GloryModel.getInstance();
        }
        public getName(): string {
            return "GloryProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GloryEvent(GloryEvent.SHOW_MAIN_VIEW),
                new GloryEvent(GloryEvent.SHOW_LAST_REVIEW),
                new GloryEvent(GloryEvent.SHOW_AWARD_VIEW),
                new GloryEvent(GloryEvent.SHOW_RULE_VIEW),
                new GloryEvent(GloryEvent.SHOW_SHOP_VIEW),
                new GloryEvent(GloryEvent.SHOW_RECORD_VIEW),
                new GloryEvent(GloryEvent.SHOW_RECORD_BACK_VIEW),
                new GloryEvent(GloryEvent.SHOW_PLAYBACK),
                new GloryEvent(GloryEvent.BET_PLAYER),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof GloryEvent) {
                switch ($event.type) {
                    case GloryEvent.SHOW_MAIN_VIEW:
                        this.showMainView($event.data);
                        break;
                    case GloryEvent.SHOW_LAST_REVIEW:
                        this.showLastReview($event.data);
                        break;
                    case GloryEvent.SHOW_AWARD_VIEW:
                        this.showAward();
                        break;
                    case GloryEvent.SHOW_RULE_VIEW:
                        this.showRule();
                        break;
                    case GloryEvent.SHOW_SHOP_VIEW:
                        this.showShop();
                        break;
                    case GloryEvent.SHOW_RECORD_VIEW:
                        this.showRecord();
                        break;
                    case GloryEvent.SHOW_RECORD_BACK_VIEW:
                        this.showRecordBack($event.data);
                        break;
                    case GloryEvent.SHOW_PLAYBACK:
                        this.showPalyback($event.data);
                        break;
                    case GloryEvent.BET_PLAYER:
                        this.betPlayer($event.data);
                        break;
                }
            } 
        }

        /** 打开界面 */
        private showMainView(data:any):void {
            let model = this._model;
            // 请求赛季信息
			GloryThread.requestSeason().then(()=>{
                // 游戏时间内，并且有人报名
                if(model.isInGameTime() && model.serverPhase > 0){
                    let group = model.updateCurGroup();
                    GloryThread.requestMatchInfo(group).then((isSuccess:boolean)=>{
                        if(isSuccess) {
                            UIMgr.showUI(UIConst.GloryFightView,data);
                        }
                    });
                }else{
				    UIMgr.showUI(UIConst.GloryWaitView);
                }
			});
        }
        /** 打开上届回顾 */
        private showLastReview(data:any):void {
            GloryThread.requestLastList(GloryId.kuafu_juesai).then(()=>{
                let groupVo = this._model.getLastListVo(GroupType.kuafu);
                if(groupVo.getMatchList().length <= 0){
                    showToast(LanMgr.getLan("", 10333));
                    return;
                }
                UIMgr.showUI(UIConst.GloryLastReview,data);
            });
        }

        
        /** 打开奖励界面 */
        private showAward():void {
            UIMgr.showUI(UIConst.GloryRewardView);
        }
        /** 打开规则界面 */
        private showRule():void {
            let min = Math.floor(tb.TB_honour_set.getSet().bet_endtime/60);
            UIUtil.showCommonTipView(LanMgr.getLanArr(20014,[],[min]));
        }
        /** 打开商店界面 */
        private showShop():void {
            dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.rongyao);
        }
        /** 打开记录界面 */
        private showRecord():void {
            GloryThread.requestMyMatch().then(()=>{
                if(this._model.getMyMatchList().length == 0){
                    showToast(LanMgr.getLan("", 10334));
                    return;
                }
                UIMgr.showUI(UIConst.GloryRecordView);
            });
        }
        private showRecordBack(type:number):void {
            if(type == 0){
                this.showMainView(null);
            }else{
                this.showLastReview(null);
            }
            this.showRecord();
        }
        /** 显示回放 */
        private showPalyback(info:MatchGroupVo):void {
            if(info.isBye()){
                showToast(LanMgr.getLan("",10335));
                return;
            }
            let model = this._model;
            if(model.reportDataDic[info.svo.recordId]){
                this.doPlayback(info,model.reportDataDic[info.svo.recordId]);
            }else{
                let args = {};
                args[Protocol.center_honour_getHonourWarPlayback.args.recordId] = info.svo.recordId;
                args[Protocol.center_honour_getHonourWarPlayback.args.stage] = info.svo.stage;
                PLC.request(Protocol.center_honour_getHonourWarPlayback,args,(res)=>{
                    if(!res) return;
                    let reportData = res.battleInfo.reportData;
                    if(!reportData) return;
                    model.reportDataDic[info.svo.recordId] = reportData;
                    this.doPlayback(info,reportData);
                });
            }
        }
        /** 开始回放 */
        private doPlayback(info:MatchGroupVo,reportData):void {
            logzhanbao(reportData);
            let vo = new FightVo();
            vo.copyType = CopyType.glory;
            vo.gloryMatchVo = info;

            let pageVo = new ServerPage();
			pageVo.initPage(reportData);
			pageVo.result = info.svo.winner == 1 ? playState.VICTORY : playState.FAILURE;
			vo.fightPageControl = pageVo;

            let index = GloryUtil.isInKuafu(info.svo.stage) ? 1 : 0;
            let group = info.svo.stage;
            let eventNotice = info.isMyMatch ? GloryEvent.SHOW_RECORD_BACK_VIEW : (UIMgr.hasStage(UIConst.GloryLastReview) ? GloryEvent.SHOW_LAST_REVIEW : GloryEvent.SHOW_MAIN_VIEW);
            let eventdata = info.isMyMatch ? (UIMgr.hasStage(UIConst.GloryLastReview) ? 1 : 0) : [index,group];
            let enterVo:EnterFightVo = {vo:vo,event:new GloryEvent(eventNotice),eventdata:eventdata};
            dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT),enterVo);
        }
        /** 押注 */
        private betPlayer(ary:any[]):void {
            let item : gloryMatchPlayerIR = ary[1];
            let info = item.dataSource;
            if(info.isBye()){
                showToast(LanMgr.getLan("",10336));
                return;
            }
            if(!info.isInBetTime()){
                showToast(this._model.getBetNotice());
                return;
            }
            if(info.isHasBet()){
                showToast(LanMgr.getLan("",10339));
                return;
            }
            if(info.isHasResult()){
                showToast(LanMgr.getLan("",10340));
                return;
            }
            let notEnough : boolean = false;
            for(let ary of info.tbHonor.bet_item){
                if(UIUtil.checkNotEnough(ary[0],ary[1])){
                    notEnough = true;
                    return;
                }
            }
            if(notEnough){
                return;
            }
            let str = LanMgr.getLan(``,10502);
            for(let ary of info.tbHonor.bet_item){
                str += `${ary[1]} <img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(ary[0])}' ></img>  `;
            }
            str += LanMgr.getLan(``,10503);
            common.AlertBox.showAlert({
                text: str, confirmCb: () => {
                    this.doBet(ary);
                }, parm: null,yes:LanMgr.getLan(``,10504)
            });
        }
        private doBet(ary:any[]):void {
            let betLf : boolean = ary[0];
            let item : gloryMatchPlayerIR = ary[1];
            let info = item.dataSource;
            let args = {};
            let playerId = betLf ? info.lUser.playerId : info.rUser.playerId;
            args[Protocol.game_honour_honourWarBet.args.playerId] = playerId;
            args[Protocol.game_honour_honourWarBet.args.recordId] = info.svo.recordId;
            args[Protocol.game_honour_honourWarBet.args.stage] = info.svo.stage;
            PLC.request(Protocol.game_honour_honourWarBet,args,($data)=>{
                if(!$data) return;
                info.svo.betId = $data.betId;
                item.updateBet();
                let vo = this._model.getGroupListVoByGroup(info.svo.stage);
                let playerVo = vo && vo.getPlayerById(playerId);
                if(playerVo){
                    vo.betInfo.push(playerVo.rankPos);
                }
                if(UIMgr.hasStage(UIConst.GloryFightView)){
                    let view = UIMgr.getUIByName(UIConst.GloryFightView) as GloryFightView;
                    view.listView.renderBtnState();
                }
                dispatchEvt(new GloryEvent(GloryEvent.BET_SUCCESS));
            });
        }

    }
}